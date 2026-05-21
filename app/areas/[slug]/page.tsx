"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronRight,
  MapPin,
  Phone,
  Timer,
} from "lucide-react";
import { areas } from "../areasData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const STATS = [
  { value: "24/7", label: "Always Available" },
  { value: "5★", label: "Rated Service" },
  { value: "14+", label: "Fleet Size" },
  { value: "100%", label: "On-time" },
];

export default function AreaPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const area = areas.find((a) => a.slug === slug);

  if (!area) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#ff4500]">404</p>
        <h1 className="text-4xl font-black text-[#0f0e0c]">Area not found</h1>
        <p className="mt-3 text-base text-[#7a7875]">We couldn&apos;t find service information for this area.</p>
        <Link
          href="/areas"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff4500] px-7 py-3.5 text-sm font-black uppercase tracking-wide text-white hover:bg-[#d83a00]"
        >
          ← All Areas
        </Link>
      </main>
    );
  }

  const marqueeCities = areas.slice(0, 10).map((a) =>
    a.name ?? a.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );

  return (
    <main className="min-h-screen bg-white text-[#0f0e0c]">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[700px] w-full overflow-hidden">
        <Image
          src={area.image}
          alt={`${area.name} car service`}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay 1 — horizontal gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.60)_55%,rgba(0,0,0,0.25)_100%)]" />
        {/* Overlay 2 — vertical gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.0)_50%,rgba(0,0,0,0.70)_100%)]" />

        {/* Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="absolute left-6 top-8 z-20 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40"
        >
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/areas" className="transition-colors hover:text-white">Areas</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white/70">{area.name}</span>
        </nav>

        {/* Left-aligned content */}
        <div className="relative z-10 flex min-h-[700px] items-center px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
              <span className="h-px w-7 bg-[#ff4500]" />
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#ff4500]">
                {area.province}
              </p>
              <span className="h-px w-7 bg-[#ff4500]" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-[2.8rem] font-black leading-[1.04] tracking-[-2px] text-white sm:text-6xl lg:text-[4.8rem]"
            >
              {area.name}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-base leading-7 text-white/55"
            >
              Premium car rental &amp; chauffeur services in {area.name} —
              professional, punctual, and available 24/7.
            </motion.p>

            {/* Stats pills */}
            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
              {["24/7 Available", "Professional Drivers", "Insured Fleet"].map((pill) => (
                <span
                  key={pill}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff4500]" />
                  <span className="text-xs font-black uppercase text-white">{pill}</span>
                </span>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="rounded-full bg-[#ff4500] px-8 py-4 text-sm font-black uppercase text-white shadow-[0_8px_24px_rgba(255,69,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#e03d00]"
              >
                Book a Car in {area.name}
              </Link>
              <Link
                href="/areas"
                className="rounded-full border-2 border-white/25 px-8 py-4 text-sm font-black text-white/80 transition-all hover:border-white hover:text-white"
              >
                ← All Areas
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICE HIGHLIGHTS ─── */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-7xl grid grid-cols-1 gap-16 lg:grid-cols-2"
        >
          {/* Left */}
          <motion.div variants={fadeUp}>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-0.5 w-6 rounded bg-[#ff4500]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff4500]">About This Area</p>
            </div>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-[#0f0e0c] sm:text-5xl">
              Service in{" "}
              <span className="text-[#ff4500]">{area.name}</span>
            </h2>
            <p className="mt-5 text-base leading-8 text-[#7a7875]">{area.description}</p>

            <div className="mt-8 rounded-2xl bg-[#0f0e0c] p-6 text-white">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#ff4500]">Why Choose Us</p>
              <p className="text-sm leading-7 text-white/70">{area.whyUs}</p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div variants={fadeUp}>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-0.5 w-6 rounded bg-[#ff4500]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff4500]">What We Cover</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {area.highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-[#e8e2da] bg-white px-4 py-3.5 transition-all hover:border-[#ff4500]/30 hover:shadow-sm"
                >
                  <span className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-[#ff4500]/10">
                    <Check className="h-[11px] w-[11px] text-[#ff4500]" />
                  </span>
                  <span className="text-sm font-semibold text-[#0f0e0c]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── MARQUEE STRIP ─── */}
      <section className="overflow-hidden border-y border-white/[0.08] bg-[#0f0e0c] py-5">
        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-track {
            animation: marquee-scroll 20s linear infinite;
          }
        `}</style>
        <div className="flex w-max whitespace-nowrap marquee-track">
          {[...marqueeCities, ...marqueeCities].map((city, i) => (
            <span
              key={i}
              className="mx-6 text-sm font-black uppercase tracking-[0.24em] text-white/50"
            >
              {city}
              <span className="ml-6 text-[#ff4500]">•</span>
            </span>
          ))}
        </div>
      </section>

      {/* ─── POPULAR ROUTES ─── */}
      <section className="bg-[#faf8f5] px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-7xl"
        >
          <motion.div variants={fadeUp} className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-0.5 w-6 rounded bg-[#ff4500]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff4500]">Popular Routes</p>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-[#0f0e0c] sm:text-5xl">
              Where we take you
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {area.popularRoutes.map((route) => (
              <motion.div
                key={`${route.from}-${route.to}`}
                variants={fadeUp}
                className="group rounded-2xl bg-[#0f0e0c] p-6 transition-all duration-300 hover:bg-[#1a1a1a]"
              >
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-white/30" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Route</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff4500]/40 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#ff4500]">
                    <Timer className="h-3 w-3" />
                    {route.duration}
                  </span>
                </div>

                {/* Cities */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">From</p>
                    <p className="mt-0.5 text-xl font-black leading-tight text-white">{route.from}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#ff4500] transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="flex-1 text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">To</p>
                    <p className="mt-0.5 text-xl font-black leading-tight text-white">{route.to}</p>
                  </div>
                </div>

                {/* Book link */}
                <div className="mt-4 border-t border-white/[0.08] pt-4">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/30 transition-colors hover:text-[#ff4500]"
                  >
                    Book this route → <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-[#ff4500] px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className={`flex flex-col items-center py-6 text-center ${
                i < STATS.length - 1 ? "border-r border-white/20" : ""
              }`}
            >
              <p className="text-4xl font-black text-white sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── BOOKING CTA ─── */}
      <section className="relative overflow-hidden bg-[#0f0e0c] px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,69,0,0.15),transparent_40%)]" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="relative z-10 mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#ff4500]" />
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#ff4500]">Get Started</p>
            <span className="h-px w-7 bg-[#ff4500]" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-black tracking-tight text-white sm:text-5xl"
          >
            Ready to Book in {area.name}?
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-5 text-base leading-7 text-white/55">
            Our team is available 24/7 to arrange your car rental or chauffeur service in {area.name}.
            Contact us and we&apos;ll confirm your booking instantly.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black uppercase text-[#ff4500] shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5"
            >
              Book Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href="tel:+923001234567"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#ff4500]/50 px-8 py-4 text-sm font-black text-white transition-all hover:border-[#ff4500] hover:bg-[#ff4500]/10"
            >
              <Phone className="h-3.5 w-3.5" />
              Call Us
            </a>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}
