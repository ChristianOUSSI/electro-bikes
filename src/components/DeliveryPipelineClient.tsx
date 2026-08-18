"use client";

import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  Wrench,
  FileCheck,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

export default function DeliveryPipelineClient({ locale }: { locale: string }) {
  const isFr = locale === "fr";

  const steps = isFr
    ? [
        {
          num: "01",
          title: "Contrôle Technique PDI 50 Points en Atelier",
          desc: "Chaque véhicule est réceptionné dans notre atelier de Paris Grande Armée. Nos techniciens habilités B2VL effectuent un contrôle exhaustif : serrage au couple aérospatial de chaque vis, mise à jour des calculateurs & firmware BMS, test de charge sur banc haute puissance et vérification des freins et suspensions.",
          badge: "Rapport PDI signé remis au client",
          icon: <Wrench className="h-6 w-6 text-lime-400" />,
        },
        {
          num: "02",
          title: "Démarches Carte Grise ANTS & Pose de Plaque",
          desc: "En tant qu'opérateur habilité par le Ministère de l'Intérieur, nous éditons votre certificat provisoire d'immatriculation (CPI) sous 24h. Votre plaque minéralogique en plexiglas renforcé est posée avec des rivets inviolables avant le chargement sur camion.",
          badge: "Zéro démarche en préfecture",
          icon: <FileCheck className="h-6 w-6 text-cyan-400" />,
        },
        {
          num: "03",
          title: "Transporteur Spécialisé 2-Roues avec Hayon Hydraulique",
          desc: "Nous ne passons par aucun transporteur de colis standard. Votre moto ou vélo électrique de 20 à 260 kg est acheminé sur un camion capitonné dédié deux-roues, calé individuellement par sanglage 4 points et sabot de roue pneumatique. Prise de rendez-vous sur créneau de 2 heures.",
          badge: "Assurance Ad Valorem 100% incluse",
          icon: <Truck className="h-6 w-6 text-emerald-400" />,
        },
        {
          num: "04",
          title: "Déballage & Prise en Main VIP à Domicile",
          desc: "Le chauffeur-livreur spécialisé décharge le véhicule devant votre domicile, retire les protections, vérifie l'état général avec vous, vous remet le carnet d'entretien, le double des clés électroniques, le chargeur et effectue une démonstration des modes de conduite et de la recharge.",
          badge: "Batterie chargée à 100% prête à rouler",
          icon: <ShieldCheck className="h-6 w-6 text-amber-400" />,
        },
      ]
    : [
        {
          num: "01",
          title: "50-Point Certified Workshop PDI Inspection",
          desc: "Every vehicle is received and prepared in our certified technical center. Master technicians perform a thorough 50-point pre-delivery inspection: torque verification on all fasteners, BMS firmware update, dyno load testing, and hydraulic brake calibration.",
          badge: "Signed PDI quality certificate included",
          icon: <Wrench className="h-6 w-6 text-lime-400" />,
        },
        {
          num: "02",
          title: "Official Vehicle Title, Registration & Fitted Plate",
          desc: "As an authorized registration partner, we process your vehicle title and temporary registration within 24h. Your reinforced legal license plate is permanently mounted with tamper-proof rivets before loading onto the carrier.",
          badge: "Zero DMV / prefecture paperwork for you",
          icon: <FileCheck className="h-6 w-6 text-cyan-400" />,
        },
        {
          num: "03",
          title: "Specialized 2-Wheel Carrier with Hydraulic Lift-Gate",
          desc: "We never use generic parcel networks. Your electric motorcycle or e-bike is transported in a dedicated, padded two-wheel carrier truck, individually secured with 4-point ratchets and pneumatic wheel chocks. 2-hour appointment window scheduled with you.",
          badge: "100% Ad Valorem transit insurance included",
          icon: <Truck className="h-6 w-6 text-emerald-400" />,
        },
        {
          num: "04",
          title: "VIP White-Glove Handover & Ride-Ready Onboarding",
          desc: "The specialist delivery driver unloads your machine at your driveway, removes protective covers, conducts a joint walk-around inspection, hands over documentation and master keys, and demonstrates drive modes and fast charging.",
          badge: "100% Fully Charged & Ready to Ride",
          icon: <ShieldCheck className="h-6 w-6 text-amber-400" />,
        },
      ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-xs font-bold text-lime-400 uppercase tracking-widest">
          <Truck className="h-3.5 w-3.5" />
          <span>{isFr ? "Pipeline Logistique Clé en Main" : "Turnkey Logistics Pipeline"}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {isFr ? "Comment Nous Livrons un Véhicule de 250 kg chez Vous" : "How We Safely Deliver a 250 kg Machine to Your Door"}
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
          {isFr
            ? "Transporter une LiveWire de 250 kg ou un cargo longtail familial exige une chaîne logistique dédiée. Découvrez notre protocole rigoureux de la préparation d'atelier jusqu'à votre porte."
            : "Transporting a 550-lb LiveWire superbike or a high-end cargo e-bike requires dedicated logistics. Explore our rigorous protocol from master workshop prep straight to your driveway."}
        </p>
      </div>

      {/* 4 Steps Timeline */}
      <div className="mt-16 space-y-8">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-start gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 backdrop-blur-sm hover:border-lime-400/40 transition"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 border border-zinc-800 text-lime-400">
              {s.icon}
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-black text-lime-400 bg-lime-400/10 border border-lime-400/30 px-2 py-0.5 rounded">
                    {isFr ? "ÉTAPE" : "STEP"} {s.num}
                  </span>
                  <h3 className="text-xl font-bold text-white">{s.title}</h3>
                </div>

                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300">
                  {s.badge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Return Policy & Guarantee */}
      <div className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {isFr ? "Garantie Satisfait ou Remboursé 14 Jours" : "14-Day Money-Back Guarantee"}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-300 max-w-2xl">
                {isFr
                  ? "Conformément à la législation européenne, vous disposez de 14 jours ou 200 km pour essayer votre véhicule dans vos conditions réelles. Si vous n'êtes pas 100% conquis, notre transporteur vient récupérer la machine et vous êtes remboursé intégralement."
                  : "Enjoy 14 days or 125 miles to test your machine under your daily riding conditions. If you are not 100% thrilled, our specialized carrier retrieves the vehicle from your home for a full refund."}
              </p>
            </div>
          </div>

          <Link
            href={`/${locale}/catalogue`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-xs font-bold text-zinc-950 hover:bg-lime-300 transition shadow-glow-lime"
          >
            <span>{isFr ? "Découvrir les Véhicules Éligibles" : "Explore Eligible Machines"}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
