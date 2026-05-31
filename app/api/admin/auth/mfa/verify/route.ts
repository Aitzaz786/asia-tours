import { NextRequest, NextResponse } from "next/server";
import {
  createAdminAuthClientWithSession,
  setAdminSessionCookies,
} from "@/lib/supabase/auth";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get("admin_token")?.value;
  const refreshToken = request.cookies.get("admin_refresh_token")?.value;
  const { factorId, challengeId, code } = await request.json();

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      { success: false, error: "Not authenticated" },
      { status: 401 }
    );
  }

  if (!factorId || !challengeId || !code) {
    return NextResponse.json(
      { success: false, error: "Verification code is required" },
      { status: 400 }
    );
  }

  const supabase = await createAdminAuthClientWithSession(
    accessToken,
    refreshToken
  );
  const { data, error } = await supabase.auth.mfa.verify({
    factorId,
    challengeId,
    code,
  });

  if (error || !data?.access_token || !data.refresh_token) {
    return NextResponse.json(
      { success: false, error: "Invalid authentication code" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  setAdminSessionCookies(response, data);
  return response;
}
