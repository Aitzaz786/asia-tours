"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import AboutSection from "@/Components/AboutSection";
import OurServicesSection from "@/Components/OurServicesSection";
import OurFleetsSection from "@/Components/OurFleetsSection";
import HowItWorksSection from "@/Components/HowItWorksSection";
import WhyChooseUsSection from "@/Components/WhyChooseUsSection";
import FaqSection from "@/Components/FaqSection";
import CtaBannerSection from "@/Components/CtaBannerSection";
import CategorySection from "@/Components/CategorySection";

export default function HomePage() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const trustBadges = [
    { icon: "\u2713", text: "Free Cancellation" },
    { icon: "\u2713", text: "24/7 Support" },
    { icon: "\u2713", text: "No Hidden Fees" },
    { icon: "\u2713", text: "Insured Fleet" },
  ];

  return (
    <>
      <main className="px-3 pb-10 sm:px-5 lg:px-7">
        <section className="relative mx-auto w-full max-w-[1800px] pb-28 sm:pb-32 lg:pb-36">
          <div className="relative min-h-[720px] overflow-hidden rounded-[28px] sm:min-h-[780px] sm:rounded-[38px] lg:min-h-[860px] lg:rounded-[50px]">
            <div className="absolute inset-0">
              <Image src="/hero-bg.jpg" alt="Luxury rental car hero" fill priority className="object-cover" />
            </div>
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.84),rgba(0,0,0,0.66),rgba(0,0,0,0.5))] lg:bg-gradient-to-r lg:from-[rgba(0,0,0,0.82)] lg:via-[rgba(0,0,0,0.42)] lg:to-transparent"
              aria-hidden="true"
            />

            <div className="relative z-10 flex h-full w-full flex-col justify-center px-5 pt-10 sm:px-8 sm:pt-12 lg:px-16 xl:px-20">
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
                  className="text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
                >
                  Looking to <span className="text-[#ff4500]">save more</span>
                  <br />
                  on your rental car?
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: easeCurve }}
                  className="mt-5 max-w-lg text-sm leading-7 text-white/70 sm:text-base lg:text-lg"
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
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-sm sm:px-3.5 sm:text-xs"
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
                    className="shimmer-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#ff4500] px-8 py-3.5 text-sm font-bold text-white"
                  >
                    Book A Rental
                  </Link>

                  <Link
                    href="/about-us"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    <span>Learn More</span>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <FiArrowUpRight className="text-xs" />
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: easeCurve }}
            className="relative z-30 mx-auto -mt-16 w-[94%] max-w-[1350px] rounded-[30px] border-l-[3px] border-l-[#ff4500] bg-white p-4 shadow-[0_18px_45px_rgba(0,0,0,0.16)] sm:-mt-20 sm:p-5 lg:-mt-24 lg:rounded-full lg:p-3"
          >
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0 lg:divide-x lg:divide-[#ececec]">
              <div className="px-3 py-3 sm:px-4 lg:min-w-[280px] lg:px-5">
                <p className="text-base font-bold leading-6 text-[#111111] sm:text-[18px]">Need to Rent a Luxury Car?</p>
              </div>

              <div className="px-3 py-3 lg:min-w-[207px] lg:px-5">
                <label htmlFor="fullName" className="block text-sm font-bold text-[#161616]">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter Full Name"
                  className="mt-2 w-full border-b border-[#dedede] bg-transparent pb-2 text-sm text-[#2a2a2a] outline-none transition-colors placeholder:text-[#8d8d8d] focus:border-[#ff4500]"
                />
              </div>

              <div className="px-3 py-3 lg:min-w-[207px] lg:px-5">
                <label htmlFor="mobileNo" className="block text-sm font-bold text-[#161616]">
                  Mobile No
                </label>
                <input
                  id="mobileNo"
                  type="tel"
                  placeholder="Enter Phone no."
                  className="mt-2 w-full border-b border-[#dedede] bg-transparent pb-2 text-sm text-[#2a2a2a] outline-none transition-colors placeholder:text-[#8d8d8d] focus:border-[#ff4500]"
                />
              </div>

              <div className="px-3 py-3 lg:min-w-[207px] lg:px-5">
                <label htmlFor="pickupLocation" className="block text-sm font-bold text-[#161616]">
                  Pickup Location
                </label>
                <input
                  id="pickupLocation"
                  type="text"
                  placeholder="Enter Location"
                  className="mt-2 w-full border-b border-[#dedede] bg-transparent pb-2 text-sm text-[#2a2a2a] outline-none transition-colors placeholder:text-[#8d8d8d] focus:border-[#ff4500]"
                />
              </div>

              <div className="px-3 py-3 lg:min-w-[207px] lg:px-5">
                <label htmlFor="pickupDate" className="block text-sm font-bold text-[#161616]">
                  Pickup Date
                </label>
                <div className="mt-1 flex items-center gap-2 text-[#8d8d8d]">
                  <input
                    id="pickupDate"
                    type="date"
                    className="w-full border-b border-[#dedede] bg-transparent pb-2 text-sm text-[#2a2a2a] outline-none transition-colors focus:border-[#ff4500]"
                  />
                </div>
              </div>

              <div className="flex items-center px-3 py-2 lg:min-w-[190px] lg:px-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="hero-send-button w-full rounded-full bg-[#ff4500] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e53d00]"
                >
                  Send
                </motion.button>
              </div>
            </div>
          </motion.form>
        </section>
      </main>

      <AboutSection />
      <OurFleetsSection />
      <CategorySection />
      <OurServicesSection />
      <HowItWorksSection />
      <CtaBannerSection />
      <WhyChooseUsSection />
      <FaqSection />

      <section className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-[28px] bg-white px-4 py-14 sm:min-h-[360px] sm:rounded-[36px] sm:px-6 lg:min-h-[400px] lg:px-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
          <span className="select-none text-[7rem] font-bold tracking-tighter text-slate-900 sm:text-[10rem] lg:text-[20rem]">
            ASIA
          </span>
        </div>

        <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#ff4500]">
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
