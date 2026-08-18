import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import AboutClient from "@/components/AboutClient";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isFr = params.locale === "fr";
  return {
    title: isFr
      ? "Qui Sommes-Nous ? Showroom Paris & Équipe | eVolt Apex"
      : "About Us • Paris Showroom & Engineering Team | eVolt Apex",
    description: isFr
      ? "Découvrez notre showroom physique de 850 m² au 18 Avenue de la Grande Armée Paris 17e, notre équipe d'ingénieurs, nos agréments ministériels ASP et notre atelier de révision certifié."
      : "Visit our 850 m² flagship showroom at 18 Avenue de la Grande Armée Paris, our engineering team, official ASP government agreements, and certified PDI workshop.",
  };
}

export default function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDictionary(params.locale);

  const isFr = params.locale === "fr";
  const breadcrumbs = [
    { name: dict.nav.home, url: `https://evolt-bikes.com/${params.locale}` },
    { name: isFr ? "Qui sommes-nous ?" : "About Us", url: `https://evolt-bikes.com/${params.locale}/about` },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <BreadcrumbJsonLd items={breadcrumbs} />
      </div>
      <AboutClient locale={params.locale} />
    </div>
  );
}
