"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LicenseCategory } from "@/lib/types";

export type RegionCode = "FR" | "US" | "CA";

export interface RegionConfig {
  code: RegionCode;
  name: string;
  flag: string;
  currency: "EUR" | "USD" | "CAD";
  currencySymbol: string;
  exchangeRateFromEUR: number;
  unitSystem: "metric" | "imperial";
  incentiveName: string;
  incentiveMaxAmount: number;
  incentiveDescription: string;
  depositAmount: number; // e.g. 500 EUR, 500 USD, 650 CAD
  taxNotice: string;
  financingPartners: string[];
}

export const REGIONS: Record<RegionCode, RegionConfig> = {
  FR: {
    code: "FR",
    name: "France & Union Européenne",
    flag: "🇫🇷",
    currency: "EUR",
    currencySymbol: "€",
    exchangeRateFromEUR: 1.0,
    unitSystem: "metric",
    incentiveName: "Bonus Écologique d'État ASP",
    incentiveMaxAmount: 2500,
    incentiveDescription: "Déduit immédiatement sous convention ministérielle ASP",
    depositAmount: 500,
    taxNotice: "Prix TTC • Carte grise & mise en route incluses",
    financingPartners: ["BNP Paribas", "Sofinco LOA 0%", "Alma 3x/4x/10x", "AXA"],
  },
  US: {
    code: "US",
    name: "United States (Federal & States)",
    flag: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    exchangeRateFromEUR: 1.08,
    unitSystem: "imperial",
    incentiveName: "Federal EV Clean Vehicle Credit",
    incentiveMaxAmount: 7500,
    incentiveDescription: "IRC 30D / 25E Clean Vehicle Federal Tax Incentive",
    depositAmount: 500,
    taxNotice: "MSRP (Excl. State Sales Tax & Title Registration)",
    financingPartners: ["Affirm (0% APR)", "Klarna", "PayPal Credit", "Escrow.com"],
  },
  CA: {
    code: "CA",
    name: "Canada (Federal & Provinces)",
    flag: "🇨🇦",
    currency: "CAD",
    currencySymbol: "CA$",
    exchangeRateFromEUR: 1.48,
    unitSystem: "metric",
    incentiveName: "Transport Canada iZEV Program",
    incentiveMaxAmount: 5000,
    incentiveDescription: "Incentives for Zero-Emission Vehicles (iZEV & Roulez vert)",
    depositAmount: 650,
    taxNotice: "MSRP (Excl. GST/PST/HST & Provincial Registration)",
    financingPartners: ["Affirm Canada", "Desjardins Auto", "PayPlan", "Stripe 3DS2"],
  },
};

interface RegionState {
  region: RegionCode;
  setRegion: (region: RegionCode) => void;
  getConfig: () => RegionConfig;
  formatPrice: (amountEUR: number) => string;
  formatDeposit: () => string;
  formatDistance: (km: number) => string;
  formatSpeed: (kmh: number) => string;
  formatWeight: (kg: number) => string;
  getLicenseLabel: (category: LicenseCategory, locale: string) => { code: string; label: string; bg: string };
  getIncentiveLabel: () => string;
}

