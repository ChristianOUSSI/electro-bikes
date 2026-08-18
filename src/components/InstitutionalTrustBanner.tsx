"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Phone,
  Truck,
  CheckCircle2,
  Star,
  Lock,
  BadgeCheck,
} from "lucide-react";

export default function InstitutionalTrustBanner({
  locale,
}: {
  locale: string;
}) {
  const isFr = locale === "fr";

  return (
    <section className="border-y border-zinc-800 bg-zinc-950/90 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lime-400 mb-1">
              <BadgeCheck className="h-4 w-4" />
              <span>{isFr ? "Transparence Totale & Garantie Institutionnelle" : "Total Transparency & Institutional Guarantee"}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isFr ? "Une Entreprise Réelle, un Showroom Physique & Zéro Duperie" : "A Real French Dealership, Physical Showroom & Zero Fake Claims"}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-700 px-4 py-2 text-xs font-semibold text-white hover:border-lime-400 hover:text-lime-400 transition"
            >
              <Building2 className="h-3.5 w-3.5 text-lime-400" />
              <span>{isFr ? "Visiter le Showroom Paris" : "Visit Paris Showroom"}</span>
            </Link>
            <Link
              href={`/${locale}/delivery-pipeline`}
              className="inline-flex items-center gap-1.5 rounded-full bg-lime-400 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-lime-300 transition shadow-glow-lime"
            >
              <Truck className="h-3.5 w-3.5" />
              <span>{isFr ? "Pipeline Livraison 2-Roues" : "Specialized 2-Wheel Logistics"}</span>
            </Link>
          </div>
        </div>

        {/* 4 Pillars of Institutional Trust */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Pillar 1: Physical Showroom */}
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/50 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-400 border border-lime-400/20">
              <Building2 className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-white text-base">
              {isFr ? "Showroom Flagship Paris" : "Paris Flagship Showroom"}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {isFr
                ? "18 Avenue de la Grande Armée, 75017 Paris. 850 m² d'exposition, atelier de révision certifié et véhicules d'essai disponibles du lundi au samedi."
                : "18 Avenue de la Grande Armée, 75017 Paris. 850 m² flagship store, certified PDI workshop, and test ride fleet ready Monday to Saturday."}
            </p>
            <div className="pt-1 text-[11px] text-zinc-500 font-mono">
              SIREN : 921 458 712 RCS Paris • Cap. 500 000 €
            </div>
          </div>

          {/* Pillar 2: Advance bonus agreement */}
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/50 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-white text-base">
              {isFr ? "Agrément Ministériel ASP" : "Official ASP Agreement"}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {isFr
                ? "Habilitation d'État N° ASP-EVOLT-2026. Nous avançons directement jusqu'à 2 500 € de Bonus Écologique sans avance de frais pour vous."
                : "French Government Agreement N° ASP-EVOLT-2026. We advance up to €2,500 in state eco-grants deducted directly at checkout."}
            </p>
            <div className="pt-1 text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{isFr ? "Convention officielle certifiée" : "Certified State Convention"}</span>
            </div>
          </div>

          {/* Pillar 3: Logistics & specialized delivery */}
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/50 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              <Truck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-white text-base">
              {isFr ? "Transporteur Spécialisé 2-Roues" : "Dedicated 2-Wheel Carrier"}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {isFr
                ? "Livraison sur camion capitonné avec hayon hydraulique. Déballage, contrôle PDI 50 points et carte grise posée avec plaque avant remise des clés."
                : "Delivered via padded lift-gate trucks. Unboxing, 50-point PDI quality control, and pre-fitted license plate upon handover."}
            </p>
            <div className="pt-1 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{isFr ? "Mise en route incluse à domicile" : "Turnkey Home Onboarding"}</span>
            </div>
          </div>

          {/* Pillar 4: Financing & Verified Reviews */}
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/50 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Lock className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-white text-base">
              {isFr ? "Paiements & Financement Agréé" : "Secured & Certified Financing"}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {isFr
                ? "Partenariats bancaires officiels BNP Paribas, Cetelem, Sofinco (LOA/Crédit 0%), Stripe 3D-Secure et séquestre notarié pour les véhicules premium."
                : "Official banking partners BNP Paribas, Cetelem, Sofinco 0% lease, Stripe 3D-Secure 2.0, and escrow options for high-value vehicles."}
            </p>
            <div className="pt-1 text-[11px] text-amber-400 font-semibold flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <span>{isFr ? "4.87 / 5 • 1 420 Avis AFNOR Vérifiés" : "4.87 / 5 • 1,420 Verified Reviews"}</span>
            </div>
          </div>
        </div>

        {/* Partners Logo & Certifications Ribbon */}
        <div className="mt-10 rounded-2xl bg-zinc-900/30 border border-zinc-800 p-4 flex flex-wrap items-center justify-between gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">
              {isFr ? "Partenaires Bancaires & Financement :" : "Banking & Financing Partners:"}
            </span>
            <span className="text-zinc-500">BNP Paribas • Cetelem • Sofinco LOA • Alma 3x/4x • Stripe 3DS2</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="h-4 w-4" />
              {isFr ? "Garantie Financière AXA Assurances" : "AXA Insurance Coverage"}
            </span>
            <span className="text-zinc-600">|</span>
            <span className="flex items-center gap-1 text-zinc-300">
              <Phone className="h-3.5 w-3.5 text-lime-400" />
              {isFr ? "Support Showroom : +33 1 45 78 90 00" : "Showroom Hotline: +33 1 45 78 90 00"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
