"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  Fuel,
  Gauge,
  Snowflake,
  Users,
  Wind,
  X,
} from "lucide-react";
import type { Fleet, Highlight } from "@/Data/cars";
import { getFleetSlug } from "@/Data/cars";
import FaqSection from "@/Components/FaqSection";
import PricingTableSection from "@/Components/PricingTableSection";
import CtaBannerSection from "@/Components/CtaBannerSection";
import CitiesNetworkSection from "@/Components/CitiesNetworkSection";
import { SECTION_Y, SECTION_Y_END } from "@/lib/sectionSpacing";

type Props = {
  fleet: Fleet;
  similarFleets: Fleet[];
};

type GalleryItem = {
  src: string;
  alt: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

function getHighlightValue(highlights: Highlight[] | undefined, label: string) {
  return highlights?.find((item) => item.label === label)?.value;
}

function formatBoolean(value: string | number | boolean | undefined) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value ?? "-");
}

function buildGallery(fleet: Fleet): GalleryItem[] {
  if (fleet.imagesDetail?.length) {
    return fleet.imagesDetail.map((image) => ({
      src: image.src,
      alt: image.alt,
    }));
  }

  return [
    { src: fleet.image, alt: fleet.imageAlt },
    { src: "/2025_toyota_land_cruiser_exterior_06.webp", alt: "Luxury SUV exterior detail" },
    { src: "/2023-BMW-i7-exterior-1-scaled.webp", alt: "Executive car exterior detail" },
    { src: "/exterior-image-164.avif", alt: "Premium vehicle side angle" },
  ];
}

