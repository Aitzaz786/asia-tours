import type { Metadata } from "next";
import { getPageSeo, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("services");
  return buildMetadata(seo, "/services", {
    title: "Our Services – Asia Tours Pakistan Car Rental",
    description:
      "Explore our full range of services: airport transfers, corporate tours, luxury vehicles, custom itineraries, weddings and chauffeur services.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
