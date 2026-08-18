"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";

export default function CartBadge() {
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = mounted ? items.reduce((sum, i) => sum + i.quantite, 0) : 0;

  if (!mounted || count === 0) return null;

  return (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-xs font-bold text-zinc-950">
      {count}
    </span>
  );
}