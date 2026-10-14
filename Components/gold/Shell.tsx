"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GoldFooter } from "./Footer";

const links = [["/","Home"],["/about-us","About us"],["/services","Services"],["/areas","Areas"],["/contact-us","Contact us"]];
export default function GoldShell({children}:{children: React.ReactNode}) {
  const pathname = usePathname();
  return <ShellContent key={pathname} pathname={pathname}>{children}</ShellContent>;
}
function ShellContent({children,pathname}:{children:React.ReactNode;pathname:string}) {
  const [open,setOpen]=useState(false);
  return <div className={`gold-site ${pathname!=="/"?"inner-page":""} ${pathname.split("/").filter(Boolean).length>1?"detail-page":""}`} onKeyDown={e=>{if(e.key==="Escape")setOpen(false)}}>
    <a className="skip" href="#main">Skip to content</a>
    <div className="topbar"><div className="wrap"><span>Exceptional journeys. Across Pakistan.</span><a href="tel:+923004591145">24/7 assistance <span className="gold">＋92 300 4591145 ↗</span></a></div></div>
    <header><div className="wrap nav"><Link className="brand" href="/" aria-label="Asia Tours home"><img src="/gold/assets/a9b2e9d45dad38e4.webp" alt="Asia Tours" width="132" height="58" /></Link>
      <nav id="gold-nav" aria-label="Main navigation" className={open?"open":""}>{links.map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)} className={pathname===href||(href!=="/"&&pathname.startsWith(href+"/"))?"active":""} aria-current={pathname===href?"page":undefined}>{label}</Link>)}</nav>
      <Link className="btn goldbtn navcta" href="/contact-us">Plan your journey <span>↗</span></Link><button type="button" className="menubtn" aria-controls="gold-nav" aria-expanded={open} aria-label="Toggle navigation" onClick={()=>setOpen(!open)}>{open?"×":"☰"}</button></div></header>
    {children}
    <GoldFooter />
    <a className="whatsapp" href="https://wa.me/923004591145" target="_blank" rel="noopener noreferrer" aria-label="Chat with Asia Tours on WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.3-4.7A8.5 8.5 0 1 1 20.5 11.8Z"/><path d="M8 7.5c-1 2.5 3 6.5 5.5 7.5 1.3.4 2.3-.3 2.5-1.5l-2.5-1.2-1 1a10 10 0 0 1-3-3l1-1L9 7Z"/></svg></a>
  </div>;
}
