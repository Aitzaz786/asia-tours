"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { fleets, getFleetSlug } from "@/Data/cars";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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
            <Link href="/" className="flex items-center gap-3">
<img
  src="/logo.jpeg"
  alt="Logo"
className='w-[156px]'
 
/>            </Link>

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
              {navLinks.map((link) => {
                if (link.label === "Services") {
                  return (
                    <div key={link.label} className="group relative">
                      <Link
                        href={link.href}
                        className={`nav-link-item inline-flex items-center gap-2 text-[#fa3132] ${isActive(link.href) ? "active" : ""}`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Link>

                      <div className="invisible absolute left-1/2 top-full z-50 mt-5 w-[540px] -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        <div className="rounded-[28px] border border-[#f2ded7] bg-white p-5 shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
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

                            <div className="max-h-[360px] space-y-2 overflow-y-auto pr-1">
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

        {menuOpen && (
          <div className="border-t border-[#f3dfd8] bg-white md:hidden">
            <div className="px-4 py-3">
              {navLinks.map((link) => {
                if (link.label === "Services") {
                  return (
                    <div key={link.label} className="rounded-2xl border border-[#f3e5df] bg-[#fffaf8]">
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.16em] text-[#fa3132]"
                      >
                        <span>Services</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>

                      {mobileServicesOpen && (
                        <div className="space-y-2 border-t border-[#f3e5df] px-3 py-3">
                          <Link
                            href="/services"
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-xl bg-white px-3 py-3 text-sm font-medium text-[#111111]"
                          >
                            All Services
                          </Link>
                          {fleetLinks.map((fleet) => (
                            <Link
                              key={fleet.href}
                              href={fleet.href}
                              onClick={() => setMenuOpen(false)}
                              className="block rounded-xl bg-white px-3 py-3 text-sm text-[#444]"
                            >
                              {fleet.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

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
          </div>
        )}
      </nav>
    </>
  );
}
