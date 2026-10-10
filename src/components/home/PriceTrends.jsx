import ProductCard from "@/components/shared/ProductCard";

export default function PriceTrends({ products = [] }) {
  const increasedProducts = products
    .filter((product) => product.direction === "up")
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 6);

  const decreasedProducts = products
    .filter((product) => product.direction === "down")
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 6);

  const sections = [
    {
      title: "Prices Increased Today",
      icon: "▲",
      color: "text-[#ef4444]",
      products: increasedProducts,
    },
    {
      title: "Prices Decreased Today",
      icon: "▼",
      color: "text-[#009d50]",
      products: decreasedProducts,
    },
  ];

  return (
    <div className="mt-11.25 space-y-10.75">
      {sections.map((section) => (
        <section key={section.title} aria-label={section.title}>
          <div className="mb-4.75 flex items-center gap-2.5">
            <span className={`text-[15px] leading-none ${section.color}`}>
              {section.icon}
            </span>

            <h2 className="text-[19px] leading-[1.3] font-bold tracking-[-0.5px] text-[#202b23] sm:text-[20px]">
              {section.title}
            </h2>
          </div>

          {section.products.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.products.map((product) => (
                <ProductCard key={product.id ?? product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] px-5 py-8 text-center text-[14px] text-[#68756d]">
              No price changes available in this category.
            </div>
          )}
        </section>
      ))}
    </div>
  );
}