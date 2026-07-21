"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../_components/AdminSidebar";
import {
  CheckCircle,
  DatabaseZap,
  KeyRound,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { KNOWN_PAGES } from "@/lib/knownPages";

const groups = KNOWN_PAGES.reduce<Record<string, number>>((acc, p) => {
  acc[p.group] = (acc[p.group] ?? 0) + 1;
  return acc;
}, {});

const GROUP_COLORS: Record<string, string> = {
  Core: "bg-blue-50 text-blue-700",
  Services: "bg-brand-muted text-brand-dark",
  Fleet: "bg-purple-50 text-purple-700",
  Areas: "bg-emerald-50 text-emerald-700",
};

type SyncResult = { success: boolean; count?: number; error?: string };
type MfaSetup = {
  factorId: string;
  challengeId: string;
  qrCode: string;
  secret: string;
};

export default function AdminSettingsPage() {
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [mfaLoading, setMfaLoading] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaSetup, setMfaSetup] = useState<MfaSetup | null>(null);
  const [mfaCode, setMfaCode] = useState("");
  const [mfaMessage, setMfaMessage] = useState("");
  const [mfaError, setMfaError] = useState("");

  useEffect(() => {
    loadMfaStatus();
  }, []);

  async function loadMfaStatus() {
    setMfaLoading(true);
    setMfaError("");
    try {
      const res = await fetch("/api/admin/auth/mfa/status");
      const data = await res.json();
      if (res.ok && data.success) {
        setMfaEnabled(Boolean(data.enabled));
      } else {
        setMfaError(data.error ?? "Could not load 2FA status");
      }
    } catch {
      setMfaError("Network error while loading 2FA status");
    } finally {
      setMfaLoading(false);
    }
  }

  async function handleSync() {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/admin/seo/seed", { method: "POST" });
      const data = await res.json();
      setSyncResult(
        res.ok && data.success
          ? { success: true, count: data.count }
          : { success: false, error: data.error ?? "Sync failed" }
      );
    } catch {
      setSyncResult({ success: false, error: "Network error" });
    } finally {
      setSyncing(false);
    }
  }

  async function handleStartMfaSetup() {
    setMfaLoading(true);
    setMfaError("");
    setMfaMessage("");
    try {
      const res = await fetch("/api/admin/auth/mfa/enroll", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMfaSetup({
          factorId: data.factorId,
          challengeId: data.challengeId,
          qrCode: data.qrCode,
          secret: data.secret,
        });
      } else {
        setMfaError(data.error ?? "Could not start 2FA setup");
      }
    } catch {
      setMfaError("Network error while starting 2FA setup");
    } finally {
      setMfaLoading(false);
    }
  }

  async function handleVerifyMfa() {
    if (!mfaSetup) return;

    setMfaLoading(true);
    setMfaError("");
    setMfaMessage("");
    try {
      const res = await fetch("/api/admin/auth/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          factorId: mfaSetup.factorId,
          challengeId: mfaSetup.challengeId,
          code: mfaCode,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMfaEnabled(true);
        setMfaSetup(null);
        setMfaCode("");
        setMfaMessage("Two-factor authentication is now enabled.");
      } else {
        setMfaError(data.error ?? "Invalid authentication code");
      }
    } catch {
      setMfaError("Network error while verifying 2FA");
    } finally {
      setMfaLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />

      <main className="flex-1 overflow-auto p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900">Settings</h1>
          <p className="mt-0.5 text-sm text-gray-400">
            Manage your SEO admin configuration, database sync, and login
            security.
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <DatabaseZap className="h-4 w-4 text-[#D4AF37]" />
            <h2 className="text-sm font-black text-gray-900">
              Page Inventory
            </h2>
            <span className="ml-auto text-xs font-bold text-gray-400">
              {KNOWN_PAGES.length} pages tracked
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {Object.entries(groups).map(([group, count]) => (
              <div key={group} className="rounded-lg border border-gray-100 p-3">
                <p className="text-xl font-black text-gray-900">{count}</p>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                    GROUP_COLORS[group] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {group}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
            <h2 className="text-sm font-black text-gray-900">
              Two-Factor Authentication
            </h2>
            <span
              className={`ml-auto rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                mfaEnabled
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {mfaEnabled ? "Enabled" : "Not enabled"}
            </span>
          </div>

          <p className="mb-4 text-sm text-gray-400">
            Protect admin login with a 6-digit code from Google Authenticator.
          </p>

          {mfaMessage && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              <CheckCircle className="h-4 w-4" />
              {mfaMessage}
            </div>
          )}

          {mfaError && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-500">
              {mfaError}
            </div>
          )}

          {!mfaSetup && (
            <button
              onClick={handleStartMfaSetup}
              disabled={mfaLoading || mfaEnabled}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-black text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {mfaLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <KeyRound className="h-4 w-4" />
              )}
              {mfaEnabled ? "2FA Enabled" : "Setup 2FA"}
            </button>
          )}

          {mfaSetup && (
            <div className="grid gap-5 md:grid-cols-[220px_1fr]">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                {/* Supabase returns the TOTP QR code as an SVG data URL. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mfaSetup.qrCode}
                  alt="Two-factor authentication QR code"
                  className="h-44 w-44"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-bold text-gray-700">
                  Scan the QR code, then enter the 6-digit code from your
                  authenticator app.
                </p>
                <p className="mb-4 break-all rounded-lg bg-gray-50 px-3 py-2 font-mono text-xs text-gray-500">
                  {mfaSetup.secret}
                </p>

                <div className="flex max-w-sm gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={mfaCode}
                    onChange={(e) =>
                      setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-center text-sm font-black tracking-[0.25em] text-gray-900 focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                    placeholder="000000"
                  />
                  <button
                    onClick={handleVerifyMfa}
                    disabled={mfaLoading || mfaCode.length !== 6}
                    className="flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-2.5 text-sm font-black text-[#0A0A0A] shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {mfaLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Verify
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-sm font-black text-gray-900">
            Sync All Pages to Supabase
          </h2>
          <p className="mb-4 text-sm text-gray-400">
            Upserts all {KNOWN_PAGES.length} known pages into your{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[11px]">
              pages_seo
            </code>{" "}
            table. Existing customisations are preserved.
          </p>

          {syncResult && (
            <div
              className={`mb-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-bold ${
                syncResult.success
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {syncResult.success ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  {syncResult.count} pages synced successfully.
                </>
              ) : (
                <>Error: {syncResult.error}</>
              )}
            </div>
          )}

          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-2.5 text-sm font-black text-[#0A0A0A] shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {syncing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {syncing ? "Syncing..." : "Sync All Pages"}
          </button>
        </div>
      </main>
    </div>
  );
}
