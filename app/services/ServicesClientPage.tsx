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
  Gem,
  LucideIcon,
  Plane,
  Route,
  Search,
} from "lucide-react";
import { fleets, getFleetSlug, type Fleet } from "@/Data/cars";
import { services } from "./servicesData";
import { AnimatePresence, motion } from "framer-motion";
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

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={contentTab}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
      {contentTab === "fleet" ? (
        <section id="fleet-showcase" className="bg-white px-4 pb-24 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 pb-10 text-center">
           
              <h2 className="whitespace-nowrap text-3xl font-black leading-tight tracking-tight text-[#08111f] sm:text-4xl lg:text-5xl">
                Premium cars.{" "}
                <span className="text-[#ff4500]">Private chauffeurs.</span>
              </h2>
              <p className="max-w-lg text-sm font-medium leading-7 text-[#5f6877]">
                Luxury sedans, SUVs, and vans for airport transfers, business travel, weddings, and city rides.
              </p>
            </div>

            <div className="pt-6 border-t border-[#efe6dc]">
              <div className="min-w-0">
                <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-[#eadfd6] bg-[#fbfaf8] p-4 shadow-[0_18px_48px_rgba(35,27,21,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-5">
                  <div className="flex flex-wrap items-center gap-2 border-b border-[#eadfd6] pb-3">
                    <span className="inline-flex w-16 shrink-0 items-center justify-center rounded-full border border-[#ff6a2a]/25 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#ff4500] shadow-sm">
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
                            ? "border-[#ff6a2a] bg-[#ff4500] text-white shadow-[0_8px_20px_rgba(255,69,0,0.24)]"
                            : "border-[#e4d7cc] bg-white text-[#4d443d] shadow-sm hover:border-[#ff6a2a]/50 hover:bg-[#fff3ed] hover:text-[#ff4500]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex w-16 shrink-0 items-center justify-center rounded-full border border-[#ff6a2a]/25 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#ff4500] shadow-sm">
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
                            ? "border-[#ff6a2a] bg-[#ff4500] text-white shadow-[0_8px_20px_rgba(255,69,0,0.24)]"
                            : "border-[#e4d7cc] bg-white text-[#4d443d] shadow-sm hover:border-[#ff6a2a]/50 hover:bg-[#fff3ed] hover:text-[#ff4500]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}

                    <div className="relative ml-auto w-full sm:w-auto">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#ff6a2a]" />
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          resetPage();
                        }}
                        placeholder="Search vehicles..."
                        className="w-full rounded-full border border-[#f0d8c9] bg-[#fffaf6] py-2 pl-9 pr-4 text-[13px] font-bold text-[#18130f] outline-none placeholder:text-[#9d8f84] shadow-[0_10px_26px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all focus:border-[#ff6a2a] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,69,0,0.16),0_12px_30px_rgba(0,0,0,0.18)] sm:w-60"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="rounded-full border border-[#efe6dc] bg-[#fbfaf8] px-4 py-2 text-sm font-bold text-[#5b554f] shadow-sm">
                    Showing <span className="font-black text-[#ff4500]">{visibleFleets.length}</span> of{" "}
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
        </motion.div>
      </AnimatePresence>

 <LahoreServiceMap/>

     <VideoStatsSection/>
    
     <div className="mx-auto  text-center ">
    <TestimonialsSection testimonialStart={testimonialStart} setTestimonialStart={setTestimonialStart} />  

</div>
     <div className="mx-auto !mt-16  text-center">
      
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
  const slug = getFleetSlug(fleet.name);
  const type = getVehicleType(fleet);
  const highlights = fleet.highlights?.slice(0, 3) ?? [];

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#eadfd6] bg-white/85 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-2xl transition-shadow duration-300 ease-out hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <div className="relative h-64 w-full overflow-hidden bg-[#f8fafc]">
        <Image
          src={fleet.image}
          alt={fleet.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#ff4500] shadow-[0_8px_18px_rgba(15,23,42,0.12)] backdrop-blur-md">
          {type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <h3 className="line-clamp-1 text-2xl font-extrabold tracking-tight text-gray-950 transition-colors group-hover:text-[#ff4500]">
            {fleet.name}
          </h3>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">PKR</span>
            <span className="text-xl font-black text-gray-950">{formatPrice(fleet.price)}</span>
            <span className="text-xs font-semibold text-gray-500">/ day</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 border-t border-gray-100 pt-4">
          {highlights.map((highlight) => (
            <div key={`${fleet.name}-${highlight.label}`} className="flex items-center justify-between gap-4 text-sm">
              <span className="font-semibold text-gray-500">{highlight.label}</span>
              <span className="font-bold text-gray-950">
                {typeof highlight.value === "boolean" ? (highlight.value ? "Yes" : "No") : highlight.value}
              </span>
            </div>
          ))}
        </div>

        <Link
          href={`/services/${slug}`}
          className="group/btn relative mt-6 block w-full overflow-hidden rounded-xl bg-[#ff4500] py-3.5 text-center text-sm font-black text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#ff4500]/30 active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            View Details
            <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover/btn:rotate-0" />
          </span>
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#ff4500] transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
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
    <div className="mt-8 flex justify-center border-t border-[#efe6dc] pt-6">
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#eadfd6] bg-[#fbfaf8] p-2 shadow-[0_14px_34px_rgba(35,27,21,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-full border border-[#e4d7cc] bg-white px-4 py-2 text-sm font-bold text-[#4d443d] shadow-sm transition-all hover:border-[#ff6a2a]/50 hover:bg-[#fff3ed] hover:text-[#ff4500] disabled:cursor-not-allowed disabled:text-[#a79a90] disabled:opacity-70 disabled:hover:border-[#e4d7cc] disabled:hover:bg-white disabled:hover:text-[#a79a90]"
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
              ? "border-[#ff6a2a] bg-[#ff4500] text-white shadow-[0_8px_20px_rgba(255,69,0,0.24)]"
              : "border-[#e4d7cc] bg-white text-[#4d443d] shadow-sm hover:border-[#ff6a2a]/50 hover:bg-[#fff3ed] hover:text-[#ff4500]"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-full border border-[#e4d7cc] bg-white px-4 py-2 text-sm font-bold text-[#4d443d] shadow-sm transition-all hover:border-[#ff6a2a]/50 hover:bg-[#fff3ed] hover:text-[#ff4500] disabled:cursor-not-allowed disabled:text-[#a79a90] disabled:opacity-70 disabled:hover:border-[#e4d7cc] disabled:hover:bg-white disabled:hover:text-[#a79a90]"
      >
        Next
      </button>
      </div>
    </div>
  );
}
