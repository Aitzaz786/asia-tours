export const bagKey = "asia-tours-bag-v1";
let memory: string[] = [];
export function readBag(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(bagKey) || "[]");
    return Array.isArray(value) ? [...new Set(value.filter((item): item is string => typeof item === "string"))] : [];
  } catch { return memory; }
}
export function writeBag(items: string[]) {
  memory = [...new Set(items)];
  try { localStorage.setItem(bagKey, JSON.stringify(memory)); } catch { /* Keep the in-memory bag. */ }
  window.dispatchEvent(new Event("bag-change"));
}
export function addToBag(name: string) { writeBag([...readBag(), name]); }
