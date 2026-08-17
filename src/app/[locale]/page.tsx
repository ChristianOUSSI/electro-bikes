import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);
  const featured = [products[0], products[6], products[2], products[10]];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1920&q=80"
            alt=""
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/70 to-zinc-950" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 sm:py-36">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {dict.home.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-zinc-300">
            {dict.home.heroSubtitle}
          </p>
          <Link
            href={`/${locale}/catalogue`}
            className="mt-10 inline-block rounded-full bg-lime-400 px-8 py-3 font-semibold text-zinc-950 transition hover:bg-lime-300"
          >
            {dict.home.cta}
          </Link>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-8 text-center text-sm text-zinc-300 sm:grid-cols-3 sm:px-6">
          <p>🚚 {dict.home.perks.delivery}</p>
          <p>🛡️ {dict.home.perks.warranty}</p>
          <p>⚡ {dict.home.perks.support}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-white">
            {dict.home.featured}
          </h2>
          <Link
            href={`/${locale}/catalogue`}
            className="text-sm text-lime-400 hover:text-lime-300"
          >
            {dict.home.viewAll} →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
