// app/components/MutuellePasChere.tsx
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
  hero: "/images/mutuelle-pas-chere-hero.jpeg", // Image pour la section hero
  economie: "/images/economie-mutuelle.jpg",
  profil: "/images/profil-sante.jpg",
  garanties: "/images/garanties-essentielles.jpg",
  erreurs: "/images/erreurs-choix-mutuelle.jpg",
  conseiller: "/images/conseiller-mutuelle.jpg",
  devis: "/images/devis-gratuit.jpg",
  centPourcentSante: "/images/100-pourcent-sante.jpg",
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
        Mutuelle Pas Chère
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

const pasChereSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Une mutuelle pas chère est-elle suffisante ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, si elle est adaptée à votre profil. Une mutuelle économique bien choisie couvre les soins essentiels (hospitalisation, médicaments) et évite les options superflues qui gonflent le prix."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on avoir une mutuelle pas chère en étant senior ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, en sélectionnant des garanties ciblées. En supprimant les options inutiles (maternité, orthodontie enfant) et en optimisant les niveaux de remboursement, on peut réduire la cotisation tout en restant bien couvert."
      }
    },
    {
      "@type": "Question",
      "name": "Le 100 % Santé est-il inclus ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, la plupart des contrats responsables, même économiques, incluent le 100% Santé. Cela vous garantit un reste à charge zéro sur des lunettes, prothèses dentaires et appareils auditifs spécifiques."
      }
    }
  ]
};

/* ------------------------------ Page content ------------------------------ */

