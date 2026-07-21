"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


// ─── Marquee Items ────────────────────────────────────────────────────────────
const marqueeItems = [
  { text: "24/7 Support", symbol: "✦" },
  { text: "14+ Luxury Vehicles", symbol: "✦" },
  { text: "100% Service Focus", symbol: "✦" },
  { text: "Professional Drivers", symbol: "✦" },
  { text: "Airport Transfer", symbol: "✦" },
  { text: "On-Time Guarantee", symbol: "✦" },
  { text: "Premium Fleet", symbol: "✦" },
  { text: "VIP Experience", symbol: "✦" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function ProcessSection() {
  const marqueeLoop = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <>
      {/* ════════════════════════════════════════════════════
          MARQUEE STRIP — full width, infinite scroll
      ════════════════════════════════════════════════════ */}
      <div
        className="relative mb-8 w-full max-w-[100vw] overflow-hidden border-y border-[#e4ded5] py-4"
        style={{
   
    
  }}
      >
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            will-change: transform;
            animation: marquee 34s linear infinite;
          }
          .marquee-group {
            display: flex;
            flex-shrink: 0;
            min-width: max-content;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="marquee-track">
          {[0, 1].map((group) => (
            <div key={group} className="marquee-group" aria-hidden={group === 1}>
              {marqueeLoop.map((item, i) => (
                <span
                  key={`${group}-${item.text}-${i}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap px-6 text-sm font-bold"
                >
                  <span className="text-[10px] text-[#D4AF37]">{item.symbol}</span>
                  <span className="text-[#1c1c1c]">{item.text}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

 
    </>
  );
}
