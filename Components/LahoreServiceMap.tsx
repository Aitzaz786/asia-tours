"use client";

import { useCallback, useEffect, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 31.5204,
  lng: 73.8567, // approximate center of Punjab
};

const serviceAreas = [
  // ── Punjab Major Cities ──
  { name: "Lahore", lat: 31.5204, lng: 74.3587 },
  { name: "Faisalabad", lat: 31.4504, lng: 73.1350 },
  { name: "Rawalpindi", lat: 33.5651, lng: 73.0169 },
  { name: "Multan", lat: 30.1575, lng: 71.5249 },
  { name: "Gujranwala", lat: 32.1877, lng: 74.1945 },
  { name: "Sialkot", lat: 32.4927, lng: 74.5319 },
  { name: "Bahawalpur", lat: 29.3956, lng: 71.6835 },
  { name: "Sargodha", lat: 32.0836, lng: 72.6711 },
  { name: "Sheikhupura", lat: 31.7131, lng: 73.9783 },
  { name: "Gujrat", lat: 32.5736, lng: 74.0783 },
  { name: "Sahiwal", lat: 30.6682, lng: 73.1066 },
  { name: "Okara", lat: 30.8108, lng: 73.4502 },
  { name: "Rahim Yar Khan", lat: 28.4200, lng: 70.2950 },
  { name: "D.G. Khan", lat: 30.0491, lng: 70.6340 },
  { name: "Jhelum", lat: 32.9425, lng: 73.7257 },
  { name: "Chakwal", lat: 32.9308, lng: 72.8561 },
  { name: "Attock", lat: 33.7667, lng: 72.3600 },
  { name: "Taxila", lat: 33.7467, lng: 72.8414 },
  { name: "Mianwali", lat: 32.5850, lng: 71.5432 },
  { name: "Khushab", lat: 32.2960, lng: 72.3502 },
  { name: "Narowal", lat: 32.1031, lng: 74.8745 },
  { name: "Kasur", lat: 31.1160, lng: 74.4518 },
  { name: "Nankana Sahib", lat: 31.4505, lng: 73.7080 },
  { name: "Hafizabad", lat: 32.0710, lng: 73.6880 },
  { name: "Mandi Bahauddin", lat: 32.5836, lng: 73.4900 },
  { name: "Jhang", lat: 31.2690, lng: 72.3159 },
  { name: "Toba Tek Singh", lat: 30.9717, lng: 72.4828 },
  { name: "Pakpattan", lat: 30.3414, lng: 73.3929 },
  { name: "Vehari", lat: 30.0447, lng: 72.3515 },
  { name: "Khanewal", lat: 30.3010, lng: 71.9322 },
  { name: "Lodhran", lat: 29.5339, lng: 71.6327 },
  { name: "Wazirabad", lat: 32.4424, lng: 74.1202 },
  { name: "Chiniot", lat: 31.7200, lng: 72.9780 },
  { name: "Muzaffargarh", lat: 30.0736, lng: 71.1930 },
  { name: "Layyah", lat: 30.9598, lng: 70.9396 },
  { name: "Bhakkar", lat: 31.6273, lng: 71.0648 },
  { name: "Rajanpur", lat: 29.1043, lng: 70.3296 },
  { name: "Burewala", lat: 30.1667, lng: 72.6833 },
  { name: "Hasilpur", lat: 29.6963, lng: 72.5530 },
  { name: "Islamabad", lat: 33.6844, lng: 73.0479 },
  { name: "Murree", lat: 33.9068, lng: 73.3943 },
  { name: "Ayubia", lat: 33.9800, lng: 73.4500 },
  { name: "Nathia Gali", lat: 34.0600, lng: 73.3800 },
  { name: "Bhurban", lat: 33.9400, lng: 73.4600 },
  { name: "Patriata", lat: 33.8700, lng: 73.4100 },
];

const mapOptions: google.maps.MapOptions = {
  // 1 finger = page scroll, 2 fingers = pan map (mobile), Ctrl+scroll = zoom
  gestureHandling: "cooperative",
  disableDefaultUI: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
};

export default function PunjabServiceMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const [isTouch, setIsTouch] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    const touch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(touch);
  }, []);

  const dismissHint = useCallback(() => {
    setShowHint(false);
  }, []);

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
    <div
      className="relative overflow-hidden"
      onTouchStart={dismissHint}
      onClick={dismissHint}
    >
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/20" />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        options={mapOptions}
      >
        {serviceAreas.map((area, index) => (
          <MarkerF
            key={`${area.name}-${area.lat}-${area.lng}-${index}`}
            position={{ lat: area.lat, lng: area.lng }}
            title={area.name}
          />
        ))}
      </GoogleMap>

      {isTouch && showHint && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
          <p className="rounded-full bg-[#0f0e0c]/80 px-4 py-2 text-center text-xs font-medium text-white shadow-lg backdrop-blur-sm">
            Scroll with 1 finger · Move map with 2 fingers
          </p>
        </div>
      )}
    </div>
  );
}
