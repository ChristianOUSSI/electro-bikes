import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import RangeCalculator from "@/components/RangeCalculator";
import EcoBonusCalculator from "@/components/EcoBonusCalculator";
import TcoCalculator from "@/components/TcoCalculator";
import TrustBadges from "@/components/TrustBadges";
import SurronEcosystemSection from "@/components/SurronEcosystemSection";
import InstitutionalTrustBanner from "@/components/InstitutionalTrustBanner";
import FaqAccordion from "@/components/FaqAccordion";
import CompareDrawer from "@/components/CompareDrawer";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import { Zap, Sparkles, ArrowRight, Star } from "lucide-react";
import { MotoIcon, VeloIcon } from "@/components/VehicleIcons";

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);

  // Curated selections
  const featured = [products[0], products[1], products[2], products[3]];
  const bestsellers = [products[4], products[7], products[8], products[9]];

  return (
    <div className="space-y-20 pb-20">
      {/* Schema.org Structured Data */}
      <OrganizationJsonLd />
      <WebsiteJsonLd />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Background Ambient Glow & Grid */}
        <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] bg-lime-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 h-[400px] w-[500px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/40 bg-lime-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-lime-400 backdrop-blur-md animate-fade-in-up">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{dict.home.heroTag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-balance text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in-up leading-[1.08]">
              L&apos;Excellence Électrique <br />
              <span className="text-gradient-lime">Sans Aucun Compromis</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-2xl text-balance text-base sm:text-lg text-zinc-300 animate-fade-in-up leading-relaxed">
              {dict.home.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up">
              <Link
                href={`/${locale}/catalogue`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-lime-400 px-8 py-4 text-base font-extrabold text-zinc-950 transition hover:bg-lime-300 shadow-glow-lime hover:scale-[1.02]"
              >
                <span>{dict.home.ctaPrimary}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <a
                href="#simulateur"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/80 px-8 py-4 text-base font-bold text-white transition hover:bg-zinc-800 hover:border-lime-400/50 backdrop-blur-sm"
              >
                <Zap className="h-5 w-5 text-lime-400" />
                <span>{dict.home.ctaSimulator}</span>
              </a>
            </div>

            {/* Key Value Metrics Bar */}
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 pt-8 border-t border-zinc-800/80 text-left">
              <div className="rounded-2xl bg-zinc-900/40 p-4 border border-zinc-800/60 backdrop-blur-sm">
                <p className="text-xl sm:text-2xl font-black text-white">{dict.home.heroStats.instantTorque}</p>
                <p className="text-xs text-zinc-400 mt-1">{dict.home.heroStats.instantTorqueDesc}</p>
              </div>

              <div className="rounded-2xl bg-zinc-900/40 p-4 border border-zinc-800/60 backdrop-blur-sm">
                <p className="text-xl sm:text-2xl font-black text-lime-400">{dict.home.heroStats.realRange}</p>
                <p className="text-xs text-zinc-400 mt-1">{dict.home.heroStats.realRangeDesc}</p>
              </div>

              <div className="rounded-2xl bg-zinc-900/40 p-4 border border-zinc-800/60 backdrop-blur-sm">
                <p className="text-xl sm:text-2xl font-black text-cyan-400">{dict.home.heroStats.zeroFuel}</p>
                <p className="text-xs text-zinc-400 mt-1">{dict.home.heroStats.zeroFuelDesc}</p>
              </div>

              <div className="rounded-2xl bg-zinc-900/40 p-4 border border-zinc-800/60 backdrop-blur-sm">
                <p className="text-xl sm:text-2xl font-black text-emerald-400">{dict.home.heroStats.warranty}</p>
                <p className="text-xs text-zinc-400 mt-1">{dict.home.heroStats.warrantyDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 mb-1">
              <Zap className="h-4 w-4" />
              <span>Sélection d&apos;Élite</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {dict.home.featured}
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              {dict.home.featuredSubtitle}
            </p>
          </div>

          <Link
            href={`/${locale}/catalogue`}
            className="inline-flex items-center gap-1 text-sm font-bold text-lime-400 hover:text-lime-300 transition"
          >
            <span>{dict.home.viewAll}</span>
            <ArrowRight className="h-4 w-4" />
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

      {/* Interactive Tool 1: Real-World Range & Charging Simulator */}
      <section id="simulateur" className="mx-auto max-w-7xl px-4 sm:px-6 scroll-mt-24">
        <RangeCalculator dict={dict} locale={locale} />
      </section>

      {/* Categories Showcase (Vélos vs Motos vs Off-Road) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {dict.home.categories}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Trouvez la monture adaptée à votre style de vie et vos trajets.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* E-Bikes */}
          <Link
            href={`/${locale}/catalogue?type=velo`}
            className="group relative block overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:border-lime-400/50 hover:shadow-glow-lime"
          >
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80"
                alt="Vélos Électriques"
                fill
                className="object-cover opacity-30 transition duration-500 group-hover:scale-105 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
            </div>

            <div className="relative flex h-72 flex-col justify-end p-6">
              <div className="flex items-center gap-2 text-lime-400 font-bold text-xs uppercase tracking-wider mb-1">
                <VeloIcon className="h-4 w-4" />
                <span>Sans Permis</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{dict.catalogue.velo}</h3>
              <p className="text-xs text-zinc-300 mt-1">
                Route Carbone, VTTAE Enduro, Gravel & Cargo Longtail
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-lime-400">
                <span>Explorer les vélos</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>

          {/* E-Motorcycles Road & Street */}
          <Link
            href={`/${locale}/catalogue?type=moto`}
            className="group relative block overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:border-cyan-400/50 hover:shadow-glow-cyan"
          >
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80"
                alt="Motos Électriques"
                fill
                className="object-cover opacity-30 transition duration-500 group-hover:scale-105 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
            </div>

            <div className="relative flex h-72 flex-col justify-end p-6">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
                <MotoIcon className="h-4 w-4" />
                <span>Permis 125, A2 & A</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{dict.catalogue.moto}</h3>
              <p className="text-xs text-zinc-300 mt-1">
                Roadsters Hyper, Trails Aventure, Scooters 125 & Néo-Rétro
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <span>Explorer les motos</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>

          {/* Off-Road Dirt & Trail */}
          <Link
            href={`/${locale}/catalogue?license=offroad`}
            className="group relative block overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:border-amber-400/50"
          >
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&q=80"
                alt="Dirt Bikes 72V"
                fill
                className="object-cover opacity-30 transition duration-500 group-hover:scale-105 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
            </div>

            <div className="relative flex h-72 flex-col justify-end p-6">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Zap className="h-4 w-4" />
                <span>Terrain Privé 72V</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Dirt Bikes & E-Cross</h3>
              <p className="text-xs text-zinc-300 mt-1">
                Puissance brute, 440 Nm de couple et franchissement extrême
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <span>Explorer le Dirt</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Interactive Tool 2: Government Eco-Bonus Live Calculator */}
      <section id="bonus-ecologique" className="mx-auto max-w-7xl px-4 sm:px-6 scroll-mt-24">
        <EcoBonusCalculator dict={dict} locale={locale} />
      </section>

      {/* Interactive Tool 3: Total Cost of Ownership (TCO) vs Gas */}
      <section id="tco" className="mx-auto max-w-7xl px-4 sm:px-6 scroll-mt-24">
        <TcoCalculator dict={dict} locale={locale} />
      </section>

      {/* Bestsellers Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 mb-1">
              <Star className="h-4 w-4 fill-lime-400" />
              <span>Plébiscités par la Communauté</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {dict.home.bestsellers}
            </h2>
          </div>
          <Link
            href={`/${locale}/catalogue`}
            className="text-sm font-bold text-lime-400 hover:text-lime-300"
          >
            {dict.home.viewAll} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      </section>

      {/* Sur-Ron Ecosystem, Official Distributors & Performance Tuning Directory */}
      <SurronEcosystemSection locale={locale} />

      {/* Anti-Duperie Trust Shield */}
      <TrustBadges dict={dict} locale={locale} />

      {/* Institutional Showroom & Real Logistics Banner */}
      <InstitutionalTrustBanner locale={locale} />

      {/* SEO Expert Buying Guide FAQ */}
      <FaqAccordion dict={dict} locale={locale} />

      {/* Global Sticky Comparison Drawer */}
      <CompareDrawer dict={dict} locale={locale} />
    </div>
  );
}
