import { createClient } from "@supabase/supabase-js";

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

export async function verifyAdminToken(token?: string) {
  if (!token) return false;

  const supabase = createSupabaseAuthClient(token);
  const { data, error } = await supabase.auth.getUser(token);

  return !error && Boolean(data.user);
}

export async function signOutAdminToken(token?: string) {
  if (!token) return;

  const supabase = createSupabaseAuthClient(token);
  await supabase.auth.signOut();
}
