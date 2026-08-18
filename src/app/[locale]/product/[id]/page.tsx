import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProduct, products } from "@/lib/products";
import { productName, productDescription, formatPrice } from "@/lib/format";
import ProductDetailClient from "@/components/ProductDetailClient";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const product = getProduct(params.id);
  if (!product) return {};

  const name = productName(product, params.locale);
  const description = productDescription(product, params.locale);

  return {
    title: `${name} | ${product.brand} - eVolt Apex`,
    description: `${description} Autonomie réelle : ${product.autonomie_km} km. Vitesse max : ${product.vitesse_max} km/h. Homologation : ${product.license_label_fr}. Garantie 5 ans.`,
    openGraph: {
      title: `${name} | ${formatPrice(product.prix, params.locale)}`,
      description,
      images: [
        {
          url: product.image_url,
          width: 1200,
          height: 800,
          alt: name,
        },
      ],
    },
  };
}

export default function ProductPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);
  const product = getProduct(params.id);
  if (!product) notFound();

  const breadcrumbs = [
    { name: dict.nav.home, url: `https://evolt-bikes.com/${locale}` },
    { name: dict.nav.catalogue, url: `https://evolt-bikes.com/${locale}/catalogue` },
    { name: productName(product, locale), url: `https://evolt-bikes.com/${locale}/product/${product.id}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* SEO Schema.org microdata */}
      <ProductJsonLd product={product} locale={locale} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <ProductDetailClient
        product={product}
        dict={dict}
        locale={locale}
      />
    </div>
  );
}
