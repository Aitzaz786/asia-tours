"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { SECTION_Y } from "@/lib/sectionSpacing";

type ServiceCard = {
  title: string;
  description: string;
  icon: "driver" | "business" | "airport" | "chauffeur";
  category: "Premium" | "Corporate" | "Transfer" | "VIP";
  number: string;
  href: string;
};

const cards: ServiceCard[] = [
  {
    title: "Car Rental With Driver",
    description: "Enhance your rental experience with additional options.",
    icon: "driver",
    category: "Premium",
    number: "01",
    href: "/services/chauffeur-service",
  },
  {
    title: "Business Car Rental",
    description: "Enhance your rental experience with additional options.",
    icon: "business",
    category: "Corporate",
    number: "02",
    href: "/services/corporate-tours",
  },
  {
    title: "Airport Transfer",
    description: "Enhance your rental experience with additional options.",
    icon: "airport",
    category: "Transfer",
    number: "03",
    href: "/services/airport-transfer",
  },
  {
    title: "Chauffeur Services",
    description: "Enhance your rental experience with additional options.",
    icon: "chauffeur",
    category: "VIP",
    number: "04",
    href: "/services/chauffeur-service",
  },
];

function ServiceIcon({ type }: { type: ServiceCard["icon"] }) {
  if (type === "driver") {
    return (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="6" y="20" width="30" height="12" rx="3" />
        <path d="M11 20l4-6h13l4 6" />
        <circle cx="13" cy="33" r="3" />
        <circle cx="29" cy="33" r="3" />
        <path d="M38 12l2 2 4-4" />
      </svg>
    );
  }

  if (type === "business") {
    return (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="8" y="14" width="32" height="22" rx="3" />
        <path d="M18 14v-3h12v3" />
        <path d="M8 23h32" />
        <path d="M22 27h4" />
      </svg>
    );
  }

  if (type === "airport") {
    return (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="6" y="24" width="24" height="10" rx="3" />
        <path d="M10 24l3-5h10l3 5" />
        <circle cx="12" cy="35" r="2.5" />
        <circle cx="24" cy="35" r="2.5" />
        <path d="M34 12l8 4-8 4 3-4-3-4z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="12" r="4" />
      <path d="M16 23c2-3 4-5 8-5s6 2 8 5" />
      <rect x="8" y="24" width="32" height="12" rx="4" />
      <path d="M16 24v-5M32 24v-5" />
    </svg>
  );
}

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
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {cards.map((card) => (
            <Link key={card.title} href={card.href} className="block h-full">
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative flex h-96 overflow-hidden rounded-2xl border border-brand-soft bg-white p-6"
              >
                <span className="absolute right-4 top-3 z-0 text-[80px] font-black leading-none text-gray-100 transition-colors duration-300 group-hover:text-white/20">
                  {card.number}
                </span>
                <span className="absolute left-1/2 bottom-0 z-0 h-[220%] w-[220%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-[#D4AF37] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center border border-[#eadfc8] bg-[#FFFBF0] text-[#111111] transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/15 group-hover:text-white">
                    <ServiceIcon type={card.icon} />
                  </div>

                  <div className="mb-6 h-px w-full bg-[#eadfc8] transition-colors duration-300 group-hover:bg-white/25" />

                  <h3 className="text-xl font-bold leading-7 text-black transition-colors duration-300 group-hover:text-white">
                    {card.title}
                  </h3>

                  <span className="mt-3 inline-flex w-fit rounded-full bg-brand-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white">
                    {card.category}
                  </span>

                  <p className="mt-4 text-sm leading-6 text-gray-500 transition-colors duration-300 group-hover:text-white/90">
                    {card.description}
                  </p>

                  <span className="mt-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37] text-2xl text-[#0A0A0A] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#0A0A0A] group-hover:text-[#D4AF37]">
                    <FiArrowUpRight />
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
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
