"use client";

import { Product } from "@/lib/types";
import { Dictionary } from "@/i18n/dictionaries";
import { useRegionStore } from "@/store/region";
import { Check, Plus, Wrench } from "lucide-react";

interface ProductConfiguratorProps {
  product: Product;
  selectedOptionIds: string[];
  onChangeOptions: (ids: string[], totalExtraCost: number) => void;
  dict: Dictionary;
  locale: string;
}

export default function ProductConfigurator({
  product,
  selectedOptionIds,
  onChangeOptions,
  dict,
  locale,
}: ProductConfiguratorProps) {
  const { formatPrice } = useRegionStore();
  const isFr = locale === "fr";

  if (!product.available_options || product.available_options.length === 0) {
    return null;
  }

  const toggleOption = (optId: string) => {
    let newSelected = [...selectedOptionIds];
    if (newSelected.includes(optId)) {
      newSelected = newSelected.filter((id) => id !== optId);
    } else {
      newSelected.push(optId);
    }

    const totalExtraCost = product.available_options
      .filter((opt) => newSelected.includes(opt.id))
      .reduce((sum, opt) => sum + opt.price, 0);

    onChangeOptions(newSelected, totalExtraCost);
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-lime-400" />
          <h3 className="font-bold text-white text-sm sm:text-base">
            {dict.product.optionsTitle}
          </h3>
        </div>
        <span className="text-xs text-zinc-400">
          {isFr ? "Montage certifié en atelier inclus" : "Certified workshop installation included"}
        </span>
      </div>

      <div className="space-y-2.5">
        {product.available_options.map((opt) => {
          const isSelected = selectedOptionIds.includes(opt.id);
          const name = isFr ? opt.name : (opt.name_en || opt.name);
          const desc = isFr ? opt.description : (opt.description_en || opt.description);

          return (
            <div
              key={opt.id}
              onClick={() => toggleOption(opt.id)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition ${
                isSelected
                  ? "border-lime-400 bg-lime-400/10 shadow-sm"
                  : "border-zinc-800 bg-zinc-900/70 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-lg border transition ${
                    isSelected
                      ? "border-lime-400 bg-lime-400 text-zinc-950"
                      : "border-zinc-700 bg-zinc-800"
                  }`}
                >
                  {isSelected ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : <Plus className="h-3 w-3 text-zinc-400" />}
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">{name}</p>
                  <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{desc}</p>
                </div>
              </div>

              <span className="text-sm font-bold text-lime-400 ml-4 shrink-0">
                +{formatPrice(opt.price)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
