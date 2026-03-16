"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Feature = {
  title: string;
  description: string;
  icon: "fleet" | "support" | "location" | "safety";
};

const featureDescription =
  "Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex Euismod Eu. Phasellus Hendrerit, Massa";

const leftFeatures: Feature[] = [
  {
    title: "Extensive Fleet Options",
    description: featureDescription,
    icon: "fleet",
  },
  {
    title: "Exceptional Customer Service",
    description: featureDescription,
    icon: "support",
  },
];

const rightFeatures: Feature[] = [
  {
    title: "Convenient Locations",
    description: featureDescription,
    icon: "location",
  },
  {
    title: "Reliability And Safety",
    description: featureDescription,
    icon: "safety",
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

function FeatureCard({ feature, accentDot = false }: { feature: Feature; accentDot?: boolean }) {
  return (
    <article className="relative border-b border-gray-200 pb-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFE8E0] text-[#111111]">
          <FeatureIcon type={feature.icon} />
        </div>

        <div className="max-w-xs">
          <h3 className="text-lg font-semibold leading-7 text-black">{feature.title}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-500">{feature.description}</p>
        </div>
      </div>

      {accentDot ? <span className="absolute -bottom-1 right-1 h-3 w-3 rounded-full bg-[#ff4500]" aria-hidden="true" /> : null}
    </article>
  );
}

export default function WhyChooseUsSection() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const leftCards = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const rightCards = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <span className="absolute left-1/2 top-12 h-3 w-3 -translate-x-1/2 rounded-full bg-[#ff4500]" aria-hidden="true" />
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
            <span className="text-xs">✳</span>
            <span>Why Choose Us</span>
          </p>

          <h2 className="about-serif-font mx-auto mt-4 max-w-2xl text-4xl font-bold leading-[1.06] text-black sm:text-[2.8rem] lg:text-[3.35rem]">
            Unmatched quality and service for your needs
          </h2>
        </motion.div>

        <div className="mt-14 hidden items-center gap-10 xl:grid xl:grid-cols-[1fr_520px_1fr]">
          <motion.div
            variants={leftCards}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col justify-center gap-12"
          >
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
            className="relative mx-auto w-full max-w-130"
          >
            <div className="relative h-155 overflow-hidden rounded-t-[260px] rounded-b-[40px] border border-gray-100 bg-[#f8f8f8]">
              <Image
                src="/why-choose/city-skyline.svg"
                alt="City skyline at sunset"
                fill
                className="object-cover object-center"
                sizes="520px"
              />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-white/95 via-white/35 to-transparent" aria-hidden="true" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeCurve }}
            >
              <Image
                src="/why-choose/red-audi.svg"
                alt="Red sports car"
                width={500}
                height={190}
                className="pointer-events-none absolute -bottom-7 left-1/2 z-10 w-[92%] max-w-125 -translate-x-1/2"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={rightCards}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col justify-center gap-12"
          >
            {rightFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeCurve } },
                }}
              >
                <FeatureCard feature={feature} accentDot={index === 1} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-14 xl:hidden">
          <div className="relative mx-auto w-full max-w-115">
            <div className="relative h-130 overflow-hidden rounded-t-[220px] rounded-b-4xl border border-gray-100 bg-[#f8f8f8] sm:h-140">
              <Image
                src="/why-choose/city-skyline.svg"
                alt="City skyline at sunset"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 90vw, 460px"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white/95 via-white/35 to-transparent" aria-hidden="true" />
            </div>

            <Image
              src="/why-choose/red-audi.svg"
              alt="Red sports car"
              width={460}
              height={175}
              className="pointer-events-none absolute -bottom-6 left-1/2 z-10 w-[94%] max-w-115 -translate-x-1/2"
            />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {tabletFeatures.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} accentDot={index === tabletFeatures.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}