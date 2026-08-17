import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";
import { Product, ProductType } from "@/lib/types";

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const type = params.get("type");
  const maxPrice = params.get("maxPrice");
  const minRange = params.get("minRange");
  const sort = params.get("sort");

  let result: Product[] = [...products];

  if (type === "velo" || type === "moto") {
    result = result.filter((p) => p.type === (type as ProductType));
  }
  if (maxPrice) {
    const max = Number(maxPrice);
    if (!Number.isNaN(max)) result = result.filter((p) => p.prix <= max);
  }
  if (minRange) {
    const min = Number(minRange);
    if (!Number.isNaN(min))
      result = result.filter((p) => p.autonomie_km >= min);
  }

  if (sort === "price-asc") result.sort((a, b) => a.prix - b.prix);
  else if (sort === "price-desc") result.sort((a, b) => b.prix - a.prix);
  else if (sort === "range") result.sort((a, b) => b.autonomie_km - a.autonomie_km);

  return NextResponse.json({ products: result, total: result.length });
}
