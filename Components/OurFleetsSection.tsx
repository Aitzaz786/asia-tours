"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaArrowRightLong, FaStar } from "react-icons/fa6";
import { PiAsteriskSimpleFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { fleets } from "@/Data/cars";
import Link from "next/link";


export default function OurFleetsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-PK").format(price);

  const cardsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeCurve },
    },
    rest: { y: 0 },
    hover: { y: -6, transition: { duration: 0.3 } },
  };
const handleScroll = useCallback((direction: "left" | "right") => {
  const container = scrollRef.current;
  if (!container) return;

  const firstCard = container.querySelector<HTMLElement>("[data-fleet-card]");
  const cardWidth = firstCard?.offsetWidth ?? 292;
  const gapWidth = 24;

  container.scrollBy({
    left: direction === "left" ? -(cardWidth + gapWidth) : cardWidth + gapWidth,
    behavior: "smooth",
  });
}, []);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-28">

      <div className="mx-auto max-w-400">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeCurve }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-[0.18em] text-[#ff4500] uppercase">
            <PiAsteriskSimpleFill className="text-xs" aria-hidden="true" />
            <span>Our Fleets</span>
          </p>

          <h2 className="about-serif-font mx-auto mt-4 max-w-xl text-4xl font-bold leading-[1.06] text-black sm:text-[2.85rem] lg:text-[3.35rem]">
            Explore our perfect and extensive fleet
          </h2>
        </motion.div>

        <motion.div
          
          ref={scrollRef}
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
       
     
       
          className=" mx-auto mt-16 flex max-w-[1680px]  justify-start gap-5  pb-4 pl-1 sm:gap-6"
        >
         {fleets.map((fleet, i) => (
<motion.div
  key={i}
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: i * 0.2, duration: 0.8, type: "spring" }}
  viewport={{ once: true }}
  className="group relative flex flex-col min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[23%]
  rounded-3xl overflow-hidden 
  bg-white/60 backdrop-blur-xl border border-white/30 
  hover:border-[#ff4402]/50 
  card-shadow 
  hover:shadow-[0_10px_40px_rgba(255,68,2,0.3)]
  transition-all duration-500 ease-out hover:scale-[1.04]"
>

  {/* Image — single container, no nesting */}
  <div className="relative w-full aspect-[16/10] overflow-hidden">
    <img
      src={fleet.image}
      alt={fleet.imageAlt}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>

  {/* Content */}
  <div className="p-5 text-center">

    {/* Title */}
    <h3 className="text-xl font-bold text-gray-900 mb-1">
      {fleet.name}
    </h3>

    {/* Price */}
    <p className="text-lg font-semibold text-[#ff4402] mb-4">
      PKR {fleet.price} / day
    </p>

    {/* Highlights */}
    <ul className="text-gray-600 text-sm sm:text-base space-y-1">
      {fleet.highlights?.map((h, idx) => (
        <li
          key={idx}
          className="relative before:content-['▹'] before:text-[#ff4402] before:mr-2 before:text-base
          hover:text-gray-900 transition-all duration-300"
        >
          {h.label}: {h.value}
        </li>
      ))}
    </ul>

    {/* Button */}
    <Link href={"#"} className="mt-6 inline-block">
      <button className="relative z-10 mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl 
        bg-gradient-to-r from-[#ff4402] via-[#ff4402] to-[#ff4402] 
        hover:opacity-90
        shadow-lg shadow-[#ff4402]/30 hover:shadow-xl hover:shadow-[#ff4402]/50
        transform hover:scale-105 active:scale-95
        transition-all duration-300 ease-out
        group/btn overflow-hidden">

        <span className="relative z-10">Learn More</span>

        <FaArrowRightLong className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
      </button>
    </Link>

  </div>
</motion.div>
))}
        </motion.div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <motion.button
            type="button"
            aria-label="Scroll fleets left"
            onClick={() => handleScroll("left")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4500] text-white transition-colors hover:bg-[#e53d00]"
          >
            <FiArrowLeft className="text-lg" aria-hidden="true" />
          </motion.button>

          <motion.button
            type="button"
            aria-label="Scroll fleets right"
            onClick={() => handleScroll("right")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4500] text-white transition-colors hover:bg-[#e53d00]"
          >
            <FiArrowRight className="text-lg" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
