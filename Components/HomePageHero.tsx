import React from "react";
import Link from "next/link";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import QuickBookingForm from "@/Components/QuickBookingForm";
import { HOME_HERO_HEIGHT } from "@/Components/DarkHeroShell";

const HomePageHero = () => {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const trustBadges = [
    { text: "Free Cancellation" },
    { text: "24/7 Support" },
    { text: "No Hidden Fees" },
    { text: "Insured Fleet" },
  ];

  const quickStats = [
    { value: "2K+", label: "Trips Completed" },
    { value: "24/7", label: "Travel Support" },
    { value: "100%", label: "Premium Care" },
  ];

  return (
    <section className="home-hero relative w-full overflow-hidden pb-8 sm:pb-12 lg:pb-14">
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

        <div className={`relative z-10 flex w-full items-center px-5 pt-28 pb-6 sm:px-8 sm:pt-36 sm:pb-20 lg:px-12 xl:px-[4.5rem] ${HOME_HERO_HEIGHT}`}>
          <div className="grid w-full items-end gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 sm:mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37] sm:text-xs sm:tracking-[0.28em]">
                  Welcome To Car Rent
                </span>
              </div>

              <h1 className="max-w-[12ch] text-[2.5rem] font-black leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-[3.75rem] xl:text-[4.6rem]">
                Looking to <span className="text-[#D4AF37]">save more</span>
                <br />
                on your rental car?
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/72 sm:mt-5 sm:text-base lg:text-lg">
                Whether you&apos;re planning a weekend getaway, a business trip, or just need a
                reliable ride for the day, we have the perfect vehicle for you.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5">
                {trustBadges.map((badge) => (
                  <span
                    key={badge.text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/85 sm:px-3.5 sm:text-xs"
                  >
                    <FiCheck className="h-3 w-3 shrink-0 text-[#D4AF37]" strokeWidth={2.5} />
                    {badge.text}
                  </span>
                ))}
              </div>

              <div className="mt-8 hidden flex-col gap-3 sm:flex sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/services"
                  className="shimmer-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-bold text-[#0A0A0A] shadow-[0_20px_45px_rgba(212,175,55,0.3)]"
                >
                  Book A Rental
                </Link>

                <Link
                  href="/about-us"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/12"
                >
                  <span>Learn More</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <FiArrowUpRight className="text-xs transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </Link>
              </div>

              <div className="mt-8 hidden max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 lg:grid">
                {quickStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/12 bg-white/8 px-4 py-4"
                  >
                    <p className="text-2xl font-black tracking-tight text-white">{item.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/60">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden rounded-[28px] border border-white/12 bg-white/10 p-5 text-white lg:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#E8C766]">
                Premium Journey
              </p>
              <h3 className="mt-4 text-2xl font-bold leading-tight">
                Executive rides styled for airport, city, and event travel.
              </h3>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/55">Popular Choice</p>
                  <p className="mt-2 text-lg font-semibold">
                    Luxury SUVs & chauffeur-ready sedans
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">
                    <p className="text-xl font-bold text-[#E8C766]">15+</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/55">
                      Years Trust
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">
                    <p className="text-xl font-bold text-[#E8C766]">Fast</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/55">
                      Booking Flow
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 px-3 sm:px-5 lg:px-7">
        <QuickBookingForm easeCurve={easeCurve} />
      </div>
    </section>
  );
};

export default HomePageHero;
