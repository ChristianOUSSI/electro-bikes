import Link from "next/link";
import { Locale } from "@/i18n/config";
import { Dictionary } from "@/i18n/dictionaries";
import { Shield, Zap, HeadphonesIcon, Award, MapPin, Phone, Mail } from "lucide-react";
import { MotoIcon, VeloIcon } from "./VehicleIcons";

export default function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const f = dict.footer;
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-300">
      {/* Top Value Proposition Strip */}
      <div className="border-b border-zinc-800 bg-zinc-900/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
          <div className="flex items-start gap-3.5">
            <div className="rounded-2xl bg-lime-400/10 p-3 border border-lime-400/20 text-lime-400 shrink-0">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">{f.valuePropDeliveryTitle}</h4>
              <p className="text-xs text-zinc-400 mt-0.5">{f.valuePropDeliveryDesc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="rounded-2xl bg-cyan-400/10 p-3 border border-cyan-400/20 text-cyan-400 shrink-0">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">{f.valuePropWarrantyTitle}</h4>
              <p className="text-xs text-zinc-400 mt-0.5">{f.valuePropWarrantyDesc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="rounded-2xl bg-emerald-400/10 p-3 border border-emerald-400/20 text-emerald-400 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">{f.valuePropBonusTitle}</h4>
              <p className="text-xs text-zinc-400 mt-0.5">{f.valuePropBonusDesc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="rounded-2xl bg-amber-400/10 p-3 border border-amber-400/20 text-amber-400 shrink-0">
              <HeadphonesIcon className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">{f.valuePropSupportTitle}</h4>
              <p className="text-xs text-zinc-400 mt-0.5">{f.valuePropSupportDesc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand & Manifesto */}
          <div className="space-y-4 md:col-span-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-lime-400 text-zinc-950 font-black text-lg">
                ⚡
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                e<span className="text-lime-400">Volt</span>
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1.5">Apex</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              {f.about}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-zinc-500">
              <span>{f.certCE}</span>
              <span>•</span>
              <span>{f.certEuro5}</span>
              <span>•</span>
              <span>{f.certUN383}</span>
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-2">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              {f.categories}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href={`/${locale}/catalogue?type=velo`}
                  className="flex items-center gap-2 text-zinc-400 hover:text-lime-400 transition"
                >
                  <VeloIcon className="h-4 w-4" />
                  <span>{dict.catalogue.velo}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/catalogue?type=moto`}
                  className="flex items-center gap-2 text-zinc-400 hover:text-lime-400 transition"
                >
                  <MotoIcon className="h-4 w-4" />
                  <span>{dict.catalogue.moto}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/catalogue?license=none`}
                  className="text-zinc-400 hover:text-lime-400 transition"
                >
                  {f.catNoPerm}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/catalogue?license=A1_B`}
                  className="text-zinc-400 hover:text-lime-400 transition"
                >
                  {f.catPermB}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/catalogue?license=offroad`}
                  className="text-zinc-400 hover:text-lime-400 transition"
                >
                  {f.catDirtBike}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/surron-ecosystem`}
                  className="text-lime-400 font-semibold hover:text-white transition"
                >
                  {f.catSurronEco}
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Simulators */}
          <div className="md:col-span-3">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              {f.tools}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href={`/${locale}#simulateur`}
                  className="text-zinc-400 hover:text-lime-400 transition"
                >
                  {f.toolRangeSim}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#bonus-ecologique`}
                  className="text-zinc-400 hover:text-lime-400 transition"
                >
                  {f.toolBonusCalc}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#tco`}
                  className="text-zinc-400 hover:text-lime-400 transition"
                >
                  {f.toolSavingsCalc}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/catalogue`}
                  className="text-zinc-400 hover:text-lime-400 transition"
                >
                  {f.toolCompare}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Flagship */}
          <div className="md:col-span-3">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              {f.contact}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-lime-400 shrink-0 mt-0.5" />
                <span>18 Avenue de la Grande Armée, 75017 Paris</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-lime-400 shrink-0" />
                <span>{f.phoneHours}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-lime-400 shrink-0" />
                <span>contact@evolt-bikes.com</span>
              </p>
              <div className="pt-2 flex flex-col gap-1.5 text-xs">
                <Link
                  href={`/${locale}/about`}
                  className="text-lime-400 hover:underline font-semibold"
                >
                  {f.linkShowroom}
                </Link>
                <Link
                  href={`/${locale}/delivery-pipeline`}
                  className="text-cyan-400 hover:underline font-semibold"
                >
                  {f.linkDelivery}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & SEO legal strip */}
        <div className="mt-14 border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {f.copyright}</p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/legal`} className="hover:text-zinc-300 transition">
              {f.legalNotice}
            </Link>
            <Link href={`/${locale}/cgv`} className="hover:text-zinc-300 transition">
              {f.cgvFull}
            </Link>
            <Link href={`/${locale}/about`} className="hover:text-zinc-300 transition">
              {f.showroomParis}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
