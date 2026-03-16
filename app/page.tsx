"use client";

import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import AboutSection from "@/Components/AboutSection";
import OurServicesSection from "@/Components/OurServicesSection";
import OurFleetsSection from "@/Components/OurFleetsSection";
import HowItWorksSection from "@/Components/HowItWorksSection";
import WhyChooseUsSection from "@/Components/WhyChooseUsSection";
import FaqSection from "@/Components/FaqSection";
import CtaBannerSection from "@/Components/CtaBannerSection";
import LatestArticlesSection from "@/Components/LatestArticlesSection";

const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function HomePage() {
  return (
    <>
      <main className="px-3 pb-32 sm:px-5 lg:px-7">
      <section className=" relative mx-auto h-[78svh] w-full max-w-[1800px] overflow-visible rounded-3xl">
      
  <video
    className="absolute inset-0 h-full w-full object-cover rounded-3xl"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    aria-hidden="true"
  >
    <source src="/landv.webm" type="video/webm" />
  </video>
        <div className="absolute inset-0 rounded-3xl bg-black/30" aria-hidden="true" />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center ">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeCurve }}
            className="inline-flex items-center gap-2 !text-[30px] uppercase tracking-[0.24em] text-[#ff4500]"
          >
            {/* <PiSparkleFill className="text-sm" /> */}
            <span>Welcome To Car Rent</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easeCurve }}
            className="hero-display-font !text-[70px] font-bold leading-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.06]"
          >
            Looking to save more on your rental car?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: easeCurve }}
            className="mt-5 max-w-4xl !text-[18px] leading-7 text-gray-300 sm:text-base sm:leading-8"
          >
            Whether you&apos;re planning a weekend getaway, a business trip, or just need a reliable ride for the
            day, we offers a wide range of vehicles to suit your needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: easeCurve }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-[#ff4500] px-7 py-3 text-xl font-semibold text-white transition-colors hover:bg-[#e53d00]"
            >
              Book A Rental
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center rounded-full border border-white/80 px-2 py-2 pl-6 text-xl font-medium text-white transition-colors hover:border-white"
            >
              <span>Learn More</span>
              <motion.span
                whileHover={{ scale: 1.15, rotate: 45 }}
                whileTap={{ scale: 0.9 }}
                className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#111111] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <FiArrowUpRight className="text-base" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: easeCurve }}
        >
          <Image
            src="https://pngimg.com/d/rolls_royce_PNG70.png"
            alt="Black luxury sedan"
            width={980}
            height={410}
            className="pointer-events-none absolute bottom-[88px] left-1/2 z-20 w-[92%] max-w-[980px] -translate-x-1/2 select-none"
          />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: easeCurve }}
          className="absolute bottom-[100px] left-1/2 z-30 w-[95%] max-w-7xl -translate-x-1/2 translate-y-1/2 rounded-[30px] bg-white p-4 shadow-[0_18px_45px_rgba(0,0,0,0.38)] sm:p-5 lg:rounded-full lg:p-3"
        >
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-0 lg:divide-x lg:divide-[#ececec] pl-3">
            <div className="px-4 py-3 lg:min-w-[280px] lg:px-5">
              <p className="text-[18px] font-bold leading-6 text-[#111111]">Need to Rent a Luxury Car?</p>
            </div>

            <div className="px-3 py-3 lg:min-w-[207px] lg:px-5">
              <label htmlFor="fullName" className="block text-sm font-bold text-[#161616]">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter Full Name"
                className="mt-1 w-full bg-transparent text-sm text-[#2a2a2a] outline-none placeholder:text-[#8d8d8d]"
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
                className="mt-1 w-full bg-transparent text-sm text-[#2a2a2a] outline-none placeholder:text-[#8d8d8d]"
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
                className="mt-1 w-full bg-transparent text-sm text-[#2a2a2a] outline-none placeholder:text-[#8d8d8d]"
              />
            </div>

            <div className="px-3 py-3 lg:min-w-[207px] lg:px-5">
              <label htmlFor="pickupDate" className="block text-sm font-bold text-[#161616]">
                Pickup Date
              </label>
              <div className="mt-1 flex items-center gap-2 text-[#8d8d8d]">
                <input id="pickupDate" type="date" className="w-full bg-transparent text-sm text-[#2a2a2a] outline-none" />
                {/* <FiCalendar className="text-base text-[#676767]" aria-hidden="true" /> */}
              </div>
            </div>

            <div className="flex items-center px-3 py-2 lg:px-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-full bg-[#ff4500] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e53d00] lg:w-auto"
              >
                Send
              </motion.button>
            </div>
          </div>
        </motion.form>
      </section>
      </main>
      <AboutSection />
      <OurServicesSection />
      <OurFleetsSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <FaqSection />
      <CtaBannerSection />
      <LatestArticlesSection />
    </>
  );
}