"use client";
import Link from "next/link";
import { addToBag } from "./bagStore";
import type { ComponentProps } from "react";
export const journeyKey = "asia-tours-journey-v1";
export type Journey = Record<string, string>;
export function readJourney(): Journey {
  try { const data = JSON.parse(localStorage.getItem(journeyKey) || "{}"); return data && typeof data === "object" && !Array.isArray(data) ? Object.fromEntries(Object.entries(data).filter((entry): entry is [string,string] => typeof entry[1] === "string")) : {}; } catch { return {}; }
}
export function saveJourney(values: Journey) {
  const next = {...readJourney(), ...values};
  try { localStorage.setItem(journeyKey, JSON.stringify(next)); } catch { /* In-memory form remains usable when storage is unavailable. */ }
  return next;
}
export default function JourneyLink({href, onClick, ...props}: ComponentProps<typeof Link>) {
  const raw = typeof href === "string" ? href : "";
  const internal = raw.startsWith("/") && !raw.startsWith("//");
  const url = internal ? new URL(raw, "https://asiatourspk.com") : null;
  const values: Journey = {};
  for (const key of ["city","vehicle","service","date","passengers"]) {
    const value = url?.searchParams.get(key);
    if (value) { values[key] = value; url!.searchParams.delete(key); }
  }
  const booking = url?.pathname.replace(/\/$/, "") === "/contact-us" && Object.keys(values).length > 0;
  const vehicleBooking = booking && Boolean(values.vehicle);
  const clean = url ? (vehicleBooking ? "/bag" : url.pathname + url.search + url.hash) : href;
  return <Link {...props} href={clean} onClick={event => {
    onClick?.(event);
    if (!event.defaultPrevented && Object.keys(values).length) {
      saveJourney(values);
      if (vehicleBooking) addToBag(values.vehicle);
    }
  }}/>;
}
