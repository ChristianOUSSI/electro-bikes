import Link from "next/link";
import { Locale } from "@/i18n/config";
import { Dictionary } from "@/i18n/dictionaries";
import LocaleSwitcher from "./LocaleSwitcher";
import CartBadge from "./CartBadge";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href={`/${locale}`} className="flex items-baseline gap-2">
          <span className="text-xl font-bold tracking-tight text-white">
            e<span className="text-lime-400">Volt</span>
          </span>
          <span className="hidden text-xs text-zinc-400 sm:block">
            {dict.nav.tagline}
          </span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href={`/${locale}`}
            className="hidden text-sm text-zinc-300 transition hover:text-white sm:block"
          >
            {dict.nav.home}
          </Link>
          <Link
            href={`/${locale}/catalogue`}
            className="text-sm text-zinc-300 transition hover:text-white"
          >
            {dict.nav.catalogue}
          </Link>
          <CartBadge locale={locale} label={dict.nav.cart} />
          <LocaleSwitcher locale={locale} />
        </nav>
      </div>
    </header>
  );
}
