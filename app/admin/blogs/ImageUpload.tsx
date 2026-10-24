"use client";
import { useState } from "react";
export async function uploadBlogImage(file:File){const body=new FormData();body.append("file",file);const res=await fetch("/api/admin/blogs/upload",{method:"POST",body});const result=await res.json();if(!res.ok)throw new Error(result.error||"Upload failed");return result.url as string;}
export default function ImageUpload({onUploaded}:{onUploaded:(url:string)=>void}){
 const [busy,setBusy]=useState(false),[error,setError]=useState("");
 return <div className="my-3"><label className="inline-flex cursor-pointer rounded-lg border border-[#d2ac2f] bg-[#fff8df] px-4 py-3 text-sm font-bold">{busy?"Converting & uploading…":"Upload image"}<input type="file" disabled={busy} accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={async e=>{const file=e.target.files?.[0];if(!file)return;setBusy(true);setError("");try{onUploaded(await uploadBlogImage(file))}catch(err){setError(err instanceof Error?err.message:"Upload failed")}finally{setBusy(false);e.target.value=""}}}/></label><p className="mt-2 text-xs text-gray-500">JPG, PNG, WebP or AVIF · up to 10 MB. Optimized to WebP automatically.</p>{error&&<p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}</div>
}
