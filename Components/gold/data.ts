import { fleets, getFleetSlug, type Fleet } from "@/Data/cars";
export { fleets, getFleetSlug };
export const money = (value: number) => value.toLocaleString("en-US");
export function highlight(fleet: Fleet, label: string) {
  const value = fleet.highlights?.find(item => item.label === label)?.value;
  return typeof value === "boolean" ? (value ? "Yes" : "No") : String(value ?? "—");
}
export function vehicleType(fleet: Fleet) {
  if (/limousine/i.test(fleet.name)) return "Limousine";
  return /Audi|Maybach/i.test(fleet.name) ? "Sedan" : "SUV";
}
const order = ["Mercedes-Maybach S580", "Mercedes-Benz G-Wagon", "Audi A6", "Toyota Land Cruiser V8", "Range Rover", "GMC Limousine"];
export const orderedFleet = [...fleets].sort((a,b) => (order.indexOf(a.name) < 0 ? 99 : order.indexOf(a.name)) - (order.indexOf(b.name) < 0 ? 99 : order.indexOf(b.name)));
export type JourneyContext = { city?: string; vehicle?: string; service?: string; date?: string };
export function inquiryUrl(context: JourneyContext = {}) {
  const params = new URLSearchParams();
  Object.entries(context).forEach(([key,value]) => { if(value) params.set(key,value); });
  return "/contact-us" + (params.size ? "?" + params.toString() : "");
}
