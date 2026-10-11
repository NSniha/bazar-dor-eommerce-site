import { Suspense } from "react";
import { connection } from "next/server";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, AlertCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import ProductLoading from "./loading";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/bazar-api";
import { formatPercent, formatPrice, toNumber } from "@/lib/utils";

export const metadata = {
  title: "Product Details",
  description:
    "Explore detailed grocery prices, compare market rates, and track daily price changes.",
};

const categories = {
  chal: "Rice",
  dal: "Lentils",
  tel: "Oil",
  shobji: "Vegetables",
  sobji: "Vegetables",
  mach: "Fish",
  mangsho: "Meat",
  "dim-dudh": "Eggs & Dairy",
  "dudh-dim": "Eggs & Dairy",
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
  kilogram: "kg",
  liter: "liter",
  litre: "liter",
  dozen: "dozen",
  piece: "piece",
  pcs: "piece",
};

const marketNames = {
  "মাঠ বাজার": "Math Bazar",
  "সদর বাজার": "Sadar Bazar",
  "বাজারহাট": "Bazarhat",
  "বাসারহাট বাজার": "Basarhat Bazar",
  "চৌর বাজার": "Chour Bazar",
  "আমতলী বাজার": "Amtali Bazar",
  "ডবলগেট বাজার": "Double Gate Bazar",
  "চৌরাস্তা বাজার": "Chourasta Bazar",
  "গ্রীন মার্কেট, মিরপুর": "Green Market, Mirpur",
  "গ্রিন মার্কেট, মিরপুর": "Green Market, Mirpur",
  "চৌমুহনী বাজার": "Chowmuhani Bazar",
  "আমবাজার": "Aam Bazar",
  "কারওয়ান বাজার": "Karwan Bazar",
  "কারওয়ান বাজার": "Karwan Bazar",
  "কাওরান বাজার": "Karwan Bazar",
  "নিউ মার্কেট": "New Market",
  "রাজাবাজার": "Raja Bazar",
  "রাজারবাগ বাজার": "Rajarbag Bazar",
  "শ্যামবাজার": "Shyambazar",
  "রেয়াজউদ্দিন বাজার": "Reazuddin Bazar",
  "রেয়াজউদ্দিন বাজার": "Reazuddin Bazar",
};

const divisionNames = {
  "ঢাকা": "Dhaka",
  "চট্টগ্রাম": "Chattogram",
  "চট্রগ্রাম": "Chattogram",
  "চিটাগাং": "Chattogram",
  "খুলনা": "Khulna",
  "রাজশাহী": "Rajshahi",
  "বরিশাল": "Barishal",
  "রংপুর": "Rangpur",
  "সিলেট": "Sylhet",
  "ময়মনসিংহ": "Mymensingh",
  "ময়মনসিংহ": "Mymensingh",
};

const commonWords = {
  "বাজার": "Bazar",
  "হাট": "Hat",
  "মার্কেট": "Market",
  "সদর": "Sadar",
  "মাঠ": "Math",
  "আমতলী": "Amtali",
  "মিরপুর": "Mirpur",
  "গ্রীন": "Green",
  "গ্রিন": "Green",
  "নিউ": "New",
  "চৌরাস্তা": "Chourasta",
  "চৌমুহনী": "Chowmuhani",
  "ডবলগেট": "Double Gate",
  "কারওয়ান": "Karwan",
  "কারওয়ান": "Karwan",
  "কাওরান": "Karwan",
  "বাজারহাট": "Bazarhat",
  "বাসারহাট": "Basarhat",
};

const consonants = {
  "ক": "k",
  "খ": "kh",
  "গ": "g",
  "ঘ": "gh",
  "ঙ": "ng",
  "চ": "ch",
  "ছ": "chh",
  "জ": "j",
  "ঝ": "jh",
  "ঞ": "n",
  "ট": "t",
  "ঠ": "th",
  "ড": "d",
  "ঢ": "dh",
  "ণ": "n",
  "ত": "t",
  "থ": "th",
  "দ": "d",
  "ধ": "dh",
  "ন": "n",
  "প": "p",
  "ফ": "ph",
  "ব": "b",
  "ভ": "bh",
  "ম": "m",
  "য": "j",
  "র": "r",
  "ল": "l",
  "শ": "sh",
  "ষ": "sh",
  "স": "s",
  "হ": "h",
  "ড়": "r",
  "ঢ়": "rh",
  "য়": "y",
  "ৎ": "t",
};

