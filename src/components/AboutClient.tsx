"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function AboutClient({ locale }: { locale: string }) {
  const isFr = locale === "fr";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-xs font-bold text-lime-400 uppercase tracking-widest">
          <Building2 className="h-3.5 w-3.5" />
          <span>{isFr ? "Qui Sommes-Nous ? • Showroom & Équipe" : "About Us • Flagship Showroom & Team"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {isFr ? "L'Excellence de la Mobilité Électrique Réelle" : "Authentic High-Performance Electric Mobility"}
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
          {isFr
            ? "eVolt Apex n'est pas un site de dropshipping anonyme. Nous sommes une entreprise française immatriculée au RCS de Paris, disposant d'un showroom de 850 m² à Paris, d'ateliers techniques certifiés et d'une convention ministérielle ASP pour l'avance du bonus écologique."
            : "eVolt Apex is not a faceless dropshipping platform. We are a registered French electric dealership operating an 850 m² flagship showroom in Paris, certified high-voltage workshops, and direct state eco-grant advance agreements."}
        </p>
      </div>

      {/* Flagship Showroom Section */}
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-700 px-3.5 py-1 text-xs font-semibold text-lime-400">
            <MapPin className="h-3.5 w-3.5" />
            <span>{isFr ? "Showroom Flagship • 850 m²" : "Flagship Showroom • 850 m² (9,100 sq ft)"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            18 Avenue de la Grande Armée, 75017 Paris
          </h2>

          <p className="text-sm text-zinc-300 leading-relaxed">
            {isFr
              ? "Situé sur l'avenue historique des deux-roues parisiens, à 200 mètres de la Place de l'Étoile, notre showroom réunit les modèles les plus exclusifs au monde (Zero Motorcycles, LiveWire, Verge TS Ultra, Sur-Ron, Stark Future, Specialized)."
              : "Located on the historic Parisian two-wheeler avenue, 200 yards from the Arc de Triomphe, our flagship showroom showcases the world's most prestigious electric machines (Zero Motorcycles, LiveWire, Verge TS Ultra, Sur-Ron, Stark Future, Specialized)."}
          </p>

          <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-xs sm:text-sm">
            <div className="flex items-center gap-3 text-zinc-300">
              <Clock className="h-4 w-4 text-lime-400 shrink-0" />
              <span><strong>{isFr ? "Horaires :" : "Opening Hours:"}</strong> {isFr ? "Du Lundi au Samedi de 09h00 à 19h00 sans interruption" : "Monday to Saturday, 9:00 AM - 7:00 PM CET"}</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-300">
              <Phone className="h-4 w-4 text-lime-400 shrink-0" />
              <span><strong>{isFr ? "Ligne Directe Showroom :" : "Direct Showroom Hotline:"}</strong> +33 1 45 78 90 00</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-300">
              <Mail className="h-4 w-4 text-lime-400 shrink-0" />
              <span><strong>{isFr ? "Contact Équipe :" : "Team Contact:"}</strong> contact@evolt-bikes.com / showroom@evolt-bikes.com</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={`/${locale}/catalogue`}
              className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-xs font-bold text-zinc-950 hover:bg-lime-300 shadow-glow-lime transition"
            >
              <Zap className="h-4 w-4" />
              <span>{isFr ? "Explorer le Stock Showroom" : "Explore Showroom Inventory"}</span>
            </Link>
          </div>
        </div>

        {/* Showroom Visual */}
        <div className="relative h-[400px] lg:h-[480px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl lg:col-span-6">
          <Image
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80"
            alt="Showroom Flagship Paris eVolt Apex"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-zinc-950/90 border border-zinc-800 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">{isFr ? "Centre Technique & PDI Agréé" : "Certified High-Voltage & PDI Workshop"}</span>
              <span className="text-lime-400 font-semibold">Paris 17e</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              {isFr
                ? "Banc de puissance d'essai, banc de charge rapide DC 50kW et diagnostic batterie haute tension."
                : "Dyno testing bench, DC 50kW fast charger, and high-voltage battery diagnostic facility."}
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Engineering Team */}
      <div className="mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {isFr ? "Des Passionnés et Ingénieurs à Votre Service" : "Passionate Engineers & Mechanics at Your Service"}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            {isFr
              ? "Une équipe accessible, joignable par téléphone et présente physiquement au showroom."
              : "A dedicated team reachable directly by phone and physically present on the showroom floor."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 text-center space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 text-lime-400 border border-lime-400/30 text-2xl font-black">
              MV
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Marc Vandevelde</h4>
              <p className="text-xs text-lime-400 font-medium">{isFr ? "Co-Fondateur & Directeur Général" : "Co-Founder & Managing Director"}</p>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                {isFr
                  ? "Ancien ingénieur propulsion et compétiteur en coupe du monde MotoE. Plus de 12 ans d'expérience dans la transition des motorisations électriques."
                  : "Former EV powertrain engineer and MotoE World Cup competitor. Over 12 years pioneering high-performance electric transitions."}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 text-center space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 text-cyan-400 border border-cyan-400/30 text-2xl font-black">
              CM
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Claire Marchand</h4>
              <p className="text-xs text-cyan-400 font-medium">{isFr ? "Directrice Logistique & Réseau" : "Head of Logistics & Supply Operations"}</p>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                {isFr
                  ? "Spécialiste du transport sécurisé de deux-roues lourds et de la gestion des immatriculations ANTS express en France et en Europe."
                  : "Specialist in secured heavy two-wheeler logistics and expedited vehicle title registrations across Europe and North America."}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 text-center space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 text-emerald-400 border border-emerald-400/30 text-2xl font-black">
              TL
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Thomas Lefèvre</h4>
              <p className="text-xs text-emerald-400 font-medium">{isFr ? "Chef d'Atelier & Responsable PDI 50 Points" : "Master Workshop Technician & 50-Point PDI Lead"}</p>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                {isFr
                  ? "15 ans d'expertise atelier en concessions officielles BMW Motorrad et Ducati. Formé aux habilitations haute tension B2VL / BCL."
                  : "15 years workshop experience across BMW Motorrad and Ducati official dealerships. Certified high-voltage master technician."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Legal Table */}
      <div className="mt-24 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-lime-400" />
          <span>{isFr ? "Fiche d'Identité Juridique & Agréments Ministériels" : "Corporate Legal Identity & Official Approvals"}</span>
        </h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-xs">
          <div className="space-y-1">
            <span className="text-zinc-500 uppercase tracking-wider font-semibold">{isFr ? "Raison Sociale" : "Legal Entity Name"}</span>
            <p className="font-bold text-white text-sm">eVolt Apex Technologies SAS</p>
          </div>
          <div className="space-y-1">
            <span className="text-zinc-500 uppercase tracking-wider font-semibold">{isFr ? "Capital Social" : "Share Capital"}</span>
            <p className="font-bold text-white text-sm">500 000,00 € (Fully Paid Up)</p>
          </div>
          <div className="space-y-1">
            <span className="text-zinc-500 uppercase tracking-wider font-semibold">{isFr ? "Numéro SIREN / SIRET" : "Company Registration / SIREN"}</span>
            <p className="font-mono font-bold text-white text-sm">921 458 712 00018 (RCS Paris)</p>
          </div>
          <div className="space-y-1">
            <span className="text-zinc-500 uppercase tracking-wider font-semibold">{isFr ? "Numéro TVA Intracommunautaire" : "EU VAT Number"}</span>
            <p className="font-mono font-bold text-white text-sm">FR 48 921458712</p>
          </div>
          <div className="space-y-1">
            <span className="text-zinc-500 uppercase tracking-wider font-semibold">{isFr ? "Agrément Ministériel ASP" : "State ASP Eco-Grant Agreement"}</span>
            <p className="font-bold text-lime-400 text-sm">N° ASP-EVOLT-2026-7842</p>
          </div>
          <div className="space-y-1">
            <span className="text-zinc-500 uppercase tracking-wider font-semibold">{isFr ? "Garantie Financière & Responsabilité" : "Financial Liability Coverage"}</span>
            <p className="font-bold text-white text-sm">AXA Assurances Entreprises Policy N° 8492019</p>
          </div>
        </div>
      </div>
    </div>
  );
}
