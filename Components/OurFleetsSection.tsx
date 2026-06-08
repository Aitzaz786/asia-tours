"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { ArrowRight } from 'lucide-react';
import { PiAsteriskSimpleFill } from "react-icons/pi";
import { Users, Fuel, Wind, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { fleets, getFleetSlug } from "@/Data/cars";
import Link from "next/link";

const highlightIcons: Record<string, React.ReactNode> = {
  Passengers: <Users className="w-3.5 h-3.5 text-[#ff4402]" />,
  Fuel:       <Fuel  className="w-3.5 h-3.5 text-[#ff4402]" />,
  "A/C":      <Wind  className="w-3.5 h-3.5 text-[#ff4402]" />,
  Mileage:    <Gauge className="w-3.5 h-3.5 text-[#ff4402]" />,
};

export default function OurFleetsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const formatPrice = (price: number) => new Intl.NumberFormat("en-PK").format(price);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const interval = window.setInterval(() => emblaApi?.scrollNext(), 3600);
    return () => window.clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden px-4 py-15 sm:px-6 lg:px-8">

      <div className="pointer-events-none absolute inset-0"
      
      />

      <div className="relative mx-auto max-w-[1600px]">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-[0.18em] text-[#ff4402] uppercase">
            <PiAsteriskSimpleFill className="text-xs" aria-hidden="true" />
            <span>Our Fleets</span>
          </p>
          <h2 className="about-serif-font mx-auto mt-4 max-w-xl text-4xl font-bold leading-[1.06] text-gray-900 sm:text-[2.85rem] lg:text-[3.35rem]">
            Explore our perfect and extensive fleet
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Premium vehicles for every occasion — from corporate travel to luxury adventures.
          </p>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="mx-auto mt-12 max-w-[1600px] overflow-hidden pb-2">
          <div className="flex touch-pan-y">
            {fleets.map((fleet, index) => (
              <div
                key={`${fleet.name}-${index}`}
                className="mr-5 min-w-0 flex-[0_0_100%] sm:mr-6 sm:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(25%-1.125rem)]"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.13)] transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={fleet.image}
                      alt={fleet.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

               
                  </div>

                  {/* Body */}
                 {/* Body */}
                  <div className="flex flex-1 flex-col p-5">

                    {/* Name + Price row */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[1.1rem] font-bold text-gray-900 group-hover:text-[#ff4402] transition-colors duration-200">
                        {fleet.name}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="block text-[11px] text-gray-400 leading-none">per day</span>
                        <span className="block text-base font-black text-[#ff4402] leading-tight">
                          PKR {formatPrice(fleet.price)}
                        </span>
                      </div>
                    </div>

                    <div className="my-3 h-px bg-gray-100" />

                    {/* Highlights with icons */}
                    <div className="grid grid-cols-3 gap-2">
                      {fleet.highlights?.slice(0, 3).map((h, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 px-2 py-2.5 text-center">
                          <span>{highlightIcons[h.label] ?? <Gauge className="w-3.5 h-3.5 text-[#ff4402]" />}</span>
                          <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide leading-none">{h.label}</span>
                          <span className="text-xs font-bold text-gray-800">
                            {typeof h.value === "boolean" ? (h.value ? "Yes" : "No") : h.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <Link href={`/services/${getFleetSlug(fleet.name)}`} className="mt-5 block">
                      <button className="group/btn w-full overflow-hidden rounded-2xl bg-[#ff4402] py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e53d00] active:scale-[0.98]">
                        <span className="flex items-center justify-center gap-2">
                          View Details
                          <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1"><ArrowRight className="w-4 h-4" /></span>
                        </span>
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Nav Buttons */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <motion.button
            type="button"
            aria-label="Scroll fleets left"
            onClick={scrollPrev}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 text-gray-700 transition hover:bg-[#ff4402] hover:text-white hover:border-[#ff4402]"
          >
            <FiArrowLeft className="text-lg" />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Scroll fleets right"
            onClick={scrollNext}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4402] text-white shadow-sm transition hover:bg-[#e53d00]"
          >
            <FiArrowRight className="text-lg" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}