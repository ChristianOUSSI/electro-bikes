"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Locale } from "@/i18n/config";
import { Dictionary } from "@/i18n/dictionaries";
import { productName, productSubtitle } from "@/lib/format";
import { getProduct } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { useRegionStore } from "@/store/region";
import { Sparkles, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Lock, Zap } from "lucide-react";

export default function CartClient({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { items, removeItem, setQuantity, clear } = useCartStore();
  const { formatPrice, formatDeposit, getConfig } = useRegionStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const t = dict.cart;
  const isFr = locale === "fr";
  const config = getConfig();
  const depositStr = formatDeposit();

  if (!mounted) return <div className="mt-8 text-zinc-500">{isFr ? "Chargement du panier..." : "Loading cart..."}</div>;

  const lines = items
    .map((item) => ({ item, product: getProduct(item.productId) }))
    .filter(
      (l): l is { item: (typeof items)[number]; product: NonNullable<ReturnType<typeof getProduct>> } =>
        l.product !== undefined
    );

  if (lines.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-16 text-center backdrop-blur-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 mb-4">
          🛒
        </div>
        <p className="text-lg font-bold text-white">{t.empty}</p>
        <p className="text-sm text-zinc-400 mt-1 max-w-md mx-auto">
          {isFr
            ? "Explorez notre sélection certifiée de motos et vélos électriques d'exception."
            : "Explore our certified selection of high-performance electric bikes and motorcycles."}
        </p>
        <Link
          href={`/${locale}/catalogue`}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-lime-400 px-8 py-3 text-sm font-bold text-zinc-950 transition hover:bg-lime-300 shadow-glow-lime"
        >
          <span>{t.browse}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const sousTotal = lines.reduce(
    (sum, { item, product }) => sum + (product.prix + (item.optionCost || 0)) * item.quantite,
    0
  );

  const totalBonus = lines.reduce(
    (sum, { item, product }) =>
      sum + (product.eco_bonus_eligible && product.max_eco_bonus ? product.max_eco_bonus : 0) * item.quantite,
    0
  );

  const livraison = 0; // Offerte / Free
  const total = Math.max(0, sousTotal - totalBonus + livraison);

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-4">
        {lines.map(({ item, product }) => {
          const itemPrice = product.prix + (item.optionCost || 0);

          return (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-md"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-zinc-950">
                <Image
                  src={product.image_url}
                  alt={productName(product, locale)}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-lime-400">
                      {product.brand}
                    </span>
                    <h3 className="font-bold text-white text-base">
                      {productName(product, locale)}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="p-1 text-zinc-500 hover:text-red-400 transition"
                    title={isFr ? "Supprimer du panier" : "Remove item"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs text-zinc-400">{productSubtitle(product, locale)}</p>

                {item.selectedOptions && item.selectedOptions.length > 0 && (
                  <p className="text-[11px] text-zinc-500">
                    {isFr ? `Options incluses (${item.selectedOptions.length}) : ` : `Included options (${item.selectedOptions.length}): `}
                    +{formatPrice(item.optionCost || 0)}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-2 py-1">
                    <button
                      type="button"
                      onClick={() =>
                        item.quantite > 1
                          ? setQuantity(item.productId, item.quantite - 1)
                          : removeItem(item.productId)
                      }
                      className="p-1 text-zinc-400 hover:text-white transition"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-6 text-center text-xs font-bold text-white">
                      {item.quantite}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(
                          item.productId,
                          Math.min(product.stock, item.quantite + 1)
                        )
                      }
                      className="p-1 text-zinc-400 hover:text-white transition"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-black text-lime-400">
                      {formatPrice(itemPrice * item.quantite)}
                    </p>
                    {product.eco_bonus_eligible && (
                      <p className="text-[11px] text-zinc-400">
                        {config.code === "US"
                          ? "Federal EV Credit :"
                          : config.code === "CA"
                          ? "iZEV Rebate :"
                          : isFr
                          ? "Bonus Déduit :"
                          : "Clean Rebate Deducted:"}{" "}
                        {formatPrice((product.max_eco_bonus || 0) * item.quantite)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={clear}
            className="text-xs text-zinc-500 hover:text-red-400 transition"
          >
            {t.clear}
          </button>
          <Link
            href={`/${locale}/catalogue`}
            className="text-xs text-lime-400 hover:underline"
          >
            {isFr ? "← Continuer mes achats" : "← Continue shopping"}
          </Link>
        </div>
      </div>

      {/* Summary Box */}
      <aside className="h-fit space-y-5 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-xl lg:sticky lg:top-24">
        <h2 className="font-bold text-white text-lg border-b border-zinc-800 pb-3">
          {t.summary}
        </h2>

        <dl className="space-y-2.5 text-xs sm:text-sm">
          <div className="flex justify-between text-zinc-400">
            <dt>{t.subtotal}</dt>
            <dd className="font-semibold text-white">{formatPrice(sousTotal)}</dd>
          </div>

          {totalBonus > 0 && (
            <div className="flex justify-between text-lime-400 font-semibold">
              <dt className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {config.code === "US"
                    ? "Federal EV Tax Credit"
                    : config.code === "CA"
                    ? "iZEV Federal Incentive"
                    : isFr
                    ? "Bonus Écologique ASP"
                    : "State Clean Subsidy"}
                </span>
              </dt>
              <dd>- {formatPrice(totalBonus)}</dd>
            </div>
          )}

          <div className="flex justify-between text-zinc-400">
            <dt>{t.shipping}</dt>
            <dd className="font-semibold text-emerald-400">
              {livraison === 0
                ? isFr
                  ? "Offerte (Transporteur Spécialisé 2-Roues)"
                  : "Free (Specialized 2-Wheeler Lift-Gate Carrier)"
                : formatPrice(livraison)}
            </dd>
          </div>

          <div className="flex justify-between border-t border-zinc-800 pt-3 text-lg font-black">
            <dt className="text-white">{t.grandTotal}</dt>
            <dd className="text-lime-400">{formatPrice(total)}</dd>
          </div>
        </dl>

        {/* Deposit Highlight Box */}
        <div className="rounded-2xl border border-lime-400/40 bg-lime-950/20 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <span className="flex items-center gap-1 text-lime-400">
              <Zap className="h-4 w-4" />
              {isFr ? "Acompte Recommandé" : "Recommended Deposit"}
            </span>
            <span className="text-base font-black text-lime-400">{depositStr}</span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-relaxed">
            {isFr
              ? `Bloque l'affectation de votre numéro de châssis VIN et déclenche la préparation PDI 50 points en atelier. Solde (${formatPrice(
                  Math.max(0, total - 500)
                )}) réglé après inspection à la livraison ou LOA.`
              : `Locks your VIN chassis allocation and starts the 50-point PDI workshop protocol. Balance (${formatPrice(
                  Math.max(0, total - 500)
                )}) paid upon delivery inspection or 0% financing.`}
          </p>
        </div>

        <Link
          href={`/${locale}/checkout`}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-lime-400 py-4 text-center text-sm font-bold text-zinc-950 transition hover:bg-lime-300 shadow-glow-lime hover:scale-[1.01]"
        >
          <Lock className="h-4 w-4" />
          <span>{isFr ? `Réserver avec Acompte ${depositStr}` : `Reserve with Deposit ${depositStr}`}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

        <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 pt-1">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>{isFr ? "Acompte 100% Remboursable sous 14 jours" : "100% Refundable Deposit within 14 Days"}</span>
        </div>
      </aside>
    </div>
  );
}
