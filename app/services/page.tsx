import Link from "next/link";
import { services } from "./servicesData";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#050a11] px-6 py-20 text-white sm:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#c9a96e]">Our Services</p>
        <h1 className="mb-4 text-4xl font-semibold text-white sm:text-5xl">Premium Travel Services</h1>
        <p className="max-w-2xl text-base leading-8 text-[#b8b8b8]">
          Explore all transportation services crafted for comfort, reliability, and style.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="rounded-2xl border border-[#c9a96e]/20 bg-[#0b121c] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#fa3132]/60"
            >
              <h2 className="text-2xl font-medium text-white">{service.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#b8b8b8]">{service.summary}</p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-6 inline-block text-sm font-medium uppercase tracking-[0.16em] text-[#fa3132] hover:text-[#ff6a6b]"
              >
                View Details
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
