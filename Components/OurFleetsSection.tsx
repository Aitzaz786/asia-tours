"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { PiAsteriskSimpleFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { fleets, getFleetSlug } from "@/Data/cars";
import Link from "next/link";

export default function OurFleetsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const formatPrice = (price: number) => new Intl.NumberFormat("en-PK").format(price);
  const loopedFleets = [...fleets, ...fleets];

  const cardsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const getScrollAmount = () => {
    const container = scrollRef.current;
    if (!container) return 316;

    const firstCard = container.querySelector<HTMLElement>("[data-fleet-card]");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 292;
    const computedStyles = window.getComputedStyle(container);
    const gapWidth = Number.parseFloat(computedStyles.columnGap || computedStyles.gap || "24") || 24;

    return cardWidth + gapWidth;
  };

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = getScrollAmount();
    const halfwayPoint = container.scrollWidth / 2;

    if (direction === "left" && container.scrollLeft <= 8) {
      container.scrollLeft = halfwayPoint;
    } else if (direction === "right" && container.scrollLeft >= halfwayPoint - scrollAmount) {
      container.scrollLeft -= halfwayPoint;
    }

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollLeft = 0;

    const interval = window.setInterval(() => {
      const currentContainer = scrollRef.current;
      if (!currentContainer) return;

      const scrollAmount = getScrollAmount();
      const halfwayPoint = currentContainer.scrollWidth / 2;

      if (currentContainer.scrollLeft >= halfwayPoint - scrollAmount) {
        currentContainer.scrollLeft -= halfwayPoint;
      }

      currentContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:pb-12 lg:pt-[4.5rem]">
      <div className="mx-auto max-w-[1800px]">
        <motion.div
 
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
          className="scrollbar-hide mx-auto mt-8 flex max-w-[1680px] snap-x snap-mandatory justify-start gap-5 overflow-x-auto overflow-y-hidden px-0 pt-8 pb-4 scroll-smooth sm:gap-6"
        >
          {loopedFleets.map((fleet, index) => (
      <motion.div
  key={`${fleet.name}-${index}`}
  data-fleet-card
  className="group relative flex min-w-[calc(100%-0.0rem)] snap-start flex-col overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 backdrop-blur-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] sm:min-w-[calc(50%-0.75rem)] lg:min-w-[calc((100%-4.5rem)/4)]"
>
  {/* Image Section with a subtle overlay */}
  <div className="relative h-64 w-full overflow-hidden">
    <Image
      src={fleet.image}
      alt={fleet.imageAlt}
      fill
      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
    />
    {/* Gradient Overlay for a high-end feel */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    
    {/* Floating Badge (Optional - adds a premium touch) */}
    <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-900 backdrop-blur-md">
      Luxury Class
    </div>
  </div>

  <div className="flex flex-col p-6">
    {/* Header & Price */}
    <div className="mb-4">
      <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-[#ff4402] transition-colors duration-300">
        {fleet.name}
      </h3>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-xs font-medium text-gray-500">PKR</span>
        <span className="text-xl font-black group-hover:text-[#ff4402]">{formatPrice(fleet.price)}</span>
        <span className="text-xs font-medium text-gray-500">/ day</span>
      </div>
    </div>

    {/* Highlights - Modern Icon-style list */}
    <div className="grid grid-cols-1 gap-2 border-t border-gray-100 pt-4">
      {fleet.highlights?.slice(0, 3).map((h, idx) => (
        <div
          key={`${fleet.name}-${idx}`}
          className="flex items-center justify-between text-sm"
        >
          <span className="font-medium text-gray-500">{h.label}</span>
          <span className="font-semibold text-gray-900 group-hover:text-[#ff4402]">
            {typeof h.value === "boolean" ? (h.value ? "Yes" : "No") : h.value}
          </span>
        </div>
      ))}
    </div>

    {/* Action Button - Simplified & Elegant */}
    <Link href={`/services/${getFleetSlug(fleet.name)}`} className="mt-6">
      <button className="relative cursor-pointer w-full group/btn overflow-hidden rounded-xl  py-3.5 text-sm font-bold text-white transition-all duration-300 bg-[#ff4402] hover:shadow-lg hover:shadow-[#ff4402]/30 active:scale-[0.98]">
        <span className="relative z-10 flex items-center justify-center gap-2">
          View Details
          <FiArrowUpRight className="text-lg transition-transform duration-300  group-hover/btn:rotate-45" />
        </span>
      </button>
    </Link>
  </div>
  
  {/* Subtle accent border on hover */}
  <div className="absolute inset-x-0 bottom-0 h-1 bg-[#ff4402] scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
</motion.div>
          ))}
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-4">
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
