import { Suspense } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Bazar Dor | Daily Market Prices",
    template: "%s | Bazar Dor",
  },
  description:
    "Explore daily grocery prices, compare market trends, and stay updated with the latest price changes across Bangladesh.",
};

function NavbarFallback() {
  return (
    <div
      aria-hidden="true"
      className="h-[74px] border-b border-[#e8eee9] bg-[#fafcfb] lg:h-[128px]"
    />
  );
}

function TickerFallback() {
  return (
    <div
      aria-hidden="true"
      className="h-[42px] border-b border-[#e1e8e2] bg-[#fafcfb]"
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Suspense fallback={<NavbarFallback />}>
            <Navbar />
          </Suspense>

          <Suspense fallback={<TickerFallback />}>
            <PriceTicker />
          </Suspense>

          <div className="flex-1">{children}</div>

          <Footer />
        </div>
      </body>
    </html>
  );
}