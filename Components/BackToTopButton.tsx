"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import type Lenis from "lenis";

type WindowWithLenis = Window & { lenis?: Lenis };

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const contactOpenRef = useRef(false);

  useEffect(() => {
    const updateVisibility = () => {
      if (contactOpenRef.current) return;
      const scrollTop = Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      setVisible(scrollTop > 48);
    };
    const handleLenisScroll = ({ scroll }: { scroll: number }) => {
      if (!contactOpenRef.current) setVisible(scroll > 48);
    };
    const handleContactToggle = (event: Event) => {
      const { open } = (event as CustomEvent<{ open: boolean }>).detail;
      contactOpenRef.current = open;
      if (open) setVisible(false);
      else updateVisibility();
    };
    const lenis = (window as unknown as WindowWithLenis).lenis;

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("asia-tours-contact-toggle", handleContactToggle);
    lenis?.on("scroll", handleLenisScroll);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("asia-tours-contact-toggle", handleContactToggle);
      lenis?.off("scroll", handleLenisScroll);
    };
  }, []);

  const scrollToTop = () => {
    const lenis = (window as unknown as WindowWithLenis).lenis;
    if (lenis) {
      lenis.scrollTo(0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-[4.75rem] right-4 z-[1100] inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#B8860B] bg-[#D4AF37] text-[#0A0A0A] transition-all duration-300 sm:bottom-[5.25rem] sm:right-7 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
