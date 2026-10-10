import Link from "next/link";
import { formatPercent, formatPrice } from "@/lib/utils";

export default function ProductCard({ product }) {
  const isUp = product.direction === "up";
  const isDown = product.direction === "down";

  const changeStyle = isUp
    ? "text-[#ef4444]"
    : isDown
      ? "text-[#009d50]"
      : "text-[#526158]";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <Link
      href={`/product/${encodeURIComponent(product.slug)}`}
      aria-label={`View details for ${product.name}`}
      className="group flex min-h-34.5 flex-col justify-between rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] p-4 transition-all duration-300 ease-out hover:-translate-y-0.75 hover:border-[#b9d8c3] hover:shadow-[0_10px_28px_rgba(25,65,39,0.07)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008a45]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-11.75 w-11.75 shrink-0 items-center justify-center rounded-[11px] bg-[#eef4ef] text-[24px] transition-transform duration-300 group-hover:scale-105">
          {product.emoji}
        </span>

        <div className="min-w-0">
          <h3 className="line-clamp-2 text-[15px] leading-[1.35] font-semibold tracking-[-0.3px] text-[#202b23] transition-colors duration-200 group-hover:text-[#008a45]">
            {product.name}
          </h3>

          <p className="mt-1 text-[12px] leading-none font-normal text-[#67746b]">
            Per {product.unit}
          </p>
        </div>
      </div>

      <div className="mt-4.25 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] leading-none font-medium text-[#68756d]">
            Today&apos;s Price
          </p>

          <p className="mt-1.5 text-[18px] leading-none font-bold tracking-[-0.5px] text-[#202b23]">
            ৳{formatPrice(product.today)}
          </p>
        </div>

        <span className={`inline-flex shrink-0 items-center justify-center gap-1.25 rounded-full bg-[#edf3ee] px-2.25 py-1.25 text-[11px] leading-none font-semibold ${changeStyle}`}>
          <span className="text-[9px]">{changeIcon}</span>
          {formatPercent(product.percent)}
        </span>
      </div>
    </Link>
  );
}