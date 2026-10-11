import Container from "@/components/shared/Container";
import ProductSkeleton from "@/components/shared/ProductSkeleton";

export default function CategoryLoading() {
  return (
    <main className="min-h-[65vh] bg-[#f0f5f1]">
      <Container className="pt-6 pb-16 sm:pt-7 sm:pb-20 lg:pb-24">
        <div className="flex min-h-23.5 animate-pulse items-center gap-4 rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] px-5 py-5 sm:px-6">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-[#e5ece7]" />

          <div className="flex-1 space-y-3">
            <div className="h-5.5 w-27.5 rounded-md bg-[#e5ece7]" />
            <div className="h-3 w-52.5 max-w-full rounded-md bg-[#e5ece7]" />
          </div>
        </div>

        <div className="mt-6 flex min-h-16.5 animate-pulse items-center justify-end rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] px-5 sm:px-6">
          <div className="mr-3 h-3 w-13.75 rounded bg-[#e5ece7]" />
          <div className="h-9.25 w-28.75 rounded-[9px] bg-[#e5ece7]" />
        </div>

        <div className="mt-4 mb-4.75 h-3.25 w-41.25 animate-pulse rounded-md bg-[#e5ece7]" />

        <ProductSkeleton count={6} />

        <span className="sr-only">Loading category products...</span>
      </Container>
    </main>
  );
}