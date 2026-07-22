"use client";

import { useMemo, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarHeart,
  CarFront,
  ChevronDown,
  Gem,
  LucideIcon,
  Plane,
  Route,
  Search,
} from "lucide-react";
import { fleets, getFleetSlug, type Fleet } from "@/Data/cars";
import { services } from "./servicesData";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import QuickBookingForm from "@/Components/QuickBookingForm";
import DarkHeroShell, { HOME_HERO_CONTENT_HEIGHT } from "@/Components/DarkHeroShell";
import FaqSection from "@/Components/FaqSection";
import { TestimonialsSection, VideoStatsSection } from "../about-us/page";
import { SECTION_Y, SECTION_Y_END } from "@/lib/sectionSpacing";
import ServiceCardsGrid from "@/Components/ServiceCardsGrid";

const LahoreServiceMap = dynamic(() => import("@/Components/LahoreServiceMap"), { ssr: false });

type ServiceVisual = {
  icon: LucideIcon;
  image: string;
  accent: string;
  tag: string;
  stat1: string;
  label1: string;
  stat2: string;
  label2: string;
};

const serviceVisuals: ServiceVisual[] = [
  { icon: Plane, image: "/hero-bg.webp", accent: "Airport ready", tag: "Premium Ã‚Â· Coordinated", stat1: "24/7", label1: "Always On", stat2: "0 min", label2: "Wait Time" },
  { icon: BriefcaseBusiness, image: "/2023-BMW-i7-exterior-1-scaled.webp", accent: "Executive class", tag: "Business Ã‚Â· Reliable", stat1: "14+", label1: "Fleet Size", stat2: "100%", label2: "On-time Rate" },
  { icon: Gem, image: "/range-rover-vogue-01.webp", accent: "Luxury fleet", tag: "Exclusive Ã‚Â· Premium", stat1: "14+", label1: "Vehicles", stat2: "5Ã¢Ëœâ€¦", label2: "Rated Fleet" },
  { icon: Route, image: "/Badshahi_Mosque_front_picture.webp", accent: "Made to plan", tag: "Flexible Ã‚Â· Planned", stat1: "Any", label1: "Destination", stat2: "Full", label2: "Coordination" },
  { icon: CalendarHeart, image: "/black.webp", accent: "Event perfect", tag: "VIP Ã‚Â· Memorable", stat1: "500+", label1: "Events Done", stat2: "VIP", label2: "Treatment" },
  { icon: CarFront, image: "/Range-Rover.avif", accent: "With chauffeur", tag: "Professional Ã‚Â· Elite", stat1: "100%", label1: "Professional", stat2: "5Ã¢Ëœâ€¦", label2: "Rated Drivers" },
];



const bookingFlow = [
  { step: "01", title: "Tell us the movement", text: "Share pickup, drop-off, timing, guests, luggage, and the occasion." },
  { step: "02", title: "We match the right car", text: "Our team recommends the vehicle, chauffeur plan, and schedule buffer." },
  { step: "03", title: "Arrive without friction", text: "Your car reaches prepared, clean, coordinated, and ready for the journey." },
];

const featuredFleet = fleets.slice(0, 6);

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}
const easeCurve: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

type PriceFilter = "all" | "under-15000" | "15000-30000" | "30000-50000" | "50000-plus";
type VehicleType = "All" | "SUV" | "Sedan" | "Luxury" | "4x4 Pickup" | "Van";
type SortOption = "price-asc" | "price-desc" | "passengers-desc";
type ContentTab = "fleet" | "services";

const ITEMS_PER_PAGE = 12;


function getHighlightValue(fleet: Fleet, label: string) {
  return fleet.highlights?.find((highlight) => highlight.label === label)?.value;
}

function getPassengers(fleet: Fleet) {
  const value = getHighlightValue(fleet, "Passengers");
  return typeof value === "number" ? value : Number(value) || 0;
}

function getVehicleType(fleet: Fleet): VehicleType {
  const name = fleet.name.toLowerCase();

  if (name.includes("hiace") || name.includes("wagon")) return "Van";
  if (name.includes("hilux") || name.includes("4x4")) return "4x4 Pickup";
  if (name.includes("mercedes") || name.includes("bmw") || name.includes("audi") || name.includes("bentley")) return "Luxury";
  if (name.includes("corolla") || name.includes("civic") || name.includes("a6") || name.includes("series") || name.includes("s-class")) return "Sedan";
  if (name.includes("land cruiser") || name.includes("range rover") || name.includes("defender") || name.includes("g-wagon") || name.includes("prado")) return "SUV";

  return "SUV";
}

