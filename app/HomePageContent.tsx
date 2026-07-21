"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import AboutSection from "@/Components/AboutSection";
import OurServicesSection from "@/Components/OurServicesSection";
import OurFleetsSection from "@/Components/OurFleetsSection";
import PricingTableSection from "@/Components/PricingTableSection";
import FaqSection from "@/Components/FaqSection";
import CtaBannerSection from "@/Components/CtaBannerSection";
import CategorySection from "@/Components/CategorySection";
import QuickBookingForm from "@/Components/QuickBookingForm";
import CitiesNetworkSection from "@/Components/CitiesNetworkSection";
import { HOME_HERO_HEIGHT } from "@/Components/DarkHeroShell";
import { TestimonialsSection } from "@/app/about-us/page";
import { SECTION_Y, SECTION_Y_END } from "@/lib/sectionSpacing";

export const LahoreServiceMap = dynamic(() => import("@/Components/LahoreServiceMap"), {
  ssr: false,
});

export default function HomePageContent() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
  const [testimonialStart, setTestimonialStart] = useState(0);

  const trustBadges = [
    { text: "Free Cancellation" },
    { text: "24/7 Support" },
    { text: "No Hidden Fees" },
    { text: "Insured Fleet" },
  ];

  return (
    <>
      <section className="home-hero relative z-30 w-full overflow-x-hidden pb-8 sm:pb-12 lg:pb-14">
        <div className={`relative overflow-hidden ${HOME_HERO_HEIGHT}`}>
          <div className="hero-animated-bg" aria-hidden="true">
            <div className="hero-animated-bg__ambient" />
            <div className="hero-animated-bg__grid" />
            <div className="hero-orb hero-orb--1" />
            <div className="hero-orb hero-orb--2" />
            <div className="hero-orb hero-orb--3" />
            <div className="hero-orb hero-orb--4" />
            <div className="hero-orb hero-orb--5" />
            <div className="hero-orb hero-orb--6" />
            <div className="hero-orb hero-orb--7" />
            <div className="hero-orb hero-orb--8" />
            <div className="hero-orb hero-orb--9" />
            <div className="hero-orb hero-orb--10" />
            <div className="hero-line hero-line--h1" />
            <div className="hero-line hero-line--h2" />
            <div className="hero-line hero-line--v1" />
            <div className="hero-line hero-line--diag" />
            <div className="hero-animated-bg__vignette" />
          </div>

          <div className={`relative z-10 flex w-full items-center justify-center px-5 pt-28 pb-6 sm:px-8 sm:pt-36 sm:pb-20 xl:px-[4.5rem] ${HOME_HERO_HEIGHT}`}>
            <div className="w-full max-w-4xl text-center">
              <div className="mb-4 inline-flex items-center justify-center gap-3 sm:mb-6">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37] sm:w-12" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37] sm:text-xs">
                  Welcome To Car Rent
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37] sm:w-12" />
              </div>

              <h1 className="hero-display-font text-[2.65rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.85rem] xl:text-[4.75rem]">
                Looking to{" "}
                <span className="bg-gradient-to-r from-[#E8C766] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                  save more
                </span>
                <br />
                on your{" "}
                <span className="italic font-semibold text-white/95">rental car?</span>
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-[14px] font-light leading-7 tracking-wide text-white/70 sm:mt-6 sm:text-base lg:max-w-xl lg:text-lg lg:leading-8">
                Whether you&apos;re planning a weekend getaway, a business trip, or just need a
                reliable ride for the day — we have the perfect vehicle for you.
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

              <div className="mt-8 hidden items-center justify-center gap-3 md:flex">
                <Link
                  href="/services"
                  className="shimmer-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-bold text-[#0A0A0A] shadow-[0_20px_45px_rgba(212,175,55,0.3)]"
                >
                  Book A Rental
                </Link>

                <div className="flex items-center gap-3">
                  <Link
                    href="/about-us"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black shadow-md transition-all hover:bg-white/90"
                  >
                    Learn More
                  </Link>

                  <Link
                    href="/about-us"
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-white/90"
                    aria-label="Learn more"
                  >
                    <FiArrowUpRight className="text-lg text-black transition-transform duration-300 group-hover:rotate-45" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-40 px-3 sm:px-5 lg:px-7">
          <QuickBookingForm easeCurve={easeCurve} />
        </div>
      </section>

      {/* Brand story */}
      <AboutSection />

      {/* Product: fleet + categories + rates */}
      <OurFleetsSection />
      <CategorySection />
      <PricingTableSection />

      {/* Services + trust */}
      <OurServicesSection />
      <CtaBannerSection compact />

      {/* Coverage: map then city directory */}
      <section className={SECTION_Y}>
        <LahoreServiceMap />
      </section>
      <CitiesNetworkSection showViewAll />

      <TestimonialsSection
        testimonialStart={testimonialStart}
        setTestimonialStart={setTestimonialStart}
      />

      <FaqSection compact />

      <section className={`relative flex w-full items-center justify-center overflow-hidden rounded-none bg-white px-4 sm:px-6 lg:px-10 ${SECTION_Y_END}`}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
          <span className="select-none text-[7rem] font-bold tracking-tighter text-slate-900 sm:text-[10rem] lg:text-[20rem]">
            ASIA
          </span>
        </div>

        <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-muted text-[#D4AF37]">
            <span className="text-2xl font-bold">{"✦"}</span>
          </div>

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
            <div className="absolute left-1/2 top-full mt-4 hidden h-px w-0 -translate-x-1/2 bg-[#D4AF37] transition-all duration-500 group-hover:w-32 sm:block" />
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

        <div className="absolute bottom-0 left-4 hidden h-20 w-px bg-gradient-to-t from-brand-soft to-transparent sm:left-10 sm:block" />
        <div className="absolute right-4 top-0 hidden h-20 w-px bg-gradient-to-b from-brand-soft to-transparent sm:right-10 sm:block" />
      </section>
    </>
  );
}
