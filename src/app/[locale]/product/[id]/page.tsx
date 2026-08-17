import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProduct, products } from "@/lib/products";
import { formatPrice, productDescription, productName } from "@/lib/format";
import ProductGallery from "@/components/ProductGallery";
import AddToCart from "@/components/AddToCart";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
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

  const t = dict.product;
  const specs: [string, string][] = [
    [t.motor, product.moteur],
    [t.battery, product.batterie],
    [t.range, `${product.autonomie_km} km`],
    [t.maxSpeed, `${product.vitesse_max} km/h`],
    [t.weight, `${product.poids_kg} kg`],
    [t.chargeTime, `${product.temps_charge_h} h`],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        href={`/${locale}/catalogue`}
        className="text-sm text-zinc-400 transition hover:text-lime-400"
      >
        ← {t.backToCatalogue}
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery
          images={product.images}
          alt={productName(product, locale)}
        />

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-lime-400">
            {product.type === "velo"
              ? dict.catalogue.velo
              : dict.catalogue.moto}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            {productName(product, locale)}
          </h1>
          <p className="mt-4 text-3xl font-bold text-lime-400">
            {formatPrice(product.prix, locale)}
          </p>
          <p
            className={`mt-2 text-sm ${
              product.stock > 0 ? "text-zinc-400" : "text-red-400"
            }`}
          >
            {product.stock > 0
              ? `${product.stock} ${t.stockLeft}`
              : t.outOfStock}
          </p>

          <div className="mt-6">
            <AddToCart product={product} dict={dict} />
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white">
              {t.description}
            </h2>
            <p className="mt-2 leading-relaxed text-zinc-300">
              {productDescription(product, locale)}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white">{t.specs}</h2>
            <dl className="mt-3 divide-y divide-zinc-800 rounded-2xl border border-zinc-800 bg-zinc-900">
              {specs.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                >
                  <dt className="text-zinc-400">{label}</dt>
                  <dd className="text-right font-medium text-zinc-100">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
