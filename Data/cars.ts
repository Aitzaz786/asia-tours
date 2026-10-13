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

const CAR_IMAGE_COUNT = 5;

function carImage(folder: string, index: number) {
  return `/cars/${folder}/${String(index).padStart(2, "0")}.webp`;
}

function carGallery(folder: string, name: string): ParamMap[] {
  return Array.from({ length: CAR_IMAGE_COUNT }, (_, index) => {
    const fileName = `${String(index + 1).padStart(2, "0")}.webp`;

    return {
      src: `/cars/${folder}/${fileName}`,
      alt: `${name} view ${index + 1}`,
      fileName,
    };
  });
}

export const fleets: Fleet[] = [
  {
    name: "Audi A6",
    price: 50000,
    image: carImage("Audi A6", 1),
    imageAlt: "Audi A6 luxury sedan",
    imageCount: CAR_IMAGE_COUNT,
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "11 km/l" },
    ],
    imagesDetail: carGallery("Audi A6", "Audi A6"),
  },
  {
    name: "Mercedes-Benz G-Wagon",
    price: 150000,
    image: carImage("Mercedes-Benz G-Wagon", 1),
    imageAlt: "Mercedes-Benz G-Wagon luxury SUV",
    imageCount: CAR_IMAGE_COUNT,
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "6 km/l" },
    ],
    imagesDetail: carGallery("Mercedes-Benz G-Wagon", "Mercedes-Benz G-Wagon"),
  },
  {
    name: "GMC Limousine",
    price: 150000,
    image: carImage("GMC Limousine", 1),
    imageAlt: "GMC limousine rental vehicle",
    imageCount: CAR_IMAGE_COUNT,
    highlights: [
      { label: "Passengers", value: 10 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "5 km/l" },
    ],
    imagesDetail: carGallery("GMC Limousine", "GMC Limousine"),
  },
  {
    name: "Toyota Hilux 4x4",
    price: 15000,
    image: carImage("Toyota Hilux 4x4", 1),
    imageAlt: "Toyota Hilux 4x4 pickup truck",
    imageCount: CAR_IMAGE_COUNT,
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Diesel" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "12 km/l" },
    ],
    imagesDetail: carGallery("Toyota Hilux 4x4", "Toyota Hilux 4x4"),
  },
  {
    name: "Mercedes-Maybach S580",
    price: 170000,
    image: carImage("Mercedes-Maybach S580", 1),
    imageAlt: "Mercedes-Maybach S580 luxury sedan",
    imageCount: CAR_IMAGE_COUNT,
    highlights: [
      { label: "Passengers", value: 4 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "7 km/l" },
    ],
    imagesDetail: carGallery("Mercedes-Maybach S580", "Mercedes-Maybach S580"),
  },
  {
    name: "Toyota Land Cruiser Prado",
    price: 20000,
    image: carImage("Toyota Land Cruiser Prado", 1),
    imageAlt: "Toyota Land Cruiser Prado SUV",
    imageCount: CAR_IMAGE_COUNT,
    highlights: [
      { label: "Passengers", value: 7 },
      { label: "Fuel", value: "Diesel" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "10 km/l" },
    ],
    imagesDetail: carGallery("Toyota Land Cruiser Prado", "Toyota Land Cruiser Prado"),
  },
  {
    name: "Range Rover",
    price: 150000,
    image: carImage("Range Rover", 1),
    imageAlt: "Range Rover luxury SUV",
    imageCount: CAR_IMAGE_COUNT,
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "8 km/l" },
    ],
    imagesDetail: carGallery("Range Rover", "Range Rover"),
  },
  {
    name: "Toyota Fortuner",
    price: 18000,
    image: carImage("Toyota Fortuner", 1),
    imageAlt: "Toyota Fortuner SUV",
    imageCount: CAR_IMAGE_COUNT,
    highlights: [
      { label: "Passengers", value: 7 },
      { label: "Fuel", value: "Diesel" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "11 km/l" },
    ],
    imagesDetail: carGallery("Toyota Fortuner", "Toyota Fortuner"),
  },
  {
    name: "Toyota Tundra Limousine",
    price: 150000,
    image: carImage("Toyota Tundra Limousine", 1),
    imageAlt: "Toyota Tundra limousine",
    imageCount: CAR_IMAGE_COUNT,
    highlights: [
      { label: "Passengers", value: 10 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "5 km/l" },
    ],
    imagesDetail: carGallery("Toyota Tundra Limousine", "Toyota Tundra Limousine"),
  },
  {
    name: "Toyota Land Cruiser V8",
    price: 30000,
    image: carImage("Toyota Land Cruiser V8", 1),
    imageAlt: "Toyota Land Cruiser V8 black SUV",
    imageCount: CAR_IMAGE_COUNT,
    highlights: [
      { label: "Passengers", value: 7 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "7 km/l" },
    ],
    imagesDetail: carGallery("Toyota Land Cruiser V8", "Toyota Land Cruiser V8"),
  },
];
