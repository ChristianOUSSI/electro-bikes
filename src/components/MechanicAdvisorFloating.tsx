"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Wrench, X, Calendar } from "lucide-react";

export default function MechanicAdvisorFloating({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const isFr = locale === "fr";

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl border border-zinc-800 bg-zinc-950/95 p-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 border border-lime-400/40 text-lime-400 font-black text-sm">
                  TL
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Thomas Lefèvre</h4>
                <p className="text-[11px] text-lime-400 font-medium">
                  {isFr ? "Chef d'Atelier • Showroom Paris 17e" : "Chief Mechanic • Paris Showroom"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-zinc-400 hover:bg-zinc-900 hover:text-white"
              aria-label={isFr ? "Fermer" : "Close"}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 space-y-3">
            <p className="text-xs text-zinc-300 leading-relaxed">
              {isFr
                ? "« Bonjour ! Je suis présent à l'atelier de l'Avenue de la Grande Armée. Une question sur l'homologation, un kit 72V ou l'immatriculation ? Parlons-en directement. »"
                : "« Hello! I'm live in our Paris workshop. Need advice on homologation, 72V tuning kits, or registration? Feel free to reach out directly. »"}
            </p>

            <div className="space-y-2 pt-1">
              <a
                href="tel:+33145789000"
                className="flex items-center justify-between rounded-2xl bg-zinc-900 border border-zinc-800 p-3 text-xs font-bold text-white hover:border-lime-400 hover:bg-lime-400 hover:text-zinc-950 transition"
              >
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-lime-400" />
                  <span>+33 1 45 78 90 00</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-normal">
                  {isFr ? "Ligne Directe" : "Direct Call"}
                </span>
              </a>

              <a
                href="https://wa.me/33145789000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl bg-emerald-950/40 border border-emerald-500/30 p-3 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 transition"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{isFr ? "Discuter sur WhatsApp Atelier" : "Chat on WhatsApp"}</span>
                </div>
                <span className="text-[10px] font-normal">{isFr ? "Réponse rapide" : "Quick Reply"}</span>
              </a>

              <Link
                href={`/${locale}/about`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-2xl bg-zinc-950 border border-zinc-800 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white hover:border-zinc-700 transition"
              >
                <Calendar className="h-3.5 w-3.5 text-lime-400" />
                <span>{isFr ? "Visiter le Showroom de Paris" : "Visit Paris Showroom"}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 rounded-full border border-lime-400/40 bg-zinc-950/90 px-4 py-2.5 text-xs font-bold text-white shadow-glow-lime backdrop-blur-md hover:bg-zinc-900 transition"
      >
        <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-zinc-950">
          <Wrench className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-[11px] font-bold text-white group-hover:text-lime-400 transition">
            {isFr ? "Conseil d'Atelier en Direct" : "Live Workshop Advice"}
          </p>
          <p className="text-[10px] text-zinc-400">
            {isFr ? "Thomas (Chef d'Atelier)" : "Thomas (Chief Mechanic)"}
          </p>
        </div>
      </button>
    </div>
  );
}
