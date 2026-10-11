
import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Container from "@/components/shared/Container";
import CategoryProducts from "./CategoryProducts";
import CategoryLoading from "./loading";
import { getCategories, getProducts } from "@/lib/bazar-api";

const categoryDetails = {
  chal: {
    name: "Rice",
    icon: "🍚",
    aliases: ["chal", "rice", "চাল"],
  },
  dal: {
    name: "Lentils",
    icon: "🫘",
    aliases: ["dal", "lentils", "ডাল"],
  },
  tel: {
    name: "Oil",
    icon: "🛢️",
    aliases: ["tel", "oil", "তেল"],
  },
  shobji: {
    name: "Vegetables",
    icon: "🥬",
    aliases: ["shobji", "sobji", "shak-sobji", "vegetables", "সবজি", "শাকসবজি"],
  },
  mach: {
    name: "Fish",
    icon: "🐟",
    aliases: ["mach", "fish", "মাছ"],
  },
  mangsho: {
    name: "Meat",
    icon: "🍗",
    aliases: ["mangsho", "meat", "মাংস"],
  },
  "dim-dudh": {
    name: "Eggs & Dairy",
    icon: "🥛",
    aliases: ["dim-dudh", "dudh-dim", "dimdudh", "dudhdim", "eggs", "dairy", "ডিম", "দুধ", "দুগ্ধ"],
  },
  mosla: {
    name: "Spices",
    icon: "🌶️",
    aliases: ["mosla", "moshla", "mashla", "spices", "মসলা"],
  },
};

function normalizeSlug(value) {
  return String(value || "").trim().toLowerCase().replace(/[\s_-]/g, "");
}

function getCategoryValues(category) {
  if (typeof category === "string") return [category];

  return [
    category?.slug,
    category?.name,
    category?.nameBn,
    category?.nameEn,
  ].filter(Boolean);
}

function getCategoryDetails(value) {
  const normalized = normalizeSlug(value);

  return Object.values(categoryDetails).find((details) =>
    details.aliases.some((alias) => {
      const normalizedAlias = normalizeSlug(alias);
      return normalized === normalizedAlias || normalized.includes(normalizedAlias);
    })
  );
}

function resolveCategory(categories, slug) {
  const requestedSlug = normalizeSlug(slug);

  const exactMatch = categories.find((category) =>
    getCategoryValues(category).some((value) => normalizeSlug(value) === requestedSlug)
  );

  if (exactMatch) return exactMatch;

  const details = getCategoryDetails(slug);

  if (!details) return null;

  return (
    categories.find((category) =>
      getCategoryValues(category).some((value) => {
        const normalizedValue = normalizeSlug(value);

        return details.aliases.some((alias) =>
          normalizedValue.includes(normalizeSlug(alias))
        );
      })
    ) || null
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryDetails(slug);
  const name = category?.name || "Product Category";

  return {
    title: `${name} Prices`,
    description: `Explore today's ${name.toLowerCase()} prices and compare market price changes on Bazar Dor.`,
  };
}

function CategoryError() {
  return (
    <main className="flex min-h-[65vh] items-center bg-[#f0f5f1] py-16">
      <Container>
        <div className="mx-auto max-w-lg rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] px-6 py-12 text-center sm:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0f0] text-[#ef4444]">
            <AlertCircle size={26} />
          </div>

          <h1 className="mt-5 text-[24px] font-bold text-[#202b23]">
            Unable to Load Category
          </h1>

          <p className="mt-3 text-[14px] leading-7 text-[#68756d]">
            We could not load the latest category information. Please try again in a moment.
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

async function CategoryContent({ params }) {
  await connection();

  const { slug } = await params;

  let categories;

  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Failed to load categories:", error);
    return <CategoryError />;
  }

  if (!Array.isArray(categories)) {
    return <CategoryError />;
  }

  const category = resolveCategory(categories, slug);

  if (!category) {
    notFound();
  }

  const apiSlug = typeof category === "string" ? category : category.slug;

  if (!apiSlug) {
    return <CategoryError />;
  }

  let products;

  try {
    products = await getProducts(apiSlug);
  } catch (error) {
    console.error("Failed to load category products:", error);
    return <CategoryError />;
  }

  const details =
    getCategoryDetails(slug) ||
    getCategoryValues(category).map(getCategoryDetails).find(Boolean);

  const categoryName = details?.name || "Products";
  const categoryIcon = details?.icon || "🛒";
  const productCount = products.length;

  return (
    <main className="min-h-[65vh] bg-[#f0f5f1]">
      <Container className="pt-6 pb-16 sm:pt-7 sm:pb-20 lg:pb-24">
        <section className="flex min-h-23.5 items-center gap-4 rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] px-5 py-5 sm:px-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center text-[36px] sm:h-13 sm:w-13 sm:text-[40px]">
            {categoryIcon}
          </div>

          <div className="min-w-0">
            <h1 className="text-[24px] leading-[1.2] font-bold tracking-[-0.6px] text-[#202b23] sm:text-[26px]">
              {categoryName}
            </h1>

            <p className="mt-1.5 text-[13px] leading-normal text-[#68756d] sm:text-[14px]">
              Today&apos;s prices and changes for {productCount} {productCount === 1 ? "product" : "products"}.
            </p>
          </div>
        </section>

        <CategoryProducts products={products} />
      </Container>
    </main>
  );
}

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}