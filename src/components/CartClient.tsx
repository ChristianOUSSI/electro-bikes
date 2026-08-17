"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Locale } from "@/i18n/config";
import { Dictionary } from "@/i18n/dictionaries";
import { computeTotals, formatPrice, productName } from "@/lib/format";
import { getProduct } from "@/lib/products";
import { useCartStore } from "@/store/cart";

export default function CartClient({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { items, removeItem, setQuantity, clear } = useCartStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const t = dict.cart;

  if (!mounted) return <div className="mt-8 text-zinc-500">…</div>;

  const lines = items
    .map((item) => ({ item, product: getProduct(item.productId) }))
    .filter(
      (l): l is { item: (typeof items)[number]; product: NonNullable<ReturnType<typeof getProduct>> } =>
        l.product !== undefined
    );

  if (lines.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">
        <p className="text-zinc-400">{t.empty}</p>
        <Link
          href={`/${locale}/catalogue`}
          className="mt-6 inline-block rounded-full bg-lime-400 px-6 py-2.5 font-semibold text-zinc-950 transition hover:bg-lime-300"
        >
          {t.browse}
        </Link>
      </div>
    );
  }

  const sousTotal = lines.reduce(
    (sum, { item, product }) => sum + product.prix * item.quantite,
    0
  );
  const { livraison, tva, total } = computeTotals(sousTotal);

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {lines.map(({ item, product }) => (
          <div
            key={item.productId}
            className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <Link
              href={`/${locale}/product/${product.id}`}
              className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl"
            >
              <Image
                src={product.image_url}
                alt={productName(product, locale)}
                fill
                sizes="128px"
                className="object-cover"
              />
            </Link>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link
                    href={`/${locale}/product/${product.id}`}
                    className="font-semibold text-white hover:text-lime-400"
                  >
                    {productName(product, locale)}
                  </Link>
                  <p className="mt-0.5 text-sm text-zinc-400">
                    {formatPrice(product.prix, locale)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="text-sm text-zinc-500 transition hover:text-red-400"
                >
                  {t.remove}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center rounded-full border border-zinc-700 text-sm">
                  <button
                    type="button"
                    aria-label="-"
                    onClick={() =>
                      setQuantity(item.productId, item.quantite - 1)
                    }
                    className="px-3 py-1.5 text-zinc-300 hover:text-white"
                  >
                    −
                  </button>
                  <span className="min-w-6 text-center font-semibold text-white">
                    {item.quantite}
                  </span>
                  <button
                    type="button"
                    aria-label="+"
                    onClick={() =>
                      setQuantity(
                        item.productId,
                        Math.min(product.stock, item.quantite + 1)
                      )
                    }
                    className="px-3 py-1.5 text-zinc-300 hover:text-white"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold text-lime-400">
                  {formatPrice(product.prix * item.quantite, locale)}
                </p>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={clear}
          className="text-sm text-zinc-500 transition hover:text-red-400"
        >
          {t.clear}
        </button>
      </div>

      <aside className="h-fit space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 lg:sticky lg:top-20">
        <h2 className="font-semibold text-white">{t.summary}</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between text-zinc-400">
            <dt>{t.subtotal}</dt>
            <dd className="text-zinc-100">{formatPrice(sousTotal, locale)}</dd>
          </div>
          <div className="flex justify-between text-zinc-400">
            <dt>{t.shipping}</dt>
            <dd className="text-zinc-100">
              {livraison === 0 ? t.freeShipping : formatPrice(livraison, locale)}
            </dd>
          </div>
          <div className="flex justify-between text-zinc-400">
            <dt>{t.vat}</dt>
            <dd className="text-zinc-100">{formatPrice(tva, locale)}</dd>
          </div>
          <div className="flex justify-between border-t border-zinc-800 pt-2 text-base font-bold">
            <dt className="text-white">{t.grandTotal}</dt>
            <dd className="text-lime-400">{formatPrice(total, locale)}</dd>
          </div>
        </dl>
        <Link
          href={`/${locale}/checkout`}
          className="block rounded-full bg-lime-400 px-6 py-3 text-center font-semibold text-zinc-950 transition hover:bg-lime-300"
        >
          {t.checkout}
        </Link>
      </aside>
    </div>
  );
}