export default function MutuellePasCherePage() {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = React.useState(false);

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pasChereSchema) }}
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
                  Mutuelle Pas Chère : Devis Gratuit
                </h1>
                
                {/* Sous-titre descriptif */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed py-2">
                  Trouver une <strong className="text-blue-600">mutuelle pas chère</strong> ne signifie pas renoncer à une bonne protection. Grâce à une analyse précise de votre profil, il est possible de bénéficier d'une <strong className="text-blue-600">complémentaire santé économique</strong>, adaptée à vos besoins réels et à votre budget.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
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
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 sm:pt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center ring-1 ring-green-200">
                      <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-green-700">Devis Gratuit</span>
                      <span className="block text-xs text-green-600">Sans engagement</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center ring-1 ring-blue-200">
                      <IconShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-blue-700">100% Santé</span>
                      <span className="block text-xs text-blue-600">Inclus</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/20 flex items-center justify-center ring-1 ring-yellow-200">
                      <IconBolt className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-yellow-700">Économies</span>
                      <span className="block text-xs text-yellow-600">Garanties</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Hero */}
              <div className="relative mt-8 sm:mt-16 lg:mt-0">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-white/40 mt-6 ml-6 ">
                  <Image
                    src={images.hero}
                    alt="Mutuelle pas chère - Complémentaire santé économique"
                    width={500}
                    height={400}
                    className=" rounded-2xl sm:rounded-3xl"
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
            {/* Qu'est-ce qu'une mutuelle pas chère */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="definition"
                title="Qu'est-ce qu'une mutuelle pas chère ?"
                subtitle="Une complémentaire santé optimisée sans options superflues"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Card
                  title="Une mutuelle adaptée à votre profil"
                  icon={<IconCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
                  image={images.profil}
                >
                  <h4 className="font-semibold text-slate-800 mb-2">Vous payez uniquement pour ce dont vous avez réellement besoin</h4>
                  <p>Le prix dépend de l'âge, de la situation familiale et des besoins médicaux.</p>
                  <div className="mt-3">
                    <SecondaryButton href="tel:0188812108">
                      Parler à un conseiller
                    </SecondaryButton>
                  </div>
                </Card>

                <Card 
                  title="À qui s'adresse une mutuelle pas chère ?" 
                  icon={<IconBolt className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.devis}
                >
                  <h4 className="font-semibold text-slate-800 mb-2">Profils concernés</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <IconCheck className="w-3 h-3 text-green-500" />
                      <span><strong>Seniors et retraités</strong> souhaitant maîtriser leur budget</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="w-3 h-3 text-green-500" />
                      <span><strong>Familles</strong> recherchant une couverture essentielle</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="w-3 h-3 text-green-500" />
                      <span>Personnes avec peu de soins réguliers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="w-3 h-3 text-green-500" />
                      <span>Assurés souhaitant <strong>changer de mutuelle trop chère</strong></span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Link href="/mutuelle-sante/mutuelle-senior" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Mutuelle Senior →
                    </Link>
                    <Link href="/mutuelle-sante/changer-de-mutuelle" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Changer de Mutuelle →
                    </Link>
                  </div>
                </Card>
              </div>
            </section>
            <SectionDivider />

            {/* Pourquoi choisir une mutuelle santé pas chère */}
            <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="pourquoi"
                title="Pourquoi choisir une mutuelle santé pas chère ?"
                subtitle="Les avantages d'une complémentaire santé économique bien choisie"
              />

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    1
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Réduire immédiatement vos cotisations</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <h4 className="font-semibold text-slate-800 mb-2">Économies possibles sans perte de garanties essentielles</h4>
                    <p>De nombreux assurés paient trop cher pour des garanties qu'ils n'utilisent pas.</p>
                    <div className="mt-3">
                      <PrimaryButton onClick={() => setIsCallbackModalOpen(true)}>
                        Demander une étude gratuite
                      </PrimaryButton>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-green-50/60 p-5 sm:p-6 border border-green-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    2
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Bénéficier du dispositif 100 % Santé</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <h4 className="font-semibold text-slate-800 mb-2">Reste à charge zéro en optique, dentaire et auditif</h4>
                    <p>Une <strong>mutuelle pas chère</strong> bien choisie permet de profiter du <strong>100 % Santé</strong>.</p>
                    <div className="mt-3">
                      <Image
                        src={images.centPourcentSante}
                        alt="100% Santé"
                        width={200}
                        height={100}
                        className="w-full h-20 object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-yellow-50/60 p-5 sm:p-6 border border-yellow-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    3
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Anticiper les dépenses lourdes à moindre coût</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <h4 className="font-semibold text-slate-800 mb-2">Hospitalisation, soins imprévus</h4>
                    <p>Une mutuelle économique couvre les dépenses importantes sans alourdir votre budget.</p>
                    <Link href="/mutuelle-sante/mutuelle-hospitalisation" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm mt-2">
                      En savoir plus sur la mutuelle hospitalisation →
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* Quelles garanties pour une mutuelle pas chère efficace */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="garanties"
                title="Quelles garanties pour une mutuelle pas chère efficace ?"
                subtitle="Les couvertures essentielles pour une protection optimale"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { 
                    title: "Soins courants essentiels", 
                    desc: "Consultations, médicaments, analyses - Les remboursements de base indispensables",
                    icon: "💊",
                    details: "Consultations médecins généralistes et spécialistes, pharmacie, analyses médicales"
                  },
                  { 
                    title: "Hospitalisation", 
                    desc: "Forfait journalier et frais de séjour - Protection contre les dépenses importantes",
                    icon: "🏥",
                    details: "Forfait journalier hospitalier, frais de séjour, actes chirurgicaux"
                  },
                  { 
                    title: "Optique et dentaire maîtrisés", 
                    desc: "Accès aux paniers 100 % Santé - Soins visuels et dentaires essentiels",
                    icon: "👓",
                    details: "Lunettes, lentilles, soins dentaires courants, prothèses 100% Santé"
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
                    <p className="text-slate-600 text-xs sm:text-sm mb-3">{item.desc}</p>
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-xs text-slate-500">{item.details}</p>
                    </div>
                    {item.title.includes("Optique") && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Link href="/mutuelle-sante/mutuelle-optique" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          Mutuelle Optique →
                        </Link>
                        <Link href="/mutuelle-sante/mutuelle-dentaire" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          Mutuelle Dentaire →
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <SectionDivider />

            {/* Mutuelle pas chère : les erreurs à éviter */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="erreurs"
                title="Mutuelle pas chère : les erreurs à éviter"
                subtitle="Les pièges courants lors du choix d'une mutuelle économique"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { 
                    title: "Choisir uniquement le prix le plus bas", 
                    desc: "Vérifier les plafonds et exclusions - Un prix bas peut cacher des garanties insuffisantes",
                    warning: "⚠️",
                    conseil: "Comparez les garanties réelles plutôt que seulement les prix"
                  },
                  { 
                    title: "Négliger les délais de carence", 
                    desc: "Certaines mutuelles à bas coût imposent des délais d'attente avant activation des garanties",
                    warning: "⏳",
                    conseil: "Vérifiez les délais de carence pour chaque type de soin"
                  },
                  { 
                    title: "Souscrire sans accompagnement", 
                    desc: "Un mauvais choix peut coûter plus cher à long terme - Faites-vous conseiller",
                    warning: "👨‍💼",
                    conseil: "Profitez d'un conseil expert pour éviter les mauvaises surprises"
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="
                      group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100
                      shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                      relative overflow-hidden h-full
                    "
                  >
                    <div className="text-lg sm:text-xl mb-2 text-red-600">{item.warning}</div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <div className="text-slate-600 text-xs sm:text-sm mb-3">
                      <h4 className="font-semibold text-slate-800 mb-1">{item.desc.split(" - ")[0]}</h4>
                      <p>{item.desc.split(" - ")[1] || item.desc}</p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-xs text-blue-600 font-medium">{item.conseil}</p>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-10">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 blur-xl" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <SecondaryButton href="tel:0188812108">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                  </svg>
                  Parler à un expert : 01 88 81 21 08
                </SecondaryButton>
              </div>
            </section>
            <SectionDivider />

            {/* Comment trouver la meilleure mutuelle pas chère */}
            <section className="py-8 sm:py-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="trouver"
                title="Comment trouver la meilleure mutuelle pas chère ?"
                subtitle="Les étapes pour une recherche efficace et sécurisée"
              />

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">Comparer intelligemment les offres</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p>Utilisez notre <strong className="text-blue-600">comparateur de mutuelle pas chère</strong> pour filtrer les offres réellement adaptées à votre profil.</p>
                    <div className="mt-4">
                      <PrimaryButton onClick={() => setIsCallbackModalOpen(true)}>
                        Comparer maintenant
                      </PrimaryButton>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-green-50/60 p-5 sm:p-6 border border-green-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">Être conseillé avant de souscrire</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <h4 className="font-semibold text-slate-800 mb-2">Analyse gratuite et personnalisée</h4>
                    <p>Nos conseillers vous orientent vers une <strong>mutuelle santé économique</strong>, conforme et adaptée à vos besoins.</p>
                    <div className="mt-4">
                      <SecondaryButton href="tel:0188812108">
                        Être rappelé gratuitement par un conseiller
                      </SecondaryButton>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* Changer ou résilier pour payer moins cher */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="changer"
                title="Changer ou résilier pour payer moins cher"
                subtitle="Profitez de la résiliation infra-annuelle pour réduire vos cotisations"
              />

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Résiliation infra-annuelle</h3>
                    <h4 className="text-lg sm:text-xl font-semibold text-blue-700 mb-4">Changez de mutuelle sans frais après un an</h4>
                    <p className="text-slate-600 mb-4">Grâce à la réforme, vous pouvez résilier votre mutuelle à tout moment après 12 mois de contrat, sans frais ni justification.</p>
                    <PrimaryButton href="/mutuelle-sante/resiliation-mutuelle">
                      Résilier sa mutuelle
                    </PrimaryButton>
                  </div>
                  <div className="relative">
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <IconCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">Économies garanties</h4>
                          <p className="text-sm text-slate-600">Jusqu'à 30% sur votre mutuelle</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Résiliation 100% gratuite</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Pas d'interruption de couverture</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Démarches simplifiées</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* FAQ */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="faq"
                title="FAQ - Mutuelle Pas Chère"
                subtitle="Toutes les réponses à vos questions sur les mutuelles économiques"
              />

              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
                <FAQItem
                  q="Une mutuelle pas chère est-elle suffisante ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Oui, une mutuelle pas chère peut être parfaitement suffisante.</p>
                      <p className="mb-3">À condition qu'elle soit <strong>adaptée à votre profil</strong>, à votre âge et à vos besoins de santé réels. Une <strong>mutuelle santé pas chère</strong> bien choisie couvre les soins essentiels (consultations, médicaments, hospitalisation) tout en évitant les options inutiles qui augmentent le prix.</p>
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <p className="text-sm">L'essentiel est de privilégier une <strong>complémentaire santé économique personnalisée</strong>, plutôt qu'une offre standard bas de gamme.</p>
                      </div>
                    </div>
                  }
                />
                <FAQItem
                  q="Peut-on avoir une mutuelle pas chère en étant senior ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Oui, il est tout à fait possible de bénéficier d'une mutuelle pas chère pour senior.</p>
                      <p className="mb-3">À condition de sélectionner des <strong>garanties ciblées</strong> et adaptées aux besoins spécifiques liés à l'âge. En supprimant certaines options peu utilisées et en optimisant les niveaux de remboursement, il est possible de <strong>réduire significativement la cotisation</strong>, tout en conservant une bonne prise en charge.</p>
                      <div className="bg-green-50 rounded-lg p-3 mb-3">
                        <p className="text-sm">Une <strong>mutuelle senior pas chère</strong> repose sur l'équilibre entre <strong>protection utile</strong> et <strong>maîtrise du budget</strong>.</p>
                      </div>
                    </div>
                  }
                />
                <FAQItem
                  q="Le 100 % Santé est-il inclus ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Oui, le dispositif 100 % Santé peut être inclus dans une mutuelle pas chère.</p>
                      <p className="mb-3">Selon le contrat choisi. Ce dispositif permet un <strong>reste à charge zéro</strong> sur certains équipements en <strong>optique, dentaire et auditif</strong>, à condition de respecter les paniers définis par la réglementation.</p>
                      <div className="bg-yellow-50 rounded-lg p-3 mb-3">
                        <p className="text-sm">Même avec une <strong>mutuelle santé économique</strong>, il est donc possible d'accéder aux soins essentiels <strong>sans avancer de frais</strong>, si le contrat est bien sélectionné.</p>
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Trouvez votre mutuelle pas chère dès aujourd'hui</h2>
                  <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Payer moins cher votre mutuelle est possible <strong>sans compromis sur l'essentiel</strong>. Comparez les <strong>meilleures mutuelles pas chères</strong> et bénéficiez d'un accompagnement humain et transparent.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
                    <PrimaryButton onClick={() => setIsCallbackModalOpen(true)}>
                      Comparer en 2 min
                    </PrimaryButton>

                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center ring-1 ring-white/10">
                        <IconShield className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm sm:text-base">Conseil expert</div>
                        <div className="text-xs sm:text-sm">Personnalisé et gratuit</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">100%</div>
                      <div className="text-xs sm:text-sm text-blue-200">Santé inclus</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">30%</div>
                      <div className="text-xs sm:text-sm text-blue-200">D'économies moyennes</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">0€</div>
                      <div className="text-xs sm:text-sm text-blue-200">Frais de dossier</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">4.7/5</div>
                      <div className="text-xs sm:text-sm text-blue-200">Satisfaction clients</div>
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