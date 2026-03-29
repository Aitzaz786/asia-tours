"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Feature = {
  title: string;
  description: string;
  icon: "fleet" | "support" | "location" | "safety";
  number: string;
};

const featureDescription =
  "Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex Euismod Eu. Phasellus Hendrerit, Massa";

const leftFeatures: Feature[] = [
  {
    title: "Extensive Fleet Options",
    description: featureDescription,
    icon: "fleet",
    number: "01",
  },
  {
    title: "Exceptional Customer Service",
    description: featureDescription,
    icon: "support",
    number: "02",
  },
];

const rightFeatures: Feature[] = [
  {
    title: "Convenient Locations",
    description: featureDescription,
    icon: "location",
    number: "03",
  },
  {
    title: "Reliability And Safety",
    description: featureDescription,
    icon: "safety",
    number: "04",
  },
];

const tabletFeatures = [...leftFeatures, ...rightFeatures];

function DotPattern() {
  const filledDots = new Set([1, 6, 11]);

  return (
    <div className="grid grid-cols-4 gap-3" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <span
          key={index}
          className={filledDots.has(index) ? "h-3 w-3 rounded-full bg-[#ff4500]" : "h-3 w-3 rounded-full border border-gray-300 bg-transparent"}
        />
      ))}
    </div>
  );
}

function FeatureIcon({ type }: { type: Feature["icon"] }) {
  if (type === "fleet") {
    return (
      <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="15" cy="15" r="5" />
        <path d="M8 28c1.8-4.6 5-7 7-7 2.2 0 5.1 2.4 7 7" />
        <path d="M18 31h13l3-8H22l-4 8Z" />
        <circle cx="24" cy="34" r="2.5" />
        <circle cx="34" cy="34" r="2.5" />
        <path d="M22 23l2-4h7l3 4" />
      </svg>
    );
  }

  if (type === "support") {
    return (
      <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="24" cy="16" r="6" />
        <path d="M15 31c2.2-4.7 5.8-7 9-7s6.8 2.3 9 7" />
        <path d="M14 18a10 10 0 0 1 20 0" />
        <path d="M12 24v5c0 2.2 1.8 4 4 4h2v-9h-2c-2.2 0-4 1.8-4 4Z" />
        <path d="M36 24v5c0 2.2-1.8 4-4 4h-2v-9h2c2.2 0 4 1.8 4 4Z" />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M24 39s10-8.8 10-18a10 10 0 1 0-20 0c0 9.2 10 18 10 18Z" />
        <circle cx="24" cy="20" r="3.5" />
        <path d="M34 35h6" />
        <path d="M37 32v6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 8l12 5v10c0 8-5.2 13.5-12 17-6.8-3.5-12-9-12-17V13l12-5Z" />
      <path d="m19 24 3.5 3.5L29 21" />
    </svg>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const iconBgClass =
    feature.icon === "fleet"
      ? "bg-orange-50"
      : feature.icon === "support"
        ? "bg-blue-50"
        : feature.icon === "location"
          ? "bg-green-50"
          : "bg-purple-50";

  return (
    <article className="group relative border-b border-gray-200 pl-0 pb-8 transition-all duration-300 hover:-translate-x-1 hover:border-l-[3px] hover:border-l-[#ff4500] hover:pl-4">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBgClass} text-[#111111]`}>
          <FeatureIcon type={feature.icon} />
        </div>

        <div className="max-w-xs">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#ff4500]">
            {feature.number}
          </p>
          <h3 className="text-lg font-semibold leading-7 text-black">{feature.title}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-500">{feature.description}</p>
        </div>
      </div>
    </article>
  );
}

function CurvedConnector() {
  return (
    <svg
      viewBox="0 0 300 280"
      className="pointer-events-none absolute -right-24 top-10 hidden h-[280px] w-[300px] xl:block"
      aria-hidden="true"
    >
      <path
        d="M10 20C120 20 155 95 200 135C235 165 255 175 290 180"
        fill="none"
        stroke="#ff4500"
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeLinecap="round"
      />
      <path
        d="M10 170C125 170 150 145 195 120C228 102 250 98 290 100"
        fill="none"
        stroke="#ff4500"
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export default function WhyChooseUsSection() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
      className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-[4.5rem]"
      style={{
        backgroundImage: "repeating-linear-gradient(135deg, rgba(243,244,246,0.85) 0, rgba(243,244,246,0.85) 1px, transparent 1px, transparent 16px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.5, ease: easeCurve }}
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 md:block lg:left-8"
        aria-hidden="true"
      >
        <DotPattern />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.55, ease: easeCurve }}
        className="absolute bottom-12 right-4 hidden md:block lg:right-10"
        aria-hidden="true"
      >
        <DotPattern />
      </motion.div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeCurve }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff4500]">
            <span className="text-xs">{"\u2733"}</span>
            <span>Why Choose Us</span>
          </p>

          <h2 className="about-serif-font mx-auto mt-4 max-w-2xl text-4xl font-bold leading-[1.06] text-black sm:text-[2.8rem] lg:text-[3.35rem]">
            Unmatched quality and service for your needs
          </h2>
        </motion.div>

        <div className="mt-10 hidden items-center gap-10 xl:grid xl:grid-cols-[1fr_520px_1fr]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative flex flex-col justify-center gap-12"
          >
            <CurvedConnector />
            {leftFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeCurve } },
                }}
              >
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeCurve }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="relative h-[520px] overflow-hidden rounded-t-[130px] rounded-b-[40px] border border-gray-100 bg-[#f8f8f8]">
              <Image
                src="/range-rover-vogue-01.webp"
                alt="Luxury Range Rover parked in an urban setting"
                fill
                className="object-cover object-center"
                sizes="520px"
              />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-white/95 via-white/35 to-transparent" aria-hidden="true" />
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col justify-center gap-12"
          >
            {rightFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeCurve } },
                }}
              >
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-14 xl:hidden">
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="relative h-[420px] overflow-hidden rounded-t-[160px] rounded-b-[32px] border border-gray-100 bg-[#f8f8f8] sm:h-[500px]">
              <Image
                src="/range-rover-vogue-01.webp"
                alt="Luxury Range Rover parked in an urban setting"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white/95 via-white/35 to-transparent" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {tabletFeatures.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
