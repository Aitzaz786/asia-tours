"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarHeart,
  CarFront,
  Gem,
  Plane,
  Route,
  type LucideIcon,
} from "lucide-react";
import { FiArrowUpRight } from "react-icons/fi";
import { services } from "@/app/services/servicesData";

const serviceIcons: Record<string, LucideIcon> = {
  "airport-transfer": Plane,
  "corporate-tours": BriefcaseBusiness,
  "luxury-vehicles": Gem,
  "custom-itineraries": Route,
  "events-wedding": CalendarHeart,
  "chauffeur-service": CarFront,
};

const serviceCategories: Record<string, string> = {
  "airport-transfer": "Transfer",
  "corporate-tours": "Corporate",
  "luxury-vehicles": "Premium",
  "custom-itineraries": "Tailored",
  "events-wedding": "Events",
  "chauffeur-service": "VIP",
};

export function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const Icon = serviceIcons[service.slug] ?? CarFront;

  return (
    <Link href={`/services/${service.slug}`} className="block h-full">
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative flex h-96 overflow-hidden rounded-2xl border border-brand-soft bg-white p-6"
      >
        <span className="absolute right-4 top-3 z-0 text-[80px] font-black leading-none text-gray-100 transition-colors duration-300 group-hover:text-white/20">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute bottom-0 left-1/2 z-0 h-[220%] w-[220%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-[#D4AF37] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" />

        <div className="relative z-10 flex h-full w-full flex-col">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center border border-[#eadfc8] bg-[#FFFBF0] text-[#111111] transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/15 group-hover:text-white">
            <Icon className="h-8 w-8" strokeWidth={1.8} />
          </div>

          <div className="mb-6 h-px w-full bg-[#eadfc8] transition-colors duration-300 group-hover:bg-white/25" />

          <h3 className="text-xl font-bold leading-7 text-black transition-colors duration-300 group-hover:text-white">
            {service.title}
          </h3>

          <span className="mt-3 inline-flex w-fit rounded-full bg-brand-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white">
            {serviceCategories[service.slug]}
          </span>

          <p className="mt-4 text-sm leading-6 text-gray-500 transition-colors duration-300 group-hover:text-white/90">
            {service.summary}
          </p>

          <span className="mt-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37] text-2xl text-[#0A0A0A] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#0A0A0A] group-hover:text-[#D4AF37]">
            <FiArrowUpRight />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

export default function ServiceCardsGrid() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <ServiceCard key={service.slug} service={service} index={index} />
      ))}
    </div>
  );
}
