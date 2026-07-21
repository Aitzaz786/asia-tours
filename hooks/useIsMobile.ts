"use client";

import { useEffect, useState } from "react";

/** true below Tailwind `md` (768px). Defaults to true to avoid animation flash on phones. */
export function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
