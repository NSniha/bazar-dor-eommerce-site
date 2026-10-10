import ProductCard from "@/components/shared/ProductCard";

export default function AllProducts({ products = [] }) {
  return (
    <section id="সব-পণ্য" aria-labelledby="all-products-heading" className="mt-11.25 scroll-mt-6">
      <div className="mb-5">
        <h2 id="all-products-heading" className="text-[21px] leading-[1.3] font-bold tracking-[-0.5px] text-[#202b23] sm:text-[22px]">
          All Products
        </h2>

        <p className="mt-2.25 text-[13px] leading-normal text-[#68756d] sm:text-[14px]">
          Showing {products.length} products with today&apos;s latest market prices.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id ?? product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] px-6 py-16 text-center">
          <h3 className="text-[18px] font-semibold text-[#202b23]">No Products Available</h3>
          <p className="mt-2 text-[14px] text-[#68756d]">Please check back later for the latest market prices.</p>
        </div>
      )}
    </section>
  );
}