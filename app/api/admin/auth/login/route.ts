import { NextRequest, NextResponse } from "next/server";
import { createAdminAuthClient } from "@/lib/supabase/auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, error: "Email and password are required" },
      { status: 400 }
    );
  }

  const supabase = createAdminAuthClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session?.access_token) {
    return NextResponse.json(
      { success: false, error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: data.session.expires_in,
    path: "/",
  });
  return response;
}
