import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/supabase/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/contact-us" || pathname.startsWith("/services/") || pathname.startsWith("/areas/")) {
    const clean = request.nextUrl.clone();
    let changed = false;
    for (const key of ["city", "vehicle", "service", "date", "passengers"]) {
      if (clean.searchParams.has(key)) { clean.searchParams.delete(key); changed = true; }
    }
    if (changed) return NextResponse.redirect(clean, 308);
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    const isValid = await verifyAdminToken(token);

    if (!isValid) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/contact-us", "/services/:path*", "/areas/:path*"],
};
