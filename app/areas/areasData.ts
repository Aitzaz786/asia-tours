export type AreaData = {
  slug: string;
  name: string;
  province: string;
  description: string;
  whyUs: string;
  highlights: string[];
  popularRoutes: { from: string; to: string; duration: string }[];
  image: string;
};

export const areas: AreaData[] = [
  // ─── Major Hubs ───────────────────────────────────────────────────────────
  {
    slug: "lahore",
    name: "Lahore",
    province: "Punjab",
    description:
      "Pakistan's cultural capital and our primary service hub. We provide premium car rental and chauffeur services across all of Lahore — from Gulberg to DHA, airport transfers to wedding convoys.",
    whyUs:
      "With Lahore being our home city, we know every route, every shortcut, and every destination. Our largest fleet is stationed here for immediate availability.",
    highlights: [
      "Lahore Airport Transfers",
      "Wedding & Events",
      "Corporate Office Drops",
      "City Tours",
      "24/7 Availability",
      "All Areas Covered",
    ],
    popularRoutes: [
      { from: "Lahore", to: "Islamabad", duration: "3.5 hrs" },
      { from: "Lahore", to: "Murree", duration: "4 hrs" },
      { from: "Lahore", to: "Faisalabad", duration: "2 hrs" },
    ],
    image: "/hero-bg.jpg",
  },
  {
    slug: "islamabad",
    name: "Islamabad",
    province: "Capital Territory",
    description:
      "Premium chauffeur and car rental services in Pakistan's capital city. Airport pickups from Islamabad International, corporate transfers, and scenic hill station routes.",
    whyUs:
      "Islamabad is our second major hub. We cover IATA airport, Diplomatic Enclave, Blue Area, and all routes to Murree and Rawalpindi.",
    highlights: [
      "IATA Airport Transfers",
      "Diplomatic Area Service",
      "Murree Day Trips",
      "Corporate Events",
      "Government Sector Drops",
      "Hill Station Routes",
    ],
    popularRoutes: [
      { from: "Islamabad", to: "Lahore", duration: "3.5 hrs" },
      { from: "Islamabad", to: "Murree", duration: "1.5 hrs" },
      { from: "Islamabad", to: "Rawalpindi", duration: "30 mins" },
    ],
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
  },
  {
    slug: "rawalpindi",
    name: "Rawalpindi",
    province: "Punjab",
    description:
      "Car rental and chauffeur services across Rawalpindi — the twin city of Islamabad. Saddar, Cantt, Chaklala, and all areas covered.",
    whyUs:
      "Our Rawalpindi fleet connects you to Islamabad, Murree, and the motorway in minutes with professional and punctual service.",
    highlights: [
      "Chaklala Airport Pickup",
      "Saddar & Cantt Coverage",
      "Motorway Access",
      "Wedding Convoys",
      "Corporate Transfers",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Rawalpindi", to: "Islamabad", duration: "30 mins" },
      { from: "Rawalpindi", to: "Murree", duration: "1.5 hrs" },
      { from: "Rawalpindi", to: "Lahore", duration: "3.5 hrs" },
    ],
    image: "/range-rover-vogue-01.webp",
  },
  {
    slug: "faisalabad",
    name: "Faisalabad",
    province: "Punjab",
    description:
      "Reliable car rental and executive transport in Pakistan's textile capital. Corporate factory visits, airport transfers, and city-wide coverage across all of Faisalabad.",
    whyUs:
      "We serve Faisalabad's busy business community with punctual executive cars and comfortable long-distance transport to Lahore, Islamabad, and beyond.",
    highlights: [
      "Airport Transfers",
      "Factory & Corporate Visits",
      "Wedding Events",
      "City Coverage",
      "Lahore Route",
      "24/7 Available",
    ],
    popularRoutes: [
      { from: "Faisalabad", to: "Lahore", duration: "2 hrs" },
      { from: "Faisalabad", to: "Islamabad", duration: "3 hrs" },
      { from: "Faisalabad", to: "Multan", duration: "3 hrs" },
    ],
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
  },
  {
    slug: "multan",
    name: "Multan",
    province: "Punjab",
    description:
      "Car rental and chauffeur service in the City of Saints. Multan airport transfers, shrine visits, and business travel all covered with our professional fleet.",
    whyUs:
      "Our Multan team knows all routes — from Multan Airport to Bahauddin Zakariya University and the historic shrines of the old city.",
    highlights: [
      "Multan Airport Transfers",
      "Shrine & Cultural Tours",
      "Business Travel",
      "Wedding Convoys",
      "Bahawalpur Route",
      "Long Distance",
    ],
    popularRoutes: [
      { from: "Multan", to: "Lahore", duration: "4 hrs" },
      { from: "Multan", to: "Bahawalpur", duration: "1.5 hrs" },
      { from: "Multan", to: "Islamabad", duration: "5 hrs" },
    ],
    image: "/Range-Rover.avif",
  },

  // ─── Punjab Cities ─────────────────────────────────────────────────────────
  {
    slug: "gujranwala",
    name: "Gujranwala",
    province: "Punjab",
    description:
      "Premium car rental and chauffeur services in Gujranwala — Punjab's industrial powerhouse. Executive transfers for corporate clients, factory visits, and comfortable city-wide transport.",
    whyUs:
      "Our Gujranwala team covers all major industrial zones, commercial markets, and the GT Road corridor with punctual, professional service.",
    highlights: [
      "Corporate Factory Visits",
      "GT Road Corridor",
      "Airport Transfers",
      "Wedding Convoys",
      "City-wide Coverage",
      "24/7 Available",
    ],
    popularRoutes: [
      { from: "Gujranwala", to: "Lahore", duration: "1 hr" },
      { from: "Gujranwala", to: "Islamabad", duration: "4 hrs" },
      { from: "Gujranwala", to: "Sialkot", duration: "1.5 hrs" },
    ],
    image: "/hero-bg.jpg",
  },
  {
    slug: "sialkot",
    name: "Sialkot",
    province: "Punjab",
    description:
      "Car rental and executive transport in Pakistan's sports goods capital. Business transfers across Sialkot's export zones, airport pickups, and comfortable city service.",
    whyUs:
      "We serve Sialkot's international business community — from export factories to Sialkot International Airport with reliable, professional transport.",
    highlights: [
      "Sialkot Airport Transfers",
      "Export Zone Coverage",
      "Corporate Business Travel",
      "Wedding Events",
      "Gujranwala Route",
      "International Clients",
    ],
    popularRoutes: [
      { from: "Sialkot", to: "Lahore", duration: "2 hrs" },
      { from: "Sialkot", to: "Gujranwala", duration: "1.5 hrs" },
      { from: "Sialkot", to: "Islamabad", duration: "4.5 hrs" },
    ],
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
  },
  {
    slug: "bahawalpur",
    name: "Bahawalpur",
    province: "Punjab",
    description:
      "Chauffeur and car rental services in Bahawalpur — the city of palaces and gateway to the Cholistan Desert. Heritage tours, airport transfers, and business travel covered.",
    whyUs:
      "Our Bahawalpur service connects you to Multan, Lahore, and Cholistan Desert safari routes with experienced local drivers.",
    highlights: [
      "Bahawalpur Airport",
      "Cholistan Desert Routes",
      "Heritage & Palace Tours",
      "Multan Corridor",
      "Wedding Services",
      "Long-distance Travel",
    ],
    popularRoutes: [
      { from: "Bahawalpur", to: "Multan", duration: "1.5 hrs" },
      { from: "Bahawalpur", to: "Lahore", duration: "6 hrs" },
      { from: "Bahawalpur", to: "Rahim Yar Khan", duration: "2 hrs" },
    ],
    image: "/range-rover-vogue-01.webp",
  },
  {
    slug: "sargodha",
    name: "Sargodha",
    province: "Punjab",
    description:
      "Car rental and chauffeur services in Sargodha — the heart of Punjab's citrus belt. Airport transfers, business travel, and regional connectivity across central Punjab.",
    whyUs:
      "We serve Sargodha's agricultural and business community with reliable transport linking to Lahore, Faisalabad, and Islamabad.",
    highlights: [
      "Sargodha Airport",
      "Central Punjab Routes",
      "Business Travel",
      "Wedding Convoys",
      "Faisalabad Connection",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Sargodha", to: "Lahore", duration: "2.5 hrs" },
      { from: "Sargodha", to: "Faisalabad", duration: "1.5 hrs" },
      { from: "Sargodha", to: "Islamabad", duration: "3 hrs" },
    ],
    image: "/Badshahi_Mosque_front_picture.jpg",
  },
  {
    slug: "sheikhupura",
    name: "Sheikhupura",
    province: "Punjab",
    description:
      "Car rental services in Sheikhupura — the industrial satellite city of Lahore. Factory transfers, commercial area coverage, and easy access to Lahore's outer ring road.",
    whyUs:
      "Sheikhupura's proximity to Lahore makes our service ideal for connecting industrial zones with the city and Allama Iqbal Airport quickly.",
    highlights: [
      "Lahore Connectivity",
      "Industrial Area Coverage",
      "Airport Route",
      "Wedding Events",
      "Business Transfers",
      "Hiran Minar Area",
    ],
    popularRoutes: [
      { from: "Sheikhupura", to: "Lahore", duration: "45 mins" },
      { from: "Sheikhupura", to: "Nankana Sahib", duration: "30 mins" },
      { from: "Sheikhupura", to: "Faisalabad", duration: "1.5 hrs" },
    ],
    image: "/black.jpeg",
  },
  {
    slug: "gujrat",
    name: "Gujrat",
    province: "Punjab",
    description:
      "Premium car rental and chauffeur service in Gujrat — Punjab's furniture and fan manufacturing hub. Business transport for factory owners, corporate clients, and full city coverage.",
    whyUs:
      "We connect Gujrat's business community with Lahore, Islamabad, and Sialkot through comfortable and punctual executive transport.",
    highlights: [
      "Business Factory Tours",
      "Lahore & Islamabad Route",
      "Wedding Services",
      "City Coverage",
      "Corporate Clients",
      "24/7 Available",
    ],
    popularRoutes: [
      { from: "Gujrat", to: "Lahore", duration: "2 hrs" },
      { from: "Gujrat", to: "Islamabad", duration: "3.5 hrs" },
      { from: "Gujrat", to: "Sialkot", duration: "1 hr" },
    ],
    image: "/Range-Rover.avif",
  },
  {
    slug: "sahiwal",
    name: "Sahiwal",
    province: "Punjab",
    description:
      "Car rental services in Sahiwal — central Punjab's agricultural and educational hub. City transport, motorway corridor access, and long-distance coverage to major cities.",
    whyUs:
      "Sahiwal sits on the Lahore-Multan motorway, making our service perfect for connecting to major cities quickly and comfortably.",
    highlights: [
      "Motorway Connectivity",
      "Lahore & Multan Route",
      "Educational Institute Drops",
      "Wedding Events",
      "Agricultural Area Coverage",
      "Business Travel",
    ],
    popularRoutes: [
      { from: "Sahiwal", to: "Lahore", duration: "2.5 hrs" },
      { from: "Sahiwal", to: "Multan", duration: "2 hrs" },
      { from: "Sahiwal", to: "Faisalabad", duration: "2 hrs" },
    ],
    image: "/hero-bg.jpg",
  },
  {
    slug: "okara",
    name: "Okara",
    province: "Punjab",
    description:
      "Car rental and transport services in Okara — known for its vibrant agricultural community and growing commercial sector. Reliable connections to Lahore, Sahiwal, and Multan.",
    whyUs:
      "Our Okara service covers the district comprehensively with clean vehicles and trained drivers for all your travel needs.",
    highlights: [
      "City Coverage",
      "Lahore Route",
      "Sahiwal Connection",
      "Wedding Convoys",
      "Agricultural Area Tours",
      "24/7 Available",
    ],
    popularRoutes: [
      { from: "Okara", to: "Lahore", duration: "2 hrs" },
      { from: "Okara", to: "Sahiwal", duration: "1 hr" },
      { from: "Okara", to: "Multan", duration: "2.5 hrs" },
    ],
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
  },
  {
    slug: "rahim-yar-khan",
    name: "Rahim Yar Khan",
    province: "Punjab",
    description:
      "Car rental and long-distance chauffeur service in Rahim Yar Khan — southern Punjab's gateway city. Airport transfers, Karachi route connections, and comprehensive city coverage.",
    whyUs:
      "Our team handles long-distance routes through southern Punjab and into Sindh with experienced drivers and comfortable vehicles.",
    highlights: [
      "RYK Airport Transfers",
      "Karachi & Sukkur Routes",
      "Southern Punjab Coverage",
      "Wedding Events",
      "Bahawalpur Connection",
      "Business Travel",
    ],
    popularRoutes: [
      { from: "Rahim Yar Khan", to: "Bahawalpur", duration: "2 hrs" },
      { from: "Rahim Yar Khan", to: "Multan", duration: "3 hrs" },
      { from: "Rahim Yar Khan", to: "Lahore", duration: "7 hrs" },
    ],
    image: "/range-rover-vogue-01.webp",
  },
  {
    slug: "dg-khan",
    name: "D.G. Khan",
    province: "Punjab",
    description:
      "Car rental and chauffeur services in D.G. Khan — the gateway to southern Punjab's tribal belt. Comprehensive city coverage and long-distance mountain route transport.",
    whyUs:
      "We serve D.G. Khan's diverse community with reliable transport connecting to Multan, Lahore, and the D.I. Khan corridor.",
    highlights: [
      "City Centre Coverage",
      "Multan Connection",
      "Long-distance Routes",
      "Mountain Area Access",
      "Wedding Events",
      "Corporate Travel",
    ],
    popularRoutes: [
      { from: "D.G. Khan", to: "Multan", duration: "2.5 hrs" },
      { from: "D.G. Khan", to: "Lahore", duration: "5 hrs" },
      { from: "D.G. Khan", to: "Muzaffargarh", duration: "1 hr" },
    ],
    image: "/Badshahi_Mosque_front_picture.jpg",
  },
  {
    slug: "jhelum",
    name: "Jhelum",
    province: "Punjab",
    description:
      "Car rental and transfer services in Jhelum — Punjab's historic military city on the banks of the Jhelum River. Salt Range tours, motorway corridor, and business transfers.",
    whyUs:
      "Jhelum's position on the Lahore-Islamabad motorway makes our service perfect for connecting to both capitals and the scenic Salt Range.",
    highlights: [
      "Lahore-Islamabad Route",
      "Salt Range Tours",
      "Cantt Area Coverage",
      "Wedding Convoys",
      "Motorway Access",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Jhelum", to: "Islamabad", duration: "1.5 hrs" },
      { from: "Jhelum", to: "Lahore", duration: "3 hrs" },
      { from: "Jhelum", to: "Rawalpindi", duration: "1.5 hrs" },
    ],
    image: "/black.jpeg",
  },
  {
    slug: "chakwal",
    name: "Chakwal",
    province: "Punjab",
    description:
      "Car rental services in Chakwal — the heart of Pakistan's Salt Range region. Kalar Kahar scenic routes, Islamabad connectivity, and comprehensive district coverage.",
    whyUs:
      "Our Chakwal fleet covers Kalar Kahar, Choa Saidan Shah, and the Islamabad-Lahore motorway corridor with ease.",
    highlights: [
      "Kalar Kahar Route",
      "Islamabad Connectivity",
      "Salt Range Tours",
      "Wedding Events",
      "Motorway Access",
      "Scenic Area Trips",
    ],
    popularRoutes: [
      { from: "Chakwal", to: "Islamabad", duration: "1.5 hrs" },
      { from: "Chakwal", to: "Rawalpindi", duration: "1 hr" },
      { from: "Chakwal", to: "Lahore", duration: "3.5 hrs" },
    ],
    image: "/Range-Rover.avif",
  },
  {
    slug: "attock",
    name: "Attock",
    province: "Punjab",
    description:
      "Car rental services in Attock — the historic city at the junction of Punjab and KPK. Attock Fort visits, oil refinery route, and connections to Islamabad and Peshawar.",
    whyUs:
      "Attock's position as a gateway between Punjab and KPK makes our service ideal for cross-province business and leisure travel.",
    highlights: [
      "Islamabad Connection",
      "Peshawar Route",
      "Attock Fort Tours",
      "Oil City Coverage",
      "Business Transfers",
      "Cross-Province Routes",
    ],
    popularRoutes: [
      { from: "Attock", to: "Islamabad", duration: "1 hr" },
      { from: "Attock", to: "Rawalpindi", duration: "1.5 hrs" },
      { from: "Attock", to: "Peshawar", duration: "2.5 hrs" },
    ],
    image: "/hero-bg.jpg",
  },
  {
    slug: "taxila",
    name: "Taxila",
    province: "Punjab",
    description:
      "Car rental and heritage tour transport in Taxila — home to one of the world's greatest ancient archaeological sites. Museum visits, heritage tours, and easy Islamabad connections.",
    whyUs:
      "Our Taxila service specializes in heritage tourism — drivers who guide you to the ancient Buddhist monasteries and museum with local expertise.",
    highlights: [
      "UNESCO Heritage Tours",
      "Taxila Museum Visits",
      "Islamabad Day Trips",
      "Buddhist Monastery Routes",
      "Rawalpindi Connection",
      "Group Tours",
    ],
    popularRoutes: [
      { from: "Taxila", to: "Islamabad", duration: "45 mins" },
      { from: "Taxila", to: "Rawalpindi", duration: "40 mins" },
      { from: "Taxila", to: "Haripur", duration: "30 mins" },
    ],
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
  },
  {
    slug: "mianwali",
    name: "Mianwali",
    province: "Punjab",
    description:
      "Car rental services in Mianwali — the scenic city on the Indus River in western Punjab. Taunsa Barrage visits, long-distance routes, and complete city coverage.",
    whyUs:
      "We serve Mianwali's residents and visitors with clean, comfortable vehicles for all distances — from city drops to long-haul journeys.",
    highlights: [
      "City-wide Coverage",
      "Sargodha Connection",
      "Taunsa Barrage Route",
      "Indus Highway Access",
      "Wedding Events",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Mianwali", to: "Sargodha", duration: "2 hrs" },
      { from: "Mianwali", to: "Lahore", duration: "4.5 hrs" },
      { from: "Mianwali", to: "Islamabad", duration: "4 hrs" },
    ],
    image: "/range-rover-vogue-01.webp",
  },
  {
    slug: "khushab",
    name: "Khushab",
    province: "Punjab",
    description:
      "Car rental and transport services in Khushab — located in the heart of the Salt Range. Business travel, city coverage, and connections to Sargodha and Islamabad.",
    whyUs:
      "We connect Khushab to Sargodha, Mianwali, and Islamabad with reliable and comfortable vehicles for all journeys.",
    highlights: [
      "Sargodha Connection",
      "Islamabad Route",
      "City Coverage",
      "Business Travel",
      "Salt Range Access",
      "Wedding Events",
    ],
    popularRoutes: [
      { from: "Khushab", to: "Sargodha", duration: "1.5 hrs" },
      { from: "Khushab", to: "Islamabad", duration: "3 hrs" },
      { from: "Khushab", to: "Mianwali", duration: "1.5 hrs" },
    ],
    image: "/Badshahi_Mosque_front_picture.jpg",
  },
  {
    slug: "narowal",
    name: "Narowal",
    province: "Punjab",
    description:
      "Car rental and transfer services in Narowal — Punjab's agricultural district bordering India. City coverage, Lahore connectivity, and Kartarpur Corridor access for pilgrims.",
    whyUs:
      "Our Narowal service covers Kartarpur Sahib, Narowal city, and provides fast connections to Sialkot and Lahore.",
    highlights: [
      "Kartarpur Corridor Access",
      "Lahore Connection",
      "Sialkot Route",
      "City Coverage",
      "Religious Tourism",
      "Wedding Events",
    ],
    popularRoutes: [
      { from: "Narowal", to: "Sialkot", duration: "45 mins" },
      { from: "Narowal", to: "Lahore", duration: "2.5 hrs" },
      { from: "Narowal", to: "Gujranwala", duration: "1.5 hrs" },
    ],
    image: "/black.jpeg",
  },
  {
    slug: "kasur",
    name: "Kasur",
    province: "Punjab",
    description:
      "Car rental and transfer services in Kasur — the city of music and cultural heritage, just south of Lahore. Easy Lahore connectivity, cultural site visits, and city-wide transport.",
    whyUs:
      "Kasur's proximity to Lahore makes our service ideal for daily commuters, event attendees, and business travelers heading to the city.",
    highlights: [
      "Lahore Connectivity",
      "Cultural Heritage Tours",
      "City Coverage",
      "Wedding Events",
      "Sahiwal Route",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Kasur", to: "Lahore", duration: "1 hr" },
      { from: "Kasur", to: "Sahiwal", duration: "2 hrs" },
      { from: "Kasur", to: "Multan", duration: "4.5 hrs" },
    ],
    image: "/Range-Rover.avif",
  },
  {
    slug: "nankana-sahib",
    name: "Nankana Sahib",
    province: "Punjab",
    description:
      "Transport and pilgrimage services in Nankana Sahib — the birthplace of Guru Nanak Dev Ji and one of the holiest sites in Sikhism. Gurdwara visits, pilgrim transfers, and Lahore connections.",
    whyUs:
      "We provide respectful, reliable transport for Sikh pilgrims and cultural visitors to Nankana Sahib from across Pakistan.",
    highlights: [
      "Gurdwara Jannam Asthan",
      "Sikh Pilgrimage Transfers",
      "Lahore Connectivity",
      "Sheikhupura Route",
      "Religious Tourism",
      "Group Transport",
    ],
    popularRoutes: [
      { from: "Nankana Sahib", to: "Lahore", duration: "1 hr" },
      { from: "Nankana Sahib", to: "Sheikhupura", duration: "30 mins" },
      { from: "Nankana Sahib", to: "Faisalabad", duration: "1.5 hrs" },
    ],
    image: "/hero-bg.jpg",
  },
  {
    slug: "hafizabad",
    name: "Hafizabad",
    province: "Punjab",
    description:
      "Car rental services in Hafizabad — central Punjab's growing commercial and agricultural city. City coverage, Gujranwala and Lahore connectivity for all travel needs.",
    whyUs:
      "Our Hafizabad service connects this emerging city to Gujranwala, Lahore, and Sargodha with reliable daily transport.",
    highlights: [
      "Gujranwala Route",
      "Lahore Connection",
      "City Coverage",
      "Wedding Events",
      "Agricultural Area",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Hafizabad", to: "Gujranwala", duration: "1 hr" },
      { from: "Hafizabad", to: "Lahore", duration: "2 hrs" },
      { from: "Hafizabad", to: "Sargodha", duration: "2 hrs" },
    ],
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
  },
  {
    slug: "mandi-bahauddin",
    name: "Mandi Bahauddin",
    province: "Punjab",
    description:
      "Car rental and transfer services in Mandi Bahauddin — central Punjab's commercial hub. Business trips, wedding events, and inter-city connectivity in all directions.",
    whyUs:
      "Mandi Bahauddin's central location makes our service ideal for connecting to Gujrat, Sargodha, and the GT Road corridor.",
    highlights: [
      "City Coverage",
      "Gujrat Connection",
      "Sargodha Route",
      "Wedding Convoys",
      "GT Road Access",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Mandi Bahauddin", to: "Gujrat", duration: "1 hr" },
      { from: "Mandi Bahauddin", to: "Sargodha", duration: "1.5 hrs" },
      { from: "Mandi Bahauddin", to: "Lahore", duration: "2.5 hrs" },
    ],
    image: "/range-rover-vogue-01.webp",
  },
  {
    slug: "jhang",
    name: "Jhang",
    province: "Punjab",
    description:
      "Car rental services in Jhang — the ancient city on the banks of the Chenab River. Rich cultural heritage, Faisalabad connectivity, and long-distance transport across Punjab.",
    whyUs:
      "Our Jhang fleet covers the entire Jhang-Chiniot district with comfortable vehicles and experienced local drivers who know every road.",
    highlights: [
      "Faisalabad Connection",
      "City Heritage Tours",
      "Chiniot Route",
      "Wedding Events",
      "Chenab River Area",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Jhang", to: "Faisalabad", duration: "1.5 hrs" },
      { from: "Jhang", to: "Lahore", duration: "3 hrs" },
      { from: "Jhang", to: "Sargodha", duration: "2 hrs" },
    ],
    image: "/Badshahi_Mosque_front_picture.jpg",
  },
  {
    slug: "toba-tek-singh",
    name: "Toba Tek Singh",
    province: "Punjab",
    description:
      "Car rental and transport services in Toba Tek Singh — central Punjab's agricultural heartland. Faisalabad route, city-wide coverage, and reliable long-distance transport.",
    whyUs:
      "We connect Toba Tek Singh to Faisalabad, Lahore, and Jhang with punctual, comfortable vehicles for all your travel needs.",
    highlights: [
      "Faisalabad Route",
      "Lahore Connection",
      "Agricultural Area",
      "Wedding Events",
      "City Coverage",
      "24/7 Available",
    ],
    popularRoutes: [
      { from: "Toba Tek Singh", to: "Faisalabad", duration: "1 hr" },
      { from: "Toba Tek Singh", to: "Lahore", duration: "3 hrs" },
      { from: "Toba Tek Singh", to: "Jhang", duration: "45 mins" },
    ],
    image: "/black.jpeg",
  },
  {
    slug: "pakpattan",
    name: "Pakpattan",
    province: "Punjab",
    description:
      "Car rental and religious tourism transport in Pakpattan — home to the famous shrine of Baba Farid Ganjshakar. Shrine visits, Sahiwal connection, and city-wide coverage.",
    whyUs:
      "We provide respectful, comfortable transport for pilgrims and visitors to Hazrat Baba Farid's shrine and the surrounding historic city.",
    highlights: [
      "Shrine of Baba Farid",
      "Religious Tourism",
      "Sahiwal Connection",
      "Wedding Convoys",
      "Okara Route",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Pakpattan", to: "Sahiwal", duration: "1 hr" },
      { from: "Pakpattan", to: "Lahore", duration: "3.5 hrs" },
      { from: "Pakpattan", to: "Multan", duration: "2.5 hrs" },
    ],
    image: "/Range-Rover.avif",
  },
  {
    slug: "vehari",
    name: "Vehari",
    province: "Punjab",
    description:
      "Car rental services in Vehari — central Punjab's cotton and agricultural hub. City coverage, Multan and Sahiwal connectivity, and reliable long-distance transport.",
    whyUs:
      "Our Vehari service connects this agricultural heartland to Multan, Sahiwal, and Burewala with comfortable and affordable transport.",
    highlights: [
      "Multan Connection",
      "Burewala Route",
      "Agricultural Area",
      "Wedding Events",
      "City Coverage",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Vehari", to: "Multan", duration: "1.5 hrs" },
      { from: "Vehari", to: "Sahiwal", duration: "2 hrs" },
      { from: "Vehari", to: "Lahore", duration: "4.5 hrs" },
    ],
    image: "/hero-bg.jpg",
  },
  {
    slug: "khanewal",
    name: "Khanewal",
    province: "Punjab",
    description:
      "Car rental and transport services in Khanewal — a key junction city in south Punjab. Multan connectivity, Lahore-Karachi motorway access, and comprehensive city coverage.",
    whyUs:
      "Khanewal's location on the main motorway makes it a crucial transport hub, and our fleet serves all routes from here efficiently.",
    highlights: [
      "Multan Route",
      "Motorway Access",
      "Lahore Connection",
      "Wedding Convoys",
      "Agricultural Area",
      "Long-distance Travel",
    ],
    popularRoutes: [
      { from: "Khanewal", to: "Multan", duration: "45 mins" },
      { from: "Khanewal", to: "Sahiwal", duration: "1.5 hrs" },
      { from: "Khanewal", to: "Lahore", duration: "4 hrs" },
    ],
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
  },
  {
    slug: "lodhran",
    name: "Lodhran",
    province: "Punjab",
    description:
      "Car rental services in Lodhran — south Punjab's agricultural district and growing commercial centre. Multan and Bahawalpur route access with clean, comfortable vehicles.",
    whyUs:
      "Our Lodhran team provides direct connections to Multan and Bahawalpur — the two closest major cities — with reliable service.",
    highlights: [
      "Multan Connection",
      "Bahawalpur Route",
      "City Coverage",
      "Wedding Events",
      "Agricultural Area",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Lodhran", to: "Multan", duration: "1 hr" },
      { from: "Lodhran", to: "Bahawalpur", duration: "1 hr" },
      { from: "Lodhran", to: "Lahore", duration: "5 hrs" },
    ],
    image: "/range-rover-vogue-01.webp",
  },
  {
    slug: "wazirabad",
    name: "Wazirabad",
    province: "Punjab",
    description:
      "Car rental and executive transport in Wazirabad — Pakistan's surgical instruments and cutlery manufacturing capital on the Chenab River. Business travel and city coverage.",
    whyUs:
      "We serve Wazirabad's export business community with professional transport linking to Gujranwala, Sialkot, and Lahore.",
    highlights: [
      "Gujranwala Connection",
      "Sialkot Route",
      "Export Zone Coverage",
      "Business Travel",
      "Wedding Events",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Wazirabad", to: "Gujranwala", duration: "45 mins" },
      { from: "Wazirabad", to: "Sialkot", duration: "1.5 hrs" },
      { from: "Wazirabad", to: "Lahore", duration: "1.5 hrs" },
    ],
    image: "/Badshahi_Mosque_front_picture.jpg",
  },
  {
    slug: "chiniot",
    name: "Chiniot",
    province: "Punjab",
    description:
      "Car rental and executive transport in Chiniot — the furniture manufacturing capital of Pakistan. Business transfers for the furniture industry, Faisalabad connection, and city coverage.",
    whyUs:
      "We serve Chiniot's thriving furniture business community with reliable transport between Faisalabad, Jhang, and Lahore.",
    highlights: [
      "Faisalabad Connection",
      "Jhang Route",
      "Furniture District Coverage",
      "Business Travel",
      "Wedding Convoys",
      "City Coverage",
    ],
    popularRoutes: [
      { from: "Chiniot", to: "Faisalabad", duration: "1 hr" },
      { from: "Chiniot", to: "Jhang", duration: "45 mins" },
      { from: "Chiniot", to: "Lahore", duration: "2.5 hrs" },
    ],
    image: "/black.jpeg",
  },
  {
    slug: "muzaffargarh",
    name: "Muzaffargarh",
    province: "Punjab",
    description:
      "Car rental services in Muzaffargarh — strategically located in southwest Punjab at the junction of the Chenab and Indus rivers. D.G. Khan and Multan route access.",
    whyUs:
      "Our Muzaffargarh service covers the district with comfortable vehicles and reliable connections to D.G. Khan and Multan.",
    highlights: [
      "D.G. Khan Connection",
      "Multan Route",
      "River Junction Area",
      "Wedding Events",
      "City Coverage",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Muzaffargarh", to: "Multan", duration: "1 hr" },
      { from: "Muzaffargarh", to: "D.G. Khan", duration: "1 hr" },
      { from: "Muzaffargarh", to: "Lahore", duration: "5.5 hrs" },
    ],
    image: "/Range-Rover.avif",
  },
  {
    slug: "layyah",
    name: "Layyah",
    province: "Punjab",
    description:
      "Car rental and transport services in Layyah — located on the west bank of the Indus River in western Punjab. City coverage and long-distance routes through Punjab's west.",
    whyUs:
      "We serve Layyah's residents with comfortable vehicles for city travel and long-distance routes to Bhakkar, Mianwali, and Multan.",
    highlights: [
      "City Coverage",
      "Bhakkar Connection",
      "Mianwali Route",
      "Indus Highway",
      "Wedding Events",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Layyah", to: "Bhakkar", duration: "1 hr" },
      { from: "Layyah", to: "Multan", duration: "2.5 hrs" },
      { from: "Layyah", to: "Mianwali", duration: "2 hrs" },
    ],
    image: "/hero-bg.jpg",
  },
  {
    slug: "bhakkar",
    name: "Bhakkar",
    province: "Punjab",
    description:
      "Car rental services in Bhakkar — on the banks of the Indus River in western Punjab. Long-distance routes, city coverage, and connections to Layyah and Mianwali.",
    whyUs:
      "Our Bhakkar team covers this western Punjab district with experienced drivers familiar with all routes along the Indus corridor.",
    highlights: [
      "Mianwali Route",
      "Layyah Connection",
      "Indus Corridor",
      "City Coverage",
      "Wedding Events",
      "Long-distance Travel",
    ],
    popularRoutes: [
      { from: "Bhakkar", to: "Mianwali", duration: "1.5 hrs" },
      { from: "Bhakkar", to: "Layyah", duration: "1 hr" },
      { from: "Bhakkar", to: "Sargodha", duration: "3 hrs" },
    ],
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
  },
  {
    slug: "rajanpur",
    name: "Rajanpur",
    province: "Punjab",
    description:
      "Car rental services in Rajanpur — the southernmost district of Punjab, bordering Sindh and Balochistan. Long-distance connections and comprehensive district coverage.",
    whyUs:
      "Our Rajanpur service bridges south Punjab and the Indus Highway, connecting to D.G. Khan, Rahim Yar Khan, and beyond.",
    highlights: [
      "D.G. Khan Connection",
      "Rahim Yar Khan Route",
      "Southern Punjab Coverage",
      "Long-distance Travel",
      "Wedding Events",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Rajanpur", to: "D.G. Khan", duration: "2 hrs" },
      { from: "Rajanpur", to: "Rahim Yar Khan", duration: "2.5 hrs" },
      { from: "Rajanpur", to: "Multan", duration: "4 hrs" },
    ],
    image: "/range-rover-vogue-01.webp",
  },
  {
    slug: "burewala",
    name: "Burewala",
    province: "Punjab",
    description:
      "Car rental services in Burewala — Vehari district's main commercial city. Vehari and Multan connection, Sahiwal access, and reliable city coverage for all journeys.",
    whyUs:
      "We connect Burewala to Vehari, Sahiwal, and Multan with reliable, comfortable transport for all travel needs.",
    highlights: [
      "Vehari Connection",
      "Multan Route",
      "Sahiwal Access",
      "City Coverage",
      "Wedding Events",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Burewala", to: "Vehari", duration: "30 mins" },
      { from: "Burewala", to: "Multan", duration: "2 hrs" },
      { from: "Burewala", to: "Sahiwal", duration: "2 hrs" },
    ],
    image: "/Badshahi_Mosque_front_picture.jpg",
  },
  {
    slug: "hasilpur",
    name: "Hasilpur",
    province: "Punjab",
    description:
      "Car rental services in Hasilpur — located in Bahawalpur district, connecting the city to Bahawalpur and Multan. Agricultural area coverage and long-distance routes.",
    whyUs:
      "Our Hasilpur service bridges Bahawalpur district with fast, reliable connections to the main city and Multan.",
    highlights: [
      "Bahawalpur Connection",
      "Multan Route",
      "City Coverage",
      "Cholistan Border Area",
      "Wedding Events",
      "24/7 Service",
    ],
    popularRoutes: [
      { from: "Hasilpur", to: "Bahawalpur", duration: "45 mins" },
      { from: "Hasilpur", to: "Multan", duration: "2 hrs" },
      { from: "Hasilpur", to: "Lahore", duration: "7 hrs" },
    ],
    image: "/black.jpeg",
  },

  // ─── Hill Stations ─────────────────────────────────────────────────────────
  {
    slug: "murree",
    name: "Murree",
    province: "Hill Stations",
    description:
      "Scenic hill station transfers to and from Murree. We cover Mall Road, Pindi Point, Kashmir Point, and all Murree resorts with comfortable mountain-ready vehicles.",
    whyUs:
      "Our mountain-ready fleet handles Murree's winding roads safely in all weather conditions, including heavy snow. Perfect for family trips and winter drives.",
    highlights: [
      "Snow Season Ready",
      "4x4 Vehicles Available",
      "Mall Road Drops",
      "Resort Transfers",
      "Bhurban & Nathia Gali",
      "Day Trip Packages",
    ],
    popularRoutes: [
      { from: "Murree", to: "Islamabad", duration: "1.5 hrs" },
      { from: "Murree", to: "Nathia Gali", duration: "45 mins" },
      { from: "Murree", to: "Lahore", duration: "4 hrs" },
    ],
    image: "/Range-Rover.avif",
  },
  {
    slug: "ayubia",
    name: "Ayubia",
    province: "Hill Stations",
    description:
      "Scenic hill station transfers to Ayubia National Park — a stunning retreat in the Galyat range. Chairlift access, nature trails, and beautiful pine forest drives included.",
    whyUs:
      "Our mountain-ready fleet handles Ayubia's steep roads safely in all seasons, including snow. Perfect for family getaways and nature retreats.",
    highlights: [
      "Ayubia National Park",
      "Chairlift Access",
      "Galyat Range",
      "Family Trips",
      "Nathia Gali Nearby",
      "Snow Season Ready",
    ],
    popularRoutes: [
      { from: "Ayubia", to: "Nathia Gali", duration: "20 mins" },
      { from: "Ayubia", to: "Murree", duration: "30 mins" },
      { from: "Ayubia", to: "Islamabad", duration: "2 hrs" },
    ],
    image: "/hero-bg.jpg",
  },
  {
    slug: "nathia-gali",
    name: "Nathia Gali",
    province: "Hill Stations",
    description:
      "Premium transfers to and from Nathia Gali — one of Pakistan's most beloved hill stations. Pine forests, hiking trails, and crisp mountain air await with our comfortable transfers.",
    whyUs:
      "Our Nathia Gali service specializes in comfortable, safe mountain drives all year round — including challenging winter snow conditions.",
    highlights: [
      "Nathia Gali Forest",
      "Galyat Drive",
      "Ayubia Connection",
      "Murree Route",
      "Snow Season Transfers",
      "Family Packages",
    ],
    popularRoutes: [
      { from: "Nathia Gali", to: "Ayubia", duration: "20 mins" },
      { from: "Nathia Gali", to: "Murree", duration: "45 mins" },
      { from: "Nathia Gali", to: "Islamabad", duration: "2 hrs" },
    ],
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
  },
  {
    slug: "bhurban",
    name: "Bhurban",
    province: "Hill Stations",
    description:
      "Luxury transfers to Bhurban — home to the iconic Pearl Continental Bhurban and some of Pakistan's finest mountain views. Premium vehicles for the ultimate hill resort experience.",
    whyUs:
      "We specialize in premium Bhurban transfers for PC hotel guests, corporate retreats, and high-end family getaways with our luxury fleet.",
    highlights: [
      "PC Bhurban Transfers",
      "Luxury Fleet Available",
      "Corporate Retreats",
      "Golf Course Access",
      "Murree Nearby",
      "VIP Service",
    ],
    popularRoutes: [
      { from: "Bhurban", to: "Murree", duration: "20 mins" },
      { from: "Bhurban", to: "Islamabad", duration: "1.5 hrs" },
      { from: "Bhurban", to: "Rawalpindi", duration: "2 hrs" },
    ],
    image: "/range-rover-vogue-01.webp",
  },
  {
    slug: "patriata",
    name: "Patriata",
    province: "Hill Stations",
    description:
      "Scenic transfers to Patriata (New Murree) — famous for its chairlift, pine forests, and panoramic views. Family trips, group tours, and comfortable mountain transfers.",
    whyUs:
      "We make getting to Patriata's famous chairlift and scenic viewpoints stress-free with our safe, comfortable mountain vehicles.",
    highlights: [
      "Patriata Chairlift",
      "New Murree Views",
      "Family Day Trips",
      "Pine Forest Drives",
      "Murree Connection",
      "Group Packages",
    ],
    popularRoutes: [
      { from: "Patriata", to: "Murree", duration: "30 mins" },
      { from: "Patriata", to: "Islamabad", duration: "2 hrs" },
      { from: "Patriata", to: "Rawalpindi", duration: "2.5 hrs" },
    ],
    image: "/Badshahi_Mosque_front_picture.jpg",
  },
];
