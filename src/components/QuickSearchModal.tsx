"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { Dictionary } from "@/i18n/dictionaries";
import { productName } from "@/lib/format";
import { useRegionStore } from "@/store/region";
import { Search, X, ArrowRight } from "lucide-react";

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict: Dictionary;
  locale: string;
}

export default function QuickSearchModal({
  isOpen,
  onClose,
  locale,
}: QuickSearchModalProps) {
  const [query, setQuery] = useState("");
  const { formatPrice, formatDistance } = useRegionStore();
  const isFr = locale === "fr";

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products.slice(0, 6);
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.nom.toLowerCase().includes(q) ||
        p.nom_en.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.license_category.toLowerCase().includes(q) ||
        p.license_label_fr.toLowerCase().includes(q) ||
        p.license_label_en.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 pt-20 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl border border-zinc-700 bg-zinc-950 p-6 shadow-2xl">
        {/* Search input bar */}
        <div className="relative flex items-center border-b border-zinc-800 pb-4">
          <Search className="h-5 w-5 text-lime-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isFr ? "Chercher une monture, une marque, un permis (125, A2, VTT, 72V)..." : "Search weapons, brands, license (125, Class M, e-Bike, 72V)..."}
            className="w-full bg-transparent text-base sm:text-lg text-white placeholder-zinc-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-full bg-zinc-800 p-1.5 text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="mt-4 max-h-96 overflow-y-auto space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 px-2">
            {query.trim()
              ? isFr ? `Résultats (${filteredProducts.length})` : `Search Results (${filteredProducts.length})`
              : isFr ? "Montures Recommandées" : "Featured Machines"}
          </p>

          {filteredProducts.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-400">
              {isFr ? `Aucun résultat pour "${query}".` : `No machines found matching "${query}".`}
            </p>
          ) : (
            filteredProducts.map((p) => (
              <Link
                key={p.id}
                href={`/${locale}/product/${p.id}`}
                onClick={onClose}
                className="group flex items-center justify-between rounded-2xl p-3 hover:bg-zinc-900 transition"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative h-12 w-16 overflow-hidden rounded-xl bg-zinc-900 shrink-0">
                    <Image
                      src={p.image_url}
                      alt={productName(p, locale)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-lime-400 tracking-wider">
                      {p.brand}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-lime-400 transition">
                      {productName(p, locale)}
                    </h4>
                    <p className="text-xs text-zinc-400">{isFr ? p.license_label_fr : p.license_label_en}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <span className="text-sm font-extrabold text-white">
                      {formatPrice(p.prix)}
                    </span>
                    <p className="text-[10px] text-zinc-500">{formatDistance(p.autonomie_km)} {isFr ? "d'autonomie" : "range"}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-lime-400 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-3 text-[11px] text-zinc-500">
          <span>{isFr ? "Appuyez sur" : "Press"} <kbd className="rounded bg-zinc-800 px-1 py-0.5 font-mono">ESC</kbd> {isFr ? "pour fermer" : "to close"}</span>
          <span>eVolt Instant Spotlight</span>
        </div>
      </div>
    </div>
  );
}
