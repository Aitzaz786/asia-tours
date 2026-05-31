import "./globals.css";
import LenisSmoothScroll from "@/Components/LenisSmoothScroll";
import NavigationWrapper from "@/Components/NavigationWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  verification: {
    google: "MFNjOqnto8ESVBliJURloduDlfE9m-ro8QTzpcPSSWM",
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
      </head>
      <body>
        <LenisSmoothScroll />
        <NavigationWrapper>{children}</NavigationWrapper>
      </body>
    </html>
  );
}