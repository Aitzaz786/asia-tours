"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BagIcon } from "./Bag";
import { GoldFooter } from "./Footer";
import WhatsAppFloatingButton from "../WhatsAppFloatingButton";
import BackToTopButton from "../BackToTopButton";

const links = [["/","Home"],["/about-us","About us"],["/services","Services"],["/areas","Areas"],["/blog","Blog"],["/contact-us","Contact us"]];
export default function GoldShell({children}:{children: React.ReactNode}) {
  const pathname = usePathname();
  useEffect(() => {
    // Start new pages above the sticky header; keep explicit section links intact.
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return <ShellContent key={pathname} pathname={pathname}>{children}</ShellContent>;
}
function ShellContent({children,pathname}:{children:React.ReactNode;pathname:string}) {
  const [open,setOpen]=useState(false);
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const container=root.current;
    if(!container)return;
    const running=new Map<HTMLDetailsElement,{animation:Animation;expanded:boolean}>();
    const setExpanded=(details:HTMLDetailsElement,expanded:boolean)=>{
      const previous=running.get(details);
      const current=previous?.expanded??details.open;
      if(current===expanded)return;
      const from=details.getBoundingClientRect().height;
      previous?.animation.cancel();
      running.delete(details);
      details.style.height='';
      details.style.overflow='hidden';
      details.open=expanded;
      const to=details.getBoundingClientRect().height;
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        details.style.overflow='';
        return;
      }
      details.open=true;
      const animation=details.animate([{height:`${from}px`},{height:`${to}px`}],{duration:280,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
      running.set(details,{animation,expanded});
      animation.onfinish=()=>{
        details.open=expanded;
        animation.cancel();
        details.style.overflow='';
        running.delete(details);
      };
    };
    const click=(event:MouseEvent)=>{
      const summary=(event.target as Element).closest('summary');
      const details=summary?.parentElement;
      if(!(details instanceof HTMLDetailsElement)||!container.contains(details))return;
      if((event.target as Element).closest('a,button,input,select'))return;
      event.preventDefault();
      const expanded=!(running.get(details)?.expanded??details.open);
      if(expanded){
        const group=details.closest('.faqs')??details.parentElement;
        group?.querySelectorAll<HTMLDetailsElement>('details[open]').forEach(item=>{
          if(item!==details)setExpanded(item,false);
        });
        running.forEach((state,item)=>{
          if(item!==details&&state.expanded&&group?.contains(item))setExpanded(item,false);
        });
      }
      setExpanded(details,expanded);
    };
    container.addEventListener('click',click);
    return()=>{container.removeEventListener('click',click);running.forEach(({animation,expanded},details)=>{animation.cancel();details.open=expanded;details.style.overflow='';});};
  },[]);
  return <div ref={root} className={`gold-site ${pathname!=="/"?"inner-page":""} ${pathname.split("/").filter(Boolean).length>1?"detail-page":""}`} onKeyDown={e=>{if(e.key==="Escape")setOpen(false)}}>
    <a className="skip" href="#main">Skip to content</a>
    <div className="topbar"><div className="wrap"><span>Exceptional journeys. Across Pakistan.</span><a href="tel:+923004591145">24/7 assistance <span className="gold">＋92 300 4591145 ↗</span></a></div></div>
    <header className="site-header"><div className="wrap nav"><Link className="brand" href="/" aria-label="Asia Tours home"><img src="/gold/assets/a9b2e9d45dad38e4.webp" alt="Asia Tours" width="132" height="58" /></Link>
      <nav id="gold-nav" aria-label="Main navigation" className={open?"open":""}>{links.map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)} className={pathname===href||(href!=="/"&&pathname.startsWith(href+"/"))?"active":""} aria-current={pathname===href?"page":undefined}>{label}</Link>)}</nav>
      <div className="navtools"><BagIcon/><button type="button" className="menubtn" aria-controls="gold-nav" aria-expanded={open} aria-label={open?"Close navigation":"Open navigation"} onClick={()=>setOpen(!open)}>{open?<X size={25}/>:<Menu size={25}/>}</button></div></div></header>
    {children}
    <GoldFooter />
    <WhatsAppFloatingButton />
    <BackToTopButton />
  </div>;
}
