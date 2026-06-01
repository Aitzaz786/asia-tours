"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "../../_components/AdminSidebar";
import { ArrowLeft, Check, Globe, Loader2 } from "lucide-react";

type SeoData = {
  slug: string;
  page_title: string;
  meta_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
  no_index: boolean;
};

const TITLE_MAX = 60;
const DESC_MAX = 160;

function CharCounter({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const color = len > max ? "text-red-500" : len > max * 0.85 ? "text-amber-500" : "text-gray-400";
  return <span className={`text-[10px] font-bold tabular-nums ${color}`}>{len}/{max}</span>;
}

function SerpPreview({ title, description, slug }: { title: string; description: string; slug: string }) {
  const parts = ["asiatourpk.com", ...slug.split("/").filter(Boolean)];
  const breadcrumb = parts.join(" › ");
  const displayTitle = (title || "Page Title").slice(0, 70);
  const isTitleOver = title.length > TITLE_MAX;
  const isDescOver = description.length > DESC_MAX;
  const displayDesc = (description || "Meta description will appear here. This text shows below the title in Google search results to help users understand what the page is about.").slice(0, 160);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-100 px-5 py-3 flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4285F4]">
          <span className="text-[9px] font-black text-white">G</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Google Preview</p>
        <div className="ml-auto flex gap-1.5">
          <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold tabular-nums ${isTitleOver ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
            T {title.length}/{TITLE_MAX}
          </span>
          <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold tabular-nums ${isDescOver ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
            D {description.length}/{DESC_MAX}
          </span>
        </div>
      </div>

      {/* SERP card — mimics Google's actual layout */}
      <div className="px-5 py-4" style={{ fontFamily: "arial, sans-serif" }}>
        {/* Site identity row */}
        <div className="mb-1 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-600 ring-1 ring-gray-200">
            A
          </div>
          <div>
            <p className="text-[13px] font-medium leading-none text-gray-900">Asia Tours Pakistan</p>
            <p className="text-[12px] leading-tight text-[#202124]" style={{ color: "#0d652d" }}>{breadcrumb}</p>
          </div>
        </div>

        {/* Title */}
        <p
          className="mt-1 cursor-pointer text-xl leading-snug"
          style={{
            color: isTitleOver ? "#c0392b" : "#1a0dab",
            fontWeight: 400,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          {displayTitle}{title.length > 70 && "…"}
        </p>

        {/* Description */}
        <p
          className="mt-1 text-sm leading-[1.58]"
          style={{ color: isDescOver ? "#c0392b" : "#4d5156", fontSize: "14px" }}
        >
          {displayDesc}{description.length > 160 && "…"}
        </p>
      </div>

      {/* Mobile preview toggle */}
      <div className="border-t border-gray-100 px-5 py-2.5 flex items-center gap-3">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Also visible on</span>
        <div className="flex gap-1.5">
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-black text-blue-600">Desktop</span>
          <span className="rounded-full bg-gray-50 px-2 py-0.5 text-[9px] font-black text-gray-400">Mobile</span>
        </div>
        {(isTitleOver || isDescOver) && (
          <span className="ml-auto text-[10px] font-bold text-red-500">
            {isTitleOver && isDescOver ? "Title & desc too long" : isTitleOver ? "Title too long" : "Desc too long"}
          </span>
        )}
      </div>
    </div>
  );
}

export default function SeoEditPage() {
  const params = useParams();
  const router = useRouter();
  const slugArr = Array.isArray(params.slug) ? params.slug : [params.slug as string];
  const fullSlug = slugArr.join("/");

  const [data, setData] = useState<SeoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/seo/${fullSlug}`, { cache: "no-store" })
      .then((r) => { if (r.status === 401) { router.push("/admin/login"); return null; } return r.json(); })
      .then((d) => { if (d) setData(d); setLoading(false); })
      .catch(() => { setError("Failed to load."); setLoading(false); });
  }, [fullSlug, router]);

  function update<K extends keyof SeoData>(key: K, value: SeoData[K]) {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
    setSaved(false);
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true); setError("");
    try {
      const res = await fetch(`/api/admin/seo/${fullSlug}`, {
        method: "PATCH",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { router.refresh(); setSaved(true); setTimeout(() => setSaved(false), 3000); }
      else { const d = await res.json(); setError(d.error ?? "Save failed"); }
    } catch { setError("Network error."); }
    finally { setSaving(false); }
  }

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
      <Loader2 className="h-5 w-5 animate-spin text-[#ff4500]" />
    </div>
  );

  if (!data) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f5] text-center">
      <p className="text-gray-600">{error || "Page not found."}</p>
      <Link href="/admin/seo" className="mt-4 text-sm font-bold text-[#ff4500] underline">← Back</Link>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />

      <main className="flex-1 overflow-auto p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <Link href="/admin/seo" className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-700">
              <ArrowLeft className="h-3 w-3" /> SEO Manager
            </Link>
            <h1 className="text-2xl font-black text-gray-900">{data.page_title || fullSlug}</h1>
            <p className="mt-0.5 text-sm text-gray-400">/{fullSlug}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#ff4500] px-5 py-2.5 text-sm font-black text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : saved ? <Check className="h-3.5 w-3.5" /> : null}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        {error && <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-500">{error}</div>}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_380px]">
          {/* Form */}
          <div className="space-y-4">
            {/* Page Identity */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Page Identity</p>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-500">Page Title (internal label)</span>
                <input type="text" value={data.page_title} onChange={(e) => update("page_title", e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff4500] focus:bg-white focus:outline-none"
                  placeholder="e.g. Airport Transfer" />
              </label>
            </div>

            {/* Search Engine */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-gray-400" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Search Engine</p>
              </div>
              <div className="space-y-4">
                <label className="block">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Meta Title</span>
                    <CharCounter value={data.meta_title} max={TITLE_MAX} />
                  </div>
                  <input type="text" value={data.meta_title} onChange={(e) => update("meta_title", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff4500] focus:bg-white focus:outline-none"
                    placeholder="Title shown in Google results (max 60 chars)" />
                </label>
                <label className="block">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Meta Description</span>
                    <CharCounter value={data.meta_description} max={DESC_MAX} />
                  </div>
                  <textarea rows={3} value={data.meta_description} onChange={(e) => update("meta_description", e.target.value)}
                    className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff4500] focus:bg-white focus:outline-none"
                    placeholder="Description shown under title in Google (max 160 chars)" />
                </label>
              </div>
            </div>

            {/* Open Graph */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Open Graph (Social Sharing)</p>
              <div className="space-y-4">
                <label className="block">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">OG Title</span>
                    <CharCounter value={data.og_title} max={70} />
                  </div>
                  <input type="text" value={data.og_title} onChange={(e) => update("og_title", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff4500] focus:bg-white focus:outline-none"
                    placeholder="Defaults to meta title if empty" />
                </label>
                <label className="block">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">OG Description</span>
                    <CharCounter value={data.og_description} max={200} />
                  </div>
                  <textarea rows={2} value={data.og_description} onChange={(e) => update("og_description", e.target.value)}
                    className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff4500] focus:bg-white focus:outline-none"
                    placeholder="Defaults to meta description if empty" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-500">OG Image URL</span>
                  <input type="url" value={data.og_image} onChange={(e) => update("og_image", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff4500] focus:bg-white focus:outline-none"
                    placeholder="https://…" />
                </label>
              </div>
            </div>

            {/* Advanced */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Advanced</p>
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-500">Canonical URL</span>
                  <input type="url" value={data.canonical_url} onChange={(e) => update("canonical_url", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-[#ff4500] focus:bg-white focus:outline-none"
                    placeholder="Leave empty to use default" />
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <div className="relative">
                    <input type="checkbox" checked={data.no_index} onChange={(e) => update("no_index", e.target.checked)} className="sr-only" />
                    <div className={`h-5 w-9 rounded-full transition-colors ${data.no_index ? "bg-red-500" : "bg-gray-200"}`} />
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${data.no_index ? "translate-x-4" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    No Index <span className="font-normal text-gray-400">(hide from search engines)</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Live SERP preview */}
          <div className="xl:sticky xl:top-8 xl:self-start">
            <SerpPreview title={data.meta_title} description={data.meta_description} slug={fullSlug} />
          </div>
        </div>
      </main>
    </div>
  );
}
