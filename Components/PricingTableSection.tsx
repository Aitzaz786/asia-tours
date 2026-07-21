import { fleets, type Fleet, type Highlight } from "@/Data/cars";
import { SECTION_Y } from "@/lib/sectionSpacing";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

function formatHighlightValue(value: Highlight["value"]) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function formatHighlights(fleet: Fleet) {
  if (!fleet.highlights?.length) return "—";

  return fleet.highlights
    .map((h) => {
      const value = formatHighlightValue(h.value);
      if (h.label === "Passengers") return `${value} Passengers`;
      if (h.label === "A/C") return value === "Yes" ? "A/C" : "No A/C";
      if (h.label === "Fuel") return value;
      if (h.label === "Mileage") return value;
      return `${value} ${h.label}`;
    })
    .join("  ·  ");
}

export default function PricingTableSection({
  compactTop: _compactTop = false,
  compact: _compact = false,
}: {
  compactTop?: boolean;
  compact?: boolean;
}) {
  const sortedFleets = [...fleets].sort((a, b) => b.price - a.price);

  return (
    <section className={`bg-white px-3 sm:px-5 lg:px-7 ${SECTION_Y}`}>
      <div className="mx-auto max-w-[1800px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
            <span className="text-xs leading-none" aria-hidden="true">
              {"\u2733"}
            </span>
            <span>Rental Rates</span>
          </p>
          <h2 className="about-serif-font mx-auto mt-4 max-w-2xl text-4xl font-bold leading-[1.06] text-[#0f0e0c] sm:text-[2.85rem] lg:text-[3.35rem]">
            Car Rental Pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#6b6560]">
            Transparent daily rates for our premium fleet — no hidden fees.
          </p>
          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
          />
        </div>

        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-[#eadfd6] bg-white shadow-[0_12px_36px_rgba(15,14,12,0.05)] md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#0f0e0c]">
                <th className="px-6 py-5 text-center text-[15px] font-semibold tracking-[0.04em] text-[#D4AF37] lg:px-10 lg:text-base">
                  Vehicle Type
                </th>
                <th className="px-6 py-5 text-center text-[15px] font-semibold tracking-[0.04em] text-[#D4AF37] lg:px-10 lg:text-base">
                  Daily Rate (PKR)
                </th>
                <th className="px-6 py-5 text-center text-[15px] font-semibold tracking-[0.04em] text-[#D4AF37] lg:px-10 lg:text-base">
                  Highlights
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedFleets.map((fleet, index) => (
                <tr
                  key={fleet.name}
                  className={`border-t border-[#eee8e0] transition-colors hover:bg-[#fbf7ef] ${
                    index % 2 === 1 ? "bg-[#faf8f4]" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-5 text-center text-[17px] font-semibold leading-snug text-[#0f0e0c] lg:px-10 lg:text-lg">
                    {fleet.name}
                  </td>
                  <td className="px-6 py-5 text-center lg:px-10">
                    <span className="text-[18px] font-bold tracking-tight text-[#D4AF37] lg:text-[20px]">
                      Rs {formatPrice(fleet.price)}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center text-[15px] leading-relaxed text-[#6b6560] lg:px-10 lg:text-base">
                    {formatHighlights(fleet)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#eadfd6] bg-white shadow-[0_12px_36px_rgba(15,14,12,0.05)] md:hidden">
          {sortedFleets.map((fleet, index) => (
            <article
              key={fleet.name}
              className={`border-b border-[#eee8e0] px-5 py-5 last:border-b-0 ${
                index % 2 === 1 ? "bg-[#faf8f4]" : "bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[17px] font-semibold leading-snug text-[#0f0e0c]">
                  {fleet.name}
                </p>
                <p className="shrink-0 text-[18px] font-bold tracking-tight text-[#D4AF37]">
                  Rs {formatPrice(fleet.price)}
                </p>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-[#6b6560]">
                {formatHighlights(fleet)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
