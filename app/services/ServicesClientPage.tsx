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
  Check,
  ChevronDown,
  Fuel,
  Gem,
  LucideIcon,
  Plane,
  Route,
  Search,
  Snowflake,
  Users,
} from "lucide-react";
import { fleets, getFleetSlug, type Fleet } from "@/Data/cars";
import { services } from "./servicesData";
import { motion } from "framer-motion";
import QuickBookingForm from "@/Components/QuickBookingForm";
import CtaBannerSection from "@/Components/CtaBannerSection";
import FaqSection from "@/Components/FaqSection";
import { TestimonialsSection, VideoStatsSection } from "../about-us/page";

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
  { icon: Plane, image: "/hero-bg.jpg", accent: "Airport ready", tag: "Premium Ã‚Â· Coordinated", stat1: "24/7", label1: "Always On", stat2: "0 min", label2: "Wait Time" },
  { icon: BriefcaseBusiness, image: "/2023-BMW-i7-exterior-1-scaled.jpg", accent: "Executive class", tag: "Business Ã‚Â· Reliable", stat1: "14+", label1: "Fleet Size", stat2: "100%", label2: "On-time Rate" },
  { icon: Gem, image: "/range-rover-vogue-01.webp", accent: "Luxury fleet", tag: "Exclusive Ã‚Â· Premium", stat1: "14+", label1: "Vehicles", stat2: "5Ã¢Ëœâ€¦", label2: "Rated Fleet" },
  { icon: Route, image: "/Badshahi_Mosque_front_picture.jpg", accent: "Made to plan", tag: "Flexible Ã‚Â· Planned", stat1: "Any", label1: "Destination", stat2: "Full", label2: "Coordination" },
  { icon: CalendarHeart, image: "/black.jpeg", accent: "Event perfect", tag: "VIP Ã‚Â· Memorable", stat1: "500+", label1: "Events Done", stat2: "VIP", label2: "Treatment" },
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

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Passengers", value: "passengers-desc" },
];

const serviceIcons: Record<string, LucideIcon> = {
  "airport-transfer": Plane,
  "corporate-tours": BriefcaseBusiness,
  "luxury-vehicles": Gem,
  "custom-itineraries": Route,
  "events-wedding": CalendarHeart,
  "chauffeur-service": CarFront,
};

function getHighlightValue(fleet: Fleet, label: string) {
  return fleet.highlights?.find((highlight) => highlight.label === label)?.value;
}

function getPassengers(fleet: Fleet) {
  const value = getHighlightValue(fleet, "Passengers");
  return typeof value === "number" ? value : Number(value) || 0;
}

