"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  "What Do I Need To Rent A Car?",
  "How Old Do I Need To Be To Rent A Car?",
  "Can I Rent A Car With A Debit Card?",
];

const answerText =
  "To rent a car, you typically need a valid driving license, CNIC or passport, and a security deposit. Requirements may vary based on the vehicle and rental duration.";

function Chevron() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 text-white" fill="none">
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <main className="px-3 sm:px-5 lg:px-7 pb-8 sm:pb-10">
      <section className="relative mx-auto max-w-[1800px] overflow-hidden rounded-[36px] bg-[#050505] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">

        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 opacity-35"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Glow accents */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-[340px] w-[340px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,68,2,0.18), transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-[280px] w-[280px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,68,2,0.10), transparent 70%)" }} />

        <div className="relative z-10 mx-auto max-w-6xl">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center mx-auto max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#ff4500] font-semibold">
              ✳ Frequently Asked Questions
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Everything you need to know
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
              Clear answers to help you rent with confidence and ease.
            </p>
          </motion.div>

          {/* FAQ Cards */}
          <div className="mt-14 space-y-4">
            {faqs.map((question, index) => {
              const open = openIndex === index;
              return (
                <motion.div
                  key={question}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[28px] border border-white/8 bg-white/4 backdrop-blur-xl hover:border-[#ff4500]/40 transition-all duration-300"
                >
                  {/* Question */}
                  <button
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="text-base sm:text-lg font-medium text-white">
                      {question}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4"
                    >
                      <Chevron />
                    </motion.span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-gray-400 text-sm sm:text-base leading-relaxed">
                          {answerText}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </main>
  );
}