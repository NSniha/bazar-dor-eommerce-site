"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, PackageX } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";
import { toNumber } from "@/lib/utils";

export default function CategoryProducts({ products = [] }) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sortBy === "low-to-high") {
      return items.sort((a, b) => toNumber(a.today) - toNumber(b.today));
    }

    if (sortBy === "high-to-low") {
      return items.sort((a, b) => toNumber(b.today) - toNumber(a.today));
    }

    return items;
  }, [products, sortBy]);

  return (
    <div className="mt-6">
      <section aria-label="Product sorting" className="flex min-h-[66px] items-center justify-end rounded-[16px] border border-[#dfe7e1] bg-[#fafcfb] px-5 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <label htmlFor="category-sort" className="text-[13px] font-medium whitespace-nowrap text-[#68756d] sm:text-[14px]">
            Sort By
          </label>

          <div className="relative">
            <select
              id="category-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              disabled={products.length === 0}
              className="h-[37px] max-w-[210px] min-w-[110px] cursor-pointer appearance-none rounded-[9px] border border-[#cfdad1] bg-[#fafcfb] pr-9 pl-3 text-[12px] font-medium text-[#202b23] outline-none transition-all duration-200 hover:border-[#008a45] focus:border-[#008a45] focus:ring-2 focus:ring-[#008a45]/10 disabled:cursor-not-allowed disabled:opacity-60 sm:text-[13px]"
            >
              <option value="default">Default</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>

            <ChevronDown size={15} strokeWidth={2} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#202b23]" />
          </div>
        </div>
      </section>

      <p className="mt-4 mb-[19px] text-[13px] leading-[1.5] text-[#68756d]">
        Showing {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}.
      </p>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id ?? product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-[16px] border border-[#dfe7e1] bg-[#fafcfb] px-5 py-14 text-center sm:py-16">
          <div className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-2xl bg-[#edf4ef] text-[#008a45]">
            <PackageX size={29} strokeWidth={1.6} />
          </div>

          <h2 className="mt-5 text-[22px] font-bold text-[#202b23]">
            No Products Found
          </h2>

          <p className="mx-auto mt-3 max-w-md text-[14px] leading-7 text-[#68756d]">
            There are currently no products available in this category. Explore other categories to find market prices.
          </p>

          <Link href="/" className="mt-7 inline-flex h-[43px] items-center justify-center gap-2 rounded-[9px] bg-[#008a45] px-6 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00783b]">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}