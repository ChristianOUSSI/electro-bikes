"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Locale } from "@/i18n/config";
import { useCartStore } from "@/store/cart";

export default function CartBadge({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = mounted ? items.reduce((sum, i) => sum + i.quantite, 0) : 0;

  return (
    <Link
      href={`/${locale}/cart`}
      className="relative flex items-center gap-1.5 text-sm text-zinc-300 transition hover:text-white"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      <span className="hidden sm:block">{label}</span>
      {count > 0 && (
        <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-xs font-bold text-zinc-950">
          {count}
        </span>
      )}
    </Link>
  );
}
