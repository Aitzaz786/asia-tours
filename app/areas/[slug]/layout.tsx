import type { Metadata } from "next";
import { getPageSeo, buildMetadata } from "@/lib/seo";
import { areas } from "../areasData";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find((a) => a.slug === slug);
  const seo = await getPageSeo(`areas/${slug}`);
  return buildMetadata(seo, `/areas/${slug}`, {
    title: `Car Rental ${area?.name ?? slug} – Asia Tours Pakistan`,
    description: `Premium car rental and chauffeur services in ${area?.name ?? slug}. Airport transfers, corporate rides and city tours available 24/7.`,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
