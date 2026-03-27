"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiClipboard, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

const features = [
  {
    Icon: FiClipboard,
    title: "Easy Booking Process",
    desc: "We streamline inquiries, confirmations, and trip planning so your experience feels smooth from the first message to the final drop-off.",
  },
  {
    Icon: FiMapPin,
    title: "Convenient Pick-Up & Return",
    desc: "Flexible locations and reliable coordination help you start and finish every trip without unnecessary delays or confusion.",
  },
];

export default function AboutSection() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeCurve }}
            className="overflow-hidden rounded-[28px] border border-gray-200 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:rounded-[40px] lg:rounded-[60px]"
          >
            <div className="relative aspect-[1.12/1] w-full">
              <Image
                src="/about 1.jpg"
                alt="Client stepping out of a premium rental vehicle"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: easeCurve }}
            className="mb-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#ff4500]"
          >
            <span className="text-[19px] font-black leading-none">{"\u2733"}</span>
            <span>About Us</span>
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeCurve }}
            className="about-serif-font text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            Your trusted partner in reliable car rental
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeCurve }}
            className="mt-4 max-w-xl text-base leading-7 text-gray-500"
          >
            Asia Tours brings together premium vehicles, refined service, and dependable travel support for business trips, family journeys, airport transfers, and special occasions.
          </motion.p>

          <div className="mt-8">
            {features.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: easeCurve }}
              >
                <div className="flex items-start gap-4 py-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                    <Icon className="text-xl text-[#ff4500]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-500">{desc}</p>
                  </div>
                </div>
                {i < features.length - 1 && <hr className="border-gray-100" />}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.35, ease: easeCurve }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/about-us"
              className="inline-flex items-center justify-center rounded-full bg-[#ff4500] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e53d00]"
            >
              Learn More
            </Link>
            <Link
              href="/about-us"
              aria-label="Go to about us"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#ff4500] text-white transition-colors hover:bg-[#e53d00]"
            >
              <FiArrowUpRight className="text-lg" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
