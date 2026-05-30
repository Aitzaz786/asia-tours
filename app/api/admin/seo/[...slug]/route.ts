import { NextRequest, NextResponse } from "next/server";
import { getPageSeo, updatePageSeo } from "@/lib/seo";
import { KNOWN_PAGES } from "@/lib/knownPages";
import { verifyAdminToken } from "@/lib/supabase/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function verifyAdmin(request: NextRequest) {
  return verifyAdminToken(request.cookies.get("admin_token")?.value);
}

type Context = { params: Promise<{ slug: string[] }> };

export async function GET(request: NextRequest, { params }: Context) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const pageSlug = slug.join("/");

  const seo = await getPageSeo(pageSlug);
  if (seo) {
    return NextResponse.json(seo, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  }

  // Fall back to known page defaults so the edit form loads even before sync
  const known = KNOWN_PAGES.find((p) => p.slug === pageSlug);
  if (known) {
    return NextResponse.json({
      id: "",
      slug: pageSlug,
      page_title: known.page_title,
      meta_title: known.meta_title,
      meta_description: known.meta_description,
      og_title: "",
      og_description: "",
      og_image: "",
      canonical_url: "",
      no_index: false,
      updated_at: "",
    }, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PATCH(request: NextRequest, { params }: Context) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const pageSlug = slug.join("/");
  const body = await request.json();

  const allowed = ["page_title", "meta_title", "meta_description", "og_title", "og_description", "og_image", "canonical_url", "no_index"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  const result = await updatePageSeo(pageSlug, updates);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json(
    { success: true },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
