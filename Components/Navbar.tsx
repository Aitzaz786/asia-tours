"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, MapPin, Menu, X } from "lucide-react";
import { fleets, getFleetSlug } from "@/Data/cars";
import { hasDarkHero } from "@/lib/hasDarkHero";

// ─── Areas mega-menu data ─────────────────────────────────────────────────────
const PUNJAB_PREVIEW = [
  { name: "Lahore", slug: "lahore", description: "Pakistan's cultural capital & primary service hub" },
  { name: "Rawalpindi", slug: "rawalpindi", description: "Twin city of Islamabad, Chaklala airport routes" },
  { name: "Faisalabad", slug: "faisalabad", description: "Industrial city, factory & corporate visits" },
  { name: "Multan", slug: "multan", description: "City of Saints, shrine & cultural tours" },
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
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transparent over dark heroes at top; solid white after scroll or on light pages
  const isTransparent = hasDarkHero(pathname) && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route change: force transparent navbar on dark-hero pages (same as homepage)
  useEffect(() => {
    setMenuOpen(false);
    setMobileAreasOpen(false);
    if (hasDarkHero(pathname)) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setScrolled(false);
    } else {
      setScrolled(window.scrollY > 24);
    }
  }, [pathname]);

  const fleetLinks = useMemo(
    () =>
      fleets.map((fleet) => ({
        label: fleet.name,
        href: `/services/${getFleetSlug(fleet.name)}`,
      })),
    []
  );

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Phone menu backdrop blur */}
      {menuOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-[45] bg-black/45 backdrop-blur-md md:hidden"
          onClick={() => {
            setMenuOpen(false);
            setMobileAreasOpen(false);
          }}
        />
      ) : null}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500;600&display=swap');

        .navbar-root { font-family: 'Jost', sans-serif; }
        .nav-link-item {
          position: relative;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: 0.82rem;
          font-weight: 500;
          padding: 0.62rem 0.25rem;
          transition: color 0.2s ease, text-shadow 0.2s ease;
        }
        .nav-link-text {
          position: relative;
        }
        .navbar-root {
          transition: background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .navbar-root.is-transparent {
          background-color: transparent !important;
          background-image: none !important;
          border-bottom-color: rgba(255, 255, 255, 0.08) !important;
          box-shadow: none !important;
          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;
        }
        .navbar-root.is-solid {
          background-color: #ffffff !important;
          border-bottom-color: rgba(0, 0, 0, 0.05) !important;
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
        }
        .navbar-root.is-solid .nav-link-item {
          color: #4f4943;
        }
        .navbar-root.is-transparent .nav-link-item {
          color: rgba(255, 255, 255, 0.82);
        }
        .navbar-root.is-solid .nav-link-item:hover,
        .navbar-root.is-solid .nav-link-item.active {
          color: #B8860B;
        }
        .navbar-root.is-solid .nav-link-item.active {
          text-shadow: 0 0 12px rgba(212, 175, 55, 0.16);
        }
        .navbar-root.is-transparent .nav-link-item:hover,
        .navbar-root.is-transparent .nav-link-item.active {
          color: #E8C766;
        }
        .navbar-root.is-transparent .nav-link-item.active {
          text-shadow: 0 0 14px rgba(212, 175, 55, 0.24);
        }

        .nav-logo {
          height: auto;
          width: 156px;
          object-fit: contain;
          background: transparent;
          filter: none;
        }
        @media (max-width: 767px) {
          .navbar-root,
          .navbar-root *,
          .navbar-root *::before,
          .navbar-root *::after {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <nav
        className={`navbar-root fixed left-0 right-0 top-0 z-50 border-b ${
          isTransparent ? "is-transparent" : "is-solid"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[96px] items-center justify-between">
            {/* Logo — dark hero uses white+gold variant; white nav uses black+gold */}
            <Link href="/" className="flex items-center gap-3">
              <img
                src={isTransparent ? "/logo-on-dark.webp?v=2" : "/logo.webp?v=2"}
                alt="Asia Tours"
                className="nav-logo"
              />
            </Link>

            {/* ── Desktop Nav (right aligned) ── */}
            <div className="hidden items-center gap-8 md:flex lg:gap-10">
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
                        className={`nav-link-item services-link inline-flex items-center gap-2 text-[#D4AF37] ${isActive(link.href) ? "active" : ""}`}
                      >
                        <span className={`nav-link-text ${isActive(link.href) ? "active" : ""}`}>
                          {link.label}
                        </span>
                        <motion.div
                          animate={{ rotate: servicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center"
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.div>
                      </Link>

                      <div
                        className="invisible absolute right-0 top-full z-50 mt-5 w-[540px] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
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
                                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#B8860B]"
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
                                  className="flex items-center justify-between rounded-2xl border border-transparent bg-[#F5E9C8] px-4 py-3 text-sm font-medium text-[#1a1a1a] transition-all hover:border-[#E8C766] hover:bg-[#F5E9C8] hover:text-[#D4AF37]"
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
                        className={`nav-link-item areas-link inline-flex items-center gap-2 text-[#D4AF37] ${isActive(link.href) ? "active" : ""}`}
                      >
                        <span className={`nav-link-text ${isActive(link.href) ? "active" : ""}`}>
                          {link.label}
                        </span>
                        <motion.div
                          animate={{ rotate: areasOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center"
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
                            className="absolute right-0 top-full z-50 mt-5 w-[760px]"
                          >
                            <div className="rounded-[24px] border border-[#f0ebe4] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

                              {/* TOP ROW: 3 BLACK FEATURED CARDS */}
                              <div className="grid grid-cols-3 gap-3">
                                {/* Card 1 - Lahore */}
                                <Link
                                  href="/areas/lahore"
                                  className="flex min-h-[160px] flex-1 flex-col rounded-2xl bg-[#0f0e0c] p-5 transition-all duration-300"
                                >
                                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#B8860B]">
                                    PUNJAB
                                  </p>
                                  <p className="mt-3 text-xl font-black leading-tight text-white">Lahore</p>
                                  <p className="mt-2 text-xs font-medium leading-relaxed text-white/60">Pakistan&apos;s cultural capital & primary service hub</p>
                                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#B8860B]">
                                    Book <ChevronRight className="h-3.5 w-3.5" />
                                  </span>
                                </Link>

                                {/* Card 2 - Islamabad */}
                                <Link
                                  href="/areas/islamabad"
                                  className="flex min-h-[160px] flex-1 flex-col rounded-2xl bg-[#0f0e0c] p-5 transition-all duration-300"
                                >
                                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#B8860B]">
                                    CAPITAL TERRITORY
                                  </p>
                                  <p className="mt-3 text-xl font-black leading-tight text-white">Islamabad</p>
                                  <p className="mt-2 text-xs font-medium leading-relaxed text-white/60">IATA Airport, Diplomatic Enclave & hill routes</p>
                                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#B8860B]">
                                    Book <ChevronRight className="h-3.5 w-3.5" />
                                  </span>
                                </Link>

                                {/* Card 3 - Murree */}
                                <Link
                                  href="/areas/murree"
                                  className="flex min-h-[160px] flex-1 flex-col rounded-2xl bg-[#0f0e0c] p-5 transition-all duration-300"
                                >
                                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#B8860B]">
                                    HILL STATIONS
                                  </p>
                                  <p className="mt-3 text-xl font-black leading-tight text-white">Murree</p>
                                  <p className="mt-2 text-xs font-medium leading-relaxed text-white/60">Snow season routes, Mall Road & Kashmir point</p>
                                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#B8860B]">
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
                                      className="flex items-center gap-2 text-sm font-medium text-[#4b4b4b] transition-colors hover:text-[#D4AF37]"
                                    >
                                      <span className="text-[#D4AF37]">•</span>
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
                                  className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#0A0A0A] shadow-[0_4px_14px_rgba(212,175,55,0.22)] transition-all hover:bg-[#B8860B]"
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
                    className={`nav-link-item text-[#D4AF37] ${isActive(link.href) ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: hamburger (mobile) */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#D4AF37] transition-colors duration-200 hover:bg-[#D4AF37]/10"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <X className="h-[22px] w-[22px]" strokeWidth={1.8} />
                ) : (
                  <Menu className="h-[22px] w-[22px]" strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {menuOpen ? (
            <div className="max-h-[calc(100dvh-96px)] overflow-y-auto border-t border-[#f3dfd8] bg-white md:hidden">
              <div className="px-4 py-3">
                {navLinks.map((link) => {
                  // ── Mobile Areas accordion: Punjab cities + View All Areas only ──
                  if (link.label === "Areas") {
                    return (
                      <div
                        key={link.label}
                        className="mb-1 overflow-hidden rounded-2xl border border-[#f3e5df] bg-[#F5E9C8]"
                      >
                        <button
                          type="button"
                          onClick={() => setMobileAreasOpen((prev) => !prev)}
                          className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.16em] text-[#D4AF37]"
                        >
                          <span>Areas</span>
                          <span
                            className={`flex items-center ${mobileAreasOpen ? "rotate-180" : ""}`}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </span>
                        </button>

                        {mobileAreasOpen ? (
                          <div className="border-t border-[#f3e5df] px-4 pb-4 pt-3">
                            <div className="mb-2.5 flex items-center gap-1.5">
                              <MapPin className="h-2.5 w-2.5 text-[#D4AF37]" />
                              <p className="text-[9px] font-black uppercase tracking-[0.26em] text-[#D4AF37]">
                                Punjab Cities
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              {PUNJAB_PREVIEW.map((area) => (
                                <Link
                                  key={area.slug}
                                  href={`/areas/${area.slug}`}
                                  onClick={() => setMenuOpen(false)}
                                  className="rounded-xl bg-white px-3 py-2.5 text-[12px] font-medium text-[#333]"
                                >
                                  {area.name}
                                </Link>
                              ))}
                            </div>
                            <Link
                              href="/areas"
                              onClick={() => setMenuOpen(false)}
                              className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#0A0A0A]"
                            >
                              View All Areas <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        ) : null}
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
                        isActive(link.href) ? "text-[#D4AF37]" : "text-[#2b2b2b]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
        ) : null}
      </nav>
    </>
  );
}
