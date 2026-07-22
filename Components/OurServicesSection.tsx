"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { SECTION_Y } from "@/lib/sectionSpacing";
import ServiceCardsGrid from "@/Components/ServiceCardsGrid";

export default function OurServicesSection() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  return (
    <section className={`relative overflow-hidden bg-[#EFEBE3] px-4 sm:px-8 ${SECTION_Y}`}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeCurve }}
          className="text-center"
        >
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
            <span className="text-xs leading-none" aria-hidden="true">
              {"\u2733"}
            </span>
            <span>Our Services</span>
          </p>

          <h2 className="about-serif-font mx-auto mt-4 max-w-2xl text-4xl font-bold leading-[1.06] text-[#0f0e0c] sm:text-[2.85rem] lg:text-[3.35rem]">
            Explore our wide range of rental services
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10"
        >
          <ServiceCardsGrid />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeCurve }}
          className="mx-auto mt-10 max-w-2xl text-center"
        >
          <p className="text-sm leading-7 text-gray-500 sm:text-base">
            Discover our range of car rental services designed to meet all your travel needs. From a
            diverse fleet of vehicles to flexible rental plans.
          </p>

          <div className="mt-7 inline-flex items-center">
            <Link
              href="/services"
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all duration-300 hover:bg-[#B8860B]"
            >
              <span>View All Service</span>
              <FiArrowRight className="text-[18px] sm:hidden" />
              <FiArrowUpRight className="hidden text-[18px] transition-transform duration-300 group-hover:rotate-45 sm:block" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
