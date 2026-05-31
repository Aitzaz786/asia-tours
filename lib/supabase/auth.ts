import { createClient } from "@supabase/supabase-js";
import type { NextResponse } from "next/server";

type AdminSession = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

function createSupabaseAuthClient(accessToken?: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        : undefined,
    }
  );
}

export function createAdminAuthClient(accessToken?: string) {
  return createSupabaseAuthClient(accessToken);
}

export async function createAdminAuthClientWithSession(
  accessToken?: string,
  refreshToken?: string
) {
  const supabase = createSupabaseAuthClient(accessToken);

  if (accessToken && refreshToken) {
    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  return supabase;
}

export function setAdminSessionCookies(
  response: NextResponse,
  session: AdminSession
) {
  response.cookies.set("admin_token", session.access_token, {
    ...cookieOptions,
    maxAge: session.expires_in,
  });
  response.cookies.set("admin_refresh_token", session.refresh_token, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearAdminSessionCookies(response: NextResponse) {
  response.cookies.set("admin_token", "", { ...cookieOptions, maxAge: 0 });
  response.cookies.set("admin_refresh_token", "", {
    ...cookieOptions,
    maxAge: 0,
  });
}

export function setPendingMfaCookies(
  response: NextResponse,
  values: {
    accessToken: string;
    refreshToken: string;
    factorId: string;
    challengeId: string;
  }
) {
  const maxAge = 10 * 60;

  response.cookies.set("admin_mfa_access_token", values.accessToken, {
    ...cookieOptions,
    maxAge,
  });
  response.cookies.set("admin_mfa_refresh_token", values.refreshToken, {
    ...cookieOptions,
    maxAge,
  });
  response.cookies.set("admin_mfa_factor_id", values.factorId, {
    ...cookieOptions,
    maxAge,
  });
  response.cookies.set("admin_mfa_challenge_id", values.challengeId, {
    ...cookieOptions,
    maxAge,
  });
}

export function clearPendingMfaCookies(response: NextResponse) {
  response.cookies.set("admin_mfa_access_token", "", {
    ...cookieOptions,
    maxAge: 0,
  });
  response.cookies.set("admin_mfa_refresh_token", "", {
    ...cookieOptions,
    maxAge: 0,
  });
  response.cookies.set("admin_mfa_factor_id", "", {
    ...cookieOptions,
    maxAge: 0,
  });
  response.cookies.set("admin_mfa_challenge_id", "", {
    ...cookieOptions,
    maxAge: 0,
  });
}

export async function verifyAdminToken(token?: string) {
  if (!token) return false;

  const supabase = createSupabaseAuthClient(token);
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) return false;

  const { data: assurance } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel(token);

  if (assurance?.nextLevel === "aal2" && assurance.currentLevel !== "aal2") {
    return false;
  }

  return true;
}

export async function signOutAdminToken(token?: string) {
  if (!token) return;

  const supabase = createSupabaseAuthClient(token);
  await supabase.auth.signOut();
}
