import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, AlertCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import ProductLoading from "./loading";
import { getProductBySlug } from "@/lib/bazar-api";
import { formatPercent, formatPrice, toNumber } from "@/lib/utils";

export const metadata = {
  title: "Product Details",
  description: "Explore detailed grocery prices, compare market rates, and track daily price changes.",
};

const categories = {
  chal: "Rice",
  dal: "Lentils",
  tel: "Oil",
  shobji: "Vegetables",
  mach: "Fish",
  mangsho: "Meat",
  "dim-dudh": "Eggs & Dairy",
  mosla: "Spices",
  moshla: "Spices",
};

const units = {
  "কেজি": "kg",
  "লিটার": "liter",
  "ডজন": "dozen",
  "পিস": "piece",
  "গ্রাম": "g",
  kg: "kg",
  liter: "liter",
  litre: "liter",
  dozen: "dozen",
  piece: "piece",
};

const divisions = {
  "ঢাকা": "Dhaka",
  "চট্টগ্রাম": "Chattogram",
  "চট্রগ্রাম": "Chattogram",
  "খুলনা": "Khulna",
  "রাজশাহী": "Rajshahi",
  "বরিশাল": "Barishal",
  "রংপুর": "Rangpur",
  "সিলেট": "Sylhet",
  "ময়মনসিংহ": "Mymensingh",
  "ময়মনসিংহ": "Mymensingh",
};

const marketNames = {
  "মাঠ বাজার": "Math Market",
  "সদর বাজার": "Sadar Market",
  "রাজাবাজার": "Raja Bazar",
  "বামরাইটি বাজার": "Bamraiti Market",
  "চৌর বাজার": "Chaur Market",
  "আমতলী বাজার": "Amtali Market",
  "উলবেড়ি বাজার": "Ulberia Market",
  "চৌহাটা বাজার": "Chouhatta Market",
  "গ্রীন মার্কেট, মিরপুর": "Green Market, Mirpur",
  "চৌমুহনী বাজার": "Chowmuhani Market",
  "আমবাজার": "Aam Bazar",
  "কারওয়ান বাজার": "Karwan Bazar",
  "কারওয়ান বাজার": "Karwan Bazar",
  "নিউ মার্কেট": "New Market",
};

function getEnglishLabel(value, translations, fallback) {
  const text = String(value || "").trim();

  if (!text) return fallback;

  if (translations[text]) return translations[text];

  return /[\u0980-\u09FF]/.test(text) ? fallback : text;
}

function getMarketData(product) {
  if (!Array.isArray(product.markets)) return [];

  return product.markets
    .filter((market) => market && market.min != null && market.max != null)
    .map((market, index) => {
      const min = toNumber(market.min);
      const max = toNumber(market.max);

      return {
        id: index,
        name: getEnglishLabel(market.market, marketNames, `Market ${index + 1}`),
        division: getEnglishLabel(market.division, divisions, "Not specified"),
        min,
        max,
        average: market.avg != null ? toNumber(market.avg) : (min + max) / 2,
      };
    });
}

function PriceChange({ product }) {
  const isUp = product.direction === "up";
  const isDown = product.direction === "down";

  const color = isUp ? "text-[#ef4444]" : isDown ? "text-[#008a45]" : "text-[#68756d]";
  const icon = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <span className={`inline-flex items-center gap-1 text-[13px] font-semibold ${color}`}>
      <span className="text-[10px]">{icon}</span>
      {formatPercent(product.percent)}
    </span>
  );
}

