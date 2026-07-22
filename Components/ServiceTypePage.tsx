"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import DarkHeroShell, { HOME_HERO_CONTENT_HEIGHT } from "@/Components/DarkHeroShell";
import QuickBookingForm from "@/Components/QuickBookingForm";
import OurFleetsSection from "@/Components/OurFleetsSection";
import PricingTableSection from "@/Components/PricingTableSection";
import CtaBannerSection from "@/Components/CtaBannerSection";
import CitiesNetworkSection from "@/Components/CitiesNetworkSection";
import FaqSection from "@/Components/FaqSection";
import type { ServiceTypeContent } from "@/app/services/serviceTypeData";
import { SECTION_Y, SECTION_Y_END } from "@/lib/sectionSpacing";

const LahoreServiceMap = dynamic(() => import("@/Components/LahoreServiceMap"), {
  ssr: false,
});

const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const trustBadges = [
  { text: "Free Cancellation" },
  { text: "24/7 Support" },
  { text: "No Hidden Fees" },
  { text: "Insured Fleet" },
];

export default function ServiceTypePage({ content }: { content: ServiceTypeContent }) {
  return (
    <main className="min-h-screen bg-white text-[#0f0e0c]">
      {/* Hero — centered text + CTAs + booking form */}
      <section className="home-hero relative z-30 w-full overflow-x-hidden pb-8 sm:pb-12 lg:pb-14">
        <DarkHeroShell>
          <div
            className={`relative z-10 flex w-full flex-col items-center justify-center px-5 pt-28 pb-6 text-center sm:px-8 sm:pt-36 sm:pb-20 lg:px-12 ${HOME_HERO_CONTENT_HEIGHT}`}
          >
            <nav
              aria-label="breadcrumb"
              className="mb-5 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50"
            >
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="transition-colors hover:text-white">
                Services
              </Link>
              <span>/</span>
              <span className="text-white/90">{content.title}</span>
            </nav>

            <div className="mb-4 inline-flex items-center justify-center gap-3 sm:mb-6">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37] sm:w-12" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37] sm:text-xs">
                {content.eyebrow}
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37] sm:w-12" />
            </div>

            <h1 className="hero-display-font max-w-4xl text-[2.45rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.65rem] xl:text-[4.35rem]">
              {content.headline}{" "}
              <span className="bg-gradient-to-r from-[#E8C766] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                {content.headlineAccent}
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-[14px] font-light leading-7 tracking-wide text-white/70 sm:mt-6 sm:text-base lg:max-w-xl lg:text-lg lg:leading-8">
              {content.description}
            </p>

            <div className="mx-auto mt-5 hidden flex-wrap justify-center gap-2 sm:mt-7 sm:flex sm:gap-2.5">
              {trustBadges.map((badge) => (
                <span
                  key={badge.text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/85 sm:px-3.5 sm:py-2 sm:text-xs"
                >
                  <FiCheck className="h-3 w-3 shrink-0 text-[#D4AF37]" strokeWidth={2.5} />
                  {badge.text}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact-us"
                className="shimmer-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-bold text-[#0A0A0A] shadow-[0_20px_45px_rgba(212,175,55,0.3)]"
              >
                Book This Service
              </Link>

              <div className="flex items-center gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black shadow-md transition-all hover:bg-white/90"
                >
                  All Services
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-white/90"
                  aria-label="All services"
                >
                  <FiArrowUpRight className="text-lg text-black transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </div>
            </div>
          </div>
        </DarkHeroShell>

        <div className="relative z-40 px-3 sm:px-5 lg:px-7">
          <QuickBookingForm easeCurve={easeCurve} />
        </div>
      </section>

      {/* About this service */}
      <section className={`bg-white px-4 sm:px-6 lg:px-8 ${SECTION_Y}`}>
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative mx-auto w-full overflow-hidden rounded-[28px] sm:rounded-[40px]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="mb-4 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37] lg:justify-start">
              <span className="text-xs leading-none" aria-hidden="true">
                {"\u2733"}
              </span>
              <span>About This Service</span>
            </p>

            <h2 className="about-serif-font mx-auto max-w-xl text-3xl font-bold leading-[1.08] text-[#0f0e0c] sm:text-4xl lg:mx-0 lg:text-[2.85rem]">
              {content.overviewTitle}{" "}
              <span className="text-[#D4AF37]">{content.overviewAccent}</span>
            </h2>

            {content.overviewBody.map((paragraph) => (
              <p
                key={paragraph.slice(0, 28)}
                className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#6b6560] lg:mx-0"
              >
                {paragraph}
              </p>
            ))}

            <ul className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:mx-0">
              {content.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">
                    <FiCheck className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-[#2f2b27]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-[#0A0A0A] transition-colors hover:bg-[#B8860B]"
              >
                Plan My Ride
              </Link>
              <Link
                href="/areas"
                className="inline-flex items-center justify-center rounded-full border border-[#e8e1dc] bg-white px-7 py-3.5 text-sm font-semibold text-[#0f0e0c] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                View Areas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <OurFleetsSection />
      <PricingTableSection />
      <CtaBannerSection compact />
      <CitiesNetworkSection showViewAll />
      <FaqSection compact />

      <section className={`relative flex w-full items-center justify-center overflow-hidden bg-white px-4 sm:px-6 lg:px-10 ${SECTION_Y_END}`}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
          <span className="select-none text-[7rem] font-bold tracking-tighter text-slate-900 sm:text-[10rem] lg:text-[20rem]">
            ASIA
          </span>
        </div>

        <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-muted text-[#D4AF37]">
            <span className="text-2xl font-bold">{"\u2726"}</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ready to book <span className="text-[#D4AF37]">{content.title}?</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
            Share your route and timing — we&apos;ll confirm availability and prepare a smooth premium booking.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0A0A0A] transition-colors hover:bg-[#B8860B]"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-[#efddcf] bg-white px-8 py-4 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#F5E9C8]"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>

      <section className={SECTION_Y}>
        <LahoreServiceMap />
      </section>
    </main>
  );
}
