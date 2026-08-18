"use client";

import { Dictionary } from "@/i18n/dictionaries";
import { SlidersHorizontal, RotateCcw, ShieldCheck, Battery, Sparkles } from "lucide-react";
import { MotoIcon, VeloIcon } from "./VehicleIcons";

export interface Filters {
  type: string;
  license: string;
  maxPrice: number;
  minRange: number;
  minSpeed: number;
  motorPower: string;
  removableBattery: boolean;
  ecoBonus: boolean;
  sort: string;
}

export default function FilterSidebar({
  dict,
  filters,
  onChange,
}: {
  dict: Dictionary;
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const update = (partial: Partial<Filters>) => onChange({ ...filters, ...partial });

  const t = dict.catalogue;

  return (
    <aside className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-md space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <h3 className="flex items-center gap-2 font-bold text-white text-base">
          <SlidersHorizontal className="h-4 w-4 text-lime-400" />
          {t.filters}
        </h3>
        <button
          onClick={() =>
            onChange({
              type: "all",
              license: "all",
              maxPrice: 35000,
              minRange: 0,
              minSpeed: 0,
              motorPower: "all",
              removableBattery: false,
              ecoBonus: false,
              sort: "default",
            })
          }
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-lime-400 transition"
        >
          <RotateCcw className="h-3 w-3" />
          <span>{t.reset}</span>
        </button>
      </div>

      {/* Vehicle Category (All, Velo, Moto) */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
          {t.type}
        </label>
        <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-zinc-950 p-1.5 border border-zinc-800">
          <button
            type="button"
            onClick={() => update({ type: "all" })}
            className={`rounded-xl py-2 text-xs font-semibold transition ${
              filters.type === "all"
                ? "bg-lime-400 text-zinc-950 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {t.allTypes}
          </button>
          <button
            type="button"
            onClick={() => update({ type: "velo" })}
            className={`flex items-center justify-center gap-1 rounded-xl py-2 text-xs font-semibold transition ${
              filters.type === "velo"
                ? "bg-lime-400 text-zinc-950 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <VeloIcon className="h-3.5 w-3.5" />
            <span>Vélos</span>
          </button>
          <button
            type="button"
            onClick={() => update({ type: "moto" })}
            className={`flex items-center justify-center gap-1 rounded-xl py-2 text-xs font-semibold transition ${
              filters.type === "moto"
                ? "bg-lime-400 text-zinc-950 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <MotoIcon className="h-3.5 w-3.5" />
            <span>Motos</span>
          </button>
        </div>
      </div>

      {/* License & Homologation Filter */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-lime-400" />
          <span>{t.license}</span>
        </label>
        <select
          value={filters.license}
          onChange={(e) => update({ license: e.target.value })}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800/90 px-3.5 py-2.5 text-xs text-white focus:border-lime-400 focus:outline-none"
        >
          <option value="all">Tous les permis & homologations</option>
          <option value="none">Sans Permis (VAE 25 km/h pistes cyclables)</option>
          <option value="speed_pedelec">Speed-Bike 45 km/h (Permis AM/B)</option>
          <option value="AM">Permis AM dès 14 ans (Équiv 50cc)</option>
          <option value="A1_B">Permis A1 ou B + 7h (Équiv 125cc)</option>
          <option value="A2">Permis Moto A2 (Jusqu&apos;à 35 kW)</option>
          <option value="A">Permis Moto A (Pleine Puissance)</option>
          <option value="offroad">100% Off-Road / Terrain privé (Sur-Ron 72V)</option>
        </select>
      </div>

      {/* Price Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold uppercase tracking-wider text-zinc-400">{t.maxPrice}</span>
          <span className="font-bold text-lime-400">{filters.maxPrice.toLocaleString()} €</span>
        </div>
        <input
          type="range"
          min="3000"
          max="35000"
          step="500"
          value={filters.maxPrice}
          onChange={(e) => update({ maxPrice: Number(e.target.value) })}
          className="w-full accent-lime-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
          <span>3 000 €</span>
          <span>15 000 €</span>
          <span>35 000 €</span>
        </div>
      </div>

      {/* Min Range Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold uppercase tracking-wider text-zinc-400">{t.range}</span>
          <span className="font-bold text-cyan-400">{filters.minRange} km</span>
        </div>
        <input
          type="range"
          min="0"
          max="250"
          step="10"
          value={filters.minRange}
          onChange={(e) => update({ minRange: Number(e.target.value) })}
          className="w-full accent-cyan-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
          <span>Tous</span>
          <span>100 km</span>
          <span>250+ km</span>
        </div>
      </div>

      {/* Toggles (Removable Battery & Eco Bonus) */}
      <div className="space-y-3 pt-2 border-t border-zinc-800">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300 hover:text-white">
          <input
            type="checkbox"
            checked={filters.removableBattery}
            onChange={(e) => update({ removableBattery: e.target.checked })}
            className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-lime-400 focus:ring-lime-400"
          />
          <span className="flex items-center gap-1.5 font-medium">
            <Battery className="h-3.5 w-3.5 text-lime-400" />
            {t.removableBattery}
          </span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300 hover:text-white">
          <input
            type="checkbox"
            checked={filters.ecoBonus}
            onChange={(e) => update({ ecoBonus: e.target.checked })}
            className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-lime-400 focus:ring-lime-400"
          />
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="h-3.5 w-3.5 text-lime-400" />
            {t.ecoBonusEligible}
          </span>
        </label>
      </div>

      {/* Sort selection */}
      <div className="pt-2 border-t border-zinc-800">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
          {t.sort}
        </label>
        <select
          value={filters.sort}
          onChange={(e) => update({ sort: e.target.value })}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800/90 px-3.5 py-2.5 text-xs text-white focus:border-lime-400 focus:outline-none"
        >
          <option value="default">{t.sortDefault}</option>
          <option value="price-asc">{t.sortPriceAsc}</option>
          <option value="price-desc">{t.sortPriceDesc}</option>
          <option value="range">{t.sortRange}</option>
          <option value="speed">{t.sortSpeed}</option>
          <option value="power">{t.sortPower}</option>
          <option value="rating">{t.sortRating}</option>
        </select>
      </div>
    </aside>
  );
}
