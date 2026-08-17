"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Locale } from "@/i18n/config";
import { Dictionary } from "@/i18n/dictionaries";
import { computeTotals, formatPrice, productName } from "@/lib/format";
import { getProduct } from "@/lib/products";
import { CustomerInfo, Order } from "@/lib/types";
import { useCartStore } from "@/store/cart";

const EMPTY_FORM: CustomerInfo = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  adresse: "",
  ville: "",
  codePostal: "",
  pays: "France",
};

export default function CheckoutClient({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { items, clear } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<CustomerInfo>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => setMounted(true), []);

  const t = dict.checkout;

  if (!mounted) return <div className="mt-8 text-zinc-500">…</div>;

  if (order) {
    return (
      <div className="mt-10 mx-auto max-w-lg rounded-2xl border border-lime-400/30 bg-zinc-900 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-2xl text-zinc-950">
          ✓
        </div>
        <h2 className="mt-4 text-2xl font-bold text-white">{t.success}</h2>
        <p className="mt-2 text-zinc-400">{t.successMessage}</p>
        <p className="mt-4 text-sm text-zinc-400">
          {t.orderNumber} :{" "}
          <span className="font-mono font-semibold text-lime-400">
            {order.id}
          </span>
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          {dict.cart.grandTotal} :{" "}
          <span className="font-semibold text-white">
            {formatPrice(order.total, locale)}
          </span>
        </p>
        <Link
          href={`/${locale}/catalogue`}
          className="mt-8 inline-block rounded-full bg-lime-400 px-6 py-2.5 font-semibold text-zinc-950 transition hover:bg-lime-300"
        >
          {t.continueShopping}
        </Link>
      </div>
    );
  }

  const lines = items
    .map((item) => ({ item, product: getProduct(item.productId) }))
    .filter(
      (l): l is { item: (typeof items)[number]; product: NonNullable<ReturnType<typeof getProduct>> } =>
        l.product !== undefined
    );

  if (lines.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">
        <p className="text-zinc-400">{t.emptyCart}</p>
        <Link
          href={`/${locale}/catalogue`}
          className="mt-6 inline-block rounded-full bg-lime-400 px-6 py-2.5 font-semibold text-zinc-950 transition hover:bg-lime-300"
        >
          {dict.cart.browse}
        </Link>
      </div>
    );
  }

  const sousTotal = lines.reduce(
    (sum, { item, product }) => sum + product.prix * item.quantite,
    0
  );
  const { livraison, tva, total } = computeTotals(sousTotal);

  function setField(field: keyof CustomerInfo, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof CustomerInfo, string>> = {};
    const required: (keyof CustomerInfo)[] = [
      "prenom",
      "nom",
      "email",
      "adresse",
      "ville",
      "codePostal",
      "pays",
    ];
    for (const field of required) {
      if (!form[field].trim()) next[field] = t.required;
    }
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = t.invalidEmail;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            quantite: i.quantite,
          })),
          client: form,
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      const data = (await res.json()) as { order: Order };
      clear();
      setOrder(data.order);
    } catch {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-lime-400 focus:outline-none";
  const errorClass = "mt-1 text-xs text-red-400";

  function field(
    name: keyof CustomerInfo,
    label: string,
    type = "text",
    span = false
  ) {
    return (
      <div className={span ? "sm:col-span-2" : ""}>
        <label
          htmlFor={name}
          className="mb-1.5 block text-sm font-medium text-zinc-300"
        >
          {label}
        </label>
        <input
          id={name}
          type={type}
          value={form[name]}
          onChange={(e) => setField(name, e.target.value)}
          className={`${inputClass} ${errors[name] ? "border-red-400" : ""}`}
        />
        {errors[name] && <p className={errorClass}>{errors[name]}</p>}
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 font-semibold text-white">{t.contact}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {field("prenom", t.firstName)}
            {field("nom", t.lastName)}
            {field("email", t.email, "email")}
            {field("telephone", t.phone, "tel")}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 font-semibold text-white">
            {t.shippingAddress}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {field("adresse", t.address, "text", true)}
            {field("ville", t.city)}
            {field("codePostal", t.postalCode)}
            {field("pays", t.country, "text", true)}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-1 font-semibold text-white">{t.payment}</h2>
          <p className="mb-4 text-xs text-zinc-500">{t.paymentNote}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="cardNumber"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                {t.cardNumber}
              </label>
              <input
                id="cardNumber"
                type="text"
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="expiry"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                {t.expiry}
              </label>
              <input
                id="expiry"
                type="text"
                placeholder="12/28"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="cvc"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                {t.cvc}
              </label>
              <input
                id="cvc"
                type="text"
                inputMode="numeric"
                placeholder="123"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-lime-400 px-8 py-3.5 font-semibold text-zinc-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? t.processing : t.placeOrder}
        </button>
      </form>

      <aside className="h-fit space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 lg:sticky lg:top-20">
        <h2 className="font-semibold text-white">{t.orderSummary}</h2>
        <ul className="space-y-3 text-sm">
          {lines.map(({ item, product }) => (
            <li key={item.productId} className="flex justify-between gap-4">
              <span className="text-zinc-400">
                {productName(product, locale)}{" "}
                <span className="text-zinc-600">× {item.quantite}</span>
              </span>
              <span className="shrink-0 text-zinc-100">
                {formatPrice(product.prix * item.quantite, locale)}
              </span>
            </li>
          ))}
        </ul>
        <dl className="space-y-2 border-t border-zinc-800 pt-4 text-sm">
          <div className="flex justify-between text-zinc-400">
            <dt>{dict.cart.subtotal}</dt>
            <dd className="text-zinc-100">{formatPrice(sousTotal, locale)}</dd>
          </div>
          <div className="flex justify-between text-zinc-400">
            <dt>{dict.cart.shipping}</dt>
            <dd className="text-zinc-100">
              {livraison === 0
                ? dict.cart.freeShipping
                : formatPrice(livraison, locale)}
            </dd>
          </div>
          <div className="flex justify-between text-zinc-400">
            <dt>{dict.cart.vat}</dt>
            <dd className="text-zinc-100">{formatPrice(tva, locale)}</dd>
          </div>
          <div className="flex justify-between border-t border-zinc-800 pt-2 text-base font-bold">
            <dt className="text-white">{dict.cart.grandTotal}</dt>
            <dd className="text-lime-400">{formatPrice(total, locale)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
