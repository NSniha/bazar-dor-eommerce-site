import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// Global typography
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Bazar Dor | Daily Market Prices",
    template: "%s | Bazar Dor",
  },
  description:
    "Track daily grocery prices, compare market trends, and stay updated with the latest price changes across Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <PriceTicker />
        {children}
         <Footer />
      </body>
    </html>
  );
}