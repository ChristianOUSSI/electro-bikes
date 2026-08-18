import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import SurronEcosystemSection from "@/components/SurronEcosystemSection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isFr = params.locale === "fr";
  return {
    title: isFr
      ? "Distributeurs Officiels Sur-Ron, Pièces & Upgrades Performance 2026 | eVolt"
      : "Sur-Ron Official Dealers, Performance Parts & Upgrades 2026 | eVolt",
    description: isFr
      ? "Guide exhaustif des distributeurs officiels Sur-Ron (Ride Surron USA, Surron Canada, Electrick Moto, TC Bike), pièces performance (Luna Cycle, Amped Bikes, Warp 9, Torp) et marché d'occasion vérifié."
      : "Complete directory of official Sur-Ron dealers (Ride Surron USA, Surron Canada, Electrick Moto, TC Bike), performance tuning (Luna Cycle, Amped Bikes, Warp 9, Torp), and verified wholesale.",
    openGraph: {
      title: isFr
        ? "Écosystème Officiel Sur-Ron & Upgrades Performance | eVolt"
        : "Sur-Ron Official Ecosystem & Tuning Network | eVolt",
      description: isFr
        ? "Accédez aux distributeurs agréés, pièces détachées de compétition 72V et bouclier anti-duperie."
        : "Direct access to official distributors, 72V racing parts, and anti-counterfeit trust shield.",
    },
  };
}

export default function SurronEcosystemPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDictionary(params.locale);

  const isFr = params.locale === "fr";
  const breadcrumbs = [
    { name: dict.nav.home, url: `https://evolt-bikes.com/${params.locale}` },
    { name: isFr ? "Écosystème Sur-Ron & Pièces" : "Sur-Ron Ecosystem & Parts", url: `https://evolt-bikes.com/${params.locale}/surron-ecosystem` },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <BreadcrumbJsonLd items={breadcrumbs} />
      </div>
      <SurronEcosystemSection locale={params.locale} />
    </div>
  );
}
