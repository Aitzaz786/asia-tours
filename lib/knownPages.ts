export type KnownPage = {
  slug: string;
  page_title: string;
  meta_title: string;
  meta_description: string;
  group: string;
};

export const KNOWN_PAGES: KnownPage[] = [
  // ── Core Pages ─────────────────────────────────────────────────────────────
  {
    slug: "home",
    page_title: "Home",
    group: "Core",
    meta_title: "Asia Tours Pakistan – Premium Car Rental & Chauffeur Services",
    meta_description: "Book premium car rentals and professional chauffeur services across Pakistan. Airport transfers, corporate tours, luxury vehicles and more.",
  },
  {
    slug: "about-us",
    page_title: "About Us",
    group: "Core",
    meta_title: "About Asia Tours Pakistan – Trusted Car Rental Company",
    meta_description: "Learn about Asia Tours Pakistan – a trusted name in premium car rental and chauffeur services operating across Pakistan for over 15 years.",
  },
  {
    slug: "contact-us",
    page_title: "Contact Us",
    group: "Core",
    meta_title: "Contact Asia Tours Pakistan – Book a Car Today",
    meta_description: "Get in touch with Asia Tours Pakistan to book a car rental, airport transfer, or chauffeur service. Available 24/7 across Pakistan.",
  },
  {
    slug: "services",
    page_title: "Services",
    group: "Core",
    meta_title: "Our Services – Asia Tours Pakistan Car Rental",
    meta_description: "Explore our full range of services: airport transfers, corporate tours, luxury vehicles, custom itineraries, weddings and chauffeur services.",
  },
  {
    slug: "areas",
    page_title: "Service Areas",
    group: "Core",
    meta_title: "Service Areas – Asia Tours Pakistan",
    meta_description: "Asia Tours Pakistan provides premium car rental and chauffeur services in 45+ cities across Pakistan including Lahore, Islamabad and more.",
  },

  // ── Service Pages ───────────────────────────────────────────────────────────
  {
    slug: "services/airport-transfer",
    page_title: "Airport Transfer",
    group: "Services",
    meta_title: "Airport Transfer Service Pakistan – Asia Tours",
    meta_description: "Professional airport transfer services across Pakistan. Meet & greet, flight tracking, on-time guarantee. Book your airport car now.",
  },
  {
    slug: "services/corporate-tours",
    page_title: "Corporate Tours",
    group: "Services",
    meta_title: "Corporate Car Service Pakistan – Asia Tours",
    meta_description: "Premium corporate transportation for business meetings, roadshows and executive travel across Pakistan. Professional drivers, luxury fleet.",
  },
  {
    slug: "services/luxury-vehicles",
    page_title: "Luxury Vehicles",
    group: "Services",
    meta_title: "Luxury Car Rental Pakistan – Asia Tours",
    meta_description: "Rent a luxury vehicle in Pakistan. Range Rovers, BMWs, Mercedes and more. Perfect for weddings, events and premium executive travel.",
  },
  {
    slug: "services/custom-itineraries",
    page_title: "Custom Itineraries",
    group: "Services",
    meta_title: "Custom Tour Itineraries Pakistan – Asia Tours",
    meta_description: "Create your perfect Pakistan travel itinerary. We handle all ground transport so you can focus on the experience.",
  },
  {
    slug: "services/events-wedding",
    page_title: "Events & Weddings",
    group: "Services",
    meta_title: "Wedding Car Service Pakistan – Asia Tours",
    meta_description: "Make your wedding day unforgettable with our premium wedding car and event transportation services across Pakistan.",
  },
  {
    slug: "services/chauffeur-service",
    page_title: "Chauffeur Service",
    group: "Services",
    meta_title: "Professional Chauffeur Service Pakistan – Asia Tours",
    meta_description: "Hire a professional chauffeur in Pakistan. Background-checked, suited drivers for executive, VIP and personal transport.",
  },

  // ── Fleet / Car Pages ───────────────────────────────────────────────────────
  {
    slug: "services/toyota-land-cruiser-v8",
    page_title: "Toyota Land Cruiser V8",
    group: "Fleet",
    meta_title: "Rent Toyota Land Cruiser V8 Pakistan – Asia Tours",
    meta_description: "Hire a Toyota Land Cruiser V8 in Pakistan. Ideal for long-distance travel, VIP transport, and off-road routes. Available 24/7.",
  },
  {
    slug: "services/toyota-land-cruiser-prado",
    page_title: "Toyota Land Cruiser Prado",
    group: "Fleet",
    meta_title: "Rent Toyota Land Cruiser Prado Pakistan – Asia Tours",
    meta_description: "Book a Toyota Land Cruiser Prado in Pakistan. Premium SUV for business and leisure travel across all terrains.",
  },
  {
    slug: "services/toyota-hilux-4x4",
    page_title: "Toyota Hilux 4x4",
    group: "Fleet",
    meta_title: "Rent Toyota Hilux 4x4 Pakistan – Asia Tours",
    meta_description: "Hire a Toyota Hilux 4x4 for adventure and off-road trips in Pakistan. Reliable, powerful, and available for long-distance journeys.",
  },
  {
    slug: "services/mercedes-benz-s-class",
    page_title: "Mercedes-Benz S-Class",
    group: "Fleet",
    meta_title: "Rent Mercedes-Benz S-Class Pakistan – Asia Tours",
    meta_description: "Experience ultimate luxury with the Mercedes-Benz S-Class in Pakistan. Perfect for executive travel, corporate events, and VIP transfers.",
  },
  {
    slug: "services/mercedes-benz-g-wagon",
    page_title: "Mercedes-Benz G-Wagon",
    group: "Fleet",
    meta_title: "Rent Mercedes-Benz G-Wagon Pakistan – Asia Tours",
    meta_description: "Hire the iconic Mercedes G-Wagon in Pakistan. The ultimate luxury SUV for style-conscious travelers and VIP occasions.",
  },
  {
    slug: "services/audi-a6",
    page_title: "Audi A6",
    group: "Fleet",
    meta_title: "Rent Audi A6 Pakistan – Asia Tours",
    meta_description: "Book an Audi A6 in Pakistan for premium business travel and executive airport transfers. Professional chauffeur available.",
  },
  {
    slug: "services/bmw-7-series",
    page_title: "BMW 7 Series",
    group: "Fleet",
    meta_title: "Rent BMW 7 Series Pakistan – Asia Tours",
    meta_description: "Hire a BMW 7 Series in Pakistan. The pinnacle of German luxury for corporate and executive travel across major cities.",
  },
  {
    slug: "services/range-rover",
    page_title: "Range Rover",
    group: "Fleet",
    meta_title: "Rent Range Rover Pakistan – Asia Tours",
    meta_description: "Book a Range Rover in Pakistan. Premium British luxury SUV for weddings, events, and executive travel available 24/7.",
  },
  {
    slug: "services/land-rover-defender",
    page_title: "Land Rover Defender",
    group: "Fleet",
    meta_title: "Rent Land Rover Defender Pakistan – Asia Tours",
    meta_description: "Hire a Land Rover Defender in Pakistan. The iconic off-road vehicle for adventure trips, hill stations, and rugged terrain.",
  },
  {
    slug: "services/bentley-continental-gt",
    page_title: "Bentley Continental GT",
    group: "Fleet",
    meta_title: "Rent Bentley Continental GT Pakistan – Asia Tours",
    meta_description: "Experience the pinnacle of British luxury with the Bentley Continental GT. Available for weddings and special occasions in Pakistan.",
  },
  {
    slug: "services/toyota-corolla",
    page_title: "Toyota Corolla",
    group: "Fleet",
    meta_title: "Rent Toyota Corolla Pakistan – Asia Tours",
    meta_description: "Book a comfortable Toyota Corolla in Pakistan. Reliable, fuel-efficient, and perfect for city and intercity travel.",
  },
  {
    slug: "services/honda-civic",
    page_title: "Honda Civic",
    group: "Fleet",
    meta_title: "Rent Honda Civic Pakistan – Asia Tours",
    meta_description: "Hire a Honda Civic in Pakistan for stylish and comfortable city and intercity travel. Professional driver available.",
  },
  {
    slug: "services/honda-civic-rs-turbo",
    page_title: "Honda Civic RS Turbo",
    group: "Fleet",
    meta_title: "Rent Honda Civic RS Turbo Pakistan – Asia Tours",
    meta_description: "Book the Honda Civic RS Turbo in Pakistan. A sporty, turbocharged option for premium yet affordable executive travel.",
  },
  {
    slug: "services/toyota-hiace-wagon",
    page_title: "Toyota Hiace Wagon",
    group: "Fleet",
    meta_title: "Rent Toyota Hiace Wagon Pakistan – Asia Tours",
    meta_description: "Hire a Toyota Hiace Wagon for group travel in Pakistan. Spacious, comfortable, ideal for corporate events and family trips.",
  },

  // ── Area Pages ──────────────────────────────────────────────────────────────
  ...[
    ["lahore", "Lahore"], ["islamabad", "Islamabad"], ["rawalpindi", "Rawalpindi"],
    ["faisalabad", "Faisalabad"], ["multan", "Multan"], ["gujranwala", "Gujranwala"],
    ["sialkot", "Sialkot"], ["bahawalpur", "Bahawalpur"], ["sargodha", "Sargodha"],
    ["sheikhupura", "Sheikhupura"], ["gujrat", "Gujrat"], ["sahiwal", "Sahiwal"],
    ["okara", "Okara"], ["rahim-yar-khan", "Rahim Yar Khan"], ["dg-khan", "D.G. Khan"],
    ["jhelum", "Jhelum"], ["chakwal", "Chakwal"], ["attock", "Attock"],
    ["taxila", "Taxila"], ["mianwali", "Mianwali"], ["khushab", "Khushab"],
    ["narowal", "Narowal"], ["kasur", "Kasur"], ["nankana-sahib", "Nankana Sahib"],
    ["hafizabad", "Hafizabad"], ["mandi-bahauddin", "Mandi Bahauddin"], ["jhang", "Jhang"],
    ["toba-tek-singh", "Toba Tek Singh"], ["pakpattan", "Pakpattan"], ["vehari", "Vehari"],
    ["khanewal", "Khanewal"], ["lodhran", "Lodhran"], ["wazirabad", "Wazirabad"],
    ["chiniot", "Chiniot"], ["muzaffargarh", "Muzaffargarh"], ["layyah", "Layyah"],
    ["bhakkar", "Bhakkar"], ["rajanpur", "Rajanpur"], ["burewala", "Burewala"],
    ["hasilpur", "Hasilpur"], ["murree", "Murree"], ["ayubia", "Ayubia"],
    ["nathia-gali", "Nathia Gali"], ["bhurban", "Bhurban"], ["patriata", "Patriata"],
  ].map(([aSlug, aName]) => ({
    slug: `areas/${aSlug}`,
    page_title: aName as string,
    group: "Areas",
    meta_title: `Car Rental ${aName} – Asia Tours Pakistan`,
    meta_description: `Premium car rental and chauffeur services in ${aName}. Airport transfers, corporate rides and city tours available 24/7.`,
  })),
];
