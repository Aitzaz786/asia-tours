import type { Metadata } from "next";
import { getPageSeo, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("about-us");
  return buildMetadata(seo, "/about-us", {
    title: "About Asia Tours Pakistan – Trusted Car Rental Company",
    description:
      "Learn about Asia Tours Pakistan – a trusted name in premium car rental and chauffeur services operating across Pakistan for over 15 years.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
