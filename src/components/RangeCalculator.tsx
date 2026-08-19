"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import { products } from "@/lib/products";
import { Dictionary } from "@/i18n/dictionaries";
import { useRegionStore } from "@/store/region";
import { Thermometer, User, Gauge, Plug, Mountain, Wind, Flame, Snowflake } from "lucide-react";
import { productName } from "@/lib/format";

interface RangeCalculatorProps {
  initialProduct?: Product;
  dict?: Dictionary;
  locale: string;
}

export default function RangeCalculator({
  initialProduct,
  locale,
}: RangeCalculatorProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProduct?.id || products[0].id
  );
  const [ridingStyle, setRidingStyle] = useState<"eco" | "mixed" | "sport">("mixed");
  const [weightKg, setWeightKg] = useState<number>(78);
  const [temperatureC, setTemperatureC] = useState<number>(20);
  const [terrain, setTerrain] = useState<"flat" | "rolling" | "mountain">("rolling");

  const { formatDistance, formatWeight, getConfig } = useRegionStore();
  const config = getConfig();
  const isFr = locale === "fr";

  const currentProduct = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || initialProduct || products[0];
  }, [selectedProductId, initialProduct]);

  // Real-world physics simulation formula
  const calculatedRange = useMemo(() => {
    const baseRange = currentProduct.autonomie_km;

    // Riding style impact
    let styleFactor = 1.0;
    if (ridingStyle === "eco") styleFactor = 1.25;
    if (ridingStyle === "mixed") styleFactor = 1.0;
    if (ridingStyle === "sport") styleFactor = 0.68;

    // Weight impact (baseline: 75kg)
    const weightDiff = weightKg - 75;
    const weightFactor = 1.0 - (weightDiff * 0.0035);

    // Temperature impact (optimal: 20-25°C)
    let tempFactor = 1.0;
    if (temperatureC < 0) {
      tempFactor = 0.72;
    } else if (temperatureC < 10) {
      tempFactor = 0.84;
    } else if (temperatureC < 20) {
      tempFactor = 0.95;
    } else if (temperatureC > 32) {
      tempFactor = 0.90;
    }

    // Terrain elevation impact
    let terrainFactor = 1.0;
    if (terrain === "flat") terrainFactor = 1.10;
    if (terrain === "rolling") terrainFactor = 1.0;
    if (terrain === "mountain") terrainFactor = 0.74;

    const estimatedKm = Math.round(baseRange * styleFactor * weightFactor * tempFactor * terrainFactor);
    return Math.max(15, estimatedKm);
  }, [currentProduct, ridingStyle, weightKg, temperatureC, terrain]);

  // Battery capacity & consumption
  const kwh = currentProduct.battery_specs?.capacity_kwh || (currentProduct.battery_specs?.capacity_wh ? currentProduct.battery_specs.capacity_wh / 1000 : 2.5);
  const consumptionWhPerKm = Math.round((kwh * 1000) / Math.max(1, calculatedRange));

  // Charging durations
  const chargingStats = useMemo(() => {
    const domesticHours = Math.round((kwh / 2.0) * 10) / 10;
    const reinforcedHours = Math.round((kwh / 3.3) * 10) / 10;
    const fastMinutes = currentProduct.battery_specs?.charge_time_fast_min || null;

    return {
      domesticHours,
      reinforcedHours,
      fastMinutes,
    };
  }, [kwh, currentProduct]);

  // Range percentage vs official
  const rangePercent = Math.min(150, Math.round((calculatedRange / currentProduct.autonomie_km) * 100));

  return (
    <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
      {/* Top Cockpit Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lime-400">
            <Gauge className="h-4 w-4" />
            <span>{isFr ? "Télémétrie d'Autonomie Réelle en Direct" : "Live Range & Telemetry Cockpit"}</span>
          </div>
          <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl tracking-tight">
            {productName(currentProduct, locale)}
          </h3>
        </div>

        {/* Model Selector Dropdown if not locked to 1 product */}
        {!initialProduct && (
          <div className="sm:w-80">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              {isFr ? "Changer de Machine" : "Select Vehicle"}
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white focus:border-lime-400 focus:outline-none"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brand}  {productName(p, locale)} ({p.autonomie_km} km / {p.vitesse_max} km/h)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Interactive Cockpit Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Control 1: Riding Style (Eco / Mixed / Sport) */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-white">
              <span className="flex items-center gap-1.5 text-lime-400">
                <Wind className="h-4 w-4" />
                {isFr ? "Style de Conduite" : "Riding Aggressiveness"}
              </span>
              <span className="capitalize text-zinc-400">
                {ridingStyle === "eco" ? (isFr ? "Éco / Ville Zen (25-45 km/h)" : "Eco Commuter") : ridingStyle === "mixed" ? (isFr ? "Mixte Quotidien (Normal)" : "Standard Road") : (isFr ? "Plein Gaz / Sport / Piste" : "Sport / Track Attack")}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { id: "eco", label: isFr ? "Zen Éco" : "Eco Zen", desc: "+25% Range" },
                { id: "mixed", label: isFr ? "Normal" : "Mixed Road", desc: "Baseline" },
                { id: "sport", label: isFr ? "Sport / Piste" : "Sport / Full Gas", desc: "-32% Range" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setRidingStyle(m.id as typeof ridingStyle)}
                  className={`rounded-xl p-2.5 text-center transition border ${ridingStyle === m.id
                      ? "border-lime-400 bg-lime-400/10 text-lime-400 font-bold shadow-sm"
                      : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-white"
                    }`}
                >
                  <p className="text-xs font-bold">{m.label}</p>
                  <p className="text-[10px] text-zinc-500">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Control 2: Pilot Weight Slider */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-white">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <User className="h-4 w-4" />
                {isFr ? "Poids du Pilote & Équipement" : "Rider Weight & Gear"}
              </span>
              <span className="text-sm font-black text-cyan-400">{formatWeight(weightKg)}</span>
            </div>
            <input
              type="range"
              min={50}
              max={130}
              step={1}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>{formatWeight(50)} (Léger)</span>
              <span>{formatWeight(75)} (Standard)</span>
              <span>{formatWeight(130)} (Duo / Bagages)</span>
            </div>
          </div>

          {/* Control 3: Temperature Weather Slider */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-white">
              <span className="flex items-center gap-1.5 text-amber-400">
                {temperatureC <= 5 ? (
                  <Snowflake className="h-4 w-4 text-cyan-300 animate-spin-slow" />
                ) : temperatureC >= 30 ? (
                  <Flame className="h-4 w-4 text-orange-500" />
                ) : (
                  <Thermometer className="h-4 w-4" />
                )}
                {isFr ? "Température Extérieure" : "Ambient Weather"}
              </span>
              <span className={`text-sm font-black ${temperatureC <= 0 ? "text-cyan-400" : temperatureC >= 30 ? "text-orange-400" : "text-amber-400"}`}>
                {temperatureC}°C ({Math.round(temperatureC * 1.8 + 32)}°F)
              </span>
            </div>
            <input
              type="range"
              min={-10}
              max={40}
              step={1}
              value={temperatureC}
              onChange={(e) => setTemperatureC(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>-10°C (Hiver Glacial ❄️)</span>
              <span>20°C (Printemps Idéal ☀️)</span>
              <span>40°C (Canicule 🔥)</span>
            </div>
          </div>

          {/* Control 4: Terrain Topography */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-white">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Mountain className="h-4 w-4" />
                {isFr ? "Topographie & Relief" : "Terrain & Elevation"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { id: "flat", label: isFr ? "Plat / Bord de Mer" : "Flat / Sea Level", desc: "+10% Range" },
                { id: "rolling", label: isFr ? "Vallonné Mixte" : "Rolling Hills", desc: "Standard" },
                { id: "mountain", label: isFr ? "Cols de Montagne" : "Steep Mountain", desc: "-26% Range" },
              ].map((tr) => (
                <button
                  key={tr.id}
                  type="button"
                  onClick={() => setTerrain(tr.id as typeof terrain)}
                  className={`rounded-xl p-2.5 text-center transition border ${terrain === tr.id
                      ? "border-emerald-400 bg-emerald-400/10 text-emerald-400 font-bold"
                      : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-white"
                    }`}
                >
                  <p className="text-xs font-bold">{tr.label}</p>
                  <p className="text-[10px] text-zinc-500">{tr.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Range Gauge & Telemetry Readout */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-lime-400/40 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 p-6 sm:p-8 shadow-glow-lime">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-400">
              {isFr ? "Autonomie Réelle Estimée" : "Estimated Real Range"}
            </span>

            {/* Huge Dynamic Number */}
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black text-lime-400 tracking-tight">
                {formatDistance(calculatedRange)}
              </span>
              <span className="text-xs font-bold text-zinc-400">
                / {formatDistance(currentProduct.autonomie_km)} constructeur
              </span>
            </div>

            {/* Dynamic Visual Battery Gauge Bar */}
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>Rendement Réel : {rangePercent}%</span>
                <span>{consumptionWhPerKm} Wh/{config.unitSystem === "imperial" ? "mi" : "km"}</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-800 p-0.5 border border-zinc-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 transition-all duration-300"
                  style={{ width: `${Math.min(100, rangePercent)}%` }}
                />
              </div>
            </div>

            {/* Live Consumption & Economics Telemetry */}
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-zinc-950/80 p-4 border border-zinc-800 text-xs">
              <div>
                <span className="text-zinc-500">Capacité Pack :</span>
                <p className="font-bold text-white mt-0.5">{kwh} kWh ({Math.round(kwh * 1000)} Wh)</p>
              </div>
              <div>
                <span className="text-zinc-500">Coût aux 100 km :</span>
                <p className="font-bold text-emerald-400 mt-0.5">~0,85 € (vs 7,50 € essence)</p>
              </div>
            </div>
          </div>

          {/* Charging Times Across Plugs */}
          <div className="mt-6 border-t border-zinc-800 pt-4 space-y-3">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Plug className="h-4 w-4 text-cyan-400" />
              {isFr ? "Temps de Recharge Constatés" : "Real-World Charging Times"}
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-zinc-900 p-2.5 border border-zinc-800">
                <span className="text-zinc-400">{isFr ? "Prise Domestique 230V (10A)" : "Standard 110V/230V Home"}</span>
                <span className="font-bold text-white">{chargingStats.domesticHours} heures (0-100%)</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-zinc-900 p-2.5 border border-zinc-800">
                <span className="text-zinc-400">{isFr ? "Prise Renforcée / Green'Up (16A)" : "Level 2 / Wallbox (16A)"}</span>
                <span className="font-bold text-lime-400">{chargingStats.reinforcedHours} heures</span>
              </div>

              {chargingStats.fastMinutes && (
                <div className="flex items-center justify-between rounded-xl bg-cyan-950/30 p-2.5 border border-cyan-500/30">
                  <span className="text-cyan-300 font-semibold">{isFr ? "Charge Rapide Combo CCS (DC)" : "DC Fast Charging (CCS)"}</span>
                  <span className="font-black text-cyan-400">{chargingStats.fastMinutes} min (20-80%)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
