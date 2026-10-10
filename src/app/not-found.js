import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#f0f5f1] px-4 py-16">
      <div className="mx-auto max-w-lg text-center">
        {/* Error Code */}
        <h1 className="text-8xl font-bold tracking-tight text-[#008a45] sm:text-9xl">
          404
        </h1>

        {/* Error Message */}
        <h2 className="mt-6 text-2xl font-bold text-[#202b23] sm:text-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        </h2>

        <p className="mt-4 text-base leading-7 text-[#68736b]">
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        </p>

        {/* Back to Home */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#008a45] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00743a] hover:shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}