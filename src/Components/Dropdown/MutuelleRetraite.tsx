// app/components/MutuelleRetraite.tsx
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
  hero: "/images/RetraiteAvatar.webp",
  retraiteFamily: "/images/medicaments.jpg",
  retraiteSenior: "/images/retraite-senior.jpg",
  retraiteSavings: "/images/revenue.jpg",
  retraiteGarantie: "/images/retraite-garanties.jpg",
  retraiteAdvisor: "/images/retraite-conseiller.jpg",
  retraiteCoverage: "/images/garantieRetraite.jpg",
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
        Mutuelle Retraité
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

const retraiteSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le prix d'une mutuelle retraité ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le prix moyen se situe entre 80 € et 150 € par mois pour une personne seule. Il varie selon l'âge (augmentations par paliers de 5 ans), le niveau de couverture choisi et votre zone géographique."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on conserver la mutuelle d'entreprise à la retraite ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, grâce à la Loi Evin. Cependant, ce n'est pas toujours avantageux : vous perdez la part patronale (le prix double souvent) et les garanties ne sont plus forcément adaptées (maternité, etc.). Il est souvent mieux de souscrire un contrat individuel retraité."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la meilleure mutuelle pour un retraité ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La meilleure mutuelle est celle qui équilibre prix et besoins réels. Pour un retraité, elle doit privilégier l'hospitalisation, le dentaire (implants) et l'auditif, tout en évitant les garanties superflues."
      }
    }
  ]
};

/* ------------------------------ Page content ------------------------------ */

