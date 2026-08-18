import React from "react";
import { Dictionary } from "@/i18n/dictionaries";
import { ShieldCheck, BatteryCharging, Wrench, Award, Lock } from "lucide-react";

const ICONS = [
  <BatteryCharging key="battery" className="h-7 w-7 text-lime-400" />,
  <Wrench key="wrench" className="h-7 w-7 text-cyan-400" />,
  <Award key="award" className="h-7 w-7 text-emerald-400" />,
  <ShieldCheck key="shield" className="h-7 w-7 text-amber-400" />,
];

export default function TrustBadges({ dict, locale }: { dict: Dictionary; locale?: string }) {
  const t = dict.trust;
  const isFr = locale === "fr" || !locale;

  return (
    <section className="border-t border-zinc-800 bg-zinc-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-lime-400 mb-3">
            <Lock className="h-3.5 w-3.5" />
            <span>{isFr ? "Bouclier de Confiance & Zéro Duperie" : "Trust Shield & Zero Gimmicks"}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.points.map((point, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm hover:border-lime-400/40 hover:bg-zinc-900 transition duration-300"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-zinc-950 p-3.5 border border-zinc-800">
                {ICONS[idx % ICONS.length]}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
