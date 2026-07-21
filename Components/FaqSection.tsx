"use client";

import { useState } from "react";
import { SECTION_CARD_Y, SECTION_INSET_X, SECTION_Y } from "@/lib/sectionSpacing";

const faqs = [
  "What Do I Need To Rent A Car?",
  "How Old Do I Need To Be To Rent A Car?",
  "Can I Rent A Car With A Debit Card?",
];

const answerText =
  "To rent a car, you typically need a valid driving license, CNIC or passport, and a security deposit. Requirements may vary based on the vehicle and rental duration.";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`how-it-works-chevron h-5 w-5 text-[#D4AF37] ${open ? "is-open" : ""}`}
      fill="none"
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

export default function FaqSection({ compact = false }: { compact?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className={`${SECTION_INSET_X} ${SECTION_Y}`}>
      <section
        className={`how-it-works-section faq-section relative mx-auto max-w-[1800px] overflow-hidden rounded-[28px] bg-[#0A0A0A] px-5 sm:rounded-[36px] sm:px-8 lg:px-12 ${
          compact ? SECTION_CARD_Y : "py-14 sm:py-16 lg:py-20"
        }`}
      >
        {/* Soft gold look WITHOUT live blur under accordion (blur was causing open/close lag) */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(212, 175, 55, 0.14) 0%, transparent 42%), radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.10) 0%, transparent 46%), linear-gradient(135deg, #0A0A0A 0%, #1A1508 100%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              <span className="text-xs leading-none" aria-hidden="true">
                {"\u2733"}
              </span>
              <span>Frequently Asked Questions</span>
            </p>
            <h2 className="about-serif-font mx-auto mt-4 max-w-xl text-4xl font-bold leading-[1.06] text-white sm:text-[2.85rem] lg:text-[3.35rem]">
              Everything you need to know
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/45">
              Clear answers to help you rent with confidence and ease.
            </p>
          </div>

          <div className="mt-14 space-y-3 sm:space-y-4">
            {faqs.map((question, index) => {
              const open = openIndex === index;
              return (
                <div
                  key={question}
                  className="faq-item rounded-[28px] border border-[rgba(212,175,55,0.2)] bg-[#12100c] shadow-[inset_0_1px_0_rgba(212,175,55,0.08)] md:hover:border-[rgba(212,175,55,0.45)]"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6 sm:py-5"
                    aria-expanded={open}
                  >
                    <span className="text-base font-medium text-white sm:text-lg">{question}</span>
                    <span className="ml-4 shrink-0">
                      <Chevron open={open} />
                    </span>
                  </button>

                  {/* Same classes/CSS as How It Works */}
                  <div
                    className={`how-it-works-panel ${open ? "is-open" : ""}`}
                    aria-hidden={!open}
                  >
                    <div className="how-it-works-panel__inner">
                      <p className="px-5 pb-4 text-sm leading-relaxed text-white/50 sm:px-6 sm:pb-5 sm:text-base">
                        {answerText}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
