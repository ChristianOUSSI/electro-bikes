"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { Dictionary } from "@/i18n/dictionaries";
import { productName } from "@/lib/format";
import { useRegionStore } from "@/store/region";
import { X, Zap, ArrowRight } from "lucide-react";

interface CompareModalProps {
  productIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  dict: Dictionary;
  locale: string;
}

export default function CompareModal({
  productIds,
  isOpen,
  onClose,
  onRemove,
  dict,
  locale,
}: CompareModalProps) {
  const { formatPrice, formatDistance, formatSpeed, formatWeight } = useRegionStore();
  const isFr = locale === "fr";

  const selectedProducts = useMemo(() => {
    return products.filter((p) => productIds.includes(p.id));
  }, [productIds]);

  if (!isOpen || selectedProducts.length === 0) return null;

  const t = dict.compare;

  // Compute best specs across compared models
  const maxRange = Math.max(...selectedProducts.map((p) => p.autonomie_km));
  const maxSpeed = Math.max(...selectedProducts.map((p) => p.vitesse_max));
  const min0100 = Math.min(...selectedProducts.map((p) => p.acceleration_0_100_s || 99));
  const maxPower = Math.max(...selectedProducts.map((p) => p.motor_specs?.power_peak_kw || 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-7xl rounded-3xl border border-zinc-700 bg-zinc-950 p-6 sm:p-8 shadow-2xl overflow-x-auto max-h-[90vh]">
        {/* Close Button */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="h-6 w-6 text-lime-400" />
              {t.drawerTitle} ({selectedProducts.length}/4)
            </h2>
            <p className="text-xs text-zinc-400 mt-1">{t.drawerSubtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-zinc-800 p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Matrix Table */}
        <div className="min-w-[700px]">
          <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(220px,1fr))] gap-4">
            {/* Header row (photos & names) */}
            <div className="font-bold text-sm text-zinc-400 flex items-end pb-4">
              {isFr ? "Spécifications" : "Specifications"}
            </div>
            {selectedProducts.map((p) => (
              <div
                key={p.id}
                className="relative rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 text-center"
              >
                <button
                  onClick={() => onRemove(p.id)}
                  className="absolute top-2 right-2 rounded-full bg-zinc-800/80 p-1 text-zinc-400 hover:bg-red-500/20 hover:text-red-400 transition"
                  title={isFr ? "Retirer" : "Remove"}
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={p.image_url}
                    alt={productName(p, locale)}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="mt-3 font-bold text-white line-clamp-1 text-sm sm:text-base">
                  {productName(p, locale)}
                </h4>
                <p className="text-xs text-lime-400 font-semibold uppercase tracking-wider mt-0.5">
                  {p.brand}
                </p>
                <p className="mt-2 text-xl font-extrabold text-white">
                  {formatPrice(p.prix)}
                </p>
                <Link
                  href={`/${locale}/product/${p.id}`}
                  onClick={onClose}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-lime-400 hover:text-lime-300 transition"
                >
                  <span>{isFr ? "Voir la monture" : "View Machine"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}

            {/* Spec: Permis requis */}
            <div className="py-3 font-medium text-xs text-zinc-400 border-t border-zinc-800 flex items-center">
              {t.metrics.license}
            </div>
            {selectedProducts.map((p) => (
              <div key={p.id} className="py-3 text-xs font-medium text-zinc-200 border-t border-zinc-800 text-center">
                <span className="rounded-lg bg-zinc-800 px-2 py-1 border border-zinc-700">
                  {isFr ? p.license_label_fr : p.license_label_en}
                </span>
              </div>
            ))}

            {/* Spec: Autonomie */}
            <div className="py-3 font-medium text-xs text-zinc-400 border-t border-zinc-800 flex items-center">
              {t.metrics.autonomie}
            </div>
            {selectedProducts.map((p) => (
              <div
                key={p.id}
                className={`py-3 text-sm font-bold border-t border-zinc-800 text-center ${
                  p.autonomie_km === maxRange ? "text-lime-400 bg-lime-950/20 rounded-lg" : "text-white"
                }`}
              >
                {formatDistance(p.autonomie_km)}
                {p.autonomie_km === maxRange && (
                  <span className="block text-[10px] uppercase font-bold text-lime-400">👑 {t.bestBadge}</span>
                )}
              </div>
            ))}

            {/* Spec: Vitesse max */}
            <div className="py-3 font-medium text-xs text-zinc-400 border-t border-zinc-800 flex items-center">
              {t.metrics.vitesse}
            </div>
            {selectedProducts.map((p) => (
              <div
                key={p.id}
                className={`py-3 text-sm font-bold border-t border-zinc-800 text-center ${
                  p.vitesse_max === maxSpeed ? "text-cyan-400 bg-cyan-950/20 rounded-lg" : "text-white"
                }`}
              >
                {formatSpeed(p.vitesse_max)}
                {p.vitesse_max === maxSpeed && (
                  <span className="block text-[10px] uppercase font-bold text-cyan-400">👑 {t.bestBadge}</span>
                )}
              </div>
            ))}

            {/* Spec: 0-100 */}
            <div className="py-3 font-medium text-xs text-zinc-400 border-t border-zinc-800 flex items-center">
              {t.metrics.acceleration}
            </div>
            {selectedProducts.map((p) => (
              <div
                key={p.id}
                className={`py-3 text-sm font-bold border-t border-zinc-800 text-center ${
                  p.acceleration_0_100_s && p.acceleration_0_100_s === min0100
                    ? "text-lime-400 bg-lime-950/20 rounded-lg"
                    : "text-zinc-300"
                }`}
              >
                {p.acceleration_0_100_s ? `${p.acceleration_0_100_s} s` : "N/A"}
              </div>
            ))}

            {/* Spec: Puissance crête */}
            <div className="py-3 font-medium text-xs text-zinc-400 border-t border-zinc-800 flex items-center">
              {t.metrics.power}
            </div>
            {selectedProducts.map((p) => (
              <div
                key={p.id}
                className={`py-3 text-sm font-bold border-t border-zinc-800 text-center ${
                  (p.motor_specs?.power_peak_kw || 0) === maxPower
                    ? "text-lime-400 bg-lime-950/20 rounded-lg"
                    : "text-zinc-300"
                }`}
              >
                {p.motor_specs?.power_peak_kw ? `${p.motor_specs.power_peak_kw} kW (${p.motor_specs.power_hp} ${isFr ? "ch" : "hp"})` : "250 W"}
              </div>
            ))}

            {/* Spec: Couple */}
            <div className="py-3 font-medium text-xs text-zinc-400 border-t border-zinc-800 flex items-center">
              {t.metrics.torque}
            </div>
            {selectedProducts.map((p) => (
              <div key={p.id} className="py-3 text-sm font-bold text-white border-t border-zinc-800 text-center">
                {p.motor_specs?.torque_nm} Nm
              </div>
            ))}

            {/* Spec: Batterie */}
            <div className="py-3 font-medium text-xs text-zinc-400 border-t border-zinc-800 flex items-center">
              {t.metrics.batteryCapacity}
            </div>
            {selectedProducts.map((p) => (
              <div key={p.id} className="py-3 text-xs text-zinc-200 border-t border-zinc-800 text-center">
                <p className="font-bold text-sm text-white">
                  {p.battery_specs?.capacity_kwh ? `${p.battery_specs.capacity_kwh} kWh` : `${p.battery_specs?.capacity_wh} Wh`}
                </p>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  {p.battery_specs?.removable ? (isFr ? "✅ Amovible" : "✅ Removable") : (isFr ? "🔒 Fixe intégrée" : "🔒 Frame Integrated")}
                </p>
              </div>
            ))}

            {/* Spec: Recharge rapide */}
            <div className="py-3 font-medium text-xs text-zinc-400 border-t border-zinc-800 flex items-center">
              {t.metrics.chargeFast}
            </div>
            {selectedProducts.map((p) => (
              <div key={p.id} className="py-3 text-xs text-zinc-300 border-t border-zinc-800 text-center">
                {p.battery_specs?.charge_time_fast_min ? (
                  <span className="text-lime-400 font-bold">
                    🚀 {p.battery_specs.charge_time_fast_min} min (DC)
                  </span>
                ) : (
                  <span className="text-zinc-500">{isFr ? "Non disponible" : "Not Available"}</span>
                )}
              </div>
            ))}

            {/* Spec: Poids */}
            <div className="py-3 font-medium text-xs text-zinc-400 border-t border-zinc-800 flex items-center">
              {t.metrics.weight}
            </div>
            {selectedProducts.map((p) => (
              <div key={p.id} className="py-3 text-sm font-semibold text-zinc-200 border-t border-zinc-800 text-center">
                {formatWeight(p.poids_kg)}
              </div>
            ))}

            {/* Spec: Garantie */}
            <div className="py-3 font-medium text-xs text-zinc-400 border-t border-zinc-800 flex items-center">
              {t.metrics.warranty}
            </div>
            {selectedProducts.map((p) => (
              <div key={p.id} className="py-3 text-xs font-semibold text-emerald-400 border-t border-zinc-800 text-center">
                🛡️ {p.battery_specs?.warranty_years || 5} {isFr ? "ans" : "years"} / {formatDistance(p.battery_specs?.warranty_km || 50000)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
