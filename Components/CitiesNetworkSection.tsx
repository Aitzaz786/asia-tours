import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { areas } from "@/app/areas/areasData";
import { SECTION_Y } from "@/lib/sectionSpacing";

type CitiesNetworkSectionProps = {
  currentSlug?: string;
  showViewAll?: boolean;
  columns?: 2 | 3;
  compact?: boolean;
};

export default function CitiesNetworkSection({
  currentSlug,
  showViewAll = false,
  columns = 3,
  compact: _compact = false,
}: CitiesNetworkSectionProps) {
  return (
    <section className={`bg-white px-4 sm:px-6 lg:px-8 ${SECTION_Y}`}>
      <div className="mx-auto max-w-[1800px]">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 text-[#D4AF37]">
            <span className="h-px w-9 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <p className="text-xs font-black uppercase tracking-[0.26em]">Our Network</p>
            <span className="h-px w-9 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0f0e0c] sm:text-4xl lg:text-5xl">
            Cities Within{" "}
            <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#E8C766] bg-clip-text text-transparent">
              Your Reach
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6f6962] sm:text-base">
            Select a city to explore local chauffeur, airport transfer, and car rental services.
          </p>
        </div>

        <div
          className={`mt-10 grid grid-cols-1 gap-x-12 ${
            columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          {areas.map((serviceArea, index) => {
            const isCurrentArea = Boolean(currentSlug && serviceArea.slug === currentSlug);

            return (
              <Link
                key={serviceArea.slug}
                href={`/areas/${serviceArea.slug}`}
                aria-current={isCurrentArea ? "page" : undefined}
                className={`group flex min-h-[92px] items-center gap-4 border-b border-[#e8e2da] py-5 ${
                  isCurrentArea
                    ? "border-l-2 border-l-[#D4AF37] pl-4"
                    : "border-l-2 border-l-transparent pl-4"
                }`}
              >
                <span className="w-7 shrink-0 text-xs font-black tracking-[0.12em] text-[#b4aca3]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-xl font-black ${
                      isCurrentArea
                        ? "text-[#B8860B]"
                        : "text-[#0f0e0c] group-hover:text-[#D4AF37]"
                    }`}
                  >
                    {serviceArea.name}
                  </span>
                  <span className="mt-1 block text-xs text-[#817970]">
                    {serviceArea.province} - Chauffeur and Car Rental
                  </span>
                </span>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ded8d0] text-[#0f0e0c] group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#827a72]">
          <span>{areas.length} Service Cities</span>
          <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
          <span>Airport Transfers</span>
          <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
          <span>Corporate and Private Travel</span>
        </div>

        {showViewAll ? (
          <div className="mt-10 flex justify-center pb-2">
            <Link
              href="/areas"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-[#0A0A0A] transition-colors hover:bg-[#B8860B]"
            >
              View All Areas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
