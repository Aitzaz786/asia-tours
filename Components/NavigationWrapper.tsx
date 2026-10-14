"use client";
import { usePathname } from "next/navigation";
import ScrollToTop from "./ScrollToTop";
import ResponsiveMotionConfig from "./ResponsiveMotionConfig";
import GoldShell from "./gold/Shell";
export default function NavigationWrapper({children}:{children:React.ReactNode}){
 const pathname=usePathname();
 if(pathname?.startsWith("/admin"))return <ResponsiveMotionConfig><ScrollToTop/>{children}</ResponsiveMotionConfig>;
 return <GoldShell>{children}</GoldShell>;
}
