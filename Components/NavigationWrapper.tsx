"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import WhatsAppFloatingButton from "./WhatsAppFloatingButton";

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        <ScrollToTop />
        {children}
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="pt-28 min-h-screen">{children}</div>
      <WhatsAppFloatingButton />
      <Footer />
    </>
  );
}
