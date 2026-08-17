import { Locale } from "@/i18n/config";
import { Product } from "./types";

export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function productName(product: Product, locale: Locale): string {
  return locale === "en" ? product.nom_en : product.nom;
}

export function productDescription(product: Product, locale: Locale): string {
  return locale === "en" ? product.description_en : product.description;
}

export const FREE_SHIPPING_THRESHOLD = 5000;
export const SHIPPING_FEE = 49;
export const VAT_RATE = 0.2;

export function computeTotals(sousTotalTTC: number) {
  const livraison =
    sousTotalTTC === 0 || sousTotalTTC >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE;
  const total = sousTotalTTC + livraison;
  const tva = total - total / (1 + VAT_RATE);
  return { livraison, tva, total };
}