export const useRegionStore = create<RegionState>()(
  persist(
    (set, get) => ({
      region: "FR",
      setRegion: (region) => set({ region }),
      getConfig: () => REGIONS[get().region] || REGIONS.FR,

      formatPrice: (amountEUR: number) => {
        const config = REGIONS[get().region] || REGIONS.FR;
        const converted = Math.round(amountEUR * config.exchangeRateFromEUR);
        if (config.currency === "EUR") {
          return `${converted.toLocaleString("fr-FR")} €`;
        }
        if (config.currency === "USD") {
          return `$${converted.toLocaleString("en-US")}`;
        }
        return `CA$${converted.toLocaleString("en-US")}`;
      },

      formatDeposit: () => {
        const config = REGIONS[get().region] || REGIONS.FR;
        if (config.currency === "EUR") return "500 €";
        if (config.currency === "USD") return "$500";
        return "CA$650";
      },

      formatDistance: (km: number) => {
        const config = REGIONS[get().region] || REGIONS.FR;
        if (config.unitSystem === "imperial") {
          const miles = Math.round(km * 0.621371);
          return `${miles} mi`;
        }
        return `${km} km`;
      },

      formatSpeed: (kmh: number) => {
        const config = REGIONS[get().region] || REGIONS.FR;
        if (config.unitSystem === "imperial") {
          const mph = Math.round(kmh * 0.621371);
          return `${mph} mph`;
        }
        return `${kmh} km/h`;
      },

      formatWeight: (kg: number) => {
        const config = REGIONS[get().region] || REGIONS.FR;
        if (config.unitSystem === "imperial") {
          const lbs = Math.round(kg * 2.20462);
          return `${lbs} lbs`;
        }
        return `${kg} kg`;
      },

      getLicenseLabel: (category: LicenseCategory, locale: string) => {
        const { region } = get();
        const isFr = locale === "fr";

        if (region === "US") {
          switch (category) {
            case "none":
              return { code: "No License", label: "Class 1/2/3 e-Bike (No License Required)", bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" };
            case "speed_pedelec":
              return { code: "Class 3", label: "Class 3 Speed e-Bike (28 mph / Helmet)", bg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" };
            case "AM":
              return { code: "Moped", label: "Standard Driver's License or Moped Permit", bg: "bg-blue-500/10 text-blue-400 border-blue-500/30" };
            case "A1_B":
            case "A2":
            case "A":
              return { code: "Class M", label: "Motorcycle Endorsement (Class M License)", bg: "bg-amber-500/10 text-amber-400 border-amber-500/30" };
            case "offroad":
              return { code: "Off-Road", label: "Off-Highway Vehicle (Private Property / Track Only)", bg: "bg-red-500/10 text-red-400 border-red-500/30" };
            default:
              return { code: "License", label: "License Required", bg: "bg-gray-500/10 text-gray-400 border-gray-500/30" };
          }
        }

        if (region === "CA") {
          switch (category) {
            case "none":
              return { code: "No License", label: "Power-Assisted Bicycle (PAB / No License)", bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" };
            case "speed_pedelec":
              return { code: "Class 6D", label: "Class 6D or Standard Driver's License", bg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" };
            case "AM":
              return { code: "Permis 6D", label: "Permis Apprenti ou Permis Auto", bg: "bg-blue-500/10 text-blue-400 border-blue-500/30" };
            case "A1_B":
            case "A2":
            case "A":
              return { code: "Class 6", label: "Permis Moto Classe 6 (6A/6B/6C)", bg: "bg-amber-500/10 text-amber-400 border-amber-500/30" };
            case "offroad":
              return { code: "Off-Road", label: "Sentiers FQMHR & Terrains Privés Uniquement", bg: "bg-red-500/10 text-red-400 border-red-500/30" };
            default:
              return { code: "License", label: "License Required", bg: "bg-gray-500/10 text-gray-400 border-gray-500/30" };
          }
        }

        // Default France / Europe
        switch (category) {
          case "none":
            return { code: "Sans Permis", label: isFr ? "Sans Permis (Dès 14 ans)" : "No License Required", bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" };
          case "speed_pedelec":
            return { code: "45 km/h", label: isFr ? "Speed-Bike 45 km/h (Permis AM ou B)" : "Speed-Pedelec 45 km/h", bg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" };
          case "AM":
            return { code: "Permis AM", label: isFr ? "Équivalent 50cc (Permis AM dès 14 ans)" : "50cc Equivalent (AM License)", bg: "bg-blue-500/10 text-blue-400 border-blue-500/30" };
          case "A1_B":
            return { code: "125cc", label: isFr ? "Équivalent 125cc (Permis A1 ou Permis B + formation 7h)" : "125cc Equivalent (A1 or B License)", bg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" };
          case "A2":
            return { code: "Permis A2", label: isFr ? "Moto A2 (Jusqu'à 35 kW / 47.6 ch)" : "A2 Motorcycle (Up to 35 kW)", bg: "bg-purple-500/10 text-purple-400 border-purple-500/30" };
          case "A":
            return { code: "Permis A", label: isFr ? "Permis A (Pleine Puissance > 35 kW)" : "Full Motorcycle License A", bg: "bg-amber-500/10 text-amber-400 border-amber-500/30" };
          case "offroad":
            return { code: "Off-Road", label: isFr ? "Terrain Privé & Circuit Uniquement (Non Homologué Route)" : "Private Property & Race Track Only", bg: "bg-red-500/10 text-red-400 border-red-500/30" };
          default:
            return { code: "License", label: "License Required", bg: "bg-gray-500/10 text-gray-400 border-gray-500/30" };
        }
      },

      getIncentiveLabel: () => {
        const config = REGIONS[get().region] || REGIONS.FR;
        return config.incentiveName;
      },
    }),
    {
      name: "evolt-region-storage",
    }
  )
);
