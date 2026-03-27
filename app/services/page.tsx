import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, ShieldCheck, Sparkles, TimerReset, Users } from "lucide-react";
import { fleets, getFleetSlug } from "@/Data/cars";

const serviceCards = [
  {
    title: "Executive Chauffeur",
    description:
      "Discreet, polished chauffeur service for board meetings, VIP guests, embassy visits, and city appointments.",
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
  },
  {
    title: "Airport Transfers",
    description:
      "Punctual pickups with live coordination, comfortable waiting standards, and smooth arrivals any time of day.",
    image: "/hero-bg.jpg",
  },
  {
    title: "Wedding & Events",
    description:
      "Elegant transport planning for couples, family members, guests, and premium event timelines.",
    image: "/black.jpeg",
  },
  {
    title: "Intercity Travel",
    description:
      "Long-distance travel built around comfort, route planning, refreshments, and stress-free executive movement.",
    image: "/Range-Rover.avif",
  },
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
  { step: "1", title: "Choose a service", text: "Select the travel style, date, and preferred vehicle." },
  { step: "2", title: "Confirm details", text: "We coordinate timing, route, pickup, and special requests." },
  { step: "3", title: "Travel in comfort", text: "Your vehicle arrives prepared, polished, and ready." },
];

const featuredFleet = fleets.slice(0, 6);

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export default function ServicesPage() {
  return (
    <main className="bg-[#fcfaf7] text-[#050a11]">
      <section className="bg-[#050a11] px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 sm:rounded-[42px]">
            <div className="absolute inset-0">
              <Image
                src="/hero-bg.jpg"
                alt="Luxury service experience hero"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,17,0.93),rgba(5,10,17,0.68),rgba(5,10,17,0.4))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.18),transparent_28%)]" />

            <div className="relative grid min-h-[560px] gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-16">
              <div className="flex max-w-3xl flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#c9a96e]">
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span>Services</span>
                </div>

                <p className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
                  <Sparkles className="h-4 w-4" />
                  <span>Asia Tours Services</span>
                </p>

                <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-[5.2rem]">
                  Premium mobility
                  <span className="mt-2 block text-[#f0e5d4]">for every destination.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                  From airport arrivals to executive city travel, wedding movements, and private intercity journeys, we deliver a service-first experience with luxury vehicles and meticulous coordination.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff4d0a] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(255,77,10,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#eb4300]"
                  >
                    <span>Book a Service</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#fleet-showcase"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
                  >
                    Explore Fleet
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 self-end sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {[
                  { value: "24/7", label: "Booking Support" },
                  { value: "14+", label: "Premium Vehicles" },
                  { value: "100%", label: "Service Focused" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[28px] border border-white/10 bg-white/8 p-5 text-white backdrop-blur-md"
                  >
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#c9a96e]">Asia Tours</p>
                    <p className="mt-4 text-4xl font-semibold">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-[#eadfd4] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.04)] sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
              Signature Services
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Curated transport services for every premium journey
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#66615b]">
              Explore our most requested travel solutions, designed around punctuality, comfort, polished presentation, and confident coordination.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {serviceCards.map((service) => (
              <article
                key={service.title}
                className="group overflow-hidden rounded-[30px] border border-[#ece3d8] bg-[#fffdfa] shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
              >
                <div className="relative h-[240px] overflow-hidden">
                  <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,17,0.04),rgba(5,10,17,0.38))]" />
                </div>
                <div className="p-6 sm:p-7">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0e8] text-[#ff4d0a]">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#66615b] sm:text-base">
                    {service.description}
                  </p>
                  <Link href="/contact-us" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ff4d0a]">
                    <span>Plan this service</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[36px] border border-[#eadfd4] bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
              The Asia Tours Standard
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              A refined booking process from first inquiry to final arrival
            </h2>

            <div className="mt-10 space-y-5">
              {bookingFlow.map((item) => (
                <div key={item.step} className="flex gap-4 rounded-[24px] border border-[#efe4d8] bg-[#fffaf7] p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff1ea] text-sm font-semibold text-[#ff4d0a]">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#66615b]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] bg-[#071018] p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
              Why Clients Choose Us
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Hospitality, reliability, and premium travel standards in one service
            </h2>

            <div className="mt-10 grid gap-4">
              {standards.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ff4d0a]/12 text-[#ff8457]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-white/70">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="fleet-showcase" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl rounded-[40px] bg-[#050a11] px-6 py-8 text-white sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
                Fleet Preview
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Choose from our signature vehicles
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Browse our featured vehicles below, then open any car page for pricing, specifications, booking details, and premium travel recommendations.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredFleet.map((fleet) => (
              <article
                key={fleet.name}
                className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div className="relative h-60">
                  <Image src={fleet.image} alt={fleet.imageAlt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,17,0.08),rgba(5,10,17,0.4))]" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold">{fleet.name}</h3>
                      <p className="mt-2 text-sm font-medium text-[#ff8457]">
                        PKR {formatPrice(fleet.price)} / day
                      </p>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a96e]">
                      Premium
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {fleet.highlights?.map((item) => (
                      <span
                        key={`${fleet.name}-${item.label}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/80"
                      >
                        <Check className="h-3.5 w-3.5 text-[#ff8457]" />
                        <span>
                          {item.label}: {typeof item.value === "boolean" ? (item.value ? "Yes" : "No") : item.value}
                        </span>
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/services/${getFleetSlug(fleet.name)}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#ff8457]"
                  >
                    <span>Open vehicle page</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-[#eadfd4] bg-white px-6 py-16 text-center shadow-[0_18px_50px_rgba(15,23,42,0.04)] sm:px-10 lg:py-20">
          <p className="text-xl text-[#c9a96e]">{"\u2726"}</p>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[3.2rem]">
            Ready for a first-class travel experience?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#66615b]">
            Tell us your route, timing, and travel style. We will recommend the right vehicle and coordinate the experience from start to finish.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-full bg-[#ff4d0a] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(255,77,10,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#eb4300]"
            >
              Book Your Service
            </Link>
            <Link
              href="#fleet-showcase"
              className="inline-flex items-center justify-center rounded-full border border-[#f0d8cc] px-8 py-4 text-base font-semibold text-[#111111] transition-colors hover:bg-[#fff5f1]"
            >
              View Fleet Options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
