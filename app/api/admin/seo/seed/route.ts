import { NextRequest, NextResponse } from "next/server";
import { seedAllPages } from "@/lib/seo";
import { verifyAdminToken } from "@/lib/supabase/auth";

async function verifyAdmin(request: NextRequest) {
  return verifyAdminToken(request.cookies.get("admin_token")?.value);
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await seedAllPages();
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true, count: result.count });
}
