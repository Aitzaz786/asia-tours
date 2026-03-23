"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
    <div ref={ref} className="text-[3rem] font-black leading-none tracking-[-0.04em] text-[#ff4402] sm:text-[3.5rem]">
      {count}{suffix}
    </div>
  );
}

export default function CtaBannerSection() {
  return (
    <main className="px-3 pb-10 sm:px-5 lg:px-7">
      <section className="relative mx-auto max-w-[1800px] overflow-hidden rounded-[44px] bg-[#050505] px-6 py-18 sm:px-8 lg:px-12 lg:py-24">

        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-35"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Glow accents */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-[340px] w-[340px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,68,2,0.18), transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-[280px] w-[280px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,68,2,0.10), transparent 70%)" }} />

        <div className="relative z-10 mx-auto max-w-6xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeCurve }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4402]/30 bg-[#ff4402]/08 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#ff4402]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff4402]" />
              Why Choose Us
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Trusted by thousands<br />across Pakistan
            </h2>
            <p className="mt-4 text-base text-white/45 leading-relaxed">
              Our streamlined process ensures a premium car rental experience — reliable vehicles, professional service, available 24/7.
            </p>
          </motion.div>

          {/* Stats grid */}
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: easeCurve }}
                className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-white/4 px-6 py-8 text-center transition-all duration-300 hover:border-[#ff4402]/40 hover:bg-[#ff4402]/4"
              >
                {/* Top shimmer line */}
                <div className="absolute inset-x-[20%] top-0 h-px bg-gradient-to-r from-transparent via-[#ff4402]/50 to-transparent" />

                <div className="relative z-10">
                

                  <CountUpNumber value={stat.value} suffix={stat.suffix} />

                  {/* Divider */}
                  <div className="mx-auto mt-2.5 h-0.5 w-8 rounded-full bg-[#ff4402]/40" />

                  <p className="mt-2.5 text-sm font-medium leading-snug text-white/50">
                    {stat.label}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}