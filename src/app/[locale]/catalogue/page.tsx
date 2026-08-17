import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import CatalogueClient from "@/components/CatalogueClient";

export default function CataloguePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDictionary(params.locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-white">{dict.catalogue.title}</h1>
      <p className="mt-2 text-zinc-400">{dict.catalogue.subtitle}</p>
      <CatalogueClient locale={params.locale} dict={dict} />
    </div>
  );
}
