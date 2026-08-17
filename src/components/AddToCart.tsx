"use client";

import { useState } from "react";
import { Dictionary } from "@/i18n/dictionaries";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart";

export default function AddToCart({
  product,
  dict,
}: {
  product: Product;
  dict: Dictionary;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (product.stock === 0) {
    return (
      <button
        type="button"
        disabled
        className="w-full cursor-not-allowed rounded-full bg-zinc-800 px-8 py-3 font-semibold text-zinc-500"
      >
        {dict.product.outOfStock}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex items-center rounded-full border border-zinc-700">
        <button
          type="button"
          aria-label="-"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-4 py-3 text-zinc-300 transition hover:text-white"
        >
          −
        </button>
        <span className="min-w-8 text-center font-semibold text-white">
          {quantity}
        </span>
        <button
          type="button"
          aria-label="+"
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          className="px-4 py-3 text-zinc-300 transition hover:text-white"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          addItem(product.id, quantity);
          setAdded(true);
          setTimeout(() => setAdded(false), 1500);
        }}
        className={`flex-1 rounded-full px-8 py-3 font-semibold transition ${
          added
            ? "bg-emerald-400 text-zinc-950"
            : "bg-lime-400 text-zinc-950 hover:bg-lime-300"
        }`}
      >
        {added ? `✓ ${dict.product.added}` : dict.product.addToCart}
      </button>
    </div>
  );
}
