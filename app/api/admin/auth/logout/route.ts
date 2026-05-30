import { NextRequest, NextResponse } from "next/server";
import { signOutAdminToken } from "@/lib/supabase/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  await signOutAdminToken(token);

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
