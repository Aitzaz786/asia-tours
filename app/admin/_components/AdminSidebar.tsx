"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpenText, Globe, LayoutDashboard, LogOut, MessageSquare, Settings } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare, key: "inquiries" },
  { href: "/admin/blogs", label: "Articles & Blog", icon: BookOpenText, key: "blogs" },
  { href: "/admin/seo", label: "SEO Manager", icon: Globe, key: "seo" },
  { href: "/admin/settings", label: "Settings", icon: Settings, key: "settings" },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname() ?? "";

  function isActive(key: string) {
    if (key === "dashboard") return pathname === "/admin";
    if (key === "inquiries") return pathname.startsWith("/admin/inquiries");
    if (key === "blogs") return pathname.startsWith("/admin/blogs");
    if (key === "seo") return pathname.startsWith("/admin/seo");
    if (key === "settings") return pathname.startsWith("/admin/settings");
    return false;
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="flex w-20 shrink-0 flex-col border-r border-[#39352a] bg-[#191919] px-2 py-6 text-white lg:w-64 lg:px-4">
      {/* Logo */}
      <div className="mb-8 px-2 lg:px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D2AC2F]/50 bg-[#D2AC2F]/10 font-serif text-lg font-bold italic text-[#E7C85B]">AT</div>
        <div className="mt-3 hidden lg:block"><p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#E7C85B]">Asia Tours</p><p className="mt-0.5 text-base font-black text-white">Admin Studio</p></div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5">
        {NAV.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            title={link.label}
            className={`flex items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-all lg:justify-start ${
              isActive(link.key)
                ? "bg-[#D2AC2F] text-[#191919] shadow-[0_8px_25px_rgba(210,172,47,.18)]"
                : "text-[#c9c9c9] hover:bg-white/5 hover:text-white"
            }`}
          >
            <link.icon className="h-4 w-4" />
            <span className="hidden lg:inline">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-[#999] transition-all hover:bg-red-500/10 hover:text-red-300 lg:justify-start"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden lg:inline">Log Out</span>
      </button>
    </aside>
  );
}
