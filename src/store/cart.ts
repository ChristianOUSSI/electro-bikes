"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  productId: string;
  quantite: number;
  selectedOptions?: string[]; // IDs of options
  optionCost?: number;
}

interface CartState {
  items: CartLine[];
  addItem: (productId: string, quantite?: number, selectedOptions?: string[], optionCost?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantite: number) => void;
  clear: () => void;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId, quantite = 1, selectedOptions = [], optionCost = 0) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) =>
              i.productId === productId &&
              JSON.stringify(i.selectedOptions || []) === JSON.stringify(selectedOptions)
          );
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantite += quantite;
            return { items: updated };
          }
          return { items: [...state.items, { productId, quantite, selectedOptions, optionCost }] };
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
