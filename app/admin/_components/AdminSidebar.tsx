"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe, LayoutDashboard, LogOut, MessageSquare, Settings } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare, key: "inquiries" },
  { href: "/admin/seo", label: "SEO Manager", icon: Globe, key: "seo" },
  { href: "/admin/settings", label: "Settings", icon: Settings, key: "settings" },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname() ?? "";

  function isActive(key: string) {
    if (key === "dashboard") return pathname === "/admin";
    if (key === "inquiries") return pathname.startsWith("/admin/inquiries");
    if (key === "seo") return pathname.startsWith("/admin/seo");
    if (key === "settings") return pathname.startsWith("/admin/settings");
    return false;
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-gray-200 bg-white px-3 py-6">
      {/* Logo */}
      <div className="mb-8 px-3">
        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#ff4500]">Asia Tours</p>
        <p className="mt-0.5 text-base font-black text-gray-900">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5">
        {NAV.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
              isActive(link.key)
                ? "bg-orange-50 text-[#ff4500]"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
      >
        <LogOut className="h-4 w-4" />
        Log Out
      </button>
    </aside>
  );
}
