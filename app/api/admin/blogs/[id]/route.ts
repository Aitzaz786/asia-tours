import { articleHtml } from "@/lib/article-content";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyAdminToken } from "@/lib/supabase/auth";

type Context={params:Promise<{id:string}>};
const fields=["slug","title","excerpt","content","category","author","cover_image","cover_alt","is_published","published_at","meta_title","meta_description","og_title","og_description","og_image","canonical_url","no_index"] as const;
async function authorized(request:NextRequest){return verifyAdminToken(request.cookies.get("admin_token")?.value)}
function refresh(slug?:string){revalidatePath("/");revalidatePath("/blog");if(slug)revalidatePath(`/blog/${slug}`);revalidatePath("/sitemap.xml");revalidatePath("/admin/blogs")}

export async function PUT(request:NextRequest,{params}:Context){
  if(!(await authorized(request)))return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await params; const body=await request.json() as Record<string,unknown>; const update:Record<string,unknown>={updated_at:new Date().toISOString()};
  fields.forEach(field=>{if(field in body)update[field]=body[field]});
  if("slug" in update)update.slug=String(update.slug).trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  if(!update.slug||!update.title||!update.excerpt||!update.content)return NextResponse.json({error:"Title, slug, excerpt and content are required."},{status:400});
  update.content=articleHtml(String(update.content));
  if(!String(update.content).replace(/<[^>]*>/g," ").replace(/&nbsp;/g," ").trim())return NextResponse.json({error:"Add article text before saving."},{status:400});
  update.is_published=Boolean(update.is_published);update.no_index=Boolean(update.no_index);update.published_at=update.is_published?(update.published_at||new Date().toISOString()):(update.published_at||null);
  const supabase=createAdminClient(); const {data:previous}=await supabase.from("blogs").select("slug").eq("id",id).maybeSingle(); const {data,error}=await supabase.from("blogs").update(update).eq("id",id).select("*").single();
  if(error)return NextResponse.json({error:error.message},{status:400});refresh(previous?.slug);refresh(String(update.slug));return NextResponse.json({success:true,post:data});
}

export async function DELETE(request:NextRequest,{params}:Context){
  if(!(await authorized(request)))return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await params; const supabase=createAdminClient(); const {data:previous}=await supabase.from("blogs").select("slug").eq("id",id).maybeSingle(); const {error}=await supabase.from("blogs").delete().eq("id",id);
  if(error)return NextResponse.json({error:error.message},{status:400});refresh(previous?.slug);return NextResponse.json({success:true});
}
