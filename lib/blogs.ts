import { unstable_noStore as noStore } from "next/cache";
import { createAdminClient } from "./supabase/admin";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  cover_image: string;
  cover_alt: string;
  is_published: boolean;
  published_at: string | null;
  meta_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
  no_index: boolean;
  created_at: string;
  updated_at: string;
};

export function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 210));
}

export function formatBlogDate(value: string | null) {
  if (!value) return "Draft";
  return new Intl.DateTimeFormat("en-PK", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Karachi" }).format(new Date(value));
}

export async function getPublishedBlogs(): Promise<BlogPost[]> {
  noStore();
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("blogs").select("*").eq("is_published", true).lte("published_at", new Date().toISOString()).order("published_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as BlogPost[];
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  noStore();
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("blogs").select("*").eq("slug", slug).eq("is_published", true).maybeSingle();
    if (error) throw error;
    return (data as BlogPost | null) ?? null;
  } catch {
    return null;
  }
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  noStore();
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("blogs").select("*").order("updated_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as BlogPost[];
  } catch {
    return [];
  }
}
