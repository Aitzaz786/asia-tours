import { revalidatePath, unstable_noStore as noStore } from "next/cache";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://asiatourspk.com";
const CANONICAL_BASE_URL = "https://asiatourspk.com";

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

export async function getPageSeo(slug: string): Promise<PageSeo | null> {
  noStore();
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("pages_seo")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
      .throwOnError();
    if (!data) return null;
    return data as PageSeo;
  } catch (error) {
    console.error("[SEO] Could not load page metadata", { slug, message: error instanceof Error ? error.message : "Database query failed" });
    return null;
  }
}

export async function getAllPages(): Promise<PageSeo[]> {
  noStore();
  const base = KNOWN_PAGES.map(knownToSeo);
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("pages_seo")
      .select("*")
      .order("slug")
      .throwOnError();

    if (!data || data.length === 0) return base;

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
  noStore();
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
    const pagePath = slug === "home" ? "/" : `/${slug}`;
    revalidatePath(pagePath);
    revalidatePath("/sitemap.xml");
    revalidatePath("/admin/seo");
    revalidatePath(`/admin/seo/${slug}`);
    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function seedAllPages(): Promise<{ success: boolean; count: number; error?: string }> {
  noStore();
  try {
    const supabase = createAdminClient();

    const { data: existing } = await supabase
      .from("pages_seo")
      .select("slug");

    const existingSlugs = new Set((existing ?? []).map((r: { slug: string }) => r.slug));

    const newRows = KNOWN_PAGES
      .filter((p) => !existingSlugs.has(p.slug))
      .map((p) => ({
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

    if (newRows.length === 0) {
      return { success: true, count: 0 };
    }

    const { error } = await supabase
      .from("pages_seo")
      .insert(newRows); // upsert nahi — sirf insert

    if (error) return { success: false, count: 0, error: error.message };
    return { success: true, count: newRows.length };
  } catch (e) {
    return { success: false, count: 0, error: String(e) };
  }
}

export function buildMetadata(
  seo: PageSeo | null,
  pagePath: string,
  defaults: { title: string; description: string }
) {
  noStore();
  const title = seo?.meta_title || defaults.title;
  const description = seo?.meta_description || defaults.description;
  const ogTitle = seo?.og_title || title;
  const ogDescription = seo?.og_description || description;
  const ogImage = seo?.og_image;

  const canonicalUrl = seo?.canonical_url?.trim() || `${CANONICAL_BASE_URL}${pagePath}`;

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
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: ogTitle,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: ogTitle,
      description: ogDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
