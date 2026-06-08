"use client";

const brands = [
  { name: "Audi",                    logo: "/logo/audi.png" },
  { name: "Mercedes-Benz",           logo: "/logo/mercedes-benz.png" },
  { name: "GMC",                     logo: "/logo/gmc.png" },
  { name: "Toyota",                  logo: "/logo/toyota.png" },
  { name: "Maybach",                 logo: "/logo/maybach.png" },
  { name: "Range Rover",             logo: "/logo/range-rover.png" },
];

const repeated = [...brands, ...brands, ...brands, ...brands];
export default function BrandMarquee() {
  return (
    <section
      className="relative flex min-h-[120px] items-center overflow-hidden py-0"
      style={{ background: "#ffffff" }}
    >
      {/* Accent lines */}
      <div className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #ff4402 50%, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #ff4402 50%, transparent)" }} />

      <div className="relative z-10 w-full">
        <div className="relative overflow-hidden">
          {/* Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to right, #ffffff 30%, transparent)" }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to left, #ffffff 30%, transparent)" }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "max-content",
              animation: `mqScroll ${brands.length * 3}s linear infinite`,
            }}
          >
            {repeated.map((brand, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "180px",
                  height: "100px",
                  padding: "0 28px",
                  flexShrink: 0,
                }}
                title={brand.name}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{
                    maxWidth: "130px",
                    maxHeight: "70px",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>

          <style>{`
            @keyframes mqScroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-25%); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}