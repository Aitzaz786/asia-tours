"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SECTION_CARD_Y, SECTION_INSET_X, SECTION_Y } from "@/lib/sectionSpacing";

const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const stats = [
  { icon: "🚗", value: 2000, suffix: "+", label: "Luxury Rentals Completed" },
  { icon: "😊", value: 1800, suffix: "+", label: "Happy Clients" },
  { icon: "🏆", value: 15,  suffix: "+", label: "Years Of Driving Trust" },
  { icon: "💬", value: 24,  suffix: "/7", label: "Premium Support" },
];

function CountUpNumber({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1600;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = value / steps;
    let current = 0;

    const timer = window.setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        window.clearInterval(timer);
        return;
      }
      setCount(Math.floor(current));
    }, stepTime);

    return () => window.clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-[3rem] font-black leading-none tracking-[-0.04em] text-[#D4AF37] sm:text-[3.5rem]">
      {count}{suffix}
    </div>
  );
}

export default function CtaBannerSection({ compact = false }: { compact?: boolean }) {
  const [enableRevealAnimations, setEnableRevealAnimations] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateAnimationMode = () => setEnableRevealAnimations(mediaQuery.matches);
    const frame = window.requestAnimationFrame(updateAnimationMode);

    mediaQuery.addEventListener("change", updateAnimationMode);
    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", updateAnimationMode);
    };
  }, []);

  const headerContent = (
    <>
      <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/08 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4AF37]" />
        Why Choose Us
      </span>

      <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
        Trusted by thousands<br />across Pakistan
      </h2>
      <p className="mt-4 text-base text-white/45 leading-relaxed">
        Our streamlined process ensures a premium car rental experience - reliable vehicles, professional service, available 24/7.
      </p>
    </>
  );

  // Equal outer py so gaps match full-bleed sections (no stuck edges).
  return (
    <div className={`${SECTION_INSET_X} ${SECTION_Y}`}>
      <section
        className={`relative mx-auto max-w-[1800px] overflow-hidden rounded-[36px] px-5 sm:px-8 lg:px-12 ${
          compact ? SECTION_CARD_Y : "py-14 sm:py-16 lg:py-20"
        }`}
        style={{
          background:
            "radial-gradient(circle at top left, rgba(212, 175, 55, 0.12) 0%, rgba(10, 10, 10, 1) 45%), radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.08) 0%, transparent 50%), linear-gradient(135deg, #0A0A0A 0%, #1A1508 100%)",
        }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Soft gold spotlight glows */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.16), transparent 68%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 h-[360px] w-[360px] rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(184,134,11,0.12), transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl">

          {/* Header */}
          {enableRevealAnimations ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeCurve }}
              className="mx-auto max-w-3xl text-center"
            >
              {headerContent}
            </motion.div>
          ) : (
            <div className="mx-auto max-w-3xl text-center">{headerContent}</div>
          )}

          {/* Stats grid */}
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => {
              const cardContent = (
                <>
                  {/* Top shimmer line */}
                  <div className="absolute inset-x-[20%] top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

                  <div className="relative z-10">
                    <CountUpNumber value={stat.value} suffix={stat.suffix} />

                    {/* Divider */}
                    <div className="mx-auto mt-2.5 h-0.5 w-8 rounded-full bg-[#D4AF37]/40" />

                    <p className="mt-2.5 text-sm font-medium leading-snug text-white/50">
                      {stat.label}
                    </p>
                  </div>
                </>
              );
              const cardClassName = "group relative overflow-hidden rounded-[28px] border border-[rgba(212,175,55,0.2)] bg-[#0c0c0c]/80 px-6 py-8 text-center shadow-[inset_0_1px_0_rgba(212,175,55,0.08)] transition-all duration-300 hover:border-[rgba(212,175,55,0.45)] hover:bg-[#D4AF37]/[0.06] hover:shadow-[0_0_40px_rgba(212,175,55,0.08),inset_0_1px_0_rgba(212,175,55,0.15)]";

              return enableRevealAnimations ? (
                <motion.article
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: easeCurve }}
                  className={cardClassName}
                >
                  {cardContent}
                </motion.article>
              ) : (
                <article key={stat.label} className={cardClassName}>
                  {cardContent}
                </article>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
