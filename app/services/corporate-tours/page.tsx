"use client";

import ServiceTypePage from "@/Components/ServiceTypePage";
import { getServiceTypeContent } from "@/app/services/serviceTypeData";

export default function CorporateToursPage() {
  const content = getServiceTypeContent("corporate-tours");
  if (!content) return null;
  return <ServiceTypePage content={content} />;
}
