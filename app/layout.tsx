import "./globals.css";
import LenisSmoothScroll from "@/Components/LenisSmoothScroll";
import NavigationWrapper from "@/Components/NavigationWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "0wLhdIxhJWvbe83rJLTEI3xFI__jl_9DQbQHNAoKwzY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/landv.webm"
          as="video"
          type="video/webm"
        />
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Asia Tours Pakistan",
      "url": "https://asiatourspk.com",
      "logo": "https://asiatourspk.com/logo.jpeg",
      "image": "https://asiatourspk.com/og-default.jpg",
      "telephone": "+923004591145",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Punjab Society, Ghazi Road",
        "addressLocality": "Lahore",
        "addressRegion": "Punjab",
         "postalCode": "54770", 
        "addressCountry": "PK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 31.4604,
        "longitude": 74.3681
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "PKR 12,000 - PKR 85,000",
      "description": "Asia Tours Pakistan offers premium car rental services including luxury SUVs, chauffeur service, and airport transfers across Pakistan.",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Car Rental Services",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Toyota Land Cruiser V8"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Mercedes-Benz S-Class"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Airport Transfer"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Chauffeur Service"}}
        ]
      },
      "sameAs": [
        "https://wa.me/923004591145"
      ]
    })
  }}
/>
      </head>
      <body>
        <LenisSmoothScroll />
        <NavigationWrapper>{children}</NavigationWrapper>
      </body>
    </html>
  );
}