const vowels = {
  "অ": "o",
  "আ": "a",
  "ই": "i",
  "ঈ": "i",
  "উ": "u",
  "ঊ": "u",
  "ঋ": "ri",
  "এ": "e",
  "ঐ": "oi",
  "ও": "o",
  "ঔ": "ou",
};

const vowelSigns = {
  "া": "a",
  "ি": "i",
  "ী": "i",
  "ু": "u",
  "ূ": "u",
  "ৃ": "ri",
  "ে": "e",
  "ৈ": "oi",
  "ো": "o",
  "ৌ": "ou",
};

function romanizeBengaliWord(word) {
  const characters = Array.from(word);
  let result = "";

  for (let index = 0; index < characters.length; index++) {
    const character = characters[index];
    const next = characters[index + 1];

    if (consonants[character]) {
      result += consonants[character];

      if (Object.prototype.hasOwnProperty.call(vowelSigns, next)) {
        result += vowelSigns[next];
        index++;
      } else if (next === "্") {
        index++;
      } else if (consonants[next]) {
        result += "o";
      }

      continue;
    }

    if (vowels[character]) {
      result += vowels[character];
      continue;
    }

    if (character === "ং") {
      result += "ng";
      continue;
    }

    if (character === "ঁ") {
      result += "n";
      continue;
    }

    if (character === "ঃ") {
      result += "h";
      continue;
    }

    if (character !== "্") {
      result += character;
    }
  }

  return result.charAt(0).toUpperCase() + result.slice(1);
}

function toEnglishPlaceName(value, translations = {}) {
  const original = String(value ?? "").normalize("NFC").trim();

  if (!original) return "Not available";

  if (translations[original]) {
    return translations[original];
  }

  if (!/[\u0980-\u09FF]/.test(original)) {
    return original;
  }

  return original
    .split(/(\s+|,)/)
    .map((part) => {
      if (/^(\s+|,)$/.test(part)) return part;

      if (commonWords[part]) {
        return commonWords[part];
      }

      return /[\u0980-\u09FF]/.test(part)
        ? romanizeBengaliWord(part)
        : part;
    })
    .join("");
}

function getMarketName(market) {
  const englishName =
    market.marketEn ??
    market.marketNameEn ??
    market.nameEn ??
    market.market?.nameEn;

  if (typeof englishName === "string" && englishName.trim()) {
    return englishName.trim();
  }

  const originalName =
    (typeof market.market === "string" ? market.market : null) ??
    market.market?.nameBn ??
    market.market?.name ??
    market.marketNameBn ??
    market.marketName ??
    market.nameBn ??
    market.name ??
    market.bazarName ??
    market.bazar;

  return toEnglishPlaceName(originalName, marketNames);
}

function getDivisionName(market) {
  const englishName = market.divisionEn;

  if (typeof englishName === "string" && englishName.trim()) {
    return englishName.trim();
  }

  const originalName =
    (typeof market.division === "string" ? market.division : null) ??
    market.division?.nameBn ??
    market.division?.name ??
    market.divisionName ??
    market.divisionBn;

  return toEnglishPlaceName(originalName, divisionNames);
}

function getMarketData(product) {
  if (!Array.isArray(product.markets)) return [];

  return product.markets
    .filter((market) => {
      if (!market || typeof market !== "object") return false;

      const min = market.min ?? market.minPrice;
      const max = market.max ?? market.maxPrice;

      return min != null && max != null;
    })
    .map((market, index) => {
      const min = toNumber(market.min ?? market.minPrice);
      const max = toNumber(market.max ?? market.maxPrice);

      return {
        id: `${product.id}-${index}`,
        name: getMarketName(market),
        division: getDivisionName(market),
        min,
        max,
        average:
          market.avg != null
            ? toNumber(market.avg)
            : market.average != null
              ? toNumber(market.average)
              : (min + max) / 2,
      };
    });
}

function PriceChange({ product }) {
  const isUp = product.direction === "up";
  const isDown = product.direction === "down";

  const color = isUp
    ? "text-[#ef4444]"
    : isDown
      ? "text-[#008a45]"
      : "text-[#68756d]";

  const icon = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <span
      className={`inline-flex items-center gap-1 text-[13px] font-semibold ${color}`}
    >
      <span className="text-[10px]">{icon}</span>
      {formatPercent(product.percent)}
    </span>
  );
}

