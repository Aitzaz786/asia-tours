import type { Metadata } from "next";
import { getPageSeo, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("contact-us");
  return buildMetadata(seo, "/contact-us", {
    title: "Contact Asia Tours Pakistan – Book a Car Today",
    description:
      "Get in touch with Asia Tours Pakistan to book a car rental, airport transfer, or chauffeur service. Available 24/7 across Pakistan.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
