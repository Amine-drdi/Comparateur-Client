// app/components/ResiliationMutuellePage.tsx
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
  hero: "/images/resiliation-mutuelle.png",
  lettre: "/images/lettre-resiliation.jpg",
  calendrier: "/images/calendrier-resiliation.jpg",
  conseiller: "/images/conseiller-resiliation.jpg",
  contrat: "/images/contrat-resiliation.jpg",
  comparateur: "/images/comparateur-resiliation-sante.jpg",
  erreurs: "/images/erreurs-resiliation.jpg",
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
        Résiliation Mutuelle
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

const resiliationSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Puis-je résilier ma mutuelle à tout moment ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, après un an de contrat, grâce au dispositif de résiliation infra-annuelle. Vous pouvez changer de mutuelle librement, sans frais ni pénalité."
      }
    },
    {
      "@type": "Question",
      "name": "Dois-je envoyer un courrier recommandé ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, ce n'est plus obligatoire. La résiliation peut se faire par lettre simple, email ou via l'espace client. Votre nouvel assureur peut aussi s'en charger pour vous."
      }
    },
    {
      "@type": "Question",
      "name": "La résiliation est-elle gratuite ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, totalement. Aucun frais ni pénalité ne peut être exigé si votre contrat a plus de 12 mois d'ancienneté."
      }
    }
  ]
};

/* ------------------------------ Page content ------------------------------ */

