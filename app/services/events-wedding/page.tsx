"use client";

import ServiceTypePage from "@/Components/ServiceTypePage";
import { getServiceTypeContent } from "@/app/services/serviceTypeData";

export default function EventsWeddingPage() {
  const content = getServiceTypeContent("events-wedding");
  if (!content) return null;
  return <ServiceTypePage content={content} />;
}
