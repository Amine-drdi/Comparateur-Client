"use client";

import * as React from "react";
import Link from "next/link";

function Card({
  title,
  children,
  highlight = false,
}: {
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`
        relative rounded-2xl border p-6 shadow-sm transition
        ${
          highlight
            ? "border-blue-500 bg-blue-50/40"
            : "border-gray-200 bg-white hover:shadow-md hover:-translate-y-0.5"
        }
      `}
    >
      {highlight && (
        <span className="absolute -top-3 left-4 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
          Recommandé
        </span>
      )}

      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-gray-600">{children}</div>
    </div>
  );
}

function CallbackPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Être rappelé gratuitement</h3>
            <p className="mt-1 text-sm text-gray-600">Un conseiller vous rappelle sous 24h</p>
          </div>

          <button onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" type="button">
            ✕
          </button>
        </div>

        <form
          className="mt-6 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: brancher backend / CRM
            onClose();
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              required
              name="fullName"
              placeholder="Nom & Prénom"
              className="h-11 rounded-xl border border-gray-300 px-4 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <input
              required
              name="phone"
              inputMode="tel"
              placeholder="Téléphone"
              className="h-11 rounded-xl border border-gray-300 px-4 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            className="h-11 rounded-xl border border-gray-300 px-4 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />

          <select
            required
            name="subject"
            className="h-11 rounded-xl border border-gray-300 px-4 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            defaultValue=""
          >
            <option value="" disabled>
              Sujet de la demande
            </option>
            <option value="devis">La Mutuelle De France</option>
            <option value="changement">Changer de mutuelle</option>
            <option value="resiliation">Résiliation</option>
            <option value="garanties">Optimisation garanties</option>
            <option value="Autres">Autres</option>
          </select>

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 px-6 py-3 text-sm font-semibold text-white shadow hover:opacity-90 focus:ring-2 focus:ring-blue-500/30"
          >
            Être rappelé gratuitement
          </button>

          <p className="text-center text-xs text-gray-500">Service 100% gratuit – sans engagement</p>
        </form>
      </div>
    </div>
  );
}

interface ComparateurMutuelleProfilesProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ComparateurMutuelleProfiles({ 
  isOpen: externalIsOpen, 
  onClose: externalOnClose 
}: ComparateurMutuelleProfilesProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  
  // Utilisez l'état externe si fourni, sinon l'état interne
  const open = externalIsOpen !== undefined ? externalIsOpen : internalOpen;
  const handleClose = externalOnClose || (() => setInternalOpen(false));
  const handleOpen = () => setInternalOpen(true);

  return (
    <section id="profils" className="space-y-8">
      <header className="max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-900">Une mutuelle adaptée à chaque profil</h2>
        <p className="mt-2 text-sm text-gray-600">
          Nos offres sont personnalisées selon votre âge, votre situation et vos besoins médicaux.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Mutuelle Senior">
          <p>Renfort hospitalisation, optique et audiologie.</p>
          <Link href="/mutuelle-senior" className="mt-3 inline-block text-blue-500 font-medium">
            Découvrir →
          </Link>
        </Card>

        <Card title="Mutuelle Famille" highlight>
          <p>Protection complète pour parents et enfants.</p>
          <Link href="/mutuelle-famille" className="mt-3 inline-block text-blue-500 font-medium">
            Découvrir →
          </Link>
        </Card>

        <Card title="Actifs & Indépendants">
          <p>Le meilleur équilibre garanties / budget.</p>

          <button
            onClick={handleOpen}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white hover:bg-green-600"
            type="button"
          >
            Être rappelé gratuitement
          </button>
        </Card>
      </div>

      <CallbackPopup open={open} onClose={handleClose} />
    </section>
  );
}