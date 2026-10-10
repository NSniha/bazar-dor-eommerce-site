import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f1] px-4 py-16">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-19 w-19 items-center justify-center rounded-[22px] bg-[#e4f2e9] text-[#008a45]">
          <SearchX size={36} strokeWidth={1.6} />
        </div>

        <h1 className="mt-6 text-[76px] leading-none font-extrabold tracking-[-4px] text-[#008a45] sm:text-[96px]">
          404
        </h1>

        <h2 className="mt-5 text-[24px] font-bold tracking-[-0.5px] text-[#202b23] sm:text-[28px]">
          Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-[14px] leading-7 text-[#68756d] sm:text-[15px]">
          Sorry, the page or category you are looking for does not exist. Please return to the homepage and explore our products.
        </p>

        <Link href="/" className="mt-8 inline-flex h-11.25 items-center justify-center gap-2 rounded-[10px] bg-[#008a45] px-7 text-[14px] font-semibold text-white shadow-[0_3px_0_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00783b]">
          <ArrowLeft size={17} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}