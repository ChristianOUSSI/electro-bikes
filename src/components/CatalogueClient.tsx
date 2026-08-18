"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Locale } from "@/i18n/config";
import { Dictionary } from "@/i18n/dictionaries";
import { Product } from "@/lib/types";
import FilterSidebar, { Filters } from "./FilterSidebar";
import ProductCard from "./ProductCard";
import CompareDrawer from "./CompareDrawer";
import { Search, SlidersHorizontal, Zap } from "lucide-react";

export const DEFAULT_FILTERS: Filters = {
  type: "all",
  license: "all",
  maxPrice: 35000,
  minRange: 0,
  minSpeed: 0,
  motorPower: "all",
  removableBattery: false,
  ecoBonus: false,
  sort: "default",
};

export default function CatalogueClient({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const searchParams = useSearchParams();
  const initialType = searchParams?.get("type") || "all";
  const initialLicense = searchParams?.get("license") || "all";
  const initialSearch = searchParams?.get("search") || "";

  const [filters, setFilters] = useState<Filters>({
    ...DEFAULT_FILTERS,
    type: initialType,
    license: initialLicense,
  });

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.type !== "all") params.set("type", filters.type);
    if (filters.license !== "all") params.set("license", filters.license);
    params.set("maxPrice", String(filters.maxPrice));
    if (filters.minRange > 0) params.set("minRange", String(filters.minRange));
    if (filters.minSpeed > 0) params.set("minSpeed", String(filters.minSpeed));
    if (filters.motorPower !== "all") params.set("motorPower", filters.motorPower);
    if (filters.removableBattery) params.set("removableBattery", "true");
    if (filters.ecoBonus) params.set("ecoBonus", "true");
    if (filters.sort !== "default") params.set("sort", filters.sort);
    if (searchQuery.trim()) params.set("search", searchQuery.trim());

    const controller = new AbortController();
    setLoading(true);
    fetch(`/api/products?${params.toString()}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { products: Product[] }) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setLoading(false);
      });
    return () => controller.abort();
  }, [filters, searchQuery]);

  return (
    <div className="mt-8">
      {/* Search & Top Action Bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur-md">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-lime-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.nav.searchPlaceholder}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-lime-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-xs font-semibold text-white lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 text-lime-400" />
            <span>{dict.catalogue.filters}</span>
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
        {/* Sidebar Desktop */}
        <div className="hidden lg:block">
          <FilterSidebar dict={dict} filters={filters} onChange={setFilters} />
        </div>

        {/* Sidebar Mobile Modal/Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-md p-4 lg:hidden">
            <div className="w-full max-h-[85vh] overflow-y-auto rounded-3xl border border-zinc-700 bg-zinc-950 p-5 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Filtres de recherche</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="rounded-full bg-zinc-800 p-1.5 text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <FilterSidebar dict={dict} filters={filters} onChange={setFilters} />
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="mt-4 w-full rounded-xl bg-lime-400 py-3 text-sm font-bold text-zinc-950 shadow-glow-lime"
              >
                Appliquer les filtres
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div>
          <div className="mb-4 flex items-center justify-between text-xs text-zinc-400">
            <p>
              {loading ? (
                <span>Recherche en cours...</span>
              ) : (
                <span className="font-semibold text-white">
                  {products.length} {dict.catalogue.results}
                </span>
              )}
            </p>
          </div>

          {!loading && products.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-16 text-center text-zinc-400 backdrop-blur-md">
              <Zap className="mx-auto h-12 w-12 text-zinc-700 mb-3" />
              <p className="text-base font-semibold text-white">{dict.catalogue.noResults}</p>
              <button
                onClick={() => {
                  setFilters(DEFAULT_FILTERS);
                  setSearchQuery("");
                }}
                className="mt-4 rounded-xl bg-lime-400 px-6 py-2 text-xs font-bold text-zinc-950 hover:bg-lime-300 transition"
              >
                {dict.catalogue.reset}
              </button>
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

      {/* Persistent Compare Drawer */}
      <CompareDrawer dict={dict} locale={locale} />
    </div>
  );
}
