"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, MapPin } from "lucide-react";
import { fleets, getFleetSlug } from "@/Data/cars";

// ─── Areas mega-menu data ─────────────────────────────────────────────────────
const PUNJAB_PREVIEW = [
  { name: "Lahore", slug: "lahore", description: "Pakistan's cultural capital & primary service hub" },
  { name: "Rawalpindi", slug: "rawalpindi", description: "Twin city of Islamabad, Chaklala airport routes" },
  { name: "Faisalabad", slug: "faisalabad", description: "Industrial city, factory & corporate visits" },
  { name: "Multan", slug: "multan", description: "City of Saints, shrine & cultural tours" },
];

const CAPITAL_NAV = {
  name: "Islamabad",
  slug: "islamabad",
  description: "IATA Airport, Diplomatic Enclave & hill station routes.",
};

const HILL_STATIONS_NAV = [
  { name: "Murree", slug: "murree" },
  { name: "Ayubia", slug: "ayubia" },
  { name: "Nathia Gali", slug: "nathia-gali" },
  { name: "Bhurban", slug: "bhurban" },
  { name: "Patriata", slug: "patriata" },
];

// ─── Nav links ────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Areas", href: "/areas" },
  { label: "Contact Us", href: "/contact-us" },
];

// ─── Framer-motion variants ───────────────────────────────────────────────────
const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.985,
    transition: { duration: 0.13 },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  const fleetLinks = useMemo(
    () =>
      fleets.map((fleet) => ({
        label: fleet.name,
        href: `/services/${getFleetSlug(fleet.name)}`,
      })),
    []
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500;600&display=swap');

        .navbar-root { font-family: 'Jost', sans-serif; }
        .nav-link-item {
          position: relative;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 0.82rem;
          font-weight: 500;
          transition: color 0.3s ease;
          padding-bottom: 4px;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background: #fa3132;
          transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .nav-link-item:hover::after, .nav-link-item.active::after { width: 100%; }
        .nav-link-item.services-link::after { display: none; }
        .nav-link-item.areas-link::after { display: none; }
        .nav-link-text {
          position: relative;
          padding-bottom: 4px;
        }
        .nav-link-text::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background: #fa3132;
          transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .services-link:hover .nav-link-text::after,
        .services-link.active .nav-link-text::after { width: 100%; }
        .areas-link:hover .nav-link-text::after,
        .areas-link.active .nav-link-text::after { width: 100%; }
        .nav-link-item:hover, .nav-link-item.active { color: #fa3132; }
        .cta-btn {
          border: 1px solid #fa3132;
          color: #fa3132;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 10px 22px;
          position: relative;
          overflow: hidden;
          transition: color 0.35s ease;
          background: transparent;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #fa3132;
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 0;
        }
        .cta-btn:hover::before { transform: translateX(0); }
        .cta-btn:hover { color: #ffffff; }
        .cta-btn span { position: relative; z-index: 1; }
        .hamburger span {
          display: block;
          width: 22px;
          height: 1px;
          background: #fa3132;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-5px) rotate(-45deg); }
      `}</style>

      <nav className="navbar-root fixed left-0 right-0 top-0 z-50 border-b border-black/5 bg-white backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[96px] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="Logo" className="w-[156px]" />
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
              {navLinks.map((link) => {
                // ── Services dropdown (unchanged) ──
                if (link.label === "Services") {
                  return (
                    <div
                      key={link.label}
                      className="group relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`nav-link-item services-link inline-flex items-center gap-2 text-[#fa3132] ${isActive(link.href) ? "active" : ""}`}
                      >
                        <span className={`nav-link-text ${isActive(link.href) ? "active" : ""}`}>
                          {link.label}
                        </span>
                        <motion.div
                          animate={{ rotate: servicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center pb-[4px]"
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.div>
                      </Link>

                      <div
                        className="invisible absolute left-1/2 top-full z-50 mt-5 w-[540px] -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
                        onWheel={(event) => event.stopPropagation()}
                      >
                        <div className="overscroll-contain rounded-[28px] border border-[#f2ded7] bg-white p-5 shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
                          <div className="grid grid-cols-[1.05fr_0.95fr] gap-5">
                            <div className="rounded-[24px] bg-[#0a1018] p-5 text-white">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
                                Signature Fleet
                              </p>
                              <h3 className="mt-3 text-2xl font-semibold leading-tight">
                                Browse premium cars directly from the menu
                              </h3>
                              <p className="mt-3 text-sm leading-7 text-white/70">
                                Open any vehicle page for pricing, specs, comfort highlights, and booking-ready details.
                              </p>
                              <Link
                                href="/services"
                                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ff6a35]"
                              >
                                <span>View all services</span>
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            </div>
                            <div
                              className="max-h-[360px] space-y-2 overflow-y-auto overscroll-contain pr-1"
                              data-lenis-prevent
                              onWheel={(event) => event.stopPropagation()}
                            >
                              {fleetLinks.map((fleet) => (
                                <Link
                                  key={fleet.href}
                                  href={fleet.href}
                                  className="flex items-center justify-between rounded-2xl border border-transparent bg-[#fff8f5] px-4 py-3 text-sm font-medium text-[#1a1a1a] transition-all hover:border-[#ffd8cc] hover:bg-[#fff1eb] hover:text-[#fa3132]"
                                >
                                  <span>{fleet.label}</span>
                                  <ChevronRight className="h-4 w-4" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // ── Areas mega-menu (new) ──
                if (link.label === "Areas") {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setAreasOpen(true)}
                      onMouseLeave={() => setAreasOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`nav-link-item areas-link inline-flex items-center gap-2 text-[#fa3132] ${isActive(link.href) ? "active" : ""}`}
                      >
                        <span className={`nav-link-text ${isActive(link.href) ? "active" : ""}`}>
                          {link.label}
                        </span>
                        <motion.div
                          animate={{ rotate: areasOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center pb-[4px]"
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.div>
                      </Link>

                      <AnimatePresence>
                        {areasOpen && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute left-1/2 top-full z-50 mt-5 w-[760px] -translate-x-1/2"
                          >
                            <div className="rounded-[24px] border border-[#f0ebe4] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

                              {/* TOP ROW: 3 BLACK FEATURED CARDS */}
                              <div className="grid grid-cols-3 gap-3">
                                {/* Card 1 - Lahore */}
                                <Link
                                  href="/areas/lahore"
                                  className="flex min-h-[160px] flex-1 flex-col rounded-2xl bg-[#0f0e0c] p-5 transition-all duration-300"
                                >
                                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#ff6a35]">
                                    PUNJAB
                                  </p>
                                  <p className="mt-3 text-xl font-black leading-tight text-white">Lahore</p>
                                  <p className="mt-2 text-xs font-medium leading-relaxed text-white/60">Pakistan&apos;s cultural capital & primary service hub</p>
                                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#ff6a35]">
                                    Book <ChevronRight className="h-3.5 w-3.5" />
                                  </span>
                                </Link>

                                {/* Card 2 - Islamabad */}
                                <Link
                                  href="/areas/islamabad"
                                  className="flex min-h-[160px] flex-1 flex-col rounded-2xl bg-[#0f0e0c] p-5 transition-all duration-300"
                                >
                                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#ff6a35]">
                                    CAPITAL TERRITORY
                                  </p>
                                  <p className="mt-3 text-xl font-black leading-tight text-white">Islamabad</p>
                                  <p className="mt-2 text-xs font-medium leading-relaxed text-white/60">IATA Airport, Diplomatic Enclave & hill routes</p>
                                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#ff6a35]">
                                    Book <ChevronRight className="h-3.5 w-3.5" />
                                  </span>
                                </Link>

                                {/* Card 3 - Murree */}
                                <Link
                                  href="/areas/murree"
                                  className="flex min-h-[160px] flex-1 flex-col rounded-2xl bg-[#0f0e0c] p-5 transition-all duration-300"
                                >
                                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#ff6a35]">
                                    HILL STATIONS
                                  </p>
                                  <p className="mt-3 text-xl font-black leading-tight text-white">Murree</p>
                                  <p className="mt-2 text-xs font-medium leading-relaxed text-white/60">Snow season routes, Mall Road & Kashmir point</p>
                                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#ff6a35]">
                                    Book <ChevronRight className="h-3.5 w-3.5" />
                                  </span>
                                </Link>
                              </div>

                              {/* BOTTOM: Remaining cities list */}
                              <div className="mt-4 border-t border-[#f0ebe4] pt-4">
                                <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                                  {[
                                    'rawalpindi',
                                    'faisalabad',
                                    'multan',
                                    'gujranwala',
                                    'sialkot',
                                    'bahawalpur',
                                    'ayubia',
                                    'nathia-gali',
                                    'bhurban',
                                    'patriata',
                                    'sargodha',
                                    'sheikhupura',
                                  ].map((slug) => (
                                    <Link
                                      key={slug}
                                      href={`/areas/${slug}`}
                                      className="flex items-center gap-2 text-sm font-medium text-[#4b4b4b] transition-colors hover:text-[#ff4500]"
                                    >
                                      <span className="text-[#ff4500]">•</span>
                                      <span className="capitalize">{slug.replace(/-/g, ' ')}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              {/* FOOTER STRIP */}
                              <div className="mt-5 flex items-center justify-between border-t border-[#f0ebe4] pt-4">
                                <p className="text-sm font-medium text-[#8f877d]">45 cities &amp; destinations across Pakistan</p>
                                <Link
                                  href="/areas"
                                  className="inline-flex items-center gap-2 rounded-full bg-[#ff4500] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-[0_4px_14px_rgba(255,69,0,0.22)] transition-all hover:bg-[#d83a00]"
                                >
                                  VIEW ALL AREAS <ChevronRight className="h-3.5 w-3.5" />
                                </Link>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // ── Regular links ──
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`nav-link-item text-[#fa3132] ${isActive(link.href) ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: CTA + hamburger */}
            <div className="flex items-center gap-4">
              <Link href="/contact-us" className="cta-btn hidden md:block">
                <span>Get Started</span>
              </Link>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`hamburger flex flex-col gap-[5px] p-2 md:hidden ${menuOpen ? "open" : ""}`}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ overflow: "hidden" }}
              className="border-t border-[#f3dfd8] bg-white md:hidden"
            >
              <div className="px-4 py-3">
                {navLinks.map((link) => {
                  // ── Mobile Areas accordion ──
                  if (link.label === "Areas") {
                    return (
                      <div
                        key={link.label}
                        className="mb-1 overflow-hidden rounded-2xl border border-[#f3e5df] bg-[#fffaf8]"
                      >
                        <button
                          type="button"
                          onClick={() => setMobileAreasOpen((prev) => !prev)}
                          className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.16em] text-[#fa3132]"
                        >
                          <span>Areas</span>
                          <motion.span
                            animate={{ rotate: mobileAreasOpen ? 180 : 0 }}
                            transition={{ duration: 0.22 }}
                            className="flex items-center"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {mobileAreasOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="space-y-5 border-t border-[#f3e5df] px-4 pb-5 pt-4">

                                {/* Punjab Cities */}
                                <div>
                                  <div className="mb-2.5 flex items-center gap-1.5">
                                    <MapPin className="h-2.5 w-2.5 text-[#ff4500]" />
                                    <p className="text-[9px] font-black uppercase tracking-[0.26em] text-[#ff4500]">
                                      Punjab Cities
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1">
                                    {PUNJAB_PREVIEW.map((area) => (
                                      <Link
                                        key={area.slug}
                                        href={`/areas/${area.slug}`}
                                        onClick={() => setMenuOpen(false)}
                                        className="rounded-xl bg-white px-3 py-2.5 text-[12px] font-medium text-[#333] transition-colors hover:text-[#ff4500]"
                                      >
                                        {area.name}
                                      </Link>
                                    ))}
                                  </div>
                                  <Link
                                    href="/areas"
                                    onClick={() => setMenuOpen(false)}
                                    className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#ff4500]"
                                  >
                                    View All Punjab <ChevronRight className="h-3 w-3" />
                                  </Link>
                                </div>

                                {/* Capital Territory */}
                                <div>
                                  <div className="mb-2.5 flex items-center gap-1.5">
                                    <MapPin className="h-2.5 w-2.5 text-[#ff4500]" />
                                    <p className="text-[9px] font-black uppercase tracking-[0.26em] text-[#ff4500]">
                                      Capital Territory
                                    </p>
                                  </div>
                                  <Link
                                    href="/areas/islamabad"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center justify-between rounded-xl bg-[#0a1018] px-4 py-3 text-[12px] font-semibold text-white"
                                  >
                                    Islamabad
                                    <ChevronRight className="h-3.5 w-3.5 text-[#ff6a35]" />
                                  </Link>
                                </div>

                                {/* Hill Stations */}
                                <div>
                                  <div className="mb-2.5 flex items-center gap-1.5">
                                    <MapPin className="h-2.5 w-2.5 text-[#ff4500]" />
                                    <p className="text-[9px] font-black uppercase tracking-[0.26em] text-[#ff4500]">
                                      Hill Stations
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1">
                                    {HILL_STATIONS_NAV.map((area) => (
                                      <Link
                                        key={area.slug}
                                        href={`/areas/${area.slug}`}
                                        onClick={() => setMenuOpen(false)}
                                        className="rounded-xl bg-white px-3 py-2.5 text-[12px] font-medium text-[#333] transition-colors hover:text-[#ff4500]"
                                      >
                                        {area.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>

                                {/* View All Areas CTA */}
                                <Link
                                  href="/areas"
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#ff4500] px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white shadow-[0_4px_14px_rgba(255,69,0,0.22)]"
                                >
                                  View All Areas <ChevronRight className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  // ── Regular mobile links ──
                  return (
                    <Link
                      href={link.href}
                      key={link.label}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-2 py-4 text-sm font-semibold uppercase tracking-[0.16em] ${
                        isActive(link.href) ? "text-[#fa3132]" : "text-[#2b2b2b]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <div className="pt-3">
                  <Link href="/contact-us" className="cta-btn block w-full text-center">
                    <span>Get Started</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
