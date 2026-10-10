// Temporary preview data.
const products = [
  {
    id: 1,
    name: "Swarnamashi Rice",
    emoji: "🍚",
    price: 148,
    unit: "kg",
    change: 2.1,
  },
  {
    id: 2,
    name: "Miniket Rice",
    emoji: "🍚",
    price: 99,
    unit: "kg",
    change: -2.9,
  },
  {
    id: 3,
    name: "Small Grain Rice",
    emoji: "🍚",
    price: 66,
    unit: "kg",
    change: 0.5,
  },
  {
    id: 4,
    name: "Masoor Lentils",
    emoji: "🫘",
    price: 142,
    unit: "kg",
    change: 2.9,
  },
  {
    id: 5,
    name: "Chickpeas",
    emoji: "🫘",
    price: 120,
    unit: "kg",
    change: -2.4,
  },
  {
    id: 6,
    name: "Soybean Oil",
    emoji: "🫙",
    price: 195,
    unit: "liter",
    change: 1.5,
  },
  {
    id: 7,
    name: "Onion",
    emoji: "🧅",
    price: 54,
    unit: "kg",
    change: 2.5,
  },
  {
    id: 8,
    name: "Green Chili",
    emoji: "🌶️",
    price: 92,
    unit: "kg",
    change: -2.4,
  },
];

// Reusable ticker item
function TickerItem({ product }) {
  const isUp = product.change > 0;
  const isDown = product.change < 0;

  const changeColor = isUp
    ? "text-[#ef4444]"
    : isDown
      ? "text-[#009d50]"
      : "text-[#69746c]";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <div className="flex h-10.5 shrink-0 items-center gap-1.75 border-r border-[#e1e8e2] px-4.75 whitespace-nowrap">

      {/* Product emoji */}
      <span className="text-[16px] leading-none">
        {product.emoji}
      </span>

      {/* Product name */}
      <span className="text-[13px] font-medium tracking-[-0.1px] text-[#263129]">
        {product.name}
      </span>

      {/* Product price */}
      <span className="text-[13px] font-medium text-[#263129]">
        ৳{product.price}/{product.unit}
      </span>

      {/* Price change */}
      <span className={`text-[12px] font-semibold ${changeColor}`}>
        {changeIcon} {Math.abs(product.change).toFixed(1)}%
      </span>

    </div>
  );
}

// Infinite scrolling ticker
export default function PriceTicker() {
  return (
    <section
      aria-label="Latest market price updates"
      className="relative z-10 w-full overflow-hidden border-b border-[#e1e8e2] bg-[#fafcfb] font-sans"
    >
      <div className="ticker-track">

        {/* Original items */}
        <div className="flex shrink-0">
          {products.map((product) => (
            <TickerItem
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Duplicate items for seamless scrolling */}
        <div className="flex shrink-0" aria-hidden="true">
          {products.map((product) => (
            <TickerItem
              key={`duplicate-${product.id}`}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}