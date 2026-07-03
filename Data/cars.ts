export type Highlight = {
  label: string;
  value: string | number | boolean;
};

export type ParamMap = {
  src: string;
  alt: string;
  fileName: string;
};

export type Fleet = {
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  imageCount: number;
  highlights?: Highlight[];
  imagesDetail?: ParamMap[];
};

export function getFleetSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const fleets: Fleet[] = [
 
  {
    name: "Audi A6",
    price: 45000,
    image: "/Audi a6/audi-a6_100726069_h.jpg",
    imageAlt: "Audi A6 luxury sedan",
    imageCount: 10,
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "11 km/l" },
    ],
    imagesDetail: [
      { src: "/Audi a6/2021-audi-a6-rear-angle-view-carbuzz-551181.jpg", alt: "Audi A6 rear angle view", fileName: "2021-audi-a6-rear-angle-view-carbuzz-551181.jpg" },
      { src: "/Audi a6/482325810_1058004663035831_1918884099026068067_n.jpg", alt: "Audi A6 image", fileName: "482325810_1058004663035831_1918884099026068067_n.jpg" },
      { src: "/Audi a6/482825566_1058004959702468_4799322895316360554_n.jpg", alt: "Audi A6 image", fileName: "482825566_1058004959702468_4799322895316360554_n.jpg" },
      { src: "/Audi a6/483480324_1058004556369175_4946216582923709949_n.jpg", alt: "Audi A6 image", fileName: "483480324_1058004556369175_4946216582923709949_n.jpg" },
      { src: "/Audi a6/483623887_1058004516369179_6830600510553606109_n.jpg", alt: "Audi A6 image", fileName: "483623887_1058004516369179_6830600510553606109_n.jpg" },
      { src: "/Audi a6/audi-a6-interior-18.jpeg", alt: "Audi A6 interior", fileName: "audi-a6-interior-18.jpeg" },
      { src: "/Audi a6/audi-a6_100726069_h.jpg", alt: "Audi A6 exterior", fileName: "audi-a6_100726069_h.jpg" },
      { src: "/Audi a6/Audi-New-A6-Exterior-154582.jpg", alt: "Audi A6 exterior front view", fileName: "Audi-New-A6-Exterior-154582.jpg" },
      { src: "/Audi a6/WhatsApp-Image-2021-05-15-at-8.01.41-AM.jpeg", alt: "Audi A6 image", fileName: "WhatsApp-Image-2021-05-15-at-8.01.41-AM.jpeg" },
      { src: "/Audi a6/WhatsApp-Image-2022-02-08-at-5.37.17-PM.jpeg", alt: "Audi A6 image", fileName: "WhatsApp-Image-2022-02-08-at-5.37.17-PM.jpeg" },
    ],
  },
  {
    name: "Mercedes-Benz G-Wagon",
    price: 150000,
    image: "/g-wagon/6B01F92D-AA91-4EC2-80EA-6CE91DA69972.jpg",
    imageAlt: "Mercedes-Benz G-Wagon luxury SUV",
    imageCount: 5,
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "6 km/l" },
    ],
    imagesDetail: [
      { src: "/g-wagon/14TlZTC5_nSZCyERwF9FX_4NdQcABh.jpg", alt: "Mercedes-Benz G-Wagon image", fileName: "14TlZTC5_nSZCyERwF9FX_4NdQcABh.jpg" },
      { src: "/g-wagon/3D39E90B-6E67-4AEB-AA38-F0FE540F0F1F.jpg", alt: "Mercedes-Benz G-Wagon image", fileName: "3D39E90B-6E67-4AEB-AA38-F0FE540F0F1F.jpg" },
      { src: "/g-wagon/4a2957d1-79f6-4fb0-b295-5a5b0b6c5ca8.jpg", alt: "Mercedes-Benz G-Wagon image", fileName: "4a2957d1-79f6-4fb0-b295-5a5b0b6c5ca8.jpg" },
      { src: "/g-wagon/65ad1440-4a56-4259-ae4d-279be95d56c2.jpg", alt: "Mercedes-Benz G-Wagon image", fileName: "65ad1440-4a56-4259-ae4d-279be95d56c2.jpg" },
      { src: "/g-wagon/6B01F92D-AA91-4EC2-80EA-6CE91DA69972.jpg", alt: "Mercedes-Benz G-Wagon image", fileName: "6B01F92D-AA91-4EC2-80EA-6CE91DA69972.jpg" },
    ],
  },
  {
    name: "GMC Limousine",
    price: 150000,
    image: "/gmc lamosine/GMC_Fendi_Limo_Rental.webp",
    imageAlt: "GMC limousine rental vehicle",
    imageCount: 7,
    highlights: [
      { label: "Passengers", value: 10 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "5 km/l" },
    ],
    imagesDetail: [
      { src: "/gmc lamosine/GMC_Fendi_Limousine_Dubai.webp", alt: "GMC limousine exterior", fileName: "GMC_Fendi_Limousine_Dubai.webp" },
      { src: "/gmc lamosine/GMC_Fendi_Limo_Rental.webp", alt: "GMC limousine rental view", fileName: "GMC_Fendi_Limo_Rental.webp" },
      { src: "/gmc lamosine/GMC_Fendi_Limo_Rental_Dubai.webp", alt: "GMC limousine rental exterior", fileName: "GMC_Fendi_Limo_Rental_Dubai.webp" },
      { src: "/gmc lamosine/GMC_Fendi_Limo_Rental_in_Dubai.webp", alt: "GMC limousine rental image", fileName: "GMC_Fendi_Limo_Rental_in_Dubai.webp" },
      { src: "/gmc lamosine/Untitled-1-970x570.webp", alt: "GMC limousine image", fileName: "Untitled-1-970x570.webp" },
      { src: "/gmc lamosine/Untitled-1024x585.webp", alt: "GMC limousine image", fileName: "Untitled-1024x585.webp" },
      { src: "/gmc lamosine/Untitled-3-1024x585.webp", alt: "GMC limousine image", fileName: "Untitled-3-1024x585.webp" },
    ],
  },
  {
    name: "Toyota Hilux 4x4",
    price: 13000,
    image: "/hilux 4/WhatsApp-Image-2025-09-09-at-03.45.52-1.jpeg",
    imageAlt: "Toyota Hilux 4x4 pickup truck",
    imageCount: 6,
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Diesel" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "12 km/l" },
    ],
    imagesDetail: [
      { src: "/hilux 4/images (1).jpg", alt: "Toyota Hilux 4x4 image", fileName: "images (1).jpg" },
      { src: "/hilux 4/images (2).jpg", alt: "Toyota Hilux 4x4 image", fileName: "images (2).jpg" },
      { src: "/hilux 4/images.jpg", alt: "Toyota Hilux 4x4 image", fileName: "images.jpg" },
      { src: "/hilux 4/Revo-2-1.jpeg", alt: "Toyota Hilux 4x4 Revo view", fileName: "Revo-2-1.jpeg" },
      { src: "/hilux 4/revo-dreamcarz-1.jpg", alt: "Toyota Hilux 4x4 Revo exterior", fileName: "revo-dreamcarz-1.jpg" },
      { src: "/hilux 4/WhatsApp-Image-2025-09-09-at-03.45.52-1.jpeg", alt: "Toyota Hilux 4x4 image", fileName: "WhatsApp-Image-2025-09-09-at-03.45.52-1.jpeg" },
    ],
  },
  {
    name: "Mercedes-Maybach S580",
    price: 130000,
    image: "/Mercedes-Maybach S580/2020-Mercedes-S650-Maybach-black-2.webp",
    imageAlt: "Mercedes-Maybach S580 luxury sedan",
    imageCount: 7,
    highlights: [
      { label: "Passengers", value: 4 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "7 km/l" },
    ],
    imagesDetail: [
      { src: "/Mercedes-Maybach S580/1-3.png", alt: "Mercedes-Maybach S580 image", fileName: "1-3.png" },
      { src: "/Mercedes-Maybach S580/2-4.png", alt: "Mercedes-Maybach S580 image", fileName: "2-4.png" },
      { src: "/Mercedes-Maybach S580/2020-Mercedes-S650-Maybach-black-2.webp", alt: "Mercedes-Maybach S580 exterior", fileName: "2020-Mercedes-S650-Maybach-black-2.webp" },
      { src: "/Mercedes-Maybach S580/2020-Mercedes-S650-Maybach-black-3-1024x768.webp", alt: "Mercedes-Maybach S580 exterior", fileName: "2020-Mercedes-S650-Maybach-black-3-1024x768.webp" },
      { src: "/Mercedes-Maybach S580/2020-Mercedes-S650-Maybach-black-4.webp", alt: "Mercedes-Maybach S580 exterior", fileName: "2020-Mercedes-S650-Maybach-black-4.webp" },
      { src: "/Mercedes-Maybach S580/3-2-1.png", alt: "Mercedes-Maybach S580 image", fileName: "3-2-1.png" },
      { src: "/Mercedes-Maybach S580/Mercedes-Benz-Maybach-S580-2021_39114_4014784351-15_small.webp", alt: "Mercedes-Maybach S580 interior", fileName: "Mercedes-Benz-Maybach-S580-2021_39114_4014784351-15_small.webp" },
    ],
  },
  {
    name: "Toyota Land Cruiser Prado",
    price: 20000,
    image: "/prado/WhatsApp Image 2026-05-31 at 9.04.47 PM.jpeg",
    imageAlt: "Toyota Land Cruiser Prado SUV",
    imageCount: 9,
    highlights: [
      { label: "Passengers", value: 7 },
      { label: "Fuel", value: "Diesel" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "10 km/l" },
    ],
    imagesDetail: [
      { src: "/prado/653642648_18066651503314723_4427277344001091620_n.jpg", alt: "Toyota Land Cruiser Prado image", fileName: "653642648_18066651503314723_4427277344001091620_n.jpg" },
      { src: "/prado/653958410_18075269423395731_3228493059568340162_n.jpg", alt: "Toyota Land Cruiser Prado image", fileName: "653958410_18075269423395731_3228493059568340162_n.jpg" },
      { src: "/prado/654023712_18081256268067850_5580670198195266928_n.jpg", alt: "Toyota Land Cruiser Prado image", fileName: "654023712_18081256268067850_5580670198195266928_n.jpg" },
      { src: "/prado/655234876_18120518485612202_7373266066589394972_n.jpg", alt: "Toyota Land Cruiser Prado image", fileName: "655234876_18120518485612202_7373266066589394972_n.jpg" },
      { src: "/prado/655283073_18063940181655978_8114958531352690560_n.jpg", alt: "Toyota Land Cruiser Prado image", fileName: "655283073_18063940181655978_8114958531352690560_n.jpg" },
      { src: "/prado/657618621_18387784609093347_3198730539123403922_n.jpg", alt: "Toyota Land Cruiser Prado image", fileName: "657618621_18387784609093347_3198730539123403922_n.jpg" },
      { src: "/prado/658595470_18158206966434951_7779201634760470961_n.jpg", alt: "Toyota Land Cruiser Prado image", fileName: "658595470_18158206966434951_7779201634760470961_n.jpg" },
      { src: "/prado/670204963_18576306160033726_2811439590697585791_n.jpg", alt: "Toyota Land Cruiser Prado image", fileName: "670204963_18576306160033726_2811439590697585791_n.jpg" },
      { src: "/prado/WhatsApp Image 2026-05-31 at 9.04.47 PM.jpeg", alt: "Toyota Land Cruiser Prado image", fileName: "WhatsApp Image 2026-05-31 at 9.04.47 PM.jpeg" },
    ],
  },
  {
    name: "Range Rover",
    price: 150000,
    image: "/range rover/89a66d1b5c2ca9167c6dccc60b32ffdf.jpg",
    imageAlt: "Range Rover luxury SUV",
    imageCount: 9,
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "8 km/l" },
    ],
    imagesDetail: [
      { src: "/range rover/2025_land_rover_range_rover_rearseat.jpg", alt: "Range Rover rear seat", fileName: "2025_land_rover_range_rover_rearseat.jpg" },
      { src: "/range rover/89a66d1b5c2ca9167c6dccc60b32ffdf.jpg", alt: "Range Rover exterior", fileName: "89a66d1b5c2ca9167c6dccc60b32ffdf.jpg" },
      { src: "/range rover/usn-5066.webp", alt: "Range Rover image", fileName: "usn-5066.webp" },
      { src: "/range rover/usn-5155.webp", alt: "Range Rover image", fileName: "usn-5155.webp" },
      { src: "/range rover/usn-5289.webp", alt: "Range Rover image", fileName: "usn-5289.webp" },
      { src: "/range rover/usn-5313.webp", alt: "Range Rover image", fileName: "usn-5313.webp" },
      { src: "/range rover/usn-5339.webp", alt: "Range Rover image", fileName: "usn-5339.webp" },
      { src: "/range rover/usn-5377.webp", alt: "Range Rover image", fileName: "usn-5377.webp" },
      { src: "/range rover/usn-5386.webp", alt: "Range Rover image", fileName: "usn-5386.webp" },
    ],
  },
  {
    name: "Toyota Fortuner",
    price: 15000,
    image: "/Toyota Fortuner/WhatsApp-Image-2024-06-23-at-03.20.47.jpeg",
    imageAlt: "Toyota Fortuner SUV",
    imageCount: 7,
    highlights: [
      { label: "Passengers", value: 7 },
      { label: "Fuel", value: "Diesel" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "11 km/l" },
    ],
    imagesDetail: [
      { src: "/Toyota Fortuner/2015_Toyota_Fortuner_(New_Zealand).jpg", alt: "Toyota Fortuner exterior", fileName: "2015_Toyota_Fortuner_(New_Zealand).jpg" },
      { src: "/Toyota Fortuner/Crop860x650.jpg", alt: "Toyota Fortuner image", fileName: "Crop860x650.jpg" },
      { src: "/Toyota Fortuner/Fit1920x1080 (1).jpg", alt: "Toyota Fortuner image", fileName: "Fit1920x1080 (1).jpg" },
      { src: "/Toyota Fortuner/Fit1920x1080.jpg", alt: "Toyota Fortuner image", fileName: "Fit1920x1080.jpg" },
      { src: "/Toyota Fortuner/Fit508x373 (1).jpg", alt: "Toyota Fortuner image", fileName: "Fit508x373 (1).jpg" },
      { src: "/Toyota Fortuner/Fit508x373.jpg", alt: "Toyota Fortuner image", fileName: "Fit508x373.jpg" },
      { src: "/Toyota Fortuner/WhatsApp-Image-2024-06-23-at-03.20.47.jpeg", alt: "Toyota Fortuner image", fileName: "WhatsApp-Image-2024-06-23-at-03.20.47.jpeg" },
    ],
  },
  {
    name: "Toyota Tundra Limousine",
    price: 150000,
    image: "/toyota loundra lamosine/597536698_1181155030879565_7929039320961236561_n.jpg",
    imageAlt: "Toyota Tundra limousine",
    imageCount: 4,
    highlights: [
      { label: "Passengers", value: 10 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "5 km/l" },
    ],
    imagesDetail: [
      { src: "/toyota loundra lamosine/548730881_1109367244725011_1016643812366982627_n.jpg", alt: "Toyota Tundra Limousine image", fileName: "548730881_1109367244725011_1016643812366982627_n.jpg" },
      { src: "/toyota loundra lamosine/596498577_1181155077546227_8503083915286266507_n.jpg", alt: "Toyota Tundra Limousine image", fileName: "596498577_1181155077546227_8503083915286266507_n.jpg" },
      { src: "/toyota loundra lamosine/596558016_1181155177546217_2967413592266109554_n.jpg", alt: "Toyota Tundra Limousine image", fileName: "596558016_1181155177546217_2967413592266109554_n.jpg" },
      { src: "/toyota loundra lamosine/597536698_1181155030879565_7929039320961236561_n.jpg", alt: "Toyota Tundra Limousine image", fileName: "597536698_1181155030879565_7929039320961236561_n.jpg" },
    ],
  },
   {
    name: "Toyota Land Cruiser V8",
    price: 30000,
    image: "/V8/land1.jpg",
    imageAlt: "Toyota Land Cruiser V8 white SUV",
    imageCount: 14,
    highlights: [
      { label: "Passengers", value: 7 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "7 km/l" },
    ],
    imagesDetail: [
      { src: "/V8/863749b8-f5bc-444f-98b4-c526735832ee.jpg", alt: "Toyota Land Cruiser V8 image", fileName: "863749b8-f5bc-444f-98b4-c526735832ee.jpg" },
      { src: "/V8/Back_View.jpg", alt: "Toyota Land Cruiser V8 back view", fileName: "Back_View.jpg" },
      { src: "/V8/Cover.jpg", alt: "Toyota Land Cruiser V8 cover view", fileName: "Cover.jpg" },
      { src: "/V8/Dashboard.jpg", alt: "Toyota Land Cruiser V8 dashboard", fileName: "Dashboard.jpg" },
      { src: "/V8/Front_Seats.jpg", alt: "Toyota Land Cruiser V8 front seats", fileName: "Front_Seats.jpg" },
      { src: "/V8/Front_View.jpg", alt: "Toyota Land Cruiser V8 front view", fileName: "Front_View.jpg" },
      { src: "/V8/land1.jpg", alt: "Toyota Land Cruiser V8 exterior", fileName: "land1.jpg" },
      { src: "/V8/land2.webp", alt: "Toyota Land Cruiser V8 side view", fileName: "land2.webp" },
      { src: "/V8/Left_Side_View.jpg", alt: "Toyota Land Cruiser V8 left side view", fileName: "Left_Side_View.jpg" },
      { src: "/V8/Rear_Seats.jpg", alt: "Toyota Land Cruiser V8 rear seats", fileName: "Rear_Seats.jpg" },
      { src: "/V8/Right_Rear_View.jpg", alt: "Toyota Land Cruiser V8 right rear view", fileName: "Right_Rear_View.jpg" },
      { src: "/V8/Steering_Wheel.jpg", alt: "Toyota Land Cruiser V8 steering wheel", fileName: "Steering_Wheel.jpg" },
      { src: "/V8/V8-for-Rental-550x500.webp", alt: "Toyota Land Cruiser V8 rental view", fileName: "V8-for-Rental-550x500.webp" },
      { src: "/V8/White-Land-Cruiser-for-Rent-550x500.webp", alt: "Toyota Land Cruiser V8 white exterior", fileName: "White-Land-Cruiser-for-Rent-550x500.webp" },
    ],
  },
];
