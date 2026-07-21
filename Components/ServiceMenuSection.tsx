"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarHeart,
  CarFront,
  Gem,
  Plane,
  Route,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Service = {
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
};

type ServiceVisual = {
  icon: React.ElementType;
  image: string;
  accent: string;
  tag: string;
  stat1: string;
  label1: string;
  stat2: string;
  label2: string;
};

// ─── DATA — replace with your actual import from servicesData.ts ─────────────
// import { services } from "./servicesData";
const services: Service[] = [
  {
    slug: "airport-transfer",
    title: "Airport Transfer",
    summary:
      "Punctual, comfortable airport pickups and drop-offs coordinated around your flight schedule with professional drivers.",
    highlights: [
      "Flight tracking included",
      "Meet & greet service",
      "Luggage assistance",
      "24/7 availability",
    ],
  },
  {
    slug: "corporate-tours",
    title: "Corporate Tours",
    summary:
      "Reliable executive transport for meetings, events, and business travel. Impress clients with premium vehicles.",
    highlights: [
      "Executive class fleet",
      "Multi-stop itinerary support",
      "Invoice-ready billing",
      "Dedicated account handling",
    ],
  },
  {
    slug: "luxury-vehicles",
    title: "Luxury Vehicles",
    summary:
      "Our premium fleet includes Range Rovers, BMW 7 Series, and Mercedes S-Class for the most discerning travelers.",
    highlights: [
      "Range Rover & BMW fleet",
      "Leather interiors",
      "Climate controlled",
      "Chauffeur in uniform",
    ],
  },
  {
    slug: "custom-itineraries",
    title: "Custom Itineraries",
    summary:
      "We build your complete travel plan — multi-city routes, sightseeing stops, and flexible schedules coordinated for you.",
    highlights: [
      "Route planning included",
      "Multiple city stops",
      "Flexible scheduling",
      "Dedicated coordinator",
    ],
  },
  {
    slug: "events-wedding",
    title: "Events & Wedding",
    summary:
      "Make your special occasions unforgettable with our premium fleet, decorated vehicles, and VIP treatment.",
    highlights: [
      "Decorated vehicles",
      "On-time guaranteed",
      "VIP coordination",
      "Photography friendly",
    ],
  },
  {
    slug: "chauffeur-service",
    title: "Chauffeur Service",
    summary:
      "Professional uniformed chauffeurs trained for punctuality, discretion, and exceptional guest comfort on every journey.",
    highlights: [
      "Uniformed chauffeurs",
      "Background checked",
      "Multilingual drivers",
      "Privacy assured",
    ],
  },
];

// ─── VISUALS — update image paths to match your /public folder ───────────────
const serviceVisuals: ServiceVisual[] = [
  {
    icon: Plane,
    image: "/hero-bg.webp",
    accent: "Airport ready",
    tag: "Premium · Coordinated",
    stat1: "24/7",
    label1: "Always On",
    stat2: "0 min",
    label2: "Wait Time",
  },
  {
    icon: BriefcaseBusiness,
    image: "/2023-BMW-i7-exterior-1-scaled.webp",
    accent: "Executive class",
    tag: "Business · Reliable",
    stat1: "14+",
    label1: "Fleet Size",
    stat2: "100%",
    label2: "On-time Rate",
  },
  {
    icon: Gem,
    image: "/range-rover-vogue-01.webp",
    accent: "Luxury fleet",
    tag: "Exclusive · Premium",
    stat1: "14+",
    label1: "Vehicles",
    stat2: "5★",
    label2: "Rated Fleet",
  },
  {
    icon: Route,
    image: "/Badshahi_Mosque_front_picture.webp",
    accent: "Made to plan",
    tag: "Flexible · Planned",
    stat1: "Any",
    label1: "Destination",
    stat2: "Full",
    label2: "Coordination",
  },
  {
    icon: CalendarHeart,
    image: "/black.webp",
    accent: "Event perfect",
    tag: "VIP · Memorable",
    stat1: "500+",
    label1: "Events Done",
    stat2: "VIP",
    label2: "Treatment",
  },
  {
    icon: CarFront,
    image: "/Range-Rover.avif",
    accent: "With chauffeur",
    tag: "Professional · Elite",
    stat1: "100%",
    label1: "Professional",
    stat2: "5★",
    label2: "Rated Drivers",
  },
];

