import Link from "next/link";
import { getAllPages } from "@/lib/seo";
import { KNOWN_PAGES } from "@/lib/knownPages";
import AdminSidebar from "./_components/AdminSidebar";
import { ArrowRight, Edit3, Globe, LayoutDashboard, Settings } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const pages = await getAllPages();
  const synced = pages.filter((p) => p.id !== "").length;
  const missingTitle = pages.filter((p) => !p.meta_title).length;
  const missingDesc = pages.filter((p) => !p.meta_description).length;

  const groups = KNOWN_PAGES.reduce<Record<string, number>>((acc, p) => {
    acc[p.group] = (acc[p.group] ?? 0) + 1;
    return acc;
  }, {});

  // Recently updated (those with updated_at set)
  const recentPages = pages
    .filter((p) => p.updated_at)
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />

      <main className="flex-1 overflow-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-[#ff4500]" />
            <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
          </div>
          <p className="mt-1 text-sm text-gray-400">
            Overview of your Asia Tours Pakistan SEO panel.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total Pages", value: pages.length, color: "text-gray-900" },
            { label: "Synced to DB", value: synced, color: "text-emerald-600", sub: `${pages.length - synced} pending` },
            { label: "Missing Title", value: missingTitle, color: missingTitle > 0 ? "text-amber-500" : "text-emerald-600" },
            { label: "Missing Desc", value: missingDesc, color: missingDesc > 0 ? "text-amber-500" : "text-emerald-600" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">{s.label}</p>
              {s.sub && <p className="mt-1 text-[10px] text-gray-300">{s.sub}</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Page groups */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-4 text-xs font-black uppercase tracking-widest text-gray-400">Page Breakdown</p>
            <div className="space-y-3">
              {Object.entries(groups).map(([group, count]) => (
                <div key={group} className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#ff4500]"
                      style={{ width: `${(count / KNOWN_PAGES.length) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-sm font-black text-gray-700">{count}</span>
                  <span className="w-16 text-xs font-bold text-gray-400">{group}</span>
                </div>
              ))}
            </div>
            <Link
              href="/admin/seo"
              className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#ff4500] hover:underline"
            >
              Manage all pages <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Quick actions */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="mb-4 text-xs font-black uppercase tracking-widest text-gray-400">Quick Actions</p>
            <div className="space-y-2">
              <Link
                href="/admin/seo"
                className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-all hover:border-[#ff4500]/30 hover:bg-orange-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                  <Globe className="h-4 w-4 text-[#ff4500]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">SEO Manager</p>
                  <p className="text-xs text-gray-400">Edit meta titles & descriptions</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-300" />
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-all hover:border-[#ff4500]/30 hover:bg-orange-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50">
                  <Settings className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Settings & Sync</p>
                  <p className="text-xs text-gray-400">Sync all pages to Supabase</p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-300" />
              </Link>
              {missingTitle > 0 && (
                <Link
                  href="/admin/seo"
                  className="flex items-center gap-3 rounded-lg border border-amber-100 bg-amber-50 p-3 transition-all hover:border-amber-200"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                    <Edit3 className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-700">{missingTitle} pages missing title</p>
                    <p className="text-xs text-amber-500">Click to fix SEO issues</p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 text-amber-300" />
                </Link>
              )}
            </div>
          </div>

          {/* Recently edited */}
          {recentPages.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
              <p className="mb-4 text-xs font-black uppercase tracking-widest text-gray-400">Recently Edited</p>
              <div className="divide-y divide-gray-100">
                {recentPages.map((page) => (
                  <div key={page.slug} className="flex items-center gap-3 py-2.5">
                    <Globe className="h-3.5 w-3.5 shrink-0 text-gray-300" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900">{page.page_title}</p>
                      <p className="truncate text-xs text-gray-400">{page.meta_title}</p>
                    </div>
                    <Link
                      href={`/admin/seo/${page.slug}`}
                      className="shrink-0 text-[11px] font-bold text-[#ff4500] hover:underline"
                    >
                      Edit →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
