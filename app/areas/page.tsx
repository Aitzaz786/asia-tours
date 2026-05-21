"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, Search, X } from "lucide-react";
import { areas } from "./areasData";

const LahoreServiceMap = dynamic(() => import("@/Components/LahoreServiceMap"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

type Province = "Punjab" | "Capital Territory" | "Hill Stations";

const PROVINCES: Province[] = ["Punjab", "Capital Territory", "Hill Stations"];

const coverageStats = [
  { value: "45+", label: "Cities & Destinations" },
  { value: "24/7", label: "Booking Support" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Chauffeur Driven" },
];

const cityMarquee = [
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Murree",
  "Sialkot",
  "Bahawalpur",
  "Nathia Gali",
  "Bhurban",
];

const routeStories = [
  {
    title: "Airport Arrivals",
    text: "Coordinated pickups from Lahore, Islamabad, Sialkot, Faisalabad, Multan, and regional airports.",
  },
  {
    title: "Corporate Movements",
    text: "Executive transfers for offices, industrial zones, meetings, factory visits, and multi-stop business days.",
  },
  {
    title: "Hill Station Routes",
    text: "Comfortable intercity rides for Murree, Ayubia, Nathia Gali, Bhurban, Patriata, and scenic family trips.",
  },
];

export default function AreasPage() {
  const [search, setSearch] = useState("");

  const groupedAreas = useMemo(
    () =>
      PROVINCES.map((province) => ({
        province,
        cities: areas.filter((area) => area.province === province),
      })),
    []
  );

  const filteredAreas = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return areas;

    return areas.filter(
      (area) =>
        area.name.toLowerCase().includes(query) ||
        area.province.toLowerCase().includes(query) ||
        area.highlights.some((highlight) => highlight.toLowerCase().includes(query))
    );
  }, [search]);

  return (
    <main className="min-h-screen overflow-x-clip  text-[#0f0e0c]">
      <style>{`
        @keyframes areasTicker {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>

      <HeroSection />
      <CityTicker />
      <CoverageIntro groupedAreas={groupedAreas} />
      <MapCoverageSection />
      <AreasDirectory
        search={search}
        groupedAreas={groupedAreas}
        filteredAreas={filteredAreas}
        onSearchChange={setSearch}
      />
      <RouteStorySection />
      <BottomCTA />
    </main>
  );
}

function HeroSection() {
  const easeCurve: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

  return (
    <section className="relative min-h-[700px] w-full overflow-hidden pt-0">
      <Image
        src="/Badshahi_Mosque_front_picture.jpg"
        alt="Asia Tours service coverage across Pakistan"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_50%,rgba(0,0,0,0.35)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.12)_48%,rgba(0,0,0,0.82)_100%)]" />

      <div className="relative z-10 flex min-h-[700px] flex-col justify-center px-6 py-20 pt-32 sm:px-10 lg:px-16">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#ff4500]" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff4500]">
              Asia Tours Service Areas
            </p>
            <span className="h-px w-8 bg-[#ff4500]" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-[13ch] text-[3rem] font-black leading-[1.02] tracking-[-2px] text-white sm:text-6xl lg:text-[5.4rem]"
          >
            Premium rides across every key route.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
            Airport pickups, corporate transport, wedding movements, family tours, and hill station routes across
            Punjab, Islamabad, and northern destinations with professional chauffeurs.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#coverage-map"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff4500] px-9 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_18px_45px_rgba(255,69,0,0.30)] transition-all hover:-translate-y-0.5 hover:bg-[#d83a00]"
            >
              View Coverage <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-black/20 px-9 py-4 text-sm font-black text-white/75 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
            >
              Request Your City
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58, ease: easeCurve }}
          className="mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/10 backdrop-blur-md lg:grid-cols-4"
        >
          {coverageStats.map((stat) => (
            <div key={stat.label} className="bg-white/8 px-5 py-5 backdrop-blur-md">
              <p className="text-4xl font-black text-white">{stat.value}</p>
              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/45">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CityTicker() {
  return (
    <section className="overflow-hidden border-y border-[#1a1714] bg-[#0f0e0c] py-4">
      <div className="flex w-max items-center whitespace-nowrap" style={{ animation: "areasTicker 30s linear infinite" }}>
        {[...Array(2)].map((_, group) => (
          <div key={group} className="flex items-center">
            {cityMarquee.map((city) => (
              <span
                key={`${group}-${city}`}
                className="mx-5 inline-flex items-center gap-5 text-xs font-black uppercase tracking-[0.28em] text-white/85 sm:text-sm"
              >
                {city}
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff4500]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function CoverageIntro({ groupedAreas }: { groupedAreas: { province: Province; cities: typeof areas }[] }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.28em] text-[#ff4500]">
            Where We Serve
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            A practical coverage network for real travel needs.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-3 sm:grid-cols-3"
        >
          {groupedAreas.map((group) => (
            <motion.div
              key={group.province}
              variants={fadeUp}
              className="rounded-2xl border border-[#e8e2da] bg-white px-6 py-7 shadow-sm transition-all hover:border-[#ff4500]/30 hover:shadow-[0_4px_20px_rgba(255,69,0,0.08)]"
            >
              <div className="mb-4 h-0.5 w-8 rounded bg-[#ff4500]" />
              <p className="text-4xl font-black text-[#0f0e0c]">{group.cities.length}</p>
              <p className="mt-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#9b9389]">{group.province}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MapCoverageSection() {
  return (
    <section id="coverage-map" className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[32px] border border-[#e8e2da] bg-white shadow-[0_4px_40px_rgba(0,0,0,0.06)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between bg-[#faf8f5] p-7 sm:p-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ff4500]">Live Coverage Map</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              See the service footprint, not just a list.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#746b61] sm:text-base">
              Our map highlights the cities and destinations where Asia Tours arranges chauffeur-driven cars for
              airport transfers, events, executive movement, and intercity routes.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {[
              "Premium car rental with driver",
              "Long-distance route planning",
              "Airport and hotel transfers",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ff4500] text-white">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold text-[#0f0e0c]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-[480px] border-t border-[#e8e2da] bg-[#f0ede8] lg:border-l lg:border-t-0">
          <LahoreServiceMap />
        </div>
      </div>
    </section>
  );
}

function AreasDirectory({
  search,
  groupedAreas,
  filteredAreas,
  onSearchChange,
}: {
  search: string;
  groupedAreas: { province: Province; cities: typeof areas }[];
  filteredAreas: typeof areas;
  onSearchChange: (value: string) => void;
}) {
  const showFiltered = search.trim().length > 0;

  return (
    <section className=" px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ff4500]">Complete Area Directory</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Select your pickup or destination city.
            </h2>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ff4500]" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search service areas..."
              className="w-full rounded-2xl border-2 border-[#e8e2da] bg-white py-4 pl-11 pr-11 text-sm font-bold text-[#0f0e0c] shadow-sm outline-none transition-colors focus:border-[#ff4500]"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-[#fff4f0]"
              >
                <X className="h-4 w-4 text-[#9b9389]" />
              </button>
            )}
          </div>
        </div>

        {showFiltered ? (
          <AreaList title={`${filteredAreas.length} matching areas`} cities={filteredAreas} />
        ) : (
          <div className="space-y-12">
            {groupedAreas.map((group) => (
              <AreaList key={group.province} title={group.province} cities={group.cities} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AreaList({ title, cities }: { title: string; cities: typeof areas }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
      <div className="mb-4 flex items-center gap-4">
        <h3 className="text-xs font-black uppercase tracking-[0.28em] text-[#ff4500]">{title}</h3>
        <span className="h-px flex-1 bg-[#e8e2da]" />
        <span className="text-xs font-bold text-[#9b9389]">{cities.length}</span>
      </div>

      <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((area) => (
          <motion.div key={area.slug} variants={fadeUp}>
            <Link
              href={`/areas/${area.slug}`}
              className="group relative flex items-center justify-between border-b border-[#f0ebe4] py-4 pl-3 transition-all hover:border-[#ff4500]/30 hover:pl-5"
            >
              <div className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded bg-[#ff4500] opacity-0 transition-opacity group-hover:opacity-100" />
              <div>
                <p className="text-xl font-black text-[#0f0e0c] transition-colors group-hover:text-[#ff4500]">{area.name}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#9b9389]">{area.province}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#c4bbb1] transition-all group-hover:translate-x-1 group-hover:text-[#ff4500]" />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function RouteStorySection() {
  return (
    <section className=" px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ff4500]">How We Cover Routes</p>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Every area connects to a real service plan.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[28px] border border-[#e8e2da] bg-[#e8e2da] lg:grid-cols-3">
          {routeStories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-white p-8 transition-all duration-300 hover:bg-[#fff8f4] hover:shadow-inner sm:p-10"
            >
              <p className="text-[6rem] font-black leading-none text-[#ff4500]/10">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 text-xl font-black text-[#0f0e0c]">{story.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#746b61]">{story.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0f0e0c] px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,69,0,0.18),transparent_38%)]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="relative mx-auto max-w-3xl text-center"
      >
        <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.28em] text-[#ff7a4d]">
          Need Another Destination?
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-4 text-5xl font-black tracking-tight text-white sm:text-7xl">
          Tell us the city. We&apos;ll arrange the car.
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/58">
          If your area is not listed, our booking team can still plan the vehicle, chauffeur, timing, and route for you.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-full bg-[#ff4500] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_16px_40px_rgba(255,69,0,0.22)] transition-colors hover:bg-[#e63e00]"
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white/80 transition-colors hover:border-white hover:text-white"
          >
            View Services
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
