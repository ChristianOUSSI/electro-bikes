"use client";

import { useState } from "react";
import Image from "next/image";
import { useCompareStore } from "@/store/compare";
import { useRegionStore } from "@/store/region";
import { products } from "@/lib/products";
import { Dictionary } from "@/i18n/dictionaries";
import { productName } from "@/lib/format";
import { Zap, X, ArrowRight } from "lucide-react";
import CompareModal from "./CompareModal";

export default function CompareDrawer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  const { productIds, removeProduct, clear } = useCompareStore();
  const { formatPrice } = useRegionStore();
  const [modalOpen, setModalOpen] = useState(false);
  const isFr = locale === "fr";

  if (productIds.length === 0) return null;

  const comparedProducts = products.filter((p) => productIds.includes(p.id));
  const t = dict.compare;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 w-[95%] max-w-4xl rounded-2xl border border-lime-400/40 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* List of items */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-lime-400 pr-2 border-r border-zinc-800 shrink-0">
              <Zap className="h-4 w-4" />
              <span>{isFr ? `Comparateur (${productIds.length}/4)` : `Comparator (${productIds.length}/4)`}</span>
            </div>

            <div className="flex items-center gap-2.5">
              {comparedProducts.map((p) => (
                <div
                  key={p.id}
                  className="relative flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 shrink-0"
                >
                  <div className="relative h-8 w-10 overflow-hidden rounded">
                    <Image
                      src={p.image_url}
                      alt={productName(p, locale)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white line-clamp-1 max-w-[110px]">
                      {productName(p, locale)}
                    </p>
                    <p className="text-[11px] font-bold text-lime-400">
                      {formatPrice(p.prix)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeProduct(p.id)}
                    className="ml-1 text-zinc-400 hover:text-red-400 transition"
                    title={isFr ? "Retirer" : "Remove"}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={clear}
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
            >
              {t.clearAll}
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-lime-400 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-lime-300 transition shadow-glow-lime"
            >
              <span>{t.viewMatrix}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <CompareModal
        productIds={productIds}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onRemove={removeProduct}
        dict={dict}
        locale={locale}
      />
    </>
  );
}