function getFuel(fleet: Fleet) {
  const value = getHighlightValue(fleet, "Fuel");
  return typeof value === "string" ? value : "Petrol";
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
    <main className="w-full max-w-[100vw] overflow-x-clip text-[#080b10]" 
    >
   <div className="px-3 pb-6 sm:px-5 sm:pb-8 lg:px-7">
      <section className="relative mx-auto w-full max-w-[1800px] pb-5 sm:pb-7 lg:pb-9">
 
        {/* Ã¢â€â‚¬Ã¢â€â‚¬ Hero Image Container Ã¢â€â‚¬Ã¢â€â‚¬ */}
        <div className="relative min-h-[620px] overflow-hidden rounded-[28px] sm:min-h-[700px] sm:rounded-[36px] lg:min-h-[820px] lg:rounded-[46px]">
 
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/2023-BMW-i7-exterior-1-scaled.jpg"
              alt="Premium car parked on an open road"
              fill
              priority
              className="object-cover object-[62%_center]"
              sizes="100vw"
            />
          </div>
 
          {/* Dark overlays */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.65)_50%,rgba(0,0,0,0.30)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.05)_50%,rgba(0,0,0,0.80)_100%)]" />
 
          {/* Grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
           
              backgroundSize: "60px 60px",
            }}
          />
 

          {/* Orange radial glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: "700px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(255,69,0,0.07) 0%, transparent 70%)",
            }}
          />
 

          {/* Side glow lines */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[linear-gradient(180deg,transparent,rgba(255,69,0,0.2),transparent)]" />
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-[linear-gradient(180deg,transparent,rgba(255,69,0,0.2),transparent)]" />
 
          {/* Ã¢â€â‚¬Ã¢â€â‚¬ Main Content Ã¢â‚¬â€ Centered Ã¢â€â‚¬Ã¢â€â‚¬ */}
          <div className="relative z-10 flex min-h-[620px] w-full flex-col items-center justify-center px-5 py-16 text-center sm:min-h-[700px] sm:px-8 sm:py-14 lg:min-h-[820px] lg:px-12">
 
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: easeCurve }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-7 bg-[#ff4500]" />
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#ff4500]">
                Asia Tours Services
              </p>
              <span className="h-px w-7 bg-[#ff4500]" />
            </motion.div>
 
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeCurve }}
              className="max-w-[14ch] text-[2.8rem] font-black leading-[1.04] tracking-[-2px] text-white sm:text-6xl lg:text-[4.8rem]"
            >
              Premium{" "}
              <em className="not-italic text-[#ff4500]">mobility</em>{" "}
              for every{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.35)" }}
              >
                destination.
              </span>
            </motion.h1>
 
            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: easeCurve }}
              className="mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-base"
            >
              From airport arrivals to executive city travel, wedding movements, and private intercity
              journeys, we deliver a service-first experience with luxury vehicles and meticulous coordination.
            </motion.p>
 
            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: easeCurve }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff4500] px-9 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_18px_45px_rgba(255,69,0,0.30)] transition-all hover:-translate-y-0.5 hover:bg-[#d83a00]"
              >
               
                Book a Service <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#fleet-showcase"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-black/20 px-9 py-4 text-sm font-black text-white/70 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
              >
                Explore Fleet
              </Link>
            </motion.div>
 
          </div>
        </div>
      <QuickBookingForm easeCurve={easeCurve} />
      </section>
    </div>

      <section className="bg-white pt-10">
        <div className="mx-auto flex w-fit items-center justify-center rounded-full border border-[#eadfd6] bg-[#fbfaf8] p-1 shadow-sm">
          {[
            { label: "Our Fleet", value: "fleet" as const },
            { label: "Our Services", value: "services" as const },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setContentTab(tab.value)}
              className={`rounded-full px-6 py-3 text-xs font-black uppercase tracking-[0.12em] transition-all sm:text-sm ${
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



      {contentTab === "fleet" ? (
        <section id="fleet-showcase" className="bg-white px-4 pb-24 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 border-b border-[#efe6dc] pb-10 text-center">
              <p className="inline-flex rounded-full border border-[#f3d5c6] bg-[#fff7f2] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-[#ff4500]">
                Curated Luxury Fleet
              </p>
              <h2 className="whitespace-nowrap text-3xl font-black leading-tight tracking-tight text-[#08111f] sm:text-4xl lg:text-5xl">
                Premium cars.{" "}
                <span className="text-[#ff4500]">Private chauffeurs.</span>
              </h2>
              <p className="max-w-lg text-sm font-medium leading-7 text-[#5f6877]">
                Luxury sedans, SUVs, and vans for airport transfers, business travel, weddings, and city rides.
              </p>
            </div>

            <div className="pt-6">
              <div className="min-w-0">
                <div className="mb-8 flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-12 shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9ca3af]">Type</span>
                    {(["All", "SUV", "Sedan", "Luxury", "4x4 Pickup", "Van"] as VehicleType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setVehicleType(type);
                          resetPage();
                        }}
                        className={`rounded-full border px-4 py-1.5 text-[13px] transition-all ${
                          vehicleType === type
                            ? "border-[#ff4500] bg-[#ff4500] font-medium text-white"
                            : "border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#ff4500] hover:text-[#ff4500]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-12 shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9ca3af]">Price</span>
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
                        className={`rounded-full border px-4 py-1.5 text-[13px] transition-all ${
                          priceFilter === opt.value
                            ? "border-[#ff4500] bg-[#ff4500] font-medium text-white"
                            : "border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#ff4500] hover:text-[#ff4500]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}

                    <div className="relative ml-auto">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9ca3af]" />
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          resetPage();
                        }}
                        placeholder="Search vehicles..."
                        className="w-56 rounded-full border border-[#e2e8f0] bg-white py-1.5 pl-9 pr-4 text-[13px] text-[#0f172a] outline-none placeholder:text-[#9ca3af] focus:border-[#ff4500]"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-[#667085]">
                    Showing <span className="font-black text-[#ff4500]">{visibleFleets.length}</span> of{" "}
                    <span className="font-black text-[#08111f]">{filteredFleets.length}</span> vehicles
                  </p>
                  <div className="relative">
                    <Listbox
                      value={sortOption}
                      onChange={(value) => {
                        setSortOption(value);
                        resetPage();
                      }}
                    >
                      <ListboxButton className="flex items-center gap-2 rounded-full border border-[#d7dde7] bg-white px-5 py-3 text-sm font-black text-[#08111f] outline-none transition-colors hover:border-[#08111f] focus:border-[#ff4500]">
                        <span>
                          {sortOptions.find((o) => o.value === sortOption)?.label}
                        </span>
                        <ChevronDown className="h-4 w-4 text-[#667085]" />
                      </ListboxButton>

                      <ListboxOptions
                        anchor="bottom end"
                        className="z-50 mt-2 w-[220px] overflow-hidden rounded-2xl border border-[#d7dde7] bg-white p-1 shadow-[0_18px_45px_rgba(15,23,42,0.12)] focus:outline-none"
                      >
                        {sortOptions.map((option) => (
                          <ListboxOption
                            key={option.value}
                            value={option.value}
                            className="group flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-[#475467] transition-colors data-[focus]:bg-[#f6f7f9] data-[focus]:text-[#08111f]"
                          >
                            <span>{option.label}</span>
                            <Check className="invisible h-4 w-4 text-[#ff4500] group-data-[selected]:visible" />
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Listbox>
                  </div>
                </div>

                {visibleFleets.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
                      className="mt-6 rounded-full bg-[#ff4500] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white"
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
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ff4500]">Choose Your Service</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0f0e0c] sm:text-4xl">
              Simple options for every journey.
            </h2>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </section>
      )}
<CtaBannerSection/>
     <VideoStatsSection/>
     <LahoreServiceMap/>
     <div className="mx-auto mt-16  text-center ">
    <TestimonialsSection testimonialStart={testimonialStart} setTestimonialStart={setTestimonialStart} />  

</div>
     <div className="mx-auto mt-16  text-center">
      
<FaqSection/>
</div>

 <section className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-[28px] bg-white px-4 py-14 sm:min-h-[360px] sm:rounded-[36px] sm:px-6 lg:min-h-[400px] lg:px-10">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <span className="text-[7rem] font-bold tracking-tighter text-slate-900 select-none sm:text-[10rem] lg:text-[20rem]">
          ASIA
        </span>
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#ff4500]"
        >
          <span className="text-2xl font-bold">{"✦"}</span>
        </motion.div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Ready to elevate <span className="text-[#ff4500]">your journey?</span>
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          Tailored luxury transport services for executive and private travel.
        </p>

        <div className="group relative mt-8 sm:mt-10">
          <Link
            href="/contact-us"
            className="relative z-10 block rounded-full bg-[#ff4500] px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:scale-105 active:scale-95 sm:px-10"
          >
            Contact Us
          </Link>

          <div className="absolute left-1/2 top-full mt-4 hidden h-[1px] w-0 -translate-x-1/2 bg-[#ff4500] transition-all duration-500 group-hover:w-32 sm:block" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:mt-12 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-200" />
            24/7 Support
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-200" />
            Secure Booking
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-4 hidden h-20 w-[1px] bg-gradient-to-t from-orange-100 to-transparent sm:left-10 sm:block" />
      <div className="absolute right-4 top-0 hidden h-20 w-[1px] bg-gradient-to-b from-orange-100 to-transparent sm:right-10 sm:block" />
    </section>
    </main>
  );
}

function VehicleCard({ fleet }: { fleet: Fleet }) {
  const passengers = getPassengers(fleet);
  const fuel = getFuel(fleet);
  const slug = getFleetSlug(fleet.name);
  const type = getVehicleType(fleet);

  return (
    <Link href={`/services/${slug}`} className="block">
      <div className="group cursor-pointer overflow-hidden rounded-2xl border border-[#e8edf4] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff4500]/40 hover:shadow-[0_8px_24px_rgba(255,69,0,0.10)]">
        <div className="relative h-[200px] overflow-hidden bg-[#f8fafc]">
          <Image
            src={fleet.image}
            alt={fleet.imageAlt}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff4500] backdrop-blur-sm">
            {type}
          </span>
          <span className="absolute bottom-3 right-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-black text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="p-4">
          <p className="mb-3 line-clamp-2 text-[13px] font-semibold leading-snug text-[#0f172a] transition-colors group-hover:text-[#ff4500]">{fleet.name}</p>
          <div className="mb-3 flex items-baseline justify-between">
            <span className="text-[17px] font-semibold text-[#0f172a]">{formatPrice(fleet.price)}</span>
            <span className="text-[10px] uppercase tracking-wide text-[#94a3b8]">PKR/day</span>
          </div>

          <div className="flex items-center gap-3 border-t border-[#f1f5f9] pt-3">
            <div className="flex items-center gap-1 text-[11px] text-[#64748b]">
              <Users className="h-3.5 w-3.5" />
              {passengers}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#64748b]">
              <Fuel className="h-3.5 w-3.5" />
              {fuel}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#64748b]">
              <Snowflake className="h-3.5 w-3.5" />
              A/C
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const Icon = serviceIcons[service.slug] ?? CarFront;

  return (
    <article className="group relative overflow-hidden rounded-[20px] border border-[#eadfd6] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#dacdc2] hover:shadow-[0_16px_40px_rgba(35,27,21,0.08)]">
      <span className="pointer-events-none absolute right-5 top-5 text-4xl font-black leading-none text-[#f4eee9]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-[#eadfd6] bg-[#fbfaf8] text-[#ff4500]">
        <Icon className="h-5 w-5" />
      </div>

      <h2 className="relative z-10 mt-5 text-xl font-black text-[#0f0e0c]">{service.title}</h2>
      <p className="relative z-10 mt-2 line-clamp-3 text-sm leading-6 text-[#746b61]">{service.summary}</p>

      <div className="relative z-10 mt-5 space-y-2 border-t border-[#f0ebe4] pt-4">
        {service.highlights.slice(0, 2).map((highlight) => (
          <div key={highlight} className="flex items-start gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#ff4500]" />
            <span className="text-xs font-semibold text-[#5f574f]">{highlight}</span>
          </div>
        ))}
      </div>

      <Link
        href={`/services/${service.slug}`}
        className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-black text-[#0f0e0c] transition-all hover:gap-3 hover:text-[#ff4500]"
      >
        Learn More <ArrowRight className="h-4 w-4" />
      </Link>
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
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-[#f0ebe4] pt-6">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-full border border-[#ded6cd] bg-white px-4 py-2 text-sm font-bold text-[#0f0e0c] transition-colors hover:border-[#0f0e0c] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#ded6cd]"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 rounded-full text-sm font-black transition-colors ${
            currentPage === page ? "bg-[#0f0e0c] text-white" : "border border-[#ded6cd] bg-white text-[#0f0e0c] hover:border-[#0f0e0c]"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-full border border-[#ded6cd] bg-white px-4 py-2 text-sm font-bold text-[#0f0e0c] transition-colors hover:border-[#0f0e0c] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#ded6cd]"
      >
        Next
      </button>
    </div>
  );
}
