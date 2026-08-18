"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Trash2, Plus, Minus, ChevronRight, Sparkles, Lock } from "lucide-react";
import { Locale } from "@/i18n/config";
import { Dictionary } from "@/i18n/dictionaries";
import { productName, productSubtitle } from "@/lib/format";
import { getProduct } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import { useRegionStore } from "@/store/region";

interface SlideOutCartProps {
  locale: Locale;
  dict: Dictionary;
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideOutCart({ locale, dict, isOpen, onClose }: SlideOutCartProps) {
  const { items, removeItem, setQuantity } = useCartStore();
  const { formatPrice, formatDeposit, getConfig } = useRegionStore();
  const [mounted, setMounted] = useState(false);
  const isFr = locale === "fr";
  const config = getConfig();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const t = dict.cart;

  const lines = items
    .map((item) => ({ item, product: getProduct(item.productId) }))
    .filter(
      (l): l is { item: (typeof items)[number]; product: NonNullable<ReturnType<typeof getProduct>> } =>
        l.product !== undefined
    );

  const sousTotal = lines.reduce(
    (sum, { item, product }) => sum + (product.prix + (item.optionCost || 0)) * item.quantite,
    0
  );

  const totalBonus = lines.reduce(
    (sum, { item, product }) =>
      sum + (product.eco_bonus_eligible ? (product.max_eco_bonus || 0) * item.quantite : 0),
    0
  );

  const total = Math.max(0, sousTotal - totalBonus);
  const monthlyFinancing = Math.round((total / 48) * 100) / 100;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-zinc-950 shadow-2xl transition-transform duration-300 ease-in-out border-l border-zinc-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-lime-400/10 p-2 text-lime-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">{t.title}</h2>
                <p className="text-xs text-zinc-400">
                  {lines.length} {isFr ? "machine(s) dans votre garage" : "machine(s) in your garage"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
              aria-label={isFr ? "Fermer" : "Close"}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {lines.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-zinc-600 text-2xl">
                  ⚡
                </div>
                <p className="text-sm font-semibold text-zinc-300">
                  {isFr ? "Votre garage est désespérément vide." : "Your garage is dead empty."}
                </p>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  {isFr ? "Explorez nos motos et vélos d'exception prêts à être domptés." : "Explore high-performance electric machines ready to ride."}
                </p>
                <Link
                  href={`/${locale}/catalogue`}
                  onClick={onClose}
                  className="mt-4 inline-block rounded-xl bg-lime-400 px-6 py-2.5 text-xs font-bold text-zinc-950 hover:bg-lime-300 transition shadow-glow-lime"
                >
                  {isFr ? "Découvrir les Machines" : "Explore the Fleet"}
                </Link>
              </div>
            ) : (
              lines.map(({ item, product }) => {
                const itemPrice = product.prix + (item.optionCost || 0);

                return (
                  <div
                    key={item.productId}
                    className="flex gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-950">
                      <Image
                        src={product.image_url}
                        alt={productName(product, locale)}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-bold text-white line-clamp-1">
                          {productName(product, locale)}
                        </h4>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-1 text-zinc-500 hover:text-red-400 transition"
                          aria-label={isFr ? "Supprimer" : "Remove"}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-zinc-400 line-clamp-1">
                        {productSubtitle(product, locale)}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-950 px-2 py-0.5">
                          <button
                            onClick={() =>
                              item.quantite > 1
                                ? setQuantity(item.productId, item.quantite - 1)
                                : removeItem(item.productId)
                            }
                            className="p-0.5 text-zinc-400 hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-4 text-center text-xs font-bold text-white">
                            {item.quantite}
                          </span>
                          <button
                            onClick={() =>
                              setQuantity(
                                item.productId,
                                Math.min(product.stock, item.quantite + 1)
                              )
                            }
                            className="p-0.5 text-zinc-400 hover:text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="text-sm font-black text-lime-400">
                          {formatPrice(itemPrice * item.quantite)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {lines.length > 0 && (
            <div className="border-t border-zinc-800 bg-zinc-900/90 px-6 py-5 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>{t.subtotal}</span>
                  <span className="font-semibold text-white">{formatPrice(sousTotal)}</span>
                </div>

                {totalBonus > 0 && (
                  <div className="flex justify-between text-lime-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      {config.code === "US" ? "Federal EV Tax Credit" : config.code === "CA" ? "iZEV Rebate" : "Bonus Écologique ASP"}
                    </span>
                    <span>- {formatPrice(totalBonus)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>{t.shipping}</span>
                  <span className="font-semibold text-emerald-400">
                    {isFr ? "Offerte (Camion Dédié 2-Roues)" : "Free (Specialized 2-Wheel Carrier)"}
                  </span>
                </div>

                <div className="flex justify-between border-t border-zinc-800 pt-2 text-base font-extrabold">
                  <span className="text-white">{t.grandTotal}</span>
                  <span className="text-lime-400">{formatPrice(total)}</span>
                </div>

                <div className="text-[11px] text-zinc-400 text-center bg-zinc-950/60 p-2 rounded-lg border border-zinc-800">
                  <span>{isFr ? "Financement estimé dès" : "Financing estimate from"} </span>
                  <span className="font-bold text-white">{formatPrice(monthlyFinancing)}</span>
                  <span> / {isFr ? "mois" : "mo"}</span>
                </div>
              </div>

              <Link
                href={`/${locale}/checkout`}
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 py-3.5 text-sm font-bold text-zinc-950 hover:bg-lime-300 transition shadow-glow-lime"
              >
                <Lock className="h-4 w-4" />
                <span>{isFr ? `Réserver avec Acompte (${formatDeposit()})` : `Reserve with Deposit (${formatDeposit()})`}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}