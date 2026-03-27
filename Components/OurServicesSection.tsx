"use client";

import { motion } from "framer-motion";

type ServiceCard = {
  title: string;
  description: string;
  icon: "driver" | "business" | "airport" | "chauffeur";
  category: "Premium" | "Corporate" | "Transfer" | "VIP";
  number: string;
};

const cards: ServiceCard[] = [
  {
    title: "Car Rental With Driver",
    description: "Enhance your rental experience with additional options.",
    icon: "driver",
    category: "Premium",
    number: "01",
  },
  {
    title: "Business Car Rental",
    description: "Enhance your rental experience with additional options.",
    icon: "business",
    category: "Corporate",
    number: "02",
  },
  {
    title: "Airport Transfer",
    description: "Enhance your rental experience with additional options.",
    icon: "airport",
    category: "Transfer",
    number: "03",
  },
  {
    title: "Chauffeur Services",
    description: "Enhance your rental experience with additional options.",
    icon: "chauffeur",
    category: "VIP",
    number: "04",
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
    <section
      className="relative overflow-hidden bg-[#FFF5F2] px-4 py-20 sm:px-8 lg:py-24"
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255, 69, 0, 0.12) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeCurve }}
          className="text-center"
        >
          <p className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#ff4500]">
            <span className="text-sm">{"\u2733"}</span>
            <span>Our Services</span>
          </p>

          <h2 className="about-serif-font mx-auto mt-4 max-w-2xl text-4xl font-bold leading-tight text-black sm:text-5xl">
            Explore our wide range of rental services
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {cards.map((card) => (
            <motion.article
              key={card.title}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative flex h-96 overflow-hidden rounded-2xl border border-orange-100 bg-white p-6"
            >
              <span className="absolute right-4 top-3 z-0 text-[80px] font-black leading-none text-gray-100 transition-colors duration-300 group-hover:text-white/20">
                {card.number}
              </span>
              <span className="absolute left-1/2 bottom-0 z-0 h-[220%] w-[220%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-[#fe4700] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center border border-[#f2d7ca] bg-[#FFF8F4] text-[#111111] transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white">
                  <ServiceIcon type={card.icon} />
                </div>

                <div className="mb-6 h-px w-full bg-[#f1ddd4] transition-colors duration-300 group-hover:bg-white/20" />

                <h3 className="text-xl font-bold leading-7 text-black transition-colors duration-300 group-hover:text-white">
                  {card.title}
                </h3>

                <span className="mt-3 inline-flex w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-orange-500 transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white">
                  {card.category}
                </span>

                <p className="mt-4 text-sm leading-6 text-gray-500 transition-colors duration-300 group-hover:text-white">
                  {card.description}
                </p>

                <motion.button
                  aria-label={`${card.title} details`}
                  whileTap={{ scale: 0.9 }}
                  className="mt-auto inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#ff4500] text-2xl text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-black group-hover:text-white"
                >
                  {"\u2197"}
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeCurve }}
          className="mx-auto mt-12 max-w-2xl text-center"
        >
          <p className="text-sm leading-7 text-gray-500 sm:text-base">
            Discover our range of car rental services designed to meet all your travel needs. From a diverse fleet of vehicles to flexible rental plans.
          </p>

          <div className="mt-7 inline-flex items-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="cursor-pointer rounded-full bg-[#ff4500] px-7 py-3 text-sm font-semibold text-white">
              View All Service
            </motion.button>
            <motion.button
              aria-label="View all services"
              whileHover={{ scale: 1.15, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              className="ml-2 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#ff4500] text-white hover:bg-[black]"
            >
              {"\u2197"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