function ProductPriceDescription({ product }) {
  const today = toNumber(product.today);
  const yesterday = toNumber(product.yesterday);

  const hasYesterday = product.yesterday != null && yesterday > 0;
  const difference = hasYesterday ? Math.abs(today - yesterday) : null;

  const isUp = product.direction === "up";
  const isDown = product.direction === "down";

  const percentage = formatPercent(product.percent);

  const changeColor = isUp
    ? "text-[#ef4444]"
    : isDown
      ? "text-[#008a45]"
      : "text-[#68756d]";

  if (!isUp && !isDown) {
    return (
      <p className="mt-3 text-[13px] leading-[1.7] text-[#526158] sm:text-[14px]">
        Today&apos;s price remains unchanged compared to yesterday.
      </p>
    );
  }

  return (
    <p className="mt-3 max-w-150 text-[13px] leading-[1.7] text-[#526158] sm:text-[14px]">
      Today&apos;s price {isUp ? "increased" : "decreased"} by{" "}
      <span className={`font-semibold ${changeColor}`}>
        {difference != null ? `৳${formatPrice(difference)} ` : ""}
        ({percentage})
      </span>{" "}
      compared to yesterday.
    </p>
  );
}

function ProductSummary({ product, categoryName, unit }) {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-start gap-4 sm:items-center">
        <div className="flex h-17 w-17 shrink-0 items-center justify-center rounded-[14px] bg-[#eef4ef] text-[35px] sm:h-19 sm:w-19 sm:text-[40px]">
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

          <ProductPriceDescription product={product} />
        </div>
      </div>

      <div className="flex min-w-33.75 shrink-0 flex-col items-center justify-center rounded-[14px] bg-[#eef4ef] px-5 py-4 text-center sm:min-h-31.25 md:self-stretch">
        <p className="text-[12px] font-medium text-[#68756d]">
          Today&apos;s Price
        </p>

        <p className="mt-2 text-[30px] leading-none font-bold tracking-[-1px] text-[#202b23]">
          ৳{formatPrice(product.today)}
        </p>

        <p className="mt-2 text-[12px] text-[#68756d]">
          BDT / {unit}
        </p>

        <div className="mt-2">
          <PriceChange product={product} />
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ title, value, description, color }) {
  return (
    <div className="flex min-h-26.25 flex-col justify-center rounded-[14px] border border-[#dfe7e1] bg-[#fafcfb] px-5 py-4">
      <p className="text-[12px] font-medium text-[#68756d]">
        {title}
      </p>

      <p
        className={`mt-2 text-[23px] leading-none font-bold tracking-[-0.5px] ${color}`}
      >
        ৳{formatPrice(value)}
      </p>

      <p className="mt-2 text-[11px] leading-normal text-[#68756d]">
        {description}
      </p>
    </div>
  );
}

function PriceSummary({ product, markets, unit }) {
  const minimum = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : toNumber(product.today);

  const maximum = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : toNumber(product.today);

  const average = markets.length
    ? markets.reduce((total, market) => total + market.average, 0) /
      markets.length
    : toNumber(product.today);

  return (
    <section aria-labelledby="price-summary-heading">
      <h2
        id="price-summary-heading"
        className="mb-4 text-[17px] font-bold tracking-[-0.3px] text-[#202b23]"
      >
        Price Summary
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard
          title="Minimum Price"
          value={minimum}
          description="Lowest price across markets"
          color="text-[#009d50]"
        />

        <SummaryCard
          title="Maximum Price"
          value={maximum}
          description="Highest price across markets"
          color="text-[#ef4444]"
        />

        <SummaryCard
          title="Average Price"
          value={average}
          description={`Average price per ${unit}`}
          color="text-[#009d50]"
        />
      </div>
    </section>
  );
}

