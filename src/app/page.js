import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import Container from "@/components/shared/Container";
import Hero from "@/components/home/Hero";
import PriceTrends from "@/components/home/PriceTrends";
import AllProducts from "@/components/home/AllProducts";
import ProductSkeleton from "@/components/shared/ProductSkeleton";
import { getProducts } from "@/lib/bazar-api";

function MarketSkeleton() {
  return (
    <div className="mt-12 space-y-12" role="status" aria-label="Loading market prices">
      <section>
        <div className="mb-5 h-6 w-56 animate-pulse rounded-md bg-[#dfe8e1]" />
        <ProductSkeleton count={6} />
      </section>

      <section>
        <div className="mb-5 h-6 w-56 animate-pulse rounded-md bg-[#dfe8e1]" />
        <ProductSkeleton count={6} />
      </section>

      <section>
        <div className="mb-3 h-6 w-36 animate-pulse rounded-md bg-[#dfe8e1]" />
        <div className="mb-5 h-4 w-64 animate-pulse rounded-md bg-[#dfe8e1]" />
        <ProductSkeleton count={9} />
      </section>

      <span className="sr-only">Loading the latest market prices...</span>
    </div>
  );
}

function MarketMessage({ title, description }) {
  return (
    <section className="mt-12 rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] px-6 py-14 text-center">
      <h2 className="text-xl font-bold text-[#202b23] sm:text-2xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#68756d]">{description}</p>

      <Link href="/" className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#008a45] px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#00783b]">
        Back to Home
      </Link>
    </section>
  );
}

async function MarketSections() {
  await connection();

  let products;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load market products:", error);

    return (
      <MarketMessage
        title="Unable to Load Market Prices"
        description="We could not load the latest market prices. Please refresh the page and try again."
      />
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <MarketMessage
        title="No Products Available"
        description="Market price information is currently unavailable. Please check back later."
      />
    );
  }

  return (
    <div>
      <PriceTrends products={products} />
      <AllProducts products={products} />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f0f5f1]">
      <Container className="pt-6 pb-16 sm:pb-20 lg:pb-24">
        <Hero />

        <Suspense fallback={<MarketSkeleton />}>
          <MarketSections />
        </Suspense>
      </Container>
    </main>
  );
}