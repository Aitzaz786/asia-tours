"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  "What Do I Need To Rent A Car?",
  "How Old Do I Need To Be To Rent A Car?",
  "Can I Rent A Car With A Debit Card?",
];

const answerText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";

function Chevron() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5 text-black"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5 text-black"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24 sm:py-14">
      <div className="grain-overlay-card relative mx-4 overflow-hidden rounded-3xl bg-[#FFF5F2] px-4 py-16 sm:mx-6 sm:px-8 sm:py-20 lg:mx-8 lg:px-10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-18">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.16,
                },
              },
            }}
            className="relative order-1 mx-auto grid w-full max-w-[760px] grid-cols-1 gap-3 sm:grid-cols-2 lg:order-0"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 26, x: -20 },
                visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, ease: easeCurve } },
              }}
              className="overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
            >
              <Image
                src="/range-rover-vogue-01.webp"
                alt="Luxury SUV parked outside a premium destination"
                width={400}
                height={192}
                className="h-48 w-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 26, x: 20 },
                visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, ease: easeCurve } },
              }}
              className="overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
            >
              <Image
                src="/exterior-image-164.avif"
                alt="Premium sedan exterior in a polished urban setting"
                width={400}
                height={192}
                className="h-48 w-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 26, x: 20 },
                visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, ease: easeCurve } },
              }}
              className="overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
            >
              <Image
                src="/images.jpg"
                alt="Luxury vehicle front grille and headlights"
                width={400}
                height={192}
                className="h-48 w-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 26, x: -20 },
                visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, ease: easeCurve } },
              }}
              className="overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
            >
              <Image
                src="/white-luxury-sedan-2024-bmw-600nw-2499645683.webp"
                alt="White executive sedan ready for booking"
                width={400}
                height={192}
                className="h-48 w-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeCurve }}
          >
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#ff4500]">
              <span className="text-xs">{"\u2733"}</span>
              <span>Frequently Asked Questions</span>
            </p>

            <h2 className="about-serif-font mt-4 max-w-md text-3xl font-bold leading-[1.08] text-black sm:text-4xl lg:text-[2.9rem]">
              Everything you need to know about our services
            </h2>

            <div className="mt-8 border-t border-transparent">
              {faqs.map((question, index) => {
                const open = openIndex === index;

                return (
                  <div
                    key={question}
                    className={`border-b border-gray-200 transition-all duration-300 ${open ? "border-l-2 border-l-[#ff4500] bg-orange-50 pl-4" : ""}`}
                  >
                    <motion.button
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="pt-0.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff4500]">
                          Q{index + 1}
                        </span>
                        <span className="text-base font-semibold leading-7 text-black sm:text-lg">{question}</span>
                      </div>
                      <span>{open ? <XIcon /> : <Chevron />}</span>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: easeCurve }}
                          style={{ overflow: "hidden" }}
                        >
                          <p className="pb-6 pr-8 pt-2 text-sm leading-7 text-gray-500 sm:text-base">{answerText}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <a
              href="/contact-us"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#ff4500] transition-opacity hover:opacity-80"
            >
              <span>Still have questions? Contact us</span>
              <span aria-hidden="true">{"\u2192"}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
