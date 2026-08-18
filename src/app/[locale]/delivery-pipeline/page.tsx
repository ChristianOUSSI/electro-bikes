import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import DeliveryPipelineClient from "@/components/DeliveryPipelineClient";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isFr = params.locale === "fr";
  return {
    title: isFr
      ? "Pipeline de Livraison Spécialisée 2-Roues & Immatriculation | eVolt"
      : "Specialized 2-Wheel Delivery Pipeline & Registration | eVolt",
    description: isFr
      ? "Découvrez notre protocole de livraison spécialisée : contrôle PDI 50 points en atelier, immatriculation carte grise ANTS, transport capitonné avec hayon et mise en route VIP à domicile."
      : "Learn how we deliver 250kg electric motorcycles: 50-point PDI workshop inspection, official license plate fitting, dedicated lift-gate trucks, and home handover.",
  };
}

export default function DeliveryPipelinePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDictionary(params.locale);

  const isFr = params.locale === "fr";
  const breadcrumbs = [
    { name: dict.nav.home, url: `https://evolt-bikes.com/${params.locale}` },
    { name: isFr ? "Pipeline Logistique & Livraison" : "Delivery & Logistics Pipeline", url: `https://evolt-bikes.com/${params.locale}/delivery-pipeline` },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <BreadcrumbJsonLd items={breadcrumbs} />
      </div>
      <DeliveryPipelineClient locale={params.locale} />
    </div>
  );
}