function matchesPrice(fleet: Fleet, priceFilter: PriceFilter) {
  if (priceFilter === "all") return true;
  if (priceFilter === "under-15000") return fleet.price < 15000;
  if (priceFilter === "15000-30000") return fleet.price >= 15000 && fleet.price <= 30000;
  if (priceFilter === "30000-50000") return fleet.price >= 30000 && fleet.price <= 50000;
  return fleet.price >= 50000;
}

export default function ServicesClientPage() {
  const [activeTab, setActiveTab] = useState(services[0]?.slug ?? "");
  const [testimonialStart, setTestimonialStart] = useState(0);
  const activeService = services.find((service) => service.slug === activeTab) ?? services[0];
  const activeIndex = Math.max(services.findIndex((service) => service.slug === activeTab), 0);
  const activeVisual = serviceVisuals[activeIndex % serviceVisuals.length];
  const ActiveIcon = activeVisual.icon;
  const activeNumber = String(activeIndex + 1).padStart(2, "0");
  const [contentTab, setContentTab] = useState<ContentTab>("fleet");
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [vehicleType, setVehicleType] = useState<VehicleType>("All");
  const [sortOption, setSortOption] = useState<SortOption>("price-asc");
  const [currentPage, setCurrentPage] = useState(1);

  const resetPage = () => setCurrentPage(1);

  const clearFilters = () => {
    setSearch("");
    setPriceFilter("all");
    setVehicleType("All");
    setCurrentPage(1);
  };

  const filteredFleets = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = fleets.filter((fleet) => {
      const type = getVehicleType(fleet);

      return (
        (!query || fleet.name.toLowerCase().includes(query)) &&
        matchesPrice(fleet, priceFilter) &&
        (vehicleType === "All" || type === vehicleType)
      );
    });

    return [...result].sort((a, b) => {
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "passengers-desc") return getPassengers(b) - getPassengers(a);
      return a.price - b.price;
    });
  }, [priceFilter, search, sortOption, vehicleType]);

  const totalPages = Math.max(1, Math.ceil(filteredFleets.length / ITEMS_PER_PAGE));
  const visibleFleets = filteredFleets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <main className="w-full max-w-[100vw] overflow-x-clip text-[#080b10]">
      <section className="home-hero relative z-30 w-full overflow-x-hidden pb-8 sm:pb-12 lg:pb-14">
        <DarkHeroShell>
          <div className={`relative z-10 flex w-full flex-col items-center justify-center px-5 pt-28 pb-16 text-center sm:px-8 sm:pt-36 sm:pb-20 lg:px-12 ${HOME_HERO_CONTENT_HEIGHT}`}>
            <div className="mb-4 inline-flex items-center justify-center gap-3 sm:mb-6">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37] sm:w-12" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37] sm:text-xs">
                Asia Tours Services
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37] sm:w-12" />
            </div>

            <h1 className="max-w-[14ch] text-[2.8rem] font-black leading-[1.04] tracking-[-2px] text-white sm:text-6xl lg:text-[4.8rem]">
              Premium{" "}
              <em className="not-italic text-[#D4AF37]">mobility</em>{" "}
              for every{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.35)" }}
              >
                destination.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              From airport arrivals to executive city travel, wedding movements, and private intercity
              journeys, we deliver a service-first experience with luxury vehicles and meticulous coordination.
            </p>

            <div className="mt-8 hidden items-center justify-center gap-3 md:flex">
              <Link
                href="/contact-us"
                className="shimmer-btn relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-bold text-[#0A0A0A] shadow-[0_20px_45px_rgba(212,175,55,0.3)] sm:w-auto"
              >
                Book a Service
              </Link>

              <div className="flex w-full items-center justify-center gap-3 sm:w-auto">
                <Link
                  href="#fleet-showcase"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black shadow-md transition-all hover:bg-white/90 sm:flex-none"
                >
                  Explore Fleet
                </Link>

                <Link
                  href="#fleet-showcase"
                  className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-white/90"
                  aria-label="Explore fleet"
                >
                  <FiArrowUpRight className="text-lg text-black transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </div>
            </div>
          </div>
        </DarkHeroShell>
        <div className="relative z-40 px-3 sm:px-5 lg:px-7">
          <QuickBookingForm easeCurve={easeCurve} />
        </div>
      </section>

      <section className="bg-white px-4 pt-8 sm:pt-10">
        <div className="mx-auto flex w-full max-w-[350px] items-center justify-center rounded-full border border-[#eadfd6] bg-[#fbfaf8] p-1 shadow-sm">
          {[
            { label: "Our Fleet", value: "fleet" as const },
            { label: "Our Services", value: "services" as const },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setContentTab(tab.value)}
              className={`min-w-0 flex-1 whitespace-nowrap rounded-full px-3 py-3 text-[10px] font-black uppercase tracking-[0.1em] transition-all sm:px-6 sm:text-sm sm:tracking-[0.12em] ${
                contentTab === tab.value
                  ? "bg-[#0f0e0c] text-white shadow-sm"
                  : "text-[#746b61] hover:bg-white hover:text-[#0f0e0c]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={contentTab}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
      {contentTab === "fleet" ? (
        <section id="fleet-showcase" className="bg-white px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8">
          <div className="mx-auto max-w-[1600px]">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 pb-8 text-center sm:pb-10">
           
              <h2 className="max-w-full break-words text-[clamp(1.75rem,8.5vw,3rem)] font-black leading-[1.08] tracking-tight text-[#08111f]">
                Premium cars.{" "}
                <span className="block text-[#D4AF37] sm:inline">Private chauffeurs.</span>
              </h2>
              <p className="max-w-xl px-1 text-[13px] font-medium leading-6 text-[#5f6877] sm:text-sm sm:leading-7">
                Luxury sedans, SUVs, and vans for airport transfers, business travel, weddings, and city rides.
              </p>
            </div>

            <div className="pt-6 border-t border-[#efe6dc]">
              <div className="min-w-0">
                <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-[#eadfd6] bg-[#fbfaf8] p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2 border-b border-[#eadfd6] pb-3">
                    <span className="inline-flex w-16 shrink-0 items-center justify-center rounded-full border border-[#B8860B]/25 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#D4AF37]">
                      Type
                    </span>
                    {(["All", "SUV", "Sedan", "Luxury", "4x4 Pickup", "Van"] as VehicleType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setVehicleType(type);
                          resetPage();
                        }}
                        className={`rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-all ${
                          vehicleType === type
                            ? "border-[#D4AF37] bg-[#D4AF37] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex w-16 shrink-0 items-center justify-center rounded-full border border-[#B8860B]/25 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#D4AF37]">
                      Price
                    </span>
                    {([
                      { label: "Any", value: "all" },
                      { label: "Under 15k", value: "under-15000" },
                      { label: "15k - 30k", value: "15000-30000" },
                      { label: "30k - 50k", value: "30000-50000" },
                      { label: "50k+", value: "50000-plus" },
                    ] as { label: string; value: PriceFilter }[]).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setPriceFilter(opt.value);
                          resetPage();
                        }}
                        className={`rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-all ${
                          priceFilter === opt.value
                            ? "border-[#D4AF37] bg-[#D4AF37] text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}

                    <div className="relative ml-auto w-full sm:w-auto">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#B8860B]" />
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          resetPage();
                        }}
                        placeholder="Search vehicles..."
                        className="w-full rounded-full border border-[#e4d7cc] bg-white py-2 pl-9 pr-4 text-[13px] font-bold text-[#18130f] outline-none placeholder:text-[#9d8f84] transition-colors focus:border-[#B8860B] sm:w-60"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="rounded-full border border-[#efe6dc] bg-[#fbfaf8] px-4 py-2 text-sm font-bold text-[#5b554f]">
                    Showing <span className="font-black text-[#D4AF37]">{visibleFleets.length}</span> of{" "}
                    <span className="font-black text-[#08111f]">{filteredFleets.length}</span> vehicles
                  </p>
  
                </div>

                {visibleFleets.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {visibleFleets.map((fleet) => (
                      <VehicleCard key={fleet.name} fleet={fleet} />
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-[760px] flex-col items-center justify-center rounded-lg border border-[#dbe2ea] bg-white px-6 py-16 text-center">
                    <h2 className="text-2xl font-black text-[#08111f]">No vehicles found</h2>
                    <p className="mt-2 text-sm font-medium text-[#667085]">Try clearing a filter or searching another model.</p>
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-6 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#0A0A0A]"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}

                {filteredFleets.length > ITEMS_PER_PAGE && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className={`bg-white px-4 sm:px-6 lg:px-8 ${SECTION_Y}`}>
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
              Choose Your Service
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0f0e0c] sm:text-4xl">
              Simple options for{" "}
              <span className="text-[#D4AF37]">every journey</span>
            </h2>
          </div>
          <ServiceCardsGrid />
        </section>
      )}
        </motion.div>
      </AnimatePresence>

     <VideoStatsSection/>
    
     <div className="mx-auto  text-center ">
    <TestimonialsSection testimonialStart={testimonialStart} setTestimonialStart={setTestimonialStart} />  

</div>
     <div className="mx-auto text-center">
      
<FaqSection compact/>
</div>

 <section className={`relative flex w-full items-center justify-center overflow-hidden bg-white px-4 sm:px-6 lg:px-10 ${SECTION_Y_END}`}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <span className="text-[7rem] font-bold tracking-tighter text-slate-900 select-none sm:text-[10rem] lg:text-[20rem]">
          ASIA
        </span>
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-muted text-[#D4AF37]"
        >
          <span className="text-2xl font-bold">{"✦"}</span>
        </motion.div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Ready to elevate <span className="text-[#D4AF37]">your journey?</span>
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          Tailored luxury transport services for executive and private travel.
        </p>

        <div className="group relative mt-8 sm:mt-10">
          <Link
            href="/contact-us"
            className="relative z-10 block rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-[#0A0A0A] transition-transform duration-300 hover:scale-105 active:scale-95 sm:px-10"
          >
            Contact Us
          </Link>

          <div className="absolute left-1/2 top-full mt-4 hidden h-[1px] w-0 -translate-x-1/2 bg-[#D4AF37] transition-all duration-500 group-hover:w-32 sm:block" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:mt-12 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-soft" />
            24/7 Support
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-soft" />
            Secure Booking
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-4 hidden h-20 w-[1px] bg-gradient-to-t from-brand-soft to-transparent sm:left-10 sm:block" />
      <div className="absolute right-4 top-0 hidden h-20 w-[1px] bg-gradient-to-b from-brand-soft to-transparent sm:right-10 sm:block" />
    </section>

    <section className={SECTION_Y}>
      <LahoreServiceMap />
    </section>
    </main>
  );
}

function VehicleCard({ fleet }: { fleet: Fleet }) {
  const slug = getFleetSlug(fleet.name);
  const highlights = fleet.highlights?.slice(0, 3) ?? [];

  return (
    <article className="fleet-card group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e8e4de] bg-white shadow-none">
      <div className="relative h-64 w-full overflow-hidden bg-[#f0eeea]">
        <Image
          src={fleet.image}
          alt={fleet.imageAlt}
          fill
          quality={100}
          className="object-cover object-center md:transition-transform md:duration-700 md:group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="absolute bottom-3 right-3 rounded-full bg-[#D4AF37] px-3.5 py-1.5 text-[11px] font-bold text-[#0A0A0A] shadow-md">
          PKR {formatPrice(fleet.price)}
          <span className="ml-1 font-medium opacity-70">/day</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-xl font-bold tracking-tight text-[#0f0e0c]">
          {fleet.name}
        </h3>

        <div className="mt-4 space-y-2.5 border-y border-[#efebe6] py-3.5">
          {highlights.map((highlight) => (
            <div
              key={`${fleet.name}-${highlight.label}`}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="font-medium text-[#9a9188]">{highlight.label}</span>
              <span className="font-bold text-[#0f0e0c]">
                {typeof highlight.value === "boolean"
                  ? highlight.value
                    ? "Yes"
                    : "No"
                  : highlight.value}
              </span>
            </div>
          ))}
        </div>

        <Link
          href={`/services/${slug}`}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] py-3.5 text-sm font-bold text-[#0A0A0A] md:bg-[#0f0e0c] md:text-white md:hover:bg-[#D4AF37] md:hover:text-[#0A0A0A]"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-8 flex justify-center border-t border-[#efe6dc] pt-6">
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#eadfd6] bg-[#fbfaf8] p-2 shadow-[0_14px_34px_rgba(35,27,21,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-full border border-[#e4d7cc] bg-white px-4 py-2 text-sm font-bold text-[#4d443d] shadow-sm transition-all hover:border-[#B8860B]/50 hover:bg-[#F5E9C8] hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:text-[#a79a90] disabled:opacity-70 disabled:hover:border-[#e4d7cc] disabled:hover:bg-white disabled:hover:text-[#a79a90]"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 rounded-full border text-sm font-black transition-all ${
            currentPage === page
              ? "border-[#B8860B] bg-[#D4AF37] text-[#0A0A0A]"
              : "border-[#e4d7cc] bg-white text-[#4d443d] hover:border-[#B8860B]/50 hover:bg-[#F5E9C8] hover:text-[#D4AF37]"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-full border border-[#e4d7cc] bg-white px-4 py-2 text-sm font-bold text-[#4d443d] shadow-sm transition-all hover:border-[#B8860B]/50 hover:bg-[#F5E9C8] hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:text-[#a79a90] disabled:opacity-70 disabled:hover:border-[#e4d7cc] disabled:hover:bg-white disabled:hover:text-[#a79a90]"
      >
        Next
      </button>
      </div>
    </div>
  );
}
