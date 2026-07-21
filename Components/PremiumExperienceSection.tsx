"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiClock, FiShield, FiStar, FiWifi } from "react-icons/fi";

const pillars = [
  {
    title: "Executive Interiors",
    description: "Leather-finished comfort, climate-controlled cabins, and a polished arrival for business or private travel.",
    icon: FiStar,
  },
  {
    title: "Always-On Assistance",
    description: "Fast confirmations, trip monitoring, and responsive support before pickup, during travel, and after drop-off.",
    icon: FiClock,
  },
  {
    title: "Discreet Safety Standards",
    description: "Verified chauffeurs, maintained vehicles, and a calm premium experience designed around reliability.",
    icon: FiShield,
  },
  {
    title: "Connected On The Move",
    description: "Ideal for airport runs, executive meetings, and long city transfers where comfort and continuity matter.",
    icon: FiWifi,
  },
];

const serviceHighlights = [
  "Chauffeur-ready sedans and SUVs",
  "Airport and hotel coordination",
  "Corporate and family travel coverage",
];

export default function PremiumExperienceSection() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-[4.5rem]">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at top left, rgba(212,175,55,0.08), transparent 30%), linear-gradient(135deg, rgba(15,23,42,0.04) 0, rgba(15,23,42,0.04) 1px, transparent 1px, transparent 22px)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeCurve }}
        >
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
            Premium Experience
          </p>

          <h2 className="about-serif-font mt-5 max-w-2xl text-4xl font-bold leading-[1.05] text-slate-950 sm:text-[2.9rem] lg:text-[3.35rem]">
            A refined travel standard built for comfort, timing, and presence.
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            This section focuses on the elevated service behind every booking, from executive-ready vehicles to the smooth coordination that makes premium travel feel effortless.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <motion.article
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: easeCurve }}
                  className="group rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E8C766] hover:shadow-[0_24px_55px_rgba(212,175,55,0.10)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5E9C8] text-[#D4AF37] transition-colors duration-300 group-hover:bg-[#D4AF37] group-hover:text-[#0A0A0A]">
                    <Icon className="text-lg" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.description}</p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: easeCurve }}
          className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-[linear-gradient(160deg,#F5E9C8_0%,#ffffff_45%,#f6f7fb_100%)] p-6 shadow-[0_30px_70px_rgba(15,23,42,0.08)] sm:p-8"
        >
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#D4AF37]/10 blur-3xl" aria-hidden="true" />

          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Signature Service
                </p>
                <h3 className="mt-3 max-w-xs text-2xl font-bold leading-tight text-slate-950 sm:text-[2rem]">
                  Premium journeys designed to feel seamless from first contact.
                </h3>
              </div>
              <span className="rounded-full border border-[#E8C766] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                White Label Care
              </span>
            </div>

            <div className="mt-8 rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950 px-5 py-6 text-white">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">Guest Satisfaction</p>
                  <p className="mt-3 text-4xl font-black tracking-tight">98%</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Premium support and presentation for executive, family, and event travel.
                  </p>
                </div>

                <div className="space-y-3">
                  {serviceHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-700"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5E9C8] text-[#D4AF37]">
                        <FiArrowUpRight className="text-sm" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Need a more polished section flow?</p>
                  <p className="mt-1 text-sm text-slate-500">This block replaces the duplicate value proposition with a luxury service story.</p>
                </div>

                <Link
                  href="/services"
                  className=" group inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#B8860B]"
                >
                  Explore 
                  <FiArrowUpRight className="transition-all duration-300 group-hover:rotate-45" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
