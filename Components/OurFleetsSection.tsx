"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { PiAsteriskSimpleFill } from "react-icons/pi";
import { ArrowRight, Users, Fuel, Wind, Gauge } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { fleets, getFleetSlug } from "@/Data/cars";
import { SECTION_Y } from "@/lib/sectionSpacing";

const highlightIcons: Record<string, React.ReactElement> = {
  Passengers: <Users className="h-3.5 w-3.5" />,
  Fuel: <Fuel className="h-3.5 w-3.5" />,
  "A/C": <Wind className="h-3.5 w-3.5" />,
  Mileage: <Gauge className="h-3.5 w-3.5" />,
};

type OurFleetsSectionProps = {
  compactTop?: boolean;
};

export default function OurFleetsSection({ compactTop: _compactTop = false }: OurFleetsSectionProps) {
  const [isMobile, setIsMobile] = useState(true);
  const [autoplayKey, setAutoplayKey] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const formatPrice = (price: number) => new Intl.NumberFormat("en-PK").format(price);

  const resetAutoplay = useCallback(() => {
    setAutoplayKey((key) => key + 1);
  }, []);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    resetAutoplay();
  }, [emblaApi, resetAutoplay]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    resetAutoplay();
  }, [emblaApi, resetAutoplay]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Restart timer after user swipe/drag so autoplay doesn't double-advance
  useEffect(() => {
    if (!emblaApi) return;
    const onPointerDown = () => resetAutoplay();
    emblaApi.on("pointerDown", onPointerDown);
    return () => {
      emblaApi.off("pointerDown", onPointerDown);
    };
  }, [emblaApi, resetAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = window.setInterval(
      () => emblaApi.scrollNext(),
       isMobile ? 4800 : 4200
    );
    return () => window.clearInterval(interval);
  }, [emblaApi, isMobile, autoplayKey]);

  return (
    <section className={`fleet-section relative overflow-hidden bg-white px-4 sm:px-6 lg:px-8 ${SECTION_Y}`}>
      <div className="relative mx-auto max-w-[1600px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
            <PiAsteriskSimpleFill className="text-xs" aria-hidden="true" />
            <span>Our Fleets</span>
          </p>
          <h2 className="about-serif-font mx-auto mt-4 max-w-xl text-4xl font-bold leading-[1.06] text-[#0f0e0c] sm:text-[2.85rem] lg:text-[3.35rem]">
            Explore our perfect and extensive fleet
          </h2>
          <p className="mt-4 text-base text-[#6b6560]">
            Premium vehicles for every occasion — from corporate travel to luxury adventures.
          </p>
        </div>

        <div ref={emblaRef} className="mx-auto mt-12 max-w-[1600px] overflow-hidden">
          <div className="flex touch-pan-y">
            {fleets.map((fleet, index) => {
              const slug = getFleetSlug(fleet.name);
              const specs = fleet.highlights?.slice(0, 3) ?? [];

              return (
                <div
                  key={`${fleet.name}-${index}`}
                  className="mr-4 min-w-0 flex-[0_0_100%] sm:mr-5 sm:flex-[0_0_calc(50%-0.625rem)] lg:mr-5 lg:flex-[0_0_calc(25%-0.9375rem)]"
                >
                  <article className="fleet-card group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e8e4de] bg-white shadow-none">
                    <div className="relative h-[220px] w-full overflow-hidden bg-[#f0eeea] sm:h-[240px]">
                      <Image
                        src={fleet.image}
                        alt={fleet.imageAlt}
                        fill
                        className="object-cover md:transition-transform md:duration-700 md:group-hover:scale-[1.04]"
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
                      <div className="absolute bottom-3 right-3 rounded-full bg-[#D4AF37] px-3.5 py-1.5 text-[11px] font-bold text-[#0A0A0A]">
                        PKR {formatPrice(fleet.price)}
                        <span className="ml-1 font-medium opacity-70">/day</span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-bold leading-snug tracking-tight text-[#0f0e0c] sm:text-xl">
                        {fleet.name}
                      </h3>

                      <div className="mt-4 grid grid-cols-3 gap-2 border-y border-[#efebe6] py-3.5">
                        {specs.map((h) => (
                          <div
                            key={`${fleet.name}-${h.label}`}
                            className="flex flex-col items-center gap-1 text-center"
                          >
                            <span className="text-[#D4AF37]">
                              {highlightIcons[h.label] ?? <Gauge className="h-3.5 w-3.5" />}
                            </span>
                            <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#9a9188]">
                              {h.label}
                            </span>
                            <span className="text-xs font-bold text-[#0f0e0c]">
                              {typeof h.value === "boolean" ? (h.value ? "Yes" : "No") : h.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/services/${slug}`}
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] py-3 text-sm font-bold text-[#0A0A0A] md:bg-[#0f0e0c] md:text-white md:hover:bg-[#D4AF37] md:hover:text-[#0A0A0A]"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="my-10 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label="Scroll fleets left"
            onClick={scrollPrev}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#e5e0da] bg-white text-[#0f0e0c] md:hover:border-[#D4AF37] md:hover:bg-[#D4AF37]"
          >
            <FiArrowLeft className="text-lg" />
          </button>
          <button
            type="button"
            aria-label="Scroll fleets right"
            onClick={scrollNext}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#e5e0da] bg-white text-[#0f0e0c] md:hover:border-[#D4AF37] md:hover:bg-[#D4AF37]"
          >
            <FiArrowRight className="text-lg" />
          </button>
        </div>
      </div>
    </section>
  );
}
