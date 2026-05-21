"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type WindowWithLenis = Window & {
  lenis?: Lenis;
};

export default function LenisSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    const windowWithLenis = window as unknown as WindowWithLenis;
    windowWithLenis.lenis = lenis;

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      if (windowWithLenis.lenis === lenis) {
        Reflect.deleteProperty(windowWithLenis, "lenis");
      }
      lenis.destroy();
    };
  }, []);

  return null;
}
