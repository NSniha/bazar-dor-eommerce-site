import Container from "@/components/shared/Container";
import ProductSkeleton from "@/components/shared/ProductSkeleton";

export default function CategoryLoading() {
  return (
    <main className="min-h-[65vh] bg-[#f0f5f1]">
      <Container className="pt-6 pb-16 sm:pt-7 sm:pb-20 lg:pb-24">
        <div className="flex min-h-[94px] animate-pulse items-center gap-4 rounded-[16px] border border-[#dfe7e1] bg-[#fafcfb] px-5 py-5 sm:px-6">
          <div className="h-[48px] w-[48px] shrink-0 rounded-[12px] bg-[#e5ece7]" />

          <div className="flex-1 space-y-3">
            <div className="h-[22px] w-[110px] rounded-md bg-[#e5ece7]" />
            <div className="h-[12px] w-[210px] max-w-full rounded-md bg-[#e5ece7]" />
          </div>
        </div>

        <div className="mt-6 flex min-h-[66px] animate-pulse items-center justify-end rounded-[16px] border border-[#dfe7e1] bg-[#fafcfb] px-5 sm:px-6">
          <div className="mr-3 h-[12px] w-[55px] rounded bg-[#e5ece7]" />
          <div className="h-[37px] w-[115px] rounded-[9px] bg-[#e5ece7]" />
        </div>

        <div className="mt-4 mb-[19px] h-[13px] w-[165px] animate-pulse rounded-md bg-[#e5ece7]" />

        <ProductSkeleton count={6} />

        <span className="sr-only">Loading category products...</span>
      </Container>
    </main>
  );
}