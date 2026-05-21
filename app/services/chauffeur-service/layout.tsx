import type { Metadata } from "next";
import { getPageSeo, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("services/chauffeur-service");
  return buildMetadata(seo, "/services/chauffeur-service", {
    title: "Professional Chauffeur Service Pakistan – Asia Tours",
    description:
      "Hire a professional chauffeur in Pakistan. Background-checked, suited drivers for executive, VIP and personal transport.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
