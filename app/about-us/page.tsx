"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CtaBannerSection from "@/Components/CtaBannerSection";

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

const heroStats = [
  { value: "12+", label: "Years Of Trusted Service" },
  { value: "85+", label: "Premium Vehicles Available" },
  { value: "24/7", label: "Dedicated Travel Support" },
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
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
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
        tone === "gold" ? "text-[#c9a96e]" : "text-[#ff4500]"
      } ${className}`}
    >
      <span className="text-sm leading-none sm:text-base">{"\u2733"}</span>
      <span>{children}</span>
    </p>
  );
}

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      {direction === "left" ? (
        <>
          <path d="M15.2 10H4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8.7 6.2 4.8 10l3.9 3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <path d="M4.8 10h10.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M11.3 6.2 15.2 10l-3.9 3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`h-4 w-4 text-[#ff4500] ${className}`} aria-hidden="true">
      <path d="M4.5 10.5 8 14l7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookingFeatureIcon({ type, className = "" }: { type: "booking" | "pickup"; className?: string }) {
  if (type === "booking") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 text-[#ff4500] ${className}`} aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 14h3M13 14h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 text-[#ff4500] ${className}`} aria-hidden="true">
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
        <span key={index} className="text-[#ff4500]">
          {"\u2605"}
        </span>
      ))}
      {rating === "4.5" && <span className="text-[#ff4500]">{"\u2606"}</span>}
      <span className="ml-2 text-sm font-semibold text-[#c9a96e]">{rating}</span>
    </div>
  );
}

