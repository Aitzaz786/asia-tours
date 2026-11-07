"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Check, Luggage, ShoppingBag, Trash2, X } from "lucide-react";
import { fleets, getFleetSlug, highlight, money, vehicleType } from "./data";
import { readJourney } from "./JourneyLink";
import { addToBag, readBag, writeBag } from "./bagStore";

function useBag() {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => {
      const stored=readBag();
      const valid=stored.filter(name=>fleets.some(vehicle=>vehicle.name===name));
      if(valid.length!==stored.length)writeBag(valid);
      else setItems(valid);
    };
    sync();
    window.addEventListener("bag-change", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("bag-change", sync); window.removeEventListener("storage", sync); };
  }, []);
  return items;
}

export function BagIcon() {
  const items = useBag();
  return <Link href="/bag" className="bag-icon" aria-label={`View booking bag, ${items.length} selected`} title="View your saved vehicles">
    <ShoppingBag size={25} strokeWidth={1.8}/><span aria-hidden="true">{items.length}</span>
  </Link>;
}

export function AddToBag({name, detail=false}:{name:string;detail?:boolean}) {
  const items = useBag();
  const added = items.includes(name);
  const [confirm,setConfirm]=useState(false);
  const selectedVehicles=items.map(item=>fleets.find(vehicle=>vehicle.name===item)).filter((vehicle):vehicle is NonNullable<typeof vehicle>=>Boolean(vehicle));
  const selectedGuideTotal=selectedVehicles.reduce((total,vehicle)=>total+vehicle.price,0);
  const help=added?"This vehicle is already saved in your booking bag.":"Save this vehicle to compare its details and request one complete quote.";
  useEffect(()=>{
    if(!confirm)return;
    const html=document.documentElement,body=document.body;
    const htmlOverflow=html.style.overflow,bodyOverflow=body.style.overflow;
    const lenis=(window as Window&{lenis?:{stop?:()=>void;start?:()=>void}}).lenis;
    const closeOnEscape=(event:KeyboardEvent)=>{if(event.key==="Escape")setConfirm(false)};
    html.classList.add("bag-drawer-open");
    html.style.overflow="hidden";
    body.style.overflow="hidden";
    lenis?.stop?.();
    window.addEventListener("keydown",closeOnEscape);
    return()=>{window.removeEventListener("keydown",closeOnEscape);html.classList.remove("bag-drawer-open");html.style.overflow=htmlOverflow;body.style.overflow=bodyOverflow;lenis?.start?.()};
  },[confirm]);
  return <><button className={`bag-add ${detail?"bag-add--detail":""} ${added?"is-added":""}`} type="button" aria-pressed={added} title={help} data-tooltip={help} onClick={()=>{if(!added){addToBag(name);setConfirm(true)}}}>
    <span>{added?"In booking bag":detail?"Add to booking bag":"Add to bag"}</span>
    {added?<Check size={18}/>:<ShoppingBag size={18} strokeWidth={1.8}/>}
  </button>{confirm&&createPortal(<div className="bag-confirm-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)setConfirm(false)}}><section className="bag-confirm" role="dialog" aria-modal="true" aria-labelledby="bag-confirm-title">
    <header className="bag-confirm-header"><div><p className="eyebrow">YOUR SHORTLIST</p><h2 id="bag-confirm-title">Booking bag <span>{selectedVehicles.length}</span></h2><p>{selectedVehicles.length===1?"One vehicle saved for comparison.":`${selectedVehicles.length} vehicles saved for comparison.`}</p></div><button className="bag-confirm-close" type="button" aria-label="Close" onClick={()=>setConfirm(false)}><X size={22}/></button></header>
    <div className="bag-confirm-list">{selectedVehicles.map(vehicle=><article className="bag-confirm-product" key={vehicle.name}><Link className="bag-confirm-image" href={`/services/${getFleetSlug(vehicle.name)}`}><img src={vehicle.image} alt={vehicle.imageAlt} width="640" height="420"/></Link><div className="bag-confirm-product-copy"><span>{vehicleType(vehicle)}</span><h3>{vehicle.name}</h3><div className="bag-confirm-meta" aria-label={`${vehicle.name} specifications`}><span>{highlight(vehicle,"Passengers")} seats</span><i/><span>{highlight(vehicle,"Fuel")}</span><i/><span>A/C {highlight(vehicle,"A/C")}</span></div><div className="bag-confirm-card-footer"><div className="bag-confirm-rate"><strong>PKR {money(vehicle.price)}</strong><span>/ day</span></div><Link className="bag-confirm-details" href={`/services/${getFleetSlug(vehicle.name)}`} aria-label={`View ${vehicle.name} details`}>Details <span>↗</span></Link></div></div><button className="bag-confirm-remove" type="button" aria-label={`Remove ${vehicle.name}`} title={`Remove ${vehicle.name}`} onClick={()=>writeBag(items.filter(item=>item!==vehicle.name))}><Trash2 size={16}/></button></article>)}{selectedVehicles.length===0&&<p className="bag-confirm-empty">Your booking bag is empty.</p>}</div>
    <footer className="bag-confirm-footer"><div className="bag-confirm-summary"><span>Combined guide rate<small>Final quote confirmed by our team</small></span><strong>PKR {money(selectedGuideTotal)}<small>/ day</small></strong></div><div className="bag-confirm-actions"><Link className="btn goldbtn" href="/bag">View booking bag <span>↗</span></Link><button className="bag-confirm-continue" type="button" onClick={()=>setConfirm(false)}>Continue browsing</button></div></footer>
  </section></div>,document.querySelector(".gold-site")||document.body)}</>;
}

