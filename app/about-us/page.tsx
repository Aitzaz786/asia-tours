"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import CtaBannerSection from "@/Components/CtaBannerSection";
import DarkHeroShell, { HOME_HERO_CONTENT_HEIGHT } from "@/Components/DarkHeroShell";
import QuickBookingForm from "@/Components/QuickBookingForm";
import { SECTION_Y, SECTION_Y_END } from "@/lib/sectionSpacing";

type TabKey = "vision" | "mission" | "approach";

const partners = [
  {
    name: "Luxe Group",
    description: "Premium luxury fleet and corporate travel solutions",
  },
  {
    name: "Royal Drive",
    description: "Exclusive chauffeur-driven experiences",
  },
  {
    name: "Velour Travel",
    description: "Boutique travel and event transportation",
  },
  {
    name: "Summit Elite",
    description: "High-end business and leisure transport",
  },
  {
    name: "Urban Majesty",
    description: "Modern urban mobility partner",
  },
  {
    name: "Prestige Route",
    description: "Signature routes for distinguished clients",
  },
  {
    name: "Grand Horizon",
    description: "Luxury long-distance and intercity travel",
  },
  {
    name: "Elite Voyage",
    description: "Curated journeys for elite clientele",
  },
];

const aboutFeatures = [
  {
    icon: "booking" as const,
    title: "Easy Booking Process",
    description:
      "Fast inquiries, attentive coordination, and concierge-style assistance keep booking smooth from first call to confirmed itinerary.",
  },
  {
    icon: "pickup" as const,
    title: "Convenient Pick-Up & Return",
    description:
      "Flexible locations, punctual arrivals, and dependable handovers ensure every journey begins and ends without stress.",
  },
];

const tabContent: Record<
  TabKey,
  {
    eyebrow: string;
    heading: string;
    description: string;
    bullets: string[];
    image: string;
    imageAlt: string;
  }
> = {
  vision: {
    eyebrow: "Our Vision",
    heading: "Setting the benchmark for premium mobility experiences",
    description:
      "Asia Tours is built around the idea that luxury transport should feel effortless, polished, and deeply dependable for every client and every occasion.",
    bullets: [
      "Elevate every trip with hospitality-led service",
      "Expand a premium fleet tailored to executive travel",
      "Lead with professionalism, comfort, and trust",
    ],
    image: "/Range-Rover.avif",
    imageAlt: "Luxury Range Rover parked outdoors",
  },
  mission: {
    eyebrow: "Our Mission",
    heading: "Delivering smooth, safe, and service-first rentals every day",
    description:
      "We make business travel, airport transfers, wedding transport, and family bookings feel organized, responsive, and beautifully handled from start to finish.",
    bullets: [
      "Provide transparent communication and planning",
      "Maintain a presentation-ready insured fleet",
      "Support clients with 24/7 service coordination",
    ],
    image: "/range-rover-vogue-01.webp",
    imageAlt: "Luxury SUV in an urban setting",
  },
  approach: {
    eyebrow: "Our Approach",
    heading: "Thoughtful planning backed by hospitality-driven execution",
    description:
      "Our team combines route planning, premium vehicles, and service-focused hospitality to create journeys that feel calm, refined, and memorable.",
    bullets: [
      "Tailored recommendations for each itinerary",
      "Dedicated coordination for arrivals and departures",
      "Comfort-focused standards from inquiry to drop-off",
    ],
    image: "/2023-BMW-i7-exterior-1-scaled.webp",
    imageAlt: "Luxury BMW executive sedan on an open road",
  },
};

