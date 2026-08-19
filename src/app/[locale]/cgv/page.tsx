import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ShieldCheck, FileCheck, RotateCcw, Truck, CreditCard } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isFr = params.locale === "fr";
  return {
    title: isFr
      ? "Conditions Générales de Vente & Rétractation 14J | eVolt Apex"
      : "Terms of Sale & 14-Day Return Policy | eVolt Apex",
    description: isFr
      ? "Consultez nos conditions générales de vente, notre protocole de livraison spécialisée, notre politique de rétractation 14 jours et les modalités d'avance du bonus écologique."
      : "Official terms and conditions of sale, specialized delivery guarantees, 14-day legal return policy, and government eco-bonus deduction rules.",
  };
}

export default function CgvPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDictionary(params.locale);
  const isFr = params.locale === "fr";

  const breadcrumbs = [
    { name: dict.nav.home, url: `https://evolt-bikes.com/${params.locale}` },
    { name: isFr ? "Conditions Générales de Vente" : "Terms of Sale", url: `https://evolt-bikes.com/${params.locale}/cgv` },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="space-y-4 border-b border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1 text-xs font-bold text-lime-400 uppercase tracking-widest">
          <FileCheck className="h-3.5 w-3.5" />
          <span>{isFr ? "Contrat de Vente & Garanties Consommateur" : "Sales Agreement & Consumer Guarantees"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          {isFr ? "Conditions Générales de Vente (CGV)" : "Terms & Conditions of Sale"}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          {isFr
            ? "Applicables aux commandes passées sur le site evolt-bikes.com ou au showroom Flagship Paris."
            : "Applicable to all orders placed online at evolt-bikes.com or at our Paris Flagship showroom."}
        </p>
      </div>

      <div className="mt-10 space-y-10 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        {/* Article 1 */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-lime-400" />
            {isFr ? "Article 1  Objet & Champ d'Application" : "Article 1  Scope & Purpose"}
          </h2>
          <p>
            {isFr
              ? "Les présentes Conditions Générales de Vente régissent l'ensemble des ventes de motocycles, dirt bikes et vélos électriques neufs conclues entre la société eVolt Apex Technologies SAS (SIREN 921 458 712) et tout acheteur particulier ou professionnel. Tout véhicule vendu bénéficie de la garantie légale de conformité (art. L. 217-4 et suivants du Code de la consommation) et de la garantie constructeur de 5 ans."
              : "These Terms and Conditions govern all sales of new electric motorcycles, dirt bikes, and e-bikes between eVolt Apex Technologies SAS (SIREN 921 458 712) and any consumer or business client. Every vehicle includes official statutory warranty and our 5-year full powertrain & battery warranty."}
          </p>
        </div>

        {/* Article 2 */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-cyan-400" />
            {isFr ? "Article 2  Prix & Déduction Immédiate des Aides d'État" : "Article 2  Pricing & Instant Clean EV Rebates"}
          </h2>
          <p>
            {isFr
              ? "Les prix sont indiqués en Euros Toutes Taxes Comprises (€ TTC) ou devises locales applicables. En vertu de notre convention d'habilitation ministérielle ASP N° ASP-EVOLT-2026-7842, le montant du Bonus Écologique et des aides d'État éligibles est directement déduit du montant à régler lors de la validation du panier. eVolt Apex se charge de l'instruction intégrale du dossier sans avance de trésorerie du client."
              : "Prices are shown in all applicable taxes included (TTC / Net). Through our accredited government EV partnership agreement, clean EV tax rebates and state clean subsidies are deducted upfront at checkout. eVolt Apex processes the official subsidy paperwork with zero upfront capital needed from the customer."}
          </p>
        </div>

        {/* Article 3 */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Truck className="h-5 w-5 text-emerald-400" />
            {isFr ? "Article 3  Modalités de Livraison & Mise en Route Spécialisée" : "Article 3  Specialized Delivery & 50-Point Setup"}
          </h2>
          <p>
            {isFr
              ? "La livraison des véhicules est effectuée exclusivement par des transporteurs spécialisés deux-roues habilités (camion capitonné équipé d'un hayon hydraulique et de sabots de calage). Avant expédition, le véhicule subit un contrôle technique PDI 50 points en atelier. La livraison comprend le déballage, la remise des clés et documents d'immatriculation, et la vérification contradictoire de conformité avec le client."
              : "Vehicle dispatch is handled exclusively by dedicated two-wheeler carriers using padded lift-gate trucks with specialized wheel-lock chocks. Every bike passes our 50-point PDI workshop dyno and torque check. Delivery includes uncrating, handover of keys, title certificate, license plate fitted, and joint physical inspection."}
          </p>
        </div>

        {/* Article 4 */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-amber-400" />
            {isFr ? "Article 4  Droit de Rétractation Légal (14 Jours)" : "Article 4  14-Day Statutory Return Policy"}
          </h2>
          <p>
            {isFr
              ? "Conformément à la réglementation sur la vente à distance, l'acheteur dispose d'un délai de quatorze (14) jours calendaires à compter de la réception physique du véhicule pour exercer son droit de rétractation sans pénalité. Le véhicule doit être restitué dans son état d'origine avec l'ensemble de ses accessoires et documents. Le remboursement intégral intervient sous 14 jours."
              : "In accordance with distance selling regulations, consumers benefit from a 14-calendar-day withdrawal period starting from physical delivery date with zero penalties. The machine must be returned in original condition with all documentation and accessories. Full refund is completed within 14 days."}
          </p>
        </div>
      </div>
    </div>
  );
}
