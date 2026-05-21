import type { Metadata } from "next";
import { getPageSeo, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("services/events-wedding");
  return buildMetadata(seo, "/services/events-wedding", {
    title: "Wedding Car Service Pakistan – Asia Tours",
    description:
      "Make your wedding day unforgettable with our premium wedding car and event transportation services across Pakistan.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
