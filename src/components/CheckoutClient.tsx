"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Locale } from "@/i18n/config";
import { Dictionary } from "@/i18n/dictionaries";
import { productName } from "@/lib/format";
import { getProduct } from "@/lib/products";
import { CustomerInfo, Order } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { useRegionStore } from "@/store/region";
import { Lock, ShieldCheck, Sparkles, Truck, ArrowRight, Zap, CreditCard, Phone, CheckCircle2 } from "lucide-react";

const EMPTY_FORM: CustomerInfo = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  adresse: "",
  ville: "",
  codePostal: "",
  pays: "France",
  licenseNumber: "",
  notes: "",
};

export default function CheckoutClient({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { items, clear } = useCartStore();
  const { formatPrice, formatDeposit, getConfig } = useRegionStore();
  const [mounted, setMounted] = useState(false);
  const [paymentMode, setPaymentMode] = useState<"deposit" | "full">("deposit");
  const [form, setForm] = useState<CustomerInfo>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = dict.checkout;
  const config = getConfig();
  const depositStr = formatDeposit();
  const isFr = locale === "fr";

  if (!mounted) return <div className="mt-8 text-zinc-500">{t.loading}</div>;

  if (order) {
    return (
      <div className="mt-10 mx-auto max-w-xl rounded-3xl border border-lime-400/40 bg-zinc-900/90 p-10 text-center shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-400 text-zinc-950 font-black text-2xl shadow-glow-lime">
          ✓
        </div>
        <h2 className="mt-5 text-2xl sm:text-3xl font-black text-white">
          {paymentMode === "deposit" ? t.reservationValidated : t.orderSuccess}
        </h2>
        <p className="mt-2 text-sm text-zinc-300">
          {paymentMode === "deposit"
            ? t.depositConfirmMsg
                .replace("{deposit}", depositStr)
                .replace("{phone}", form.telephone || (isFr ? "votre numéro" : "your number"))
            : t.fullPayConfirmMsg}
        </p>

        <div className="mt-6 rounded-2xl bg-zinc-950/80 p-4 border border-zinc-800 text-left space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">{t.orderNumber}</span>
            <span className="font-mono font-bold text-lime-400">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">{t.paymentMethod}</span>
            <span className="font-semibold text-white">
              {paymentMode === "deposit" ? t.depositRefundable.replace("{deposit}", depositStr) : t.fullPaymentEscrow}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">{t.amountCharged}</span>
            <span className="font-bold text-lime-400">
              {paymentMode === "deposit" ? depositStr : formatPrice(order.total)}
            </span>
          </div>
          <div className="flex justify-between border-t border-zinc-800 pt-2">
            <span className="text-zinc-400">{t.showroomAssistance}</span>
            <span className="font-bold text-white">+33 1 45 78 90 00</span>
          </div>
        </div>

        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-lime-400 px-8 py-3.5 text-sm font-bold text-zinc-950 transition hover:bg-lime-300 shadow-glow-lime"
        >
          <span>{t.backHome}</span>
          <ArrowRight className="h-4 w-4" />
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
      <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-12 text-center">
        <p className="text-zinc-400">{t.emptyCart}</p>
        <Link
          href={`/${locale}/catalogue`}
          className="mt-4 inline-block rounded-xl bg-lime-400 px-6 py-2 text-xs font-bold text-zinc-950 hover:bg-lime-300"
        >
          {t.exploreCatalogue}
        </Link>
      </div>
    );
  }

  const sousTotal = lines.reduce(
    (sum, { item, product }) => sum + (product.prix + (item.optionCost || 0)) * item.quantite,
    0
  );

  const totalBonus = lines.reduce(
    (sum, { item, product }) =>
      sum + (product.eco_bonus_eligible && product.max_eco_bonus ? product.max_eco_bonus : 0) * item.quantite,
    0
  );

  const total = Math.max(0, sousTotal - totalBonus);

  function validate() {
    const errs: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!form.prenom.trim()) errs.prenom = t.errFirstName;
    if (!form.nom.trim()) errs.nom = t.errLastName;
    if (!form.email.includes("@")) errs.email = t.errEmail;
    if (!form.telephone.trim()) errs.telephone = t.errPhone;
    if (!form.adresse.trim()) errs.adresse = t.errAddress;
    if (!form.ville.trim()) errs.ville = t.errCity;
    if (!form.codePostal.trim()) errs.codePostal = t.errPostalCode;
    setErrors(errs);
    return Object.keys(errs).length === 0;
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
          customer: form,
          items,
          total: paymentMode === "deposit" ? 500 : total,
          locale,
          paymentMode,
        }),
      });

      if (!res.ok) throw new Error("Erreur");
      const data: Order = await res.json();
      setOrder(data);
      clear();
    } catch {
      alert(t.errorAlert);
    } finally {
      setSubmitting(false);
    }
  }

  function setField(field: keyof CustomerInfo, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12">
      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
        {/* Step 0: Choose Order Mode (Deposit vs Full) */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-xs font-black text-zinc-950">
                1
              </span>
              {t.step1Title}
            </h2>
            <span className="text-[11px] font-bold text-lime-400 bg-lime-950/40 border border-lime-400/30 px-2.5 py-0.5 rounded-full">
              {t.zeroRisk}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMode("deposit")}
              className={`flex flex-col items-start p-4 rounded-2xl border text-left transition ${
                paymentMode === "deposit"
                  ? "border-lime-400 bg-lime-950/30 shadow-glow-lime"
                  : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="flex items-center gap-1.5 font-bold text-white text-sm">
                  <Zap className="h-4 w-4 text-lime-400" />
                  {t.depositLabel.replace("{deposit}", depositStr)}
                </span>
                <span className="text-[10px] font-bold text-lime-400 bg-lime-400/20 px-2 py-0.5 rounded-full">
                  {t.recommended}
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-300 leading-tight">
                {t.depositDesc.replace("{remaining}", formatPrice(Math.max(0, total - 500)))}
              </p>
              <span className="mt-2 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                {t.refundable14days}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMode("full")}
              className={`flex flex-col items-start p-4 rounded-2xl border text-left transition ${
                paymentMode === "full"
                  ? "border-cyan-400 bg-cyan-950/30 shadow-glow-cyan"
                  : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="flex items-center gap-1.5 font-bold text-white text-sm">
                  <CreditCard className="h-4 w-4 text-cyan-400" />
                  {t.fullPayLabel}
                </span>
                <span className="text-[10px] text-zinc-400">{t.escrow}</span>
              </div>
              <p className="mt-2 text-xs text-zinc-300 leading-tight">
                {t.fullPayDesc
                  .replace("{total}", formatPrice(total))
                  .replace("{partners}", config.financingPartners.slice(0, 2).join(" • "))}
              </p>
              <span className="mt-2 text-[10px] text-zinc-400">
                {t.axaGuarantee}
              </span>
            </button>
          </div>
        </div>

        {/* Step 1: Customer Contact Info */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-md space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-xs font-black text-zinc-950">
              2
            </span>
            {t.contact}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {t.firstName} *
              </label>
              <input
                type="text"
                value={form.prenom}
                onChange={(e) => setField("prenom", e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
              />
              {errors.prenom && <p className="text-xs text-red-400 mt-1">{errors.prenom}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {t.lastName} *
              </label>
              <input
                type="text"
                value={form.nom}
                onChange={(e) => setField("nom", e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
              />
              {errors.nom && <p className="text-xs text-red-400 mt-1">{errors.nom}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {t.email} *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {t.phone} ({t.phoneConfirm}) *
              </label>
              <input
                type="tel"
                value={form.telephone}
                onChange={(e) => setField("telephone", e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
              />
              {errors.telephone && <p className="text-xs text-red-400 mt-1">{errors.telephone}</p>}
            </div>
          </div>
        </div>

        {/* Step 2: Shipping Address */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-md space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-xs font-black text-zinc-950">
              3
            </span>
            {t.shippingAddress} ({t.shippingSubtitle})
          </h2>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              {t.address} *
            </label>
            <input
              type="text"
              value={form.adresse}
              onChange={(e) => setField("adresse", e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
            />
            {errors.adresse && <p className="text-xs text-red-400 mt-1">{errors.adresse}</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {t.postalCode} *
              </label>
              <input
                type="text"
                value={form.codePostal}
                onChange={(e) => setField("codePostal", e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
              />
              {errors.codePostal && <p className="text-xs text-red-400 mt-1">{errors.codePostal}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {t.city} *
              </label>
              <input
                type="text"
                value={form.ville}
                onChange={(e) => setField("ville", e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
              />
              {errors.ville && <p className="text-xs text-red-400 mt-1">{errors.ville}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                {t.country} *
              </label>
              <select
                value={form.pays}
                onChange={(e) => setField("pays", e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
              >
                <option value="France">France</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Allemagne">Allemagne</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 3: Registration & Legal */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-md space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-xs font-black text-zinc-950">
              4
            </span>
            {t.registration} & {t.step4Title}
          </h2>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              {t.licenseNumber} ({t.optional})
            </label>
            <input
              type="text"
              value={form.licenseNumber}
              onChange={(e) => setField("licenseNumber", e.target.value)}
              placeholder={t.licensePlaceholder}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-lime-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              {t.notes}
            </label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
              placeholder={t.notesPlaceholder}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:border-lime-400 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-lime-400 py-4 text-base font-extrabold text-zinc-950 transition hover:bg-lime-300 shadow-glow-lime disabled:opacity-50"
        >
          <Lock className="h-5 w-5" />
          <span>
            {submitting
              ? t.processing
              : paymentMode === "deposit"
              ? t.validateReservation.replace("{deposit}", depositStr)
              : t.payOrder.replace("{total}", formatPrice(total))}
          </span>
        </button>
      </form>

      {/* Order Summary Column */}
      <aside className="lg:col-span-5 h-fit space-y-5 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-xl lg:sticky lg:top-24">
        <h3 className="font-bold text-white text-lg border-b border-zinc-800 pb-3">
          {t.orderSummary}
        </h3>

        {/* Mini Product list */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {lines.map(({ item, product }) => (
            <div key={item.productId} className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800">
                <Image
                  src={product.image_url}
                  alt={productName(product, locale)}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-xs">
                <p className="font-bold text-white line-clamp-1">{productName(product, locale)}</p>
                <p className="text-zinc-400">{t.qtyLabel} : {item.quantite}</p>
              </div>
              <span className="text-xs font-bold text-lime-400">
                {formatPrice((product.prix + (item.optionCost || 0)) * item.quantite)}
              </span>
            </div>
          ))}
        </div>

        <dl className="space-y-2 border-t border-zinc-800 pt-3 text-xs sm:text-sm">
          <div className="flex justify-between text-zinc-400">
            <dt>{dict.cart.subtotal}</dt>
            <dd className="font-semibold text-white">{formatPrice(sousTotal)}</dd>
          </div>

          {totalBonus > 0 && (
            <div className="flex justify-between text-lime-400 font-semibold">
              <dt className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{config.code === "US" ? "Federal EV Credit" : config.code === "CA" ? "iZEV Incentive" : (isFr ? "Bonus Écologique ASP" : "State Clean Subsidy")}</span>
              </dt>
              <dd>- {formatPrice(totalBonus)}</dd>
            </div>
          )}

          <div className="flex justify-between text-zinc-400">
            <dt>{dict.cart.shipping}</dt>
            <dd className="font-semibold text-emerald-400">{t.freeShippingLabel}</dd>
          </div>

          <div className="flex justify-between border-t border-zinc-800 pt-3 text-base font-black">
            <dt className="text-white">{t.totalVehicle}</dt>
            <dd className="text-white">{formatPrice(total)}</dd>
          </div>

          <div className="flex justify-between rounded-xl bg-lime-950/30 border border-lime-400/30 p-2.5 text-xs font-bold text-lime-400">
            <span>{t.chargedToday}</span>
            <span className="text-sm font-black">
              {paymentMode === "deposit" ? depositStr : formatPrice(total)}
            </span>
          </div>
        </dl>

        {/* Reassurance notes */}
        <div className="space-y-2 border-t border-zinc-800 pt-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2 text-zinc-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{t.escrowAxa}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <Phone className="h-4 w-4 text-lime-400 shrink-0" />
            <span>{t.showroomPhone}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <Truck className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>{t.deliveryPDI}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
