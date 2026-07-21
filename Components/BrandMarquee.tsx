"use client";

const brands = [
  { name: "Audi", logo: "/logo/audi.webp" },
  { name: "Mercedes-Benz", logo: "/logo/mercedes-benz.webp" },
  { name: "GMC", logo: "/logo/gmc.webp" },
  { name: "Toyota", logo: "/logo/toyota.webp" },
  { name: "Maybach", logo: "/logo/maybach.webp" },
  { name: "Range Rover", logo: "/logo/range-rover.webp" },
];

const streaks = [
  { top: "18%", width: 160, duration: 11, delay: 0, opacity: 0.38, rotate: -2, dir: 1 },
  { top: "32%", width: 110, duration: 14, delay: -3, opacity: 0.28, rotate: 1, dir: -1 },
  { top: "48%", width: 200, duration: 9, delay: -1.5, opacity: 0.4, rotate: 0, dir: 1 },
  { top: "58%", width: 90, duration: 16, delay: -6, opacity: 0.26, rotate: 2.5, dir: -1 },
  { top: "72%", width: 140, duration: 12, delay: -4, opacity: 0.34, rotate: -1.5, dir: 1 },
  { top: "82%", width: 180, duration: 10, delay: -2.2, opacity: 0.3, rotate: 3, dir: -1 },
  { top: "24%", width: 80, duration: 15, delay: -8, opacity: 0.32, rotate: 0, dir: 1 },
] as const;

const rings = [
  { size: 280, top: "-18%", left: "-8%", duration: 55, reverse: false },
  { size: 200, top: "55%", right: "-6%", duration: 42, reverse: true },
  { size: 340, bottom: "-28%", left: "62%", duration: 68, reverse: false },
] as const;

const repeated = [...brands, ...brands, ...brands, ...brands];
const LOGO_VERSION = "3";

