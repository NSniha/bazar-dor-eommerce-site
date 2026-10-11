import { Suspense } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
      className="h-18.5 border-b border-[#e8eee9] bg-[#fafcfb] lg:h-32"
    />
  );
}

function TickerFallback() {
  return (
    <div
      aria-hidden="true"
      className="h-10.5 border-b border-[#e1e8e2] bg-[#fafcfb]"
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

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3500,
            style: {
              background: "#fafcfb",
              color: "#202b23",
              border: "1px solid #dfe7e1",
              borderRadius: "12px",
              fontSize: "13px",
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "#008a45",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}