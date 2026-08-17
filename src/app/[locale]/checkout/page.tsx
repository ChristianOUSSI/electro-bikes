import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import CheckoutClient from "@/components/CheckoutClient";

export default function CheckoutPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDictionary(params.locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-white">{dict.checkout.title}</h1>
      <CheckoutClient locale={params.locale} dict={dict} />
    </div>
  );
}
