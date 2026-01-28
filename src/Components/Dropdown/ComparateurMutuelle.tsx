"use client";
import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../../../public/Image/logo2.png";
import ComparateurMutuelleProfiles from "@/Components/Dropdown/ComparateurMutuelleProfiles.client";
import NavbarA from "../Home/NavBar";
import Footer from "../Home/Footer";

export const metadata: Metadata = {
  title: "Comparateur Mutuelle Santé : Votre Devis Gratuit en 2 min",
  description:
    "Économisez jusqu'à 40% sur votre assurance santé. Comparez gratuitement les meilleures mutuelles pour seniors, familles et retraités. Devis immédiat et sans engagement.",
  keywords: [
    "comparateur mutuelle santé",
    "La Mutuelle De France gratuit",
    "comparatif assurance santé",
    "meilleure mutuelle",
    "mutuelle pas chère",
    "comparateur mutuelle senior",
    "changer de mutuelle",
    "La Mutuelle De France en ligne",
  ],
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/comparateur-mutuelle",
  },
  openGraph: {
    title: "Comparateur Mutuelle : Trouvez la Meilleure Offre en 2 min",
    description:
      "Ne payez plus trop cher ! Utilisez notre comparateur 100% gratuit pour trouver une couverture santé adaptée à vos besoins (Optique, Dentaire, Hospitalisation).",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/comparateur-mutuelle",
    siteName: "La Mutuelle De France",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment fonctionne un comparateur de mutuelle santé ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Vous remplissez un formulaire unique. Notre système compare ensuite les offres disponibles pour vous proposer des devis personnalisés, classés par prix et pertinence.",
      },
    },
    {
      "@type": "Question",
      name: "Le comparateur de mutuelle est-il gratuit ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Oui, le service est 100 % gratuit et sans engagement. Vous comparez, puis vous choisissez librement.",
      },
    },
    {
      "@type": "Question",
      name: "Comment obtenir le meilleur prix pour ma mutuelle ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Personnalisez vos garanties et mettez les offres en concurrence régulièrement pour obtenir le meilleur rapport garanties/prix.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je être accompagné pour la résiliation ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Oui. Après un an de contrat, vous pouvez résilier à tout moment. Un conseiller peut vous accompagner dans les démarches.",
      },
    },
  ],
};

function PhoneLink({ phone }: { phone: string }) {
  const tel = phone.replace(/\s+/g, "");
  return (
    <a
      className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base"
      href={`tel:${tel}`}
      aria-label={`Appeler le ${phone}`}
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
      </svg>
      {phone}
    </a>
  );
}

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

/* ------------------------------ Images (Placeholders) ------------------------------ */

// Vous devrez ajouter ces images dans votre dossier public/images/
const images = {
  hero: "/images/comparateur-hero.jpg",
  family: "/images/Devis-mutuelle-sante.jpg",
  senior: "/images/mutuelle-senior.jpg",
  savings: "/images/économisez-argent-mutuelle.jpg",
  guarantee: "/images/garantie.jpg",
  advisor: "/images/conseiller-mutuelle.jpg",
};

/* ------------------------------ UI elements ------------------------------ */

