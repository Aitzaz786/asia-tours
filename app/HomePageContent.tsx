"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import AboutSection from "@/Components/AboutSection";
import OurServicesSection from "@/Components/OurServicesSection";
import OurFleetsSection from "@/Components/OurFleetsSection";
import HowItWorksSection from "@/Components/HowItWorksSection";
import PremiumExperienceSection from "@/Components/PremiumExperienceSection";
import FaqSection from "@/Components/FaqSection";
import CtaBannerSection from "@/Components/CtaBannerSection";
import CategorySection from "@/Components/CategorySection";
import QuickBookingForm from "@/Components/QuickBookingForm";
import BrandMarquee from "@/Components/BrandMarquee";

export const LahoreServiceMap = dynamic(() => import("@/Components/LahoreServiceMap"), {
  ssr: false,
});

export default function HomePageContent() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const trustBadges = [
    { icon: "✓", text: "Free Cancellation" },
    { icon: "✓", text: "24/7 Support" },
    { icon: "✓", text: "No Hidden Fees" },
    { icon: "✓", text: "Insured Fleet" },
  ];


  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      const split = new SplitType(headingRef.current, { types: "chars" });
      gsap.set(split.chars!, { y: 40, opacity: 0 });
      gsap.to(split.chars!, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        stagger: 0.025,
        ease: "power3.out",
      });
    }
    if (paraRef.current) {
      const split = new SplitType(paraRef.current, { types: "words" });
      gsap.set(split.words!, { y: 20, opacity: 0 });
      gsap.to(split.words!, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: 0.65,
        stagger: 0.06,
        ease: "power3.out",
      });
    }
  }, []);

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
<div className="relative z-10 flex min-h-[620px] w-full items-center justify-center px-5 py-12 sm:min-h-[700px] sm:px-8 sm:py-14 lg:min-h-[760px] xl:px-[4.5rem]">
  
  <div className="w-full max-w-4xl text-center">

    {/* Badge */}
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: easeCurve }}
      className="mb-5 inline-flex items-center justify-center gap-2"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff4500]" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ff4500] sm:text-xs">
        Welcome To Car Rent
      </span>
         <span className="h-1.5 w-1.5 rounded-full bg-[#ff4500]" />
    </motion.div>

    {/* Heading */}
    <h1
      ref={headingRef}
      className="text-[2.5rem] font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.75rem] xl:text-[4.6rem] [&_.char]:inline-block"
    >
      Looking to save more
      <br />
      on your rental car?
    </h1>

    {/* Paragraph */}
    <p
      ref={paraRef}
      className="mt-5 mx-auto max-w-xl text-sm leading-7 text-white/72 sm:text-base lg:text-lg [&_.word]:inline-block"
    >
      Whether you&apos;re planning a weekend getaway, a business trip, or just need a reliable ride for the day, we have the perfect vehicle for you.
    </p>

    {/* Badges */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: easeCurve }}
      className="mt-6 flex flex-wrap justify-center gap-2"
    >
      {trustBadges.map((badge) => (
        <span
          key={badge.text}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-md sm:text-xs"
        >
          <span className="text-[#ff4500]">{badge.icon}</span>
          {badge.text}
        </span>
      ))}
    </motion.div>

    {/* Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.65, ease: easeCurve }}
      className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
    >
      <Link
        href="/services"
        className="shimmer-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#ff4500] px-8 py-3.5 text-sm font-bold text-white shadow-[0_20px_45px_rgba(255,69,0,0.3)]"
      >
        Book A Rental
      </Link>

  <div className="flex items-center gap-3">
  
  {/* Main Button */}
  <Link
    href="/about-us"
    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black shadow-md transition-all hover:bg-white/90"
  >
    Learn More
  </Link>

  {/* Separate Arrow Button */}
  <Link
    href="/about-us"
    className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-white/90"
  >
    <FiArrowUpRight className="text-lg text-black transition-transform duration-300 group-hover:rotate-45" />
  </Link>

</div>
    </motion.div>

  </div>
</div>
          </div>

          <QuickBookingForm easeCurve={easeCurve} />
        </section>
      </main>

      <AboutSection />
      <BrandMarquee/>
      <OurFleetsSection />
      <CategorySection />
         <CtaBannerSection />
          <LahoreServiceMap />
             <HowItWorksSection />
      <OurServicesSection />




     <div className="mx-auto mt-16  text-center">
       <FaqSection />
     </div>
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
          <span className="text-2xl font-bold">{"✦"}</span>
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
