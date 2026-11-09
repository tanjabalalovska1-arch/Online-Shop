import { apiClient } from "./client";

// Gi prebaruva proizvodite spored vneseniot zbor
export async function searchProducts(query, signal) {
  const data = await apiClient(
    `/products/search?q=${encodeURIComponent(query)}`,
    { signal },
  );

  return data.products;
}

// Go prezema proizvodot spored negovoto ID
export async function getProductById(id) {
  return apiClient(`/products/${id}`);
}

// Gi prezema proizvodite za pocetnata strana
export async function getProducts(limit = 100, signal) {
  const data = await apiClient(`/products?limit=${limit}`, { signal });

  return data.products || [];
}

// Gi prezema proizvodite od odredena kategorija
export async function getProductsByCategory(category, signal) {
  const data = await apiClient(
    `/products/category/${encodeURIComponent(category)}`,
    { signal },
  );

  return data.products || [];
}

// Ja prezema listata na kategorii
export async function getCategories(signal) {
  return apiClient("/products/categories", { signal });
}