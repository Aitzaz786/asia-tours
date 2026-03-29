"use client";

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 31.5204,
  lng: 73.8567, // approximate center of Punjab
};

// All major cities of Punjab, Pakistan
const serviceAreas = [
  { name: "Lahore", lat: 31.5204, lng: 74.3587 },
  { name: "Faisalabad", lat: 31.4504, lng: 73.1350 },
  { name: "Rawalpindi", lat: 33.5651, lng: 73.0169 },
  { name: "Multan", lat: 30.1575, lng: 71.5249 },
  { name: "Gujranwala", lat: 32.1877, lng: 74.1945 },
  { name: "Sialkot", lat: 32.4927, lng: 74.5319 },
  { name: "Bahawalpur", lat: 29.3956, lng: 71.6835 },
  { name: "Sargodha", lat: 32.0836, lng: 72.6711 },
  { name: "Sheikhupura", lat: 31.7131, lng: 73.9783 },
  { name: "Jhang", lat: 31.2690, lng: 72.3159 },
  { name: "Chiniot", lat: 31.7200, lng: 72.9780 },
  { name: "Gujrat", lat: 32.5736, lng: 74.0783 },
  { name: "Okara", lat: 30.8108, lng: 73.4502 },
  { name: "Pakpattan", lat: 30.3414, lng: 73.3929 },
  { name: "Rahim Yar Khan", lat: 28.4200, lng: 70.2950 },
  { name: "Kasur", lat: 31.1160, lng: 74.4518 },
  { name: "Mandi Bahauddin", lat: 32.5836, lng: 73.4900 },
];

export default function PunjabServiceMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  if (!apiKey) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center rounded-[24px] bg-[#faf7f4] text-sm text-[#666666]">
        Google Maps API key is missing.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center rounded-[24px] bg-[#faf7f4] text-sm text-[#666666]">
        Loading map...
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        {serviceAreas.map((area) => (
          <MarkerF
            key={area.name}
            position={{ lat: area.lat, lng: area.lng }}
            title={area.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
}