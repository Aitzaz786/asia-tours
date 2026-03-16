export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  details: string;
  highlights: string[];
};

export const services: ServiceItem[] = [
  {
    slug: "airport-transfer",
    title: "Airport Transfer",
    summary: "On-time pickups and drop-offs with real-time flight tracking.",
    details:
      "Our airport transfer service keeps your journey smooth from terminal to destination. Professional chauffeurs, clean vehicles, and live flight monitoring ensure stress-free arrivals and departures.",
    highlights: [
      "24/7 airport availability",
      "Meet-and-greet assistance",
      "Flight delay tracking",
      "Comfort-first premium vehicles",
    ],
  },
  {
    slug: "corporate-tours",
    title: "Corporate Tours",
    summary: "Reliable executive transport for meetings, events, and business travel.",
    details:
      "Designed for teams and executives, corporate tours provide punctual transportation with discreet service standards. Perfect for conferences, roadshows, and daily business movement.",
    highlights: [
      "Executive class fleet",
      "Multi-stop itinerary support",
      "Invoice-ready billing",
      "Dedicated account handling",
    ],
  },
  {
    slug: "luxury-vehicles",
    title: "Luxury Vehicles",
    summary: "High-end cars curated for comfort, style, and memorable travel.",
    details:
      "Choose from a premium range of luxury sedans and SUVs for city rides, weekend escapes, and special experiences. Every vehicle is maintained to top-tier standards.",
    highlights: [
      "Top-brand models",
      "Impeccable interiors",
      "Flexible hourly bookings",
      "Privacy and premium comfort",
    ],
  },
  {
    slug: "custom-itineraries",
    title: "Custom Itineraries",
    summary: "Personalized transportation plans tailored to your schedule.",
    details:
      "From solo escapes to family trips, we design route plans around your preferences and timing. Custom itineraries keep your travel efficient and enjoyable.",
    highlights: [
      "Made-to-order travel plans",
      "Local route expertise",
      "Flexible modifications",
      "Multi-day planning support",
    ],
  },
  {
    slug: "events-wedding",
    title: "Events & Wedding",
    summary: "Elegant movement plans for special occasions and celebrations.",
    details:
      "Make your big day seamless with coordinated transport for couples, guests, and venue transitions. Our event team ensures every ride aligns with your timeline.",
    highlights: [
      "Guest transport coordination",
      "Decor-friendly premium options",
      "Precise schedule management",
      "Ceremony and reception support",
    ],
  },
  {
    slug: "chauffeur-service",
    title: "Chauffeur Service",
    summary: "Professional chauffeurs delivering safe and polished journeys.",
    details:
      "Enjoy reliable door-to-door service with trained chauffeurs focused on safety, courtesy, and punctuality. Ideal for business, leisure, and evening travel.",
    highlights: [
      "Experienced licensed chauffeurs",
      "Discreet and courteous service",
      "Hourly or full-day options",
      "Premium support experience",
    ],
  },
];
