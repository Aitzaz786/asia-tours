import type { Metadata } from "next";
import { getPageSeo, buildMetadata } from "@/lib/seo";
import HomePageContent from "./HomePageContent";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home");
  return buildMetadata(seo, "/", {
    title: "Asia Tours Pakistan – Premium Car Rental & Chauffeur Services",
    description:
      "Book premium car rentals and professional chauffeur services across Pakistan. Airport transfers, corporate tours, luxury vehicles and more.",
  });
}

export default function HomePage() {
  return <HomePageContent />;
}
