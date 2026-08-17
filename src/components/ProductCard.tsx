import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/i18n/config";
import { Dictionary } from "@/i18n/dictionaries";
import { formatPrice, productName } from "@/lib/format";
import { Product } from "@/lib/types";

export default function ProductCard({
  product,
  locale,
  dict,
}: {
  product: Product;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-lime-400/50 hover:shadow-lg hover:shadow-lime-400/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image_url}
          alt={productName(product, locale)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-zinc-950/80 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-lime-400">
          {product.type === "velo" ? dict.catalogue.velo : dict.catalogue.moto}
        </span>
        {product.stock === 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-medium text-white">
            {dict.catalogue.outOfStock}
          </span>
        )}
      </div>
      <div className="space-y-2 p-4">
        <h3 className="font-semibold text-white">
          {productName(product, locale)}
        </h3>
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <span>{product.autonomie_km} km</span>
          <span aria-hidden>·</span>
          <span>{product.vitesse_max} km/h</span>
        </div>
        <p className="text-lg font-bold text-lime-400">
          {formatPrice(product.prix, locale)}
        </p>
      </div>
    </Link>
  );
}
