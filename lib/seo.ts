import { unstable_cache } from "next/cache";
import { createAdminClient } from "./supabase/admin";
import { KNOWN_PAGES, type KnownPage } from "./knownPages";

export type PageSeo = {
  id: string;
  slug: string;
  page_title: string;
  meta_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
  no_index: boolean;
  updated_at: string;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asiatourspakistan.com";

function knownToSeo(p: KnownPage): PageSeo {
  return {
    id: "",
    slug: p.slug,
    page_title: p.page_title,
    meta_title: p.meta_title,
    meta_description: p.meta_description,
    og_title: "",
    og_description: "",
    og_image: "",
    canonical_url: "",
    no_index: false,
    updated_at: "",
  };
}

export const getPageSeo = unstable_cache(
  async (slug: string): Promise<PageSeo | null> => {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("pages_seo")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error || !data) return null;
      return data as PageSeo;
    } catch {
      return null;
    }
  },
  ["page-seo"],
  { revalidate: 60, tags: ["seo"] }
);

export async function getAllPages(): Promise<PageSeo[]> {
  const base = KNOWN_PAGES.map(knownToSeo);
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("pages_seo")
      .select("*")
      .order("slug");

    if (error || !data || data.length === 0) return base;

    const dbMap = new Map<string, PageSeo>(
      (data as PageSeo[]).map((p) => [p.slug, p])
    );
    return base.map((page) => dbMap.get(page.slug) ?? page);
  } catch {
    return base;
  }
}

export async function updatePageSeo(
  slug: string,
  updates: Partial<Omit<PageSeo, "id" | "slug" | "updated_at">>
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient();
    const known = KNOWN_PAGES.find((p) => p.slug === slug);
    const { error } = await supabase.from("pages_seo").upsert(
      {
        slug,
        page_title: known?.page_title ?? slug,
        meta_title: known?.meta_title ?? "",
        meta_description: known?.meta_description ?? "",
        og_title: "",
        og_description: "",
        og_image: "",
        canonical_url: "",
        no_index: false,
        ...updates,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function seedAllPages(): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const supabase = createAdminClient();
    const rows = KNOWN_PAGES.map((p) => ({
      slug: p.slug,
      page_title: p.page_title,
      meta_title: p.meta_title,
      meta_description: p.meta_description,
      og_title: "",
      og_description: "",
      og_image: "",
      canonical_url: "",
      no_index: false,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase
      .from("pages_seo")
      .upsert(rows, { onConflict: "slug" });
    if (error) return { success: false, count: 0, error: error.message };
    return { success: true, count: rows.length };
  } catch (e) {
    return { success: false, count: 0, error: String(e) };
  }
}

export function buildMetadata(
  seo: PageSeo | null,
  pagePath: string,
  defaults: { title: string; description: string }
) {
  const title = seo?.meta_title || defaults.title;
  const description = seo?.meta_description || defaults.description;
  const ogTitle = seo?.og_title || title;
  const ogDescription = seo?.og_description || description;
  const ogImage = seo?.og_image || `${SITE_URL}/og-default.jpg`;

  const canonicalUrl = seo?.canonical_url
    ? seo.canonical_url
    : `${SITE_URL}${pagePath === "/" ? "" : pagePath}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: seo?.no_index ? "noindex,nofollow" : "index,follow",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: "Asia Tours Pakistan",
      type: "website" as const,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}
