/** Routes that use the full-bleed dark CSS hero (navbar transparent at top, no pt-28). */
const SERVICE_CATEGORY_HEROES = new Set([
  "/services",
  "/services/airport-transfer",
  "/services/chauffeur-service",
  "/services/luxury-vehicles",
  "/services/corporate-tours",
  "/services/custom-itineraries",
  "/services/events-wedding",
]);

export function hasDarkHero(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  if (pathname === "/") return true;
  if (pathname === "/about-us") return true;
  if (pathname === "/terms-and-conditions" || pathname === "/privacy-policy") return true;
  if (pathname === "/areas" || pathname.startsWith("/areas/")) return true;
  if (SERVICE_CATEGORY_HEROES.has(pathname)) return true;
  return false;
}
