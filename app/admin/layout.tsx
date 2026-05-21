import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin – Asia Tours Pakistan",
  robots: "noindex,nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f5f5f5]">{children}</div>;
}
