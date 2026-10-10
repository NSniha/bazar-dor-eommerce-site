import { normalizeProduct } from "./utils";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

async function fetchData(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const result = await response.json();

  if (result?.success === false || result?.status === false) {
    throw new Error(result.message || "API request failed");
  }

  return result?.data ?? result;
}

function getItems(data, key) {
  const items = Array.isArray(data) ? data : data?.[key] ?? data?.items;

  if (!Array.isArray(items)) {
    throw new Error("Invalid API response format");
  }

  return items;
}

export async function getProducts(category = null) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const data = await fetchData(`/products${query}`);

  return getItems(data, "products").map(normalizeProduct);
}

export async function getProduct(id) {
  const data = await fetchData(`/products/${encodeURIComponent(id)}`);
  const product = data?.product ?? data;

  return product ? normalizeProduct(product) : null;
}

export async function getCategories() {
  const data = await fetchData("/categories");

  return getItems(data, "categories");
}

export async function getCategory(slug) {
  const data = await fetchData(`/categories/${encodeURIComponent(slug)}`);

  return data?.category ?? data;
}