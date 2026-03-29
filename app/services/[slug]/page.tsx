import { notFound } from "next/navigation";
import { fleets, getFleetSlug } from "@/Data/cars";
import ServiceCarDetailView from "./ServiceCarDetailView";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return fleets.map((fleet) => ({
    slug: getFleetSlug(fleet.name),
  }));
}

export default async function ServiceCarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const fleet = fleets.find((item) => getFleetSlug(item.name) === slug);

  if (!fleet) notFound();

  const similarFleets = fleets.filter((item) => item.name !== fleet.name).slice(0, 3);

  return <ServiceCarDetailView fleet={fleet} similarFleets={similarFleets} />;
}
