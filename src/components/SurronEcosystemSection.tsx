"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ExternalLink,
  Wrench,
  Truck,
  Globe2,
  CheckCircle2,
  Zap,
  Store,
} from "lucide-react";

interface PartnerItem {
  id: string;
  name: string;
  url: string;
  category: "official_dealer" | "performance_parts" | "used_wholesale";
  country: string;
  country_en: string;
  badge: string;
  badge_en: string;
  badgeColor: string;
  description: string;
  description_en: string;
  features: string[];
  features_en: string[];
  recommendedModels: string[];
}

const SURRON_ECOSYSTEM_DATA: PartnerItem[] = [
  // 1. Distributeurs Officiels & Vente Neuve
  {
    id: "ride-surron-usa",
    name: "Ride Surron USA",
    url: "https://ridesurronusa.com/",
    category: "official_dealer",
    country: "États-Unis 🇺🇸",
    country_en: "United States 🇺🇸",
    badge: "Distributeur Officiel Majeur",
    badge_en: "Major Official Distributor",
    badgeColor: "bg-lime-500/10 text-lime-400 border-lime-500/30",
    description:
      "Point d'entrée de référence aux USA pour acquérir les modèles d'origine Light Bee X, Ultra Bee et Storm Bee avec expédition express et garantie constructeur intégrale.",
    description_en:
      "Premier US official hub for authentic Light Bee X, Ultra Bee, and Storm Bee with express nationwide shipping and full manufacturer warranty.",
    features: [
      "Expédition rapide Light Bee X, Ultra Bee & Storm Bee",
      "Garantie usine officielle & support technique direct",
      "Inventaire de pièces d'origine constructeur en stock",
    ],
    features_en: [
      "Fast dispatch for Light Bee X, Ultra Bee & Storm Bee",
      "Official factory warranty & direct technical support",
      "Full OEM genuine spare parts inventory in stock",
    ],
    recommendedModels: ["Sur-Ron Light Bee X", "Sur-Ron Ultra Bee", "Sur-Ron Storm Bee"],
  },
  {
    id: "surron-canada",
    name: "Surron Canada",
    url: "https://surron.ca/collections/all?srsltid=AfmBOoqbHwhbfhG-GMAZB5m4hov2wjFilbltOhynLHq3ukOngwr24AKW",
    category: "official_dealer",
    country: "Canada 🇨🇦",
    country_en: "Canada 🇨🇦",
    badge: "Boutique Officielle Canada",
    badge_en: "Official Canadian Boutique",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    description:
      "Boutique officielle exclusive pour le marché canadien avec catalogue exhaustif de motos électriques Sur-Ron, accessoires hiver et pièces détachées OEM.",
    description_en:
      "Official Canadian store with comprehensive lineup of Sur-Ron bikes, winter riding accessories, and genuine OEM replacement parts.",
    features: [
      "Catalogue complet motos et pièces d'origine certifiées",
      "Options de financement officiel et expédition nationale",
      "Certification de conformité aux normes nord-américaines",
    ],
    features_en: [
      "Certified genuine bikes and OEM parts catalog",
      "Official financing options and national delivery",
      "Full North American compliance & safety certification",
    ],
    recommendedModels: ["Sur-Ron Light Bee X 2026", "Sur-Ron Ultra Bee T"],
  },
  {
    id: "surron-uk",
    name: "Sur-Ron UK",
    url: "https://sur-ron.co.uk/about/",
    category: "official_dealer",
    country: "Royaume-Uni 🇬🇧",
    country_en: "United Kingdom 🇬🇧",
    badge: "Importateur Officiel UK",
    badge_en: "Official UK Importer",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    description:
      "Importateur et distributeur exclusif pour le Royaume-Uni avec réseau national de concessionnaires agréés, service après-vente et homologation route L1e / L3e.",
    description_en:
      "Exclusive UK importer and distributor with nationwide dealer network, factory servicing, and road-legal L1e / L3e certifications.",
    features: [
      "Réseau de concessionnaires agréés avec ateliers certifiés",
      "Homologations route britanniques & européennes",
      "Assistance client et enregistrement de garantie officiel",
    ],
    features_en: [
      "Authorized dealer network with certified workshops",
      "UK and European road-legal certifications",
      "Direct rider concierge & official warranty registration",
    ],
    recommendedModels: ["Sur-Ron Storm Bee Enduro", "Sur-Ron Ultra Bee Road-Legal"],
  },
  {
    id: "electrick-moto-france",
    name: "Electrick Moto France",
    url: "https://www.electrickmoto.fr/",
    category: "official_dealer",
    country: "France & Europe 🇫🇷 🇪🇺",
    country_en: "France & Europe 🇫🇷 🇪🇺",
    badge: "Spécialiste & Essais France",
    badge_en: "France Sales & Test Centers",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    description:
      "Revendeur officiel français incontournable proposant la vente, les centres d'essais personnalisés et le service après-vente pour la France et l'Europe.",
    description_en:
      "Leading French official dealer providing test rides, customized dirt tracks, and full after-sales support across Europe.",
    features: [
      "Centres d'essais routiers et tout-terrain en France",
      "Service d'immatriculation express & carte grise",
      "Atelier spécialisé diagnostic batterie & maintenance",
    ],
    features_en: [
      "Road & off-road test ride centers across France",
      "Fast vehicle registration and license plate delivery",
      "Dedicated battery diagnostics & maintenance workshop",
    ],
    recommendedModels: ["Sur-Ron Light Bee X Homologuée", "Sur-Ron Ultra Bee 125cc"],
  },
  {
    id: "tc-bike-surron",
    name: "TC Bike Belgique",
    url: "https://www.tc-bike-surron.com/",
    category: "official_dealer",
    country: "Belgique & Benelux 🇧🇪 🇳🇱",
    country_en: "Belgium & Benelux 🇧🇪 🇳🇱",
    badge: "Distributeur Officiel Benelux",
    badge_en: "Official Benelux Distributor",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    description:
      "Distributeur officiel basé en Belgique spécialisé dans les motos haute performance homologuées pour le marché Benelux et pièces d'origine constructeur.",
    description_en:
      "Belgium-based official dealer specializing in road-legal high-performance electric bikes and OEM factory components.",
    features: [
      "Showroom et centre de service agréé au Benelux",
      "Véhicules homologués L1e (45 km/h) & L3e (125cc)",
      "Stock immédiat de pièces de rechange et pneumatiques",
    ],
    features_en: [
      "Showroom & certified service center in Benelux",
      "L1e & L3e homologated road-legal vehicles",
      "Immediate stock of spare parts and specialized tires",
    ],
    recommendedModels: ["Sur-Ron Ultra Bee Homologuée", "Sur-Ron Hyper Bee 2026"],
  },
  // 2. Pièces Détachées, Tuning & Kits Performance
  {
    id: "luna-cycle",
    name: "Luna Cycle (Tuning 72V)",
    url: "https://lunacycle.com/sur-ron-parts/",
    category: "performance_parts",
    country: "États-Unis 🇺🇸",
    country_en: "United States 🇺🇸",
    badge: "Pionnier Custom 72V",
    badge_en: "72V Custom Tuning Pioneer",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    description:
      "Pionnier mondial du custom Sur-Ron proposant des contrôleurs débridés BAC4000/BAC8000, sabots inox renforcés et batteries haute puissance 72V.",
    description_en:
      "Global pioneer in custom Sur-Ron builds, offering unlocked high-power 72V controllers, reinforced stainless skid plates, and performance packs.",
    features: [
      "Contrôleurs débridés haute puissance & faisceaux plug-and-play",
      "Sabots de protection moteur renforcés en acier inoxydable",
      "Selles ergonomiques et kits de rehausse sur-mesure",
    ],
    features_en: [
      "High-output unlocked controllers & plug-and-play harnesses",
      "Reinforced heavy-duty stainless steel skid plates",
      "Ergonomic custom seats and riser triangle links",
    ],
    recommendedModels: ["Kit Contrôleur Torp/BAC", "Sabot Renforcé Luna", "Pack 72V 42Ah"],
  },
  {
    id: "amped-bikes",
    name: "Amped Bikes",
    url: "https://ampedbikes.com/collections/sur-ron-parts-and-accessories",
    category: "performance_parts",
    country: "États-Unis 🇺🇸",
    country_en: "United States 🇺🇸",
    badge: "Kits Warp 9 & Éclairage",
    badge_en: "Warp 9 & Baja Lighting",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
    description:
      "Boutique réputée offrant un catalogue exhaustif de composants Warp 9, phares Baja Designs, guidons surélevés et suspensions Fox/Fastace.",
    description_en:
      "Renowned boutique offering complete Warp 9 performance catalog, Baja Designs lighting, riser bars, and tuned Fox/Fastace suspension.",
    features: [
      "Roues complètes 16/19 pouces Warp 9 avec moyeux taillés masse",
      "Kits d'éclairage LED ultra-puissants Baja Designs",
      "Couronnes aluminium 54T/58T & chaînes renforcées O-Ring 420",
    ],
    features_en: [
      "Warp 9 16/19-inch billet wheelsets and rims",
      "Ultra-bright Baja Designs high-output LED headlights",
      "54T/58T aluminum sprockets & 420 O-Ring chains",
    ],
    recommendedModels: ["Jantes Warp 9 Supermoto", "Kit Phare Baja LED", "Couronne 58T"],
  },
  {
    id: "mxbits-europe",
    name: "MXBITS Europe",
    url: "https://www.mxbits.com/collections/sur-ron-parts-upgrades-accessories",
    category: "performance_parts",
    country: "Europe 🇪🇺",
    country_en: "Europe 🇪🇺",
    badge: "Stock Europe Sans Douane",
    badge_en: "EU Stock Zero Customs",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    description:
      "Spécialiste européen des pièces OEM d'origine et composants aftermarket sans frais de douane avec livraison rapide 48-72h dans toute l'Union Européenne.",
    description_en:
      "European specialist for genuine OEM parts and aftermarket upgrades with fast 48-72h EU shipping and zero import duties.",
    features: [
      "Expédition rapide intra-européenne sans taxe d'importation",
      "Pièces de carrosserie, plastiques et kits déco d'origine",
      "Systèmes de freinage hydraulique 4 pistons Formula / Magura",
    ],
    features_en: [
      "Fast intra-EU shipping with no customs fees",
      "Genuine plastics, frame sub-assemblies, and graphics kits",
      "Formula & Magura 4-piston hydraulic racing brake setups",
    ],
    recommendedModels: ["Freins Magura MT7 Pro", "Kits Plastiques OEM", "Courroies Gates"],
  },
  {
    id: "torp-motors",
    name: "Torp Motors (Contrôleurs TC500)",
    url: "https://www.torpmotors.com/",
    category: "performance_parts",
    country: "Slovénie / Europe 🇪🇺",
    country_en: "Slovenia / Europe 🇪🇺",
    badge: "Contrôleurs Plug & Play",
    badge_en: "Plug & Play Smart Controllers",
    badgeColor: "bg-lime-500/10 text-lime-400 border-lime-500/30",
    description:
      "Constructeur des contrôleurs haute technologie Torp TC500 et TC1000 avec application mobile Bluetooth dédiée et gestion thermique active.",
    description_en:
      "Manufacturer of state-of-the-art Torp TC500 and TC1000 controllers with Bluetooth mobile tuning app and active thermal management.",
    features: [
      "Contrôleur 100% plug & play compatible écran et faisceau d'origine",
      "Application mobile iOS/Android pour réglage des courbes de puissance",
      "Gain de puissance jusqu'à 17 kW avec batterie d'origine ou 72V",
    ],
    features_en: [
      "100% plug-and-play, works with stock display and wiring harness",
      "iOS/Android Bluetooth app for live power curve adjustment",
      "Power upgrade up to 17 kW on stock or 72V performance packs",
    ],
    recommendedModels: ["Contrôleur Torp TC500", "Écran Torp Display", "Capteur de Pouce"],
  },
  // 3. Occasion Reconditionnée & Grossistes B2B
  {
    id: "sur-ron-global-b2b",
    name: "Sur-Ron Official Factory B2B",
    url: "https://sur-ron.com/",
    category: "used_wholesale",
    country: "International 🌐",
    country_en: "International 🌐",
    badge: "Portail Constructeur Officiel",
    badge_en: "Official Manufacturer Portal",
    badgeColor: "bg-zinc-500/10 text-zinc-300 border-zinc-500/30",
    description:
      "Site institutionnel de la marque Sur-Ron fournissant les spécifications techniques constructeur, manuels d'atelier et vérification des numéros de série VIN.",
    description_en:
      "Official manufacturer portal providing engineering specs, workshop manuals, firmware updates, and VIN chassis serial verification.",
    features: [
      "Base de données officielle et téléchargement des manuels d'atelier",
      "Vérification d'authenticité des numéros de châssis VIN",
      "Accès aux mises à jour de firmware calculateurs constructeur",
    ],
    features_en: [
      "Official technical database & workshop manual downloads",
      "Chassis VIN authenticity check & verification",
      "Access to official manufacturer firmware updates",
    ],
    recommendedModels: ["Portail VIN Check", "Manuels d'Atelier", "Firmware V3"],
  },
];

