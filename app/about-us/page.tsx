"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
    avatar: "/avatars/avatar-1.jpg",
  },
  {
    rating: "4.5",
    text: "From airport pickup to hotel transfer, everything was handled smoothly. The booking team stayed responsive and proactive throughout the trip.",
    name: "Areeba Khan",
    role: "Frequent Traveler",
    avatar: "/avatars/avatar-2.jpg",
  },
  {
    rating: "5.0",
    text: "We booked a luxury SUV for family guests and were genuinely impressed by the comfort, cleanliness, and professionalism of the service.",
    name: "Usman Tariq",
    role: "Event Planner",
    avatar: "/avatars/avatar-3.jpg",
  },
  {
    rating: "5.0",
    text: "The team was flexible, organized, and reassuring from the start. It felt like a premium hospitality service rather than just a rental company.",
    name: "Sara Javed",
    role: "Leisure Guest",
    avatar: "/avatars/avatar-1.jpg",
  },
];

function SectionLabel({ children, tone = "orange" }: { children: string; tone?: "orange" | "gold" }) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] ${
        tone === "gold" ? "text-[#c9a96e]" : "text-[#ff4500]"
      }`}
    >
      <span className="text-base leading-none">{"\u2733"}</span>
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-[#ff4500]" aria-hidden="true">
      <path d="M4.5 10.5 8 14l7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookingFeatureIcon({ type }: { type: "booking" | "pickup" }) {
  if (type === "booking") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#ff4500]" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 14h3M13 14h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#ff4500]" aria-hidden="true">
      <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function StarRating({ rating }: { rating: string }) {
  const fullStars = rating === "4.5" ? 4 : 5;

  return (
    <div className="flex items-center gap-1">
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
    <section className="relative overflow-hidden rounded-[42px] border ">
      <div className="absolute inset-0">
        <Image src="/about.jpeg" alt="Luxury black sedan parked outside an elegant building" fill priority className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,17,0.96),rgba(5,10,17,0.62),rgba(5,10,17,0.88))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,69,0,0.16),transparent_26%)]" />


      <div className="relative grid min-h-[850px] items-end gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-14 lg:py-12">
        <div className="max-w-3xl self-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[#d8cfbe] backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#ff4500]" />
            <span>Luxury Mobility Since 2012</span>
          </div>

          <p className="mt-6 text-sm font-medium text-[#ddd3c7]">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="mx-2 text-[#c9a96e]">/</span>
            <span className="text-white">About Us</span>
          </p>

          <SectionLabel tone="gold">Asia Tours Story</SectionLabel>

          <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-[5.4rem]">
            Driven by comfort,
            <span className="mt-2 block bg-[linear-gradient(180deg,#ffffff,#dbc9ad)] bg-clip-text text-transparent">
              built on trust.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#d0d0d0] sm:text-xl">
            Asia Tours curates luxury car rental and executive transport experiences with elegant vehicles, meticulous planning, and service-first hospitality.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 rounded-full bg-[#ff4500] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(255,69,0,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#e8461c]"
            >
              Explore Services
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#111111]">
                <ArrowIcon />
              </span>
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10"
            >
              Contact Our Team
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            {["Executive Fleet", "Chauffeur Service", "Airport Transfers"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-2 text-sm font-medium text-[#ece3d5] backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative self-stretch">
          <div className="absolute right-0 top-0 hidden w-[78%] rounded-[30px] border border-white/10 bg-[rgba(8,13,20,0.52)] p-4 backdrop-blur-md lg:block">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#c9a96e]">Premium Standard</p>
                <p className="mt-2 text-lg font-semibold text-white">Curated fleet, discreet service, polished arrival</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4500] text-white shadow-[0_12px_28px_rgba(255,69,0,0.28)]">
                <ArrowIcon />
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex h-full min-h-[360px] items-end lg:justify-end">
            <div className="grid w-full gap-4 sm:grid-cols-3 lg:w-[88%] lg:grid-cols-1 xl:grid-cols-3">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`rounded-[30px] border border-white/10 bg-[rgba(9,15,23,0.68)] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-md`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#c9a96e]">Asia Tours</span>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff4500]" />
                  </div>
                  <p className="mt-5 text-4xl font-semibold text-white">{stat.value}</p>
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
    <section className="relative rounded-[48px]  px-6 py-20  sm:px-12 lg:px-20 lg:py-24 overflow-hidden">
      
 

{/* Unique Decorative Element - Right Side (Elegant & Minimal) */}
      <div className="absolute right-16 top-20 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="relative h-64 w-64"
        >
          {/* Outer soft glow ring */}
          <div className="absolute inset-0 rounded-full border-[1.5px] border-orange-200/50" />
          <div className="absolute inset-12 rounded-full border border-orange-300/20" />
          
          {/* Center Emblem */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-xl">
              <span className="text-5xl text-white drop-shadow-md">✦</span>
            </div>
          </div>
        </motion.div>
      </div>
         <div className="absolute left-16 bottom-20 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="relative h-64 w-64"
        >
          {/* Outer soft glow ring */}
          <div className="absolute inset-0 rounded-full border-[1.5px] border-orange-200/50" />
          <div className="absolute inset-12 rounded-full border border-orange-300/20" />
          
          {/* Center Emblem */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-xl">
              <span className="text-5xl text-white drop-shadow-md">✦</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-16 lg:grid-cols-[1.02fr_1fr] lg:items-center relative z-10">
        
           {/* LEFT SIDE - Premium Image Collage */}
        <div className="relative min-h-[600px] mx-auto lg:mx-0 max-w-[1500px]">

          {/* Large Main Image - Clean & Prominent */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="absolute left-0 top-0 h-[380px] w-[380px] overflow-hidden rounded-[50%] border-[10px] border-white shadow-2xl sm:h-[430px] sm:w-[430px] lg:h-[500px] lg:w-[500px]"
          >
            <Image
              src="/Range-Rover.avif"
              alt="Luxury vehicle lineup ready for guests"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Smaller Overlapping Image - Elegant & Natural Overlap */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute bottom-0 right-0 h-[300px] w-[300px] overflow-hidden rounded-[50%] border-[14px] border-white shadow-2xl sm:h-[380px] sm:w-[380px] lg:right-30"
          >
            <Image
              src="/2023-BMW-i7-exterior-1-scaled.jpg"
              alt="Executive BMW luxury sedan"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Premium Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -right-4 top-10 hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl sm:block"
          >
            <div className="text-6xl font-semibold tracking-[-3px] text-gray-900">500+</div>
            <p className="mt-2 text-sm font-medium uppercase tracking-[3px] text-orange-600">
              Premium Journeys
            </p>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Content */}
        <div className="space-y-10 lg:pl-8">
          <SectionLabel className="text-orange-600 tracking-widest">About Us</SectionLabel>

          <h2 className="max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.3rem]">
            Your trusted partner in reliable car rental
          </h2>

          <p className="max-w-xl text-lg leading-relaxed text-gray-600">
            We combine premium vehicles, discreet hospitality, and dependable travel coordination 
            to create journeys that feel refined, calm, and perfectly handled from inquiry to return.
          </p>

          {/* Features */}
          <div className="space-y-6 pt-6">
            {aboutFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-orange-200 hover:shadow-2xl"
              >
                <div className="flex gap-6">
                 <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-50 transition-all group-hover:scale-110 group-hover:bg-orange-100">
                    <BookingFeatureIcon type={feature.icon} className="text-orange-600" />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-[15.5px] leading-relaxed text-gray-600">
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
    <section className="bg-[linear-gradient(180deg,#fff4ee,#fef1ea)] px-6 py-12 text-[#111111] sm:px-8 lg:px-12">
      <div className="mx-auto  w-full text-center">
        <div>
          <SectionLabel>Executive Partners</SectionLabel>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Trusted by leading brands
          </h2>
        </div>
        <p className=" text-sm leading-7 text-[#6f6b67]">
          We proudly support corporate travel, luxury events, airport services, and executive road movement for respected partners across Pakistan.
        </p>
      </div>

  {/* Beautiful Partner Cards */}
<div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {partners.map((partner, index) => (
    <div
      key={partner.name}
      className="group relative flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-orange-200"
    >
      {/* Soft hover glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative z-10 text-center">
        <p className="font-semibold text-xl tracking-wide text-gray-900 transition-colors group-hover:text-orange-600">
          {partner.name}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-500 line-clamp-2">
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
    <section className="relative overflow-hidden bg-white px-6 py-12 sm:px-8 lg:px-12">
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
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                  active
                    ? "bg-[#ff4500] text-white shadow-[0_10px_30px_rgba(255,69,0,0.3)]"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-[#ff4500] hover:text-[#ff4500]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          {/* Left Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c9a96e]">
              {activeContent.eyebrow}
            </p>
            <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-gray-900">
              {activeContent.heading}
            </h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-gray-600">
              {activeContent.description}
            </p>

            <ul className="mt-8 space-y-4">
              {activeContent.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-sm leading-7 text-gray-700"
                >
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff4500]/10">
                    <CheckIcon className="h-4 w-4 text-[#ff4500]" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Decorative border */}
            <div className="absolute -left-6 top-8 hidden h-[78%] w-[78%] rounded-[36px] border border-[#ff4500]/20 lg:block" />

            <div className="relative h-[330px] overflow-hidden rounded-[34px] border border-gray-200 sm:h-[450px]">
              <Image
                src={activeContent.image}
                alt={activeContent.imageAlt}
                fill
                className="object-cover"
              />
              {/* Light overlay gradient */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.25))]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoStatsSection() {
  return (
    <section className="bg-white px-6 py-16 text-[#111111] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Left Side - Heading + Content */}
          <div className="lg:max-w-lg">
            <SectionLabel>Watch Our Video</SectionLabel>

            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[3rem]">
              Discover what sets us apart in the car rental industry
            </h2>

            <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-600">
          
              <p>
                 At our core, we believe in delivering more than just a car — we deliver 
                Watch our videos to see how we combine <strong>premium vehicles</strong>, 
                exceptional service, and innovative technology to create the ultimate 
                car rental experience.
              </p>
          
            </div>
          </div>

          {/* Right Side - Two Videos Stacked */}
          <div className="w-full lg:w-[55%]">
            <div className="grid gap-6">
              {/* Top Video */}
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-xl">
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
      </div>
    </section>
  );
}
function ContactGatewaySection() {
  return (
    <section className="relative flex h-[400px] w-full items-center justify-center overflow-hidden bg-white px-6">
      {/* Subtle Background Elements */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <span className="text-[20rem] font-bold tracking-tighter text-slate-900 select-none">
          ASIA
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Small Logo / Icon */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#ff4500]"
        >
          <span className="text-2xl font-bold">✦</span>
        </motion.div>

        {/* Content */}
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Ready to elevate <span className="text-[#ff4500]">your journey?</span>
        </h2>
        <p className="mt-4 max-w-md text-slate-500">
          Tailored luxury transport services for executive and private travel.
        </p>

        {/* Centralized Button Area */}
        <div className="group relative mt-10">
          <Link
            href="/contact-us"
            className="relative z-10 block rounded-full bg-[#ff4500] px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            Contact Us
          </Link>
          
          {/* The 1px Animated Line logic */}
          <div className="absolute left-1/2 top-full mt-4 h-[1px] w-0 -translate-x-1/2 bg-[#ff4500] transition-all duration-500 group-hover:w-32" />
        </div>

        {/* Footer info in section */}
        <div className="mt-12 flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
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

      {/* Vertical Animated Lines (Optional Decorative) */}
      <div className="absolute bottom-0 left-10 h-20 w-[1px] bg-gradient-to-t from-orange-100 to-transparent" />
      <div className="absolute top-0 right-10 h-20 w-[1px] bg-gradient-to-b from-orange-100 to-transparent" />
    </section>
  );
}
function TestimonialsSection({
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
    <section className="relative overflow-hidden rounded-[48px] bg-[#fff5f3] px-6 py-24 sm:px-8 lg:px-16">
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="inline-block rounded-full border border-[#ff4402]/20 bg-[#ff4402]/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4402]">
            Testimonials
          </span>
          <h2 className="mt-8 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            What our clients <span className="text-[#ff4402]">truly think.</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.name}-${index}`}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[40px] border border-orange-100 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,68,2,0.15)]"
            >
              {/* The Expanding Circle Background Effect */}
              <span className="absolute left-1/2 bottom-0 z-0 h-[250%] w-[250%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-[#ff4402] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100"></span>

              {/* Content Wrapper (Must be relative z-10 to stay above the orange circle) */}
              <div className="relative z-10">
                <StarRating rating={testimonial.rating} />
                <blockquote className="mt-8 text-xl font-medium leading-relaxed text-slate-700 transition-colors duration-300 group-hover:text-white">
                  “{testimonial.text}”
                </blockquote>
              </div>

              <div className="relative z-10 mt-12 flex items-center gap-5 pt-8 border-t border-slate-100 transition-colors duration-300 group-hover:border-white/20">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-2 ring-transparent transition-all duration-300 group-hover:ring-white/30">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-white">
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

        {/* Navigation Buttons (Premium Style) */}
        <div className="mt-16 flex items-center justify-center gap-8 relative z-10">
          <button
            type="button"
            onClick={() => setTestimonialStart((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="group flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-all hover:border-[#ff4402] hover:bg-[#ff4402] hover:text-white hover:shadow-lg active:scale-90"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button
            type="button"
            onClick={() => setTestimonialStart((prev) => (prev + 1) % testimonials.length)}
            className="group flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-all hover:border-[#ff4402] hover:bg-[#ff4402] hover:text-white hover:shadow-lg active:scale-90"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
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
    <main className="min-h-screen ">
      <div className=" px-4 pb-10 pt-6 text-white sm:px-6 lg:px-8">
        <AboutHeroSection />
    
        <AboutStorySection />
      </div>
        
        <PartnersSection />
             <div className=" px-4 pb-10 pt-6 text-white sm:px-6 lg:px-8">
               <VideoStatsSection />
               <CtaBannerSection/>
              <VisionMissionSection activeTab={activeTab} setActiveTab={setActiveTab} />
       
        <TestimonialsSection testimonialStart={testimonialStart} setTestimonialStart={setTestimonialStart} />
         <ContactGatewaySection />
      </div>

      
    </main>
    
  );
}
