function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/10 sm:rounded-[36px] lg:rounded-[42px]">
      <div className="absolute inset-0">
        <Image src="/about.jpeg" alt="Luxury black sedan parked outside an elegant building" fill priority className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,17,0.94),rgba(5,10,17,0.82),rgba(5,10,17,0.9))] lg:bg-[linear-gradient(90deg,rgba(5,10,17,0.96),rgba(5,10,17,0.62),rgba(5,10,17,0.88))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,69,0,0.16),transparent_26%)]" />

      <div className="relative grid min-h-[680px] items-end gap-10 px-4 py-8 sm:min-h-[760px] sm:px-6 sm:py-10 md:px-8 lg:min-h-[850px] lg:grid-cols-[1.08fr_0.92fr] lg:px-14 lg:py-12">
        <div className="max-w-3xl self-center">
          <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#d8cfbe] backdrop-blur-sm sm:text-[11px] sm:tracking-[0.24em]">
            <span className="h-2 w-2 rounded-full bg-[#ff4500]" />
            <span>Luxury Mobility Since 2012</span>
          </div>

          <p className="mt-5 text-sm font-medium text-[#ddd3c7]">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="mx-2 text-[#c9a96e]">/</span>
            <span className="text-white">About Us</span>
          </p>

          <div className="mt-5">
            <SectionLabel tone="gold">Asia Tours Story</SectionLabel>
          </div>

          <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-[5.4rem]">
            Driven by comfort,
            <span className="mt-2 block bg-[linear-gradient(180deg,#ffffff,#dbc9ad)] bg-clip-text text-transparent">
              built on trust.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#d0d0d0] sm:text-lg sm:leading-8 md:text-xl">
            Asia Tours curates luxury car rental and executive transport experiences with elegant vehicles, meticulous planning, and service-first hospitality.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#ff4500] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(255,69,0,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#e8461c] sm:w-auto"
            >
              Explore Services
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#111111]">
                <ArrowIcon />
              </span>
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/18 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10 sm:w-auto"
            >
              Contact Our Team
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            {["Executive Fleet", "Chauffeur Service", "Airport Transfers"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-2 text-xs font-medium text-[#ece3d5] backdrop-blur-sm sm:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative self-stretch">
          <div className="absolute right-0 top-0 hidden w-[78%] rounded-[30px] border border-white/10 bg-[rgba(8,13,20,0.52)] p-4 backdrop-blur-md lg:block">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#c9a96e]">Premium Standard</p>
                <p className="mt-2 text-lg font-semibold text-white">Curated fleet, discreet service, polished arrival</p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ff4500] text-white shadow-[0_12px_28px_rgba(255,69,0,0.28)]">
                <ArrowIcon />
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex h-full min-h-[280px] items-end pt-4 sm:min-h-[320px] lg:justify-end lg:pt-24">
            <div className="grid w-full gap-4 sm:grid-cols-3 lg:w-[88%] lg:grid-cols-1 xl:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[24px] border border-white/10 bg-[rgba(9,15,23,0.68)] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-md sm:rounded-[30px] sm:p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#c9a96e] sm:text-[11px]">Asia Tours</span>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff4500]" />
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white sm:mt-5 sm:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutStorySection() {
  return (
    <section className="relative overflow-hidden rounded-[28px] px-4 py-14 sm:rounded-[36px] sm:px-6 sm:py-16 md:px-8 lg:rounded-[48px] lg:px-20 lg:py-24">
      <div className="absolute right-10 top-16 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="relative h-52 w-52 xl:h-64 xl:w-64"
        >
          <div className="absolute inset-0 rounded-full border-[1.5px] border-orange-200/50" />
          <div className="absolute inset-10 rounded-full border border-orange-300/20 xl:inset-12" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-xl xl:h-24 xl:w-24">
              <span className="text-4xl text-white drop-shadow-md xl:text-5xl">{"\u2726"}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-16 left-10 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="relative h-52 w-52 xl:h-64 xl:w-64"
        >
          <div className="absolute inset-0 rounded-full border-[1.5px] border-orange-200/50" />
          <div className="absolute inset-10 rounded-full border border-orange-300/20 xl:inset-12" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-xl xl:h-24 xl:w-24">
              <span className="text-4xl text-white drop-shadow-md xl:text-5xl">{"\u2726"}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.02fr_1fr] lg:items-center lg:gap-16">
        <div className="relative mx-auto grid w-full max-w-[560px] gap-4 sm:gap-5 lg:min-h-[620px] lg:max-w-[620px]">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative aspect-square w-[82%] overflow-hidden rounded-[32px] border-[8px] border-white shadow-2xl sm:w-[76%] sm:rounded-[40px] sm:border-[10px] lg:absolute lg:left-0 lg:top-0 lg:w-[78%] lg:rounded-[50%]"
          >
            <Image
              src="/Range-Rover.avif"
              alt="Luxury vehicle lineup ready for guests"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative ml-auto aspect-square w-[62%] overflow-hidden rounded-[28px] border-[10px] border-white shadow-2xl sm:w-[56%] sm:rounded-[34px] sm:border-[12px] lg:absolute lg:bottom-0 lg:right-0 lg:w-[58%] lg:rounded-[50%] lg:border-[14px]"
          >
            <Image
              src="/2023-BMW-i7-exterior-1-scaled.jpg"
              alt="Executive BMW luxury sedan"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-fit rounded-3xl border border-gray-100 bg-white px-6 py-5 shadow-2xl sm:px-8 sm:py-6 lg:absolute lg:right-0 lg:top-10"
          >
            <div className="text-4xl font-semibold tracking-[-2px] text-gray-900 sm:text-5xl lg:text-6xl">500+</div>
            <p className="mt-2 text-xs font-medium uppercase tracking-[2px] text-orange-600 sm:text-sm sm:tracking-[3px]">
              Premium Journeys
            </p>
          </motion.div>
        </div>

        <div className="space-y-8 lg:space-y-10 lg:pl-8">
          <SectionLabel className="text-orange-600 tracking-widest">About Us</SectionLabel>

          <h2 className="max-w-xl text-3xl font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[3.3rem]">
            Your trusted partner in reliable car rental
          </h2>

          <p className="max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-relaxed">
            We combine premium vehicles, discreet hospitality, and dependable travel coordination to create journeys that feel refined, calm, and perfectly handled from inquiry to return.
          </p>

          <div className="space-y-4 pt-2 sm:space-y-6 sm:pt-4 lg:pt-6">
            {aboutFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-orange-200 hover:shadow-2xl sm:p-6 lg:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 transition-all group-hover:scale-110 group-hover:bg-orange-100 sm:h-16 sm:w-16">
                    <BookingFeatureIcon type={feature.icon} className="text-orange-600" />
                  </div>
                  <div className="pt-0.5 sm:pt-1">
                    <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-orange-600 sm:text-xl">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 text-gray-600 sm:text-[15.5px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#fff4ee,#fef1ea)] px-4 py-12 text-[#111111] sm:px-6 sm:py-14 lg:px-12 lg:py-16">
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
            className="group relative flex min-h-[180px] flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-orange-200 hover:shadow-2xl sm:p-8"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10">
              <p className="text-lg font-semibold tracking-wide text-gray-900 transition-colors group-hover:text-orange-600 sm:text-xl">
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
    <section className="relative overflow-hidden rounded-[28px] bg-white px-4 py-12 sm:rounded-[36px] sm:px-6 sm:py-14 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionLabel className="text-[#ff4500]">Vision Mission</SectionLabel>

        <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl lg:text-[3rem]">
          Driving excellence and innovation in car rental services
        </h2>

        <div className="mt-8 flex flex-wrap gap-3">
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
                    ? "border border-[#ff4500] text-white shadow-[0_10px_30px_rgba(255,69,0,0.3)]"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-[#ff4500] hover:text-[#ff4500]"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="vision-mission-active-tab"
                    className="absolute inset-0 z-0 rounded-full bg-[#ff4500]"
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
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c9a96e]">
                {activeContent.eyebrow}
              </p>
              <h3 className="mt-4 max-w-xl text-2xl font-semibold leading-tight text-gray-900 sm:text-3xl">
                {activeContent.heading}
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                {activeContent.description}
              </p>

              <motion.ul
                className="mt-8 space-y-4"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.07,
                      delayChildren: 0.08,
                    },
                  },
                }}
              >
                {activeContent.bullets.map((bullet) => (
                  <motion.li
                    key={bullet}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="flex items-start gap-3 text-sm leading-7 text-gray-700"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff4500]/10">
                      <CheckIcon className="h-4 w-4 text-[#ff4500]" />
                    </span>
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatePresence>

          <div className="relative">
            <div className="absolute -left-4 top-6 hidden h-[78%] w-[78%] rounded-[30px] border border-[#ff4500]/20 lg:block xl:-left-6 xl:top-8 xl:rounded-[36px]" />

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
    <section className="rounded-[28px] bg-white px-4 py-12 text-[#111111] sm:rounded-[36px] sm:px-6 sm:py-14 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="lg:max-w-lg">
            <SectionLabel>Watch Our Video</SectionLabel>

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
          <span className="text-2xl font-bold">{"\u2726"}</span>
        </motion.div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Ready to elevate <span className="text-[#ff4500]">your journey?</span>
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
        { length: 3 },
        (_, offset) => testimonials[(testimonialStart + offset) % testimonials.length]
      ),
    [testimonialStart]
  );

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-[#fff5f3] px-4 py-14 sm:rounded-[36px] sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-16 xl:py-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center text-center sm:mb-16">
          <span className="inline-block rounded-full border border-[#ff4402]/20 bg-[#ff4402]/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4402]">
            Testimonials
          </span>
          <h2 className="mt-6 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:mt-8 sm:text-4xl lg:text-5xl xl:text-6xl">
            What our clients <span className="text-[#ff4402]">truly think.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.name}-${index}`}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-orange-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,68,2,0.15)] sm:rounded-[34px] sm:p-8 lg:rounded-[40px] lg:p-10"
            >
              <span className="absolute left-1/2 bottom-0 z-0 h-[250%] w-[250%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-[#ff4402] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" />

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
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-all hover:border-[#ff4402] hover:bg-[#ff4402] hover:text-white hover:shadow-lg active:scale-90 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setTestimonialStart((prev) => (prev + 1) % testimonials.length)}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-all hover:border-[#ff4402] hover:bg-[#ff4402] hover:text-white hover:shadow-lg active:scale-90 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
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
      <div className="space-y-6 px-4 pb-8 pt-4 text-white sm:space-y-8 sm:px-6 sm:pb-10 sm:pt-6 lg:px-8">
        <AboutHeroSection />
        <AboutStorySection />
      </div>

      <PartnersSection />

      <div className="space-y-6 px-4 pb-8 pt-6 text-white sm:space-y-8 sm:px-6 sm:pb-10 lg:px-8">
        <VideoStatsSection />
        <CtaBannerSection />
        <VisionMissionSection activeTab={activeTab} setActiveTab={setActiveTab} />
        <TestimonialsSection testimonialStart={testimonialStart} setTestimonialStart={setTestimonialStart} />
        <ContactGatewaySection />
      </div>
    </main>
  );
}
