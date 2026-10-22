import AdminSidebar from "../_components/AdminSidebar";
import { getAllBlogs } from "@/lib/blogs";
import BlogManager from "./BlogManager";

export const dynamic="force-dynamic";
export const revalidate=0;

export default async function AdminBlogsPage(){
  const posts=await getAllBlogs();
  return <div className="flex min-h-screen bg-[#f2f0e9]"><AdminSidebar/><main className="min-w-0 flex-1 overflow-auto p-5 md:p-8"><BlogManager initialPosts={posts}/></main></div>;
}
