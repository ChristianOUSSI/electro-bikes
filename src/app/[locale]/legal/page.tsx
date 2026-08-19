import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ShieldCheck, Building2, FileText } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isFr = params.locale === "fr";
  return {
    title: isFr
      ? "Mentions Légales & Données Juridiques | eVolt Apex"
      : "Legal Notices & Company Identification | eVolt Apex",
    description: isFr
      ? "Informations juridiques, numéro SIRET, agrément ministériel ASP et coordonnées du siège social de eVolt Apex Technologies SAS."
      : "Official company registry, registration numbers, government ASP agreement, and corporate headquarters information.",
  };
}

export default function LegalPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDictionary(params.locale);
  const isFr = params.locale === "fr";

  const breadcrumbs = [
    { name: dict.nav.home, url: `https://evolt-bikes.com/${params.locale}` },
    { name: isFr ? "Mentions Légales" : "Legal Notices", url: `https://evolt-bikes.com/${params.locale}/legal` },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="space-y-4 border-b border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1 text-xs font-bold text-lime-400 uppercase tracking-widest">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>{isFr ? "Identification Juridique Officielle" : "Official Legal Identification"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          {isFr ? "Mentions Légales & Identité de l'Éditeur" : "Legal Notices & Publisher Identity"}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          {isFr
            ? "Dernière mise à jour légale : 1er Janvier 2026 • Conforme aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN)."
            : "Last legal update: January 1, 2026 • Compliant with EU regulations, LCEN, and e-commerce transparency directives."}
        </p>
      </div>

      <div className="mt-10 space-y-10 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        {/* Section 1 */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Building2 className="h-5 w-5 text-lime-400" />
            {isFr ? "1. Éditeur de la Plateforme" : "1. Platform Publisher"}
          </h2>
          <ul className="space-y-1.5 text-zinc-300">
            <li><strong>{isFr ? "Société :" : "Company:"}</strong> eVolt Apex Technologies SAS</li>
            <li><strong>{isFr ? "Forme juridique :" : "Legal Status:"}</strong> {isFr ? "Société par Actions Simplifiée au capital social de 500 000,00 € entièrement libéré" : "Simplified Joint-Stock Corporation with €500,000.00 fully paid-up capital"}</li>
            <li><strong>{isFr ? "Siège Social & Showroom :" : "Headquarters & Flagship Showroom:"}</strong> 18 Avenue de la Grande Armée, 75017 Paris, France</li>
            <li><strong>RCS :</strong> Paris B 921 458 712</li>
            <li><strong>SIRET :</strong> 921 458 712 00018 • Code NAF/APE : 45.40Z ({isFr ? "Commerce de motocycles" : "Motorcycle retail & distribution"})</li>
            <li><strong>{isFr ? "N° TVA Intracommunautaire :" : "EU VAT Number:"}</strong> FR 48 921458712</li>
            <li><strong>{isFr ? "Agrément Ministériel ASP :" : "Ministerial ASP License:"}</strong> Habilitation N° ASP-EVOLT-2026-7842 ({isFr ? "Avance Bonus Écologique" : "State Clean Rebate Advance Agreement"})</li>
            <li><strong>{isFr ? "Directeur de la Publication :" : "Managing Director / CEO:"}</strong> Marc Vandevelde</li>
            <li><strong>{isFr ? "Ligne Téléphonique :" : "Phone Line:"}</strong> +33 (0)1 45 78 90 00</li>
            <li><strong>{isFr ? "Courriel :" : "Email:"}</strong> legal@evolt-bikes.com / contact@evolt-bikes.com</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-400" />
            {isFr ? "2. Hébergement & Sécurité des Données" : "2. Hosting & Data Security"}
          </h2>
          <p>
            {isFr
              ? "Le site internet est hébergé sur des serveurs haute sécurité situés au sein de l'Union Européenne (France & Allemagne) conformes aux normes ISO 27001 et SOC 2 Type II :"
              : "This website is hosted on high-security enterprise cloud servers located in the European Union (France & Germany) compliant with ISO 27001 and SOC 2 Type II:"}
          </p>
          <ul className="space-y-1 text-zinc-300">
            <li><strong>{isFr ? "Hébergeur :" : "Cloud Provider:"}</strong> Vercel Inc. / AWS Cloud EU (Frankfurt & Paris)</li>
            <li><strong>{isFr ? "Cryptage :" : "Encryption:"}</strong> {isFr ? "Certificat SSL/TLS 256 bits avec protocole HTTPS forcé" : "256-bit SSL/TLS Certificate with enforced HTTPS protocol"}</li>
            <li><strong>{isFr ? "Données Bancaires :" : "Payment Data:"}</strong> {isFr ? "Aucune donnée bancaire n'est stockée sur nos serveurs. Les transactions sont directement traitées via les protocoles sécurisés PCI-DSS de niveau 1 de Stripe et BNP Paribas." : "Zero payment card numbers are stored on our servers. Transactions are handled via PCI-DSS Level 1 certified gateways by Stripe and BNP Paribas."}</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            {isFr ? "3. Assurance Responsabilité Civile Professionnelle" : "3. Professional Liability & Insurance"}
          </h2>
          <p>
            {isFr
              ? "eVolt Apex Technologies SAS est couverte par une police d'assurance Responsabilité Civile Professionnelle et Garantie Financière Concessionnaire souscrite auprès de :"
              : "eVolt Apex Technologies SAS is covered by an official commercial dealer liability and financial escrow guarantee policy with:"}
          </p>
          <p className="font-semibold text-white">
            AXA Assurances Entreprises  {isFr ? "Police d'assurance N° 8492019-RCPRO-EVOLT (Couverture jusqu'à 10 000 000 €)." : "Policy # 8492019-RCPRO-EVOLT (€10,000,000 total coverage)."}
          </p>
        </div>
      </div>
    </div>
  );
}
