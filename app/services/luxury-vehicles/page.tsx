"use client";

import ServiceTypePage from "@/Components/ServiceTypePage";
import { getServiceTypeContent } from "@/app/services/serviceTypeData";

export default function LuxuryVehiclesPage() {
  const content = getServiceTypeContent("luxury-vehicles");
  if (!content) return null;
  return <ServiceTypePage content={content} />;
}
