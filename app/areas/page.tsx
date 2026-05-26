"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Search, X } from "lucide-react";
import { areas } from "./areasData";
import { LahoreServiceMap } from "../HomePageContent";
import QuickBookingForm from "@/Components/QuickBookingForm";


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
    
      <AreasDirectory
        search={search}
        groupedAreas={groupedAreas}
        filteredAreas={filteredAreas}
        onSearchChange={setSearch}
      />
     <LahoreServiceMap/>
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

function HeroSection() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  return (
    <section className="px-3 pb-6 pt-4 sm:px-5 sm:pb-8 lg:px-7">
      <div className="relative mx-auto w-full max-w-[1800px]">
        <div className="relative min-h-[620px] overflow-hidden rounded-[28px] sm:min-h-[700px] sm:rounded-[36px] lg:min-h-[760px] lg:rounded-[46px] xl:min-h-[800px]">
          <Image
            src="/hero-bg.jpg"
            alt="Luxury chauffeur service coverage areas"
            fill
            priority
            className="object-cover object-[72%_center] lg:object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.86),rgba(0,0,0,0.72),rgba(0,0,0,0.52))] md:bg-[linear-gradient(115deg,rgba(0,0,0,0.84),rgba(0,0,0,0.68),rgba(0,0,0,0.30))] lg:bg-gradient-to-r lg:from-[rgba(0,0,0,0.86)] lg:via-[rgba(0,0,0,0.52)] lg:to-[rgba(0,0,0,0.14)]"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

          <div className="relative z-10 flex min-h-[620px] w-full items-center justify-center px-5 py-12 sm:min-h-[700px] sm:px-8 sm:py-14 lg:min-h-[760px] lg:px-12 xl:px-[4.5rem]">
            <div className="grid w-full place-items-center">
              <div className="mx-auto max-w-4xl text-center">
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: easeCurve }}
                  className="mb-5 inline-flex items-center justify-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff4500]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ff4500] sm:text-xs sm:tracking-[0.28em]">
                    Complete Area Directory
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: easeCurve }}
                  className="mx-auto max-w-5xl text-[2.45rem] font-black leading-[0.96] tracking-tight text-white sm:text-5xl lg:text-[4.1rem] xl:text-[4.9rem]"
                >
                  <span className="block whitespace-nowrap">
                    Find your <span className="text-[#ff4500]">pickup</span>
                  </span>
                  <span className="block whitespace-nowrap">or destination city.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: easeCurve }}
                  className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/72 sm:text-base lg:text-lg"
                >
                  Chauffeur-driven cars for airport transfers, business travel, weddings, family tours, and long-distance routes across Pakistan.
                </motion.p>


                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65, ease: easeCurve }}
                  className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                >
                  <Link
                    href="#coverage-map"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff4500] px-8 py-3.5 text-sm font-bold text-white shadow-[0_20px_45px_rgba(255,69,0,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e63e00]"
                  >
                    View Coverage <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#area-directory"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/12"
                  >
                    Browse Cities
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </motion.div>

         
              </div>

     
            </div>
          </div>
        </div>
      </div>
      <QuickBookingForm easeCurve={easeCurve} />
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
    <section id="area-directory" className=" px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ff4500]">Complete Area Directory</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-[34px]">
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

      <div className="grid grid-cols-1 gap-0 border-l border-t border-[#ececec] sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((area) => (
          <motion.div key={area.slug} variants={fadeUp}>
            <Link
              href={`/areas/${area.slug}`}
              className="group relative flex h-full items-center justify-between overflow-hidden border-b border-r border-[#ececec] bg-white px-[26px] py-6 text-inherit no-underline transition-all duration-300 hover:bg-[#fafafa] hover:pl-[34px]"
            >
              <span className="absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-[#ff4500] transition-transform duration-300 group-hover:origin-top group-hover:scale-y-100" />
              <div>
                <p className="font-['Playfair_Display'] text-[26px] font-semibold leading-[1.05] tracking-[-0.015em] text-[#0e0e10] transition-colors duration-300 group-hover:text-[#ff4500]">
                  {area.name}
                </p>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#6b6b73]">{area.province}</p>
              </div>
              <ArrowUpRight className="ml-3 h-[18px] w-[18px] flex-shrink-0 text-[#6b6b73] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#ff4500]" />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
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
