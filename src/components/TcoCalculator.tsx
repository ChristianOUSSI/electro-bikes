"use client";

import { useState, useMemo } from "react";
import { Dictionary } from "@/i18n/dictionaries";
import { TrendingUp, Fuel, Wrench, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/format";

export default function TcoCalculator({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  const [annualKm, setAnnualKm] = useState<number>(8000);
  const [fuelPricePerL, setFuelPricePerL] = useState<number>(1.95);
  const [thermalLPer100, setThermalLPer100] = useState<number>(4.5);

  const t = dict.tco;

  const savings = useMemo(() => {
    // Gas cost per year:
    const gasLitersPerYear = (annualKm / 100) * thermalLPer100;
    const gasCostPerYear = gasLitersPerYear * fuelPricePerL;

    // Electric cost per year (average 5 kWh / 100 km @ 0.25€/kWh):
    const electricKwhPerYear = (annualKm / 100) * 5.0;
    const electricCostPerYear = electricKwhPerYear * 0.25;

    const fuelSavingsYear1 = Math.round(gasCostPerYear - electricCostPerYear);

    // Maintenance savings (oil changes every 5000km @ 120€, spark plugs, filters, brake pads):
    const maintenanceThermalYear = Math.round((annualKm / 5000) * 140 + 150);
    const maintenanceElectricYear = 60; // Just visual inspection & tire pressure
    const maintenanceSavingsYear1 = Math.max(100, maintenanceThermalYear - maintenanceElectricYear);

    // Parking & ZFE / Carte grise savings in French / European cities (~30€/month parking + 150€ tax amortized):
    const parkingAndTaxSavingsYear1 = 380;

    const totalSavingsYear1 = fuelSavingsYear1 + maintenanceSavingsYear1 + parkingAndTaxSavingsYear1;
    const totalSavingsYear3 = totalSavingsYear1 * 3;
    const totalSavingsYear5 = totalSavingsYear1 * 5;

    return {
      fuelSavingsYear1,
      maintenanceSavingsYear1,
      parkingAndTaxSavingsYear1,
      totalSavingsYear1,
      totalSavingsYear3,
      totalSavingsYear5,
    };
  }, [annualKm, fuelPricePerL, thermalLPer100]);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
      <div className="border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime-400">
          <TrendingUp className="h-4 w-4" />
          <span>{t.title}</span>
        </div>
        <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          {dict.home.tcoSectionTitle}
        </h3>
        <p className="mt-2 text-sm text-zinc-400 max-w-3xl">
          {dict.home.tcoSectionDesc}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Sliders */}
        <div className="space-y-6 lg:col-span-6">
          {/* Annual Mileage */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-300">{t.annualDistance}</span>
              <span className="text-lg font-bold text-lime-400">{annualKm.toLocaleString()} km/an</span>
            </div>
            <input
              type="range"
              min="2000"
              max="25000"
              step="500"
              value={annualKm}
              onChange={(e) => setAnnualKm(Number(e.target.value))}
              className="mt-3 w-full accent-lime-400 cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-xs text-zinc-500">
              <span>Occasionnel (3 000 km)</span>
              <span>Navetteur (8 000 km)</span>
              <span>Gros rouleur (20 000 km)</span>
            </div>
          </div>

          {/* Gas Price */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-300">{t.fuelPrice}</span>
              <span className="text-lg font-bold text-amber-400">{fuelPricePerL.toFixed(2)} € / L</span>
            </div>
            <input
              type="range"
              min="1.50"
              max="2.50"
              step="0.05"
              value={fuelPricePerL}
              onChange={(e) => setFuelPricePerL(Number(e.target.value))}
              className="mt-3 w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Thermal Consumption */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-300">{t.thermalConsumption}</span>
              <span className="text-lg font-bold text-white">{thermalLPer100.toFixed(1)} L / 100km</span>
            </div>
            <input
              type="range"
              min="2.5"
              max="7.5"
              step="0.1"
              value={thermalLPer100}
              onChange={(e) => setThermalLPer100(Number(e.target.value))}
              className="mt-3 w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Output Savings */}
        <div className="space-y-4 lg:col-span-6">
          {/* Main 5-year savings banner */}
          <div className="rounded-3xl border border-lime-400/40 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-lime-950/20 p-6 sm:p-8 shadow-glow-lime">
            <p className="text-xs font-semibold uppercase tracking-wider text-lime-400">
              {t.year5}
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white">
                +{formatPrice(savings.totalSavingsYear5, locale)}
              </span>
              <span className="text-sm font-semibold text-lime-400">économisés</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Sur 5 ans, vos économies d&apos;usage amortissent jusqu&apos;à 60% du prix d&apos;achat d&apos;un véhicule neuf !
            </p>

            {/* Quick 1yr & 3yr badges */}
            <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
              <div className="rounded-xl bg-zinc-950/80 p-3 border border-zinc-800">
                <p className="text-xs text-zinc-400">{t.year1} :</p>
                <p className="mt-1 text-lg font-bold text-white">+{formatPrice(savings.totalSavingsYear1, locale)}</p>
              </div>
              <div className="rounded-xl bg-zinc-950/80 p-3 border border-zinc-800">
                <p className="text-xs text-zinc-400">{t.year3} :</p>
                <p className="mt-1 text-lg font-bold text-cyan-400">+{formatPrice(savings.totalSavingsYear3, locale)}</p>
              </div>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/40">
              <span className="flex items-center gap-2 text-zinc-300">
                <Fuel className="h-4 w-4 text-amber-400" />
                {t.breakdown.fuel}
              </span>
              <span className="font-semibold text-lime-400">+{formatPrice(savings.fuelSavingsYear1, locale)} / an</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/40">
              <span className="flex items-center gap-2 text-zinc-300">
                <Wrench className="h-4 w-4 text-cyan-400" />
                {t.breakdown.maintenance}
              </span>
              <span className="font-semibold text-lime-400">+{formatPrice(savings.maintenanceSavingsYear1, locale)} / an</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/40">
              <span className="flex items-center gap-2 text-zinc-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                {t.breakdown.parkingAndTax}
              </span>
              <span className="font-semibold text-lime-400">+{formatPrice(savings.parkingAndTaxSavingsYear1, locale)} / an</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
