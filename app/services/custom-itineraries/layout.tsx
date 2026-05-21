import type { Metadata } from "next";
import { getPageSeo, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("services/custom-itineraries");
  return buildMetadata(seo, "/services/custom-itineraries", {
    title: "Custom Tour Itineraries Pakistan – Asia Tours",
    description:
      "Create your perfect Pakistan travel itinerary. We handle all ground transport so you can focus on the experience.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
