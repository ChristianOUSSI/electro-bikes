"use client";

import { useState } from "react";
import { Locale } from "@/i18n/config";
import { Dictionary } from "@/i18n/dictionaries";
import SlideOutCart from "./SlideOutCart";

interface CartProviderProps {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}

export function CartProvider({ locale, dict, children }: CartProviderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      {children}
      <SlideOutCart
        locale={locale}
        dict={dict}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}

export function useCartOpen() {
  // This is a placeholder - in a real app, you'd use context
  // For now, components will handle cart opening locally
  return () => {};
}