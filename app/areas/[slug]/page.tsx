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
  ChevronRight,
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
import HomePageHero from "@/Components/HomePageHero";
import { FiArrowUpRight } from "react-icons/fi";
import QuickBookingForm from "@/Components/QuickBookingForm";
import FaqSection from "@/Components/FaqSection";
import CtaBannerSection from "@/Components/CtaBannerSection";
import { LahoreServiceMap } from "@/app/HomePageContent";

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);


  if (!area) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#ff4500]">404</p>
        <h1 className="text-4xl font-black text-[#0f0e0c]">Area not found</h1>
        <p className="mt-3 text-base text-[#7a7875]">
          We couldn&apos;t find service information for this area.
        </p>
        <Link
          href="/areas"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff4500] px-7 py-3.5 text-sm font-black uppercase tracking-wide text-white hover:bg-[#d83a00]"
        >
          ← All Areas
        </Link>
      </main>
    );
  }

  const nearbyAreas = areas
    .filter((a) => a.province === area.province && a.slug !== area.slug)
    .slice(0, 4);

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
    <main className="px-3 pb-6 sm:px-5 sm:pb-8 lg:px-7">
        <section className="relative mx-auto w-full max-w-[1800px] pb-5 sm:pb-7 lg:pb-9">
          <div className="relative min-h-[620px] overflow-hidden rounded-[28px] sm:min-h-[700px] sm:rounded-[36px] lg:min-h-[760px] lg:rounded-[46px] xl:min-h-[820px]">
            <div className="absolute inset-0">
            <Image
            src={area.image}
            alt={`${area.name} car service`}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
            </div>
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.86),rgba(0,0,0,0.72),rgba(0,0,0,0.52))] md:bg-[linear-gradient(115deg,rgba(0,0,0,0.84),rgba(0,0,0,0.68),rgba(0,0,0,0.30))] lg:bg-gradient-to-r lg:from-[rgba(0,0,0,0.86)] lg:via-[rgba(0,0,0,0.52)] lg:to-[rgba(0,0,0,0.14)]"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
              aria-hidden="true"
            />

            <div className="relative z-10 flex min-h-[620px] w-full items-center justify-center px-5 py-12 sm:min-h-[700px] sm:px-8 sm:py-14 lg:min-h-[760px] lg:px-12 xl:px-[4.5rem]">
              <div className="grid w-full place-items-center gap-10">
                <div className="mx-auto max-w-3xl text-center">
                  <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: easeCurve }}
                    className="mb-5 inline-flex items-center justify-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff4500]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ff4500] sm:text-xs sm:tracking-[0.28em]">
                  {area.province} Service Area
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: easeCurve }}
                    className="mx-auto max-w-full text-[2.5rem] font-black leading-[0.98] tracking-tight text-white sm:text-5xl lg:whitespace-nowrap lg:text-[3.6rem] xl:text-[4.25rem] 2xl:text-[4.6rem]"
                  >
                    Car rental in <span className="text-[#ff4500]">{area.name}</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35, ease: easeCurve }}
                    className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/72 sm:text-base lg:text-lg"
                  >
                Premium car rental &amp; chauffeur services in {area.name} — professional, punctual, and available 24/7.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: easeCurve }}
                    className="mt-6 flex flex-wrap justify-center gap-2"
                  >
                    {trustBadges.map((badge) => (
                      <span
                        key={badge.text}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-md sm:px-3.5 sm:text-xs"
                      >
                        <span className="text-[#ff4500]">{badge.icon}</span>
                        {badge.text}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65, ease: easeCurve }}
                    className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                  >
                    <Link
                      href="/services"
                      className="shimmer-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#ff4500] px-8 py-3.5 text-sm font-bold text-white shadow-[0_20px_45px_rgba(255,69,0,0.3)]"
                    >
                      Book A Rental
                    </Link>

                    <Link
                      href="/about-us"
                      className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/12"
                    >
                      <span>Learn More</span>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <FiArrowUpRight className="text-xs" />
                      </span>
                    </Link>
                  </motion.div>
                </div>


              </div>
            </div>
          </div>

          <QuickBookingForm easeCurve={easeCurve} />
        </section>
      </main>


      {/* ─── SERVICE INFO ─────────────────────────────────────────────────────── */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start"
        >
          <motion.div variants={fadeUp}>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-0.5 w-6 rounded bg-[#ff4500]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff4500]">About This Area</p>
            </div>
            <h2 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-[#0f0e0c] sm:text-5xl">
              Service in{" "}
              <span className="text-[#ff4500]">{area.name}</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f574f]">
              {area.description}
            </p>

            <div className="mt-8 rounded-[24px] border border-[#eadfd6] bg-[#fbfaf8] p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ff4500]">Why Choose Us</p>
              <p className="mt-3 text-sm leading-7 text-[#5f574f]">{area.whyUs}</p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff4500] px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_34px_rgba(255,69,0,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#e63e00]">
                Plan My Ride <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+923001234567" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#eadfd6] bg-white px-7 py-3.5 text-sm font-bold text-[#0f0e0c] transition-all hover:-translate-y-0.5 hover:border-[#ff4500]/40">
                <Phone className="h-4 w-4 text-[#ff4500]" />
                Quick Call
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-[28px] border border-[#eadfd6] bg-[#fbfaf8] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-0.5 w-6 rounded bg-[#ff4500]" />
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff4500]">What We Cover</p>
                </div>
                <h3 className="text-2xl font-black leading-tight text-[#0f0e0c] sm:text-3xl">
                  Key service coverage
                </h3>
              </div>
              <div className="rounded-2xl border border-[#eadfd6] bg-white px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a7875]">Popular route</p>
                <div className="mt-1 flex items-center gap-2 text-sm font-black text-[#0f0e0c]">
                  <span>{area.popularRoutes[0]?.from ?? area.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#ff4500]" />
                  <span>{area.popularRoutes[0]?.to ?? "Lahore"}</span>
                  <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-[#fff0ea] px-2 py-0.5 text-[10px] font-bold text-[#ff4500]">
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
                  className="flex min-h-[72px] items-center gap-3 rounded-[18px] border border-[#eadfd6] bg-white px-4 py-4 transition-all hover:border-[#ff4500]/35 hover:shadow-[0_12px_26px_rgba(35,27,21,0.06)]"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#fff4f0]">
                    <Check className="h-4 w-4 text-[#ff4500]" />
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
                  <p className="text-xl font-black text-[#ff4500]">{value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a7875]">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <CtaBannerSection/>

      {/* ─── SERVICES LIST ────────────────────────────────────────────────────── */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-[1600px]"
        >
          {/* Split header — big type left, description + CTA right */}
          <motion.div
            variants={fadeUp}
            className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#ff4500]" />
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff4500]">
                  Our Services
                </p>
              </div>
              <h2 className="text-5xl font-black leading-[0.92] tracking-tight text-[#0f0e0c] sm:text-6xl ">
                Services in 
                
                <span className="pl-3 text-[#ff4500]">{area.name}</span>
              </h2>
            </div>
            <div className="max-w-sm lg:pb-2 lg:text-right">

              <div className="mt-6 flex gap-3 lg:justify-end">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff4500] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_34px_rgba(255,69,0,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#e63e00]"
                >
                  Book a Service <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

{/* Editorial reveal rows */}
<motion.div variants={staggerFast} className="border-t border-[#e8e0d8]">
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
                ? "rgba(255,69,0,0.05)"
                : "transparent",
              borderLeft: isActive
                ? "3px solid #ff4500"
                : "3px solid transparent",
              paddingLeft: isActive ? "10px" : undefined,
            }}
          >
            {/* Number */}
            <span
              className="w-7 shrink-0 text-xs font-black tabular-nums sm:w-9 transition-all duration-300"
              style={{ color: isActive ? "#ff4500" : "#c8b8ae" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Icon */}
            <div
              className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 sm:h-10 sm:w-10"
              style={{
                backgroundColor: isActive ? "#ff4500" : "#fff1eb",
                color: isActive ? "#ffffff" : "#ff4500",
                boxShadow: isActive
                  ? "0 8px 24px rgba(255,69,0,0.35)"
                  : "none",
              }}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            {/* Title + description reveal */}
            <div className="min-w-0 flex-1">
              <h3
                className="text-base font-black tracking-tight transition-all duration-200 sm:text-lg lg:text-xl xl:text-2xl"
                style={{
                  color: isActive ? "#ff4500" : "#0f0e0c",
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

            {/* Tag pill */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  className="hidden sm:inline-flex items-center text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,69,0,0.08)",
                    color: "#ff4500",
                    border: "1px solid rgba(255,69,0,0.2)",
                  }}
                >
                  Learn More
                </motion.span>
              )}
            </AnimatePresence>

            {/* Arrow button */}
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-8 sm:w-8"
              style={{
                borderColor: isActive ? "#ff4500" : "#e8e0d8",
                backgroundColor: isActive ? "#ff4500" : "transparent",
                transform: isActive ? "translateX(4px)" : "translateX(0)",
                boxShadow: isActive ? "0 4px 12px rgba(255,69,0,0.3)" : "none",
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
        </motion.div>
      </section>
<LahoreServiceMap/>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
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
          <motion.div variants={fadeUp}>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-0.5 w-6 rounded bg-[#ff4500]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff4500]">Simple Process</p>
            </div>
            <h2 className="max-w-lg text-4xl font-black leading-tight tracking-tight text-[#0f0e0c] sm:text-5xl">
              Book once. We handle the ride.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#6f6962]">
              No repeated calls or confusing steps. Pick the service, confirm the details, and your chauffeur is assigned with the route plan.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#eadfd6] bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#5f574f] shadow-[0_12px_34px_rgba(35,27,21,0.06)]">
              <Info className="h-4 w-4 text-[#ff4500]" />
              Hover info icons for quick tips
            </div>
          </motion.div>

          <div className="relative border-l border-[#eadfd6] pl-7 sm:pl-10">
            <span className="absolute -left-[5px] top-0 h-full w-[9px] bg-gradient-to-b from-[#ff4500] via-[#ff4500]/35 to-transparent" />

            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  className="group relative grid gap-4 py-8 sm:grid-cols-[72px_1fr_auto] sm:items-start"
                >
                  <span className="absolute -left-[46px] top-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[#ff4500] text-[10px] font-black text-white shadow-[0_10px_24px_rgba(255,69,0,0.28)] sm:-left-[56px]">
                    {step.num}
                  </span>
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1eb] text-[#ff4500] transition-all group-hover:bg-[#ff4500] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-black text-[#0f0e0c]">{step.title}</h3>
                      <span className="group/tip relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#eadfd6] bg-white text-[#ff4500]">
                        <Info className="h-4 w-4" />
                        <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-64 -translate-x-1/2 rounded-2xl bg-[#0f0e0c] px-4 py-3 text-left text-xs font-medium leading-5 text-white opacity-0 shadow-[0_18px_40px_rgba(0,0,0,0.2)] transition-opacity group-hover/tip:opacity-100">
                          {i === 0
                            ? "Tell us your date, city, passenger count, and preferred vehicle style."
                            : i === 1
                              ? "We confirm fare, pickup point, driver timing, and route expectations."
                              : "Your chauffeur arrives clean, punctual, and ready for door-to-door service."}
                        </span>
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6f6962]">{step.desc}</p>
                  </div>
                  <Link href="/contact-us" className="inline-flex w-max items-center gap-2 rounded-full border border-[#eadfd6] bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#0f0e0c] shadow-[0_10px_26px_rgba(35,27,21,0.05)] transition-all hover:-translate-y-0.5 hover:border-[#ff4500] hover:bg-[#ff4500] hover:text-white">
                    {i === 0 ? "Start" : i === 1 ? "Confirm" : "Book Now"} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </section>
      <section className="overflow-hidden border-y border-[#eadfd6]  py-5">
        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-track { animation: marquee-scroll 22s linear infinite; }
        `}</style>
        <div className="flex w-max whitespace-nowrap marquee-track">
          {[...marqueeCities, ...marqueeCities].map((city, i) => (
            <span key={i} className="mx-6 text-sm font-black uppercase tracking-[0.24em] text-black">
              {city}
              <span className="ml-6 text-[#ff4500]">•</span>
            </span>
          ))}
        </div>
      </section>





      {/* ─── NEARBY AREAS ─────────────────────────────────────────────────────── */}
      {nearbyAreas.length > 0 && (
        <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mx-auto max-w-[1600px]"
          >
            <motion.div variants={fadeUp} className="mx-auto mb-14 max-w-3xl text-center">
              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-10 rounded bg-gradient-to-r from-transparent to-[#ff4500]" />
                <p className="   px-2 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#ff4500]">
                  More Areas
                </p>
                <span className="h-px w-10 rounded bg-gradient-to-l from-transparent to-[#ff4500]" />
              </div>
              <h2 className="text-4xl font-black tracking-tight text-[#0f0e0c] sm:text-5xl lg:text-6xl">
                Other Cities We Serve
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#7a7875] sm:text-lg">
                We also offer the same premium car rental experience across these nearby cities.
              </p>
            </motion.div>

            <motion.div variants={staggerFast} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {nearbyAreas.map((nearby) => (
                <motion.div
                  key={nearby.slug}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={`/areas/${nearby.slug}`}
                    className="group block min-h-[400px] overflow-hidden rounded-[24px] border border-[#eadfd6] bg-white shadow-[0_10px_28px_rgba(35,27,21,0.04)] transition-all duration-300 hover:border-[#ff4500]/35 hover:shadow-[0_22px_55px_rgba(35,27,21,0.10)]"
                  >
                    <div className="relative mx-4 mt-4 h-56 overflow-hidden rounded-[18px] bg-[#f7f2ee]">
                      <Image
                        src={nearby.image}
                        alt={nearby.name}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#ff4500] shadow-sm backdrop-blur-sm">
                        {nearby.province}
                      </span>
                      <span className="absolute inset-x-5 bottom-4 translate-y-4 rounded-full border border-white/35 bg-[#ff4500] px-5 py-3 text-center text-[11px] font-black uppercase tracking-[0.12em] text-white opacity-0 shadow-[0_16px_34px_rgba(255,69,0,0.42)] ring-4 ring-white/20 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        More Detail <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                      </span>
                    </div>
                    <div className="px-5 pb-6 pt-5 text-center">
                      <h3 className="text-xl font-black text-[#0f0e0c] transition-colors group-hover:text-[#ff4500]">
                        {nearby.name}
                      </h3>
                      <p className="mx-auto mt-2 line-clamp-2 min-h-[44px] max-w-[15rem] text-sm leading-6 text-[#6f6962]">
                        {nearby.description.substring(0, 80)}…
                      </p>
                      <div className="mx-auto mt-4 flex w-max items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#ff4500]">
                        <span className="h-px w-5 bg-[#ff4500]/55" />
                        Service Area
                        <span className="h-px w-5 bg-[#ff4500]/55" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}


<FaqSection/>
 <section className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-[28px] bg-white px-4 py-14 sm:min-h-[360px] sm:rounded-[36px] sm:px-6 lg:min-h-[400px] lg:px-10">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <span className="text-[7rem] font-bold tracking-tighter text-slate-900 select-none sm:text-[10rem] lg:text-[20rem]">
          ASIA
        </span>
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#ff4500]"
        >
          <span className="text-2xl font-bold">{"✦"}</span>
        </motion.div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ready to Book in<span className="text-[#ff4500]"> {area.name}</span>?
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          Tailored luxury transport services for executive and private travel.
        </p>

        <div className="group relative mt-8 sm:mt-10">
          <Link
            href="/contact-us"
            className="relative z-10 block rounded-full bg-[#ff4500] px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:scale-105 active:scale-95 sm:px-10"
          >
            Contact Us
          </Link>

          <div className="absolute left-1/2 top-full mt-4 hidden h-[1px] w-0 -translate-x-1/2 bg-[#ff4500] transition-all duration-500 group-hover:w-32 sm:block" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:mt-12 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-200" />
            24/7 Support
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-200" />
            Secure Booking
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-4 hidden h-20 w-[1px] bg-gradient-to-t from-orange-100 to-transparent sm:left-10 sm:block" />
      <div className="absolute right-4 top-0 hidden h-20 w-[1px] bg-gradient-to-b from-orange-100 to-transparent sm:right-10 sm:block" />
    </section>
    </main>
  );
}
