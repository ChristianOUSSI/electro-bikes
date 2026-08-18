"use client";

import { useState } from "react";
import { useRegionStore, REGIONS, RegionCode } from "@/store/region";
import { ChevronDown, Check } from "lucide-react";

export default function RegionSwitcher() {
  const { region, setRegion } = useRegionStore();
  const [isOpen, setIsOpen] = useState(false);
  const current = REGIONS[region] || REGIONS.FR;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full border border-zinc-700/80 bg-zinc-900/80 px-2.5 py-1 text-xs font-semibold text-zinc-300 hover:border-lime-400 hover:text-white transition"
        title="Changer de région et devise"
      >
        <span>{current.flag}</span>
        <span className="font-bold text-lime-400">{current.currency}</span>
        <ChevronDown className="h-3 w-3 text-zinc-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 w-64 rounded-2xl border border-zinc-800 bg-zinc-950/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-800/80">
              Région, Devise & Unités
            </div>

            <div className="mt-1 space-y-1">
              {(Object.keys(REGIONS) as RegionCode[]).map((rCode) => {
                const r = REGIONS[rCode];
                const isSelected = rCode === region;

                return (
                  <button
                    key={rCode}
                    onClick={() => {
                      setRegion(rCode);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs text-left transition ${
                      isSelected
                        ? "bg-lime-400/10 text-lime-400 font-bold border border-lime-400/30"
                        : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{r.flag}</span>
                      <div>
                        <p className="font-bold text-white text-xs">{r.name}</p>
                        <p className="text-[10px] text-zinc-400">
                          {r.currency} ({r.currencySymbol}) • {r.unitSystem === "imperial" ? "Miles & MPH" : "Kilomètres & KM/H"}
                        </p>
                      </div>
                    </div>

                    {isSelected && <Check className="h-4 w-4 text-lime-400" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 border-t border-zinc-800/80 p-2 text-[10px] text-zinc-400 text-center leading-tight">
              Aides gouvernementales (Bonus ASP, US EV Credit, iZEV) et unités adaptées instantanément.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
