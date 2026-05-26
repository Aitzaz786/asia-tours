"use server";

import { createClient } from "@/utils/supabase/server";

export type InquiryPayload = {
  full_name: string;
  phone: string;
  email?: string;
  pickup_location?: string;
  pickup_date?: string;
  service_type?: string;
  travel_date?: string;
  passengers?: number;
  trip_details?: string;
  form_source: "quick_booking" | "contact_us";
};

export async function submitInquiry(data: InquiryPayload) {
  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").insert([data]);

  if (error) {
    console.error("Supabase insert error:", error.message);
    throw new Error(error.message);
  }

  return { success: true };
}
