"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiDroplet,
  FiShield,
  FiUsers,
  FiWind,
} from "react-icons/fi";
import { PiAsteriskSimpleFill } from "react-icons/pi";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { fleets, getFleetSlug } from "@/Data/cars";
import Link from "next/link";

export default function OurFleetsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    dragFree: false,
  });

  const formatPrice = (price: number) => new Intl.NumberFormat("en-PK").format(price);
  const formatHighlightValue = (value: string | number | boolean) =>
    typeof value === "boolean" ? (value ? "Yes" : "No") : value;

  const cardsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateSelectedIndex();
    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi, updateSelectedIndex]);

  return (
    <section className="relative bg-white py-14 sm:py-16 lg:pb-12 lg:pt-[4.5rem]">
      <div className="mx-auto">
        <motion.div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff4500]">
            <PiAsteriskSimpleFill className="text-xs" aria-hidden="true" />
            <span>Our Fleets</span>
          </p>

          <h2 className="about-serif-font mx-auto mt-4 max-w-xl text-4xl font-bold leading-[1.06] text-black sm:text-[2.85rem] lg:text-[3.35rem]">
            Explore our perfect and extensive fleet
          </h2>
        </motion.div>

        <div ref={emblaRef} className="mx-auto mt-8 overflow-hidden py-10">
          <motion.div
            variants={cardsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex touch-pan-y"
          >
            {fleets.map((fleet, index) => {
              const isCenter = selectedIndex === index;

              return (
                <div
                  key={`${fleet.name}-${index}`}
                  data-fleet-card
                  className="min-w-0 flex-[0_0_85%] px-2 sm:flex-[0_0_70%] sm:px-3 lg:flex-[0_0_52%] xl:flex-[0_0_46%]"
                >
                  <motion.article
                    className={`group relative h-[560px] rounded-[2rem] transition-all duration-500 ease-out ${
                      isCenter
                        ? "scale-100 opacity-100 shadow-[0_28px_70px_rgba(15,23,42,0.24)]"
                        : "scale-90 opacity-100 shadow-[0_12px_34px_rgba(15,23,42,0.10)]"
                    }`}
                    whileHover={isCenter ? { y: -4 } : undefined}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <div className="relative h-[480px] overflow-hidden rounded-[2rem] bg-black">
                      <Image
                        src={fleet.image}
                        alt={fleet.imageAlt}
                        fill
                        quality={100}
                        sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 44vw, (min-width: 640px) 64vw, 82vw"
                        className={`object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.04] ${
                          isCenter ? "brightness-100" : "brightness-75"
                        }`}
                      />

                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.62)_100%)]" />
                    </div>

                    {isCenter && (
                      <>
                        <button
                          type="button"
                          aria-label="Previous fleet"
                          onClick={scrollPrev}
                          className="absolute left-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[#101010] opacity-0 shadow-[0_14px_32px_rgba(0,0,0,0.20)] transition-all duration-300 hover:bg-[#ff4500] hover:text-white group-hover:opacity-100"
                        >
                          <FiArrowLeft className="text-xl" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label="Next fleet"
                          onClick={scrollNext}
                          className="absolute right-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[#101010] opacity-0 shadow-[0_14px_32px_rgba(0,0,0,0.20)] transition-all duration-300 hover:bg-[#ff4500] hover:text-white group-hover:opacity-100"
                        >
                          <FiArrowRight className="text-xl" aria-hidden="true" />
                        </button>
                      </>
                    )}

                    <div className="absolute inset-x-0 bottom-5 z-10 px-4 sm:px-6">
                      <div className="flex min-h-[92px] items-center justify-between gap-3 rounded-[1.2rem] bg-[#1a1a1a] px-4 py-3 shadow-[0_18px_36px_rgba(0,0,0,0.28)] sm:px-5">
                        <div className="min-w-0 text-white">
                          <h3 className="line-clamp-1 text-xl font-black leading-tight tracking-[-0.01em] sm:text-2xl">
                            {fleet.name}
                          </h3>

                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-medium text-white/62 sm:text-xs">
                            {fleet.highlights?.slice(0, 4).map((highlight) => {
                              const Icon =
                                highlight.label === "Passengers"
                                  ? FiUsers
                                  : highlight.label === "Fuel"
                                    ? FiDroplet
                                    : highlight.label === "A/C"
                                      ? FiWind
                                      : FiShield;

                              return (
                                <span key={`${fleet.name}-${highlight.label}`} className="inline-flex items-center gap-1">
                                  <Icon className="text-xs text-[#ffb13d] sm:text-sm" aria-hidden="true" />
                                  {formatHighlightValue(highlight.value)} {highlight.label}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <Link
                            href={`/services/${getFleetSlug(fleet.name)}`}
                            className="group/btn inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#ffb13d] px-4 text-xs font-bold text-[#171717] shadow-[0_10px_24px_rgba(255,177,61,0.22)] transition-all duration-300 hover:bg-[#ff4500] hover:text-white active:scale-[0.98]"
                          >
                            Details
                            <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover/btn:rotate-45" aria-hidden="true" />
                          </Link>

                          <div className="text-right">
                            <div className="text-xl font-black leading-none text-[#ffb13d] sm:text-2xl">
                              PKR {formatPrice(fleet.price)}
                            </div>
                            <div className="mt-1 text-xs font-medium text-white/68">/day</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
