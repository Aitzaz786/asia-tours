"use client";

import ServiceTypePage from "@/Components/ServiceTypePage";
import { getServiceTypeContent } from "@/app/services/serviceTypeData";

export default function ChauffeurServicePage() {
  const content = getServiceTypeContent("chauffeur-service");
  if (!content) return null;
  return <ServiceTypePage content={content} />;
}
