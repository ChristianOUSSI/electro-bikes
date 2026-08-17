"use client";

import { useEffect, useState } from "react";
import { Locale } from "@/i18n/config";
import { Dictionary } from "@/i18n/dictionaries";
import { Product } from "@/lib/types";
import FilterSidebar, { Filters } from "./FilterSidebar";
import ProductCard from "./ProductCard";

export const DEFAULT_FILTERS: Filters = {
  type: "all",
  maxPrice: 35000,
  minRange: 0,
  sort: "default",
};

export default function CatalogueClient({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.type !== "all") params.set("type", filters.type);
    params.set("maxPrice", String(filters.maxPrice));
    if (filters.minRange > 0) params.set("minRange", String(filters.minRange));
    if (filters.sort !== "default") params.set("sort", filters.sort);

    const controller = new AbortController();
    setLoading(true);
    fetch(`/api/products?${params.toString()}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { products: Product[] }) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setLoading(false);
      });
    return () => controller.abort();
  }, [filters]);

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      <FilterSidebar dict={dict} filters={filters} onChange={setFilters} />
      <div>
        <p className="mb-4 text-sm text-zinc-400">
          {loading ? "…" : `${products.length} ${dict.catalogue.results}`}
        </p>
        {!loading && products.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center text-zinc-400">
            {dict.catalogue.noResults}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
                dict={dict}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
