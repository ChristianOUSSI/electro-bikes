"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { products } from "@/lib/products";
import { Dictionary } from "@/i18n/dictionaries";
import { productName } from "@/lib/format";
import { X, Calendar, CheckCircle2 } from "lucide-react";

interface TestRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product;
  dict: Dictionary;
  locale: string;
}

export default function TestRideModal({
  isOpen,
  onClose,
  initialProduct,
  dict,
  locale,
}: TestRideModalProps) {
  const [selectedProductId, setSelectedProductId] = useState(
    initialProduct?.id || products[0].id
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Paris Flagship Showroom (Grande Armée)");
  const [date, setDate] = useState("");
  const [licenseAgreed, setLicenseAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isFr = locale === "fr";

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseAgreed) return;
    setSubmitted(true);
  };

  const t = dict.testRide;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl border border-zinc-700 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 rounded-full bg-zinc-800 p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-400/20 text-lime-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-white">
              {isFr ? "Réservation d'Essai Enregistrée !" : "VIP Test Ride Booked!"}
            </h3>
            <p className="mt-2 text-sm text-zinc-300 max-w-md mx-auto">
              {t.form.success}
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-xl bg-lime-400 px-6 py-2.5 text-sm font-bold text-zinc-950 hover:bg-lime-300 transition shadow-glow-lime"
            >
              {isFr ? "Fermer" : "Close"}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime-400">
              <Calendar className="h-4 w-4" />
              <span>VIP Test Drive</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold text-white">{t.title}</h2>
            <p className="text-xs text-zinc-400 mt-1">{t.subtitle}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Product selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  {t.form.model}
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {productName(p, locale)} ({isFr ? p.license_label_fr : p.license_label_en})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t.form.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t.form.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email & City */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t.form.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t.form.city}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
                  >
                    <option value="Paris Flagship (Grande Armée)">Paris Flagship (18 Av. Grande Armée)</option>
                    <option value="Lyon Concession">Lyon E-Mobility Center</option>
                    <option value="Marseille Hub">Marseille Hub & Test Track</option>
                    <option value="Geneve Experience">Genève Hub Suisse</option>
                    <option value="Montreal Experience">Montréal Experience Center 🇨🇦</option>
                    <option value="Los Angeles Center">Los Angeles Showroom 🇺🇸</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  {t.form.date}
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none"
                />
              </div>

              {/* License Agreement Checkbox */}
              <div className="flex items-start gap-3 rounded-2xl bg-zinc-900/60 p-3.5 border border-zinc-800">
                <input
                  type="checkbox"
                  id="license"
                  checked={licenseAgreed}
                  onChange={(e) => setLicenseAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-lime-400 focus:ring-lime-400"
                />
                <label htmlFor="license" className="text-xs text-zinc-300 leading-relaxed cursor-pointer">
                  {isFr
                    ? "Je certifie être titulaire du permis de conduire adapté et m'engage à porter un casque homologué lors de l'essai."
                    : "I certify that I hold the required driver's license/endorsement and will wear an approved helmet during the test ride."}
                </label>
              </div>

              <button
                type="submit"
                disabled={!licenseAgreed}
                className="w-full rounded-2xl bg-lime-400 py-3.5 text-sm font-bold text-zinc-950 hover:bg-lime-300 transition shadow-glow-lime disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.form.submit}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
