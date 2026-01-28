// app/components/ChangerMutuelle.tsx
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
  hero: "/images/changer-mutuelle-hero.jpeg", // Vous devrez créer/cette image
  comparatif: "/images/comparateur-mutuelle.jpg",
  garanties: "/images/comparateur-mutuelle.jpg",
  etapes: "/images/demarches-sante.jpg",
  erreurs: "/images/erreurs-mutuelle.jpg",
  conseiller: "/images/conseiller-sante.jpg",
  lettre: "/images/lettre-resiliation.jpg",
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
        Changer de Mutuelle
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

const changerMutuelleSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Puis-je changer de mutuelle sans attendre la date anniversaire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, absolument, si votre contrat a plus d'un an. Depuis la Loi Infra-annuelle (décembre 2020), vous n'êtes plus obligé d'attendre l'échéance. Avant 1 an, il faut un motif légitime (déménagement, changement professionnel)."
      }
    },
    {
      "@type": "Question",
      "name": "Vais-je avoir une interruption de couverture ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, la continuité est garantie. Votre nouvelle mutuelle coordonne la résiliation avec l'ancienne pour que le basculement se fasse sans aucune période de carence (couvert jusqu'au soir par l'une, dès le lendemain par l'autre)."
      }
    },
    {
      "@type": "Question",
      "name": "Est-ce que le changement est gratuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, c'est une procédure 100 % gratuite. Aucuns frais de résiliation ni pénalités ne peuvent être appliqués après 12 mois de contrat. Si vous passez par notre comparateur, nous gérons les démarches administratives gratuitement."
      }
    }
  ]
};

/* ------------------------------ Page content ------------------------------ */

