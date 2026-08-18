"use client";

import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n/config";
import { productName, productSubtitle } from "@/lib/format";
import { Product } from "@/lib/types";
import { useCompareStore } from "@/store/compare";
import { useRegionStore } from "@/store/region";
import { Battery, Zap, Gauge, Check, Plus, Star, Sparkles, Lock } from "lucide-react";

export default function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
  dict?: unknown;
}) {
  const { toggleProduct, hasProduct } = useCompareStore();
  const { formatPrice, formatDistance, formatSpeed, formatDeposit, getLicenseLabel, getConfig } = useRegionStore();
  const isCompared = hasProduct(product.id);
  const isFr = locale === "fr";

  const config = getConfig();
  const licenseInfo = getLicenseLabel(product.license_category, locale);
  const netPrice = product.eco_bonus_eligible && product.max_eco_bonus
    ? product.prix - product.max_eco_bonus
    : product.prix;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-sm transition duration-300 hover:border-lime-400/60 hover:bg-zinc-900/90 hover:shadow-glow-lime">
      {/* Visual Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
        <Link href={`/${locale}/product/${product.id}`} className="block h-full w-full">
          <Image
            src={product.image_url}
            alt={productName(product, locale)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-108"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 pointer-events-none">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border ${licenseInfo.bg}`}>
            {licenseInfo.code}
          </span>

          {product.eco_bonus_eligible && (
            <span className="inline-flex items-center gap-1 rounded-full bg-lime-400/90 px-2.5 py-0.5 text-[10px] font-bold text-zinc-950 backdrop-blur-md">
              <Sparkles className="h-3 w-3" />
              {config.code === "US" ? "Tax Credit" : config.code === "CA" ? "iZEV Rebate" : (isFr ? "Bonus Éco" : "Eco-Grant")}
            </span>
          )}
        </div>

        {/* Compare Checkbox Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleProduct(product.id);
          }}
          className={`absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-md transition ${
            isCompared
              ? "bg-lime-400 text-zinc-950 font-bold shadow-glow-lime"
              : "bg-zinc-950/80 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-700/80"
          }`}
          title={isFr ? "Ajouter au comparatif technique" : "Add to comparison bench"}
        >
          {isCompared ? (
            <>
              <Check className="h-3.5 w-3.5 stroke-[3]" />
              <span>{isFr ? "Comparé" : "Compared"}</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              <span>{isFr ? "Comparer" : "Compare"}</span>
            </>
          )}
        </button>

        {/* Transparent Connected Logistics Status */}
        {product.stock_status === "in_showroom" || product.stock > 10 ? (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-bold text-zinc-950 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 animate-pulse" />
            {isFr ? "En Stock Showroom (48h)" : "Showroom Stock (48h)"}
          </span>
        ) : product.stock_status === "in_transit" || product.stock > 0 ? (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-400/90 border border-amber-300/30 px-2.5 py-0.5 text-[10px] font-bold text-zinc-950 backdrop-blur-md">
            {isFr ? "Arrivage Hub (7-10j)" : "In Transit Hub (7-10d)"}
          </span>
        ) : (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-cyan-400/90 border border-cyan-300/30 px-2.5 py-0.5 text-[10px] font-bold text-zinc-950 backdrop-blur-md">
            {isFr ? "Sur Commande Usine" : "Factory Order"}
          </span>
        )}
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div>
          {/* Brand and category subtitle */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span className="font-semibold text-lime-400 uppercase tracking-wider">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="h-3 w-3 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-500">({product.review_count})</span>
            </div>
          </div>

          <Link href={`/${locale}/product/${product.id}`} className="block">
            <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-lime-400 transition line-clamp-1">
              {productName(product, locale)}
            </h3>
          </Link>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-1">
            {productSubtitle(product, locale)}
          </p>

          {/* Quick Technical Highlights */}
          <div className="mt-3.5 grid grid-cols-3 gap-2 rounded-2xl bg-zinc-950/60 p-2.5 text-center text-xs border border-zinc-800/80">
            <div>
              <span className="text-[10px] text-zinc-500 flex items-center justify-center gap-0.5">
                <Battery className="h-3 w-3 text-lime-400" /> {isFr ? "Autonomie" : "Range"}
              </span>
              <p className="font-bold text-white mt-0.5">{formatDistance(product.autonomie_km)}</p>
            </div>

            <div className="border-x border-zinc-800">
              <span className="text-[10px] text-zinc-500 flex items-center justify-center gap-0.5">
                <Gauge className="h-3 w-3 text-cyan-400" /> {isFr ? "Vitesse" : "Speed"}
              </span>
              <p className="font-bold text-white mt-0.5">{formatSpeed(product.vitesse_max)}</p>
            </div>

            <div>
              <span className="text-[10px] text-zinc-500 flex items-center justify-center gap-0.5">
                <Zap className="h-3 w-3 text-amber-400" /> {isFr ? "Couple" : "Torque"}
              </span>
              <p className="font-bold text-white mt-0.5">{product.motor_specs?.torque_nm || 85} Nm</p>
            </div>
          </div>
        </div>

        {/* Pricing, Deposit & CTA Button */}
        <div className="border-t border-zinc-800/80 pt-3">
          <div className="flex items-end justify-between">
            <div>
              {product.eco_bonus_eligible && product.max_eco_bonus ? (
                <div>
                  <span className="text-[10px] text-zinc-400 line-through">
                    {formatPrice(product.prix)}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-lime-400">
                      {formatPrice(netPrice)}
                    </span>
                    <span className="text-[10px] text-lime-400/80 font-bold">
                      {config.code === "US" ? "Tax Credit Incl." : config.code === "CA" ? "iZEV Incl." : (isFr ? "Aide déduite" : "Grant deducted")}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-lg font-black text-white">
                  {formatPrice(product.prix)}
                </span>
              )}
            </div>

            <Link
              href={`/${locale}/product/${product.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-lime-400 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-lime-300 transition shadow-sm"
            >
              <Lock className="h-3 w-3" />
              <span>{isFr ? "Acompte" : "Reserve"} {formatDeposit()}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
