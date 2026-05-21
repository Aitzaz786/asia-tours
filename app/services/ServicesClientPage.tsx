"use client";

import { useMemo, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
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
  ShieldCheck,
  SlidersHorizontal,
  Snowflake,
  TimerReset,
  Users,
  X,
} from "lucide-react";
import { fleets, getFleetSlug, type Fleet } from "@/Data/cars";
import { services } from "./servicesData";
import { motion } from "framer-motion";
import QuickBookingForm from "@/Components/QuickBookingForm";

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

const standards = [
  {
    title: "Fast Response",
    description: "Quick confirmations, itinerary updates, and booking support whenever plans change.",
    icon: TimerReset,
  },
  {
    title: "Professional Drivers",
    description: "Courteous chauffeurs trained for punctuality, presentation, and guest comfort.",
    icon: Users,
  },
  {
    title: "Secure Travel",
    description: "Insured vehicles, dependable scheduling, and quality checks before every booking.",
    icon: ShieldCheck,
  },
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
type FuelFilter = "All" | "Petrol" | "Diesel";
type PassengerFilter = "Any" | "4" | "5" | "7+" | "14+";
type SortOption = "price-asc" | "price-desc" | "passengers-desc";
type ContentTab = "fleet" | "services";

const ITEMS_PER_PAGE = 9;

const priceOptions: { label: string; value: PriceFilter }[] = [
  { label: "Under 15,000", value: "under-15000" },
  { label: "15k - 30k", value: "15000-30000" },
  { label: "30k - 50k", value: "30000-50000" },
  { label: "50k+", value: "50000-plus" },
];

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Passengers", value: "passengers-desc" },
];

const vehicleTypes: VehicleType[] = ["All", "SUV", "Sedan", "Luxury", "4x4 Pickup", "Van"];
const fuelTypes: FuelFilter[] = ["All", "Petrol", "Diesel"];
const passengerOptions: PassengerFilter[] = ["Any", "4", "5", "7+", "14+"];

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

function matchesPassengers(fleet: Fleet, passengerFilter: PassengerFilter) {
  const passengers = getPassengers(fleet);

  if (passengerFilter === "Any") return true;
  if (passengerFilter === "7+") return passengers >= 7;
  if (passengerFilter === "14+") return passengers >= 14;
  return passengers === Number(passengerFilter);
}

