const productNames = {
  "স্বর্ণমাছি চাল": "Swarnamashi Rice",
  "মিনিকেট চাল": "Miniket Rice",
  "নাজির চাল": "Nazir Rice",
  "বাটাম সাইজ চাল": "Batam Size Rice",
  "মসুর ডাল": "Masoor Lentils",
  "মুগ ডাল": "Mung Beans",
  "ছোলা": "Chickpeas",
  "আমন ডাল (খোসাসিলা)": "Aman Lentils (With Skin)",
  "সরিষার তেল": "Mustard Oil",
  "পাম তেল": "Palm Oil",
  "ঘানি ভাঙা সরিষার তেল": "Cold-Pressed Mustard Oil",
  "আলু": "Potatoes",
  "পেঁয়াজ": "Onions",
  "কাঁচামরিচ": "Green Chilies",
  "বেগুন": "Eggplants",
  "ঢেঁড়স": "Okra",
  "রুই মাছ": "Rohu Fish",
  "তেলাপিয়া": "Tilapia",
  "ইলিশ মাছ": "Hilsa Fish",
  "কাতলা মাছ": "Catla Fish",
  "চিংড়ি মাছ (খোলা)": "Shrimp",
  "মুরগির মাংস": "Chicken",
  "গরুর মাংস": "Beef",
  "খাসির মাংস": "Mutton",
  "হাঁসের মাংস": "Duck",
  "ডিম": "Eggs",
  "দুধ": "Milk",
  "দই": "Yogurt",
  "মাখন (১০০ গ্রাম)": "Butter (100 g)",
  "আদা": "Ginger",
  "রসুন": "Garlic",
  "মরিচ গুঁড়া": "Chili Powder",
  "ধনেপাতা গুঁড়া": "Coriander Powder",
};

const unitNames = {
  kg: "kg",
  kilogram: "kg",
  liter: "liter",
  litre: "liter",
  dozen: "dozen",
  piece: "piece",
  pcs: "piece",
};

export function toNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;

  const numbers = "০১২৩৪৫৬৭৮৯";
  const converted = String(value ?? "0")
    .replace(/[০-৯]/g, (digit) => numbers.indexOf(digit))
    .replace(/,/g, "")
    .replace(/[^0-9.-]/g, "");

  const result = Number(converted);
  return Number.isFinite(result) ? result : 0;
}

export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(toNumber(value));
}

export function formatPercent(value) {
  return `${Math.abs(toNumber(value)).toFixed(1)}%`;
}

export function getEnglishName(product) {
  const original = String(product.nameBn || product.name || "").normalize("NFC").trim();

  if (product.nameEn) return product.nameEn;
  if (productNames[original]) return productNames[original];
  if (original && !/[\u0980-\u09FF]/.test(original)) return original;

  const slug = String(product.slug || `product-${product.id || ""}`);
  return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function normalizeProduct(product) {
  const today = toNumber(product.today ?? product.todayPrice ?? product.price);
  const yesterday = toNumber(product.yesterday);
  const rawPercent = product.change?.pct ?? product.changePercent;
  const calculatedPercent = yesterday > 0 ? ((today - yesterday) / yesterday) * 100 : 0;
  const changeValue = rawPercent == null ? calculatedPercent : toNumber(rawPercent);
  const direction = product.change?.dir || (changeValue > 0 ? "up" : changeValue < 0 ? "down" : "flat");

  return {
    ...product,
    id: product.id,
    slug: product.slug || String(product.id),
    name: getEnglishName(product),
    emoji: product.image || product.categoryIcon || "🛒",
    unit: unitNames[String(product.unit || "kg").toLowerCase()] || product.unit,
    today,
    direction,
    percent: direction === "flat" ? 0 : Math.abs(changeValue),
    signedChange: direction === "up" ? Math.abs(changeValue) : direction === "down" ? -Math.abs(changeValue) : 0,
  };
}