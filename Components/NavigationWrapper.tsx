"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import WhatsAppFloatingButton from "./WhatsAppFloatingButton";
import BackToTopButton from "./BackToTopButton";
import ResponsiveMotionConfig from "./ResponsiveMotionConfig";
import { hasDarkHero } from "@/lib/hasDarkHero";

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const darkHero = hasDarkHero(pathname);

  if (isAdmin) {
    return (
      <ResponsiveMotionConfig>
        <ScrollToTop />
        {children}
      </ResponsiveMotionConfig>
    );
  }

  return (
    <ResponsiveMotionConfig>
      <ScrollToTop />
      <Navbar />
      <div className={`${darkHero ? "pt-0" : "pt-28"} min-h-screen`}>{children}</div>
      <WhatsAppFloatingButton />
      <BackToTopButton />
      <Footer />
    </ResponsiveMotionConfig>
  );
}
