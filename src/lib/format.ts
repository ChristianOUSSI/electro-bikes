import { Locale } from "@/i18n/config";
import { Product, LicenseCategory, ProductOption, ProductReview } from "./types";

export function formatPrice(price: number, locale: Locale | string = "fr"): string {
  if (locale === "fr") {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceDiscount(
  original: number,
  discounted: number,
  locale: Locale | string = "fr"
): { formattedOriginal: string; formattedDiscounted: string; savingsPercent: number } {
  const savingsPercent = Math.round(((original - discounted) / original) * 100);
  return {
    formattedOriginal: formatPrice(original, locale),
    formattedDiscounted: formatPrice(discounted, locale),
    savingsPercent,
  };
}

export function productName(product: Product, locale: Locale | string = "fr"): string {
  return locale === "en" ? product.nom_en || product.nom : product.nom;
}

export function productSubtitle(product: Product, locale: Locale | string = "fr"): string {
  return locale === "en"
    ? product.highlight_subtitle_en || product.highlight_subtitle
    : product.highlight_subtitle;
}

export function productCategory(product: Product, locale: Locale | string = "fr"): string {
  return locale === "en"
    ? product.category_label_en || product.category_label
    : product.category_label;
}

export function productDescription(
  product: Product,
  locale: Locale | string = "fr"
): string {
  return locale === "en"
    ? product.description_en || product.description
    : product.description;
}

export function productDeliveryLabel(
  product: Product,
  locale: Locale | string = "fr"
): string {
  return locale === "en"
    ? product.delivery_time_label_en || "48-72h specialized delivery with lift-gate truck & 50-point PDI"
    : product.delivery_time_label || "Livraison sécurisée sous 48-72h par transporteur spécialisé 2-roues avec hayon hydraulique & mise en route PDI 50 points.";
}

export function productOptionName(option: ProductOption, locale: Locale | string = "fr"): string {
  return locale === "en" ? option.name_en || option.name : option.name;
}

export function productOptionDesc(option: ProductOption, locale: Locale | string = "fr"): string {
  return locale === "en" ? option.description_en || option.description : option.description;
}

export function productReviewTitle(review: ProductReview, locale: Locale | string = "fr"): string {
  return locale === "en" ? review.title_en || review.title : review.title;
}

export function productReviewComment(review: ProductReview, locale: Locale | string = "fr"): string {
  return locale === "en" ? review.comment_en || review.comment : review.comment;
}

export function computeTotals(sousTotal: number, bonusTotal: number = 0) {
  const livraison = sousTotal >= 3000 ? 0 : sousTotal > 0 ? 150 : 0;
  const tva = Math.round((sousTotal / 1.2) * 0.2);
  const total = Math.max(0, sousTotal + livraison - bonusTotal);
  return {
    sousTotal,
    bonusTotal,
    livraison,
    tva,
    total,
  };
}

export function getLicenseBadgeInfo(category: LicenseCategory, locale: Locale | string = "fr") {
  switch (category) {
    case "none":
      return {
        code: locale === "fr" ? "VAE" : "e-Bike",
        label: locale === "fr" ? "Sans Permis (25 km/h)" : "No License (25 km/h / 20 mph)",
        bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        tooltip: locale === "fr" ? "Accessible à tous dès 12 ans sur pistes cyclables" : "Accessible to all on bike paths",
      };
    case "speed_pedelec":
      return {
        code: locale === "fr" ? "45 km/h" : "28 mph",
        label: locale === "fr" ? "Permis AM / B (Speed-Bike)" : "License AM / Car (Speed-Pedelec)",
        bg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
        tooltip: locale === "fr" ? "Dès 14 ans avec BSR/AM ou permis voiture (casque + plaque)" : "14yo+ with AM or Car license (helmet & plate required)",
      };
    case "AM":
      return {
        code: locale === "fr" ? "Permis AM" : "AM License",
        label: locale === "fr" ? "Permis AM dès 14 ans (Équiv. 50cc)" : "AM License from 14yo (50cc equiv)",
        bg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
        tooltip: locale === "fr" ? "Accessible dès 14 ans avec formation BSR" : "Available from 14yo",
      };
    case "A1_B":
      return {
        code: locale === "fr" ? "Permis 125 / B" : "125cc / Car",
        label: locale === "fr" ? "Permis A1 ou Permis B + 7h (Équiv. 125)" : "A1 or Car + 7h course (125cc)",
        bg: "bg-lime-500/10 text-lime-400 border-lime-500/30",
        tooltip: locale === "fr" ? "Dès 16 ans (A1) ou Permis B avec 2 ans d'ancienneté + stage 7h" : "From 16yo (A1) or 2-year car license + 7h course",
      };
    case "A2":
      return {
        code: locale === "fr" ? "Permis A2" : "License A2",
        label: locale === "fr" ? "Permis Moto A2 (≤ 35 kW)" : "Motorcycle License A2 (≤ 35 kW)",
        bg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        tooltip: locale === "fr" ? "Accessible dès 18 ans avec examen permis A2" : "18yo+ with A2 motorcycle license",
      };
    case "A":
      return {
        code: locale === "fr" ? "Permis A" : "Full License A",
        label: locale === "fr" ? "Permis A (Pleine Puissance)" : "Full License A (Unrestricted)",
        bg: "bg-purple-500/10 text-purple-400 border-purple-500/30",
        tooltip: locale === "fr" ? "Toutes puissances sans bridage" : "Full unrestricted power",
      };
    case "offroad":
      return {
        code: locale === "fr" ? "Off-Road" : "Off-Road Only",
        label: locale === "fr" ? "Terrain Privé & Circuit (Non Homologué)" : "Private Property & Track (Off-Road)",
        bg: "bg-red-500/10 text-red-400 border-red-500/30",
        tooltip: locale === "fr" ? "Usage exclusif sur terrain fermé" : "Closed circuit / private land only",
      };
  }
}