const highlightIcons: Record<string, React.ReactElement> = {
  Passengers: <Users className="h-3.5 w-3.5" />,
  Fuel: <Fuel className="h-3.5 w-3.5" />,
  "A/C": <Wind className="h-3.5 w-3.5" />,
  Mileage: <Gauge className="h-3.5 w-3.5" />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const aboutPoints = [
  "Professional booking coordination before departure",
  "Clean and presentation-ready vehicle standards",
  "Suitable for business, family, and event travel",
  "Luxury-focused experience from inquiry to arrival",
];

function GalleryPreview({
  gallery,
  startIndex,
  onClose,
}: {
  gallery: GalleryItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const current = gallery[index];

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
    >
      <div
        className="relative flex h-full max-h-[920px] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-[#111111] md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute right-3 top-3 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Main preview */}
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div className="relative min-h-[52vh] flex-1 sm:min-h-[60vh] md:min-h-0">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>

          {/* Phone arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:hidden">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <p className="border-t border-white/10 px-4 py-3 text-center text-xs text-white/60 md:text-left">
            {index + 1} / {gallery.length}
          </p>
        </div>

        {/* Desktop / tablet right strip (GPT-style) */}
        <aside className="hidden w-[112px] shrink-0 flex-col gap-2 overflow-y-auto border-l border-white/10 bg-[#0a0a0a] p-2 md:flex lg:w-[128px]">
          {gallery.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={`${item.src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all ${
                  active
                    ? "border-[#D4AF37]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="112px" />
              </button>
            );
          })}
        </aside>
      </div>
    </div>
  );
}

export default function ServiceCarDetailView({ fleet, similarFleets }: Props) {
  const gallery = useMemo(() => buildGallery(fleet), [fleet]);
  const previewThumbs = gallery.slice(0, 4);
  const extraCount = Math.max(0, gallery.length - 4);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewStart, setPreviewStart] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [zoomActive, setZoomActive] = useState(false);

  const selected = gallery[selectedIndex] ?? gallery[0];

  const passengers = getHighlightValue(fleet.highlights, "Passengers");
  const fuel = getHighlightValue(fleet.highlights, "Fuel");
  const ac = getHighlightValue(fleet.highlights, "A/C");
  const mileage = getHighlightValue(fleet.highlights, "Mileage");

  const vehicleDetails = [
    { label: "Passengers", value: String(passengers ?? "-"), icon: Users },
    { label: "Fuel", value: String(fuel ?? "-"), icon: Fuel },
    { label: "Mileage", value: String(mileage ?? "-"), icon: CircleGauge },
    { label: "A/C", value: formatBoolean(ac), icon: Snowflake },
  ];

  const monthlyPrice = Math.round(fleet.price * 26);
  const outstationPrice = Math.round(fleet.price * 1.18);

  const openPreview = (index: number) => {
    setPreviewStart(index);
    setPreviewOpen(true);
  };

  return (
    <main className="overflow-hidden text-[#101010]">
      <section className="relative px-3 pb-10 pt-4 sm:px-5 lg:px-7">
        <div className="mx-auto max-w-[1800px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-[28px] border border-[#eee4da] bg-white p-4 sm:rounded-[34px] sm:p-6 lg:p-7"
          >
            <div className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-[#efe5db] bg-[#F5E9C8] px-4 py-2 text-sm text-[#6a625a]">
              <Link href="/" className="transition-colors hover:text-[#D4AF37]">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/services" className="transition-colors hover:text-[#D4AF37]">
                Services
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-[#111111]">{fleet.name}</span>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:items-start xl:gap-8">
              {/* Gallery */}
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => openPreview(selectedIndex)}
                  className="group relative block h-[280px] w-full overflow-hidden rounded-[24px] border border-[#ece3d8] bg-[#f7f1ea] sm:h-[380px] lg:h-[420px]"
                  onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width) * 100;
                    const y = ((event.clientY - rect.top) / rect.height) * 100;
                    setZoomPosition({ x, y });
                  }}
                  onMouseEnter={() => setZoomActive(true)}
                  onMouseLeave={() => setZoomActive(false)}
                >
                  {selected && (
                    <>
                      <Image
                        src={selected.src}
                        alt={selected.alt}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1280px) 100vw, 55vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,17,0.04),rgba(5,10,17,0.22))]" />
                      <div
                        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                          zoomActive ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          backgroundImage: `url("${selected.src}")`,
                          backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          backgroundSize: "180%",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    </>
                  )}
                </button>

                <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-2.5">
                  {previewThumbs.map((item, i) => {
                    const active = i === selectedIndex;
                    const showMoreOverlay = i === 3 && extraCount > 0;

                    return (
                      <button
                        key={`${item.src}-${i}`}
                        type="button"
                        onClick={() => {
                          if (showMoreOverlay) {
                            openPreview(3);
                            return;
                          }
                          setSelectedIndex(i);
                        }}
                        className={`relative h-[64px] overflow-hidden rounded-xl border transition-all sm:h-[80px] ${
                          active && !showMoreOverlay
                            ? "border-[#D4AF37]"
                            : "border-[#ece3d8] hover:border-[#E8C766]"
                        }`}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                        {showMoreOverlay ? (
                          <span className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 text-white">
                            <span className="text-lg font-bold leading-none">+{extraCount}</span>
                            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em]">
                              More
                            </span>
                          </span>
                        ) : (
                          <span
                            className={`absolute inset-0 ${active ? "bg-[#D4AF37]/15" : "bg-black/5"}`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detail panel */}
              <div className="flex min-w-0 flex-col justify-start">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                  Available for rent
                </p>
                <h1 className="mt-2 text-3xl font-semibold leading-tight text-[#0f0e0c] sm:text-4xl lg:text-[2.65rem]">
                  {fleet.name}
                </h1>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-[#D4AF37] sm:text-4xl">
                    Rs {formatPrice(fleet.price)}
                  </span>
                  <span className="text-sm font-medium text-[#9a9188]">/ day</span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4 sm:gap-4">
                  {vehicleDetails.map((item) => (
                    <div key={item.label} className="flex flex-col">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAFAF8] text-[#D4AF37] ring-1 ring-[#eadfd6]">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a9188]">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-base font-semibold text-[#0f0e0c]">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-y border-[#eadfd6] py-4">
                  {[
                    { label: "Daily", value: fleet.price },
                    { label: "Outstation", value: outstationPrice },
                    { label: "Monthly", value: monthlyPrice },
                  ].map((rate) => (
                    <div
                      key={rate.label}
                      className="flex min-w-[7.5rem] flex-1 flex-col rounded-xl bg-[#FAFAF8] px-3.5 py-3 ring-1 ring-[#eadfd6]"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9a9188]">
                        {rate.label}
                      </span>
                      <span className="mt-1 text-sm font-bold text-[#D4AF37]">
                        Rs {formatPrice(rate.value)}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-7 text-[#6b6560]">
                  Premium chauffeur-ready option for airport transfers, executive travel, and special
                  occasions — presentation-focused and booking-ready.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link
                    href="/contact-us"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#B8860B]"
                  >
                    Book This Vehicle
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex w-full items-center justify-center rounded-full border border-[#eadfd6] bg-white px-7 py-3.5 text-sm font-semibold text-[#0f0e0c] transition-colors hover:bg-[#F5E9C8]"
                  >
                    Back to Services
                  </Link>
                </div>
              </div>
            </div>

            {/* About — fills width, no empty right side */}
            <div className="mt-6 border-t border-[#efe6dc] pt-6 sm:mt-7 sm:pt-7">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                    About Car
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#111111] sm:text-3xl">
                    Elegant details with a cleaner premium presentation
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#6e675f] sm:text-base sm:leading-8">
                    {fleet.name} is designed for travelers who want a vehicle that feels reliable, refined,
                    and comfortable from the moment it arrives. It works beautifully for executive pickups,
                    airport movement, family plans, and special occasions where presentation matters.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {aboutPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-2xl border border-[#efe6dc] bg-[#FAFAF8] px-4 py-3.5"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-xs font-bold text-[#D4AF37]">
                        ✓
                      </span>
                      <p className="text-sm leading-6 text-[#544f49]">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Similar cars → rates → trust → service areas → FAQ → contact */}
      <section className={`mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8 ${SECTION_Y}`}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
            <span className="text-xs leading-none" aria-hidden="true">
              {"\u2733"}
            </span>
            <span>Similar Cars</span>
          </p>
          <h2 className="about-serif-font mx-auto mt-3 max-w-xl text-3xl font-bold leading-[1.06] text-[#0f0e0c] sm:text-4xl">
            Explore More Premium Options
          </h2>
          <p className="mt-3 text-base text-[#6b6560]">
            Discover vehicles that match your style and comfort for the next booking.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {similarFleets.map((item) => {
            const slug = getFleetSlug(item.name);
            const specs = item.highlights?.slice(0, 3) ?? [];

            return (
              <article
                key={item.name}
                className="fleet-card group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e8e4de] bg-white shadow-none"
              >
                <div className="relative h-[200px] w-full overflow-hidden bg-[#f0eeea] sm:h-[220px]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover md:transition-transform md:duration-700 md:group-hover:scale-[1.04]"
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
                  <div className="absolute bottom-3 right-3 rounded-full bg-[#D4AF37] px-3.5 py-1.5 text-[11px] font-bold text-[#0A0A0A]">
                    PKR {formatPrice(item.price)}
                    <span className="ml-1 font-medium opacity-70">/day</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold leading-snug tracking-tight text-[#0f0e0c] sm:text-xl">
                    {item.name}
                  </h3>

                  <div className="mt-4 grid grid-cols-3 gap-2 border-y border-[#efebe6] py-3.5">
                    {specs.map((h) => (
                      <div
                        key={`${item.name}-${h.label}`}
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
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#B8860B]"
          >
            View All Services
          </Link>
        </div>
      </section>

      <PricingTableSection compact />
      <CtaBannerSection compact />
      <CitiesNetworkSection showViewAll compact />
      <FaqSection compact />

      <section className={`px-3 sm:px-5 lg:px-7 ${SECTION_Y_END}`}>
        <div className="relative mx-auto flex w-full max-w-[1800px] items-center justify-center overflow-hidden rounded-[28px] bg-white px-5 py-12 sm:rounded-[36px] sm:px-8 sm:py-14 lg:px-10">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
            <span className="select-none text-[5rem] font-bold tracking-tighter text-slate-900 sm:text-[10rem] lg:text-[20rem]">
              ASIA
            </span>
          </div>

          <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-1 text-center sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-muted text-[#D4AF37] sm:mb-6 sm:h-12 sm:w-12"
            >
              <span className="text-xl font-bold sm:text-2xl">{"\u2726"}</span>
            </motion.div>

            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl sm:leading-snug lg:text-4xl">
              Ready to reserve <span className="text-[#D4AF37]">{fleet.name}?</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-slate-500 sm:mt-4 sm:text-base">
              Share your route and timing with us. We&apos;ll help you confirm availability and prepare a
              smooth premium booking experience.
            </p>

            <div className="mt-6 flex w-full max-w-xs flex-col gap-3 sm:mt-8 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <Link
                href="/contact-us"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-[#0A0A0A] sm:w-auto sm:px-8 sm:py-4 sm:tracking-[0.22em] md:hover:bg-[#B8860B]"
              >
                Contact Us
              </Link>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#efddcf] bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] sm:w-auto sm:px-8 sm:py-4 md:hover:bg-[#F5E9C8]"
              >
                View All Cars
              </Link>
            </div>
          </div>
        </div>
      </section>

      {previewOpen && (
        <GalleryPreview
          gallery={gallery}
          startIndex={previewStart}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </main>
  );
}