export default function ServicesClientPage() {
  const [activeTab, setActiveTab] = useState(services[0]?.slug ?? "");
  const activeService = services.find((service) => service.slug === activeTab) ?? services[0];
  const activeIndex = Math.max(services.findIndex((service) => service.slug === activeTab), 0);
  const activeVisual = serviceVisuals[activeIndex % serviceVisuals.length];
  const ActiveIcon = activeVisual.icon;
  const activeNumber = String(activeIndex + 1).padStart(2, "0");
  const [contentTab, setContentTab] = useState<ContentTab>("fleet");
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [vehicleType, setVehicleType] = useState<VehicleType>("All");
  const [fuelFilter, setFuelFilter] = useState<FuelFilter>("All");
  const [passengerFilter, setPassengerFilter] = useState<PassengerFilter>("Any");
  const [sortOption, setSortOption] = useState<SortOption>("price-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const hasActiveFilters =
    search.trim() ||
    priceFilter !== "all" ||
    vehicleType !== "All" ||
    fuelFilter !== "All" ||
    passengerFilter !== "Any";

  const resetPage = () => setCurrentPage(1);

  const clearFilters = () => {
    setSearch("");
    setPriceFilter("all");
    setVehicleType("All");
    setFuelFilter("All");
    setPassengerFilter("Any");
    setCurrentPage(1);
  };

  const filteredFleets = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = fleets.filter((fleet) => {
      const fuel = getFuel(fleet);
      const type = getVehicleType(fleet);

      return (
        (!query || fleet.name.toLowerCase().includes(query)) &&
        matchesPrice(fleet, priceFilter) &&
        (vehicleType === "All" || type === vehicleType) &&
        (fuelFilter === "All" || fuel === fuelFilter) &&
        matchesPassengers(fleet, passengerFilter)
      );
    });

    return [...result].sort((a, b) => {
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "passengers-desc") return getPassengers(b) - getPassengers(a);
      return a.price - b.price;
    });
  }, [fuelFilter, passengerFilter, priceFilter, search, sortOption, vehicleType]);

  const totalPages = Math.max(1, Math.ceil(filteredFleets.length / ITEMS_PER_PAGE));
  const visibleFleets = filteredFleets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const filters = (
    <FiltersPanel
      search={search}
      priceFilter={priceFilter}
      vehicleType={vehicleType}
      fuelFilter={fuelFilter}
      passengerFilter={passengerFilter}
      hasActiveFilters={Boolean(hasActiveFilters)}
      onSearchChange={(value) => {
        setSearch(value);
        resetPage();
      }}
      onPriceChange={(value) => {
        setPriceFilter(value);
        resetPage();
      }}
      onVehicleTypeChange={(value) => {
        setVehicleType(value);
        resetPage();
      }}
      onFuelChange={(value) => {
        setFuelFilter(value);
        resetPage();
      }}
      onPassengerChange={(value) => {
        setPassengerFilter(value);
        resetPage();
      }}
      onClear={clearFilters}
    />
  );

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

      <section className="border-b border-[#e8e2da] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          {[
            { label: "Our Fleet", value: "fleet" as const },
            { label: "Our Services", value: "services" as const },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setContentTab(tab.value)}
              className={`border-b-2 px-6 py-4 text-sm font-black uppercase tracking-[0.12em] transition-colors ${
                contentTab === tab.value
                  ? "border-[#ff4500] text-[#ff4500]"
                  : "border-transparent text-[#746b61] hover:text-[#0f0e0c]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {contentTab === "fleet" ? (
        <section id="fleet-showcase" className=" px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 lg:hidden">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0f0e0c] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
              <aside className="hidden lg:block">
                <div className="sticky top-[100px] h-fit">{filters}</div>
              </aside>

              <div className="min-w-0">
                <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#e8e2da] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-bold text-[#5f574f]">
                    Showing <span className="text-[#0f0e0c]">{visibleFleets.length}</span> of{" "}
                    <span className="text-[#0f0e0c]">{filteredFleets.length}</span> vehicles
                  </p>
                  <div className="relative">
                    <Listbox
                      value={sortOption}
                      onChange={(value) => {
                        setSortOption(value);
                        resetPage();
                      }}
                    >
                      <ListboxButton className="flex items-center gap-2 rounded-xl border border-[#e8e2da] bg-white px-4 py-3 text-sm font-bold text-[#0f0e0c] outline-none transition-colors hover:border-[#ff4500] focus:border-[#ff4500]">
                        <span>
                          {sortOptions.find((o) => o.value === sortOption)?.label}
                        </span>
                        <ChevronDown className="h-4 w-4 text-[#9b9389]" />
                      </ListboxButton>

                      <ListboxOptions
                        anchor="bottom end"
                        className="z-50 mt-2 w-[200px] overflow-hidden rounded-xl border border-[#e8e2da] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.10)] focus:outline-none"
                      >
                        {sortOptions.map((option) => (
                          <ListboxOption
                            key={option.value}
                            value={option.value}
                            className="group flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-bold text-[#0f0e0c] transition-colors data-[focus]:bg-[#fff4f0] data-[focus]:text-[#ff4500]"
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
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {visibleFleets.map((fleet) => (
                      <VehicleCard key={fleet.name} fleet={fleet} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-[#e8e2da] bg-white px-6 py-16 text-center">
                    <h2 className="text-2xl font-black text-[#0f0e0c]">No vehicles found</h2>
                    <p className="mt-2 text-sm font-medium text-[#71685e]">Try clearing a filter or searching another model.</p>
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
        <section className=" px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </section>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/45"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: easeCurve }}
            className="relative h-full w-[88vw] max-w-[340px] overflow-y-auto  p-4 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ff4500]">Filters</p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-full bg-white p-2 text-[#0f0e0c]"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filters}
          </motion.aside>
        </div>
      )}
    </main>
  );
}

function FiltersPanel({
  search,
  priceFilter,
  vehicleType,
  fuelFilter,
  passengerFilter,
  hasActiveFilters,
  onSearchChange,
  onPriceChange,
  onVehicleTypeChange,
  onFuelChange,
  onPassengerChange,
  onClear,
}: {
  search: string;
  priceFilter: PriceFilter;
  vehicleType: VehicleType;
  fuelFilter: FuelFilter;
  passengerFilter: PassengerFilter;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onPriceChange: (value: PriceFilter) => void;
  onVehicleTypeChange: (value: VehicleType) => void;
  onFuelChange: (value: FuelFilter) => void;
  onPassengerChange: (value: PassengerFilter) => void;
  onClear: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#e8e2da] bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0f0e0c]">Filters</p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-bold text-[#ff4500] underline underline-offset-2"
          >
            Clear all filters
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b0a99f]" />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search vehicles..."
          className="w-full rounded-xl border border-[#e8e2da] bg-white py-3 pl-10 pr-4 text-sm font-semibold text-[#0f0e0c] outline-none placeholder:text-[#b0a99f] transition-colors focus:border-[#ff4500] focus:ring-4 focus:ring-[#ff4500]/15"
        />
      </div>

      <FilterSection label="Daily Rate (PKR)">
        {priceOptions.map((option) => (
          <FilterRow
            key={option.value}
            active={priceFilter === option.value}
            label={option.label}
            onClick={() => onPriceChange(priceFilter === option.value ? "all" : option.value)}
          />
        ))}
      </FilterSection>

      <FilterSection label="Vehicle Type">
        {vehicleTypes.map((type) => (
          <FilterRow
            key={type}
            active={vehicleType === type}
            label={type}
            onClick={() => onVehicleTypeChange(type)}
          />
        ))}
      </FilterSection>

      <FilterSection label="Fuel Type">
        {fuelTypes.map((fuelType) => (
          <FilterRow
            key={fuelType}
            active={fuelFilter === fuelType}
            label={fuelType}
            onClick={() => onFuelChange(fuelType)}
          />
        ))}
      </FilterSection>

      <FilterSection label="Passengers">
        {passengerOptions.map((option) => (
          <FilterRow
            key={option}
            active={passengerFilter === option}
            label={option}
            onClick={() => onPassengerChange(option)}
          />
        ))}
      </FilterSection>
    </div>
  );
}

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="my-4 border-t border-[#f0ebe4] pt-4">
      <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#9b9389]">{label}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function FilterRow({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border-l-2 py-2.5 pl-3 pr-3 text-left text-sm font-bold transition-colors ${
        active
          ? "border-l-[#ff4500] bg-[#fff4f0] text-[#0f0e0c]"
          : "border-l-transparent text-[#0f0e0c] hover:bg-[#fafaf8]"
      }`}
    >
      <span>{label}</span>
      {active && <Check className="h-4 w-4 text-[#ff4500]" />}
    </button>
  );
}

