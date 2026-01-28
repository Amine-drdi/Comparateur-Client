// app/components/MutuelleSenior.tsx
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
  hero: "/images/mutuelle-senior-hero.jpeg",
  seniorNeeds: "/images/besoins-senior.jpg",
  garanties: "/images/garanties-senior.jpg",
  comparateur: "/images/comparateur-senior.jpg",
  ageGroups: "/images/tranches-age.jpg",
  conseillerSenior: "/images/conseiller-senior.jpg",
  economie: "/images/economie-senior.jpg",
  hospitalisation: "/images/hospitalisation-senior.jpg",
  optique: "/images/optique-senior.jpg",
  dentaire: "/images/dentaire-senior.jpg",
  auditif: "/images/auditif-senior.jpg",
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
        Mutuelle Senior
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

const seniorSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce qu'une mutuelle senior ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une mutuelle senior est une complémentaire santé ajustée aux besoins des 55 ans et plus. Elle élimine les garanties superflues (maternité) pour renforcer l'optique, l'auditif, le dentaire et l'hospitalisation."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le prix d'une mutuelle senior ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le tarif varie généralement entre 40 € et plus de 100 € par mois. Il dépend de votre âge, de votre lieu de résidence et du niveau de couverture choisi (notamment pour les dépassements d'honoraires)."
      }
    },
    {
      "@type": "Question",
      "name": "Comment trouver la meilleure mutuelle senior ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La meilleure solution est la mise en concurrence via un comparateur en ligne. Cela permet de visualiser les tarifs en temps réel et de filtrer les offres selon vos priorités (dentaire, optique, etc.)."
      }
    },
    {
      "@type": "Question",
      "name": "Puis-je changer de mutuelle si je suis déjà retraité ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, grâce à la Loi Infra-annuelle, vous pouvez résilier votre contrat à tout moment et sans frais après un an d'ancienneté. Le nouvel assureur s'occupe de toutes les démarches."
      }
    }
  ]
};

/* ------------------------------ Page content ------------------------------ */

