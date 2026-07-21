"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  Building2,
  Car,
  Check,
  ChevronDown,
  Clock,
  Heart,
  Info,
  MapPin,
  Mountain,
  Phone,
  Plane,
  Shield,
  Star,
  Timer,
  Users,
  Zap,
} from "lucide-react";
import { areas } from "../areasData";
import DarkHeroShell, { HOME_HERO_CONTENT_HEIGHT } from "@/Components/DarkHeroShell";
import QuickBookingForm from "@/Components/QuickBookingForm";
import { FiArrowUpRight } from "react-icons/fi";
import FaqSection from "@/Components/FaqSection";
import CtaBannerSection from "@/Components/CtaBannerSection";
import OurFleetsSection from "@/Components/OurFleetsSection";
import PricingTableSection from "@/Components/PricingTableSection";
import CitiesNetworkSection from "@/Components/CitiesNetworkSection";
import { LahoreServiceMap } from "@/app/HomePageContent";
import { SECTION_Y, SECTION_Y_END } from "@/lib/sectionSpacing";

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// ─── STATIC DATA ──────────────────────────────────────────────────────────────

const STATS = [
  { value: "24/7", label: "Always Available" },
  { value: "5★", label: "Rated Service" },
  { value: "14+", label: "Fleet Size" },
  { value: "100%", label: "On-time" },
];

const SERVICE_TYPES = [
  {
    icon: Plane,
    title: "Airport Transfers",
    desc: "Coordinated pickups and drop-offs from all major airports, timed precisely to your flight schedule.",
  },
  {
    icon: Building2,
    title: "Corporate Travel",
    desc: "Professional chauffeur service for business meetings, factory visits, and executive transfers.",
  },
  {
    icon: Heart,
    title: "Wedding Convoys",
    desc: "Elegantly arranged fleets for your special day — bridal cars, groom vehicles, and full convoy management.",
  },
  {
    icon: MapPin,
    title: "City Coverage",
    desc: "Door-to-door service across every neighborhood, market, and commercial zone in the city.",
  },
  {
    icon: Mountain,
    title: "Hill Station Routes",
    desc: "Scenic and safe transfers to hill destinations in all seasons, including snow-ready vehicles.",
  },
  {
    icon: Clock,
    title: "Long-Distance Travel",
    desc: "Comfortable intercity journeys with experienced, route-familiar professional drivers.",
  },
];

const STEPS = [
  {
    num: "01",
    icon: Car,
    title: "Choose Your Vehicle",
    desc: "Browse our range from economy sedans to luxury SUVs. Pick what fits your journey and budget.",
  },
  {
    num: "02",
    icon: Phone,
    title: "Confirm Booking",
    desc: "Contact us via WhatsApp, phone, or the booking form. We confirm your ride instantly.",
  },
  {
    num: "03",
    icon: Star,
    title: "Enjoy Your Ride",
    desc: "Your professional driver arrives on time, clean vehicle ready, and takes you door to door.",
  },
];