const testimonials = [
  {
    rating: "5.0",
    text: "Asia Tours made our executive trip effortless. The vehicle arrived immaculate, the chauffeur was punctual, and the whole experience felt first class.",
    name: "Hassan Malik",
    role: "Corporate Client",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    rating: "4.5",
    text: "From airport pickup to hotel transfer, everything was handled smoothly. The booking team stayed responsive and proactive throughout the trip.",
    name: "Areeba Khan",
    role: "Frequent Traveler",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    rating: "5.0",
    text: "We booked a luxury SUV for family guests and were genuinely impressed by the comfort, cleanliness, and professionalism of the service.",
    name: "Usman Tariq",
    role: "Event Planner",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    rating: "5.0",
    text: "The team was flexible, organized, and reassuring from the start. It felt like a premium hospitality service rather than just a rental company.",
    name: "Sara Javed",
    role: "Leisure Guest",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

function SectionLabel({
  children,
  tone = "orange",
  className = "",
}: {
  children: string;
  tone?: "orange" | "gold";
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] sm:text-xs sm:tracking-[0.28em] ${
        tone === "gold" ? "text-[#c9a96e]" : "text-[#D4AF37]"
      } ${className}`}
    >
      <span className="text-sm leading-none sm:text-base">{"\u2733"}</span>
      <span>{children}</span>
    </p>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`h-4 w-4 text-[#D4AF37] ${className}`} aria-hidden="true">
      <path d="M4.5 10.5 8 14l7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookingFeatureIcon({ type, className = "" }: { type: "booking" | "pickup"; className?: string }) {
  if (type === "booking") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 text-[#D4AF37] ${className}`} aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 14h3M13 14h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 text-[#D4AF37] ${className}`} aria-hidden="true">
      <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function StarRating({ rating }: { rating: string }) {
  const fullStars = rating === "4.5" ? 4 : 5;

  return (
    <div className="flex flex-wrap items-center gap-1">
      {Array.from({ length: fullStars }).map((_, index) => (
        <span key={index} className="text-[#D4AF37]">
          {"\u2605"}
        </span>
      ))}
      {rating === "4.5" && <span className="text-[#D4AF37]">{"\u2606"}</span>}
      <span className="ml-2 text-sm font-semibold text-[#c9a96e]">{rating}</span>
    </div>
  );
}

function AboutHeroSection() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  return (
    <section className="home-hero relative z-30 w-full overflow-x-hidden pb-10">
      <DarkHeroShell>
        <div className={`relative z-10 flex w-full items-center justify-center px-5 pb-6 pt-28 sm:px-8 sm:pb-20 sm:pt-36 xl:px-[4.5rem] ${HOME_HERO_CONTENT_HEIGHT}`}>
          <div className="w-full max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center justify-center gap-3 sm:mb-6">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37] sm:w-12" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37] sm:text-xs">
                Asia Tours Story
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37] sm:w-12" />
            </div>

            <h1 className="hero-display-font text-[2.65rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.85rem] xl:text-[4.75rem]">
              Driven by{" "}
              <span className="bg-gradient-to-r from-[#E8C766] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                comfort
              </span>
              <br />
              built on{" "}
              <span className="italic font-semibold text-white/95">trust.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-[14px] font-light leading-7 tracking-wide text-white/70 sm:mt-6 sm:text-base lg:max-w-xl lg:text-lg lg:leading-8">
              Asia Tours curates luxury car rental and executive transport with elegant vehicles,
              meticulous planning, and service-first hospitality.
            </p>

            <div className="mt-8 hidden items-center justify-center gap-3 md:flex">
              <Link
                href="/services"
                className="shimmer-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-bold text-[#0A0A0A] shadow-[0_20px_45px_rgba(212,175,55,0.3)]"
              >
                Explore Services
              </Link>

              <div className="flex items-center gap-3">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black shadow-md transition-all hover:bg-white/90"
                >
                  Contact Our Team
                </Link>

                <Link
                  href="/contact-us"
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-white/90"
                  aria-label="Contact our team"
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
  );
}

function AboutStorySection() {
  return (
    <section className={`relative overflow-hidden px-4 sm:px-6 lg:px-8 ${SECTION_Y}`}>
      <div className="relative z-10 mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1.02fr_1fr] lg:items-center lg:gap-16">
        {/* Image cluster — sized to stay inside viewport on phone */}
        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[620px]">
          <div className="relative aspect-square w-full">
            {/* Back image */}
            <div className="absolute bottom-[4%] right-[4%] z-10 aspect-square w-[48%] overflow-hidden rounded-[22px] border-[6px] border-white shadow-xl sm:bottom-0 sm:right-0 sm:w-[56%] sm:rounded-[34px] sm:border-[12px] lg:w-[58%] lg:rounded-[50%] lg:border-[14px]">
              <Image
                src="/2023-BMW-i7-exterior-1-scaled.webp"
                alt="Executive BMW luxury sedan"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 45vw, 280px"
              />
            </div>

            {/* Range Rover on top */}
            <div className="absolute left-[4%] top-[4%] z-20 aspect-square w-[66%] overflow-hidden rounded-[24px] border-[6px] border-white shadow-xl sm:left-0 sm:top-0 sm:w-[76%] sm:rounded-[40px] sm:border-[10px] lg:w-[78%] lg:rounded-[50%]">
              <Image
                src="/Range-Rover.avif"
                alt="Luxury vehicle lineup ready for guests"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 60vw, 380px"
              />
            </div>

            {/* Stat badge — inset so it never clips on phone */}
            <div className="absolute right-[6%] top-[10%] z-30 max-w-[42%] rounded-2xl border border-gray-100 bg-white px-3 py-2.5 shadow-xl sm:right-0 sm:top-10 sm:max-w-none sm:rounded-3xl sm:px-8 sm:py-6">
              <div className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl sm:tracking-[-2px]">
                500+
              </div>
              <p className="mt-1 text-[9px] font-medium uppercase leading-tight tracking-[0.12em] text-brand sm:mt-2 sm:text-sm sm:tracking-[3px]">
                Premium Journeys
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-center lg:space-y-10 lg:pl-8 lg:text-left">
          <SectionLabel className="justify-center text-brand tracking-widest lg:justify-start">
            About Us
          </SectionLabel>

          <h2 className="mx-auto max-w-xl text-3xl font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:mx-0 lg:text-[3.3rem]">
            Your trusted partner in reliable car rental
          </h2>

          <p className="mx-auto max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-relaxed lg:mx-0">
            We combine premium vehicles, discreet hospitality, and dependable travel coordination to create journeys that feel refined, calm, and perfectly handled from inquiry to return.
          </p>

          <div className="space-y-4 pt-2 text-left sm:space-y-6 sm:pt-4 lg:pt-6">
            {aboutFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-soft hover:shadow-2xl sm:p-6 lg:p-8"
              >
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:gap-6 sm:text-left">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-muted transition-all group-hover:scale-110 group-hover:bg-brand-soft sm:h-16 sm:w-16">
                    <BookingFeatureIcon type={feature.icon} className="text-brand" />
                  </div>
                  <div className="pt-0.5 sm:pt-1">
                    <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-brand sm:text-xl">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 text-gray-600 sm:text-[15.5px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section className={`bg-[linear-gradient(180deg,#F5E9C8,#F5E9C8)] px-4 text-[#111111] sm:px-6 lg:px-12 ${SECTION_Y}`}>
      <div className="mx-auto w-full max-w-7xl text-center">
        <div>
          <SectionLabel>Executive Partners</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
            Trusted by leading brands
          </h2>
        </div>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#6f6b67] sm:text-base">
          We proudly support corporate travel, luxury events, airport services, and executive road movement for respected partners across Pakistan.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:mt-16 xl:grid-cols-4">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="group relative flex min-h-[180px] flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-brand-soft hover:shadow-2xl sm:p-8"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-muted to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10">
              <p className="text-lg font-semibold tracking-wide text-gray-900 transition-colors group-hover:text-brand sm:text-xl">
                {partner.name}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {partner.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VisionMissionSection({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}) {
  const activeContent = tabContent[activeTab];

  return (
    <section className={`relative overflow-hidden bg-white px-4 sm:px-6 lg:px-12 ${SECTION_Y}`}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center lg:text-left">
          <SectionLabel className="justify-center text-[#D4AF37] lg:justify-start">
            Vision Mission
          </SectionLabel>

          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl lg:mx-0 lg:text-[3rem]">
            Driving excellence and innovation in car rental services
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
          {([
            ["vision", "Our Vision"],
            ["mission", "Our Mission"],
            ["approach", "Our Approach"],
          ] as const).map(([key, label]) => {
            const active = activeTab === key;
            return (
              <motion.button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                whileTap={{ scale: 0.96 }}
                className={`relative overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition-all sm:px-6 ${
                  active
                    ? "border border-[#D4AF37] bg-[#D4AF37] text-white"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="vision-mission-active-tab"
                    className="absolute inset-0 z-0 rounded-full bg-[#D4AF37]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-10">{label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c9a96e]">
                {activeContent.eyebrow}
              </p>
              <h3 className="mx-auto mt-4 max-w-xl text-2xl font-semibold leading-tight text-gray-900 sm:text-3xl lg:mx-0">
                {activeContent.heading}
              </h3>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8 lg:mx-0">
                {activeContent.description}
              </p>

              <ul className="mt-8 space-y-4">
                {activeContent.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start justify-center gap-3 text-sm leading-7 text-gray-700 lg:justify-start"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10">
                      <CheckIcon className="h-4 w-4 text-[#D4AF37]" />
                    </span>
                    <span className="text-left">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="relative">
            <div className="absolute -left-4 top-6 hidden h-[78%] w-[78%] rounded-[30px] border border-[#D4AF37]/20 lg:block xl:-left-6 xl:top-8 xl:rounded-[36px]" />

            <div className="relative h-[280px] overflow-hidden rounded-[26px] border border-gray-200 sm:h-[360px] sm:rounded-[30px] lg:h-[450px] lg:rounded-[34px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeContent.image}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeContent.image}
                    alt={activeContent.imageAlt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.25))]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VideoStatsSection() {
  return (
    <section className={`bg-white px-4 text-[#111111] sm:px-6 lg:px-12 ${SECTION_Y}`}>
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="text-center lg:max-w-lg lg:text-left">
            <SectionLabel className="justify-center lg:justify-start">Watch Our Video</SectionLabel>

            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[3rem]">
              Discover what sets us apart in the car rental industry
            </h2>

            <div className="mt-6 space-y-5 text-base leading-7 text-gray-600 sm:text-lg sm:leading-relaxed">
              <p>
                At our core, we believe in delivering more than just a car. We deliver a complete luxury travel experience. Watch our video to see how we combine <strong>premium vehicles</strong>, exceptional service, and thoughtful coordination to create the ultimate car rental experience.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[55%]">
            <div className="relative aspect-video w-full overflow-hidden rounded-[24px] shadow-xl sm:rounded-3xl">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/YFNSDdrElfc"
                title="BMW M4 Cinematic Edit - Luxury Car Experience"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactGatewaySection() {
  return (
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
          <span className="text-2xl font-bold">{"\u2726"}</span>
        </motion.div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Ready to elevate <span className="text-[#D4AF37]">your journey?</span>
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
  );
}

export function TestimonialsSection({
  testimonialStart,
  setTestimonialStart,
}: {
  testimonialStart: number;
  setTestimonialStart: (value: number | ((prev: number) => number)) => void;
}) {
  const visibleTestimonials = useMemo(
    () =>
      Array.from(
        { length: 4 },
        (_, offset) => testimonials[(testimonialStart + offset) % testimonials.length]
      ),
    [testimonialStart]
  );

  return (
    <section className={`relative overflow-hidden rounded-none bg-[#F5E9C8] px-0 ${SECTION_Y}`}>
      <div className="relative z-10 mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
          <span className="inline-block rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            Testimonials
          </span>
          <h2 className="mt-6 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:mt-8 sm:text-4xl lg:text-5xl xl:text-6xl">
            What our clients <span className="text-[#D4AF37]">truly think.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.name}-${index}`}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className={`group relative h-full flex-col justify-between overflow-hidden rounded-[28px] border border-brand-soft bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] sm:rounded-[34px] sm:p-8 lg:rounded-[40px] lg:p-10 ${
                index === 0
                  ? "flex"
                  : index === 1
                    ? "hidden md:flex"
                    : index === 2
                      ? "hidden lg:flex"
                      : "hidden xl:flex"
              }`}
            >
              <span className="absolute left-1/2 bottom-0 z-0 h-[250%] w-[250%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-[#D4AF37] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" />

              <div className="relative z-10">
                <StarRating rating={testimonial.rating} />
                <blockquote className="mt-6 text-lg font-medium leading-relaxed text-slate-700 transition-colors duration-300 group-hover:text-white sm:mt-8 sm:text-xl">
                  {"\u201C"}
                  {testimonial.text}
                  {"\u201D"}
                </blockquote>
              </div>

              <div className="relative z-10 mt-8 flex items-center gap-4 border-t border-slate-100 pt-6 transition-colors duration-300 group-hover:border-white/20 sm:mt-10 sm:gap-5 sm:pt-8 lg:mt-12">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-2 ring-transparent transition-all duration-300 group-hover:ring-white/30">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-white sm:text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-sm font-medium text-slate-500 transition-colors duration-300 group-hover:text-white/80">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="relative z-10 mt-10 flex items-center justify-center gap-5 sm:mt-14 sm:gap-8 lg:mt-16">
          <button
            type="button"
            onClick={() => setTestimonialStart((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] hover:shadow-lg active:scale-90 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setTestimonialStart((prev) => (prev + 1) % testimonials.length)}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] hover:shadow-lg active:scale-90 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("vision");
  const [testimonialStart, setTestimonialStart] = useState(0);

  return (
    <main className="min-h-screen">
      <AboutHeroSection />
      <AboutStorySection />
      <PartnersSection />
      <VideoStatsSection />
      <CtaBannerSection compact />
      <VisionMissionSection activeTab={activeTab} setActiveTab={setActiveTab} />
      <TestimonialsSection
        testimonialStart={testimonialStart}
        setTestimonialStart={setTestimonialStart}
      />
      <ContactGatewaySection />
    </main>
  );
}
