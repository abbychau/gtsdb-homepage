import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import favicon from "./favicon.png";
import hamham from "./hamham.png";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GTSDB",
  description: "A simple, efficient, and easy-to-use timeseries database for IoT and more.",
  icons: {
    icon: favicon.src,
  },
  openGraph: {
    title: "GTSDB",
    description: "A simple, efficient, and easy-to-use timeseries database for IoT and more.",
    type: "website",
    url: "https://gtsdb.abby.md",
    siteName: "GTSDB",
    locale: "en_US",
    images: [
      {
        url: hamham.src,
        width: 1200,
        height: 630,
        alt: "GTSDB - Time Series Database"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GTSDB",
    description: "A simple, efficient, and easy-to-use timeseries database for IoT and more.",
    images: [hamham.src]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