function MarketPriceTable({ markets }) {
  return (
    <section
      aria-labelledby="market-prices-heading"
      className="mt-7"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2
          id="market-prices-heading"
          className="text-[17px] font-bold tracking-[-0.3px] text-[#202b23]"
        >
          Today&apos;s Market Prices
        </h2>

        <span className="text-[12px] text-[#68756d]">
          {markets.length}{" "}
          {markets.length === 1 ? "Market" : "Markets"}
        </span>
      </div>

      {markets.length > 0 ? (
        <div className="overflow-hidden rounded-[14px] border border-[#dfe7e1]">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-162.5 border-collapse text-left">
              <thead className="bg-[#fafcfb]">
                <tr className="border-b border-[#e3eae4]">
                  <th
                    scope="col"
                    className="w-[29%] px-4 py-3.75 text-[12px] font-semibold text-[#68756d]"
                  >
                    Market
                  </th>

                  <th
                    scope="col"
                    className="w-[23%] px-4 py-3.75 text-[12px] font-semibold text-[#68756d]"
                  >
                    Division
                  </th>

                  <th
                    scope="col"
                    className="w-[16%] px-4 py-3.75 text-right text-[12px] font-semibold text-[#68756d]"
                  >
                    Minimum
                  </th>

                  <th
                    scope="col"
                    className="w-[16%] px-4 py-3.75 text-right text-[12px] font-semibold text-[#68756d]"
                  >
                    Maximum
                  </th>

                  <th
                    scope="col"
                    className="w-[16%] px-4 py-3.75 text-right text-[12px] font-semibold text-[#68756d]"
                  >
                    Average
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={market.id}
                    className={`border-b border-[#dfe7e1] transition-colors duration-200 last:border-b-0 hover:bg-[#eaf4ed] ${
                      index % 2 === 0
                        ? "bg-[#fafcfb]"
                        : "bg-[#eef4ef]"
                    }`}
                  >
                    <td className="px-4 py-3.75 text-[13px] font-medium whitespace-nowrap text-[#202b23]">
                      {market.name}
                    </td>

                    <td className="px-4 py-3.75 text-[13px] whitespace-nowrap text-[#526158]">
                      {market.division}
                    </td>

                    <td className="px-4 py-3.75 text-right text-[13px] whitespace-nowrap text-[#526158]">
                      ৳{formatPrice(market.min)}
                    </td>

                    <td className="px-4 py-3.75 text-right text-[13px] whitespace-nowrap text-[#526158]">
                      ৳{formatPrice(market.max)}
                    </td>

                    <td className="px-4 py-3.75 text-right text-[13px] font-semibold whitespace-nowrap text-[#202b23]">
                      ৳{formatPrice(market.average)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-[14px] border border-[#dfe7e1] bg-[#f0f5f1] px-6 py-10 text-center">
          <p className="text-[14px] font-semibold text-[#202b23]">
            No Market Data Available
          </p>

          <p className="mt-2 text-[13px] text-[#68756d]">
            Market-wise pricing information is currently unavailable.
          </p>
        </div>
      )}
    </section>
  );
}

function ProductError() {
  return (
    <main className="min-h-[65vh] bg-[#f0f5f1]">
      <Container className="flex min-h-[65vh] items-center justify-center py-12">
        <div className="w-full max-w-lg rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0f0] text-[#ef4444]">
            <AlertCircle size={26} />
          </div>

          <h1 className="mt-5 text-[24px] font-bold text-[#202b23]">
            Unable to Load Product
          </h1>

          <p className="mt-3 text-[14px] leading-7 text-[#68756d]">
            We could not load the product details. Please try again in a moment.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#008a45] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#00783b]"
          >
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

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    const callbackURL = `/product/${encodeURIComponent(slug)}`;

    redirect(
      `/signin?callbackURL=${encodeURIComponent(callbackURL)}&authRequired=1`
    );
  }

  let product;

  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    console.error("Failed to load product details:", error);
    return <ProductError />;
  }

  if (!product) {
    notFound();
  }

  const categoryName = categories[product.category] || "Products";
  const unit = units[product.unit] || product.unit || "kg";
  const markets = getMarketData(product);

  return (
    <main className="min-h-[70vh] bg-[#f0f5f1]">
      <Container className="pt-7 pb-20 sm:pt-8 lg:pb-28">
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#526158]"
        >
          <Link
            href="/"
            className="transition-colors hover:text-[#008a45]"
          >
            Home
          </Link>

          <ChevronRight
            size={14}
            className="text-[#9caaa0]"
          />

          <Link
            href={`/category/${product.category}`}
            className="transition-colors hover:text-[#008a45]"
          >
            {categoryName}
          </Link>

          <ChevronRight
            size={14}
            className="text-[#9caaa0]"
          />

          <span
            aria-current="page"
            className="text-[#202b23]"
          >
            {product.name}
          </span>
        </nav>

        <ProductSummary
          product={product}
          categoryName={categoryName}
          unit={unit}
        />

        <div className="mt-6 rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] p-4 sm:p-5 lg:p-6">
          <PriceSummary
            product={product}
            markets={markets}
            unit={unit}
          />

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