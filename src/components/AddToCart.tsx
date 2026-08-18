"use client";

import { useState } from "react";
import { Dictionary } from "@/i18n/dictionaries";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { useRegionStore } from "@/store/region";
import { Check, ShieldCheck, Zap, Lock, CreditCard } from "lucide-react";

export default function AddToCart({
  product,
  selectedOptions = [],
  optionCost = 0,
  dict,
  locale = "fr",
}: {
  product: Product;
  selectedOptions?: string[];
  optionCost?: number;
  dict: Dictionary;
  locale?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const { formatDeposit, formatPrice, getConfig } = useRegionStore();
  const [added, setAdded] = useState(false);
  const [orderType, setOrderType] = useState<"deposit" | "full">("deposit");

  const isFr = locale === "fr";
  const config = getConfig();
  const depositStr = formatDeposit();

  if (product.stock === 0) {
    return (
      <button
        type="button"
        disabled
        className="w-full cursor-not-allowed rounded-2xl bg-zinc-800 px-8 py-4 font-bold text-zinc-500"
      >
        {dict.product.outOfStock}
      </button>
    );
  }

  const handleOrder = () => {
    addItem(product.id, 1, selectedOptions, optionCost);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Dual Mode Switcher (Tesla Style Deposit vs Full Payment) */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-1">
        <button
          type="button"
          onClick={() => setOrderType("deposit")}
          className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-xl text-xs font-bold transition ${
            orderType === "deposit"
              ? "bg-lime-400 text-zinc-950 shadow-glow-lime"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5" />
            <span>{isFr ? `Acompte ${depositStr}` : `Deposit ${depositStr}`}</span>
          </span>
          <span className={`text-[10px] ${orderType === "deposit" ? "text-zinc-900 font-semibold" : "text-lime-400"}`}>
            {isFr ? "Recommandé • 100% Remboursable" : "Recommended • 100% Refundable"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setOrderType("full")}
          className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-xl text-xs font-bold transition ${
            orderType === "full"
              ? "bg-zinc-800 text-white border border-zinc-700"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-1">
            <CreditCard className="h-3.5 w-3.5" />
            <span>{isFr ? "Paiement Intégral / LOA" : "Full Payment / 0% Lease"}</span>
          </span>
          <span className="text-[10px] text-zinc-500 font-normal">
            {isFr ? "Séquestre notarié / Virement" : "Bank Escrow / Wire Transfer"}
          </span>
        </button>
      </div>

      {/* Main Action Button */}
      <button
        type="button"
        onClick={handleOrder}
        className={`w-full flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4 font-bold text-base transition shadow-lg ${
          added
            ? "bg-emerald-400 text-zinc-950 shadow-emerald-400/20"
            : orderType === "deposit"
            ? "bg-lime-400 text-zinc-950 hover:bg-lime-300 shadow-glow-lime hover:scale-[1.01]"
            : "bg-white text-zinc-950 hover:bg-zinc-200 hover:scale-[1.01]"
        }`}
      >
        {added ? (
          <>
            <Check className="h-5 w-5 stroke-[3]" />
            <span>{isFr ? "Réservation Enregistrée dans le Garage !" : "Reservation Added to Garage!"}</span>
          </>
        ) : orderType === "deposit" ? (
          <>
            <Lock className="h-5 w-5" />
            <span>{isFr ? `Réserver ma Monture pour ${depositStr}` : `Lock Allocation for ${depositStr}`}</span>
          </>
        ) : (
          <>
            <ShieldCheck className="h-5 w-5" />
            <span>{isFr ? "Commander avec Séquestre Sécurisé" : "Order with Secured Escrow"}</span>
          </>
        )}
      </button>

      {/* Micro-Trust Explainer */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 text-xs text-zinc-300 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-semibold text-lime-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            {isFr ? "Garantie Sérénité Constructeur" : "Factory Peace-of-Mind Guarantee"}
          </span>
          <span className="text-zinc-400">{isFr ? "14 Jours Rétractation" : "14-Day Return Window"}</span>
        </div>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          {orderType === "deposit"
            ? isFr
              ? `L'acompte de ${depositStr} bloque immédiatement l'attribution de votre numéro de châssis VIN. Notre conseiller showroom vous contacte sous 2h pour finaliser le dossier d'immatriculation et fixer votre créneau de livraison. Le solde (${formatPrice(product.prix - 500)}) est versé après contrôle contradictoire à la livraison.`
              : `The ${depositStr} deposit locks your factory VIN chassis allocation immediately. A workshop concierge contacts you within 2h to organize registration and schedule handover. The remaining balance (${formatPrice(product.prix - 500)}) is paid only after physical vehicle inspection upon delivery.`
            : isFr
            ? `Paiement sécurisé via séquestre bancaire ou financement (${config.financingPartners.join(" • ")}). Aucun prélèvement sans validation de votre certificat d'immatriculation.`
            : `Secured escrow or certified financing (${config.financingPartners.join(" • ")}). Zero funds disbursed before vehicle registration certificate issue.`}
        </p>
      </div>
    </div>
  );
}
