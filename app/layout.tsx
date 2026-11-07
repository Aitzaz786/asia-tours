import "./globals.css";
import "@/Components/gold/gold.css";
import NavigationWrapper from "@/Components/NavigationWrapper";
import type { Metadata } from "next";
import Script from "next/script";

const googleAnalyticsId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-VZ9PV6TKG7";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/favicon_io/site.webmanifest", 
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
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Asia Tours Pakistan",
      "url": "https://asiatourspk.com",
      "logo": "https://asiatourspk.com/logo.webp",
      "telephone": "+923004591145",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "41 F Block, Punjab Society, Shanghai Road",
        "addressLocality": "Lahore",
        "addressRegion": "Punjab",
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
        <NavigationWrapper>{children}</NavigationWrapper>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
      </body>
    </html>
  );
}
