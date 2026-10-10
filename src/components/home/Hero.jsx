"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(new Date());

      setCurrentDate(formattedDate);
    };

    updateDate();

    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="group relative isolate w-full overflow-hidden rounded-3xl border border-[#dfe7e1] bg-[#fafcfb] px-6 pt-9 pb-5 sm:px-8 sm:pt-10 sm:pb-6 lg:min-h-75 lg:px-9 lg:pt-10 lg:pb-10"
    >
      <div className="animate-fade-up relative z-10 lg:pr-87.5 xl:pr-95">
        <span className="inline-flex min-h-7.5 items-center rounded-full bg-[#e1f1e7] px-3.5 py-1.5 text-[12px] leading-[1.4] font-semibold text-[#008a45] sm:text-[13px]">
          {currentDate || "Daily Market Update"}
        </span>

        <h1
          id="hero-heading"
          className="mt-4.5 text-[32px] leading-[1.18] font-bold tracking-[-1.3px] text-[#202b23] sm:text-[38px] lg:text-[36px] xl:text-[40px]"
        >
          Today&apos;s Market Prices at a Glance
        </h1>

        <p className="mt-5.5 max-w-147.5 text-[14px] leading-[1.7] font-normal text-[#68756d] sm:text-[15px]">
          Explore today&apos;s prices for rice, lentils, oil, vegetables, fish, meat, eggs, and spices. Compare market trends and stay informed about daily price changes.
        </p>

        <a
          href="#সব-পণ্য"
          className="mt-7 inline-flex h-11 items-center justify-center rounded-[9px] bg-[#008a45] px-6 text-[14px] font-semibold text-white shadow-[0_3px_0_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#00783b] hover:shadow-[0_7px_18px_rgba(0,138,69,0.2)] active:translate-y-0"
        >
          Explore All Products
        </a>
      </div>

      <div className="pointer-events-none relative mx-auto mt-5 w-71.25 max-w-full sm:mt-6 sm:w-81.25 lg:absolute lg:right-3.75 lg:-bottom-2.5 lg:mt-0 lg:w-88.75 xl:right-5 xl:w-96.25">
        <Image
          src="/images/bazar-hero.png"
          alt="A colorful basket filled with fresh vegetables"
          width={420}
          height={380}
          priority
          sizes="(max-width: 639px) 285px, (max-width: 1023px) 325px, (max-width: 1279px) 355px, 385px"
          className="h-auto w-full object-contain transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </div>
    </section>
  );
}