export default function BrandMarquee() {
  return (
    <section className="brand-marquee relative overflow-hidden py-8 md:py-10">
      <div className="brand-marquee__decor pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="brand-marquee__glow" />
        <div className="brand-marquee__grid" />

        {streaks.map((s, i) => (
          <span
            key={`streak-${i}`}
            className="brand-marquee__streak"
            style={{
              top: s.top,
              width: s.width,
              opacity: s.opacity,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              ["--streak-rotate" as string]: `${s.rotate}deg`,
              ["--streak-dir" as string]: s.dir,
            }}
          />
        ))}

        {rings.map((r, i) => (
          <span
            key={`ring-${i}`}
            className={`brand-marquee__ring${r.reverse ? " brand-marquee__ring--reverse" : ""}`}
            style={{
              width: r.size,
              height: r.size,
              top: "top" in r ? r.top : undefined,
              bottom: "bottom" in r ? r.bottom : undefined,
              left: "left" in r ? r.left : undefined,
              right: "right" in r ? r.right : undefined,
              animationDuration: `${r.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 top-0 z-[1] hidden h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.55)_50%,transparent)] md:block" />
      <div className="absolute inset-x-0 bottom-0 z-[1] hidden h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.55)_50%,transparent)] md:block" />

      <div className="relative z-10 w-full">
        <div className="mb-5 px-5 text-center sm:mb-6">
          <p className="inline-flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37] sm:text-xs">
            <span aria-hidden="true">•</span>
            Partner Brands
            <span aria-hidden="true">•</span>
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-[#F5F5F5] sm:text-[2rem]">
            Featured Brands In Our Fleet
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent sm:w-20"
          />
        </div>

        <div className="relative overflow-hidden py-2">
          <div
            className="brand-marquee__track flex items-center gap-10 sm:gap-14"
            style={{
              width: "max-content",
              animation: `mqScroll ${brands.length * 3}s linear infinite`,
            }}
          >
            {repeated.map((brand, i) => (
              <div key={i} className="brand-logo-item" title={brand.name}>
                <img
                  src={`${brand.logo}?v=${LOGO_VERSION}`}
                  alt={brand.name}
                  className="brand-logo-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .brand-marquee {
          background: linear-gradient(180deg, #0F0D08 0%, #050403 100%);
        }

        .brand-marquee__glow {
          position: absolute;
          inset: -10%;
          background:
            radial-gradient(ellipse at 30% 35%, rgba(212, 175, 55, 0.11) 0%, transparent 55%),
            radial-gradient(ellipse at 70% 70%, rgba(212, 175, 55, 0.10) 0%, transparent 52%),
            radial-gradient(ellipse at 50% 90%, rgba(184, 134, 11, 0.08) 0%, transparent 48%),
            radial-gradient(ellipse at 50% 20%, rgba(184, 134, 11, 0.07) 0%, transparent 55%);
        }

        .brand-marquee__grid {
          position: absolute;
          inset: -30%;
          z-index: 0;
          opacity: 0.1;
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            rgba(232, 199, 102, 0.85) 20px,
            rgba(232, 199, 102, 0.85) 21px
          );
          background-size: auto;
          transform: none;
          /* Even visibility top → bottom (no soft fade out) */
          -webkit-mask-image: none;
          mask-image: none;
        }

        .brand-marquee__streak {
          position: absolute;
          left: 0;
          z-index: 1;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #E8C766 45%,
            #D4AF37 55%,
            transparent 100%
          );
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.35);
          transform: translateX(-30vw) rotate(var(--streak-rotate, 0deg));
          animation-name: brandStreakMove;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .brand-marquee__ring {
          position: absolute;
          z-index: 1;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.22);
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.06), inset 0 0 40px rgba(212, 175, 55, 0.04);
          background: transparent;
          animation-name: brandRingSpin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .brand-marquee__ring--reverse {
          animation-name: brandRingSpinReverse;
        }

        @keyframes mqScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }

        @keyframes brandStreakMove {
          0%   { transform: translateX(calc(var(--streak-dir, 1) * -35vw)) rotate(var(--streak-rotate, 0deg)); }
          100% { transform: translateX(calc(var(--streak-dir, 1) * 110vw)) rotate(var(--streak-rotate, 0deg)); }
        }

        @keyframes brandRingSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes brandRingSpinReverse {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        /* No outer card box — logo image only */
        .brand-logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: transparent;
          border: none;
          padding: 0;
          margin: 0;
        }

        .brand-logo-image {
          display: block;
          width: auto;
          height: 64px;
          max-width: 160px;
          object-fit: contain;
          border-radius: 12px;
          /* Force light/visible marks on dark bg (silver logos included) */
          filter: brightness(0) invert(1);
          opacity: 0.88;
          transform: scale(1);
          transition: opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease;
        }

        .brand-logo-item:hover .brand-logo-image {
          filter: none;
          opacity: 1;
          transform: scale(1.08);
        }

        @media (min-width: 640px) {
          .brand-logo-image {
            height: 72px;
            max-width: 180px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .brand-marquee__streak,
          .brand-marquee__ring,
          .brand-marquee__ring--reverse,
          .brand-marquee__track {
            animation: none !important;
          }

          .brand-marquee__streak {
            opacity: 0.18;
            transform: translateX(15vw) rotate(var(--streak-rotate, 0deg));
          }
        }

        /* Phone: only 45° grid — hide horizontal/vertical accents (streaks + rings) */
        @media (max-width: 767px) {
          .brand-marquee__streak,
          .brand-marquee__ring,
          .brand-marquee__ring--reverse {
            display: none !important;
          }

          .brand-marquee__grid {
            inset: -40%;
            opacity: 0.12;
            background-image: repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 18px,
              rgba(232, 199, 102, 0.9) 18px,
              rgba(232, 199, 102, 0.9) 19px
            );
          }

          .brand-marquee__glow {
            background:
              radial-gradient(ellipse at 40% 30%, rgba(212, 175, 55, 0.12) 0%, transparent 55%),
              radial-gradient(ellipse at 60% 75%, rgba(212, 175, 55, 0.11) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 95%, rgba(184, 134, 11, 0.09) 0%, transparent 45%);
          }
        }
      `}</style>
    </section>
  );
}
