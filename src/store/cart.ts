"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  productId: string;
  quantite: number;
}

interface CartState {
  items: CartLine[];
  addItem: (productId: string, quantite?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantite: number) => void;
  clear: () => void;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId, quantite = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === productId
                  ? { ...i, quantite: i.quantite + quantite }
                  : i
              ),
            };
          }
          return { items: [...state.items, { productId, quantite }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      setQuantity: (productId, quantite) =>
        set((state) => ({
          items:
            quantite <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) =>
                  i.productId === productId ? { ...i, quantite } : i
                ),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((sum, i) => sum + i.quantite, 0),
    }),
    { name: "evolt-cart" }
  )
);
