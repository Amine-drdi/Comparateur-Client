// app/components/MutuelleHospitalisation.tsx
"use client";
import React from "react";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import NavbarA from "../Home/NavBar";
import Footer from "../Home/Footer";

/* ------------------------------ Icons (SVG) ------------------------------ */

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12l1.7 1.8L15 9.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBolt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M13 2L4 14h7l-1 8 10-14h-7l0-6z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20 7L10 17l-4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------ Images ------------------------------ */

const images = {
  hero: "/images/Hospitalisation.png",
  hospitalisation: "/images/CouvertureHospi.jpg",
  chirurgie: "/images/hospitalisation-chirurgie.jpg",
  chambre: "/images/chambre-particuliere.jpg",
  economie: "/images/hospitalisation-economie.jpg",
  conseiller: "/images/conseiller-hospitalisation.jpg",
  ambulance: "/images/transport-sanitaire.jpg",
};

/* ------------------------------ UI elements ------------------------------ */

function SectionDivider() {
  return (
    <div className="relative my-12 md:my-16 lg:my-20">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
    </div>
  );
}

function PrimaryButton({ 
  href, 
  children, 
  onClick 
}: { 
  href?: string; 
  children: React.ReactNode; 
  onClick?: () => void 
}) {
  const ButtonContent = (
    <>
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
      <span className="absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-[220%] transition-all duration-700" />
      <span className="relative inline-flex items-center gap-2 whitespace-nowrap">
        {children}
        <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </span>
    </>
  );

  const className = `
    group relative inline-flex items-center justify-center gap-2
    rounded-xl px-4 py-3 sm:px-6 sm:py-3.5 text-sm font-semibold text-white
    bg-gradient-to-r from-blue-600 to-blue-700
    shadow-lg w-full sm:w-auto
    transition-all duration-300
    hover:shadow-[0_15px_40px_-10px_rgba(37,99,235,0.6)]
    hover:-translate-y-1
    active:translate-y-0
    focus:outline-none focus:ring-4 focus:ring-blue-500/20
    overflow-hidden
  `;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={className}
      >
        {ButtonContent}
      </button>
    );
  }

  return (
    <a
      href={href}
      className={className}
    >
      {ButtonContent}
    </a>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="
        inline-flex items-center justify-center gap-2
        rounded-xl border border-blue-200 bg-white/90 px-4 py-3 sm:px-6 sm:py-3.5
        text-sm font-semibold text-blue-700 w-full sm:w-auto
        shadow-sm transition-all duration-300
        hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5
        focus:outline-none focus:ring-4 focus:ring-blue-500/15
        whitespace-nowrap
      "
    >
      {children}
    </a>
  );
}

function SectionTitle({
  title,
  subtitle,
  id,
}: {
  title: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <header id={id} className="text-center space-y-4 mb-8 lg:mb-10 px-2 sm:px-0">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold ring-1 ring-blue-100">
        <IconCheck className="w-3 h-3" />
        Couverture Hospitalisation
      </div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 px-2">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-base sm:text-lg leading-7 text-slate-600 max-w-3xl mx-auto px-4">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

function Card({
  title,
  children,
  icon,
  image,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />

      {image && (
        <div className="relative h-32 sm:h-40 mb-4 rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </div>
      )}

      <div className="flex items-start gap-3 sm:gap-4">
        {icon ? (
          <span className="mt-1 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg flex-shrink-0">
            {icon}
          </span>
        ) : null}

        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{title}</h3>
          <div className="text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">{children}</div>
        </div>
      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/15 rounded-2xl transition-colors duration-300" />
    </div>
  );
}

function StepCard({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
      <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
        {step}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">{title}</h3>
      <div className="text-slate-600 leading-relaxed text-sm sm:text-base">{children}</div>
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 opacity-20">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-500/10 blur-xl" />
      </div>
    </div>
  );
}

/* ------------------------------ Composant FAQItem ------------------------------ */

function FAQItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div 
      className="group rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg hover:border-blue-200 hover:bg-blue-50/40 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0 mt-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold ring-1 ring-blue-200 text-xs sm:text-sm">
          ?
        </div>

        <div className="flex-1">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">{q}</h3>

          {/* Version desktop: hover pour afficher */}
          <div className="hidden md:block text-xs sm:text-sm text-slate-700 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-96 transition-all duration-500">
            {a}
          </div>
          
          {/* Version mobile: clic pour afficher */}
          <div className={`md:hidden text-xs sm:text-sm text-slate-700 leading-relaxed transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}>
            {a}
          </div>
        </div>

        <div className={`flex-shrink-0 text-blue-600 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Données structurées SEO ------------------------------ */

const hospitalisationSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Une mutuelle hospitalisation est-elle suffisante ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elle est suffisante si vous êtes en bonne santé et consommez peu de soins courants (dentaire, pharmacie). C'est une couverture 'coup dur' idéale pour se protéger contre la ruine financière d'une opération sans payer une mutuelle complète."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le prix d'une mutuelle hospitalisation ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elle est 40% à 60% moins chère qu'une mutuelle classique. Comptez 10-15€/mois pour un jeune et environ 30-40€/mois pour un senior. Le prix varie selon la prise en charge des dépassements d'honoraires."
      }
    },
    {
      "@type": "Question",
      "name": "La chambre particulière est-elle remboursée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, mais uniquement par la mutuelle (la Sécu ne la rembourse jamais). Selon le contrat, vous pouvez avoir un forfait de 30€ à 150€ par jour, ce qui est recommandé pour les cliniques privées."
      }
    }
  ]
};

