"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Calendar,
  Camera,
  ChevronRight,
  Globe,
  Headphones,
  Map,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const highlights = [
  "Route planning included",
  "Multiple city stops",
  "Flexible scheduling",
  "Dedicated coordinator",
  "Curated sightseeing stops",
  "Hotel coordination included",
];

const features = [
  {
    icon: Map,
    title: "Route Planning",
    desc: "We map every stop, timing, and connection so your journey flows without a hitch.",
  },
  {
    icon: Globe,
    title: "Multi-city",
    desc: "Lahore, Islamabad, Murree, and beyond — full multi-destination coverage across Pakistan.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    desc: "Plans change — we adapt on the go and reshape your itinerary around your needs.",
  },
  {
    icon: Headphones,
    title: "Dedicated Coordinator",
    desc: "Your personal travel manager handles everything from bookings to last-minute changes.",
  },
  {
    icon: Camera,
    title: "Sightseeing Stops",
    desc: "Curated cultural and scenic experiences woven into your route at the right moments.",
  },
  {
    icon: Building2,
    title: "Hotel Coordination",
    desc: "We liaise directly with your accommodations so arrivals and departures are always smooth.",
  },
];

const stats = [
  { value: "Any", label: "Destination" },
  { value: "Full", label: "Coordination" },
  { value: "100+", label: "Routes Planned" },
  { value: "5★", label: "Rated" },
];

export default function CustomItinerariesPage() {
  return (
    <main className="min-h-screen bg-white text-[#0f0e0c]">

      {/* ─── HERO ─── */}
      <section className="relative h-[68vh] min-h-[540px] w-full overflow-hidden">
        <Image
          src="/Badshahi_Mosque_front_picture.jpg"
          alt="Custom itineraries service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.82)_100%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 sm:px-10 lg:px-16">
          <nav
            aria-label="breadcrumb"
            className="absolute left-6 top-8 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 sm:left-10 lg:left-16"
          >
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/#service-menu" className="transition-colors hover:text-white">Services</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/90">Custom Itineraries</span>
          </nav>

          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
              <span className="h-0.5 w-6 rounded bg-[#ff4500]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff7a4d]">Custom Itineraries</p>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="max-w-3xl text-5xl font-black leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Your journey,{" "}
              <em className="not-italic text-[#ff4500]">perfectly planned.</em>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Multi-city routes, sightseeing stops, and flexible schedules — fully coordinated around you, every step of the way.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff4500] px-7 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(255,69,0,0.30)] transition-all hover:-translate-y-0.5 hover:bg-[#d83a00] hover:shadow-[0_12px_32px_rgba(255,69,0,0.35)]"
              >
                Book Now <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/#service-menu"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                ← All Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── OVERVIEW ─── */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
        >
          <motion.div variants={fadeUp}>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-0.5 w-6 rounded bg-[#ff4500]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c24716]">Overview</p>
            </div>
            <h2 className="text-4xl font-black leading-tight tracking-tight text-[#0f0e0c] sm:text-5xl">
              Travel built{" "}
              <em className="not-italic text-[#ff4500]">around you</em>
            </h2>
            <p className="mt-6 text-base leading-8 text-[#7a7875]">
              We build your complete travel plan from the ground up — mapping every stop, coordinating timing, and handling logistics across multiple cities so you can focus entirely on the experience.
            </p>
            <p className="mt-4 text-base leading-8 text-[#7a7875]">
              Our dedicated coordinators work alongside you to incorporate sightseeing, hotel liaisons, and schedule adjustments — delivering a journey that is uniquely yours from start to finish.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-[#c24716]">What&apos;s included</p>
            <div className="flex flex-col">
              {highlights.map((item, i) => (
                <div key={item} className="flex items-center gap-4 border-b border-[#f2ede7] py-4 last:border-b-0">
                  <span className="min-w-[28px] text-[11px] font-black text-[#ff4500]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-[#1c1c1c]">{item}</span>
                  <span className="flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-full border border-[#ece8e2]">
                    <ArrowRight className="h-[9px] w-[9px] text-[#ccc]" />
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="bg-[#faf8f5] px-6 py-20 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-[1400px]"
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-0.5 w-6 rounded bg-[#ff4500]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c24716]">Features</p>
              <span className="h-0.5 w-6 rounded bg-[#ff4500]" />
            </div>
            <h2 className="text-4xl font-black tracking-tight text-[#0f0e0c] sm:text-5xl">What you get</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  className="group/card rounded-[28px] border border-[#ede9e3] bg-white p-8 transition-all duration-300 hover:border-[#ff4500]/30 hover:shadow-[0_8px_32px_rgba(255,69,0,0.08)]"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f3f0] transition-colors duration-300 group-hover/card:bg-[#ff4500]/10">
                    <Icon className="h-5 w-5 text-[#b0ada8] transition-colors duration-300 group-hover/card:text-[#ff4500]" />
                  </div>
                  <h3 className="mb-2 text-base font-black text-[#0f0e0c]">{f.title}</h3>
                  <p className="text-sm leading-6 text-[#8a8784]">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-[#111] px-6 py-14 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center divide-y divide-white/10 sm:divide-y-0 sm:divide-x sm:divide-white/10"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="flex flex-col items-center px-10 py-6 text-center">
              <p className="text-4xl font-black text-[#ff4500] sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3">
            <span className="h-0.5 w-6 rounded bg-[#ff4500]" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c24716]">Get Started</p>
            <span className="h-0.5 w-6 rounded bg-[#ff4500]" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-black tracking-tight text-[#0f0e0c] sm:text-5xl">
            Ready to Book?
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-base leading-7 text-[#7a7875]">
            Tell us where you want to go. Our team will build your complete custom itinerary and handle every detail.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff4500] px-8 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(255,69,0,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#d83a00]"
            >
              Book Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#0f0e0c] px-8 py-4 text-sm font-black uppercase tracking-wide text-[#0f0e0c] transition-all hover:-translate-y-0.5 hover:border-[#ff4500] hover:text-[#ff4500]"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}
