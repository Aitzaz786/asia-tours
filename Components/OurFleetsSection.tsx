"use client";

import { useCallback, useEffect, useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiAsteriskSimpleFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { fleets } from "@/Data/cars";
import Link from "next/link";

export default function OurFleetsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
  const formatPrice = (price: number) => new Intl.NumberFormat("en-PK").format(price);

  const cardsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const getScrollAmount = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return 316;

    const firstCard = container.querySelector<HTMLElement>("[data-fleet-card]");
    const cardWidth = firstCard?.offsetWidth ?? 292;
    const gapWidth = 24;

    return cardWidth + gapWidth;
  }, []);

  const handleScroll = useCallback(
    (direction: "left" | "right") => {
      const container = scrollRef.current;
      if (!container) return;

      const scrollAmount = getScrollAmount();

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    },
    [getScrollAmount]
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = window.setInterval(() => {
      const currentContainer = scrollRef.current;
      if (!currentContainer) return;

      const scrollAmount = getScrollAmount();
      const maxScrollLeft = currentContainer.scrollWidth - currentContainer.clientWidth;
      const nextScrollLeft = currentContainer.scrollLeft + scrollAmount;

      if (nextScrollLeft >= maxScrollLeft - 8) {
        currentContainer.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      currentContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, [getScrollAmount]);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-400">
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
          className="scrollbar-hide mx-auto mt-10 flex max-w-[1680px] justify-start gap-5 overflow-x-auto overflow-y-hidden pt-10 pb-4 pl-1 pr-1 scroll-smooth sm:gap-6"
        >
          {fleets.map((fleet, i) => (
            <motion.div
              key={fleet.name}
            
              className="group relative flex min-w-[85%] flex-col overflow-hidden rounded-3xl border border-white/30 bg-white/60 backdrop-blur-xl card-shadow transition-all duration-500 ease-out hover:scale-[1.04] hover:border-[#ff4402]/50 hover:shadow-[0_10px_40px_rgba(255,68,2,0.3)] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[23.7%]"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={fleet.image}
                  alt={fleet.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5 text-center">
                <h3 className="mb-1 text-xl font-bold text-gray-900">{fleet.name}</h3>

                <p className="mb-4 text-lg font-semibold text-[#ff4402]">
                  PKR {formatPrice(fleet.price)} / day
                </p>

                <ul className="space-y-1 text-sm text-gray-600 sm:text-base">
                  {fleet.highlights?.map((h, idx) => (
                    <li
                      key={`${fleet.name}-${h.label}-${idx}`}
                      className="relative transition-all duration-300 before:mr-2 before:text-base before:text-[#ff4402] before:content-['▹'] hover:text-gray-900"
                    >
                      {h.label}: {typeof h.value === "boolean" ? (h.value ? "Yes" : "No") : h.value}
                    </li>
                  ))}
                </ul>

                <Link href="#" className="mt-6 inline-block">
                  <button className="group/btn relative z-10 mt-auto inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#ff4402] via-[#ff4402] to-[#ff4402] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#ff4402]/30 transition-all duration-300 ease-out hover:scale-105 hover:opacity-90 hover:shadow-xl hover:shadow-[#ff4402]/50 active:scale-95">
                    <span className="relative z-10">Learn More</span>
                    <FaArrowRightLong className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover/btn:translate-x-full" />
                  </button>
                </Link>
                                   <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#ff4402] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-b-3xl" />
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
