export type ServiceTypeContent = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  description: string;
  overviewTitle: string;
  overviewAccent: string;
  overviewBody: string[];
  highlights: string[];
  image: string;
  imageAlt: string;
};

export const serviceTypeContent: ServiceTypeContent[] = [
  {
    slug: "airport-transfer",
    title: "Airport Transfer",
    eyebrow: "Airport Transfer",
    headline: "Arrive on time,",
    headlineAccent: "every time.",
    description:
      "Punctual, coordinated airport pickups and drop-offs — professionally managed around your flight schedule.",
    overviewTitle: "Seamless airport",
    overviewAccent: "transfers",
    overviewBody: [
      "Our airport transfer service is built around one priority: getting you there on time without stress. We monitor your flight in real time, adjusting for delays or early arrivals, so your driver is always ready the moment you land.",
      "From the arrivals hall to your destination, our uniformed professionals handle everything — meet and greet, luggage, and navigation. All with fixed, transparent pricing and zero surge fees.",
    ],
    highlights: [
      "Flight tracking included",
      "Meet & greet service",
      "Luggage assistance",
      "24/7 availability",
      "Fixed, transparent pricing",
      "All terminals covered",
    ],
    image: "/hero-bg.webp",
    imageAlt: "Premium airport transfer vehicle",
  },
  {
    slug: "corporate-tours",
    title: "Corporate Tours",
    eyebrow: "Corporate Tours",
    headline: "Executive travel,",
    headlineAccent: "perfectly managed.",
    description:
      "Reliable premium executive transport for meetings, events, and business travel — impress clients with every arrival.",
    overviewTitle: "Business travel,",
    overviewAccent: "elevated",
    overviewBody: [
      "Corporate tours are designed for executives and teams who need punctual, discreet movement between meetings, conferences, and client visits.",
      "From multi-stop itineraries to invoice-ready billing, we keep your business travel polished, reliable, and easy to manage.",
    ],
    highlights: [
      "Executive class fleet",
      "Multi-stop itinerary support",
      "Invoice-ready billing",
      "Dedicated account handling",
      "On-time meeting arrivals",
      "Discreet professional service",
    ],
    image: "/2023-BMW-i7-exterior-1-scaled.webp",
    imageAlt: "Executive corporate transport",
  },
  {
    slug: "luxury-vehicles",
    title: "Luxury Vehicles",
    eyebrow: "Luxury Vehicles",
    headline: "Drive in class,",
    headlineAccent: "arrive in style.",
    description:
      "Our premium fleet — Range Rover, BMW 7 Series, and Mercedes S-Class — for the most discerning travelers.",
    overviewTitle: "Curated luxury",
    overviewAccent: "fleet",
    overviewBody: [
      "Choose from a premium range of luxury sedans and SUVs for city rides, weekend escapes, and special experiences.",
      "Every vehicle is maintained to top-tier standards with impeccable interiors, privacy, and refined comfort throughout the journey.",
    ],
    highlights: [
      "Top-brand models",
      "Impeccable interiors",
      "Flexible hourly bookings",
      "Privacy and premium comfort",
      "Chauffeur optional",
      "Presentation-ready vehicles",
    ],
    image: "/range-rover-vogue-01.webp",
    imageAlt: "Luxury rental vehicle",
  },
  {
    slug: "custom-itineraries",
    title: "Custom Itineraries",
    eyebrow: "Custom Itineraries",
    headline: "Your journey,",
    headlineAccent: "perfectly planned.",
    description:
      "Multi-city routes, sightseeing stops, and flexible schedules — fully coordinated around you, every step of the way.",
    overviewTitle: "Routes made",
    overviewAccent: "for you",
    overviewBody: [
      "From solo escapes to family trips, we design route plans around your preferences and timing so every stop feels intentional.",
      "Local route expertise and flexible modifications keep your travel efficient, comfortable, and enjoyable from start to finish.",
    ],
    highlights: [
      "Made-to-order travel plans",
      "Local route expertise",
      "Flexible modifications",
      "Multi-day planning support",
      "Sightseeing coordination",
      "Door-to-door comfort",
    ],
    image: "/Badshahi_Mosque_front_picture.webp",
    imageAlt: "Custom travel itinerary destinations",
  },
  {
    slug: "events-wedding",
    title: "Events & Wedding",
    eyebrow: "Events & Wedding",
    headline: "Make every moment",
    headlineAccent: "unforgettable.",
    description:
      "Premium fleet, decorated vehicles, and VIP treatment — because your special occasions deserve nothing less than perfect.",
    overviewTitle: "Celebration-ready",
    overviewAccent: "transport",
    overviewBody: [
      "Make your big day seamless with coordinated transport for couples, guests, and venue transitions.",
      "Our event team ensures every ride aligns with your timeline — polished vehicles, precise scheduling, and VIP-level care.",
    ],
    highlights: [
      "Guest transport coordination",
      "Decor-friendly premium options",
      "Precise schedule management",
      "Ceremony and reception support",
      "VIP arrival experience",
      "Group movement planning",
    ],
    image: "/black.webp",
    imageAlt: "Wedding and event luxury car",
  },
  {
    slug: "chauffeur-service",
    title: "Chauffeur Service",
    eyebrow: "Chauffeur Service",
    headline: "Professional.",
    headlineAccent: "Discreet. Always on time.",
    description:
      "Uniformed, background-checked chauffeurs trained for punctuality, discretion, and exceptional guest comfort.",
    overviewTitle: "Personal chauffeur,",
    overviewAccent: "elite standard",
    overviewBody: [
      "Our professional chauffeur service delivers an experience defined by punctuality, discretion, and immaculate presentation. Every driver is uniformed, background-checked, and trained to consistently exceed expectations.",
      "Whether for airport transfers, corporate meetings, or leisure travel, your personal chauffeur provides seamless door-to-door service with complete privacy at every step of the journey.",
    ],
    highlights: [
      "Uniformed chauffeurs",
      "Background checked drivers",
      "Multilingual — English, Urdu & more",
      "Privacy assured at all times",
      "Always punctual, every journey",
      "Professional guest handling etiquette",
    ],
    image: "/Range-Rover.avif",
    imageAlt: "Professional chauffeur service",
  },
];

export function getServiceTypeContent(slug: string) {
  return serviceTypeContent.find((item) => item.slug === slug);
}
