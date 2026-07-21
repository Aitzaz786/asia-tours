"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiClipboard, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";
import { SECTION_Y } from "@/lib/sectionSpacing";

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
    <section className={`bg-white px-4 sm:px-6 lg:px-8 ${SECTION_Y}`}>
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="relative mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeCurve }}
            className="overflow-hidden rounded-[28px] border border-gray-200 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:rounded-[40px] lg:rounded-[60px]"
          >
        <div className="relative aspect-[1.12/1] w-full">
  <div className="absolute inset-0 z-10 rounded-[28px] sm:rounded-[40px] lg:rounded-[60px]"
 style={{
  background: "radial-gradient(circle at top left, rgba(0,0,0,0.2) 0%, transparent 55%)"
}}
  />
  <Image
    src="/about-us.webp"
    alt="Client stepping out of a premium rental vehicle"
    fill
    className="object-cover object-center "
    sizes="(max-width: 1024px) 100vw, 50vw"
    style={{ transform: "scale(1.3)" }}
  />
</div>
            
          </motion.div>
        </div>

        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: easeCurve }}
            className="mb-5 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37] lg:justify-start"
          >
            <span className="text-xs leading-none" aria-hidden="true">{"\u2733"}</span>
            <span>About Us</span>
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeCurve }}
            className="about-serif-font mx-auto max-w-xl text-4xl font-bold leading-[1.06] text-[#0f0e0c] sm:text-[2.85rem] lg:mx-0 lg:text-[3.35rem]"
          >
            Your trusted partner in reliable car rental
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeCurve }}
            className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#6b6560] lg:mx-0"
          >
            Asia Tours brings together premium vehicles, refined service, and dependable travel support for business trips, family journeys, airport transfers, and special occasions.
          </motion.p>

          <div className="mt-8 text-left">
            {features.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: easeCurve }}
              >
                <div className="flex items-start gap-4 py-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-muted">
                    <Icon className="text-xl text-[#D4AF37]" />
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
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              href="/about-us"
              aria-label="Go to about us"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 text-sm font-semibold text-[#0A0A0A] transition-all duration-300 hover:bg-[#B8860B]"
            >
              Learn More
              <span className="flex h-11 w-5 items-center justify-center rounded-full transition-transform duration-300 md:group-hover:rotate-45 md:group-hover:scale-105">
                <FiArrowRight className="text-[19px] md:hidden" />
                <FiArrowUpRight className="hidden text-[19px] md:block" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
