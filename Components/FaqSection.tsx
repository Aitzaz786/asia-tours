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

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-4 rounded-3xl bg-[#FFF5F2] px-4 py-16 sm:mx-6 sm:px-8 sm:py-20 lg:mx-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-18">
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
            className="relative order-1 mx-auto h-105 w-full max-w-140 sm:h-125 lg:order-0 lg:h-140"
          >
            <span className="absolute left-[58%] top-3 z-20 h-3 w-3 rounded-full bg-[#ff4500]" aria-hidden="true" />

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 26, x: -20 },
                visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, ease: easeCurve } },
              }}
              className="absolute bottom-3 left-1 w-55 overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.08)] max-sm:left-1/2 max-sm:w-52.5 max-sm:-translate-x-[58%] sm:w-62.5 sm:-rotate-6"
            >
              <Image
                src="/faq/city-cranes.svg"
                alt="City skyline with cranes at sunset"
                width={250}
                height={320}
                className="h-auto w-full"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 26, x: 20 },
                visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.7, ease: easeCurve } },
              }}
              className="absolute bottom-10 right-0 w-55 overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.08)] max-sm:right-1/2 max-sm:w-52.5 max-sm:translate-x-[58%] sm:w-62.5 sm:rotate-6"
            >
              <Image
                src="/faq/city-plaza.svg"
                alt="Modern city plaza with geometric flooring"
                width={250}
                height={320}
                className="h-auto w-full"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeCurve } },
              }}
            >
              <Image
                src="/faq/black-sedan.svg"
                alt="Black luxury sedan"
                width={520}
                height={220}
                className="pointer-events-none absolute bottom-20 left-1/2 z-10 w-[92%] max-w-125 -translate-x-1/2 object-contain max-sm:bottom-24 max-sm:w-full"
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
              <span className="text-xs">✳</span>
              <span>Frequently Asked Questions</span>
            </p>

            <h2 className="about-serif-font mt-4 max-w-md text-3xl font-bold leading-[1.08] text-black sm:text-4xl lg:text-[2.9rem]">
              Everything you need to know about our services
            </h2>

            <div className="mt-8 border-t border-transparent">
              {faqs.map((question, index) => {
                const open = openIndex === index;

                return (
                  <div key={question} className="border-b border-gray-200">
                    <motion.button
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-base font-semibold leading-7 text-black sm:text-lg">{question}</span>
                      <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <Chevron />
                      </motion.span>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}