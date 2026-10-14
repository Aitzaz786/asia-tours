import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fleets, getFleetSlug } from "@/Data/cars";
import ServiceCarDetailView from "./ServiceCarDetailView";
import { getPageSeo, buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{city?:string}>;
};

export function generateStaticParams() {
  return fleets.map((fleet) => ({
    slug: getFleetSlug(fleet.name),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fleet = fleets.find((item) => getFleetSlug(item.name) === slug);
  const seo = await getPageSeo(`services/${slug}`);
  return buildMetadata(seo, `/services/${slug}`, {
    title: fleet ? `${fleet.name} Car Rental – Asia Tours Pakistan` : "Car Rental – Asia Tours Pakistan",
    description: fleet
      ? `Rent the ${fleet.name} in Pakistan. Premium vehicle, professional driver, available for airport transfers, corporate and leisure travel.`
      : "Premium car rental services across Pakistan.",
  });
}

export default async function ServiceCarDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const fleet = fleets.find((item) => getFleetSlug(item.name) === slug);

  if (!fleet) notFound();

  const similarFleets = fleets.filter((item) => item.name !== fleet.name).slice(0, 4);

  const {city}=await searchParams;
  return <ServiceCarDetailView fleet={fleet} similarFleets={similarFleets} city={city} />;
}
