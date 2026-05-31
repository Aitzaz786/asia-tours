import { NextRequest, NextResponse } from "next/server";
import { createAdminAuthClientWithSession } from "@/lib/supabase/auth";

export async function POST(request: NextRequest) {
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
  const { data: factors, error: factorsError } =
    await supabase.auth.mfa.listFactors();

  if (factorsError) {
    return NextResponse.json(
      { success: false, error: factorsError.message },
      { status: 500 }
    );
  }

  if (factors?.totp.length) {
    return NextResponse.json({
      success: false,
      error: "Two-factor authentication is already enabled.",
    });
  }

  const { data: enrollData, error: enrollError } =
    await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "Asia Tours Admin",
      issuer: "Asia Tours",
    });

  if (enrollError || !enrollData) {
    return NextResponse.json(
      {
        success: false,
        error: enrollError?.message ?? "Could not start 2FA setup",
      },
      { status: 500 }
    );
  }

  const { data: challenge, error: challengeError } =
    await supabase.auth.mfa.challenge({ factorId: enrollData.id });

  if (challengeError || !challenge?.id) {
    return NextResponse.json(
      {
        success: false,
        error: challengeError?.message ?? "Could not create 2FA challenge",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    factorId: enrollData.id,
    challengeId: challenge.id,
    qrCode: enrollData.totp.qr_code,
    secret: enrollData.totp.secret,
  });
}
