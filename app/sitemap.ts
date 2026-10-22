import type { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { getPublishedBlogs } from "@/lib/blogs";

const baseUrl = "https://asiatourspk.com";

const staticRoutes = [
  "/",
  "/about-us",
  "/services",
  "/services/airport-transfer",
  "/services/chauffeur-service",
  "/services/corporate-tours",
  "/services/custom-itineraries",
  "/services/events-wedding",
  "/services/luxury-vehicles",
  "/areas",
  "/blog",
  "/contact-us",
  "/terms-and-conditions",
  "/privacy-policy",
] as const;

const excludePaths = ["/areas/karachi", "/areas/peshawar", "/areas/quetta"];

type SitemapEntry = MetadataRoute.Sitemap[number];
type SeoPageRow = { slug: string | null; no_index: boolean | null };

function getStaticEntry(route: string, lastModified: Date): SitemapEntry {
  return {
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1.0 : 0.8,
  };
}

function getSeoEntry(route: string, lastModified: Date): SitemapEntry {
  return {
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  };
}

function slugToRoute(slug: string): string {
  const normalizedSlug = slug.trim().replace(/^\/+|\/+$/g, "");
  if (!normalizedSlug || normalizedSlug === "home") {
    return "/";
  }
  return `/${normalizedSlug}`;
}

async function getSeoPageRoutes(): Promise<string[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("pages_seo")
    .select("slug, no_index")
    .order("slug");

  if (error) {
    console.error("Failed to fetch SEO page slugs for sitemap:", error.message);
    return [];
  }

  return ((data ?? []) as SeoPageRow[])
    .filter((row) => !row.no_index)
    .map((row) => row.slug?.trim())
    .filter((slug): slug is string => Boolean(slug))
    .map(slugToRoute)
    .filter((route) => !route.startsWith("/admin"))
    .filter((route) => !excludePaths.includes(route));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const routeMap = new Map<string, SitemapEntry>();

  staticRoutes.forEach((route) => {
    routeMap.set(route, getStaticEntry(route, lastModified));
  });

  const seoPageRoutes = await getSeoPageRoutes();

  seoPageRoutes.forEach((route) => {
    routeMap.set(route, routeMap.get(route) ?? getSeoEntry(route, lastModified));
  });

  const blogPosts = await getPublishedBlogs();
  blogPosts.filter(post=>!post.no_index).forEach(post=>{
    const route=`/blog/${post.slug}`;
    routeMap.set(route, { url:`${baseUrl}${route}`, lastModified:new Date(post.updated_at), changeFrequency:"monthly", priority:0.65 });
  });

  return Array.from(routeMap.values());
}
