import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";
import { Product, ProductType, LicenseCategory } from "@/lib/types";

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const type = params.get("type");
  const license = params.get("license");
  const maxPrice = params.get("maxPrice");
  const minRange = params.get("minRange");
  const minSpeed = params.get("minSpeed");
  const motorPower = params.get("motorPower");
  const removableBattery = params.get("removableBattery");
  const ecoBonus = params.get("ecoBonus");
  const search = params.get("search")?.toLowerCase().trim();
  const sort = params.get("sort");

  let result: Product[] = [...products];

  // Search
  if (search) {
    result = result.filter(
      (p) =>
        p.nom.toLowerCase().includes(search) ||
        p.nom_en.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.category_label.toLowerCase().includes(search) ||
        p.moteur.toLowerCase().includes(search) ||
        p.license_label_fr.toLowerCase().includes(search)
    );
  }

  // Type
  if (type === "velo" || type === "moto") {
    result = result.filter((p) => p.type === (type as ProductType));
  }

  // License category
  if (license && license !== "all") {
    result = result.filter((p) => p.license_category === (license as LicenseCategory));
  }

  // Max price
  if (maxPrice) {
    const max = Number(maxPrice);
    if (!Number.isNaN(max)) result = result.filter((p) => p.prix <= max);
  }

  // Min range
  if (minRange) {
    const min = Number(minRange);
    if (!Number.isNaN(min)) result = result.filter((p) => p.autonomie_km >= min);
  }

  // Min speed
  if (minSpeed) {
    const min = Number(minSpeed);
    if (!Number.isNaN(min)) result = result.filter((p) => p.vitesse_max >= min);
  }

  // Removable battery
  if (removableBattery === "true") {
    result = result.filter((p) => p.battery_specs.removable);
  }

  // Eco bonus
  if (ecoBonus === "true") {
    result = result.filter((p) => p.eco_bonus_eligible);
  }

  // Motor power bucket
  if (motorPower && motorPower !== "all") {
    result = result.filter((p) => {
      const peakKw = p.motor_specs?.power_peak_kw || 0;
      if (motorPower === "250w") return peakKw <= 0.6;
      if (motorPower === "500w-11kw") return peakKw > 0.6 && peakKw <= 11;
      if (motorPower === "11kw-35kw") return peakKw > 11 && peakKw <= 35;
      if (motorPower === "35kw+") return peakKw > 35;
      return true;
    });
  }

  // Sorting
  if (sort === "price-asc") result.sort((a, b) => a.prix - b.prix);
  else if (sort === "price-desc") result.sort((a, b) => b.prix - a.prix);
  else if (sort === "range") result.sort((a, b) => b.autonomie_km - a.autonomie_km);
  else if (sort === "speed") result.sort((a, b) => b.vitesse_max - a.vitesse_max);
  else if (sort === "power") result.sort((a, b) => (b.motor_specs?.power_peak_kw || 0) - (a.motor_specs?.power_peak_kw || 0));
  else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

  return NextResponse.json({ products: result, total: result.length });
}
