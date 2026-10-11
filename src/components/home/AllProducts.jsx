"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpDown, Check, ChevronDown } from "lucide-react";
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
      className="relative z-20 w-35.5 shrink-0 sm:w-57.5"
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Sort products: ${selectedOption?.label}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="home-sort-options"
        onClick={() => setIsOpen((previous) => !previous)}
        onKeyDown={(event) => {
          if (
            !isOpen &&
            ["ArrowDown", "ArrowUp"].includes(event.key)
          ) {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
        className={`group flex h-10 w-full items-center justify-between gap-2 rounded-[10px] border bg-[#fafcfb] px-3 text-[12px] font-medium transition-all duration-200 sm:h-11 sm:rounded-[11px] sm:px-3.75 sm:text-[13px] ${
          isOpen
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
          className={`shrink-0 text-[#718077] transition-transform duration-300 ${
            isOpen
              ? "rotate-180 text-[#008a45]"
              : "group-hover:text-[#008a45]"
          }`}
        />
      </button>

      {isOpen && (
        <div
          id="home-sort-options"
          role="listbox"
          aria-label="Sort products by price"
          onKeyDown={handleKeyDown}
          className="absolute top-[calc(100%+8px)] right-0 z-30 w-55 origin-top-right overflow-hidden rounded-[13px] border border-[#e0e8e2] bg-white p-1.5 shadow-[0_14px_35px_rgba(25,55,35,0.12)] motion-safe:animate-[sortDropdown_0.2s_ease-out] sm:w-full"
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
                className={`flex min-h-10.5 w-full items-center justify-between gap-3 rounded-[9px] px-3 text-left text-[13px] transition-colors duration-200 ${
                  isSelected
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

export default function AllProducts({ products = [] }) {
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
      id="সব-পণ্য"
      aria-labelledby="all-products-heading"
      className="mt-10 scroll-mt-6 sm:mt-12"
    >
      <div className="relative mb-5 flex items-center justify-between gap-3 sm:mb-5.5 sm:gap-5">
        <div className="min-w-0 flex-1">
          <h2
            id="all-products-heading"
            className="text-[20px] leading-[1.3] font-bold tracking-[-0.6px] text-[#202b23] sm:text-[24px]"
          >
            All Products
          </h2>

          <p className="mt-1.5 text-[12px] leading-normal text-[#68756d] sm:mt-1.75 sm:text-[14px]">
            <span className="sm:hidden">
              Showing {productCount}{" "}
              {productCount === 1 ? "product" : "products"}
            </span>

            <span className="hidden sm:inline">
              Showing {productCount}{" "}
              {productCount === 1 ? "product" : "products"}{" "}
              with today&apos;s latest market prices.
            </span>
          </p>
        </div>

        <SortDropdown
          value={sortBy}
          onChange={setSortBy}
        />
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
          <h3 className="text-[18px] font-semibold text-[#202b23]">
            No Products Available
          </h3>

          <p className="mt-2 text-[14px] text-[#68756d]">
            Please check back later for the latest market prices.
          </p>
        </div>
      )}
    </section>
  );
}