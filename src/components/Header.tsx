"use client";

import { useState } from "react";
import Link from "next/link";
import { Locale } from "@/i18n/config";
import { Dictionary } from "@/i18n/dictionaries";
import LocaleSwitcher from "./LocaleSwitcher";
import RegionSwitcher from "./RegionSwitcher";
import CartBadge from "./CartBadge";
import SlideOutCart from "./SlideOutCart";
import QuickSearchModal from "./QuickSearchModal";
import LicenseGuideModal from "./LicenseGuideModal";
import TestRideModal from "./TestRideModal";
import { useCompareStore } from "@/store/compare";
import {
  Search,
  Menu,
  X,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { MotoIcon, VeloIcon } from "./VehicleIcons";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [licenseGuideOpen, setLicenseGuideOpen] = useState(false);
  const [testRideOpen, setTestRideOpen] = useState(false);

  const { productIds } = useCompareStore();
  const isFr = locale === "fr";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl transition">
        {/* Top Mini Banner */}
        <div className="bg-gradient-to-r from-zinc-900 via-lime-950/40 to-zinc-900 border-b border-zinc-800/80 px-4 py-1.5 text-center text-xs text-zinc-300">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-lime-400 font-medium">
              {isFr
                ? "⚡ Bonus Écologique jusqu'à 2 500 € déduit immédiatement à la commande"
                : "⚡ State Eco-Grants & Tax Credits deducted upfront at checkout"}
            </span>
            <span className="sm:hidden font-medium text-lime-400">
              {isFr ? "⚡ Bonus Éco jusqu'à 2 500 € déduit" : "⚡ State Eco-Grants Deducted"}
            </span>
            <div className="flex items-center gap-4 text-xs font-medium">
              <button
                onClick={() => setLicenseGuideOpen(true)}
                className="hover:text-lime-400 text-zinc-400 transition hidden md:inline-flex items-center gap-1"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{isFr ? "Guide des Permis" : "License Guide"}</span>
              </button>
              <button
                onClick={() => setTestRideOpen(true)}
                className="hover:text-lime-400 text-zinc-400 transition hidden sm:inline-flex items-center gap-1"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>{isFr ? "Réserver un Essai 30 min" : "Book 30-min VIP Test Ride"}</span>
              </button>
              <span className="text-zinc-500">|</span>
              <RegionSwitcher />
              <LocaleSwitcher locale={locale} />
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Brand Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-400 text-zinc-950 font-black text-xl shadow-glow-lime group-hover:scale-105 transition">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white">
                e<span className="text-lime-400">Volt</span>
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1.5">Apex</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 lg:flex">
            <Link
              href={`/${locale}/catalogue?type=velo`}
              className="flex items-center gap-1.5 text-sm font-semibold text-zinc-300 transition hover:text-lime-400"
            >
              <VeloIcon className="h-4 w-4 text-zinc-400" />
              <span>{dict.nav.velos}</span>
            </Link>

            <Link
              href={`/${locale}/catalogue?type=moto`}
              className="flex items-center gap-1.5 text-sm font-semibold text-zinc-300 transition hover:text-lime-400"
            >
              <MotoIcon className="h-4 w-4 text-zinc-400" />
              <span>{dict.nav.motos}</span>
            </Link>

            <Link
              href={`/${locale}/catalogue`}
              className="text-sm font-semibold text-zinc-300 transition hover:text-lime-400"
            >
              {dict.nav.catalogue}
            </Link>

            <Link
              href={`/${locale}/surron-ecosystem`}
              className="flex items-center gap-1.5 text-sm font-semibold text-lime-400 transition hover:text-white"
            >
              <Zap className="h-4 w-4 text-lime-400" />
              <span>{isFr ? "Sur-Ron & Upgrades" : "Sur-Ron & Tuning"}</span>
            </Link>

            <button
              onClick={() => setLicenseGuideOpen(true)}
              className="flex items-center gap-1.5 text-sm font-semibold text-zinc-300 transition hover:text-lime-400"
            >
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>{dict.nav.licenseGuide}</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Spotlight Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-xs text-zinc-400 hover:border-lime-400/50 hover:text-white transition"
              aria-label={isFr ? "Recherche rapide" : "Quick Search"}
            >
              <Search className="h-4 w-4 text-lime-400" />
              <span className="hidden sm:inline">{isFr ? "Chercher..." : "Search..."}</span>
              <kbd className="hidden sm:inline-block rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Test Ride Action Button */}
            <button
              onClick={() => setTestRideOpen(true)}
              className="hidden xl:inline-flex items-center gap-1.5 rounded-full bg-zinc-900 border border-lime-400/30 px-4 py-2 text-xs font-semibold text-lime-400 hover:bg-lime-400 hover:text-zinc-950 transition"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>{dict.nav.bookTestRide}</span>
            </button>

            {/* Compare count pill (if active) */}
            {productIds.length > 0 && (
              <button
                type="button"
                className="relative rounded-full bg-zinc-900 border border-lime-400/40 p-2 text-lime-400 hover:bg-zinc-800 transition"
                title={isFr ? "Comparateur" : "Comparator"}
              >
                <Zap className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-lime-400 text-[10px] font-bold text-zinc-950">
                  {productIds.length}
                </span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-full border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-300 transition hover:border-lime-400/50 hover:text-white"
              aria-label={isFr ? "Ouvrir le garage" : "Open Garage"}
            >
              <ShoppingBag className="h-5 w-5" />
              <CartBadge />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white lg:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-zinc-800 bg-zinc-950/98 px-4 py-6 backdrop-blur-2xl lg:hidden animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col gap-4">
              <Link
                href={`/${locale}`}
                className="flex items-center justify-between text-base font-semibold text-white py-2 border-b border-zinc-800/80"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{dict.nav.home}</span>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </Link>

              <Link
                href={`/${locale}/catalogue?type=velo`}
                className="flex items-center justify-between text-base font-semibold text-white py-2 border-b border-zinc-800/80"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <VeloIcon className="h-4 w-4 text-lime-400" />
                  <span>{dict.nav.velos}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </Link>

              <Link
                href={`/${locale}/catalogue?type=moto`}
                className="flex items-center justify-between text-base font-semibold text-white py-2 border-b border-zinc-800/80"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <MotoIcon className="h-4 w-4 text-lime-400" />
                  <span>{dict.nav.motos}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </Link>

              <Link
                href={`/${locale}/catalogue`}
                className="flex items-center justify-between text-base font-semibold text-white py-2 border-b border-zinc-800/80"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{dict.nav.catalogue}</span>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </Link>

              <Link
                href={`/${locale}/surron-ecosystem`}
                className="flex items-center justify-between text-base font-semibold text-lime-400 py-2 border-b border-zinc-800/80"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-lime-400" />
                  <span>{isFr ? "Sur-Ron Official & Upgrades" : "Sur-Ron Official & Tuning"}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLicenseGuideOpen(true);
                }}
                className="flex items-center justify-between text-left text-base font-semibold text-cyan-400 py-2 border-b border-zinc-800/80"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{dict.nav.licenseGuide}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTestRideOpen(true);
                }}
                className="mt-2 w-full rounded-xl bg-lime-400 py-3 text-center text-sm font-bold text-zinc-950 shadow-glow-lime"
              >
                {dict.nav.bookTestRide}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Modals */}
      <QuickSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        dict={dict}
        locale={locale}
      />

      <LicenseGuideModal
        isOpen={licenseGuideOpen}
        onClose={() => setLicenseGuideOpen(false)}
        dict={dict}
        locale={locale}
      />

      <TestRideModal
        isOpen={testRideOpen}
        onClose={() => setTestRideOpen(false)}
        dict={dict}
        locale={locale}
      />

      {/* Slide-out Cart */}
      <SlideOutCart
        locale={locale}
        dict={dict}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}