export default function BagPage() {
  const items = useBag();
  const [journey,setJourney]=useState<Record<string,string>>({});
  useEffect(()=>setJourney(readJourney()),[]);
  const vehicles = items.map(name=>fleets.find(vehicle=>vehicle.name===name)).filter((vehicle):vehicle is NonNullable<typeof vehicle>=>Boolean(vehicle));
  const guideTotal=vehicles.reduce((total,vehicle)=>total+vehicle.price,0);
  function whatsapp() {
    const vehicleLines=vehicles.flatMap((vehicle,index)=>[
      `${index+1}. ${vehicle.name} — PKR ${money(vehicle.price)} / day`,
      `   ${vehicleType(vehicle)} · ${highlight(vehicle,"Passengers")} passengers · ${highlight(vehicle,"Fuel")} · A/C ${highlight(vehicle,"A/C")} · ${highlight(vehicle,"Mileage")}`,
    ]);
    const journeyLines=["city","date","service","passengers"].filter(key=>journey[key]).map(key=>`${key[0].toUpperCase()+key.slice(1)}: ${journey[key]}`);
    const text=["Hello Asia Tours, please prepare a quote for these vehicles:",...vehicleLines,...journeyLines,"Please confirm availability, inclusions and final pricing."].join("\n");
    window.open("https://wa.me/923004591145?text="+encodeURIComponent(text),"_blank","noopener,noreferrer");
  }
  return <main id="main" className="wrap section bag-page">
    <p className="eyebrow">YOUR VEHICLE SHORTLIST</p>
    <h1>Booking bag <span>({vehicles.length})</span></h1>
    <p className="lead">Compare your selected vehicles, then share the complete shortlist with our team.</p>
    {vehicles.length?<div className="bag-layout"><div className="bag-list">
      {vehicles.map(vehicle=><article className="bag-item" key={vehicle.name}>
        <Link className="bag-item-image" href={`/services/${getFleetSlug(vehicle.name)}`}><img src={vehicle.image} alt={vehicle.imageAlt} width="640" height="420"/></Link>
        <div className="bag-item-copy">
          <div className="bag-item-heading"><div><span>{vehicleType(vehicle)}</span><h2>{vehicle.name}</h2></div><button aria-label={`Remove ${vehicle.name}`} onClick={()=>writeBag(items.filter(item=>item!==vehicle.name))}><Trash2 size={19}/></button></div>
          <div className="bag-specs">
            <span><small>Passengers</small>{highlight(vehicle,"Passengers")}</span>
            <span><small>Fuel</small>{highlight(vehicle,"Fuel")}</span>
            <span><small>Air conditioning</small>{highlight(vehicle,"A/C")}</span>
            <span><small>Mileage</small>{highlight(vehicle,"Mileage")}</span>
          </div>
          <div className="bag-item-footer"><p><small>DAILY GUIDE RATE · PKR</small><strong>{money(vehicle.price)}</strong> / day</p><Link className="textlink dark" href={`/services/${getFleetSlug(vehicle.name)}`}>View full details <span>↗</span></Link></div>
        </div>
      </article>)}
      <Link href="/services#collection" className="textlink dark">Continue browsing <span>↗</span></Link>
    </div><aside className="planningpanel bag-summary">
      <p className="eyebrow">YOUR SHORTLIST</p><h2>{vehicles.length} selected {vehicles.length===1?"vehicle":"vehicles"}.</h2>
      <p>Share your bag with our team to check availability, dates, inclusions and the final quote.</p>
      <div className="summary-line"><span>Combined guide rate<small>Per day, before final quote</small></span><strong>PKR {money(guideTotal)}</strong></div>
      {Object.values(journey).some(Boolean)&&<div className="summary-journey"><h3>Saved journey details</h3>{journey.city&&<p><strong>Pickup:</strong> {journey.city}</p>}{journey.date&&<p><strong>Date:</strong> {journey.date}</p>}{journey.service&&<p><strong>Service:</strong> {journey.service}</p>}{journey.passengers&&<p><strong>Passengers:</strong> {journey.passengers}</p>}</div>}
      <button className="btn goldbtn" onClick={whatsapp}>Enquire on WhatsApp <span>↗</span></button>
      <p className="fineprint">Your shortlist is saved in this browser. No payment is taken here.</p>
    </aside></div>:<div className="bag-empty"><Luggage size={48} strokeWidth={1.6}/><h2>Your booking bag is empty.</h2><p>Explore the collection and save the vehicles you want to compare.</p><Link className="btn goldbtn" href="/services#collection">Explore our fleet <span>↗</span></Link></div>}
  </main>;
}