export default function MutuelleSeniorPage() {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = React.useState(false);

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seniorSchema) }}
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
                  Mutuelle Senior & Retraité : Comparez les Meilleures Offres
                </h1>
                
                {/* Sous-titre descriptif */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed py-2">
                  Les besoins en santé évoluent après 55 ans. Avec <strong className="text-blue-600">Devis Mutuelle</strong>, comparez les <strong className="text-blue-600">meilleures mutuelles senior</strong>, adaptées aux <strong className="text-blue-600">retraités</strong>, <strong className="text-blue-600">préretraités</strong>, et <strong className="text-blue-600">seniors actifs</strong> pour bénéficier d'une couverture optimale au meilleur prix.
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
                      <span className="block text-xs text-green-600">Spécifiques aux 55+</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center ring-1 ring-blue-200">
                      <IconShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-blue-700">Économies</span>
                      <span className="block text-xs text-blue-600">Jusqu'à 40%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/20 flex items-center justify-center ring-1 ring-yellow-200">
                      <IconBolt className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-yellow-700">Expertise Senior</span>
                      <span className="block text-xs text-yellow-600">Conseil spécialisé</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Hero */}
              <div className="relative mt-8 sm:mt-16 lg:mt-0">
                <div className="relative  overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] ring-1 ring-white/40 ">
                  <Image
                    src={images.hero}
                    alt="Mutuelle senior - Protection santé pour les plus de 55 ans"
                    width={500}
                    height={400}
                    className="w-96 h-auto "
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
            {/* Pourquoi souscrire une mutuelle senior */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="pourquoi"
                title="Pourquoi souscrire une mutuelle senior ?"
                subtitle="Une protection adaptée aux besoins spécifiques des plus de 55 ans"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card
                  title="Des remboursements renforcés pour les besoins essentiels"
                  icon={<IconCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
                  image={images.seniorNeeds}
                >
                  <p>Les seniors ont souvent besoin de garanties plus élevées dans :</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <IconCheck className="w-3 h-3 text-green-500" />
                      <span><strong>L'hospitalisation</strong> (chambre particulière, chirurgie)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="w-3 h-3 text-green-500" />
                      <span><strong>L'optique</strong> (lunettes, lentilles, implants)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="w-3 h-3 text-green-500" />
                      <span><strong>Le dentaire</strong> (prothèses, implants)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="w-3 h-3 text-green-500" />
                      <span><strong>L'audiologie</strong> (appareils auditifs)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="w-3 h-3 text-green-500" />
                      <span><strong>Les consultations spécialisées</strong></span>
                    </li>
                  </ul>
                </Card>

                <Card 
                  title="Une protection adaptée à l'évolution de la santé" 
                  icon={<IconBolt className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.garanties}
                >
                  <p>Après 55 ans, les consultations augmentent : cardiologie, rhumatologie, orthopédie. Une mutuelle senior renforce vos remboursements pour ces spécialités médicales fréquentes.</p>
                  <p className="mt-2 text-sm">La mutuelle senior élimine les garanties superflues (comme la maternité) pour se concentrer sur vos besoins réels.</p>
                </Card>

                <Card 
                  title="Un budget santé mieux maîtrisé" 
                  icon={<IconShield className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.economie}
                >
                  <p>Le coût d'une mutuelle augmente avec l'âge. En comparant régulièrement, vous pouvez réaliser des économies significatives.</p>
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <p className="text-center text-green-700 font-bold text-lg">
                      Économies possibles : jusqu'à 40%
                    </p>
                    <p className="text-center text-green-600 text-sm mt-1">
                      Sur votre cotisation annuelle
                    </p>
                  </div>
                </Card>
              </div>
            </section>
            <SectionDivider />

            {/* Comment choisir la meilleure mutuelle senior */}
            <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="choisir"
                title="Comment choisir la meilleure mutuelle senior ?"
                subtitle="Les étapes pour sélectionner la couverture idéale"
              />

              <div className="grid md:grid-cols-4 gap-6 md:gap-8">
                <StepCard step={1} title="Identifiez vos besoins médicaux réels">
                  <h4 className="font-semibold text-slate-800 mb-2">Optique, dentaire, audiologie, hospitalisation</h4>
                  <p>Analysez vos dépenses actuelles pour définir vos priorités et choisir les garanties adaptées à votre situation.</p>
                </StepCard>

                <StepCard step={2} title="Comparez plusieurs devis adaptés à votre âge">
                  <p>Plus vous avancez en âge, plus les prix varient. Grâce à notre <strong className="text-blue-600">comparateur</strong>, vous identifiez rapidement les offres les plus pertinentes.</p>
                  <Link href="/comparateur-mutuelle" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm mt-2">
                    Utiliser le comparateur →
                  </Link>
                </StepCard>

                <StepCard step={3} title="Vérifiez les niveaux de garanties et exclusions">
                  <h4 className="font-semibold text-slate-800 mb-2">Taux de remboursement, délais de carence, plafonds annuels</h4>
                  <p>Attention aux contrats qui semblent avantageux mais qui ont des limitations importantes.</p>
                </StepCard>

                <StepCard step={4} title="Faites-vous accompagner par un expert">
                  <p>Un conseiller peut analyser vos devis et vous recommander l'offre idéale selon :</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <IconCheck className="w-3 h-3 text-green-500" />
                      <span>votre âge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="w-3 h-3 text-green-500" />
                      <span>vos soins fréquents</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className="w-3 h-3 text-green-500" />
                      <span>votre budget</span>
                    </li>
                  </ul>
                  <div className="mt-3">
                    <SecondaryButton href="tel:0188812108">
                      Être rappelé gratuitement
                    </SecondaryButton>
                  </div>
                </StepCard>
              </div>
            </section>
            <SectionDivider />

            {/* Les garanties indispensables pour les seniors */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="garanties"
                title="Les garanties indispensables pour les seniors"
                subtitle="Les postes de remboursement essentiels après 55 ans"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { 
                    title: "Hospitalisation renforcée", 
                    desc: "Chambre particulière, forfait journalier, frais de séjour", 
                    details: "Élément essentiel pour les seniors ayant un risque d'hospitalisation plus élevé",
                    icon: "🏥",
                    image: images.hospitalisation
                  },
                  { 
                    title: "Optique senior", 
                    desc: "Lunettes haute correction, implants, opérations laser", 
                    details: "Important dès 55 ans pour la presbytie et autres problèmes visuels",
                    icon: "👓",
                    image: images.optique
                  },
                  { 
                    title: "Dentaire & implants", 
                    desc: "Prothèses, couronnes, implants dentaires", 
                    details: "Les mutuelles senior doivent couvrir fortement ces soins coûteux",
                    icon: "🦷",
                    image: images.dentaire
                  },
                  { 
                    title: "Audiologie (appareils auditifs)", 
                    desc: "Offre 100% Santé + remboursements renforcés", 
                    details: "Les seniors sont les principaux concernés par les problèmes auditifs",
                    icon: "👂",
                    image: images.auditif
                  },
                  { 
                    title: "Médecines douces", 
                    desc: "Ostéopathie, kinésithérapie, acupuncture", 
                    details: "Souvent essentielles à partir d'un certain âge pour le bien-être quotidien",
                    icon: "🌿",
                    image: images.seniorNeeds
                  },
                  { 
                    title: "Consultations spécialisées", 
                    desc: "Cardiologie, rhumatologie, orthopédie", 
                    details: "Prise en charge renforcée des consultations médicales fréquentes",
                    icon: "👨‍⚕️",
                    image: images.conseillerSenior
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
                    {item.image && (
                      <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                      </div>
                    )}
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{item.icon}</div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm mb-2">{item.desc}</p>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-500">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <SectionDivider />

            {/* Comparateur Mutuelle Senior -- Comment ça marche */}
            <section className="py-8 sm:py-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="comparateur"
                title="Comparateur Mutuelle Senior -- Comment ça marche ?"
                subtitle="Un processus simple et efficace pour trouver la meilleure offre"
              />

              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20 hidden md:block" />
                <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-200 md:hidden" />

                <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={1} title="Remplissez notre formulaire senior">
                      <p>Indiquez votre âge, vos besoins, et votre situation de santé pour une analyse personnalisée.</p>
                      <div className="mt-3">
                        <SecondaryButton href="tel:0188812108">
                          Être rappelé gratuitement
                        </SecondaryButton>
                      </div>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={2} title="Obtenez vos devis personnalisés">
                      <p>Nous comparons les meilleures <strong className="text-blue-600">mutuelles senior</strong> du marché pour vous proposer :</p>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 text-green-500" />
                          <span>tarifs adaptés</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 text-green-500" />
                          <span>garanties renforcées</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 text-green-500" />
                          <span>meilleures offres du moment</span>
                        </li>
                      </ul>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={3} title="Un conseiller analyse vos devis">
                      <p>Un expert vous aide à choisir la couverture la plus avantageuse selon votre profil et vos besoins spécifiques.</p>
                      <div className="mt-3">
                        <SecondaryButton href="tel:0188812108">
                          Appel Direct : 01 88 81 21 08
                        </SecondaryButton>
                      </div>
                    </StepCard>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* Mutuelle senior selon l'âge */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="age"
                title="Mutuelle senior après 60 ans, 65 ans, 70 ans : quelle différence ?"
                subtitle="Adaptez votre mutuelle à chaque étape de la vie"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { 
                    age: "60+", 
                    title: "Mutuelle senior 60+", 
                    desc: "Garanties renforcées en optique et consultations spécialisées",
                    features: ["Prise en charge optique renforcée", "Consultations spécialisées", "Début des soins dentaires importants"],
                    color: "from-blue-100 to-blue-50"
                  },
                  { 
                    age: "65+", 
                    title: "Mutuelle senior 65+", 
                    desc: "Priorité sur hospitalisation & dentaire",
                    features: ["Hospitalisation complète", "Soins dentaires avancés", "Couverture de longue durée recommandée"],
                    color: "from-green-100 to-green-50"
                  },
                  { 
                    age: "70+", 
                    title: "Mutuelle senior 70+", 
                    desc: "Besoin d'une couverture maximale pour rester protégé",
                    features: ["Couverture maximale tous postes", "Prise en charge audiologie", "Comparaison indispensable chaque année"],
                    color: "from-purple-100 to-purple-50"
                  },
                ].map((item) => (
                  <div
                    key={item.age}
                    className={`
                      group rounded-2xl bg-gradient-to-br ${item.color} p-5 sm:p-6 border border-slate-100
                      shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                      relative overflow-hidden h-full
                    `}
                  >
                    <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold text-slate-700">
                      {item.age}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 pr-12">{item.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{item.desc}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <IconCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {item.age === "65+" && (
                      <div className="mt-4 p-3 bg-white/50 rounded-lg">
                        <p className="text-xs text-slate-700 font-medium">Couverture de longue durée recommandée</p>
                      </div>
                    )}
                    {item.age === "70+" && (
                      <div className="mt-4 p-3 bg-white/50 rounded-lg">
                        <p className="text-xs text-slate-700 font-medium">Comparaison indispensable chaque année</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <SectionDivider />

            {/* Résilier ou changer sa mutuelle en tant que senior */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="resilier"
                title="Résilier ou changer sa mutuelle en tant que senior"
                subtitle="Profitez de la loi pour optimiser votre protection santé"
              />

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Grâce à la résiliation infra-annuelle, vous pouvez :</h3>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <IconCheck className="w-4 h-4" />
                        </div>
                        <span>changer de mutuelle à tout moment après 12 mois</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <IconCheck className="w-4 h-4" />
                        </div>
                        <span>optimiser votre contrat selon vos besoins actuels</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                          <IconCheck className="w-4 h-4" />
                        </div>
                        <span>réduire votre coût annuel jusqu'à 40%</span>
                      </li>
                    </ul>
                    <PrimaryButton href="/resiliation-mutuelle">
                      En savoir plus sur la résiliation
                    </PrimaryButton>
                  </div>
                  <div className="relative">
                    <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg">
                      <h4 className="font-bold text-slate-900 mb-3">La loi Infra-annuelle</h4>
                      <p className="text-slate-600 text-sm mb-4">Depuis décembre 2020, vous pouvez résilier votre complémentaire santé à tout moment après un an de contrat, sans frais ni justification.</p>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <IconShield className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-800">Protection continue</p>
                          <p className="text-xs text-blue-600">Pas d'interruption de couverture</p>
                        </div>
                      </div>
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
                title="FAQ Mutuelle Senior"
                subtitle="Toutes les réponses à vos questions sur les mutuelles senior"
              />

              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
                <FAQItem
                  q="Qu'est-ce qu'une mutuelle senior ?"
                  a={
                    <div>
                      <p className="mb-3">Une <strong>mutuelle senior</strong> est une complémentaire santé dont les garanties sont spécifiquement ajustées aux besoins biologiques et médicaux des personnes âgées de <strong>55 ans et plus</strong>.</p>
                      <p className="mb-3">Contrairement à une mutuelle classique ou familiale, elle élimine les garanties superflues (comme la maternité ou l'orthodontie enfant) pour renforcer les postes de dépenses essentiels avec l'âge :</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                        <li><strong>L'optique</strong> (verres progressifs, chirurgie de la cataracte).</li>
                        <li><strong>L'auditif</strong> (appareils auditifs de classe I et II).</li>
                        <li><strong>Le dentaire</strong> (implants, couronnes, dentiers).</li>
                        <li><strong>L'hospitalisation</strong> (chambre particulière, dépassements d'honoraires).</li>
                        <li><strong>Les médecines douces</strong> (ostéopathie, pédicure, cures thermales).</li>
                      </ul>
                    </div>
                  }
                />
                <FAQItem
                  q="Quel est le prix d'une mutuelle senior ?"
                  a={
                    <div>
                      <p className="mb-3">Le tarif d'une mutuelle senior n'est pas fixe. Il varie généralement entre <strong className="text-green-600">40 € et plus de 100 € par mois</strong> selon plusieurs critères déterminants :</p>
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Facteurs influençant le prix :</h4>
                        <ol className="list-decimal pl-4 space-y-1 text-sm">
                          <li><strong>L'âge de l'assuré :</strong> Le risque augmentant avec l'âge, les primes tendent à augmenter tous les 5 ans.</li>
                          <li><strong>Le niveau de couverture :</strong> Une formule de base (100% Santé) sera moins chère qu'une formule "Haut de gamme" remboursant les dépassements d'honoraires.</li>
                          <li><strong>Votre lieu de résidence :</strong> Les tarifs peuvent varier selon votre région, en fonction du coût local des soins.</li>
                        </ol>
                      </div>
                      <p className="text-sm text-slate-700"><strong>Conseil :</strong> Ne regardez pas que le prix ! Vérifiez le rapport garanties/prix pour éviter un "reste à charge" trop important en cas de pépin.</p>
                    </div>
                  }
                />
                <FAQItem
                  q="Comment trouver la meilleure mutuelle senior ?"
                  a={
                    <div>
                      <p className="mb-3">La "meilleure" mutuelle est celle qui correspond exactement à <strong>votre</strong> consommation médicale. Pour la trouver sans payer trop cher, la seule solution efficace est la mise en concurrence.</p>
                      <p className="mb-3">Plutôt que de démarcher les agences une par une, utilisez un comparateur en ligne. Cela vous permet de :</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                        <li>Visualiser les tarifs de dizaines d'assureurs en temps réel.</li>
                        <li>Filtrer les offres selon vos priorités (ex: besoin fort en dentaire).</li>
                        <li>Vérifier les <strong>délais de carence</strong> (période d'attente avant remboursement).</li>
                      </ul>
                      <div className="mt-3">
                        <SecondaryButton href="tel:0188812108">
                          Appel Direct : 01 88 81 21 08
                        </SecondaryButton>
                      </div>
                    </div>
                  }
                />
                <FAQItem
                  q="Puis-je changer de mutuelle si je suis déjà retraité ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Oui, absolument. Vous n'êtes pas "prisonnier" de votre contrat actuel, même si vous êtes à la retraite depuis longtemps.</p>
                      <p className="mb-3">Grâce à la <strong>Loi Infra-annuelle</strong> (en vigueur depuis décembre 2020), vous pouvez résilier votre contrat de complémentaire santé <strong>à tout moment et sans frais</strong>, dès lors que votre contrat a plus d'un an d'ancienneté.</p>
                      
                      <div className="bg-green-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-green-800 mb-2">La procédure est simple :</h4>
                        <ol className="list-decimal pl-4 space-y-1 text-sm">
                          <li>Vous choisissez votre nouvelle mutuelle senior plus avantageuse.</li>
                          <li>Le nouvel assureur s'occupe de toutes les démarches de résiliation auprès de l'ancien.</li>
                          <li>Vous ne subissez aucune coupure de couverture.</li>
                        </ol>
                      </div>
                      <Link href="/resiliation-mutuelle" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm">
                        Tout savoir sur la résiliation facile →
                      </Link>
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Comparez les mutuelles seniors et réalisez jusqu'à 40% d'économies</h2>
                  <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Recevez des <strong>devis personnalisés</strong>, adaptés à votre âge et vos besoins médicaux. Une protection optimale au meilleur prix.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
                    <PrimaryButton onClick={() => setIsCallbackModalOpen(true)}>
                      Comparer les mutuelles senior
                    </PrimaryButton>

                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center ring-1 ring-white/10">
                        <IconShield className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm sm:text-base">Expert Senior</div>
                        <div className="text-xs sm:text-sm">Conseil personnalisé 55+</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">40-100€</div>
                      <div className="text-xs sm:text-sm text-blue-200">Prix mensuel moyen</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">40%</div>
                      <div className="text-xs sm:text-sm text-blue-200">D'économies possibles</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">55+</div>
                      <div className="text-xs sm:text-sm text-blue-200">Public cible</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">4.8/5</div>
                      <div className="text-xs sm:text-sm text-blue-200">Satisfaction seniors</div>
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