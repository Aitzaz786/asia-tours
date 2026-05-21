import type { Metadata } from "next";
import { getPageSeo, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("areas");
  return buildMetadata(seo, "/areas", {
    title: "Service Areas – Asia Tours Pakistan",
    description:
      "Asia Tours Pakistan provides premium car rental and chauffeur services in 45+ cities across Pakistan including Lahore, Islamabad, Karachi and more.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
