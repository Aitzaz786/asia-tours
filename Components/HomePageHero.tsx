import React from 'react'
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import AboutSection from "@/Components/AboutSection";
import OurServicesSection from "@/Components/OurServicesSection";
import OurFleetsSection from "@/Components/OurFleetsSection";
import HowItWorksSection from "@/Components/HowItWorksSection";
import PremiumExperienceSection from "@/Components/PremiumExperienceSection";
import FaqSection from "@/Components/FaqSection";
import CtaBannerSection from "@/Components/CtaBannerSection";
import CategorySection from "@/Components/CategorySection";
import QuickBookingForm from "@/Components/QuickBookingForm";


const HomePageHero = () => {
      const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const trustBadges = [
    { icon: "✓", text: "Free Cancellation" },
    { icon: "✓", text: "24/7 Support" },
    { icon: "✓", text: "No Hidden Fees" },
    { icon: "✓", text: "Insured Fleet" },
  ];

  const quickStats = [
    { value: "2K+", label: "Trips Completed" },
    { value: "24/7", label: "Travel Support" },
    { value: "100%", label: "Premium Care" },
  ];
  return (
       <main className="px-3 pb-6 sm:px-5 sm:pb-8 lg:px-7">
        <section className="relative mx-auto w-full max-w-[1800px] pb-5 sm:pb-7 lg:pb-9">
          <div className="relative min-h-[620px] overflow-hidden rounded-[28px] sm:min-h-[700px] sm:rounded-[36px] lg:min-h-[760px] lg:rounded-[46px] xl:min-h-[820px]">
            <div className="absolute inset-0">
              <Image
                src="/hero-bg.jpg"
                alt="Luxury rental car hero"
                fill
                priority
                className="object-cover object-[72%_center] lg:object-center"
                sizes="100vw"
              />
            </div>
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.86),rgba(0,0,0,0.72),rgba(0,0,0,0.52))] md:bg-[linear-gradient(115deg,rgba(0,0,0,0.84),rgba(0,0,0,0.68),rgba(0,0,0,0.30))] lg:bg-gradient-to-r lg:from-[rgba(0,0,0,0.86)] lg:via-[rgba(0,0,0,0.52)] lg:to-[rgba(0,0,0,0.14)]"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
              aria-hidden="true"
            />

            <div className="relative z-10 flex min-h-[620px] w-full items-center px-5 py-12 sm:min-h-[700px] sm:px-8 sm:py-14 lg:min-h-[760px] lg:px-12 xl:px-[4.5rem]">
              <div className="grid w-full items-end gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: easeCurve }}
                    className="mb-5 inline-flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff4500]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ff4500] sm:text-xs sm:tracking-[0.28em]">
                      Welcome To Car Rent
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: easeCurve }}
                    className="max-w-[12ch] text-[2.5rem] font-black leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-[3.75rem] xl:text-[4.6rem]"
                  >
                    Looking to <span className="text-[#ff4500]">save more</span>
                    <br />
                    on your rental car?
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35, ease: easeCurve }}
                    className="mt-5 max-w-xl text-sm leading-7 text-white/72 sm:text-base lg:text-lg"
                  >
                    Whether you&apos;re planning a weekend getaway, a business trip, or just need a reliable ride for the day, we have the perfect vehicle for you.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: easeCurve }}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {trustBadges.map((badge) => (
                      <span
                        key={badge.text}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-md sm:px-3.5 sm:text-xs"
                      >
                        <span className="text-[#ff4500]">{badge.icon}</span>
                        {badge.text}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65, ease: easeCurve }}
                    className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                  >
                    <Link
                      href="/services"
                      className="shimmer-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#ff4500] px-8 py-3.5 text-sm font-bold text-white shadow-[0_20px_45px_rgba(255,69,0,0.3)]"
                    >
                      Book A Rental
                    </Link>

                    <Link
                      href="/about-us"
                      className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/12"
                    >
                      <span>Learn More</span>
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <FiArrowUpRight className="text-xs" />
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8, ease: easeCurve }}
                    className="mt-8  max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 hidden lg:grid"
                  >
                    {quickStats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/12 bg-white/8 px-4 py-4 backdrop-blur-md"
                      >
                        <p className="text-2xl font-black tracking-tight text-white">{item.value}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/60">{item.label}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: easeCurve }}
                  className="hidden rounded-[28px] border border-white/12 bg-white/10 p-5 text-white shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:block"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffb391]">
                    Premium Journey
                  </p>
                  <h3 className="mt-4 text-2xl font-bold leading-tight">
                    Executive rides styled for airport, city, and event travel.
                  </h3>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/55">Popular Choice</p>
                      <p className="mt-2 text-lg font-semibold">Luxury SUVs & chauffeur-ready sedans</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">
                        <p className="text-xl font-bold text-[#ffb391]">15+</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/55">Years Trust</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">
                        <p className="text-xl font-bold text-[#ffb391]">Fast</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/55">Booking Flow</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <QuickBookingForm easeCurve={easeCurve} />
        </section>
      </main>
  )
}

export default HomePageHero