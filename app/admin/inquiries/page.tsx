import { createAdminClient } from "@/lib/supabase/admin";
import AdminSidebar from "../_components/AdminSidebar";
import InquiriesClient from "./_components/InquiriesClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminInquiriesPage() {
  const supabase = createAdminClient();
  const { data: inquiries, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Inquiries fetch error:", error.message);
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">Inquiries</h1>
          <p className="mt-1 text-sm text-gray-400">
            All booking requests and contact inquiries from your website.
          </p>
        </div>
        <InquiriesClient initialData={inquiries ?? []} />
      </main>
    </div>
  );
}
