"use client";

import ServiceTypePage from "@/Components/ServiceTypePage";
import { getServiceTypeContent } from "@/app/services/serviceTypeData";

export default function CustomItinerariesPage() {
  const content = getServiceTypeContent("custom-itineraries");
  if (!content) return null;
  return <ServiceTypePage content={content} />;
}
