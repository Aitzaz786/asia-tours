import { NextRequest, NextResponse } from "next/server";
import { seedAllPages } from "@/lib/seo";

function verifyAdmin(request: NextRequest) {
  return request.cookies.get("admin_token")?.value === "asia_tours_admin_authenticated";
}

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await seedAllPages();
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true, count: result.count });
}
