"use client";

import { useEffect, useRef, useState } from "react";




const testimonials = [
  {
    quote: "The pickup felt calm and well organised. Every detail was clear before the journey began.",
    name: "Airport transfer client",
    journey: "Lahore airport arrival",
  },
  {
    quote: "The vehicle suited the occasion beautifully, and the team stayed responsive from enquiry to arrival.",
    name: "Wedding transport client",
    journey: "Private event in Lahore",
  },
  {
    quote: "A comfortable car, thoughtful timing and a straightforward plan made the business day much easier.",
    name: "Corporate travel client",
    journey: "Executive city travel",
  },
];

function AnimatedNumber({value,suffix=""}:{value:number;suffix?:string}){
  const [display,setDisplay]=useState(0);
  const ref=useRef<HTMLSpanElement>(null);
  useEffect(()=>{
    const node=ref.current;
    if(!node)return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame=0;
    const start=()=>{
      if(reduced){setDisplay(value);return;}
      const started=performance.now();
      const duration=1200;
      const tick=(time:number)=>{
        const progress=Math.min((time-started)/duration,1);
        const eased=1-Math.pow(1-progress,3);
        setDisplay(Math.round(value*eased));
        if(progress<1)frame=requestAnimationFrame(tick);
      };
      frame=requestAnimationFrame(tick);
    };
    const observer=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){start();observer.disconnect();}
    },{threshold:.35});
    observer.observe(node);
    return()=>{observer.disconnect();cancelAnimationFrame(frame)};
  },[value]);
  return <span ref={ref} aria-label={`${value}${suffix}`}><span aria-hidden="true">{display}{suffix}</span></span>;
}

export function TrustCounters({compact=false}:{compact?:boolean}){
  const stats=[
    {value:2000,suffix:"+",label:"Luxury rentals completed"},
    {value:1800,suffix:"+",label:"Happy clients"},
    {value:15,suffix:"+",label:"Years of driving trust"},
    {value:24,suffix:"/7",label:"Premium support"},
  ];
  return <section className={`trust-section ${compact?"is-compact":""}`} aria-labelledby={compact?undefined:"trust-title"}>
    <div className="wrap trust-layout">
      {!compact&&<div className="trust-intro"><p className="eyebrow">THE CONFIDENCE TO GO FURTHER</p><h2 id="trust-title">Trusted journeys.<br/><span>Lasting connections.</span></h2><p>Local knowledge, a considered fleet and personal help whenever your plans need it.</p></div>}
      <div className="trust-stats">{stats.map(stat=><div className="trust-stat" key={stat.label}><strong><AnimatedNumber value={stat.value} suffix={stat.suffix}/></strong><span>{stat.label}</span></div>)}</div>
    </div>
  </section>;
}

export function Testimonials(){
 const [active,setActive]=useState(0);const item=testimonials[active];
 return <section className="testimonials section" id="testimonials" aria-labelledby="testimonials-title"><div className="wrap review-layout"><div className="review-intro"><p className="eyebrow">THE PASSENGER PERSPECTIVE</p><h2 id="testimonials-title">Every journey.<br/><span>A story to share.</span></h2><p>Personal attention, from the first conversation to your final destination.</p><div className="review-controls"><button type="button" aria-label="Previous testimonial" onClick={()=>setActive(n=>(n+testimonials.length-1)%testimonials.length)}>←</button><span>0{active+1} / 0{testimonials.length}</span><button type="button" aria-label="Next testimonial" onClick={()=>setActive(n=>(n+1)%testimonials.length)}>→</button></div></div><article className="review-feature" aria-live="polite"><span className="review-mark" aria-hidden="true">“</span><p className="review-sample">Sample testimonial · preview copy</p><blockquote>{item.quote}</blockquote><div className="review-person"><span className="review-avatar" aria-hidden="true">{['AT','WT','CT'][active]}</span><div><strong>{item.name}</strong><small>{item.journey}</small></div></div><div className="review-tabs" role="group" aria-label="Choose testimonial">{testimonials.map((review,index)=><button type="button" key={review.name} aria-label={`Show testimonial ${index+1}`} aria-pressed={active===index} onClick={()=>setActive(index)}/>)}</div></article></div></section>;
}
