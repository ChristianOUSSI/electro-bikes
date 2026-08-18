"use client";

import { useState } from "react";
import Link from "next/link";
import { Dictionary } from "@/i18n/dictionaries";
import { LicenseCategory } from "@/lib/types";
import { X, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

interface LicenseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict: Dictionary;
  locale: string;
}

export default function LicenseGuideModal({
  isOpen,
  onClose,
  dict,
  locale,
}: LicenseGuideModalProps) {
  const [selectedSituation, setSelectedSituation] = useState<LicenseCategory | null>(null);
  const isFr = locale === "fr";

  if (!isOpen) return null;

  const licenseOptions: {
    category: LicenseCategory;
    title: string;
    description: string;
    badge: string;
    speedMax: string;
    tracksAuthorized: string;
  }[] = isFr
    ? [
        {
          category: "none",
          title: "Sans Permis (VAE 250W)",
          description: "Dès 12 ans sans aucun examen ni carte grise. Pistes cyclables, voies vertes et ville.",
          badge: "25 km/h Max • Aucune assurance obligatoire",
          speedMax: "25 km/h",
          tracksAuthorized: "Pistes cyclables & Routes",
        },
        {
          category: "speed_pedelec",
          title: "Speed-Bike 45 km/h (L1e-B)",
          description: "Dès 14 ans avec BSR/AM ou Permis B voiture. Remplacement direct de la voiture en banlieue.",
          badge: "45 km/h • Casque moto + Plaque + Carte Grise",
          speedMax: "45 km/h",
          tracksAuthorized: "Routes uniquement (Pistes cyclables exclues)",
        },
        {
          category: "AM",
          title: "Permis AM (Équivalent 50cc)",
          description: "Accessible dès 14 ans après une simple formation théorique (ASSR) et pratique (8h en auto-école).",
          badge: "45 km/h • Scooters urbains légers",
          speedMax: "45 km/h",
          tracksAuthorized: "Routes & Agglomération",
        },
        {
          category: "A1_B",
          title: "Permis A1 ou Permis B + Formation 7h (Équivalent 125cc)",
          description: "Dès 16 ans (permis A1) ou Permis B auto avec 2 ans d'ancienneté + stage de 7 heures sans examen.",
          badge: "Jusqu'à 11 kW (15 ch) • Voies rapides & Périurbain",
          speedMax: "100-115 km/h",
          tracksAuthorized: "Toutes routes & Voies rapides",
        },
        {
          category: "A2",
          title: "Permis Moto A2",
          description: "Dès 18 ans avec passage de l'épreuve pratique moto. Puissance max de 35 kW (47,6 ch).",
          badge: "Jusqu'à 35 kW • Accélération instantanée supérieure aux 600cc thermiques",
          speedMax: "150-180 km/h",
          tracksAuthorized: "Toutes routes & Autoroutes",
        },
        {
          category: "A",
          title: "Permis Moto A (Pleine Puissance)",
          description: "Toutes cylindrées et puissances sans aucun bridage. Pour les roadsters et sportives d'élite.",
          badge: "Plus de 35 kW (jusqu'à 135 kW / 184 ch) • 0-100 en moins de 3s",
          speedMax: "200-245 km/h",
          tracksAuthorized: "Toutes routes & Circuits",
        },
        {
          category: "offroad",
          title: "100% Off-Road & Cross (Non homologué route)",
          description: "Motos dirt 72V type Sur-Ron / Talaria compétition réservées aux pistes fermées et terrains privés.",
          badge: "Usage circuit et forêt privée uniquement • Zéro restriction de puissance",
          speedMax: "90-100 km/h",
          tracksAuthorized: "Terrains privés & Circuits cross uniquement",
        },
      ]
    : [
        {
          category: "none",
          title: "No License / Class 1-2 e-Bikes (250-750W)",
          description: "No driver's license, title, or registration needed. Suitable for bike lanes, trails, and urban commuting.",
          badge: "20-28 mph Max • Commuter & Cargo friendly",
          speedMax: "20-28 mph (32-45 km/h)",
          tracksAuthorized: "Bike Paths & City Streets",
        },
        {
          category: "speed_pedelec",
          title: "Class 3 Speed-Pedelec (28 mph / 45 km/h)",
          description: "Standard driver's license or moped permit required. Perfect car alternative for sub-urban daily commutes.",
          badge: "28 mph (45 km/h) • Helmet & Title Required",
          speedMax: "28 mph (45 km/h)",
          tracksAuthorized: "Public Roadways (Bike paths restricted)",
        },
        {
          category: "AM",
          title: "Moped / 50cc Equivalent Permit",
          description: "Standard driver's license or moped endorsement. Lightweight electric scooters and town runabouts.",
          badge: "30 mph (48 km/h) • Urban commuting",
          speedMax: "30 mph (48 km/h)",
          tracksAuthorized: "Urban roads & City Streets",
        },
        {
          category: "A1_B",
          title: "125cc Equivalent / Light Motorcycle (11 kW)",
          description: "Light motorcycle permit or car license with short training course. Capable of expressways and highway cruising.",
          badge: "Up to 11 kW (15 hp) • Highway capable",
          speedMax: "65-72 mph (105-115 km/h)",
          tracksAuthorized: "All Public Roads & Freeways",
        },
        {
          category: "A2",
          title: "Mid-Power Motorcycle (≤ 35 kW / 47 hp)",
          description: "Motorcycle endorsement. Incredible instant torque outperforming 600cc gas bikes off the line.",
          badge: "Up to 35 kW (47.6 hp) • 0-60 in under 4.5s",
          speedMax: "95-110 mph (150-180 km/h)",
          tracksAuthorized: "All Highways & Interstates",
        },
        {
          category: "A",
          title: "Full Motorcycle Endorsement (Class M)",
          description: "Unrestricted displacement and power. For elite electric superbikes and hyper-roadsters.",
          badge: "100+ kW (150+ hp) • 0-60 in sub-3.0s",
          speedMax: "125-155 mph (200-250 km/h)",
          tracksAuthorized: "All Public Roads & Track Days",
        },
        {
          category: "offroad",
          title: "OHV / Dirt-Bike (Closed Course & Private Land)",
          description: "72V high-power machines (Sur-Ron, Talaria, E Ride Pro) built for competition, trails, and MX tracks.",
          badge: "Private Trails & Closed Tracks Only • Unlocked Power",
          speedMax: "55-65 mph (90-105 km/h)",
          tracksAuthorized: "Private property & MX tracks only",
        },
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl border border-zinc-700 bg-zinc-950 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-lime-400" />
              {dict.licenses.modalTitle}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {dict.licenses.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-zinc-800 p-2 text-zinc-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-xs font-bold uppercase tracking-wider text-lime-400 mb-4">
          {dict.licenses.whichOne}
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {licenseOptions.map((opt) => {
            const isSelected = selectedSituation === opt.category;
            return (
              <div
                key={opt.category}
                onClick={() => setSelectedSituation(opt.category)}
                className={`flex flex-col justify-between p-4 rounded-2xl border cursor-pointer transition ${
                  isSelected
                    ? "border-lime-400 bg-lime-400/10 shadow-glow-lime"
                    : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-lime-400" />}
                      {opt.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-lime-400">{opt.badge}</span>
                  <span className="text-zinc-500">{opt.tracksAuthorized}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800 pt-6">
          <p className="text-xs text-zinc-400">
            {isFr
              ? "Toutes nos motos et vélos homologués sont livrés avec certificat de conformité européen COC."
              : "All street-legal motorcycles and e-bikes include official COC certificate of conformity."}
          </p>

          <Link
            href={`/${locale}/catalogue${selectedSituation ? `?permis=${selectedSituation}` : ""}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-2xl bg-lime-400 px-6 py-3 text-xs sm:text-sm font-bold text-zinc-950 hover:bg-lime-300 transition shadow-glow-lime"
          >
            <span>{dict.licenses.btnFind}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
