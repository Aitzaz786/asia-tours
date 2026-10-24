import { articleHtml } from "@/lib/article-content";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminToken } from "@/lib/supabase/auth";

const fields = ["slug","title","excerpt","content","category","author","cover_image","cover_alt","is_published","published_at","meta_title","meta_description","og_title","og_description","og_image","canonical_url","no_index"] as const;

async function authorized(request: NextRequest) { return verifyAdminToken(request.cookies.get("admin_token")?.value); }
function clean(body: Record<string, unknown>) {
  const output: Record<string, unknown> = {};
  fields.forEach(field=>{ if(field in body) output[field]=body[field]; });
  output.slug=String(output.slug??"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  ["title","excerpt","content","category","author","cover_image","cover_alt","meta_title","meta_description","og_title","og_description","og_image","canonical_url"].forEach(field=>output[field]=String(output[field]??"").trim());
  output.content=articleHtml(String(output.content));
  output.is_published=Boolean(output.is_published); output.no_index=Boolean(output.no_index);
  output.published_at=output.is_published ? (output.published_at || new Date().toISOString()) : (output.published_at || null);
  output.updated_at=new Date().toISOString();
  return output;
}
function validate(data:Record<string,unknown>){ if(!data.slug||!data.title)return "Title and slug are required."; if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(data.slug)))return "Use a valid lowercase URL slug."; if(!data.excerpt||!String(data.content).replace(/<[^>]*>/g," ").replace(/&nbsp;/g," ").trim())return "Excerpt and article content are required."; return null; }
function refresh(slug:string){ revalidatePath("/blog"); revalidatePath(`/blog/${slug}`); revalidatePath("/sitemap.xml"); revalidatePath("/admin/blogs"); revalidatePath("/"); }

export async function POST(request:NextRequest){
  if(!(await authorized(request)))return NextResponse.json({error:"Unauthorized"},{status:401});
  const data=clean(await request.json()); const issue=validate(data); if(issue)return NextResponse.json({error:issue},{status:400});
  const {data:created,error}=await createAdminClient().from("blogs").insert(data).select("*").single();
  if(error)return NextResponse.json({error:error.message},{status:400}); refresh(String(data.slug)); return NextResponse.json({success:true,post:created},{status:201});
}
