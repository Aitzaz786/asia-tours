import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { randomUUID } from "crypto";
import { verifyAdminToken } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  if (!await verifyAdminToken(request.cookies.get("admin_token")?.value)) return NextResponse.json({error:"Unauthorized"},{status:401});
  try {
    const form = await request.formData(); const file = form.get("file");
    if (!(file instanceof File) || !file.size || file.size > 10*1024*1024) return NextResponse.json({error:"Choose an image up to 10 MB."},{status:400});
    if (!["image/jpeg","image/png","image/webp","image/avif"].includes(file.type)) return NextResponse.json({error:"Use JPG, PNG, WebP or AVIF."},{status:400});
    const input = Buffer.from(await file.arrayBuffer());
    let output: Buffer;
    try { output = await sharp(input,{limitInputPixels:40000000}).rotate().resize({width:2000,height:2000,fit:"inside",withoutEnlargement:true}).webp({quality:85}).toBuffer(); }
    catch { return NextResponse.json({error:"This image cannot be decoded. Choose a valid image."},{status:400}); }
    const supabase=createAdminClient(); const bucket="blog-images";
    const {error:bucketError}=await supabase.storage.createBucket(bucket,{public:true,fileSizeLimit:10485760,allowedMimeTypes:["image/webp"]});
    if(bucketError && !/already exists|duplicate/i.test(bucketError.message)) throw bucketError;
    const path=`articles/${randomUUID()}.webp`;
    const {error}=await supabase.storage.from(bucket).upload(path,output,{contentType:"image/webp",cacheControl:"31536000",upsert:false});
    if(error)throw error;
    return NextResponse.json({url:supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl,bytes:output.length});
  } catch { return NextResponse.json({error:"Image upload failed. Check Supabase Storage and server credentials, then retry."},{status:500}); }
}
