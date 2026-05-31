import { NextRequest, NextResponse } from "next/server";
import { createAdminAuthClientWithSession } from "@/lib/supabase/auth";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("admin_token")?.value;
  const refreshToken = request.cookies.get("admin_refresh_token")?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      { success: false, error: "Not authenticated" },
      { status: 401 }
    );
  }

  const supabase = await createAdminAuthClientWithSession(
    accessToken,
    refreshToken
  );
  const { data, error } = await supabase.auth.mfa.listFactors();

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    enabled: Boolean(data?.totp.length),
    factors: data?.totp ?? [],
  });
}
