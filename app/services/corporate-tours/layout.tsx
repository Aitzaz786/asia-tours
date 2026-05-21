import type { Metadata } from "next";
import { getPageSeo, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("services/corporate-tours");
  return buildMetadata(seo, "/services/corporate-tours", {
    title: "Corporate Car Service Pakistan – Asia Tours",
    description:
      "Premium corporate transportation for business meetings, roadshows and executive travel across Pakistan. Professional drivers, luxury fleet.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
