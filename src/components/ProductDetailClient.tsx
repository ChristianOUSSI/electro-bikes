"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Dictionary } from "@/i18n/dictionaries";
import { productName, productSubtitle, productDeliveryLabel } from "@/lib/format";
import { useRegionStore } from "@/store/region";
import ProductGallery from "@/components/ProductGallery";
import AddToCart from "@/components/AddToCart";
import ProductTabs from "@/components/ProductTabs";
import ProductConfigurator from "@/components/ProductConfigurator";
import TestRideModal from "@/components/TestRideModal";
import CompareDrawer from "@/components/CompareDrawer";
import { useCompareStore } from "@/store/compare";
import {
  Battery,
  Zap,
  Gauge,
  Weight,
  Sparkles,
  Calendar,
  Plus,
  Check,
  Star,
  Building2,
} from "lucide-react";

export default function ProductDetailClient({
  product,
  dict,
  locale,
}: {
  product: Product;
  dict: Dictionary;
  locale: string;
}) {
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [extraOptionCost, setExtraOptionCost] = useState<number>(0);
  const [testRideOpen, setTestRideOpen] = useState(false);

  const { toggleProduct, hasProduct } = useCompareStore();
  const {
    formatPrice,
    formatDistance,
    formatSpeed,
    formatWeight,
    getLicenseLabel,
    getConfig,
  } = useRegionStore();

  const isCompared = hasProduct(product.id);
  const isFr = locale === "fr";
  const t = dict.product;
  const config = getConfig();
  const licenseInfo = getLicenseLabel(product.license_category, locale);

  const effectivePrice = product.prix + extraOptionCost;
  const netPriceWithBonus = product.eco_bonus_eligible && product.max_eco_bonus
    ? effectivePrice - product.max_eco_bonus
    : effectivePrice;

  const monthlyEstimate = Math.round((netPriceWithBonus / 48) * 100) / 100;

  return (
    <div>
      {/* Top Breadcrumb & Compare Action */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-8">
        <Link
          href={`/${locale}/catalogue`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-lime-400 transition"
        >
          <span>← {t.backToCatalogue}</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/about`}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-lime-400 hover:text-lime-400 transition"
          >
            <Building2 className="h-3.5 w-3.5 text-lime-400" />
            <span>{isFr ? "Showroom Paris Grande Armée" : "Paris Flagship Showroom"}</span>
          </Link>

          <button
            type="button"
            onClick={() => toggleProduct(product.id)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              isCompared
                ? "bg-lime-400 text-zinc-950 font-bold shadow-glow-lime"
                : "bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white"
            }`}
          >
            {isCompared ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : <Plus className="h-3.5 w-3.5" />}
            <span>{isCompared ? (isFr ? "Dans le comparateur" : "In Comparator") : (isFr ? "Ajouter au comparateur" : "Add to Comparator")}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery & Product Info */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <ProductGallery
            images={product.images}
            alt={productName(product, locale)}
          />

          {/* Quick Trust Strip under Gallery */}
          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-center">
            <div>
              <p className="text-[11px] text-zinc-400">{isFr ? "Sécurité Cellules" : "Battery Safety"}</p>
              <p className="text-xs font-bold text-white mt-0.5">UN 38.3 & IP67</p>
            </div>
            <div className="border-x border-zinc-800">
              <p className="text-[11px] text-zinc-400">{isFr ? "Garantie Pack" : "Pack Warranty"}</p>
              <p className="text-xs font-bold text-emerald-400 mt-0.5">{isFr ? "5 Ans Sérénité" : "5-Year Coverage"}</p>
            </div>
            <div>
              <p className="text-[11px] text-zinc-400">{isFr ? "Contrôle PDI" : "PDI Inspection"}</p>
              <p className="text-xs font-bold text-cyan-400 mt-0.5">{isFr ? "50 Points Certifiés" : "50-Point Certified"}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Key Details, Price, Options & Purchase */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border ${licenseInfo.bg}`}>
                {licenseInfo.code} • {licenseInfo.label}
              </span>
              <span className="text-xs font-semibold text-lime-400 uppercase tracking-wider bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">
                {product.brand}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {productName(product, locale)}
            </h1>

            <p className="mt-2 text-sm text-zinc-300 font-medium">
              {productSubtitle(product, locale)}
            </p>

            {/* Reviews rating pill */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">{product.rating}</span>
              <span className="text-zinc-500">
                ({product.review_count || product.reviews.length} {isFr ? "avis AFNOR certifiés" : "certified reviews"})
              </span>
            </div>
          </div>

          {/* Pricing Box with Regional Incentives & Financing */}
          <div className="rounded-3xl border border-lime-400/30 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-lime-950/20 p-6 shadow-glow-lime space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs text-zinc-400">{config.taxNotice} :</p>
                <p className="text-3xl sm:text-4xl font-black text-white">
                  {formatPrice(effectivePrice)}
                </p>
              </div>

              {product.eco_bonus_eligible && product.max_eco_bonus > 0 && (
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-lime-400/20 px-2.5 py-0.5 text-[11px] font-bold text-lime-300">
                    <Sparkles className="h-3 w-3" />
                    {config.code === "US" ? "Tax Credit" : config.code === "CA" ? "iZEV Rebate" : (isFr ? "Bonus Éco" : "Eco-Grant")} - {formatPrice(product.max_eco_bonus)}
                  </span>
                  <p className="text-xs text-zinc-400 mt-1">{isFr ? "Soit net déduit :" : "Net after grant:"}</p>
                  <p className="text-xl font-extrabold text-lime-400">
                    {formatPrice(netPriceWithBonus)}
                  </p>
                </div>
              )}
            </div>

            {/* Financing preview */}
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-300">
              <span>{isFr ? "Financement" : "Financing"} ({config.financingPartners.slice(0, 2).join(" • ")}) :</span>
              <span className="font-bold text-white">{isFr ? "Dès" : "From"} {formatPrice(monthlyEstimate)} / {isFr ? "mois" : "mo"}</span>
            </div>
          </div>

          {/* Connected Inventory & Specialized Logistics Status */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {product.stock_status === "in_showroom" || product.stock > 10
                  ? isFr ? "En stock au Showroom Paris 17e" : "In stock at Paris Showroom"
                  : product.stock_status === "in_transit" || product.stock > 0
                  ? isFr ? "En arrivage Plateforme Logistique Hub" : "In transit to Logistics Hub"
                  : isFr ? "Disponible sur commande atelier usine" : "Factory order built to spec"}
              </span>
              <Link
                href={`/${locale}/delivery-pipeline`}
                className="text-lime-400 hover:underline font-semibold text-[11px]"
              >
                {isFr ? "Protocole de Livraison →" : "Delivery Protocol →"}
              </Link>
            </div>
            <p className="text-[11px] text-zinc-400 leading-tight">
              {productDeliveryLabel(product, locale)}
            </p>
          </div>

          {/* Optional Accessories / Configurator */}
          <ProductConfigurator
            product={product}
            selectedOptionIds={selectedOptionIds}
            onChangeOptions={(ids, cost) => {
              setSelectedOptionIds(ids);
              setExtraOptionCost(cost);
            }}
            dict={dict}
            locale={locale}
          />

          {/* Add to Cart & Tesla-Style Deposit Reservation */}
          <div className="space-y-3 pt-2">
            <AddToCart
              product={product}
              selectedOptions={selectedOptionIds}
              optionCost={extraOptionCost}
              dict={dict}
              locale={locale}
            />

            <button
              type="button"
              onClick={() => setTestRideOpen(true)}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 py-3.5 text-sm font-bold text-white hover:bg-zinc-800 hover:border-lime-400/40 transition"
            >
              <Calendar className="h-4 w-4 text-lime-400" />
              <span>{t.bookTestRideBtn}</span>
            </button>
          </div>

          {/* Quick Specs Highlight Grid with Regional Units */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-center">
              <span className="text-xs text-zinc-400 flex items-center justify-center gap-1">
                <Battery className="h-3.5 w-3.5 text-lime-400" /> {isFr ? "Autonomie Réelle" : "Real Range"}
              </span>
              <p className="mt-1 text-lg font-bold text-white">{formatDistance(product.autonomie_km)}</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-center">
              <span className="text-xs text-zinc-400 flex items-center justify-center gap-1">
                <Gauge className="h-3.5 w-3.5 text-cyan-400" /> {isFr ? "Vitesse de Pointe" : "Top Speed"}
              </span>
              <p className="mt-1 text-lg font-bold text-white">{formatSpeed(product.vitesse_max)}</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-center">
              <span className="text-xs text-zinc-400 flex items-center justify-center gap-1">
                <Zap className="h-3.5 w-3.5 text-amber-400" /> {isFr ? "Puissance Crête" : "Peak Power"}
              </span>
              <p className="mt-1 text-lg font-bold text-white">
                {product.motor_specs?.power_peak_kw ? `${product.motor_specs.power_peak_kw} kW (${product.motor_specs.power_hp} hp)` : "250 W"}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-center">
              <span className="text-xs text-zinc-400 flex items-center justify-center gap-1">
                <Weight className="h-3.5 w-3.5 text-zinc-400" /> {isFr ? "Poids en Marche" : "Curb Weight"}
              </span>
              <p className="mt-1 text-lg font-bold text-white">{formatWeight(product.poids_kg)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Tech Tabs (Specs, Range Simulator, Reviews, Dealer Network) */}
      <ProductTabs product={product} dict={dict} locale={locale} />

      {/* Test Ride Modal */}
      <TestRideModal
        isOpen={testRideOpen}
        onClose={() => setTestRideOpen(false)}
        initialProduct={product}
        dict={dict}
        locale={locale}
      />

      {/* Persistent Compare Drawer */}
      <CompareDrawer dict={dict} locale={locale} />
    </div>
  );
}
