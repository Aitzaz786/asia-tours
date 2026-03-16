"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const gridPattern = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 14 14 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 6h6v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CtaBannerSection() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="relative mx-4 sm:mx-6 lg:mx-10 xl:mx-16">
        <span
          className="absolute left-1/2 top-0 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4500]"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: easeCurve }}
          className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] px-8 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14 xl:px-16 xl:py-16"
          style={gridPattern}
        >
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,540px)] lg:gap-6 xl:gap-10">
            <div className="relative z-10 max-w-xl">
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: easeCurve }}
                className="about-serif-font max-w-md text-3xl leading-[1.02] font-bold italic text-white sm:text-4xl lg:text-[3.4rem]"
              >
                <span className="block">Ready to hit the road?</span>
                <span className="block">Book</span>
                <span className="block">your car today !</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.4, ease: easeCurve }}
                className="mt-5 max-w-md text-sm leading-7 text-gray-400 sm:text-base"
              >
                Our friendly customer service team is here to help. Contact us anytime for support and inquiries.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.5, ease: easeCurve }}
                className="mt-8 inline-flex items-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact-us"
                    className="rounded-full bg-[#ff4500] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff6a33] sm:text-base"
                  >
                    Contact Us
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.15, rotate: 45 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href="/contact-us"
                    aria-label="Contact us"
                    className="-ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4500] text-white transition-colors hover:bg-[#ff6a33]"
                  >
                    <ArrowUpRight />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.3, ease: easeCurve }}
              className="relative flex min-h-56 items-center justify-center lg:min-h-80 lg:justify-end"
            >
              <Image
                src="/cta/white-sedan.svg"
                alt="White luxury sedan facing left"
                width={900}
                height={380}
                className="h-auto w-full max-w-155 object-contain lg:translate-x-10 xl:translate-x-14"
                sizes="(max-width: 1024px) 90vw, 620px"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}