import Link from "next/link";
import { getAllPages } from "@/lib/seo";
import { KNOWN_PAGES } from "@/lib/knownPages";
import AdminSidebar from "../_components/AdminSidebar";
import SyncButton from "./SyncButton";
import { Edit3, Globe } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageSeoRow = Awaited<ReturnType<typeof getAllPages>>[number];

const GROUP_ORDER = ["Core", "Services", "Fleet", "Areas"];

const GROUP_COLORS: Record<string, string> = {
  Core: "bg-blue-50 text-blue-700",
  Services: "bg-brand-muted text-brand-dark",
  Fleet: "bg-purple-50 text-purple-700",
  Areas: "bg-emerald-50 text-emerald-700",
};

export default async function AdminSeoPage() {
  const pages = await getAllPages();

  const groupMap = new Map(KNOWN_PAGES.map((p) => [p.slug, p.group]));
  const groups: Record<string, PageSeoRow[]> = {};
  for (const page of pages) {
    const g = groupMap.get(page.slug) ?? "Other";
    (groups[g] ??= []).push(page);
  }

  const synced = pages.filter((p) => p.id !== "").length;
  const missingTitle = pages.filter((p) => !p.meta_title).length;
  const noIndex = pages.filter((p) => p.no_index).length;

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />

      <main className="flex-1 overflow-auto p-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900">SEO Manager</h1>
            <p className="mt-0.5 text-sm text-gray-400">
              Edit meta titles and descriptions — changes reflect server-side on next page load.
            </p>
          </div>
          <SyncButton />
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total Pages", value: pages.length, color: "text-gray-900" },
            { label: "Synced to DB", value: synced, color: "text-emerald-600" },
            { label: "Missing Title", value: missingTitle, color: missingTitle > 0 ? "text-amber-500" : "text-gray-900" },
            { label: "No-Indexed", value: noIndex, color: noIndex > 0 ? "text-red-500" : "text-gray-900" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Groups */}
        {GROUP_ORDER.filter((g) => groups[g]?.length).map((group) => (
          <div key={group} className="mb-5">
            <div className="mb-2 flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${GROUP_COLORS[group] ?? "bg-gray-100 text-gray-600"}`}>
                {group}
              </span>
              <span className="text-xs text-gray-400">{groups[group].length} pages</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              {groups[group].map((page, i) => (
                <PageRow key={page.slug} page={page} index={i} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

function PageRow({ page, index }: { page: PageSeoRow; index: number }) {
  const isSynced = page.id !== "";
  const hasTitle = Boolean(page.meta_title);
  const hasDesc = Boolean(page.meta_description);

  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${index !== 0 ? "border-t border-gray-100" : ""}`}>
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100">
        <Globe className="h-3.5 w-3.5 text-gray-400" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-900">{page.page_title || page.slug}</p>
          {!isSynced && (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-500">
              not synced
            </span>
          )}
          {page.no_index && (
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-red-500">
              noindex
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-[11px] text-gray-400">/{page.slug}</p>
      </div>

      <div className="hidden min-w-0 max-w-sm flex-1 lg:block">
        {hasTitle ? (
          <p className="truncate text-xs text-gray-600">{page.meta_title}</p>
        ) : (
          <p className="text-xs text-amber-500">No meta title</p>
        )}
        {hasDesc ? (
          <p className="mt-0.5 truncate text-[11px] text-gray-400">{page.meta_description}</p>
        ) : (
          <p className="mt-0.5 text-[11px] text-amber-400">No description</p>
        )}
      </div>

      <Link
        href={`/admin/seo/${page.slug}`}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-[11px] font-bold text-gray-500 transition-all hover:border-[#D2AC2F] hover:text-[#D2AC2F]"
      >
        <Edit3 className="h-3 w-3" />
        Edit
      </Link>
    </div>
  );
}
