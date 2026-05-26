export type Highlight = {
  label: string;
  value: string | number | boolean;
};

export type Fleet = {
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  highlights?: Highlight[];
};

export function getFleetSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const fleets: Fleet[] = [
  {
    name: "Toyota Land Cruiser V8",
    price: 45000,
    image: "/v8/land2.webp",
    imageAlt: "Toyota Land Cruiser V8 white SUV",
    highlights: [
      { label: "Passengers", value: 7 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "7 km/l" },
    ],
  },
  {
    name: "Toyota Land Cruiser Prado",
    price: 35000,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    imageAlt: "Toyota Land Cruiser Prado silver SUV",
    highlights: [
      { label: "Passengers", value: 7 },
      { label: "Fuel", value: "Diesel" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "10 km/l" },
    ],
  },
  {
    name: "Toyota Hilux 4x4",
    price: 22000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    imageAlt: "Toyota Hilux 4x4 white pickup truck",
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Diesel" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "12 km/l" },
    ],
  },
  {
    name: "Mercedes-Benz S-Class",
    price: 52000,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    imageAlt: "Mercedes-Benz S-Class black luxury sedan",
    highlights: [
      { label: "Passengers", value: 4 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "9 km/l" },
    ],
  },
  {
    name: "Mercedes-Benz G-Wagon",
    price: 58000,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    imageAlt: "Mercedes-Benz G-Wagon black luxury SUV",
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "6 km/l" },
    ],
  },
  {
    name: "Audi A6",
    price: 38000,
    image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&q=80",
    imageAlt: "Audi A6 silver executive sedan",
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "11 km/l" },
    ],
  },
  {
    name: "BMW 7 Series",
    price: 42000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    imageAlt: "BMW 7 Series black executive sedan",
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "10 km/l" },
    ],
  },
  {
    name: "Range Rover",
    price: 49000,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80",
    imageAlt: "Range Rover white luxury SUV",
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "8 km/l" },
    ],
  },
  {
    name: "Land Rover Defender",
    price: 46000,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    imageAlt: "Land Rover Defender green off-road SUV",
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Diesel" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "9 km/l" },
    ],
  },
  {
    name: "Bentley Continental GT",
    price: 85000,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    imageAlt: "Bentley Continental GT black ultra luxury car",
    highlights: [
      { label: "Passengers", value: 4 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "5 km/l" },
    ],
  },
  {
    name: "Toyota Corolla",
    price: 12000,
    image: "/white-luxury-sedan-2024-bmw-600nw-2499645683.webp",
    imageAlt: "Toyota Corolla white sedan",
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "16 km/l" },
    ],
  },
  {
    name: "Honda Civic",
    price: 13000,
    image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&q=80",
    imageAlt: "Honda Civic silver sedan",
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "15 km/l" },
    ],
  },
  {
    name: "Honda Civic RS Turbo",
    price: 16000,
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
    imageAlt: "Honda Civic RS Turbo red sports sedan",
    highlights: [
      { label: "Passengers", value: 5 },
      { label: "Fuel", value: "Petrol" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "13 km/l" },
    ],
  },
  {
    name: "Toyota Hiace Wagon",
    price: 20000,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    imageAlt: "Toyota Hiace Wagon white passenger van",
    highlights: [
      { label: "Passengers", value: 14 },
      { label: "Fuel", value: "Diesel" },
      { label: "A/C", value: true },
      { label: "Mileage", value: "11 km/l" },
    ],
  },
];