export default function MutuelleRetraitePage() {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = React.useState(false);

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(retraiteSchema) }}
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
                 Mutuelle Retraité : Devis Gratuit et Garanties Adaptées
                </h1>
                
                {/* Sous-titre descriptif */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed py-2">
                  À la retraite, les besoins en santé évoluent et les remboursements de base ne suffisent plus toujours.
                  Avec <strong className="text-blue-600">La Mutuelle De France</strong>, comparez les <strong className="text-blue-600">meilleures mutuelles retraité</strong>,
                  conçues pour offrir une <strong className="text-blue-600">couverture santé renforcée</strong>, tout en respectant votre <strong className="text-blue-600">budget de retraité</strong>.
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
                      <span className="block text-xs sm:text-sm font-semibold text-green-700">Garanties Adaptées</span>
                      <span className="block text-xs text-green-600">Aux besoins retraités</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center ring-1 ring-blue-200">
                      <IconShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-blue-700">Couverture Renforcée</span>
                      <span className="block text-xs text-blue-600">Hospitalisation, dentaire, optique</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/20 flex items-center justify-center ring-1 ring-yellow-200">
                      <IconBolt className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-yellow-700">Budget Respecté</span>
                      <span className="block text-xs text-yellow-600">Tarifs adaptés aux retraités</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Hero (remplace le formulaire) */}
              <div className="relative mt-8 sm:mt-16 lg:mt-0">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-white/40 ">
                  <Image
                    src={images.hero}
                    alt="Mutuelle retraité - Protection santé pour les retraités"
                    width={500}
                    height={400}
                    className="rounded-2xl sm:rounded-3xl"
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
            {/* Pourquoi souscrire une mutuelle après la retraite */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="pourquoi"
                title="Pourquoi souscrire une mutuelle après la retraite ?"
                subtitle="Le passage à la retraite entraîne souvent une baisse de revenus, mais les dépenses de santé augmentent"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card
                  title="Baisse des revenus"
                  icon={<IconCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
                  image={images.retraiteSavings}
                >
                  <p>Les revenus diminuent à la retraite, mais les besoins en santé restent importants. Une mutuelle adaptée préserve votre pouvoir d'achat.</p>
                </Card>

                <Card 
                  title="Dépenses de santé accrues" 
                  icon={<IconBolt className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.retraiteFamily}
                >
                  <p>Consultations, soins réguliers et spécialistes deviennent plus fréquents après la retraite.</p>
                </Card>

                <Card 
                  title="Couverture essentielle" 
                  icon={<IconShield className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.retraiteCoverage}
                >
                  <p>Une mutuelle retraité adaptée garantit l'accès aux soins essentiels tout en réduisant les restes à charge.</p>
                </Card>
              </div>
            </section>
            <SectionDivider />

            {/* Mutuelle Retraité ou Mutuelle Senior */}
            <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="difference"
                title="Mutuelle Retraité ou Mutuelle Senior : quelle différence ?"
                subtitle="Comprenez les distinctions pour faire le bon choix"
              />

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    S
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Mutuelle Senior</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p className="mb-3">La <strong className="text-blue-600">mutuelle senior</strong> concerne généralement les personnes dès <strong>55 ans</strong>, encore en activité ou en préretraite.</p>
                    <Link href="/mutuelle-sante/mutuelle-senior" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm">
                      En savoir plus sur la mutuelle senior →
                    </Link>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-green-50/60 p-5 sm:p-6 border border-green-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    R
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Mutuelle Retraité</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p>La <strong className="text-green-600">mutuelle retraité</strong> est spécifiquement conçue pour les personnes ayant cessé leur activité professionnelle, avec des garanties ciblées et un <strong>rapport garanties/prix optimisé</strong>.</p>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* Comment choisir la meilleure mutuelle retraitée */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="choisir"
                title="Comment choisir la meilleure mutuelle retraitée ?"
                subtitle="Les étapes essentielles pour faire le bon choix"
              />

              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20 hidden md:block" />
                <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-200 md:hidden" />

                <div className="grid md:grid-cols-4 gap-6 md:gap-8 relative">
                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={1} title="Analyser vos besoins">
                      <ul className="space-y-1 sm:space-y-2">
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Soins fréquents</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Traitements chroniques</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Équipements médicaux</span>
                        </li>
                      </ul>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={2} title="Comparer les devis">
                      <p>Grâce à notre <strong className="text-blue-600">comparateur de mutuelle</strong>, vous obtenez rapidement des <strong>devis adaptés à votre situation</strong>.</p>
                      <Link href="/comparateur-mutuelle" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm mt-3">
                        Utiliser le comparateur →
                      </Link>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={3} title="Vérifier les garanties">
                      <ul className="space-y-1 sm:space-y-2">
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Taux de remboursement</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Plafonds annuels</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Délais de carence</span>
                        </li>
                      </ul>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={4} title="Être accompagné">
                      <p>Nos experts analysent vos besoins pour vous orienter vers la <strong className="text-blue-600">mutuelle retraité la plus avantageuse</strong>.</p>
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

            {/* Les garanties indispensables */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="garanties"
                title="Les garanties indispensables pour une mutuelle retraité"
                subtitle="Les postes de remboursement essentiels pour votre santé après la retraite"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { 
                    title: "Hospitalisation renforcée", 
                    desc: "Chambre particulière, frais de séjour, actes chirurgicaux", 
                    icon: "🏥" 
                  },
                  { 
                    title: "Optique adaptée", 
                    desc: "Lunettes, lentilles, opérations de la cataracte", 
                    icon: "👓" 
                  },
                  { 
                    title: "Dentaire et prothèses", 
                    desc: "Couronnes, bridges, implants dentaires", 
                    icon: "🦷" 
                  },
                  { 
                    title: "Audiologie et appareils auditifs", 
                    desc: "Remboursement 100% Santé et options premium", 
                    icon: "👂" 
                  },
                  { 
                    title: "Médecines douces et prévention", 
                    desc: "Ostéopathie, cures thermales, bilans de prévention", 
                    icon: "🌿" 
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
                        <span className="text-xs text-slate-500">Couverture recommandée</span>
                        <span className="text-sm font-bold text-blue-600">300% - 500%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <SectionDivider />

            {/* Changer ou résilier sa mutuelle */}
            <section className="py-8 sm:py-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Changer ou résilier sa mutuelle à la retraite</h2>
                <p className="text-base sm:text-lg text-slate-600 mb-4 sm:mb-6 px-2">
                  Grâce à la <strong>résiliation infra-annuelle</strong>, vous pouvez :
                </p>
                <ul className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 text-left">
                  <li className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                    <IconCheck className="w-4 h-4 text-green-500" />
                    <span>Changer de mutuelle après 12 mois</span>
                  </li>
                  <li className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                    <IconCheck className="w-4 h-4 text-green-500" />
                    <span>Adapter votre contrat à votre nouvelle situation</span>
                  </li>
                  <li className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                    <IconCheck className="w-4 h-4 text-green-500" />
                    <span>Réduire vos cotisations</span>
                  </li>
                </ul>
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
                title="FAQ - Mutuelle Retraité"
                subtitle="Toutes les réponses à vos questions sur la mutuelle retraité"
              />

              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
                <FAQItem
                  q="Quel est le prix d'une mutuelle retraité ?"
                  a={
                    <div>
                      <p className="mb-3">Le prix moyen d'une mutuelle pour retraité se situe généralement entre <strong className="text-green-600">80 € et 150 € par mois</strong> pour une personne seule, selon le niveau de garanties.</p>
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Critères influençant le prix :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><strong>L'âge de l'assuré :</strong> Les cotisations augmentent avec l'âge (60, 65, 70 ans, etc.)</li>
                          <li><strong>Le niveau de couverture :</strong> Formule basique vs complète (optique, dentaire, audiologie)</li>
                          <li><strong>Votre zone géographique :</strong> Tarifs plus élevés en Île-de-France ou PACA</li>
                        </ul>
                      </div>
                      <p className="text-sm">Pour éviter de payer trop cher, il est crucial de comparer les offres chaque année. Une économie de <strong>20 à 30%</strong> est souvent possible.</p>
                    </div>
                  }
                />
                <FAQItem
                  q="Peut-on conserver la mutuelle d'entreprise à la retraite ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Oui, c'est possible grâce à la Loi Evin.</p>
                      <p className="mb-3">Si vous aviez une mutuelle collective obligatoire dans votre entreprise, vous avez le droit de demander son maintien à titre individuel lors de votre départ à la retraite.</p>
                      <div className="bg-red-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-red-700 mb-2">Attention, ce n'est pas toujours avantageux :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><strong>Perte de la part patronale :</strong> Votre employeur ne finance plus 50% de la cotisation</li>
                          <li><strong>Hausse des tarifs :</strong> L'assureur peut augmenter les tarifs progressivement sur 3 ans</li>
                          <li><strong>Garanties inadaptées :</strong> Vous payez pour des garanties inutiles (maternité, orthodontie enfant)</li>
                        </ul>
                      </div>
                      <p className="text-sm">Il est souvent plus économique de souscrire une <strong>mutuelle senior individuelle</strong>, dont les garanties sont spécifiquement calibrées pour vos besoins actuels.</p>
                    </div>
                  }
                />
                <FAQItem
                  q="Quelle est la meilleure mutuelle pour un retraité ?"
                  a={
                    <div>
                      <p className="mb-3">Il n'existe pas une "meilleure" mutuelle unique pour tous, mais plutôt une <strong className="text-blue-600">mutuelle adaptée à votre profil médical</strong>. La meilleure offre est celle qui offre le meilleur équilibre entre le prix et le remboursement de vos postes prioritaires.</p>
                      <div className="bg-green-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-green-800 mb-2">Pour un retraité, la meilleure mutuelle doit inclure :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Des plafonds élevés en dentaire (implants, couronnes)</li>
                          <li>Une bonne prise en charge de l'optique (verres progressifs)</li>
                          <li>Un forfait pour les appareils auditifs (en complément du 100% Santé)</li>
                          <li>Une garantie hospitalisation renforcée (chambre particulière)</li>
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Comparez les mutuelles retraitées et sécurisez votre avenir santé</h2>
                  <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Anticipez vos dépenses de santé et protégez votre budget retraite grâce à une <strong>mutuelle adaptée et performante</strong>.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
                    <PrimaryButton href="/comparateur-mutuelle">Comparer les mutuelles retraité</PrimaryButton>

                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center ring-1 ring-white/10">
                        <IconShield className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm sm:text-base">Experts retraite</div>
                        <div className="text-xs sm:text-sm">Conseil personnalisé</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">80-150€</div>
                      <div className="text-xs sm:text-sm text-blue-200">Prix mensuel moyen</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">30%</div>
                      <div className="text-xs sm:text-sm text-blue-200">D'économies possibles</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">500%</div>
                      <div className="text-xs sm:text-sm text-blue-200">Couverture optimale</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">4.9/5</div>
                      <div className="text-xs sm:text-sm text-blue-200">Satisfaction retraités</div>
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