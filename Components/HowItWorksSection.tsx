"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const steps = [
  {
    number: "1.",
    title: "Browse And Select",
    content:
      "Explore our diverse selection of high-end vehicles, choose your preferred pickup and return dates, and select a location that best fits your needs",
  },
  {
    number: "2.",
    title: "Book And Confirm",
    content:
      "Complete your reservation with our secure booking system, receive instant confirmation, and get all the details you need for a smooth pickup experience",
  },
  {
    number: "3.",
    title: "Book And Enjoy",
    content:
      "Pick up your vehicle at the scheduled time, hit the road with confidence, and enjoy a premium driving experience throughout your rental period",
  },
];

function Chevron() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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

function FourPointStar({ className }: { className?: string }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 0C18 0 21 14 18 18C14 21 0 18 0 18C0 18 14 15 18 18C21 14 18 0 18 0ZM18 36C18 36 15 22 18 18C22 15 36 18 36 18C36 18 22 21 18 18C15 22 18 36 18 36Z" />
    </svg>
  );
}

export default function HowItWorksSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="relative bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid  max-w-[1600px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeCurve }}
        >
          <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase text-[#ff4500]">
            <span className="text-xs">✳</span>
            <span>How It Work</span>
          </p>

          <h2 className="about-serif-font mt-4 max-w-lg text-4xl font-bold leading-[1.1] text-black sm:text-[2.7rem] lg:text-[3.15rem]">
            Streamlined processes for a hassle-free experience
          </h2>

          <p className="mt-5 max-w-lg text-base leading-7 text-gray-500">
            Our streamlined process ensures a seamless car rental experience
            from start to finish. With easy online booking, flexible pick-up and
            drop-off options.
          </p>

          {/* Accordion */}
          <div className="mt-10">
            {steps.map((step, i) => (
              <div key={step.number} className="border-b border-gray-200">
                <motion.button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-4 py-5 text-left"
                  aria-expanded={openIndex === i}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="min-w-7 text-lg text-gray-400">
                    {step.number}
                  </span>
                  <span className="flex-1 text-lg font-semibold text-black">
                    {step.title}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-black"
                  >
                    <Chevron />
                  </motion.span>
                </motion.button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: easeCurve }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="pb-5 pl-11 pr-4 pt-2 text-sm leading-6 text-gray-500">
                        {step.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: easeCurve }}
          className="relative flex justify-center lg:justify-end"
        >

          {/* Main image container */}
          <div className="relative w-full max-w-[1500px]">
  

            {/* Pill-shaped image */}
            <div className="relative h-130 w-full overflow-hidden rounded-[60px] border border-gray-100 sm:h-145 lg:h-155">
              <Image
                src="/how-it-work1.webp"
                alt="Stylish woman with sunglasses and beret sitting in driver seat"
                fill
                className="object-cover"
             
              />
            </div>

          
          </div>
        </motion.div>
      </div>
    </section>
  );
}
