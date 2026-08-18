import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { getOrders, saveOrder } from "@/lib/orders";
import { computeTotals } from "@/lib/format";
import { CustomerInfo, Order, OrderItem } from "@/lib/types";

interface OrderPayload {
  items: { productId: string; quantite: number; selectedOptions?: string[]; optionCost?: number }[];
  client: CustomerInfo;
  bonusDeducted?: number;
}

export function GET() {
  return NextResponse.json({ orders: getOrders() });
}

export async function POST(request: NextRequest) {
  let payload: OrderPayload;
  try {
    payload = (await request.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload.items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const requiredFields: (keyof CustomerInfo)[] = [
    "prenom",
    "nom",
    "email",
    "adresse",
    "ville",
    "codePostal",
    "pays",
  ];
  for (const field of requiredFields) {
    if (!payload.client?.[field]?.trim()) {
      return NextResponse.json(
        { error: `Missing field: ${field}` },
        { status: 400 }
      );
    }
  }

  const orderItems: OrderItem[] = [];
  for (const line of payload.items) {
    const product = getProduct(line.productId);
    if (!product) {
      return NextResponse.json(
        { error: `Unknown product: ${line.productId}` },
        { status: 400 }
      );
    }
    if (line.quantite < 1 || line.quantite > product.stock) {
      return NextResponse.json(
        { error: `Invalid quantity for ${product.nom}` },
        { status: 400 }
      );
    }
    orderItems.push({
      id: `${line.productId}-${orderItems.length}`,
      productId: product.id,
      nom: product.nom,
      prix: product.prix,
      quantite: line.quantite,
      selectedOptions: line.selectedOptions,
      optionCost: line.optionCost,
    });
  }

  const sousTotal = orderItems.reduce(
    (s, i) => s + (i.prix + (i.optionCost || 0)) * i.quantite,
    0
  );
  const bonusDeducted = payload.bonusDeducted || 0;
  const { livraison, tva, total } = computeTotals(sousTotal, bonusDeducted);

  const order: Order = {
    id: `EV-${Date.now().toString(36).toUpperCase()}`,
    items: orderItems,
    sousTotal,
    bonusDeducted,
    livraison,
    tva: Math.round(tva * 100) / 100,
    immatriculation: 0,
    total,
    statut: "confirmed",
    client: payload.client,
    createdAt: new Date().toISOString(),
  };

  saveOrder(order);
  return NextResponse.json({ order }, { status: 201 });
}
