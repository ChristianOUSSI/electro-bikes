"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareState {
  productIds: string[];
  addProduct: (productId: string) => boolean; // returns true if added, false if max reached
  removeProduct: (productId: string) => void;
  toggleProduct: (productId: string) => void;
  clear: () => void;
  hasProduct: (productId: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      productIds: [],
      addProduct: (productId) => {
        const { productIds } = get();
        if (productIds.includes(productId)) return true;
        if (productIds.length >= 4) return false;
        set({ productIds: [...productIds, productId] });
        return true;
      },
      removeProduct: (productId) =>
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
        })),
      toggleProduct: (productId) => {
        const { productIds, addProduct, removeProduct } = get();
        if (productIds.includes(productId)) {
          removeProduct(productId);
        } else {
          addProduct(productId);
        }
      },
      clear: () => set({ productIds: [] }),
      hasProduct: (productId) => get().productIds.includes(productId),
    }),
    { name: "evolt-compare" }
  )
);
