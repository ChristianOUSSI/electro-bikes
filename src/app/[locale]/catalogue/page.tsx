import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import CatalogueClient from "@/components/CatalogueClient";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isFr = params.locale === "fr";
  return {
    title: isFr
      ? "Catalogue Motos & Vélos Électriques 2026 | eVolt Apex"
      : "Electric Motorcycles & E-Bikes Collection 2026 | eVolt Apex",
    description: isFr
      ? "Découvrez et comparez les meilleures motos et vélos électriques du marché. Filtres par permis (Sans permis, 125cc, A2, A, Off-Road), autonomie réelle et bonus écologique déduit."
      : "Discover and compare the world's leading electric motorcycles and e-bikes. Filter by license category, certified real range, and government clean incentives.",
    openGraph: {
      title: isFr
        ? "Catalogue Officiel Véhicules Électriques | eVolt Apex"
        : "Official Electric Vehicle Collection | eVolt Apex",
      description: isFr
        ? "Motos 125, Roadsters Hyper, Dirt bikes 72V et Vélos Carbone certifiés CE & Euro 5."
        : "Certified electric motorcycles, hyper-roadsters, 72V dirt bikes, and carbon e-bikes.",
    },
  };
}

export default function CataloguePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDictionary(params.locale);

  const breadcrumbs = [
    { name: dict.nav.home, url: `https://evolt-bikes.com/${params.locale}` },
    { name: dict.nav.catalogue, url: `https://evolt-bikes.com/${params.locale}/catalogue` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-lime-400">
          Collection Certifiée 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">
          {dict.catalogue.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-3xl">
          {dict.catalogue.subtitle}
        </p>
      </div>

      <Suspense fallback={<div className="mt-12 text-center text-sm text-zinc-500">Chargement de la sélection de véhicules...</div>}>
        <CatalogueClient locale={params.locale} dict={dict} />
      </Suspense>
    </div>
  );
}

