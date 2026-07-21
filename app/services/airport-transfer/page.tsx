"use client";

import ServiceTypePage from "@/Components/ServiceTypePage";
import { getServiceTypeContent } from "@/app/services/serviceTypeData";

export default function AirportTransferPage() {
  const content = getServiceTypeContent("airport-transfer");
  if (!content) return null;
  return <ServiceTypePage content={content} />;
}
