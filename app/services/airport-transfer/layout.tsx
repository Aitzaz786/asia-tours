import type { Metadata } from "next";
import { getPageSeo, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("services/airport-transfer");
  return buildMetadata(seo, "/services/airport-transfer", {
    title: "Airport Transfer Service Pakistan – Asia Tours",
    description:
      "Professional airport transfer services across Pakistan. Meet & greet, flight tracking, on-time guarantee. Book your airport car now.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
