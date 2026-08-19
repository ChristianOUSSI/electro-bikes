import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MechanicAdvisorFloating from "@/components/MechanicAdvisorFloating";
import VisitorTracker from "@/components/VisitorTracker";
import ChatWidget from "@/components/ChatWidget";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import Script from "next/script";

// SVG favicon as data URI
const svgFavicon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23c8ff00"/><stop offset="100%" style="stop-color:%23a0cc00"/></linearGradient></defs><rect width="192" height="192" rx="48" fill="%2309090b"/><g transform="translate(32, 32)"><circle cx="32" cy="96" r="24" fill="url(%23grad)"/><circle cx="32" cy="96" r="18" fill="%2309090b"/><circle cx="96" cy="96" r="24" fill="url(%23grad)"/><circle cx="96" cy="96" r="18" fill="%2309090b"/><path d="M32 72 L64 48 L96 48 L96 72 L80 88 L48 88 Z" fill="url(%23grad)"/><rect x="56" y="32" width="8" height="16" rx="4" fill="url(%23grad)"/><ellipse cx="64" cy="56" rx="12" ry="6" fill="url(%23grad)"/><path d="M48 16 L56 32 L64 24 L56 40 L64 56" fill="url(%23grad)"/></g></svg>`;

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
    default: "eVolt Apex  Vélos & Motos Électriques Haut de Gamme",
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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: svgFavicon, sizes: "any", type: "image/svg+xml" },
      { url: "/icons/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
    apple: "/icons/icon-152x152.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Electro Bikes",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "https://evolt-bikes.com",
    siteName: "eVolt Apex",
    title: "eVolt Apex  Vélos & Motos Électriques Haut de Gamme",
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
    title: "eVolt Apex  Vélos & Motos Électriques Haut de Gamme",
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
        <VisitorTracker />
        <Header locale={params.locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} locale={params.locale} />
        <MechanicAdvisorFloating locale={params.locale} />
        <ChatWidget />
        <PWAInstallPrompt />
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('Service Worker registered with scope:', registration.scope);
                  }, function(err) {
                    console.log('Service Worker registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
