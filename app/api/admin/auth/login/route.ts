import { NextRequest, NextResponse } from "next/server";
import {
  clearPendingMfaCookies,
  createAdminAuthClient,
  createAdminAuthClientWithSession,
  setAdminSessionCookies,
  setPendingMfaCookies,
} from "@/lib/supabase/auth";

type UserFactor = {
  id: string;
  factor_type: string;
  status: string;
};

function getVerifiedTotpFactor(factors?: UserFactor[]) {
  return factors?.find(
    (factor) => factor.factor_type === "totp" && factor.status === "verified"
  );
}

export async function POST(request: NextRequest) {
  const { email, password, code } = await request.json();

  if (code) {
    const accessToken = request.cookies.get("admin_mfa_access_token")?.value;
    const refreshToken = request.cookies.get("admin_mfa_refresh_token")?.value;
    const factorId = request.cookies.get("admin_mfa_factor_id")?.value;
    const challengeId = request.cookies.get("admin_mfa_challenge_id")?.value;

    if (!accessToken || !refreshToken || !factorId || !challengeId) {
      return NextResponse.json(
        { success: false, error: "Your 2FA challenge expired. Sign in again." },
        { status: 401 }
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
    clearPendingMfaCookies(response);
    return response;
  }

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

  const { data: factors } = await supabase.auth.mfa.listFactors();
  const verifiedTotpFactor =
    factors?.totp[0] ??
    getVerifiedTotpFactor(data.user?.factors as UserFactor[] | undefined);

  if (verifiedTotpFactor && data.session.refresh_token) {
    const { data: challenge, error: challengeError } =
      await supabase.auth.mfa.challenge({ factorId: verifiedTotpFactor.id });

    if (challengeError || !challenge?.id) {
      return NextResponse.json(
        { success: false, error: "Could not start 2FA verification" },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      success: true,
      mfaRequired: true,
    });
    setPendingMfaCookies(response, {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      factorId: verifiedTotpFactor.id,
      challengeId: challenge.id,
    });
    return response;
  }

  const response = NextResponse.json({ success: true });
  setAdminSessionCookies(response, data.session);
  return response;
}
