"use client";

import { useRef, useState } from "react";
import { MessageCircleMore, PhoneCall, X } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/923004591145";

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor">
      <path d="M16.02 4C9.4 4 4.02 9.33 4.02 15.88c0 2.1.56 4.15 1.62 5.96L4 28l6.34-1.64a12.11 12.11 0 0 0 5.68 1.42C22.64 27.78 28 22.45 28 15.9 28 9.33 22.64 4 16.02 4Zm0 21.75c-1.76 0-3.49-.47-5-1.36l-.36-.21-3.76.98.99-3.63-.24-.38a9.67 9.67 0 0 1-1.5-5.27c0-5.43 4.43-9.85 9.87-9.85 5.43 0 9.85 4.42 9.85 9.86 0 5.43-4.42 9.86-9.85 9.86Zm5.4-7.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.29-.77.96-.95 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.46a8.86 8.86 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.36-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.07c.15.2 2.1 3.2 5.08 4.48.71.31 1.27.5 1.7.64.72.23 1.37.2 1.88.12.58-.09 1.75-.72 2-1.41.25-.7.25-1.3.17-1.41-.07-.13-.27-.2-.56-.35Z" />
    </svg>
  );
}

export default function WhatsAppFloatingButton() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const toggleContactMenu = () => {
    const nextOpen = !openRef.current;
    openRef.current = nextOpen;
    setOpen(nextOpen);
    window.dispatchEvent(
      new CustomEvent("asia-tours-contact-toggle", {
        detail: { open: nextOpen },
      })
    );
  };

  // Always bottom-right: message below, back-to-top above (all breakpoints)
  return (
    <div className="fixed bottom-5 right-4 z-[1000] sm:bottom-7 sm:right-7">
      <div
        aria-hidden={!open}
        className={`absolute bottom-full right-0 mb-3 flex origin-bottom-right flex-col items-center gap-2 transition-[opacity,transform] duration-300 ease-out ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
      >
        <a
          href="tel:+923004591145"
          aria-label="Call Asia Tours"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-white text-[#B8860B]"
        >
          <PhoneCall className="h-5 w-5" strokeWidth={2.2} />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Asia Tours on WhatsApp"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#25D366]/30 bg-white text-[#25D366]"
        >
          <WhatsAppIcon />
        </a>
      </div>

      <button
        type="button"
        onClick={toggleContactMenu}
        aria-label={open ? "Close contact options" : "Open contact options"}
        aria-expanded={open}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#B8860B] bg-[#D4AF37] text-[#0A0A0A]"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircleMore className="h-5 w-5" />}
      </button>
    </div>
  );
}
