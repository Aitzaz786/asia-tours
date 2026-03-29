"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiArrowUpRight, FiCalendar, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import AboutSection from "@/Components/AboutSection";
import OurServicesSection from "@/Components/OurServicesSection";
import OurFleetsSection from "@/Components/OurFleetsSection";
import HowItWorksSection from "@/Components/HowItWorksSection";
import PremiumExperienceSection from "@/Components/PremiumExperienceSection";
import FaqSection from "@/Components/FaqSection";
import CtaBannerSection from "@/Components/CtaBannerSection";
import CategorySection from "@/Components/CategorySection";

const LahoreServiceMap = dynamic(() => import("@/Components/LahoreServiceMap"), {
  ssr: false,
});

export default function HomePage() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const trustBadges = [
    { icon: "\u2713", text: "Free Cancellation" },
    { icon: "\u2713", text: "24/7 Support" },
    { icon: "\u2713", text: "No Hidden Fees" },
    { icon: "\u2713", text: "Insured Fleet" },
  ];

  const quickStats = [
    { value: "2K+", label: "Trips Completed" },
    { value: "24/7", label: "Travel Support" },
    { value: "100%", label: "Premium Care" },
  ];

  return (
    <>
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
                    className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
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

          <motion.form
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: easeCurve }}
            className="relative z-30 mx-auto -mt-12 w-[calc(100%-1.5rem)] max-w-7xl overflow-hidden rounded-full border border-white/55 bg-white/92 px-3 py-3 shadow-lg backdrop-blur-md sm:-mt-14 sm:w-[calc(100%-2.5rem)] sm:px-4 sm:py-3 lg:-mt-16 lg:px-5"
          >
            <div className="relative flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0">
              <div className="flex min-w-0 items-center px-4 py-2 sm:px-5 lg:w-[21%] lg:border-r lg:border-[#ebe7e2] lg:px-6">
                <div className="min-w-0">
                  <p className="max-w-[16ch] text-sm font-bold leading-5 text-[#151515] sm:text-[15px]">
                    Need to Rent a Luxury Car?
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#7b7b7b]">
                    Quick premium booking
                  </p>
                </div>
              </div>

              <div className="grid flex-1 gap-2 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-center lg:gap-0">
                <div className="flex min-w-0 items-center px-4 py-2 sm:px-5 lg:border-r lg:border-[#ebe7e2] lg:px-6">
                  <label
                    htmlFor="fullName"
                    className="flex min-w-0 flex-1 flex-col justify-center"
                  >
                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#424242]">
                      <FiUser className="text-[#ff4500]" />
                      Full Name
                    </span>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Enter Full Name"
                      className="mt-1 w-full bg-transparent text-sm text-[#1f1f1f] outline-none placeholder:text-[#7a7a7a]"
                    />
                  </label>
                </div>

                <div className="flex min-w-0 items-center px-4 py-2 sm:px-5 lg:border-r lg:border-[#ebe7e2] lg:px-6">
                  <label
                    htmlFor="mobileNo"
                    className="flex min-w-0 flex-1 flex-col justify-center"
                  >
                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#424242]">
                      <FiPhone className="text-[#ff4500]" />
                      Mobile No
                    </span>
                    <input
                      id="mobileNo"
                      type="tel"
                      placeholder="Enter Phone no."
                      className="mt-1 w-full bg-transparent text-sm text-[#1f1f1f] outline-none placeholder:text-[#7a7a7a]"
                    />
                  </label>
                </div>

                <div className="flex min-w-0 items-center px-4 py-2 sm:px-5 lg:border-r lg:border-[#ebe7e2] lg:px-6">
                  <label
                    htmlFor="pickupLocation"
                    className="flex min-w-0 flex-1 flex-col justify-center"
                  >
                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#424242]">
                      <FiMapPin className="text-[#ff4500]" />
                      Pickup Location
                    </span>
                    <input
                      id="pickupLocation"
                      type="text"
                      placeholder="Enter Location"
                      className="mt-1 w-full bg-transparent text-sm text-[#1f1f1f] outline-none placeholder:text-[#7a7a7a]"
                    />
                  </label>
                </div>

                <div className="flex min-w-0 items-center px-4 py-2 sm:px-5 lg:border-r lg:border-[#ebe7e2] lg:px-6">
                  <label
                    htmlFor="pickupDate"
                    className="flex min-w-0 flex-1 flex-col justify-center"
                  >
                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#424242]">
                      <FiCalendar className="text-[#ff4500]" />
                      Pickup Date
                    </span>
                    <div className="relative mt-1 flex items-center">
                      <input
                        id="pickupDate"
                        type="date"
                        className="w-full bg-transparent pr-7 text-sm text-[#1f1f1f] outline-none"
                      />
                      <FiCalendar className="pointer-events-none absolute right-0 text-sm text-[#7a7a7a]" />
                    </div>
                  </label>
                </div>

                <div className="flex items-center px-4 py-2 sm:px-5 lg:px-6">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="hero-send-button inline-flex h-12 w-full items-center justify-center rounded-full bg-[#ff4500] px-7 text-sm font-bold text-white shadow-[0_10px_24px_rgba(255,69,0,0.2)] transition-colors hover:bg-[#e53d00] lg:w-auto lg:min-w-[120px]"
                  >
                    Send
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.form>
        </section>
      </main>

      <AboutSection />
      <OurFleetsSection />
      <CategorySection />
         <CtaBannerSection />
          <LahoreServiceMap />
             <HowItWorksSection />
      <OurServicesSection />
     
   
   
      <PremiumExperienceSection />
      <FaqSection />
 <section className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-[28px] bg-white px-4 py-14 sm:min-h-[360px] sm:rounded-[36px] sm:px-6 lg:min-h-[400px] lg:px-10">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <span className="text-[7rem] font-bold tracking-tighter text-slate-900 select-none sm:text-[10rem] lg:text-[20rem]">
          ASIA
        </span>
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#ff4500]"
        >
          <span className="text-2xl font-bold">{"\u2726"}</span>
        </motion.div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Ready to elevate <span className="text-[#ff4500]">your journey?</span>
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          Tailored luxury transport services for executive and private travel.
        </p>

        <div className="group relative mt-8 sm:mt-10">
          <Link
            href="/contact-us"
            className="relative z-10 block rounded-full bg-[#ff4500] px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:scale-105 active:scale-95 sm:px-10"
          >
            Contact Us
          </Link>

          <div className="absolute left-1/2 top-full mt-4 hidden h-[1px] w-0 -translate-x-1/2 bg-[#ff4500] transition-all duration-500 group-hover:w-32 sm:block" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:mt-12 sm:gap-8">
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

      <div className="absolute bottom-0 left-4 hidden h-20 w-[1px] bg-gradient-to-t from-orange-100 to-transparent sm:left-10 sm:block" />
      <div className="absolute right-4 top-0 hidden h-20 w-[1px] bg-gradient-to-b from-orange-100 to-transparent sm:right-10 sm:block" />
    </section>
    </>
  );
}
