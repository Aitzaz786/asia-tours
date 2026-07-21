"use client";

import Image from "next/image";
import { useState } from "react";

const steps = [
  {
    number: "1",
    title: "Browse And Select",
    content:
      "Explore our diverse selection of high-end vehicles, choose your preferred pickup and return dates, and select a location that best fits your needs",
  },
  {
    number: "2",
    title: "Book And Confirm",
    content:
      "Complete your reservation with our secure booking system, receive instant confirmation, and get all the details you need for a smooth pickup experience",
  },
  {
    number: "3",
    title: "Book And Enjoy",
    content:
      "Pick up your vehicle at the scheduled time, hit the road with confidence, and enjoy a premium driving experience throughout your rental period",
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`how-it-works-chevron ${open ? "is-open" : ""}`}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HowItWorksSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section className="how-it-works-section relative overflow-x-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-[4.5rem]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37] lg:justify-start">
            <span className="text-xs leading-none" aria-hidden="true">
              {"\u2733"}
            </span>
            <span>How It Work</span>
          </p>

          <h2 className="about-serif-font mx-auto mt-4 max-w-xl text-4xl font-bold leading-[1.06] text-[#0f0e0c] sm:text-[2.85rem] lg:mx-0 lg:max-w-lg lg:text-[3.35rem]">
            Streamlined processes for a hassle-free experience
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#6b6560] lg:mx-0 lg:max-w-lg">
            Our streamlined process ensures a seamless car rental experience from start to finish.
            With easy online booking, flexible pick-up and drop-off options.
          </p>

          <div className="relative mt-10 text-left">
            <div
              className="absolute left-4 top-5 h-[calc(100%-2.5rem)] border-l border-dashed border-[#D4AF37]/60"
              aria-hidden="true"
            />
            {steps.map((step, i) => {
              const open = openIndex === i;
              return (
                <div key={step.number} className="border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="flex w-full items-center gap-4 py-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="relative z-10 flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-bold text-[#0A0A0A]">
                      {step.number}
                    </span>
                    <span className="flex-1 text-lg font-semibold text-black">{step.title}</span>
                    <span className="text-black">
                      <Chevron open={open} />
                    </span>
                  </button>

                  <div
                    className={`how-it-works-panel ${open ? "is-open" : ""}`}
                    aria-hidden={!open}
                  >
                    <div className="how-it-works-panel__inner">
                      <div className="ml-4 border-l-2 border-[#D4AF37] pb-5 pl-7 pr-4 pt-1">
                        <p className="text-sm leading-6 text-gray-500">{step.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto w-full">
          <div className="overflow-hidden rounded-[28px] border border-gray-200 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:rounded-[40px] lg:rounded-[60px]">
            <div className="relative aspect-[1.12/1] w-full">
              <Image
                src="/how to work.webp"
                alt="Client stepping out of a premium rental vehicle"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ transform: "scale(1.3)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