export default function ChangerMutuellePage() {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = React.useState(false);

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(changerMutuelleSchema) }}
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

          <div className="relative mx-auto max-w-7xl px-2 py-12 md:py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-60 lg:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6">
                {/* H1 principal */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl leading-tight font-extrabold text-blue-700 mb-3 sm:mb-4 mt-24 ">
                  Changer de Mutuelle : Modèle de Lettre de Résiliation et Comparatif
                </h1>
                
                {/* Sous-titre descriptif */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed py-2">
                  Vous souhaitez <strong className="text-blue-600">changer de mutuelle santé</strong> pour réduire vos cotisations, améliorer vos garanties ou adapter votre contrat à votre situation actuelle ? Grâce à la réglementation en vigueur, il est aujourd'hui <strong className="text-blue-600">simple et rapide de changer de mutuelle</strong>, sans démarches complexes.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
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
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 sm:pt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center ring-1 ring-green-200">
                      <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-green-700">Résiliation Simple</span>
                      <span className="block text-xs text-green-600">Loi infra-annuelle</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center ring-1 ring-blue-200">
                      <IconShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-blue-700">100% Gratuit</span>
                      <span className="block text-xs text-blue-600">Aucun frais de dossier</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/20 flex items-center justify-center ring-1 ring-yellow-200">
                      <IconBolt className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-yellow-700">Continuïté</span>
                      <span className="block text-xs text-yellow-600">Pas d'interruption</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Hero */}
              <div className="relative mt-8 sm:mt-16 lg:mt-0 ">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-white/40 mt-2 ">
                  <Image
                    src={images.hero}
                    alt="Changer de mutuelle - Résiliation simplifiée"
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
            {/* Pourquoi changer de mutuelle santé */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="pourquoi"
                title="Pourquoi changer de mutuelle santé ?"
                subtitle="Plusieurs raisons peuvent vous pousser à changer de complémentaire santé"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card
                  title="Réduire le coût de votre mutuelle"
                  icon={<IconCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
                  image={images.garanties}
                >
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-800">Cotisations trop élevées ou augmentations annuelles</h4>
                    <p>Changer de contrat permet souvent de bénéficier de <strong>tarifs plus avantageux</strong> à garanties équivalentes ou supérieures.</p>
                  </div>
                </Card>

                <Card 
                  title="Adapter vos garanties à votre situation" 
                  icon={<IconBolt className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.etapes}
                >
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-800">Évolution de vos besoins de santé</h4>
                    <p>Un changement de situation (âge, retraite, famille) nécessite souvent une <strong>mutuelle mieux adaptée</strong>.</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Link href="/mutuelle-sante/mutuelle-senior" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                        Mutuelle Senior →
                      </Link>
                      <Link href="/mutuelle-sante/mutuelle-famille" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                        Mutuelle Famille →
                      </Link>
                    </div>
                  </div>
                </Card>

                <Card 
                  title="Bénéficier de meilleures garanties" 
                  icon={<IconShield className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.conseiller}
                >
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-800">Optique, dentaire, hospitalisation mieux remboursés</h4>
                    <p>Améliorez votre couverture sur les postes les plus importants.</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Link href="/mutuelle-sante/mutuelle-optique" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                        Mutuelle Optique →
                      </Link>
                      <Link href="/mutuelle-sante/mutuelle-dentaire" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                        Mutuelle Dentaire →
                      </Link>
                      <Link href="/mutuelle-sante/mutuelle-hospitalisation" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                        Mutuelle Hospitalisation →
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            </section>
            <SectionDivider />

            {/* Est-il possible de changer de mutuelle à tout moment */}
            <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="possible"
                title="Est-il possible de changer de mutuelle à tout moment ?"
                subtitle="Comprenez les conditions pour résilier votre contrat"
              />

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    1
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">La résiliation infra-annuelle</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <h4 className="font-semibold text-slate-800 mb-2">Changer de mutuelle après 1 an de contrat</h4>
                    <p>Depuis la réforme, vous pouvez <strong className="text-blue-600">résilier votre mutuelle santé à tout moment</strong> après un an, sans frais ni justification.</p>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-green-50/60 p-5 sm:p-6 border border-green-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    2
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Cas particuliers de résiliation anticipée</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <h4 className="font-semibold text-slate-800 mb-2">Déménagement, changement professionnel, retraite</h4>
                    <p>Dans certaines situations, vous pouvez résilier avant même un an de contrat.</p>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* Comment changer de mutuelle santé facilement */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="comment"
                title="Comment changer de mutuelle santé facilement ?"
                subtitle="Les étapes simples pour une transition réussie"
              />

              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20 hidden md:block" />
                <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-200 md:hidden" />

                <div className="grid md:grid-cols-4 gap-6 md:gap-8 relative">
                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={1} title="Analyser votre contrat actuel">
                      <h4 className="font-semibold text-slate-800 mb-2">Garanties, cotisation, exclusions</h4>
                      <p>Évaluez ce que vous payez et ce que vous obtenez réellement.</p>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={2} title="Comparer les offres disponibles">
                      <p>Utilisez notre <strong className="text-blue-600">comparateur de mutuelles santé</strong> pour identifier une offre plus adaptée à votre profil.</p>
                      <div className="mt-3">
                        <PrimaryButton onClick={() => setIsCallbackModalOpen(true)}>
                          Comparer maintenant
                        </PrimaryButton>
                      </div>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={3} title="Souscrire une nouvelle mutuelle">
                      <h4 className="font-semibold text-slate-800 mb-2">Prise d'effet sans interruption de couverture</h4>
                      <p>Votre nouvelle couverture démarre sans période de carence.</p>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={4} title="Résiliation prise en charge">
                      <p>Votre nouvelle mutuelle peut s'occuper des démarches de résiliation.</p>
                      <div className="mt-3">
                        <SecondaryButton href="tel:0188812108">
                          Être rappelé gratuitement
                        </SecondaryButton>
                      </div>
                    </StepCard>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* Quand est-il préférable de changer de mutuelle */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="quand"
                title="Quand est-il préférable de changer de mutuelle ?"
                subtitle="Les moments opportuns pour réévaluer votre couverture santé"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { 
                    title: "À l'âge de la retraite", 
                    desc: "Passage à une mutuelle retraité adaptée à vos nouveaux besoins et à votre budget", 
                    icon: "👴",
                    link: "/mutuelle-sante/mutuelle-retraite"
                  },
                  { 
                    title: "En cas de changement familial", 
                    desc: "Naissance, mariage, départ des enfants : chaque étape modifie vos besoins en couverture", 
                    icon: "👨‍👩‍👧‍👦",
                    link: "/mutuelle-sante/mutuelle-famille"
                  },
                  { 
                    title: "En cas d'augmentation injustifiée", 
                    desc: "Comparer permet d'éviter de payer trop cher pour des garanties inutiles ou insuffisantes", 
                    icon: "💰",
                    link: "/comparateur-mutuelle"
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
                    {item.link && (
                      <Link href={item.link} className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1">
                        En savoir plus <IconArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <SectionDivider />

            {/* Les erreurs à éviter */}
            <section className="py-8 sm:py-12 bg-gradient-to-r from-blue-50 to-red-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="erreurs"
                title="Les erreurs à éviter lors d'un changement de mutuelle"
                subtitle="Les pièges courants et comment les éviter"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { 
                    title: "Choisir uniquement sur le prix", 
                    desc: "Vérifier les niveaux de remboursement réels plutôt que le prix seul",
                    warning: "⚠️"
                  },
                  { 
                    title: "Négliger les délais de carence", 
                    desc: "Certains contrats imposent un délai avant activation des garanties",
                    warning: "⏳"
                  },
                  { 
                    title: "Oublier les exclusions de garanties", 
                    desc: "Lire attentivement les conditions du contrat est essentiel",
                    warning: "📖"
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
                    <div className="text-slate-600 text-xs sm:text-sm">
                      <h4 className="font-semibold text-slate-800 mb-1">{item.desc.split(":")[0]}</h4>
                      <p>{item.desc.split(":")[1] || item.desc}</p>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-10">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 blur-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <SectionDivider />

            {/* FAQ */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="faq"
                title="FAQ - Changer de Mutuelle Santé"
                subtitle="Toutes les réponses à vos questions sur le changement de mutuelle"
              />

              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
                <FAQItem
                  q="Puis-je changer de mutuelle sans attendre la date anniversaire ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Oui, absolument, à condition que votre contrat ait plus d'un an.</p>
                      <p className="mb-3">Depuis l'entrée en vigueur de la <strong>Loi Infra-annuelle (décembre 2020)</strong>, vous n'êtes plus obligé d'attendre l'échéance annuelle ou de respecter le préavis de 2 mois à date fixe.</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Détails selon l'ancienneté :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><strong>Avant 1 an :</strong> Vous devez attendre la première date anniversaire, sauf changement de situation (déménagement, mariage, changement de profession) qui permet une résiliation anticipée.</li>
                          <li><strong>Après 1 an :</strong> Vous êtes libre de résilier <strong>à tout moment</strong>, sans justification et sans frais. La résiliation prendra effet un mois après la notification à votre assureur actuel.</li>
                        </ul>
                      </div>
                    </div>
                  }
                />
                <FAQItem
                  q="Vais-je avoir une interruption de couverture ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Non, la continuité de vos droits est garantie.</p>
                      <p className="mb-3">Lorsque vous changez de mutuelle, tout est orchestré pour qu'il n'y ait aucune "carence" (période sans assurance) entre les deux contrats.</p>
                      
                      <div className="bg-green-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-green-800 mb-2">Comment ça marche ?</h4>
                        <ol className="list-decimal pl-4 space-y-1 text-sm">
                          <li>Vous souscrivez votre nouvelle mutuelle avec une <strong>date d'effet</strong> précise (par exemple le 1er mai).</li>
                          <li>Votre nouvel assureur demande la résiliation de l'ancien contrat pour la veille (le 30 avril).</li>
                          <li>Le basculement se fait automatiquement. Vous êtes couvert par l'ancienne mutuelle jusqu'au dernier soir, et par la nouvelle dès le lendemain matin.</li>
                        </ol>
                      </div>
                    </div>
                  }
                />
                <FAQItem
                  q="Est-ce que le changement est gratuit ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Oui, c'est une procédure 100 % gratuite.</p>
                      <p className="mb-3">La loi interdit formellement aux assureurs d'appliquer des frais de résiliation ou des pénalités financières si votre contrat a plus de 12 mois d'ancienneté.</p>
                      
                      <div className="bg-yellow-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-yellow-800 mb-2">De plus, si vous utilisez notre comparateur :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Nous ne facturons <strong>aucuns frais de dossier</strong>.</li>
                          <li>Votre nouvel assureur prend en charge toutes les démarches administratives (courriers recommandés, notifications) gratuitement à votre place. Vous n'avez même pas besoin d'acheter un timbre.</li>
                        </ul>
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Changez de mutuelle santé en toute simplicité</h2>
                  <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Changer de mutuelle est aujourd'hui un <strong>levier d'économie et de protection</strong>. Comparez les <strong>meilleures mutuelles santé</strong> et bénéficiez d'un accompagnement personnalisé.
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
                      <div className="text-xs sm:text-sm text-blue-200">Gratuit</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">24h</div>
                      <div className="text-xs sm:text-sm text-blue-200">Résiliation rapide</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">0€</div>
                      <div className="text-xs sm:text-sm text-blue-200">Frais de dossier</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">4.8/5</div>
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