/* ------------------------------ Page content ------------------------------ */
function Dots({ value, max = 6 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const active = i < value;
        return (
          <span
            key={i}
            className={[
              "inline-block h-2.5 w-2.5 rounded-full",
              active ? "bg-green-600" : "bg-white ring-1 ring-slate-300",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

function GuaranteesTable() {
  const levels = [
    { key: "n1", label: "Niveau 1" },
    { key: "n2", label: "Niveau 2" },
    { key: "n3", label: "Niveau 3" },
    { key: "n4", label: "Niveau 4" },
    { key: "n5", label: "Niveau 5" },
    { key: "n6", label: "Niveau 6" },
  ] as const;

  // Valeurs à ajuster si tu veux coller exactement à tes niveaux
  const rows = [
    { label: "HOSPITALISATION", info: true, values: [1, 2, 3, 4, 5, 6] },
    { label: "SOINS COURANTS", info: true, values: [1, 2, 3, 4, 5, 6] },
    { label: "OPTIQUE", info: true, values: [1, 2, 3, 4, 5, 6] },
    { label: "DENTAIRE", info: true, values: [1, 2, 3, 4, 5, 6] },
    { label: "AIDES AUDITIVES", info: true, values: [1, 2, 3, 4, 5, 6] },
    { label: "PRÉVENTION ET MÉDECINES DOUCES", info: true, values: [1, 2, 3, 4, 5, 6] },
    { label: "SERVICES INCLUS", info: false, values: [5, 5, 5, 5, 5, 5] },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      {/* Mobile: scroll horizontal */}
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left px-4 py-4 text-sm font-bold text-slate-700 border-b border-slate-200 w-[360px]">
                GARANTIES
              </th>

              {levels.map((lvl) => (
                <th key={lvl.key} className="px-3 py-3 border-b border-slate-200">
                  <div className="rounded-xl bg-green-600 text-white px-3 py-3 text-center">
                    <div className="text-sm font-extrabold">{lvl.label}</div>
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-200"
                      onClick={() => {
                        // Branche ici ton modal / navigation "Voir en détail"
                        // Exemple: setIsCallbackModalOpen(true) ou router.push(...)
                      }}
                    >
                      Voir en détail
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="odd:bg-white even:bg-slate-50">
                <td className="px-4 py-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-slate-800 tracking-wide">
                      {row.label}
                    </span>

                    {row.info ? (
                      <span
                        title="Détails de la garantie"
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold"
                      >
                        i
                      </span>
                    ) : null}
                  </div>
                </td>

                {row.values.map((v, idx) => (
                  <td key={idx} className="px-3 py-4 border-b border-slate-200">
                    <div className="flex justify-center">
                      <Dots value={v} max={6} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optionnel: note */}
      <div className="px-4 py-3 text-xs text-slate-500 border-t border-slate-200">
        Les points représentent un niveau relatif de couverture (plus il y a de points, meilleure est la prise en charge).
      </div>
    </div>
  );
}


export default function MutuelleHospitalisationPage() {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = React.useState(false);

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalisationSchema) }}
      />
      <NavbarA />

      <main className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f6ff] via-[#f0f4ff] to-[#e8f2ff] z-0">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
            <div className="absolute -top-12 -right-12 sm:-top-24 sm:-right-24 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -left-12 sm:-bottom-24 sm:-left-24 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-2xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6">
                {/* H1 principal */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl leading-tight font-extrabold text-blue-700 mb-3 sm:mb-4 mt-12">
                  Mutuelle Hospitalisation : Votre Séjour à l'Hôpital 100% Remboursé
                </h1>
                
                {/* Sous-titre descriptif */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed py-2">
                  Une hospitalisation peut engendrer des <strong className="text-blue-600">frais médicaux élevés</strong> et un <strong className="text-blue-600">reste à charge important</strong>.
                  La <strong className="text-blue-600">mutuelle hospitalisation</strong> permet de compléter les remboursements de la Sécurité sociale et d'assurer une <strong className="text-blue-600">prise en charge optimale</strong> lors d'un séjour à l'hôpital.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
                  <PrimaryButton onClick={() => setIsCallbackModalOpen(true)}>
                    Comparer en 2 min
                  </PrimaryButton>
                  <SecondaryButton href="tel:0188812108">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                    </svg>
                    Parler à un conseiller : 01 88 81 21 08
                  </SecondaryButton>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 sm:pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center ring-1 ring-green-200">
                      <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-green-700">100% Remboursé</span>
                      <span className="block text-xs text-green-600">Séjour à l'hôpital</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center ring-1 ring-blue-200">
                      <IconShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-blue-700">Économique</span>
                      <span className="block text-xs text-blue-600">40-60% d'économies</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/20 flex items-center justify-center ring-1 ring-yellow-200">
                      <IconBolt className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-yellow-700">Chambre Privée</span>
                      <span className="block text-xs text-yellow-600">Confort assuré</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Hero */}
              <div className="relative mt-8 sm:mt-16 lg:mt-0">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-white/40">
                  <Image
                    src={images.hero}
                    alt="Mutuelle hospitalisation - Séjour à l'hôpital 100% remboursé"
                    width={600}
                    height={400}
                    className=" rounded-2xl sm:rounded-3xl mt-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-2xl sm:rounded-3xl" />
                 
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="space-y-16 sm:space-y-20">
            {/* Qu'est-ce qu'une mutuelle hospitalisation ? */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="definition"
                title="Qu'est-ce qu'une mutuelle hospitalisation ?"
                subtitle="Une complémentaire santé spécialisée pour les séjours à l'hôpital"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card
                  title="Couvertuore ciblée"
                  icon={<IconCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
                  image={images.hospitalisation}
                >
                  <p>La <strong>mutuelle hospitalisation</strong> est une complémentaire santé spécialisée qui intervient principalement en cas d'hospitalisation, programmée ou en urgence.</p>
                </Card>

                <Card 
                  title="Frais lourds pris en charge" 
                  icon={<IconBolt className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.chirurgie}
                >
                  <p>Elle permet de réduire voire supprimer le <strong>reste à charge</strong> après remboursement de l'Assurance Maladie pour les séjours hospitaliers, interventions chirurgicales et soins intensifs.</p>
                </Card>

                <Card 
                  title="Pour qui ?" 
                  icon={<IconShield className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.conseiller}
                >
                  <p>• Personnes souhaitant une protection renforcée à moindre coût<br/>
                  • Seniors et retraités<br/>
                  • Familles souhaitant sécuriser les risques majeurs<br/>
                  • Indépendants et travailleurs non-salariés</p>
                </Card>
              </div>
            </section>
            <SectionDivider />

            {/* Pourquoi souscrire une mutuelle hospitalisation ? */}
            <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="pourquoi"
                title="Pourquoi souscrire une mutuelle hospitalisation ?"
                subtitle="Les avantages d'une couverture spécialisée"
              />

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    1
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Limiter le reste à charge</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p>Les frais liés à une hospitalisation (honoraires, dépassements, frais non remboursés) peuvent rapidement devenir importants. La mutuelle hospitalisation permet de limiter vos dépenses.</p>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    2
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Meilleur confort hospitalier</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p>Accédez à des prestations de confort comme la chambre particulière, télévision, lit accompagnant, pour un séjour plus agréable.</p>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    3
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Faire face aux urgences</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p>Une hospitalisation imprévue peut déséquilibrer un budget. La <strong>mutuelle hospitalisation pas chère</strong> permet d'anticiper ce risque.</p>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* Les garanties essentielles */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="garanties"
                title="Les garanties essentielles d'une mutuelle hospitalisation"
                subtitle="Les postes de remboursement indispensables pour votre séjour"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { 
                    title: "Frais de séjour", 
                    desc: "Ticket modérateur, forfait journalier hospitalier", 
                    icon: "🏥" 
                  },
                  { 
                    title: "Honoraires médicaux", 
                    desc: "Dépassements d'honoraires des spécialistes et chirurgiens", 
                    icon: "👨‍⚕️" 
                  },
                  { 
                    title: "Chambre particulière", 
                    desc: "Prise en charge partielle ou totale selon le contrat", 
                    icon: "🛏️" 
                  },
                  { 
                    title: "Actes lourds", 
                    desc: "Anesthésie, soins post-opératoires, réanimation", 
                    icon: "⚕️" 
                  },
                  { 
                    title: "Frais annexes", 
                    desc: "Transport sanitaire, accompagnant, frais divers", 
                    icon: "🚑" 
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="
                      group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100
                      shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1
                      relative overflow-hidden h-full
                    "
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{item.icon}</div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm">{item.desc}</p>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Couverture typique</span>
                        <span className="text-sm font-bold text-blue-600">200% - 500% BRSS</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <SectionDivider />

            {/* Mutuelle hospitalisation seule ou complète ? */}
            <section className="py-8 sm:py-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Mutuelle hospitalisation seule ou mutuelle santé complète ?</h2>
                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 px-2">
                  Choisissez la formule qui correspond le mieux à vos besoins et votre budget
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
                  <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
                    <div className="text-3xl mb-4 text-blue-600">🏥</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Mutuelle hospitalisation seule</h3>
                    <p className="text-slate-600 mb-4">Idéale pour les assurés cherchant une <strong>couverture ciblée et économique</strong>. Parfaite pour les "coups durs".</p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-blue-600">À partir de 10€/mois</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                    <div className="text-3xl mb-4 text-green-600">💊</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Mutuelle santé complète</h3>
                    <p className="text-slate-600 mb-4">Recommandée pour une prise en charge globale (soins courants, optique, dentaire).</p>
                    <div className="text-center">
                      <Link href="/mutuelle-sante" className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold">
                        Découvrir la mutuelle complète →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <PrimaryButton href="/comparateur-mutuelle">
                  Comparer les deux options
                </PrimaryButton>
              </div>
            </section>
            <SectionDivider />

            {/* Comment choisir ? */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="choisir"
                title="Comment choisir la meilleure mutuelle hospitalisation ?"
                subtitle="Les critères essentiels pour faire le bon choix"
              />

              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20 hidden md:block" />
                <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-200 md:hidden" />

                <div className="grid md:grid-cols-4 gap-6 md:gap-8 relative">
                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={1} title="Vérifier le niveau">
                      <ul className="space-y-1 sm:space-y-2">
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Pourcentage du BRSS</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Plafonds annuels</span>
                        </li>
                      </ul>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={2} title="Examiner les exclusions">
                      <p>Certaines garanties peuvent être soumises à des <strong>délais de carence</strong> ou des exclusions. Lisez attentivement les conditions.</p>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={3} title="Comparer les offres">
                      <p>Utilisez notre <strong className="text-blue-600">comparateur mutuelle hospitalisation</strong> pour identifier la meilleure solution.</p>
                      <Link href="/comparateur-mutuelle" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm mt-3">
                        Comparer maintenant →
                      </Link>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={4} title="Être accompagné">
                      <p>Nos conseillers analysent votre situation et vous orientent vers la <strong className="text-blue-600">mutuelle hospitalisation la plus adaptée</strong>.</p>
                      <div className="mt-3 sm:mt-4">
                        <SecondaryButton href="tel:0188812108">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                          </svg>
                          Parler à un conseiller
                        </SecondaryButton>
                      </div>
                    </StepCard>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* Changer ou résilier */}
            <section className="py-8 sm:py-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Changer ou résilier sa mutuelle hospitalisation</h2>
                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 px-2">
                  Grâce à la <strong>résiliation infra-annuelle</strong>, vous pouvez changer de contrat facilement après un an.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <PrimaryButton href="/resiliation-mutuelle">En savoir plus sur la résiliation</PrimaryButton>
                  <SecondaryButton href="tel:0188812108">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                    </svg>
                    Parler à un conseiller
                  </SecondaryButton>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* FAQ */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="faq"
                title="FAQ - Mutuelle Hospitalisation"
                subtitle="Toutes les réponses à vos questions sur la mutuelle hospitalisation"
              />

              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
                <FAQItem
                  q="Une mutuelle hospitalisation est-elle suffisante ?"
                  a={
                    <div>
                      <p className="mb-3"><strong className="text-blue-600">Cela dépend de votre profil médical et de votre tolérance au risque.</strong></p>
                      <p className="mb-3">La <strong>mutuelle hospitalisation seule</strong> est une couverture "coup dur". Elle est conçue pour couvrir exclusivement les frais très coûteux liés à un séjour à l'hôpital (chirurgie, anesthésie, frais de séjour).</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Elle est suffisante si :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Vous êtes en parfaite santé</li>
                          <li>Vous ne portez ni lunettes ni appareil dentaire</li>
                          <li>Vous consultez très rarement le médecin</li>
                        </ul>
                        <p className="text-sm mt-2">Elle vous protège contre la ruine financière en cas d'accident ou de maladie grave.</p>
                      </div>
                      
                      <div className="bg-red-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-red-700 mb-2">Elle est insuffisante si :</h4>
                        <p className="text-sm">Vous avez des besoins réguliers (pharmacie, kiné, dentiste). Dans ce cas, tous les soins courants seront entièrement à votre charge (hormis la part Sécu).</p>
                      </div>
                      
                      <p className="text-sm"><strong>En résumé :</strong> C'est une excellente option pour <strong>réduire drastiquement votre budget assurance</strong>, à condition d'accepter de payer vous-même vos soins de ville.</p>
                    </div>
                  }
                />
                <FAQItem
                  q="Quel est le prix d'une mutuelle hospitalisation ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">C'est l'atout majeur de cette formule : elle est beaucoup moins chère qu'une complémentaire santé classique (souvent 40% à 60% d'économie).</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Tarifs indicatifs :</h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span><strong>Pour un jeune actif :</strong></span>
                            <span className="font-bold text-green-600">10€ à 15€ par mois</span>
                          </li>
                          <li className="flex justify-between">
                            <span><strong>Pour un senior (60 ans) :</strong></span>
                            <span className="font-bold text-green-600">30€ à 40€ par mois</span>
                          </li>
                        </ul>
                        <p className="text-sm mt-2">Contre plus de 80€ pour une mutuelle complète.</p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3">
                        <h4 className="font-semibold text-green-800 mb-2">Ce qui fait varier le prix :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Le niveau de prise en charge des dépassements d'honoraires (100%, 200%, 300% BRSS)</li>
                          <li>Le montant du forfait chambre particulière</li>
                        </ul>
                      </div>
                    </div>
                  }
                />
                <FAQItem
                  q="La chambre particulière est-elle remboursée ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Oui, mais uniquement par votre mutuelle.</p>
                      <p className="mb-3">Il est important de savoir que la Sécurité sociale ne rembourse <strong>jamais</strong> la chambre particulière (considérée comme une prestation de confort), sauf cas très exceptionnels d'isolement médical.</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Forfaits journaliers en euros :</h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span><strong>Niveau basique :</strong></span>
                            <span className="font-bold text-blue-600">30€ à 50€ / jour</span>
                            <span className="text-sm text-slate-500">(suffisant pour l'hôpital public)</span>
                          </li>
                          <li className="flex justify-between">
                            <span><strong>Niveau confort :</strong></span>
                            <span className="font-bold text-blue-600">80€ à 150€ / jour</span>
                            <span className="text-sm text-slate-500">(recommandé pour les cliniques privées)</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <h4 className="font-semibold text-yellow-800 mb-2">Conseil important :</h4>
                        <p className="text-sm">Vérifiez si votre contrat limite la durée de prise en charge (ex: 30 jours/an) ou si elle est à <strong>durée illimitée</strong>, ce qui est préférable pour une vraie sécurité.</p>
                      </div>
                    </div>
                  }
                />
              </div>
            </section>
            <SectionDivider />

            {/* CTA Final */}
            <section className="py-12 sm:py-16">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 p-5 sm:p-8 md:p-12">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-white/10 to-blue-400/20 blur-2xl sm:blur-3xl" />
                <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full -translate-y-16 sm:-translate-y-32 translate-x-16 sm:translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full translate-y-24 sm:translate-y-48 -translate-x-24 sm:-translate-x-48" />

                <div className="relative text-center text-white px-2 sm:px-0">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Comparez les mutuelles hospitalisation et anticipez les imprévus</h2>
                  <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Anticiper une hospitalisation, c'est protéger votre budget et votre sérénité. Comparez dès maintenant les <strong>meilleures mutuelles hospitalisation</strong> et bénéficiez d'un accompagnement personnalisé.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
                    <PrimaryButton href="/comparateur-mutuelle">Comparer en 2 min</PrimaryButton>

                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center ring-1 ring-white/10">
                        <IconShield className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm sm:text-base">100% remboursé</div>
                        <div className="text-xs sm:text-sm">Séjour à l'hôpital</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">40-60%</div>
                      <div className="text-xs sm:text-sm text-blue-200">D'économies</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">10-40€</div>
                      <div className="text-xs sm:text-sm text-blue-200">Prix mensuel</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">100%</div>
                      <div className="text-xs sm:text-sm text-blue-200">Chambre particulière</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">4.8/5</div>
                      <div className="text-xs sm:text-sm text-blue-200">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}