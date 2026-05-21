import type { Metadata } from "next";
import { getPageSeo, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("services/luxury-vehicles");
  return buildMetadata(seo, "/services/luxury-vehicles", {
    title: "Luxury Car Rental Pakistan – Asia Tours",
    description:
      "Rent a luxury vehicle in Pakistan. Range Rovers, BMWs, Mercedes and more. Perfect for weddings, events and premium executive travel.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
