import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MechanicAdvisorFloating from "@/components/MechanicAdvisorFloating";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://evolt-bikes.com"),
  title: {
    default: "eVolt Apex — Vélos & Motos Électriques Haut de Gamme",
    template: "%s | eVolt Apex",
  },
  description:
    "Leader européen de la mobilité électrique à deux roues. Vélos et motos électriques haute performance, simulateur d'autonomie en conditions réelles, comparateur multi-marques et déduction immédiate du bonus écologique.",
  keywords: [
    "moto electrique",
    "velo electrique haut de gamme",
    "meilleure moto electrique 125",
    "comparateur moto electrique",
    "zero motorcycles alternative",
    "livewire del mar",
    "sur-ron 72v homologuee",
    "bonus ecologique moto 2026",
    "autonomie reelle moto electrique",
    "speed bike 45 km/h",
    "dirt bike electrique",
    "vtte enduro tout suspendu",
  ],
  authors: [{ name: "eVolt Apex Technologies" }],
  creator: "eVolt",
  publisher: "eVolt",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "https://evolt-bikes.com",
    siteName: "eVolt Apex",
    title: "eVolt Apex — Vélos & Motos Électriques Haut de Gamme",
    description:
      "Performance instantanée, autonomie certifiée, 0 € d'essence. Découvrez la sélection d'élite de 2-roues électriques.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "eVolt Apex Electric Motorcycles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eVolt Apex — Vélos & Motos Électriques Haut de Gamme",
    description:
      "Performance instantanée, autonomie certifiée en conditions réelles et déduction directe du bonus écologique.",
    images: ["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80"],
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDictionary(params.locale);

  return (
    <html lang={params.locale} className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-[#09090b] text-zinc-100 antialiased selection:bg-lime-400 selection:text-zinc-950`}
      >
        <Header locale={params.locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} locale={params.locale} />
        <MechanicAdvisorFloating locale={params.locale} />
      </body>
    </html>
  );
}
