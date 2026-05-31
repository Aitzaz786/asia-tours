import { NextRequest, NextResponse } from "next/server";
import {
  clearAdminSessionCookies,
  clearPendingMfaCookies,
  signOutAdminToken,
} from "@/lib/supabase/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  await signOutAdminToken(token);

  const response = NextResponse.json({ success: true });
  clearAdminSessionCookies(response);
  clearPendingMfaCookies(response);
  return response;
}
