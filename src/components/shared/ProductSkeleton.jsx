export default function ProductSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex min-h-34.5 animate-pulse flex-col justify-between rounded-2xl border border-[#dfe7e1] bg-[#fafcfb] p-4">
          <div className="flex items-center gap-3">
            <div className="h-11.75 w-11.75 shrink-0 rounded-[11px] bg-[#e5ece7]" />

            <div className="flex-1 space-y-2.25">
              <div className="h-3.25 w-[55%] rounded-md bg-[#e5ece7]" />
              <div className="h-2.5 w-[35%] rounded-md bg-[#e5ece7]" />
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <div className="h-2.25 w-16.25 rounded-md bg-[#e5ece7]" />
              <div className="h-4 w-21.25 rounded-md bg-[#e5ece7]" />
            </div>

            <div className="h-5.25 w-14.5 rounded-full bg-[#e5ece7]" />
          </div>
        </div>
      ))}
    </div>
  );
}