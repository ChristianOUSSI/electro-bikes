"use client";

import { Dictionary } from "@/i18n/dictionaries";

export interface Filters {
  type: "all" | "velo" | "moto";
  maxPrice: number;
  minRange: number;
  sort: "default" | "price-asc" | "price-desc" | "range";
}

const PRICE_MAX = 35000;
const RANGE_MAX = 260;

export default function FilterSidebar({
  dict,
  filters,
  onChange,
}: {
  dict: Dictionary;
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  const t = dict.catalogue;

  return (
    <aside className="h-fit space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 lg:sticky lg:top-20">
      <h2 className="font-semibold text-white">{t.filters}</h2>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-zinc-300">
          {t.type}
        </legend>
        <div className="space-y-1.5 text-sm">
          {(
            [
              ["all", t.allTypes],
              ["velo", t.velo],
              ["moto", t.moto],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 text-zinc-400 hover:text-white"
            >
              <input
                type="radio"
                name="type"
                value={value}
                checked={filters.type === value}
                onChange={() => onChange({ ...filters, type: value })}
                className="accent-lime-400"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="maxPrice"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          {t.maxPrice} —{" "}
          <span className="text-lime-400">
            {filters.maxPrice.toLocaleString()} €
          </span>
        </label>
        <input
          id="maxPrice"
          type="range"
          min={3000}
          max={PRICE_MAX}
          step={500}
          value={filters.maxPrice}
          onChange={(e) =>
            onChange({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="w-full accent-lime-400"
        />
      </div>

      <div>
        <label
          htmlFor="minRange"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          {t.range} —{" "}
          <span className="text-lime-400">{filters.minRange} km</span>
        </label>
        <input
          id="minRange"
          type="range"
          min={0}
          max={RANGE_MAX}
          step={10}
          value={filters.minRange}
          onChange={(e) =>
            onChange({ ...filters, minRange: Number(e.target.value) })
          }
          className="w-full accent-lime-400"
        />
      </div>

      <div>
        <label
          htmlFor="sort"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          {t.sort}
        </label>
        <select
          id="sort"
          value={filters.sort}
          onChange={(e) =>
            onChange({ ...filters, sort: e.target.value as Filters["sort"] })
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 focus:border-lime-400 focus:outline-none"
        >
          <option value="default">{t.sortDefault}</option>
          <option value="price-asc">{t.sortPriceAsc}</option>
          <option value="price-desc">{t.sortPriceDesc}</option>
          <option value="range">{t.sortRange}</option>
        </select>
      </div>

      <button
        type="button"
        onClick={() =>
          onChange({
            type: "all",
            maxPrice: PRICE_MAX,
            minRange: 0,
            sort: "default",
          })
        }
        className="w-full rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:border-lime-400 hover:text-white"
      >
        {t.reset}
      </button>
    </aside>
  );
}