function ProductSummary({ product, categoryName, unit }) {
  const today = toNumber(product.today);
  const yesterday = product.yesterday == null ? null : toNumber(product.yesterday);
  const difference = yesterday == null ? null : today - yesterday;

  const description =
    difference == null
      ? "Explore the latest market prices and compare rates across different markets."
      : difference > 0
        ? `Price increased by ৳${formatPrice(difference)} compared to yesterday.`
        : difference < 0
          ? `Price decreased by ৳${formatPrice(Math.abs(difference))} compared to yesterday.`
          : "The price remains unchanged compared to yesterday.";

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-start gap-4 sm:items-center">
        <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[14px] bg-[#eef4ef] text-[35px] sm:h-[76px] sm:w-[76px] sm:text-[40px]">
          {product.emoji || "🛒"}
        </div>

        <div className="min-w-0">
          <h1 className="text-[24px] leading-[1.2] font-bold tracking-[-0.8px] text-[#202b23] sm:text-[29px]">
            {product.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-[#68756d] sm:text-[13px]">
            <span>Per {unit}</span>
            <span className="text-[#a9b4ac]">·</span>
            <span className="rounded-full bg-[#edf4ef] px-2.5 py-1 font-medium text-[#008a45]">
              {categoryName}
            </span>
          </div>

          <p className="mt-3 max-w-[570px] text-[13px] leading-[1.6] text-[#526158] sm:text-[14px]">
            {description}
          </p>
        </div>
      </div>

      <div className="flex min-w-[135px] shrink-0 flex-col items-center justify-center rounded-[14px] bg-[#eef4ef] px-5 py-4 text-center sm:min-h-[125px] md:self-stretch">
        <p className="text-[12px] font-medium text-[#68756d]">Today&apos;s Price</p>

        <p className="mt-2 text-[30px] leading-none font-bold tracking-[-1px] text-[#202b23]">
          ৳{formatPrice(today)}
        </p>

        <p className="mt-2 text-[12px] text-[#68756d]">BDT / {unit}</p>

        <div className="mt-2">
          <PriceChange product={product} />
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ title, value, description, color }) {
  return (
    <div className="flex min-h-[105px] flex-col justify-center rounded-[14px] border border-[#dfe7e1] bg-[#fafcfb] px-5 py-4">
      <p className="text-[12px] font-medium text-[#68756d]">{title}</p>

      <p className={`mt-2 text-[23px] leading-none font-bold tracking-[-0.5px] ${color}`}>
        ৳{formatPrice(value)}
      </p>

      <p className="mt-2 text-[11px] leading-[1.5] text-[#68756d]">{description}</p>
    </div>
  );
}

function PriceSummary({ product, markets, unit }) {
  const minimum = markets.length ? Math.min(...markets.map((market) => market.min)) : toNumber(product.today);
  const maximum = markets.length ? Math.max(...markets.map((market) => market.max)) : toNumber(product.today);
  const average = markets.length ? markets.reduce((total, market) => total + market.average, 0) / markets.length : toNumber(product.today);

  return (
    <section aria-labelledby="price-summary-heading">
      <h2 id="price-summary-heading" className="mb-4 text-[17px] font-bold tracking-[-0.3px] text-[#202b23]">
        Price Summary
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard title="Minimum Price" value={minimum} description="Lowest price across markets" color="text-[#009d50]" />
        <SummaryCard title="Maximum Price" value={maximum} description="Highest price across markets" color="text-[#ef4444]" />
        <SummaryCard title="Average Price" value={average} description={`Average price per ${unit}`} color="text-[#009d50]" />
      </div>
    </section>
  );
}

function MarketPriceTable({ markets }) {
  return (
    <section aria-labelledby="market-prices-heading" className="mt-7">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="market-prices-heading" className="text-[17px] font-bold tracking-[-0.3px] text-[#202b23]">
          Today&apos;s Market Prices
        </h2>

        <span className="text-[12px] text-[#68756d]">
          {markets.length} {markets.length === 1 ? "Market" : "Markets"}
        </span>
      </div>

      {markets.length > 0 ? (
        <div className="overflow-hidden rounded-[14px] border border-[#dfe7e1]">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left">
              <thead className="bg-[#fafcfb]">
                <tr className="border-b border-[#e3eae4]">
                  <th scope="col" className="w-[29%] px-4 py-[15px] text-[12px] font-semibold text-[#68756d]">Market</th>
                  <th scope="col" className="w-[23%] px-4 py-[15px] text-[12px] font-semibold text-[#68756d]">Division</th>
                  <th scope="col" className="w-[16%] px-4 py-[15px] text-right text-[12px] font-semibold text-[#68756d]">Minimum</th>
                  <th scope="col" className="w-[16%] px-4 py-[15px] text-right text-[12px] font-semibold text-[#68756d]">Maximum</th>
                  <th scope="col" className="w-[16%] px-4 py-[15px] text-right text-[12px] font-semibold text-[#68756d]">Average</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr key={market.id} className={`border-b border-[#dfe7e1] transition-colors duration-200 last:border-b-0 hover:bg-[#eaf4ed] ${index % 2 === 0 ? "bg-[#fafcfb]" : "bg-[#eef4ef]"}`}>
                    <td className="px-4 py-[15px] text-[13px] font-medium whitespace-nowrap text-[#202b23]">{market.name}</td>
                    <td className="px-4 py-[15px] text-[13px] whitespace-nowrap text-[#526158]">{market.division}</td>
                    <td className="px-4 py-[15px] text-right text-[13px] whitespace-nowrap text-[#526158]">৳{formatPrice(market.min)}</td>
                    <td className="px-4 py-[15px] text-right text-[13px] whitespace-nowrap text-[#526158]">৳{formatPrice(market.max)}</td>
                    <td className="px-4 py-[15px] text-right text-[13px] font-semibold whitespace-nowrap text-[#202b23]">৳{formatPrice(market.average)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-[14px] border border-[#dfe7e1] bg-[#f0f5f1] px-6 py-10 text-center">
          <p className="text-[14px] font-semibold text-[#202b23]">No Market Data Available</p>
          <p className="mt-2 text-[13px] text-[#68756d]">Market-wise pricing information is currently unavailable.</p>
        </div>
      )}
    </section>
  );
}

function ProductError() {
  return (
    <main className="min-h-[65vh] bg-[#f0f5f1]">
      <Container className="flex min-h-[65vh] items-center justify-center py-12">
        <div className="w-full max-w-lg rounded-[16px] border border-[#dfe7e1] bg-[#fafcfb] px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0f0] text-[#ef4444]">
            <AlertCircle size={26} />
          </div>

          <h1 className="mt-5 text-[24px] font-bold text-[#202b23]">Unable to Load Product</h1>
          <p className="mt-3 text-[14px] leading-7 text-[#68756d]">
            We could not load the product details. Please try again in a moment.
          </p>

          <Link href="/" className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#008a45] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#00783b]">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </Container>
    </main>
  );
}

async function ProductDetailsContent({ params }) {
  await connection();

  const { slug } = await params;

  let product;

  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    console.error("Failed to load product details:", error);
    return <ProductError />;
  }

  if (!product) notFound();

  const categoryName = categories[product.category] || "Products";
  const unit = units[product.unit] || product.unit || "kg";
  const markets = getMarketData(product);

  return (
    <main className="min-h-[70vh] bg-[#f0f5f1]">
      <Container className="pt-7 pb-20 sm:pt-8 lg:pb-28">
        <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#526158]">
          <Link href="/" className="transition-colors hover:text-[#008a45]">Home</Link>
          <ChevronRight size={14} className="text-[#9caaa0]" />
          <Link href={`/category/${product.category}`} className="transition-colors hover:text-[#008a45]">{categoryName}</Link>
          <ChevronRight size={14} className="text-[#9caaa0]" />
          <span aria-current="page" className="text-[#202b23]">{product.name}</span>
        </nav>

        <ProductSummary product={product} categoryName={categoryName} unit={unit} />

        <div className="mt-6 rounded-[16px] border border-[#dfe7e1] bg-[#fafcfb] p-4 sm:p-5 lg:p-6">
          <PriceSummary product={product} markets={markets} unit={unit} />
          <MarketPriceTable markets={markets} />
        </div>
      </Container>
    </main>
  );
}

export default function ProductDetailsPage({ params }) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}