const FLEET_TIERS = [
  {
    tier: "Economy",
    tagline: "Comfortable & Affordable",
    priceFrom: "8,000",
    examples: ["Toyota Corolla", "Honda Civic", "Suzuki Cultus"],
    features: ["Air Conditioned", "City Drops", "Fuel Efficient"],
    featured: false,
  },
  {
    tier: "Premium",
    tagline: "Executive Class",
    priceFrom: "22,000",
    examples: ["Toyota Fortuner", "Honda CR-V", "Land Cruiser"],
    features: ["Spacious Cabin", "Pro Chauffeur", "Airport Transfers"],
    featured: false,
  },
  {
    tier: "Luxury",
    tagline: "Elite Experience",
    priceFrom: "45,000",
    examples: ["Range Rover", "BMW 5 Series", "Mercedes E-Class"],
    features: ["Premium Interior", "VIP Chauffeur", "Corporate Events"],
    featured: true,
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Fully Insured Fleet",
    desc: "Every vehicle carries comprehensive insurance for your complete peace of mind on every journey.",
  },
  {
    icon: Users,
    title: "Trained Chauffeurs",
    desc: "Vetted, licensed, and route-trained drivers who put your safety and comfort first.",
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    desc: "No waiting — your booking is confirmed immediately with driver details sent right away.",
  },
  {
    icon: Award,
    title: "5-Star Rated Service",
    desc: "Consistently top-rated by hundreds of satisfied customers across Pakistan.",
  },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function AreaPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const area = areas.find((a) => a.slug === slug);
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [openTipIndex, setOpenTipIndex] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setOpenServiceIndex(openServiceIndex === index ? null : index);
  };


  if (!area) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">404</p>
        <h1 className="text-4xl font-black text-[#0f0e0c]">Area not found</h1>
        <p className="mt-3 text-base text-[#7a7875]">
          We couldn&apos;t find service information for this area.
        </p>
        <Link
          href="/areas"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-black uppercase tracking-wide text-[#0A0A0A] hover:bg-[#B8860B]"
        >
          ← All Areas
        </Link>
      </main>
    );
  }


  const marqueeCities = areas
    .slice(0, 10)
    .map((a) =>
      a.name ?? a.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );

  const faqs = [
    {
      q: `Do you offer 24/7 car rental service in ${area.name}?`,
      a: `Yes — our ${area.name} team is available around the clock. Whether it's a midnight airport pickup or an early morning corporate transfer, we dispatch immediately upon confirmation.`,
    },
    {
      q: `What types of vehicles are available in ${area.name}?`,
      a: `We offer a full range from economy sedans (Toyota Corolla, Honda Civic) to premium SUVs (Toyota Fortuner, Land Cruiser) and luxury vehicles (Range Rover, Mercedes E-Class, BMW 5 Series).`,
    },
    {
      q: `Can you arrange airport transfers in ${area.name}?`,
      a: `Absolutely. We monitor flight arrival times and ensure your driver is waiting at the terminal when you land. Departure transfers are also available so you never miss a flight.`,
    },
    {
      q: `How do I book a car rental in ${area.name}?`,
      a: `Simply contact us via WhatsApp, phone call, or the online booking form. We confirm your booking instantly and send you your driver's details before your journey begins.`,
    },
  ];
        const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const trustBadges = [
    { icon: "✓", text: "Free Cancellation" },
    { icon: "✓", text: "24/7 Support" },
    { icon: "✓", text: "No Hidden Fees" },
    { icon: "✓", text: "Insured Fleet" },
  ];



  return (
    <main className="min-h-screen bg-white text-[#0f0e0c]">
        <section className="home-hero relative z-30 w-full overflow-x-hidden pb-10">
          <DarkHeroShell>
            <div className={`relative z-10 flex w-full items-center justify-center px-5 pt-28 pb-6 sm:px-8 sm:pt-36 sm:pb-20 lg:px-12 xl:px-[4.5rem] ${HOME_HERO_CONTENT_HEIGHT}`}>
              <div className="mx-auto max-w-3xl text-center">
                  <div className="mb-4 inline-flex items-center justify-center gap-3 sm:mb-6">
                    <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37] sm:w-12" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37] sm:text-xs">
                      {area.province} Service Area
                    </span>
                    <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37] sm:w-12" />
                  </div>

                  <h1 className="mx-auto max-w-full text-[2.5rem] font-black leading-[0.98] tracking-tight text-white sm:text-5xl lg:whitespace-nowrap lg:text-[3.6rem] xl:text-[4.25rem] 2xl:text-[4.6rem]">
                    Car rental in <span className="text-[#D4AF37]">{area.name}</span>
                  </h1>

                  <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/72 sm:text-base lg:text-lg">
                Premium car rental &amp; chauffeur services in {area.name} — professional, punctual, and available 24/7.
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {trustBadges.map((badge) => (
                      <span
                        key={badge.text}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/85 sm:px-3.5 sm:text-xs"
                      >
                        <span className="text-[#D4AF37]">{badge.icon}</span>
                        {badge.text}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 hidden items-center justify-center gap-3 md:flex">
                    <Link
                      href="/services"
                      className="shimmer-btn relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-bold text-[#0A0A0A] shadow-[0_20px_45px_rgba(212,175,55,0.3)] sm:w-auto"
                    >
                      Book A Rental
                    </Link>

                    <div className="flex w-full items-center justify-center gap-3 sm:w-auto">
                      <Link
                        href="/about-us"
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black shadow-md transition-all hover:bg-white/90 sm:flex-none"
                      >
                        Learn More
                      </Link>

                      <Link
                        href="/about-us"
                        className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-white/90"
                        aria-label="Learn more"
                      >
                        <FiArrowUpRight className="text-lg text-black transition-transform duration-300 group-hover:rotate-45" />
                      </Link>
                    </div>
                  </div>
              </div>
            </div>
          </DarkHeroShell>

          <div className="relative z-40 px-3 sm:px-5 lg:px-7">
            <QuickBookingForm easeCurve={easeCurve} />
          </div>
        </section>


      {/* ─── SERVICE INFO ─────────────────────────────────────────────────────── */}
      <section className={`bg-white px-4 sm:px-6 lg:px-8 ${SECTION_Y}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start"
        >
          <motion.div variants={fadeUp} className="text-center lg:text-left">
            <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-0.5 w-6 rounded bg-[#D4AF37]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]">About This Area</p>
            </div>
            <h2 className="mx-auto max-w-xl text-4xl font-black leading-tight tracking-tight text-[#0f0e0c] sm:text-5xl lg:mx-0">
              Service in{" "}
              <span className="text-[#D4AF37]">{area.name}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5f574f] lg:mx-0">
              {area.description}
            </p>

            <div className="mt-8 rounded-[24px] border border-[#eadfd6] bg-[#fbfaf8] p-6 text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4AF37]">Why Choose Us</p>
              <p className="mt-3 text-sm leading-7 text-[#5f574f]">{area.whyUs}</p>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-[#0A0A0A] transition-all hover:-translate-y-0.5 hover:bg-[#B8860B]">
                Plan My Ride <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+923001234567" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#eadfd6] bg-white px-7 py-3.5 text-sm font-bold text-[#0f0e0c] transition-all hover:-translate-y-0.5 hover:border-[#D4AF37]/40">
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                Quick Call
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-[28px] border border-[#eadfd6] bg-[#fbfaf8] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-0.5 w-6 rounded bg-[#D4AF37]" />
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]">What We Cover</p>
                </div>
                <h3 className="text-2xl font-black leading-tight text-[#0f0e0c] sm:text-3xl">
                  Key service coverage
                </h3>
              </div>
              <div className="rounded-2xl border border-[#eadfd6] bg-white px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a7875]">Popular route</p>
                <div className="mt-1 flex items-center gap-2 text-sm font-black text-[#0f0e0c]">
                  <span>{area.popularRoutes[0]?.from ?? area.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>{area.popularRoutes[0]?.to ?? "Lahore"}</span>
                  <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-[#F5E9C8] px-2 py-0.5 text-[10px] font-bold text-[#D4AF37]">
                    <Timer className="h-3 w-3" />
                    {area.popularRoutes[0]?.duration ?? "On request"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {area.highlights.map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex min-h-[72px] items-center gap-3 rounded-[18px] border border-[#eadfd6] bg-white px-4 py-4 transition-all hover:border-[#D4AF37]/35 hover:shadow-[0_12px_26px_rgba(35,27,21,0.06)]"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#F5E9C8]">
                    <Check className="h-4 w-4 text-[#D4AF37]" />
                  </span>
                  <span className="text-sm font-bold leading-5 text-[#0f0e0c]">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ["24/7", "Availability"],
                ["Clean", "Insured fleet"],
                ["Local", "Route planning"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[18px] border border-[#eadfd6] bg-white px-5 py-4">
                  <p className="text-xl font-black text-[#D4AF37]">{value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a7875]">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="overflow-hidden border-y border-[#eadfd6] py-5">
        <div className="areas-marquee-track flex w-max whitespace-nowrap">
          {[...marqueeCities, ...marqueeCities].map((city, i) => (
            <span key={i} className="mx-6 text-sm font-black uppercase tracking-[0.24em] text-black">
              {city}
              <span className="ml-6 text-[#D4AF37]">•</span>
            </span>
          ))}
        </div>
      </section>

      <OurFleetsSection />
      <PricingTableSection compact />

      {/* ─── SERVICES LIST ────────────────────────────────────────────────────── */}
      <section className={`bg-white px-4 sm:px-6 lg:px-8 ${SECTION_Y}`}>
        <div className="mx-auto max-w-[1600px]">
          {/* Mobile header — no animation */}
          <div className="mb-10 flex flex-col gap-8 text-center md:hidden">
            <div>
              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#D4AF37]" />
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                  Our Services
                </p>
              </div>
              <h2 className="text-5xl font-black leading-[0.92] tracking-tight text-[#0f0e0c] sm:text-6xl">
                Services in
                <span className="pl-3 text-[#D4AF37]">{area.name}</span>
              </h2>
            </div>
            <div className="mx-auto max-w-sm">
              <div className="mt-6 flex justify-center gap-3">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0A0A0A] transition-all hover:-translate-y-0.5 hover:bg-[#B8860B]"
                >
                  Book a Service <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop header — animated */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-10 hidden flex-col gap-8 text-center md:flex lg:flex-row lg:items-end lg:justify-between lg:text-left"
          >
            <div>
              <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-px w-8 bg-[#D4AF37]" />
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                  Our Services
                </p>
              </div>
              <h2 className="text-5xl font-black leading-[0.92] tracking-tight text-[#0f0e0c] sm:text-6xl ">
                Services in
                <span className="pl-3 text-[#D4AF37]">{area.name}</span>
              </h2>
            </div>
            <div className="mx-auto max-w-sm lg:mx-0 lg:pb-2 lg:text-right">
              <div className="mt-6 flex justify-center gap-3 lg:justify-end">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0A0A0A] transition-all hover:-translate-y-0.5 hover:bg-[#B8860B]"
                >
                  Book a Service <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Mobile accordion — open/close, no framer-motion */}
          <div className="how-it-works-section area-services-mobile border-t border-[#e8e0d8] md:hidden">
            {SERVICE_TYPES.map((svc, index) => {
              const Icon = svc.icon;
              const isOpen = openServiceIndex === index;
              return (
                <div key={svc.title} className="border-b border-[#e8e0d8]">
                  <div
                    className="flex items-center gap-3 px-2 py-3.5 sm:gap-5 sm:px-6 sm:py-4"
                    style={{
                      backgroundColor: isOpen ? "rgba(212,175,55,0.05)" : "transparent",
                      borderLeft: isOpen ? "3px solid #D4AF37" : "3px solid transparent",
                      paddingLeft: isOpen ? "10px" : undefined,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleService(index)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left sm:gap-5"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="w-7 shrink-0 text-xs font-black tabular-nums sm:w-9"
                        style={{ color: isOpen ? "#D4AF37" : "#c8b8ae" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10"
                        style={{
                          backgroundColor: isOpen ? "#D4AF37" : "#F5E9C8",
                          color: isOpen ? "#ffffff" : "#D4AF37",
                        }}
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <h3
                        className="min-w-0 flex-1 text-base font-black tracking-tight sm:text-lg"
                        style={{ color: isOpen ? "#D4AF37" : "#0f0e0c" }}
                      >
                        {svc.title}
                      </h3>
                      <ChevronDown
                        className={`how-it-works-chevron h-5 w-5 shrink-0 text-[#D4AF37] ${isOpen ? "is-open" : ""}`}
                      />
                    </button>
                    <Link
                      href="/contact-us"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border sm:h-8 sm:w-8"
                      style={{
                        borderColor: isOpen ? "#D4AF37" : "#e8e0d8",
                        backgroundColor: isOpen ? "#D4AF37" : "transparent",
                      }}
                      aria-label={`Learn more about ${svc.title}`}
                    >
                      <ArrowRight
                        className="h-3 w-3 sm:h-4 sm:w-4"
                        style={{ color: isOpen ? "#ffffff" : "#c8b8ae" }}
                      />
                    </Link>
                  </div>
                  <div
                    className={`how-it-works-panel ${isOpen ? "is-open" : ""}`}
                    aria-hidden={!isOpen}
                  >
                    <div className="how-it-works-panel__inner px-2 pb-4 sm:px-6 sm:pb-5">
                      <p className="text-xs leading-6 text-[#6f6962] sm:text-sm">{svc.desc}</p>
                      <Link
                        href="/contact-us"
                        className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]"
                      >
                        Learn More <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop editorial reveal rows — hover + framer-motion */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerFast}
            className="hidden border-t border-[#e8e0d8] md:block"
          >
            {SERVICE_TYPES.map((svc, index) => {
              const Icon = svc.icon;
              const isActive = hoveredService === index;
              return (
                <motion.div
                  key={svc.title}
                  variants={fadeUp}
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="border-b border-[#e8e0d8]"
                  style={{ userSelect: "none" }}
                >
                  <Link href="/contact-us" className="block">
                    <div
                      className="flex items-center gap-3 px-2 py-3.5 transition-all duration-300 sm:gap-5 sm:px-6 sm:py-4"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(212,175,55,0.05)"
                          : "transparent",
                        borderLeft: isActive
                          ? "3px solid #D4AF37"
                          : "3px solid transparent",
                        paddingLeft: isActive ? "10px" : undefined,
                      }}
                    >
                      <span
                        className="w-7 shrink-0 text-xs font-black tabular-nums transition-all duration-300 sm:w-9"
                        style={{ color: isActive ? "#D4AF37" : "#c8b8ae" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 sm:h-10 sm:w-10"
                        style={{
                          backgroundColor: isActive ? "#D4AF37" : "#F5E9C8",
                          color: isActive ? "#ffffff" : "#D4AF37",
                          boxShadow: isActive
                            ? "0 8px 24px rgba(212,175,55,0.35)"
                            : "none",
                        }}
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3
                          className="text-base font-black tracking-tight transition-all duration-200 sm:text-lg lg:text-xl xl:text-2xl"
                          style={{
                            color: isActive ? "#D4AF37" : "#0f0e0c",
                            letterSpacing: isActive ? "-0.02em" : "normal",
                          }}
                        >
                          {svc.title}
                        </h3>
                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              key="desc"
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                                marginTop: 6,
                              }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              className="overflow-hidden text-xs leading-6 text-[#6f6962] sm:text-sm"
                            >
                              {svc.desc}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.18 }}
                            className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                            style={{
                              backgroundColor: "rgba(212,175,55,0.08)",
                              color: "#D4AF37",
                              border: "1px solid rgba(212,175,55,0.2)",
                            }}
                          >
                            Learn More
                          </motion.span>
                        )}
                      </AnimatePresence>

                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-8 sm:w-8"
                        style={{
                          borderColor: isActive ? "#D4AF37" : "#e8e0d8",
                          backgroundColor: isActive ? "#D4AF37" : "transparent",
                          transform: isActive ? "translateX(4px)" : "translateX(0)",
                          boxShadow: isActive ? "0 4px 12px rgba(212,175,55,0.3)" : "none",
                        }}
                      >
                        <ArrowRight
                          className="h-3 w-3 transition-colors duration-300 sm:h-4 sm:w-4"
                          style={{ color: isActive ? "#ffffff" : "#c8b8ae" }}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <CtaBannerSection compact />

      <section className={`relative overflow-hidden bg-white px-4 sm:px-6 lg:px-8 ${SECTION_Y}`}>
        <div className="absolute inset-0">
          <Image src={area.image} alt="" fill className="object-cover object-center opacity-[0.08]" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/85" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"
        >
          <motion.div variants={fadeUp} className="text-center lg:text-left">
            <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-0.5 w-6 rounded bg-[#D4AF37]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#D4AF37]">Simple Process</p>
            </div>
            <h2 className="mx-auto max-w-lg text-4xl font-black leading-tight tracking-tight text-[#0f0e0c] sm:text-5xl lg:mx-0">
              Book once. We handle the ride.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#6f6962] lg:mx-0">
              No repeated calls or confusing steps. Pick the service, confirm the details, and your chauffeur is assigned with the route plan.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#eadfd6] bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#5f574f] shadow-[0_12px_34px_rgba(35,27,21,0.06)]">
              <Info className="h-4 w-4 text-[#D4AF37]" />
              <span className="md:hidden">Tap info icons for quick tips</span>
              <span className="hidden md:inline">Hover info icons for quick tips</span>
            </div>
          </motion.div>

          <div className="relative border-l border-[#eadfd6] pl-7 sm:pl-10">
            <span className="absolute -left-[5px] top-0 h-full w-[9px] bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/35 to-transparent" />

            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  className="group relative grid gap-4 py-8 sm:grid-cols-[72px_1fr_auto] sm:items-start"
                >
                  <span className="absolute -left-[46px] top-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[#D4AF37] text-[10px] font-black text-[#0A0A0A] shadow-[0_10px_24px_rgba(212,175,55,0.28)] sm:-left-[56px]">
                    {step.num}
                  </span>
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5E9C8] text-[#D4AF37] transition-all group-hover:bg-[#D4AF37] group-hover:text-[#0A0A0A]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-black text-[#0f0e0c]">{step.title}</h3>
                      <button
                        type="button"
                        onClick={() => setOpenTipIndex(openTipIndex === i ? null : i)}
                        aria-expanded={openTipIndex === i}
                        aria-label={`More info about ${step.title}`}
                        className="group/tip relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#eadfd6] bg-white text-[#D4AF37]"
                      >
                        <Info className="h-4 w-4" />
                        <span
                          className={`pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-64 -translate-x-1/2 rounded-2xl bg-[#0f0e0c] px-4 py-3 text-left text-xs font-medium leading-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.2)] transition-opacity md:opacity-0 md:group-hover/tip:opacity-100 ${
                            openTipIndex === i ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {i === 0
                            ? "Tell us your date, city, passenger count, and preferred vehicle style."
                            : i === 1
                              ? "We confirm fare, pickup point, driver timing, and route expectations."
                              : "Your chauffeur arrives clean, punctual, and ready for door-to-door service."}
                        </span>
                      </button>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6f6962]">{step.desc}</p>
                  </div>
                  <Link href="/contact-us" className="inline-flex w-max items-center gap-2 rounded-full border border-[#eadfd6] bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#0f0e0c] shadow-[0_10px_26px_rgba(35,27,21,0.05)] transition-all hover:-translate-y-0.5 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A]">
                    {i === 0 ? "Start" : i === 1 ? "Confirm" : "Book Now"} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </section>

      <section className={SECTION_Y}>
        <LahoreServiceMap />
      </section>

      <CitiesNetworkSection currentSlug={area.slug} columns={2} compact />

      <FaqSection compact />
      <section className={`relative flex w-full items-center justify-center overflow-hidden bg-white px-4 sm:px-6 lg:px-10 ${SECTION_Y_END}`}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <span className="text-[7rem] font-bold tracking-tighter text-slate-900 select-none sm:text-[10rem] lg:text-[20rem]">
          ASIA
        </span>
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-muted text-[#D4AF37]"
        >
          <span className="text-2xl font-bold">{"✦"}</span>
        </motion.div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ready to Book in<span className="text-[#D4AF37]"> {area.name}</span>?
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          Tailored luxury transport services for executive and private travel.
        </p>

        <div className="group relative mt-8 sm:mt-10">
          <Link
            href="/contact-us"
            className="relative z-10 block rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-[#0A0A0A] transition-transform duration-300 hover:scale-105 active:scale-95 sm:px-10"
          >
            Contact Us
          </Link>

          <div className="absolute left-1/2 top-full mt-4 hidden h-[1px] w-0 -translate-x-1/2 bg-[#D4AF37] transition-all duration-500 group-hover:w-32 sm:block" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:mt-12 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-soft" />
            24/7 Support
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-soft" />
            Secure Booking
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-4 hidden h-20 w-[1px] bg-gradient-to-t from-brand-soft to-transparent sm:left-10 sm:block" />
      <div className="absolute right-4 top-0 hidden h-20 w-[1px] bg-gradient-to-b from-brand-soft to-transparent sm:right-10 sm:block" />
    </section>
    </main>
  );
}
