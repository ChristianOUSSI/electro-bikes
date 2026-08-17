"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, locales } from "@/i18n/config";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function pathFor(target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-zinc-700 p-0.5 text-xs font-medium">
      {locales.map((l) => (
        <Link
          key={l}
          href={pathFor(l)}
          className={`rounded-full px-2 py-1 uppercase transition ${
            l === locale
              ? "bg-lime-400 text-zinc-950"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
