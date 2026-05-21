import "./globals.css";
import LenisSmoothScroll from "@/Components/LenisSmoothScroll";
import NavigationWrapper from "@/Components/NavigationWrapper";

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
