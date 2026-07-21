"use client";

import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

/** Disables all Framer Motion animations on phone screens (< md). */
export default function ResponsiveMotionConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default to reduced so phones don't flash animations before hydrate
  const [reducedMotion, setReducedMotion] = useState<"always" | "never">("always");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setReducedMotion(mq.matches ? "always" : "never");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return <MotionConfig reducedMotion={reducedMotion}>{children}</MotionConfig>;
}