function SectionDivider() {
  return (
    <div className="relative my-12 md:my-16 lg:my-20">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm whitespace-nowrap">
      {children}
    </span>
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
        Comparateur Expert
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

/* ------------------------------ Page content ------------------------------ */

export default function PageComparateurMutuelle() {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = React.useState(false);

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl leading-tight font-extrabold text-blue-700 mb-3 sm:mb-4 mt-24">
                  Comparateur Mutuelle Santé : Votre Devis Gratuit en 2 min
                </h1>
                
                {/* Sous-titre descriptif */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed py-2">
                  Comparez gratuitement les meilleures mutuelles santé du marché grâce à notre comparateur de mutuelle rapide, fiable et pensé pour les <strong>seniors</strong>, <strong>retraités</strong>, <strong>familles</strong> et tous les profils ayant besoin d&apos;une meilleure couverture santé.
                </p>

                
                {/* Badge d'économie */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg mb-4">
                  <IconCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                  Jusqu&apos;à 40% d&apos;économie sur votre mutuelle
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <PrimaryButton onClick={() => setIsCallbackModalOpen(true)}>
                    Être rappelé par un expert
                  </PrimaryButton>
                  <SecondaryButton href="tel:0188812108">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                    </svg>
                    Parler à un conseiller
                  </SecondaryButton>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 sm:pt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center ring-1 ring-green-200">
                      <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-green-700">100% Gratuit</span>
                      <span className="block text-xs text-green-600">Sans frais cachés</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center ring-1 ring-blue-200">
                      <IconShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-blue-700">Sans Engagement</span>
                      <span className="block text-xs text-blue-600">Aucune obligation</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/20 flex items-center justify-center ring-1 ring-yellow-200">
                      <IconBolt className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-yellow-700">Rapide & Simple</span>
                      <span className="block text-xs text-yellow-600">2 minutes max</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Formulaire Hero */}
              <div
                className="
                  relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8
                  shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)] sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]
                  ring-1 ring-white/40 mt-8 sm:mt-16 lg:mt-0
                "
              >
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />

                <div className="relative">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Obtenez vos devis</h3>
                  <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">Comparez les offres en 2 minutes</p>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">Votre âge</label>
                      <input
                        className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl border border-slate-200 px-3 sm:px-4 text-sm outline-none transition-all
                                   focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="Ex: 45"
                        inputMode="numeric"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">Votre situation</label>
                      <select
                        className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl border border-slate-200 px-3 sm:px-4 text-sm outline-none transition-all
                                   focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                      >
                        <option>Sélectionnez votre profil</option>
                        <option>Senior (55+)</option>
                        <option>Famille</option>
                        <option>Retraité</option>
                        <option>Actif</option>
                        <option>Indépendant</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">Vos besoins prioritaires</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Optique", "Dentaire", "Hospitalisation", "Médecine douce"].map((need) => (
                          <label
                            key={need}
                            className="
                              flex items-center gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200
                              hover:bg-blue-50 cursor-pointer transition-colors text-xs sm:text-sm
                            "
                          >
                            <input
                              type="checkbox"
                              className="h-3 w-3 sm:h-4 sm:w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/40 transition"
                            />
                            <span className="text-slate-700">{need}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <PrimaryButton href="/comparateur-mutuelle-santé">Comparer maintenant</PrimaryButton>

                    <p className="text-xs text-slate-500 text-center px-2">
                      Service 100% gratuit • Sans engagement • Données sécurisées
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="space-y-16 sm:space-y-20">
            <WhySection />
            <SectionDivider />

            <HowItWorksSection />
            <SectionDivider />

            <GuaranteesSection />
            <SectionDivider />

            <ComparateurMutuelleProfiles 
              isOpen={isCallbackModalOpen}
              onClose={() => setIsCallbackModalOpen(false)}
            />
            <SectionDivider />

            <ResiliationSection />
            <SectionDivider />

            <FAQSection />
            <SectionDivider />

            <FinalCTA />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function WhySection() {
  return (
    <section className="py-8 sm:py-12">
      <SectionTitle
        id="pourquoi"
        title="Pourquoi choisir notre comparateur ?"
        subtitle="Un outil conçu pour vous faire économiser sur votre mutuelle santé"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card
          title="Économisez jusqu'à 40%"
          icon={<IconCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
          image={images.savings}
        >
          <p>Comparez les tarifs pour trouver la mutuelle la plus avantageuse pour votre budget.</p>
        </Card>

        <Card title="Devis en 2 minutes" icon={<IconBolt className="w-5 h-5 sm:w-6 sm:h-6" />} image={images.family}>
          <p>Formulaire rapide et simple pour obtenir vos devis personnalisés immédiatement.</p>
        </Card>

        <Card title="Garanties adaptées" icon={<IconShield className="w-5 h-5 sm:w-6 sm:h-6" />} image={images.guarantee}>
          <p>Comparez les garanties essentielles : optique, dentaire, hospitalisation, etc.</p>
        </Card>

        <Card
          title="Conseiller dédié"
          icon={
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          }
          image={images.advisor}
        >
          <p>Un expert vous accompagne pour choisir la meilleure offre et résilier votre ancienne mutuelle.</p>
        </Card>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
      <SectionTitle
        id="fonctionnement"
        title="Comment ça marche ?"
        subtitle="3 étapes simples pour comparer et économiser"
      />

      <div className="relative">
        {/* Ligne horizontale desktop */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20 hidden md:block" />
        {/* Guide vertical mobile */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-200 md:hidden" />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
          <div className="relative md:pl-0 pl-8">
            <StepCard step={1} title="Remplissez le formulaire">
              <p>Indiquez votre profil, vos besoins en santé et votre budget.</p>
              <p className="mt-3 sm:mt-4 text-blue-600 font-medium text-sm sm:text-base">
                <Link href="/mutuelle-sante" className="hover:underline">
                  En savoir plus sur les mutuelles santé →
                </Link>
              </p>
            </StepCard>
          </div>

          <div className="relative md:pl-0 pl-8">
            <StepCard step={2} title="Comparez les offres">
              <ul className="space-y-1 sm:space-y-2">
                <li className="flex items-center gap-2">
                  <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-sm sm:text-base">Tarifs détaillés</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-sm sm:text-base">Garanties comparées</span>
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-sm sm:text-base">Avis clients vérifiés</span>
                </li>
              </ul>
            </StepCard>
          </div>

          <div className="relative md:pl-0 pl-8">
            <StepCard step={3} title="Choisissez en toute sérénité">
              <p>Notre conseiller vous accompagne dans votre choix et les démarches.</p>
              <p className="mt-3 sm:mt-4">
                <PhoneLink phone="01 88 81 21 08" />
              </p>
            </StepCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuaranteesSection() {
  return (
    <section className="py-8 sm:py-12">
      <SectionTitle
        id="garanties"
        title="Les garanties comparées"
        subtitle="Comparez les postes de remboursement essentiels pour votre santé"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { title: "Hospitalisation", desc: "Chambre particulière, chirurgie, longue durée", icon: "🏥" },
          { title: "Optique", desc: "Lunettes, lentilles, chirurgie réfractive", icon: "👓" },
          { title: "Dentaire", desc: "Prothèses, implants, soins courants", icon: "🦷" },
          { title: "Médecines douces", desc: "Ostéopathie, acupuncture, naturopathie", icon: "🌿" },
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
                <span className="text-xs text-slate-500">Couverture moyenne</span>
                <span className="text-sm font-bold text-blue-600">200% - 400%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResiliationSection() {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Besoin de changer de mutuelle ?</h2>
        <p className="text-base sm:text-lg text-slate-600 mb-4 sm:mb-6 px-2">
          Après un an de contrat, vous pouvez résilier votre mutuelle actuelle à tout moment. Notre équipe vous accompagne
          dans toutes les démarches.
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
  );
}

function FAQSection() {
  return (
    <section className="py-8 sm:py-12">
      <SectionTitle
        id="faq"
        title="Questions fréquentes"
        subtitle="Toutes les réponses à vos questions sur notre comparateur"
      />

      <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
        <FAQItem
          q="Comment fonctionne un comparateur de mutuelle santé ?"
          a={
            <p>
              Notre comparateur analyse les offres de plus de 50 mutuelles partenaires. Après avoir rempli votre profil,
              nous vous présentons les meilleures offres personnalisées selon vos besoins et votre budget.
            </p>
          }
        />
        <FAQItem
          q="Le comparateur est-il vraiment gratuit ?"
          a={
            <p>
              Oui, notre service est 100% gratuit. Vous ne payez aucun frais pour utiliser le comparateur, recevoir vos
              devis ou être accompagné par un conseiller. Nous sommes rémunérés par nos partenaires lorsque vous
              souscrivez une mutuelle.
            </p>
          }
        />
        <FAQItem
          q="Comment obtenir le meilleur prix ?"
          a={
            <div>
              <p>Pour obtenir le meilleur prix, nous vous recommandons de :</p>
              <ul className="list-disc pl-4 sm:pl-5 mt-2 space-y-1 text-sm">
                <li>Comparer plusieurs devis</li>
                <li>Adapter vos garanties à vos besoins réels</li>
                <li>Négocier avec votre conseiller</li>
                <li>Relancer la comparaison chaque année</li>
              </ul>
            </div>
          }
        />
        <FAQItem
          q="Puis-je être accompagné pour résilier mon ancienne mutuelle ?"
          a={
            <p>
              Absolument. Notre service d&apos;accompagnement comprend l&apos;aide à la résiliation de votre ancienne mutuelle. Un
              conseiller vous guide dans les démarches et s&apos;assure que la transition se passe en toute tranquillité.
            </p>
          }
        />
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 p-5 sm:p-8 md:p-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-white/10 to-blue-400/20 blur-2xl sm:blur-3xl" />
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full -translate-y-16 sm:-translate-y-32 translate-x-16 sm:translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full translate-y-24 sm:translate-y-48 -translate-x-24 sm:-translate-x-48" />

        <div className="relative text-center text-white px-2 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Prêt à économiser sur votre mutuelle ?</h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Comparez gratuitement les meilleures offres et recevez vos devis personnalisés en 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
            <PrimaryButton href="/comparateur-mutuelle-santé">Comparer maintenant</PrimaryButton>

            <div className="flex items-center gap-3 text-blue-100">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center ring-1 ring-white/10">
                <IconShield className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm sm:text-base">Sans engagement</div>
                <div className="text-xs sm:text-sm">Service 100% gratuit</div>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold">50+</div>
              <div className="text-xs sm:text-sm text-blue-200">Mutuelles comparées</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold">40%</div>
              <div className="text-xs sm:text-sm text-blue-200">D&apos;économies moyennes</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold">2 min</div>
              <div className="text-xs sm:text-sm text-blue-200">Pour obtenir un devis</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold">4.8/5</div>
              <div className="text-xs sm:text-sm text-blue-200">Satisfaction clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}