function VehicleCard({ fleet }: { fleet: Fleet }) {
  const passengers = getPassengers(fleet);
  const fuel = getFuel(fleet);
  const slug = getFleetSlug(fleet.name);
  const type = getVehicleType(fleet);

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e8e2da] bg-white transition-all duration-300 hover:border-[#ff4500]/40 hover:shadow-[0_4px_20px_rgba(255,69,0,0.08)]">
      
      {/* Image */}
      <div className="relative h-52 overflow-hidden rounded-t-2xl bg-[#f5f1ec]">
        <Image
          src={fleet.image}
          alt={fleet.imageAlt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#0f0e0c] shadow-sm">
          {type === "Luxury" ? "Luxury" : type}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-black text-[#0f0e0c]">{fleet.name}</h2>
        
        <p className="mt-1 text-base font-black text-[#ff4500]">
          PKR {formatPrice(fleet.price)}
          <span className="text-xs font-semibold text-[#9b9389]"> / day</span>
        </p>

        {/* Specs */}
        <div className="mt-4 flex items-center gap-0 divide-x divide-[#f0ebe4] border-t border-[#f0ebe4] pt-4">
          <div className="flex flex-1 flex-col items-center gap-1 px-2">
            <Users className="h-3.5 w-3.5 text-[#ff4500]" />
            <span className="text-[11px] font-bold text-[#746b61]">{passengers}</span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 px-2">
            <Fuel className="h-3.5 w-3.5 text-[#ff4500]" />
            <span className="text-[11px] font-bold text-[#746b61]">{fuel}</span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-1 px-2">
            <Snowflake className="h-3.5 w-3.5 text-[#ff4500]" />
            <span className="text-[11px] font-bold text-[#746b61]">A/C</span>
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/services/${slug}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f0e0c] py-3 text-sm font-black uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-[#ff4500]"
        >
          View Details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function Spec({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5 px-2 text-center">
      <Icon className="h-4 w-4 flex-shrink-0 text-[#ff4500]" />
      <span className="text-xs font-bold text-[#5f574f]">{label}</span>
    </div>
  );
}

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const Icon = serviceIcons[service.slug] ?? CarFront;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#e8e2da] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff4500]/40 hover:shadow-[0_8px_30px_rgba(255,69,0,0.10)]">
      <span className="pointer-events-none absolute right-4 top-4 text-[4rem] font-black leading-none text-[#f0ebe4]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff4f0] text-[#ff4500]">
        <Icon className="h-6 w-6" />
      </div>

      <h2 className="relative z-10 mt-4 text-xl font-black text-[#0f0e0c]">{service.title}</h2>
      <p className="relative z-10 mt-2 line-clamp-2 text-sm leading-6 text-[#746b61]">{service.summary}</p>

      <div className="relative z-10 mt-4 space-y-2">
        {service.highlights.slice(0, 3).map((highlight) => (
          <div key={highlight} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff4500]" />
            <span className="text-xs font-semibold text-[#5f574f]">{highlight}</span>
          </div>
        ))}
      </div>

      <Link
        href={`/services/${service.slug}`}
        className="relative z-10 mt-6 flex items-center gap-1.5 border-t border-[#f0ebe4] pt-4 text-sm font-black text-[#ff4500] transition-all hover:gap-3"
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
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-full border border-[#ded6cd] bg-white px-4 py-2 text-sm font-bold text-[#0f0e0c] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 rounded-full text-sm font-black ${
            currentPage === page ? "bg-[#ff4500] text-white" : "border border-[#ded6cd] bg-white text-[#0f0e0c]"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-full border border-[#ded6cd] bg-white px-4 py-2 text-sm font-bold text-[#0f0e0c] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
