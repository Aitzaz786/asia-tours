"use server";

import { createClient } from "@supabase/supabase-js";

export async function updateInquiryStatus(id: string, status: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Status update error:", error.message);
    throw new Error(error.message);
  }

  return { success: true };
}
