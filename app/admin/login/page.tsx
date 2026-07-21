"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [mfaRequired, setMfaRequired] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mfaRequired ? { code: totpCode } : { email, password }
        ),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.mfaRequired) {
          setMfaRequired(true);
          setTotpCode("");
          return;
        }

        router.push("/admin/seo");
      } else {
        setError(
          data.error ??
            (mfaRequired
              ? "Invalid authentication code"
              : "Invalid email or password")
        );
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-muted">
              <Lock className="h-5 w-5 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D4AF37]">
                Asia Tours
              </p>
              <h1 className="text-lg font-black text-gray-900">
                {mfaRequired ? "Two-Factor Check" : "Admin Login"}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mfaRequired ? (
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                  Authenticator code
                </label>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={totpCode}
                    onChange={(e) =>
                      setTotpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    required
                    autoFocus
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-center text-lg font-black tracking-[0.35em] text-gray-900 placeholder:text-gray-300 focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                    placeholder="000000"
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                      placeholder="admin@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-400">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                    placeholder="Enter admin password"
                  />
                </div>
              </>
            )}

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-3 text-sm font-black uppercase tracking-wide text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading
                ? mfaRequired
                  ? "Verifying..."
                  : "Signing in..."
                : mfaRequired
                  ? "Verify Code"
                  : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