export default function SurronEcosystemSection({
  locale,
}: {
  locale: string;
}) {
  const [activeTab, setActiveTab] = useState<
    "all" | "official_dealer" | "performance_parts" | "used_wholesale"
  >("all");

  const isFr = locale === "fr";

  const filtered =
    activeTab === "all"
      ? SURRON_ECOSYSTEM_DATA
      : SURRON_ECOSYSTEM_DATA.filter((item) => item.category === activeTab);

  return (
    <section className="border-t border-zinc-800 bg-[#09090b] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/40 bg-lime-400/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-lime-400">
            <Zap className="h-3.5 w-3.5" />
            <span>{isFr ? "Écosystème Officiel & Tuning Haute Performance" : "Official Ecosystem & Performance Tuning Hub"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white max-w-4xl">
            {isFr ? "Distributeurs Agréés, Pièces Tuning 72V & Portails Certifiés" : "Authorized Dealers, 72V Tuning Kits & Certified Portals"}
          </h2>

          <p className="max-w-3xl text-sm sm:text-base text-zinc-400 leading-relaxed">
            {isFr
              ? "Accédez aux distributeurs officiels et spécialistes de pièces de performance (Torp, Warp 9, Luna Cycle) pour personnaliser et entretenir votre monture en toute sécurité."
              : "Access official distributors and top performance tuning specialists (Torp, Warp 9, Luna Cycle) to upgrade and maintain your machine with zero counterfeit risks."}
          </p>
        </div>

        {/* Anti-Scam Shield Banner */}
        <div className="mt-10 rounded-3xl border border-amber-400/30 bg-gradient-to-r from-amber-950/30 via-zinc-900 to-zinc-900 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-zinc-950 shadow-glow-amber">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {isFr ? "Bouclier Anti-Contrefaçons & Marché Gris" : "Anti-Counterfeit & Grey Market Shield"}
                  <span className="rounded bg-amber-400/20 px-2 py-0.5 text-xs font-semibold text-amber-300">
                    {isFr ? "Important" : "Important"}
                  </span>
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-300 max-w-3xl">
                  {isFr
                    ? "Méfiez-vous des copies non authentiques vendues sur des plateformes non certifiées : batteries sans cellules de rang 1, absence de certificat de conformité européen (COC) rendant l'immatriculation impossible, et risques de défaillance thermique. Nos partenaires listés garantissent des véhicules authentiques d'origine constructeur avec garantie."
                    : "Beware of unauthorized copies sold on unverified marketplaces: uncertified battery cells, missing COC certificate making registration impossible, and severe fire hazards. Our listed partners guarantee 100% authentic OEM vehicles with full factory warranty."}
                </p>
              </div>
            </div>

            <Link
              href={`/${locale}/catalogue?brand=Sur-Ron+Official`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-amber-300 transition shadow-sm"
            >
              <span>{isFr ? "Voir les Sur-Ron Certifiées" : "Explore Certified Sur-Ron Fleet"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: "all" as const, label: isFr ? "Tous les Portails (10)" : "All Certified Portals (10)", icon: <Globe2 className="h-4 w-4" /> },
            { id: "official_dealer" as const, label: isFr ? "🏛️ Distributeurs Officiels Vente Neuve (5)" : "🏛️ Official Dealers & New Sales (5)", icon: <Store className="h-4 w-4" /> },
            { id: "performance_parts" as const, label: isFr ? "⚡ Pièces & Upgrades Performance Tuning (4)" : "⚡ Performance Parts & 72V Tuning (4)", icon: <Wrench className="h-4 w-4" /> },
            { id: "used_wholesale" as const, label: isFr ? "🔄 Constructeur & Support B2B (1)" : "🔄 Manufacturer & B2B Support (1)", icon: <Truck className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-bold transition ${
                activeTab === tab.id
                  ? "bg-lime-400 text-zinc-950 shadow-glow-lime"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Grid of Partners & Accounts */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur-sm transition hover:border-lime-400/50 hover:bg-zinc-900/90 hover:shadow-glow-lime"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                      {isFr ? item.country : item.country_en}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition mt-0.5">
                      {item.name}
                    </h3>
                  </div>

                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold shrink-0 ${item.badgeColor}`}>
                    {isFr ? item.badge : item.badge_en}
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {isFr ? item.description : item.description_en}
                </p>

                {/* Key Features */}
                <div className="mt-4 space-y-2 border-t border-zinc-800/80 pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-lime-400" />
                    {isFr ? "Points forts & Services :" : "Key Highlights & Services:"}
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {(isFr ? item.features : item.features_en).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-lime-400 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended models */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.recommendedModels.map((mod, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-zinc-950/80 border border-zinc-800 px-2 py-1 text-[10px] font-medium text-zinc-400"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-zinc-800/60">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs font-bold text-white hover:border-lime-400 hover:bg-lime-400 hover:text-zinc-950 transition"
                >
                  <span>{isFr ? "Accéder au Portail Officiel" : "Access Official Portal"}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for Sur-Ron Catalog & Configurator */}
        <div className="mt-14 rounded-3xl border border-lime-400/40 bg-gradient-to-r from-zinc-900 via-lime-950/30 to-zinc-900 p-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {isFr
              ? "Vous souhaitez configurer votre Sur-Ron avec kit Torp ou Warp 9 ?"
              : "Looking to build your custom Sur-Ron with Torp or Warp 9 upgrades?"}
          </h3>
          <p className="mt-2 text-sm text-zinc-300 max-w-2xl mx-auto">
            {isFr
              ? "Tous nos modèles Sur-Ron neufs en stock sont livrés clés en main avec certificat de conformité officiel COC, bonus écologique déduit et contrôle technique PDI 50 points."
              : "All new Sur-Ron machines in stock include official COC certificate of conformity, state eco-grants deducted upfront, and full 50-point PDI workshop preparation."}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/catalogue?brand=Sur-Ron+Official`}
              className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-lime-300 shadow-glow-lime transition"
            >
              <Zap className="h-4 w-4" />
              <span>{isFr ? "Explorer la Gamme Sur-Ron Neuve" : "Explore New Sur-Ron Fleet"}</span>
            </Link>
            <Link
              href={`/${locale}/product/surron-light-bee-x-2026`}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-700 px-6 py-3 text-sm font-bold text-white hover:border-lime-400 transition"
            >
              <span>{isFr ? "Personnaliser ma Light Bee X" : "Customize my Light Bee X"}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
