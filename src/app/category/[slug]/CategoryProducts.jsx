"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpDown, Check, ChevronDown } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";
import { toNumber } from "@/lib/utils";

const sortOptions = [
  {
    value: "default",
    label: "Default",
    shortLabel: "Default",
  },
  {
    value: "low-to-high",
    label: "Price: Low to High",
    shortLabel: "Low to High",
  },
  {
    value: "high-to-low",
    label: "Price: High to Low",
    shortLabel: "High to Low",
  },
];

function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  const selectedOption = sortOptions.find(
    (option) => option.value === value
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const selectedIndex = sortOptions.findIndex(
      (option) => option.value === value
    );

    optionRefs.current[selectedIndex]?.focus();
  }, [isOpen, value]);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key === "Tab") {
      setIsOpen(false);
      return;
    }

    const currentIndex = optionRefs.current.indexOf(
      document.activeElement
    );

    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp"
    ) {
      event.preventDefault();

      const direction = event.key === "ArrowDown" ? 1 : -1;

      const nextIndex =
        (currentIndex + direction + sortOptions.length) %
        sortOptions.length;

      optionRefs.current[nextIndex]?.focus();
    }

    if (event.key === "Home") {
      event.preventDefault();
      optionRefs.current[0]?.focus();
    }

    if (event.key === "End") {
      event.preventDefault();
      optionRefs.current[sortOptions.length - 1]?.focus();
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative z-30 w-35.5 shrink-0 sm:w-57.5"
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Sort products: ${selectedOption?.label}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="category-sort-options"
        onClick={() => setIsOpen((previous) => !previous)}
        onKeyDown={(event) => {
          if (
            !isOpen &&
            ["ArrowDown", "ArrowUp"].includes(event.key)
          ) {
            event.preventDefault();
            setIsOpen(true);
          }

          if (isOpen && event.key === "Escape") {
            event.preventDefault();
            setIsOpen(false);
          }
        }}
        className={`group flex h-10 w-full items-center justify-between gap-2 rounded-[10px] border bg-[#fafcfb] px-3 text-[12px] font-medium transition-all duration-200 sm:h-11 sm:rounded-[11px] sm:px-3.75 sm:text-[13px] ${isOpen
            ? "border-[#008a45] shadow-[0_0_0_3px_rgba(0,138,69,0.08)]"
            : "border-[#dfe7e1] shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:border-[#a9cdb4] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
          }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          <ArrowUpDown
            size={15}
            strokeWidth={1.8}
            className="shrink-0 text-[#008a45]"
          />

          <span className="truncate text-[#29352d] sm:hidden">
            {selectedOption?.shortLabel}
          </span>

          <span className="hidden text-[#29352d] sm:inline">
            {selectedOption?.label}
          </span>
        </span>

        <ChevronDown
          size={16}
          strokeWidth={1.8}
          className={`shrink-0 text-[#718077] transition-transform duration-300 ${isOpen
              ? "rotate-180 text-[#008a45]"
              : "group-hover:text-[#008a45]"
            }`}
        />
      </button>

      {isOpen && (
        <div
          id="category-sort-options"
          role="listbox"
          aria-label="Sort products by price"
          onKeyDown={handleKeyDown}
          className="absolute top-[calc(100%+8px)] right-0 z-40 w-55 origin-top-right overflow-hidden rounded-[13px] border border-[#e0e8e2] bg-white p-1.5 shadow-[0_14px_35px_rgba(25,55,35,0.12)] motion-safe:animate-[sortDropdown_0.2s_ease-out] sm:w-full"
        >
          {sortOptions.map((option, index) => {
            const isSelected = value === option.value;

            return (
              <button
                key={option.value}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
                className={`flex min-h-10.5 w-full items-center justify-between gap-3 rounded-[9px] px-3 text-left text-[13px] transition-colors duration-200 ${isSelected
                    ? "bg-[#e9f5ed] font-semibold text-[#008a45]"
                    : "font-medium text-[#455349] hover:bg-[#f1f6f2] hover:text-[#008a45]"
                  }`}
              >
                <span>{option.label}</span>

                {isSelected && (
                  <Check
                    size={16}
                    strokeWidth={2.2}
                    className="shrink-0 text-[#008a45]"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CategoryProducts({ products = [] }) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sortBy === "low-to-high") {
      return items.sort(
        (a, b) => toNumber(a.today) - toNumber(b.today)
      );
    }

    if (sortBy === "high-to-low") {
      return items.sort(
        (a, b) => toNumber(b.today) - toNumber(a.today)
      );
    }

    return items;
  }, [products, sortBy]);

  const productCount = sortedProducts.length;

  return (
    <section
      aria-label="Category products"
      className="mt-5"
    >
      <div className="relative z-20 flex min-h-16.5 items-center justify-end rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] px-4 py-3 sm:px-5">
        <div className="flex items-center justify-end gap-3 sm:gap-4">
          <span className="shrink-0 text-[12px] font-medium text-[#68756d] sm:text-[13px]">
            Sort By
          </span>

          <SortDropdown
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      </div>

      <div className="mt-4 mb-4 flex items-center">
        <p className="text-[12px] font-medium text-[#68756d] sm:text-[13px]">
          Showing{" "}
          <span className="font-semibold text-[#202b23]">
            {productCount}
          </span>{" "}
          {productCount === 1 ? "product" : "products"}
        </p>
      </div>

      {productCount > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id ?? product.slug}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef4ef] text-[28px]">
            🛒
          </div>

          <h3 className="mt-5 text-[19px] font-bold text-[#202b23]">
            No Products Available
          </h3>

          <p className="mt-2 text-[14px] leading-7 text-[#68756d]">
            There are currently no products available in this category.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#008a45] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#00783b]"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      )}
    </section>
  );
}