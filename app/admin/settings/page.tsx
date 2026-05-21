"use client";

import { useState } from "react";
import AdminSidebar from "../_components/AdminSidebar";
import { CheckCircle, DatabaseZap, Loader2, RefreshCw } from "lucide-react";
import { KNOWN_PAGES } from "@/lib/knownPages";

const groups = KNOWN_PAGES.reduce<Record<string, number>>((acc, p) => {
  acc[p.group] = (acc[p.group] ?? 0) + 1;
  return acc;
}, {});

const GROUP_COLORS: Record<string, string> = {
  Core: "bg-blue-50 text-blue-700",
  Services: "bg-orange-50 text-orange-700",
  Fleet: "bg-purple-50 text-purple-700",
  Areas: "bg-emerald-50 text-emerald-700",
};

export default function AdminSettingsPage() {
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; count?: number; error?: string } | null>(null);

  async function handleSync() {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/admin/seo/seed", { method: "POST" });
      const data = await res.json();
      setSyncResult(res.ok && data.success ? { success: true, count: data.count } : { success: false, error: data.error ?? "Sync failed" });
    } catch {
      setSyncResult({ success: false, error: "Network error" });
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />

      <main className="flex-1 overflow-auto p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900">Settings</h1>
          <p className="mt-0.5 text-sm text-gray-400">Manage your SEO admin configuration and database sync.</p>
        </div>

        {/* Page Inventory */}
        <div className="mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <DatabaseZap className="h-4 w-4 text-[#ff4500]" />
            <h2 className="text-sm font-black text-gray-900">Page Inventory</h2>
            <span className="ml-auto text-xs font-bold text-gray-400">{KNOWN_PAGES.length} pages tracked</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {Object.entries(groups).map(([group, count]) => (
              <div key={group} className="rounded-lg border border-gray-100 p-3">
                <p className="text-xl font-black text-gray-900">{count}</p>
                <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${GROUP_COLORS[group] ?? "bg-gray-100 text-gray-600"}`}>
                  {group}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sync */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-sm font-black text-gray-900">Sync All Pages to Supabase</h2>
          <p className="mb-4 text-sm text-gray-400">
            Upserts all {KNOWN_PAGES.length} known pages into your{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[11px]">pages_seo</code>{" "}
            table. Existing customisations are preserved.
          </p>

          {syncResult && (
            <div className={`mb-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-bold ${syncResult.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-500"}`}>
              {syncResult.success ? <><CheckCircle className="h-4 w-4" /> {syncResult.count} pages synced successfully.</> : <>Error: {syncResult.error}</>}
            </div>
          )}

          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 rounded-lg bg-[#ff4500] px-5 py-2.5 text-sm font-black text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            {syncing ? "Syncing…" : "Sync All Pages"}
          </button>
        </div>
      </main>
    </div>
  );
}
