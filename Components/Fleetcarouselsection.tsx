"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { fleets, getFleetSlug } from "@/Data/cars";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

const CARDS_VISIBLE = 4; // how many cards show at once on desktop

export default function FleetCarouselSection() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const featuredFleet = fleets; // use all or slice as needed
  const maxSlide = Math.max(0, featuredFleet.length - CARDS_VISIBLE);
  const totalDots = maxSlide + 1;

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(index, maxSlide));
    setCurrent(clamped);
  }

  function move(dir: number) {
    goTo(current + dir);
  }

  // card width = (100% / CARDS_VISIBLE) with gap accounted for
  // We translate by card index using CSS calc
  const translateX = `calc(-${current} * (100% / ${CARDS_VISIBLE} + 20px / ${CARDS_VISIBLE} * (${CARDS_VISIBLE} - 1) / ${CARDS_VISIBLE}))`;

  return (
    <section
      id="fleet-showcase"
      className="relative w-full max-w-[100vw] overflow-hidden bg-[#faf9f7] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(212,175,55,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">

        {/* ── Header ── */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-6 rounded bg-[#D4AF37]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c24716]">
                Fleet Preview
              </p>
              <span className="h-0.5 w-6 rounded bg-[#D4AF37]" />
            </div>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#0f0e0c] sm:text-5xl lg:text-6xl">
              Cars that make the service{" "}
              <em className="not-italic text-[#D4AF37]">feel premium.</em>
            </h2>
          </div>

          {/* Nav arrows + CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => move(-1)}
              disabled={current === 0}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#ece8e2] bg-white transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37] disabled:opacity-30 disabled:cursor-not-allowed [&:not(:disabled):hover_svg]:stroke-white"
              aria-label="Previous"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => move(1)}
              disabled={current === maxSlide}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#ece8e2] bg-white transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37] disabled:opacity-30 disabled:cursor-not-allowed [&:not(:disabled):hover_svg]:stroke-white"
              aria-label="Next"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full bg-[#0f0e0c] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#0A0A0A]"
            >
              Ask for availability
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="mt-10 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-4 transition-transform duration-500"
            style={{
              transform: `translateX(calc(-${current} * (100% / ${CARDS_VISIBLE} + ${16 / CARDS_VISIBLE}px)))`,
            }}
          >
            {featuredFleet.map((fleet) => (
              <article
                key={fleet.name}
                className="group w-[calc(25%-12px)] flex-shrink-0 overflow-hidden rounded-[22px] border border-[#ece8e2] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]"
              >
                {/* ── Top: Image ── */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={fleet.image}
                    alt={fleet.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.68)_100%)]" />

                  {/* Badge */}
                  <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#c24716]">
                    Premium
                  </div>

                  {/* Name + Price on image */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.80)_0%,transparent_100%)] px-4 pb-4 pt-8">
                    <p className="text-[9px] font-bold text-[rgba(255,181,145,0.9)] mb-1">
                      PKR {formatPrice(fleet.price)} / day
                    </p>
                    <h3 className="text-lg font-black leading-tight text-white">
                      {fleet.name}
                    </h3>
                  </div>
                </div>

                {/* ── Bottom: Detail ── */}
                <div className="p-4">
                  {/* Highlights pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {fleet.highlights?.slice(0, 4).map((item) => (
                      <span
                        key={`${fleet.name}-${item.label}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#eee4d9] bg-[#F5E9C8] px-2.5 py-1.5 text-[10px] font-semibold text-[#34312d]"
                      >
                        <Check className="h-3 w-3 text-[#D4AF37]" />
                        {item.label}:{" "}
                        {typeof item.value === "boolean"
                          ? item.value
                            ? "Yes"
                            : "No"
                          : item.value}
                      </span>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="mb-4 flex gap-0 border-y border-[#f2ede7] py-3">
                    {[
                      { n: "5★", l: "Rated" },
                      { n: "2023", l: "Model" },
                      { n: "AC", l: "Climate" },
                    ].map((s, i) => (
                      <div
                        key={s.l}
                        className={`flex-1 text-center ${i < 2 ? "border-r border-[#f2ede7]" : ""}`}
                      >
                        <p className="text-sm font-black text-[#0f0e0c]">{s.n}</p>
                        <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#b0ada8]">
                          {s.l}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA link */}
                  <Link
                    href={`/services/${getFleetSlug(fleet.name)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-[10px] font-black uppercase tracking-wide text-[#0A0A0A] shadow-[0_6px_18px_rgba(212,175,55,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#B8860B]"
                  >
                    Open vehicle page
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Dot indicators ── */}
        {totalDots > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-[#D4AF37]"
                    : "w-1.5 bg-[#e0dbd5] hover:bg-[#D4AF37]/40"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}