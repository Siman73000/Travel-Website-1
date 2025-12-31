import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Background } from "@/src/components/Background";
import { Nav } from "@/src/components/Nav";
import { CursorGlow } from "@/src/components/CursorGlow";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Wanderlog",
  description: "A colorful travel journal of places I’ve explored.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Background />
        <CursorGlow />
        <Nav />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
