import Container from "@/components/shared/Container";

export default function ProductLoading() {
  return (
    <main className="min-h-[70vh] bg-[#f0f5f1]">
      <Container className="pt-7 pb-20 sm:pt-8 lg:pb-28">
        <div className="mb-7 flex animate-pulse items-center gap-3">
          <div className="h-4 w-12 rounded bg-[#dfe8e1]" />
          <div className="h-4 w-4 rounded bg-[#dfe8e1]" />
          <div className="h-4 w-20 rounded bg-[#dfe8e1]" />
          <div className="h-4 w-28 rounded bg-[#dfe8e1]" />
        </div>

        <div className="flex min-h-[158px] animate-pulse flex-col justify-between gap-5 rounded-[16px] border border-[#dfe7e1] bg-[#fafcfb] p-5 sm:p-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="h-[76px] w-[76px] shrink-0 rounded-[14px] bg-[#e5ece7]" />

            <div className="space-y-3">
              <div className="h-7 w-44 rounded-md bg-[#e5ece7] sm:w-60" />
              <div className="h-3 w-28 rounded bg-[#e5ece7]" />
              <div className="h-3 w-48 max-w-full rounded bg-[#e5ece7]" />
            </div>
          </div>

          <div className="h-[125px] w-full shrink-0 rounded-[14px] bg-[#e5ece7] md:w-[135px]" />
        </div>

        <div className="mt-6 animate-pulse rounded-[16px] border border-[#dfe7e1] bg-[#fafcfb] p-4 sm:p-5 lg:p-6">
          <div className="mb-4 h-5 w-36 rounded bg-[#e5ece7]" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[105px] rounded-[14px] border border-[#dfe7e1] bg-[#f0f5f1] p-5">
                <div className="h-3 w-24 rounded bg-[#e5ece7]" />
                <div className="mt-3 h-6 w-28 rounded bg-[#e5ece7]" />
                <div className="mt-3 h-3 w-36 max-w-full rounded bg-[#e5ece7]" />
              </div>
            ))}
          </div>

          <div className="mt-7 mb-4 h-5 w-48 rounded bg-[#e5ece7]" />

          <div className="overflow-hidden rounded-[14px] border border-[#dfe7e1]">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex h-[54px] items-center justify-between gap-4 border-b border-[#dfe7e1] px-4 last:border-b-0">
                <div className="h-3 w-24 rounded bg-[#e5ece7]" />
                <div className="h-3 w-20 rounded bg-[#e5ece7]" />
                <div className="h-3 w-16 rounded bg-[#e5ece7]" />
              </div>
            ))}
          </div>
        </div>

        <span className="sr-only">Loading product details...</span>
      </Container>
    </main>
  );
}