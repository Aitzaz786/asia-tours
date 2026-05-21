"use client";

import { useState } from "react";
import { CheckCircle, Loader2, RefreshCw } from "lucide-react";

export default function SyncButton() {
  const [syncing, setSyncing] = useState(false);
  const [done, setDone] = useState<{ count: number } | null>(null);
  const [err, setErr] = useState("");

  async function handleSync() {
    setSyncing(true);
    setDone(null);
    setErr("");
    try {
      const res = await fetch("/api/admin/seo/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setDone({ count: data.count });
        setTimeout(() => setDone(null), 4000);
      } else {
        setErr(data.error ?? "Sync failed");
      }
    } catch {
      setErr("Network error");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        onClick={handleSync}
        disabled={syncing}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 shadow-sm transition-all hover:border-[#ff4500] hover:text-[#ff4500] disabled:opacity-40"
      >
        {syncing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
        {syncing ? "Syncing…" : "Sync to DB"}
      </button>
      {done && (
        <p className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
          <CheckCircle className="h-3 w-3" /> {done.count} pages synced
        </p>
      )}
      {err && <p className="text-[11px] font-bold text-red-500">{err}</p>}
    </div>
  );
}
