import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, Fuel, Snowflake, Users } from "lucide-react";
import { fleets, getFleetSlug } from "@/Data/cars";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

function getHighlightValue(
  highlights: { label: string; value: string | number | boolean }[] | undefined,
  label: string
) {
  return highlights?.find((item) => item.label === label)?.value;
}

export function generateStaticParams() {
  return fleets.map((fleet) => ({
    slug: getFleetSlug(fleet.name),
  }));
}

export default async function ServiceCarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const fleet = fleets.find((item) => getFleetSlug(item.name) === slug);

  if (!fleet) notFound();

  const similarFleets = fleets.filter((item) => item.name !== fleet.name).slice(0, 3);
  const passengers = getHighlightValue(fleet.highlights, "Passengers");
  const fuel = getHighlightValue(fleet.highlights, "Fuel");
  const ac = getHighlightValue(fleet.highlights, "A/C");
  const mileage = getHighlightValue(fleet.highlights, "Mileage");

  return (
    <main className="bg-[#fcfaf7] text-[#050a11]">
      <section className="bg-[#071018] px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 sm:rounded-[42px]">
            <div className="absolute inset-0">
              <Image src={fleet.image} alt={fleet.imageAlt} fill priority className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,17,0.94),rgba(5,10,17,0.74),rgba(5,10,17,0.34))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,77,10,0.18),transparent_28%)]" />

            <div className="relative grid min-h-[580px] gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-16">
              <div className="flex max-w-3xl flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#c9a96e]">
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link href="/services" className="transition-colors hover:text-white">
                    Services
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span>{fleet.name}</span>
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
                  Signature Vehicle
                </p>
                <h1 className="mt-5 text-4xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-[4.9rem]">
                  {fleet.name}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                  A polished premium vehicle option for executive movement, airport transfers, special occasions, and comfortable private travel.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center rounded-full bg-[#ff4d0a] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(255,77,10,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#eb4300]"
                  >
                    Book This Vehicle
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
                  >
                    Back to Services
                  </Link>
                </div>
              </div>

              <div className="self-end">
                <div className="rounded-[30px] border border-white/10 bg-[#08111a]/80 p-6 text-white backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#c9a96e]">Daily Rate</p>
                  <p className="mt-4 text-4xl font-semibold">PKR {formatPrice(fleet.price)}</p>
                  <p className="mt-2 text-sm text-white/65">Per day pricing, subject to route and booking requirements.</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/45">Passengers</p>
                      <p className="mt-2 text-lg font-semibold">{String(passengers ?? "-")}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/45">Mileage</p>
                      <p className="mt-2 text-lg font-semibold">{String(mileage ?? "-")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.04)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
              Vehicle Highlights
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Comfort-focused details for premium travel
            </h2>

            <div className="mt-8 grid gap-4">
              <div className="rounded-[24px] border border-[#efe4d8] bg-[#fffaf7] p-5">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-[#ff4d0a]" />
                  <h3 className="text-lg font-semibold">Passenger Capacity</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#66615b]">
                  Comfortably accommodates {String(passengers ?? "-")} passengers for private or executive journeys.
                </p>
              </div>

              <div className="rounded-[24px] border border-[#efe4d8] bg-[#fffaf7] p-5">
                <div className="flex items-center gap-3">
                  <Fuel className="h-5 w-5 text-[#ff4d0a]" />
                  <h3 className="text-lg font-semibold">Fuel & Route Readiness</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#66615b]">
                  Runs on {String(fuel ?? "-")} and is suited for city movement, airport travel, and scheduled long-distance bookings.
                </p>
              </div>

              <div className="rounded-[24px] border border-[#efe4d8] bg-[#fffaf7] p-5">
                <div className="flex items-center gap-3">
                  <Snowflake className="h-5 w-5 text-[#ff4d0a]" />
                  <h3 className="text-lg font-semibold">Air-Conditioned Comfort</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#66615b]">
                  A/C availability: {typeof ac === "boolean" ? (ac ? "Yes" : "No") : String(ac ?? "-")}. Prepared for refined travel in all seasons.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[34px] bg-[#08111a] p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
              Why This Vehicle
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Designed for polished arrivals and smooth journeys
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              {fleet.name} is ideal for guests who want presentation, comfort, and dependable travel support in one premium booking. It works especially well for executive transfers, private events, airport pickups, and high-visibility occasions.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                "Professional booking coordination before pickup",
                "Clean, presentation-ready vehicle standards",
                "Suitable for business, family, and event travel",
                "Luxury-focused experience from inquiry to arrival",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff4d0a]/14">
                    <Check className="h-4 w-4 text-[#ff8457]" />
                  </span>
                  <p className="text-sm leading-7 text-white/78">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[38px] border border-[#eadfd4] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.04)] sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
                Included Information
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                Quick overview at a glance
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#66615b] sm:text-base">
              Everything below is pulled from your fleet data, so future updates stay consistent across the services dropdown, cards, and detail pages.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {fleet.highlights?.map((item) => (
              <div key={item.label} className="rounded-[24px] border border-[#efe4d8] bg-[#fffaf7] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a96e]">{item.label}</p>
                <p className="mt-3 text-lg font-semibold text-[#050a11]">
                  {typeof item.value === "boolean" ? (item.value ? "Yes" : "No") : item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl rounded-[40px] bg-[#050a11] px-6 py-8 text-white sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
                Similar Vehicles
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                Explore more premium options
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff8457]">
              <span>Back to all services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {similarFleets.map((item) => (
              <article key={item.name} className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03]">
                <div className="relative h-56">
                  <Image src={item.image} alt={item.imageAlt} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{item.name}</h3>
                  <p className="mt-2 text-sm font-medium text-[#ff8457]">
                    PKR {formatPrice(item.price)} / day
                  </p>
                  <Link
                    href={`/services/${getFleetSlug(item.name)}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white"
                  >
                    <span>Open details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-[#eadfd4] bg-white px-6 py-16 text-center shadow-[0_18px_50px_rgba(15,23,42,0.04)] sm:px-10 lg:py-20">
          <p className="text-xl text-[#c9a96e]">{"\u2726"}</p>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[3rem]">
            Ready to reserve {fleet.name}?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#66615b]">
            Share your route and timing with us. We’ll help you confirm availability, arrange the right service style, and prepare a smooth premium experience.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-full bg-[#ff4d0a] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(255,77,10,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#eb4300]"
            >
              Book This Vehicle
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-[#f0d8cc] px-8 py-4 text-base font-semibold text-[#111111] transition-colors hover:bg-[#fff5f1]"
            >
              View All Cars
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
