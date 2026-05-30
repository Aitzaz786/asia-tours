"use client";

const WHATSAPP_URL = "https://wa.me/923004591145";

export default function WhatsAppFloatingButton() {
  return (
    <div className="fixed bottom-5 right-5 z-[1000] sm:bottom-7 sm:right-7">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Asia Tours on WhatsApp"
        className="group relative flex items-center justify-end gap-3 rounded-full "
      >
        <span className="pointer-events-none hidden translate-x-2 whitespace-nowrap rounded-full bg-black px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          Chat with us on WhatsApp
        </span>

        <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white  transition-all duration-300 group-hover:-translate-y-[0.2rem] group-hover:bg-[#1ebe5d] sm:h-16 sm:w-16">
          <span className="absolute inset-0 rounded-full border border-white/40" />
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="h-8 w-8 sm:h-9 sm:w-9"
            fill="currentColor"
          >
            <path d="M16.02 4C9.4 4 4.02 9.33 4.02 15.88c0 2.1.56 4.15 1.62 5.96L4 28l6.34-1.64a12.11 12.11 0 0 0 5.68 1.42C22.64 27.78 28 22.45 28 15.9 28 9.33 22.64 4 16.02 4Zm0 21.75c-1.76 0-3.49-.47-5-1.36l-.36-.21-3.76.98.99-3.63-.24-.38a9.67 9.67 0 0 1-1.5-5.27c0-5.43 4.43-9.85 9.87-9.85 5.43 0 9.85 4.42 9.85 9.86 0 5.43-4.42 9.86-9.85 9.86Zm5.4-7.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.29-.77.96-.95 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.46a8.86 8.86 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.36-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.07c.15.2 2.1 3.2 5.08 4.48.71.31 1.27.5 1.7.64.72.23 1.37.2 1.88.12.58-.09 1.75-.72 2-1.41.25-.7.25-1.3.17-1.41-.07-.13-.27-.2-.56-.35Z" />
          </svg>
        </span>
      </a>
    </div>
  );
}
