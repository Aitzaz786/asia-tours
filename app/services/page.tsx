"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";

const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const services = [
  {
    title: "Executive Chauffeur",
    description: "Discreet, professional drivers delivering refined travel for meetings, VIP arrivals, and executive schedules.",
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
    imageAlt: "Luxury executive sedan ready for chauffeur service",
  },
  {
    title: "Airport Transfers",
    description: "Punctual pickup coordination with 24/7 flight tracking for smooth arrivals, departures, and layover planning.",
    image: "/hero-bg.jpg",
    imageAlt: "Luxury fleet prepared for airport transfer service",
  },
  {
    title: "Wedding & Events",
    description: "Luxury fleet options curated for weddings, celebrations, and high-touch guest transportation on special days.",
    image: "/black.jpeg",
    imageAlt: "Luxury black car for wedding and event transportation",
  },
  {
    title: "Intercity Travel",
    description: "Comfortable long-distance journeys with premium vehicles, reliable timing, and hospitality-led travel support.",
    image: "/Range-Rover.avif",
    imageAlt: "Luxury SUV prepared for long-distance intercity travel",
  },
];

const processSteps = [
  { number: "1", title: "Inquire" },
  { number: "2", title: "Coordinate" },
  { number: "3", title: "Arrive" },
];

const fleetPreview = [
  {
    name: "Range Rover Vogue",
    image: "/range-rover-vogue-01.webp",
    seats: "5 Seats",
    luggage: "4 Bags",
  },
  {
    name: "BMW i7",
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
    seats: "5 Seats",
    luggage: "3 Bags",
  },
  {
    name: "Mercedes S-Class",
    image: "/black.jpeg",
    seats: "4 Seats",
    luggage: "3 Bags",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <section className="bg-[#050a11] px-4 pt-6 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative h-[600px] overflow-hidden rounded-[42px] border border-white/8 bg-[#050a11]">
            <div className="absolute inset-0">
              <Image
                src="/hero-bg.jpg"
                alt="Luxury fleet parked in a premium destination"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,17,0.92),rgba(5,10,17,0.62),rgba(5,10,17,0.48))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.18),transparent_30%)]" />

            <div className="relative flex h-full items-center px-6 sm:px-10 lg:px-14">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: easeCurve }}
                  className="flex flex-wrap items-center gap-2 text-sm text-[#c9a96e]"
                >
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span>Services</span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08, ease: easeCurve }}
                  className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]"
                >
                  Asia Tours Services
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.16, ease: easeCurve }}
                  className="mt-4 text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-[5.25rem]"
                >
                  Premium Mobility Solutions
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.24, ease: easeCurve }}
                  className="mt-5 max-w-2xl text-xl leading-8 text-[#d3d3d3]"
                >
                  Tailored for every destination.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[32px] border border-[#ece7df] bg-white p-8 sm:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a96e]">
                Signature Services
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#050a11] sm:text-4xl">
                Curated transport services for every premium journey
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#66615b]">
                Explore our most requested luxury travel services, designed with comfort, punctuality, and executive presentation in mind.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: easeCurve }}
                  whileHover={{ y: -6 }}
                  className="group h-[350px] overflow-hidden rounded-[28px] border border-[#ebe4da] bg-white shadow-[0_12px_40px_rgba(5,10,17,0.04)] transition-all duration-300"
                >
                  <div className="relative h-1/2 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div className="flex h-1/2 flex-col p-6">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1eb] text-[#ff4500]">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold text-[#050a11]">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#67625d]">
                      {service.description}
                    </p>

                    <Link
                      href="/contact-us"
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#ff4500] transition-opacity hover:opacity-80"
                    >
                      <span>Read More</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-16 border-t border-[#eee6dc] pt-14">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a96e]">
                  The Asia Tours Standard
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#050a11] sm:text-4xl">
                  A refined process from first inquiry to final arrival
                </h2>
              </div>

              <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {processSteps.map((step, index) => (
                  <div key={step.title} className="flex flex-1 items-center gap-4">
                    <div className="rounded-full border border-[#e8ddd2] bg-[#fff8f3] px-4 py-2 text-sm font-semibold text-[#050a11]">
                      {step.number}
                    </div>
                    <p className="text-lg font-medium text-[#050a11]">{step.title}</p>
                    {index < processSteps.length - 1 && (
                      <motion.div
                        aria-hidden="true"
                        initial={{ scaleX: 0.4, opacity: 0.4 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.6, delay: index * 0.08, ease: easeCurve }}
                        className="ml-auto hidden h-px flex-1 origin-left bg-[linear-gradient(90deg,rgba(255,69,0,0.55),rgba(201,169,110,0.25),transparent)] lg:block"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-14 rounded-[48px] bg-[#050a11] px-6 py-10 text-white sm:px-8 lg:px-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a96e]">
                      Fleet Preview
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                      Signature vehicles for premium travel
                    </h3>
                  </div>
                  <p className="max-w-xl text-sm leading-7 text-[#b8b8b8]">
                    A quick look at the executive fleet our guests most often request for luxury city travel, airport service, and formal occasions.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {fleetPreview.map((fleet) => (
                    <article
                      key={fleet.name}
                      className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03]"
                    >
                      <div className="relative h-56">
                        <Image
                          src={fleet.image}
                          alt={fleet.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,17,0.04),rgba(5,10,17,0.28))]" />
                      </div>

                      <div className="p-6">
                        <h4 className="text-2xl font-semibold text-white">{fleet.name}</h4>
                        <div className="mt-5 flex items-center gap-3 text-sm text-[#cfcfcf]">
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                            {fleet.seats}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                            {fleet.luggage}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-[400px] max-w-7xl items-center justify-center rounded-[40px] border border-[#eee6dc] bg-white px-6 text-center sm:px-10">
          <div className="max-w-2xl">
            <p className="text-2xl text-[#c9a96e]">{"\u2726"}</p>
            <h2 className="mt-6 text-3xl font-semibold leading-tight text-[#050a11] sm:text-4xl lg:text-[3rem]">
              Ready for a first-class experience?
            </h2>

            <motion.div
              whileHover="hover"
              initial="rest"
              className="mt-10 flex justify-center"
            >
              <Link
                href="/contact-us"
                className="group inline-flex flex-col items-center gap-3 rounded-full bg-[#ff4500] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(255,69,0,0.2)] transition-colors hover:bg-[#e8461c] sm:px-10"
              >
                <span>Book Your Service</span>
                <motion.span
                  variants={{
                    rest: { width: 34, opacity: 0.8 },
                    hover: { width: 96, opacity: 1 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="h-px bg-white"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
