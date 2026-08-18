"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import { products } from "@/lib/products";
import { Dictionary } from "@/i18n/dictionaries";
import { CheckCircle2, Sparkles, Shield } from "lucide-react";
import { formatPrice, productName } from "@/lib/format";

interface EcoBonusCalculatorProps {
  initialProduct?: Product;
  dict: Dictionary;
  locale: string;
}

export default function EcoBonusCalculator({
  initialProduct,
  dict,
  locale,
}: EcoBonusCalculatorProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProduct?.id || products[0].id
  );
  const [country, setCountry] = useState<"FR" | "DE" | "BE" | "CH" | "US">("FR");
  const [regionFr, setRegionFr] = useState<string>("idf");
  const [includeScrappage, setIncludeScrappage] = useState<boolean>(false);

  const currentProduct = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || initialProduct || products[0];
  }, [selectedProductId, initialProduct]);

  const bonusCalc = useMemo(() => {
    const isEligible = currentProduct.eco_bonus_eligible;
    const basePrice = currentProduct.prix;
    const isMoto = currentProduct.type === "moto";

    let nationalBonus = 0;
    let regionalBonus = 0;
    let conversionBonus = 0;

    if (isEligible) {
      if (country === "FR") {
        if (isMoto) {
          nationalBonus = Math.min(Math.round((currentProduct.battery_specs.capacity_kwh || 1) * 250), currentProduct.max_eco_bonus || 1500);
        } else {
          nationalBonus = Math.min(400, Math.round(basePrice * 0.4));
        }

        if (regionFr === "idf") {
          regionalBonus = isMoto ? 1200 : 500;
        } else if (regionFr === "paca" || regionFr === "ara") {
          regionalBonus = isMoto ? 800 : 300;
        } else if (regionFr === "occ") {
          regionalBonus = isMoto ? 600 : 250;
        }

        if (includeScrappage) {
          conversionBonus = isMoto ? 1100 : 400;
        }
      } else if (country === "DE") {
        nationalBonus = isMoto ? 1000 : 250;
      } else if (country === "BE") {
        nationalBonus = isMoto ? 850 : 350;
      } else if (country === "US") {
        nationalBonus = isMoto ? 1500 : 300;
      }
    }

    const totalAids = isEligible ? nationalBonus + regionalBonus + conversionBonus : 0;
    const netPrice = Math.max(500, basePrice - totalAids);
    const savingsPercent = Math.round((totalAids / basePrice) * 100);

    return {
      isEligible,
      basePrice,
      nationalBonus,
      regionalBonus,
      conversionBonus,
      totalAids,
      netPrice,
      savingsPercent,
    };
  }, [currentProduct, country, regionFr, includeScrappage]);

  const t = dict.ecoBonus;

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime-400">
            <Sparkles className="h-4 w-4" />
            <span>{t.title}</span>
          </div>
          <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            {productName(currentProduct, locale)}
          </h3>
        </div>

        {!initialProduct && (
          <div className="w-full sm:w-72">
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nom} — {formatPrice(p.prix, locale)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Controls */}
        <div className="space-y-5 lg:col-span-6">
          {/* Country Selection */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              {t.countryLabel}
            </label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {[
                { code: "FR" as const, label: "France 🇫🇷" },
                { code: "DE" as const, label: "Allemagne 🇩🇪" },
                { code: "BE" as const, label: "Belgique 🇧🇪" },
                { code: "CH" as const, label: "Suisse 🇨🇭" },
                { code: "US" as const, label: "USA 🇺🇸" },
              ].map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCountry(c.code)}
                  className={`rounded-xl border p-2.5 text-xs font-medium transition text-center ${
                    country === c.code
                      ? "border-lime-400 bg-lime-400/10 text-white shadow-sm"
                      : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* French Region selection */}
          {country === "FR" && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                {t.regionLabel}
              </label>
              <select
                value={regionFr}
                onChange={(e) => setRegionFr(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
              >
                <option value="idf">Île-de-France / Grand Paris (Subvention jusqu&apos;à 1 500 €)</option>
                <option value="paca">Provence-Alpes-Côte d&apos;Azur / Métropole Nice-Marseille (Jusqu&apos;à 800 €)</option>
                <option value="ara">Auvergne-Rhône-Alpes / Lyon / Grenoble (Jusqu&apos;à 800 €)</option>
                <option value="occ">Occitanie / Toulouse / Montpellier (Jusqu&apos;à 600 €)</option>
                <option value="other">Autre région française (Bonus National uniquement)</option>
              </select>
            </div>
          )}

          {/* Prime à la conversion toggle */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeScrappage}
                onChange={(e) => setIncludeScrappage(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-lime-400 focus:ring-lime-400"
              />
              <div>
                <span className="text-sm font-semibold text-white">
                  {t.primeConversion}
                </span>
                <p className="text-xs text-zinc-400 mt-0.5">
                  J&apos;envoie à la casse un ancien 2-roues ou une voiture essence/diesel immatriculée avant 2011.
                </p>
              </div>
            </label>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/60">
            <Shield className="h-4 w-4 text-lime-400 shrink-0" />
            <span>{t.learnMore}</span>
          </div>
        </div>

        {/* Output Calculation Card */}
        <div className="space-y-4 lg:col-span-6">
          <div className="rounded-3xl border border-lime-400/40 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-lime-950/20 p-6 sm:p-8 shadow-glow-lime">
            <p className="text-xs font-semibold uppercase tracking-wider text-lime-400">
              {t.finalPrice}
            </p>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {formatPrice(bonusCalc.netPrice, locale)}
              </span>
              <span className="text-sm line-through text-zinc-500 font-medium">
                {formatPrice(bonusCalc.basePrice, locale)}
              </span>
            </div>

            {bonusCalc.totalAids > 0 && (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-lime-400/20 px-3 py-1 text-xs font-semibold text-lime-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Vous économisez {formatPrice(bonusCalc.totalAids, locale)} ({bonusCalc.savingsPercent}%)</span>
              </div>
            )}

            {/* Subsidies Breakdown */}
            <div className="mt-6 space-y-2.5 pt-4 border-t border-zinc-800 text-sm">
              <div className="flex justify-between text-zinc-300">
                <span>{t.bonusNational} :</span>
                <span className="font-semibold text-lime-400">
                  - {formatPrice(bonusCalc.nationalBonus, locale)}
                </span>
              </div>

              {bonusCalc.regionalBonus > 0 && (
                <div className="flex justify-between text-zinc-300">
                  <span>{t.bonusRegional} :</span>
                  <span className="font-semibold text-cyan-400">
                    - {formatPrice(bonusCalc.regionalBonus, locale)}
                  </span>
                </div>
              )}

              {bonusCalc.conversionBonus > 0 && (
                <div className="flex justify-between text-zinc-300">
                  <span>{t.primeConversion} :</span>
                  <span className="font-semibold text-emerald-400">
                    - {formatPrice(bonusCalc.conversionBonus, locale)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-white font-bold pt-2 border-t border-zinc-800">
                <span>{t.totalAids} :</span>
                <span className="text-lime-400">
                  - {formatPrice(bonusCalc.totalAids, locale)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
