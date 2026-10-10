export default function ProductSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex min-h-[138px] animate-pulse flex-col justify-between rounded-[16px] border border-[#dfe7e1] bg-[#fafcfb] p-[16px]">
          <div className="flex items-center gap-[12px]">
            <div className="h-[47px] w-[47px] shrink-0 rounded-[11px] bg-[#e5ece7]" />

            <div className="flex-1 space-y-2.25">
              <div className="h-[13px] w-[55%] rounded-md bg-[#e5ece7]" />
              <div className="h-[10px] w-[35%] rounded-md bg-[#e5ece7]" />
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