export default function ResiliationMutuellePage() {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = React.useState(false);

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resiliationSchema) }}
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
                  Résiliation Mutuelle Santé : Comment Résilier Facilement et Sans Frais
                </h1>
                
                {/* Sous-titre descriptif */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed py-2">
                  Vous souhaitez <strong className="text-blue-600">résilier votre mutuelle santé</strong> car elle n'est plus adaptée à vos besoins ou devenue trop coûteuse ?
                  Grâce à la réglementation actuelle, la <strong className="text-blue-600">résiliation mutuelle</strong> est désormais <strong className="text-blue-600">simple, rapide et sans pénalité</strong> sous certaines conditions.
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
                      <span className="block text-xs sm:text-sm font-semibold text-green-700">Sans Frais</span>
                      <span className="block text-xs text-green-600">Zéro pénalité</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center ring-1 ring-blue-200">
                      <IconShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-blue-700">Simple et Rapide</span>
                      <span className="block text-xs text-blue-600">Lettre, email ou espace client</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/20 flex items-center justify-center ring-1 ring-yellow-200">
                      <IconBolt className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-yellow-700">Infra-annuelle</span>
                      <span className="block text-xs text-yellow-600">Après 1 an de contrat</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Hero */}
              <div className="relative mt-8 sm:mt-16 lg:mt-0">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-white/40">
                  <Image
                    src={images.hero}
                    alt="Résiliation mutuelle santé - Changer d'assurance facilement"
                    width={600}
                    height={400}
                    className="w-96 h-auto rounded-2xl sm:rounded-3xl"
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
            {/* Est-il possible de résilier sa mutuelle santé à tout moment ? */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="possible"
                title="Est-il possible de résilier sa mutuelle santé à tout moment ?"
                subtitle="Comprendre les conditions de résiliation de votre contrat"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* La résiliation infra-annuelle expliquée */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 shadow-lg">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <IconCheck className="w-5 h-5 text-green-600" />
                      La résiliation infra-annuelle expliquée
                    </h3>
                    
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-700 font-bold">1</span>
                        </div>
                        <h4 className="text-base font-semibold text-blue-700">Résilier après un an de contrat</h4>
                      </div>
                      <p className="text-slate-600 text-sm pl-10">
                        Depuis l'entrée en vigueur de la <strong>résiliation infra-annuelle</strong>, vous pouvez <strong>résilier votre mutuelle santé à tout moment</strong> après un an, sans frais ni justification.
                      </p>
                    </div>
                  </div>

                  {/* Les cas de résiliation avant un an */}
                  <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border border-orange-100 shadow-lg">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <IconBolt className="w-5 h-5 text-orange-600" />
                      Les cas de résiliation avant un an
                    </h3>
                    
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-orange-700 font-bold">2</span>
                        </div>
                        <h4 className="text-base font-semibold text-orange-700">Situations exceptionnelles</h4>
                      </div>
                      
                      <ul className="space-y-2 text-sm text-slate-600 pl-10">
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 text-green-500" />
                          <span>Changement de situation professionnelle</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 text-green-500" />
                          <span>Déménagement</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 text-green-500" />
                          <span>Retraite</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 text-green-500" />
                          <span>Adhésion à une mutuelle obligatoire</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Pourquoi résilier sa mutuelle santé ? */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-100 shadow-lg">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Pourquoi résilier sa mutuelle santé ?</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-purple-700 mb-2">Mutuelle trop chère</h4>
                        <div className="text-sm text-slate-600 bg-purple-50/50 rounded-lg p-3">
                          <h5 className="font-medium mb-1">Augmentation injustifiée des cotisations</h5>
                          <p>Quand les tarifs augmentent sans amélioration des garanties.</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-purple-700 mb-2">Garanties inadaptées</h4>
                        <div className="text-sm text-slate-600 bg-purple-50/50 rounded-lg p-3">
                          <h5 className="font-medium mb-1">Remboursements insuffisants</h5>
                          <p>En optique, dentaire ou hospitalisation.</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Link href="/mutuelle-sante/mutuelle-optique" className="text-xs bg-white px-2 py-1 rounded border border-purple-200 hover:bg-purple-50">
                              Mutuelle Optique →
                            </Link>
                            <Link href="/mutuelle-sante/mutuelle-dentaire" className="text-xs bg-white px-2 py-1 rounded border border-purple-200 hover:bg-purple-50">
                              Mutuelle Dentaire →
                            </Link>
                            <Link href="/mutuelle-sante/mutuelle-hospitalisation" className="text-xs bg-white px-2 py-1 rounded border border-purple-200 hover:bg-purple-50">
                              Mutuelle Hospitalisation →
                            </Link>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-purple-700 mb-2">Changement de situation personnelle</h4>
                        <div className="text-sm text-slate-600 bg-purple-50/50 rounded-lg p-3">
                          <h5 className="font-medium mb-1">Famille, retraite, évolution des besoins</h5>
                          <p>Vos besoins évoluent, votre mutuelle doit suivre.</p>
                          <div className="mt-2">
                            <Link href="/mutuelle-sante/mutuelle-retraite" className="text-xs bg-white px-2 py-1 rounded border border-purple-200 hover:bg-purple-50">
                              Mutuelle Retraité →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* Comment résilier sa mutuelle santé ? */}
            <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="procedure"
                title="Comment résilier sa mutuelle santé ?"
                subtitle="Les 4 étapes simples pour résilier votre contrat"
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <StepCard step={1} title="Vérifier l'ancienneté de votre contrat">
                  <p>Vérifiez la <strong>date de souscription</strong> et les <strong>conditions de résiliation</strong> spécifiques à votre contrat.</p>
                  <div className="mt-4 text-xs text-slate-500 bg-blue-50 rounded-lg p-2">
                    <span className="font-semibold">Important :</span> La résiliation infra-annuelle s'applique après un an de contrat.
                  </div>
                </StepCard>

                <StepCard step={2} title="Choisir une nouvelle mutuelle (recommandé)">
                  <p>Évitez toute interruption de couverture en souscrivant d'abord un nouveau contrat.</p>
                  <div className="mt-4">
                    <PrimaryButton href="/mutuelle-sante/comparateur-mutuelle">
                      Comparer les mutuelles
                    </PrimaryButton>
                  </div>
                </StepCard>

                <StepCard step={3} title="Envoyer la demande de résiliation">
                  <p>Envoyez votre demande par <strong>lettre, email ou via l'espace client</strong> selon les modalités prévues au contrat.</p>
                  <div className="mt-4 text-xs text-slate-500 bg-blue-50 rounded-lg p-2">
                    <span className="font-semibold">Note :</span> Le courrier recommandé n'est plus obligatoire.
                  </div>
                </StepCard>

                <StepCard step={4} title="Résiliation prise en charge par la nouvelle mutuelle">
                  <p>Votre nouvel assureur peut effectuer la résiliation pour vous, simplifiant les démarches administratives.</p>
                  <div className="mt-4">
                    <SecondaryButton href="tel:0188812108">
                      Demande d'accompagnement
                    </SecondaryButton>
                  </div>
                </StepCard>
              </div>
            </section>
            <SectionDivider />

            {/* Modèles et délais de résiliation mutuelle */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="delais"
                title="Modèles et délais de résiliation mutuelle"
                subtitle="Tout savoir sur les délais et moyens acceptés"
              />

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100 shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <IconCheck className="w-5 h-5 text-green-600" />
                    Délai de prise d'effet
                  </h3>
                  <div className="mb-4">
                    <h4 className="font-semibold text-green-700 mb-2">Résiliation effective sous 1 mois</h4>
                    <p className="text-slate-600 text-sm">
                      Une fois votre demande envoyée, la résiliation prend généralement effet sous <strong>1 mois</strong>. Vérifiez la date exacte avec votre assureur.
                    </p>
                  </div>
                  <div className="bg-green-50/50 rounded-lg p-3 text-sm">
                    <p className="font-medium text-green-800">Conseil :</p>
                    <p className="text-green-700">Planifiez le début de votre nouvelle couverture pour coïncider avec la fin de l'ancienne.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <IconBolt className="w-5 h-5 text-blue-600" />
                    Moyens acceptés
                  </h3>
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-700 mb-2">Plusieurs options disponibles</h4>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        <span>Lettre simple</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        <span>Lettre recommandée (optionnel)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        <span>Email</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        <span>Espace client en ligne</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* Les erreurs à éviter lors de la résiliation */}
            <section className="py-8 sm:py-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="erreurs"
                title="Les erreurs à éviter lors de la résiliation"
                subtitle="Conseils pour une résiliation réussie sans mauvaise surprise"
              />

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <div className="bg-white rounded-2xl p-6 border-2 border-red-200 shadow-lg">
                  <div className="text-3xl mb-4 text-red-600">❌</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Résilier sans nouvelle mutuelle</h3>
                  <h4 className="font-semibold text-red-700 mb-2">Risque de rupture de couverture santé</h4>
                  <p className="text-slate-600 text-sm">
                    Ne résiliez pas votre ancienne mutuelle avant d'avoir souscrit une nouvelle couverture. Vous seriez sans protection en cas de problème de santé.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-lg">
                  <div className="text-3xl mb-4 text-orange-600">⚠️</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Oublier les délais de carence</h3>
                  <p className="text-slate-600 text-sm">
                    Certaines nouvelles mutuelles imposent des délais de carence avant remboursement. Vérifiez ces conditions pour éviter les mauvaises surprises.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200 shadow-lg">
                  <div className="text-3xl mb-4 text-yellow-600">💰</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Choisir uniquement le prix</h3>
                  <h4 className="font-semibold text-yellow-700 mb-2">Importance des garanties réelles</h4>
                  <p className="text-slate-600 text-sm">
                    Le prix ne doit pas être le seul critère. Comparez les garanties, les plafonds de remboursement et les exclusions de garanties.
                  </p>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* FAQ */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="faq"
                title="FAQ - Résiliation Mutuelle Santé"
                subtitle="Toutes les réponses à vos questions sur la résiliation"
              />

              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
                <FAQItem
                  q="Puis-je résilier ma mutuelle à tout moment ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Oui, <strong>vous pouvez résilier votre mutuelle santé à tout moment</strong>, <strong>après un an de contrat</strong>, grâce au dispositif de <strong>résiliation infra-annuelle</strong>.</p>
                      <p className="mb-3">Cette réglementation vous permet de <strong>changer de mutuelle librement</strong>, sans frais ni pénalité, dès lors que votre contrat a plus de 12 mois.</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Avantages :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Flexibilité pour adapter votre couverture à vos besoins</li>
                          <li>Possibilité de profiter de meilleures offres sur le marché</li>
                          <li>Pas de justification nécessaire après un an</li>
                        </ul>
                      </div>
                      
                      <p className="text-sm">Cela facilite le <strong>changement de mutuelle santé</strong> pour bénéficier d'une offre plus adaptée à votre budget ou à vos besoins actuels.</p>
                    </div>
                  }
                />
                <FAQItem
                  q="Dois-je envoyer un courrier recommandé ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Non, <strong>le courrier recommandé n'est plus obligatoire</strong>.</p>
                      <p className="mb-3">La <strong>résiliation de mutuelle santé</strong> peut se faire simplement par <strong>lettre simple, email ou via l'espace client</strong> de votre assureur, selon les modalités prévues au contrat.</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Options disponibles :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><strong>Email :</strong> Envoyer un email à votre assureur avec les informations requises</li>
                          <li><strong>Espace client :</strong> Utiliser le formulaire en ligne sur le site de votre assureur</li>
                          <li><strong>Lettre simple :</strong> Envoyer une lettre avec accusé de réception</li>
                          <li><strong>Lettre recommandée :</strong> Optionnel, pour plus de sécurité</li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3">
                        <h4 className="font-semibold text-green-800 mb-2">Astuce pratique :</h4>
                        <p className="text-sm">Vous pouvez également <strong>confier la résiliation à votre nouvelle mutuelle</strong>, qui se charge des démarches administratives à votre place.</p>
                      </div>
                    </div>
                  }
                />
                <FAQItem
                  q="La résiliation est-elle gratuite ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Oui, <strong>la résiliation d'une mutuelle santé est totalement gratuite</strong>.</p>
                      <p className="mb-3">Aucun frais, pénalité ou indemnité ne peut être exigé lorsque la résiliation intervient dans le cadre légal de la <strong>résiliation infra-annuelle</strong>.</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Conditions :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Votre contrat doit avoir plus de 12 mois d'ancienneté</li>
                          <li>La résiliation doit respecter les conditions du contrat</li>
                          <li>Le préavis doit être respecté (généralement 1 mois)</li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3">
                        <h4 className="font-semibold text-green-800 mb-2">En résumé :</h4>
                        <p className="text-sm">Vous pouvez donc <strong>résilier et changer de mutuelle sans coût</strong>, en toute simplicité et en toute conformité.</p>
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Résiliez votre mutuelle et trouvez une meilleure solution</h2>
                  <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Résilier votre mutuelle est aujourd'hui un <strong>droit simple et sécurisé</strong>. Comparez les <strong>meilleures mutuelles santé</strong> et bénéficiez d'un accompagnement personnalisé.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
                    <PrimaryButton href="/comparateur-mutuelle">Comparer les mutuelles santé</PrimaryButton>

                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center ring-1 ring-white/10">
                        <IconShield className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm sm:text-base">Sans frais ni pénalité</div>
                        <div className="text-xs sm:text-sm">Résiliation gratuite</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">Sans Frais</div>
                      <div className="text-xs sm:text-sm text-blue-200">Résiliation gratuite</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">1 Mois</div>
                      <div className="text-xs sm:text-sm text-blue-200">Prise d'effet</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">Après 1 an</div>
                      <div className="text-xs sm:text-sm text-blue-200">Infra-annuelle</div>
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