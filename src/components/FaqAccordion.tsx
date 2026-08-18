"use client";

import { useState } from "react";
import { Dictionary } from "@/i18n/dictionaries";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FaqJsonLd } from "./JsonLd";

export default function FaqAccordion({ dict, locale }: { dict: Dictionary; locale?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const t = dict.faq;
  const isFr = locale === "fr" || !locale;

  return (
    <section className="border-t border-zinc-800 bg-zinc-950/70 py-16 sm:py-24">
      {/* Schema.org FAQPage */}
      <FaqJsonLd items={t.items.map((it) => ({ q: it.q, a: it.a }))} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-lime-400 mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>{isFr ? "Foire Aux Questions" : "Frequently Asked Questions"}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {t.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 transition duration-200"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition hover:bg-zinc-900/80"
                >
                  <span className="font-semibold text-white text-base sm:text-lg pr-4">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-lime-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-sm sm:text-base text-zinc-300 leading-relaxed border-t border-zinc-800/60">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