const easeCurve = [0.25, 0.46, 0.45, 0.94] as const;

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function ServiceMenuSection() {
  const [activeTab, setActiveTab] = useState(services[0].slug);

  const activeIndex = Math.max(services.findIndex((s) => s.slug === activeTab), 0);
  const activeService = services[activeIndex];
  const activeVisual = serviceVisuals[activeIndex % serviceVisuals.length];
  const ActiveIcon = activeVisual.icon;
  const activeNumber = String(activeIndex + 1).padStart(2, "0");
  const totalNumber = String(services.length).padStart(2, "0");

  return (
    <section
      id="service-menu"
      className="relative w-full max-w-[100vw] overflow-hidden bg-white px-4 py-12 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24"
    >
      {/* ── Dot grid background ── */}
      {/* <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(212,175,55,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      /> */}



      {/* ── Main Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">

        {/* ── Section Header ── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-6 rounded bg-[#D4AF37]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c24716]">
                Signature Services
              </p>
              <span className="h-0.5 w-6 rounded bg-[#D4AF37]" />
            </div>
            {/* Heading */}
            <h2 className="mt-4 max-w-full break-words text-4xl font-black leading-tight tracking-tight text-[#0f0e0c] sm:text-5xl lg:text-6xl">
              Choose the travel style.{" "}
              <em className="not-italic text-[#D4AF37]">We handle</em> the rest.
            </h2>
          </div>
          {/* Subtext */}
      
        </div>

        {/* ── Tab Strip ── */}
     <div className="mt-10 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
  <div className="flex min-w-max items-center gap-2 pb-1">
    {services.map((service, index) => {
      const visual = serviceVisuals[index % serviceVisuals.length];
      const Icon = visual.icon;
      const isActive = service.slug === activeTab;
 
      return (
        <button
          key={service.slug}
          type="button"
          onClick={() => setActiveTab(service.slug)}
          className={`relative inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
            isActive
              ? "border-[#111] bg-[#111] text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
              : "border-[#e8e4de] bg-white text-[#9a9690] hover:border-[#D4AF37] hover:text-[#D4AF37]"
          }`}
          aria-pressed={isActive}
        >
          <Icon
            className={`h-[13px] w-[13px] flex-shrink-0 transition-colors duration-200 ${
              isActive ? "text-white" : "text-[#b0ada8]"
            }`}
          />
          {service.title}
        </button>
      );
    })}
  </div>
</div>

        {/* ── Tab Content ── */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: easeCurve }}
              className="grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
              {/* ── LEFT: Image Panel ── */}
              <div className="relative h-[420px] overflow-hidden rounded-[28px] bg-[#f5f3f0]">
                <Image
                  src={activeVisual.image}
                  alt={activeService.title}
                  fill
                  className="object-cover transition-transform duration-700"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.72)_100%)]" />

                {/* Top-left accent badge */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-[10px] font-bold text-[#111] shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-sm">
                  <span className="h-[7px] w-[7px] flex-shrink-0 rounded-full bg-[#D4AF37]" />
                  <ActiveIcon className="h-3.5 w-3.5 text-[#D4AF37]" />
                  {activeVisual.accent}
                </div>

                {/* Top-right counter */}
                <p className="absolute right-4 top-[18px] text-[9px] font-bold uppercase tracking-[0.18em] text-white/50">
                  {activeNumber} / {totalNumber}
                </p>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.85)_0%,transparent_100%)] px-6 pb-6 pt-10">
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">
                    {activeVisual.tag}
                  </p>
                  <h3 className="text-[28px] font-black leading-[1.08] tracking-tight text-white sm:text-[32px]">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              {/* ── RIGHT: Info Panel — open layout, no card box ── */}
              <article className="flex min-h-[420px] flex-col justify-between py-1">

                <div>
                  {/* Title with left brand accent bar */}
                  <div className="flex items-stretch gap-4">
                    <span className="w-[3px] flex-shrink-0 self-stretch rounded-full bg-[#D4AF37]" />
                    <h3 className="text-3xl font-black leading-tight text-[#080b10] sm:text-4xl">
                      {activeService.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <p className="mb-6 mt-5 text-sm leading-7 text-[#7a7875] sm:text-base">
                    {activeService.summary}
                  </p>

                  {/* Numbered highlights */}
                  <div className="flex flex-col">
                    {activeService.highlights.map((highlight, i) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-3 border-b border-[#f2ede7] py-3 last:border-b-0"
                      >
                        {/* Number */}
                        <span className="min-w-[22px] text-[10px] font-black text-[#D4AF37]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {/* Text */}
                        <span className="flex-1 text-sm font-semibold text-[#1c1c1c]">
                          {highlight}
                        </span>
                        {/* Arrow icon */}
                        <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border border-[#ece8e2]">
                          <ArrowRight className="h-[8px] w-[8px] text-[#ccc]" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Bottom Row: CTA + Stats ── */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#f0ece6] pt-6">
                  {/* Explore button */}
                  <Link
                    href={`/services/${activeService.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-black uppercase tracking-wide text-[#0A0A0A] shadow-[0_8px_24px_rgba(212,175,55,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#B8860B] hover:shadow-[0_12px_32px_rgba(212,175,55,0.30)]"
                  >
                    Explore service
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xl font-black text-[#0f0e0c]">
                        {activeVisual.stat1}
                      </p>
                      <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.16em] text-[#b0ada8]">
                        {activeVisual.label1}
                      </p>
                    </div>
                    <div className="h-8 w-px bg-[#f0ece6]" />
                    <div className="text-right">
                      <p className="text-xl font-black text-[#0f0e0c]">
                        {activeVisual.stat2}
                      </p>
                      <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.16em] text-[#b0ada8]">
                        {activeVisual.label2}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
