"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type TabKey = "vision" | "mission" | "approach";

const partners = [
  "Luxe Group",
  "Royal Drive",
  "Prime Executive",
  "Velour Travel",
  "Summit Elite",
  "Urban Majesty",
  "Prestige Route",
  "Grand Horizon",
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
    <section className="relative overflow-hidden rounded-[42px] border border-white/8 bg-[#070d15]">
      <div className="absolute inset-0">
        <Image src="/black.jpeg" alt="Luxury black sedan parked outside an elegant building" fill priority className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,17,0.96),rgba(5,10,17,0.62),rgba(5,10,17,0.88))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.22),transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,69,0,0.16),transparent_26%)]" />
      <div className="absolute left-8 top-8 h-28 w-28 rounded-full border border-white/8 bg-white/[0.02] backdrop-blur-sm" aria-hidden="true" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full border border-[#c9a96e]/15 bg-[radial-gradient(circle,rgba(201,169,110,0.1),transparent_70%)]" aria-hidden="true" />

      <div className="relative grid min-h-[800px] items-end gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-14 lg:py-12">
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

          <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-[5.4rem]">
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
                  className={`rounded-[30px] border border-white/10 bg-[rgba(9,15,23,0.68)] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-md ${
                    index === 1 ? "xl:translate-y-8" : ""
                  }`}
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

            <div className="absolute -bottom-1 left-0 hidden rounded-[28px] border border-white/10 bg-[rgba(9,15,23,0.76)] px-5 py-4 backdrop-blur-md lg:block">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#c9a96e]">Signature Promise</p>
              <p className="mt-2 max-w-[220px] text-sm leading-6 text-[#dddddd]">
                Every booking is designed to feel calm, elegant, and expertly handled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutStorySection() {
  return (
    <section className="rounded-[40px] border border-white/8 bg-[#0b121c] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="grid gap-12 lg:grid-cols-[1.02fr_1fr] lg:items-center">
        <div className="relative min-h-[460px]">
          <div className="absolute left-3 top-8 text-3xl text-[#ff4500]">{"\u2733"}</div>
          <div className="absolute left-[58%] top-16 text-xl text-[#202939]">{"\u2605"}</div>
          <div className="absolute inset-y-14 left-10 w-[1px] bg-[linear-gradient(180deg,transparent,rgba(255,69,0,0.42),transparent)]" />

          <div className="absolute left-0 top-10 h-72 w-72 overflow-hidden rounded-full border border-white/10 shadow-[0_24px_90px_rgba(0,0,0,0.45)] sm:h-80 sm:w-80">
            <Image src="/asiatour.jpeg" alt="Luxury vehicle lineup ready for guests" fill className="object-cover" />
          </div>

          <div className="absolute bottom-0 left-28 h-56 w-56 overflow-hidden rounded-full border-[8px] border-[#0b121c] shadow-[0_24px_90px_rgba(0,0,0,0.45)] sm:h-64 sm:w-64">
            <Image src="/2023-BMW-i7-exterior-1-scaled.jpg" alt="Executive BMW luxury sedan" fill className="object-cover" />
          </div>

          <div className="absolute right-6 top-28 hidden rounded-[28px] border border-white/8 bg-white/[0.03] p-4 sm:block">
            <p className="text-2xl font-semibold text-white">500+</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#c9a96e]">Premium Journeys</p>
          </div>
        </div>

        <div>
          <SectionLabel>About Us</SectionLabel>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[3rem]">
            Your trusted partner in reliable car rental
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#b8b8b8]">
            We combine premium vehicles, discreet hospitality, and dependable travel coordination to create journeys that feel refined, calm, and perfectly handled from inquiry to return.
          </p>

          <div className="mt-8 grid gap-5">
            {aboutFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff4500]/25 hover:bg-white/[0.05]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1a1110]">
                    <BookingFeatureIcon type={feature.icon} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#b8b8b8]">{feature.description}</p>
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
    <section className="rounded-[40px] bg-[linear-gradient(180deg,#fff4ee,#fef1ea)] px-6 py-12 text-[#111111] sm:px-8 lg:px-12">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel>Executive Partners</SectionLabel>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
            Trusted by leading brands
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[#6f6b67]">
          We proudly support corporate travel, luxury events, airport services, and executive road movement for respected partners across Pakistan.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {partners.map((partner) => (
          <div
            key={partner}
            className="group flex h-24 items-center justify-center rounded-[24px] border border-[#f3d8cf] bg-white/80 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#3b3b3b] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff4500]/35 hover:shadow-[0_16px_40px_rgba(255,69,0,0.08)]"
          >
            {partner}
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
    <section className="relative overflow-hidden rounded-[40px] border border-white/8 bg-[#0b121c] px-6 py-12 sm:px-8 lg:px-12">
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,69,0,0.12),transparent_68%)]" />
      <SectionLabel>Vision Mission</SectionLabel>
      <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[3rem]">
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
              className={`rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                active
                  ? "bg-[#ff4500] text-white shadow-[0_14px_35px_rgba(255,69,0,0.24)]"
                  : "border border-[#394251] text-[#d6d6d6] hover:border-[#ff4500] hover:text-white"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c9a96e]">{activeContent.eyebrow}</p>
          <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white">{activeContent.heading}</h3>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#b8b8b8]">{activeContent.description}</p>

          <ul className="mt-8 space-y-4">
            {activeContent.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm leading-7 text-[#dddddd]">
                <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#22120d]">
                  <CheckIcon />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-8 hidden h-[78%] w-[78%] rounded-[36px] border border-[#ff4500]/20 lg:block" />
          <div className="relative h-[330px] overflow-hidden rounded-[34px] border border-white/10 sm:h-[450px]">
            <Image src={activeContent.image} alt={activeContent.imageAlt} fill className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,17,0.04),rgba(5,10,17,0.3))]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoStatsSection() {
  return (
    <section className="rounded-[40px] bg-[linear-gradient(180deg,#fff7f2,#fff0e7)] px-6 py-12 text-[#111111] sm:px-8 lg:px-12">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel>Watch Our Video</SectionLabel>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[3rem]">
            Discover what sets us apart in the car rental industry
          </h2>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="relative min-h-[340px] overflow-hidden rounded-[32px]">
          <Image src="/black.jpeg" alt="Luxury black car outside a hotel" fill className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.15),rgba(17,17,17,0.7))]" />
          <div className="relative z-10 flex h-full flex-col justify-end p-7 text-white">
            <p className="text-5xl font-semibold sm:text-6xl">3100+</p>
            <p className="mt-2 text-lg font-medium text-white/92">satisfied customer</p>
            <div className="mt-6 flex items-center">
              <div className="flex items-center -space-x-3">
                {["/avatars/avatar-1.jpg", "/avatars/avatar-2.jpg", "/avatars/avatar-3.jpg"].map((avatar) => (
                  <div key={avatar} className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white">
                    <Image src={avatar} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="ml-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#ff4500] text-xl font-semibold text-white"
                aria-label="More customers"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="relative min-h-[340px] overflow-hidden rounded-[32px]">
          <Image src="/2023-BMW-i7-exterior-1-scaled.jpg" alt="Luxury executive sedan for promotional video" fill className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.22),rgba(17,17,17,0.5))]" />
          <div className="relative z-10 flex h-full items-center justify-center">
            <button
              type="button"
              aria-label="Play company video"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ff4500] text-white shadow-[0_20px_60px_rgba(255,69,0,0.35)] transition-transform hover:scale-105"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7" aria-hidden="true">
                <path d="M8 6.5v11l9-5.5-9-5.5Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
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
      Array.from({ length: 3 }, (_, offset) => testimonials[(testimonialStart + offset) % testimonials.length]),
    [testimonialStart]
  );

  return (
    <section className="rounded-[40px] border border-white/8 bg-[#0b121c] px-6 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[3rem]">
            What our customers are saying about us
          </h2>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {visibleTestimonials.map((testimonial, index) => (
          <article
            key={`${testimonial.name}-${index}`}
            className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff4500]/20 hover:bg-white/[0.045]"
          >
            <StarRating rating={testimonial.rating} />
            <p className="mt-5 text-sm leading-8 text-[#c6c6c6]">{testimonial.text}</p>
            <div className="mt-8 flex items-center gap-4 border-t border-white/8 pt-5">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-[#b8b8b8]">{testimonial.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setTestimonialStart((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4500] text-white transition-colors hover:bg-[#e8461c]"
          aria-label="Previous testimonials"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={() => setTestimonialStart((prev) => (prev + 1) % testimonials.length)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4500] text-white transition-colors hover:bg-[#e8461c]"
          aria-label="Next testimonials"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </section>
  );
}

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("vision");
  const [testimonialStart, setTestimonialStart] = useState(0);

  return (
    <>
        <AboutHeroSection />
        <AboutStorySection />
        <PartnersSection />
        <VisionMissionSection activeTab={activeTab} setActiveTab={setActiveTab} />
        <VideoStatsSection />
        <TestimonialsSection testimonialStart={testimonialStart} setTestimonialStart={setTestimonialStart} />
     </>
    
  );
}






















===========================================================================================






















function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[42px] border border-white/8 bg-[#070d15]">
      <div className="absolute inset-0">
        <Image src="/black.jpeg" alt="Luxury black sedan parked outside an elegant building" fill priority className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,17,0.97),rgba(5,10,17,0.72),rgba(5,10,17,0.78))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,69,0,0.16),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(201,169,110,0.2),transparent_26%)]" />
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
      <div className="absolute -left-10 top-18 h-48 w-48 rounded-full border border-white/6 bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_70%)]" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,69,0,0.12),transparent_70%)]" aria-hidden="true" />

      <div className="relative px-6 py-6 sm:px-10 lg:px-14 lg:py-8">
        <div className="flex items-center justify-between rounded-[26px] border border-white/10 bg-[rgba(8,13,20,0.58)] px-4 py-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-4">
            <div className="rounded-[20px] border border-white/10 bg-white px-4 py-2 shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
              <Image src="/logo.jpeg" alt="Asia Tours logo" width={128} height={44} className="h-auto w-[110px] sm:w-[128px]" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#c9a96e]">Luxury Mobility</p>
              <p className="mt-1 text-sm text-[#d5d5d5]">Executive rentals and chauffeur travel</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {["Premium Fleet", "Airport Transfer", "24/7 Support"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#e7dece]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative grid min-h-[700px] gap-12 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-end lg:pt-12">
          <div className="max-w-3xl self-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-[#d8cfbe] backdrop-blur-sm">
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

            <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[0.92] sm:text-6xl lg:text-[5.8rem]">
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
          </div>

          <div className="relative min-h-[430px] lg:min-h-[560px]">
            <div className="absolute right-0 top-2 hidden w-[72%] rounded-[30px] border border-[#c9a96e]/18 bg-[linear-gradient(135deg,rgba(201,169,110,0.12),rgba(255,255,255,0.04))] p-5 backdrop-blur-md lg:block">
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#c9a96e]">Premium Standard</p>
              <p className="mt-2 text-xl font-semibold text-white">Curated fleet, discreet service, polished arrival</p>
            </div>

            <div className="absolute bottom-0 right-0 left-0 lg:left-auto lg:w-[86%]">
              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(8,13,20,0.5)] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-md">
                <div className="relative h-[340px] overflow-hidden rounded-[28px] sm:h-[420px] lg:h-[470px]">
                  <Image src="/2023-BMW-i7-exterior-1-scaled.jpg" alt="Luxury BMW sedan in a premium setting" fill className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,17,0.02),rgba(5,10,17,0.22))]" />
                </div>

                <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-[rgba(7,13,21,0.7)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#ede2d1] backdrop-blur-md">
                  Signature Executive Series
                </div>

                <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="rounded-[24px] border border-white/10 bg-[rgba(8,13,20,0.74)] p-4 backdrop-blur-md">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-[0.22em] text-[#c9a96e]">Asia Tours</span>
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff4500]" />
                      </div>
                      <p className="mt-4 text-3xl font-semibold text-white">{stat.value}</p>
                      <p className="mt-2 text-xs leading-5 text-[#d0d0d0]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -left-1 bottom-8 hidden rounded-[26px] border border-white/10 bg-[rgba(9,15,23,0.76)] px-5 py-4 backdrop-blur-md lg:block">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#c9a96e]">Signature Promise</p>
              <p className="mt-2 max-w-[220px] text-sm leading-6 text-[#dddddd]">
                Every booking is designed to feel calm, elegant, and expertly handled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

