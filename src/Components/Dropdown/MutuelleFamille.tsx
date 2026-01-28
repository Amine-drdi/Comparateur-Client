// app/components/MutuelleFamille.tsx
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

function IconFamily(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHeart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMoney(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"
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
  hero: "/images/mutuelle-famille.jpg",
  famille: "/images/Mutuelle-famille-pasCher.png",
  enfants: "/images/Mutuelle-enfant.jpg",
  Privileges: "/images/Mutuelle-privileges.jpg",
  economie: "/images/economie-famille.jpg",
  garanties: "/images/garanties-famille.jpg",
  couple: "/images/Mutuelle-couple.jpg",
  individuelle: "/images/individuelle-optique.jpg",
  comparateur: "/images/comparateur-Mutuelle-famille.jpg",
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
        Mutuelle Famille
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

const familleSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte une mutuelle famille ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le budget moyen pour une famille de 4 personnes (2 adultes + 2 enfants) se situe généralement entre 100 € et 180 € par mois pour une couverture de niveau intermédiaire. Le prix varie selon la composition du foyer, le lieu de résidence et l'âge des parents. Astuce : visez les contrats offrant la gratuité à partir du 3ème enfant."
      }
    },
    {
      "@type": "Question",
      "name": "Les enfants sont-ils bien remboursés ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, si le contrat est bien choisi. Une bonne mutuelle famille doit renforcer trois postes clés souvent mal remboursés par la Sécurité sociale : l'orthodontie (dépense n°1 à l'adolescence), l'optique (renouvellement fréquent des lunettes) et les dépassements d'honoraires des pédiatres et spécialistes."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on ajouter un enfant en cours d'année ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument. La mutuelle famille est un contrat flexible conçu pour évoluer avec votre foyer. L'ajout d'un enfant (naissance ou adoption) se fait à tout moment sur simple envoi de l'acte de naissance. L'enfant est couvert rétroactivement et certaines mutuelles versent même une prime de naissance (entre 100 € et 300 €)."
      }
    }
  ]
};

/* ------------------------------ Page content ------------------------------ */

export default function MutuelleFamillePage() {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = React.useState(false);

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(familleSchema) }}
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
                  Mutuelle Famille Pas Chère : Assurez Parents et Enfants à Petit Prix
                </h1>
                
                {/* Sous-titre descriptif */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed py-2">
                  Protéger la santé de votre foyer est une priorité.
                  Avec <strong className="text-blue-600">Devis Mutuelle</strong>, comparez les <strong className="text-blue-600">meilleures mutuelles famille</strong> et trouvez une <strong className="text-blue-600">assurance santé familiale</strong> qui couvre efficacement <strong className="text-blue-600">parents et enfants</strong>, tout en maîtrisant votre budget.
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
                      <IconFamily className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-green-700">Famille Complète</span>
                      <span className="block text-xs text-green-600">Parents et enfants</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center ring-1 ring-blue-200">
                      <IconMoney className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-blue-700">Économies</span>
                      <span className="block text-xs text-blue-600">Gratuité 3ème enfant</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/20 flex items-center justify-center ring-1 ring-yellow-200">
                      <IconHeart className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-yellow-700">Santé Protégée</span>
                      <span className="block text-xs text-yellow-600">Garanties complètes</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Hero */}
              <div className="relative mt-8 sm:mt-16 lg:mt-0">
                <div className="relative  overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] mt-12">
                  <Image
                    src={images.hero}
                    alt="Mutuelle famille - Protégez parents et enfants à petit prix"
                    width={500}
                    height={500}
                    
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
            {/* Pourquoi choisir une mutuelle famille ? */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="pourquoi"
                title="Pourquoi choisir une mutuelle famille ?"
                subtitle="Une mutuelle famille permet de regrouper l'ensemble des membres du foyer sous un seul contrat, avec des garanties adaptées aux besoins de chacun, tout en bénéficiant d'un tarif avantageux."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card
                  title="Une couverture santé pour toute la famille"
                  icon={<IconFamily className="w-5 h-5 sm:w-6 sm:h-6 " />}
                  image={images.famille}
                >
                  <p><strong>Parents, enfants, adolescents et nourrissons</strong>. Chaque membre de la famille a des besoins de santé spécifiques, que la mutuelle familiale doit couvrir efficacement.</p>
                </Card>

                <Card 
                  title="Des économies sur le budget santé du foyer" 
                  icon={<IconMoney className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.economie}
                >
                  <p>Regrouper les ayants droit dans une <strong>mutuelle santé familiale</strong> permet souvent de bénéficier :</p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-start gap-2">
                      <IconCheck className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                      <span>De cotisations réduites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <IconCheck className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                      <span>De <strong>gratuité à partir du 2ᵉ ou 3ᵉ enfant</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <IconCheck className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                      <span>D'avantages familiaux spécifiques</span>
                    </li>
                  </ul>
                </Card>

                <Card 
                  title="Une gestion simplifiée" 
                  icon={<IconCheck className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.garanties}
                >
                  <p>Un seul contrat, un seul interlocuteur, et une meilleure lisibilité des remboursements pour toute la famille. Simplifiez votre gestion administrative et bénéficiez d'un suivi unique pour tous les membres.</p>
                </Card>
              </div>
            </section>
            <SectionDivider />

            {/* Mutuelle Famille, Mutuelle Couple ou Mutuelle Individuelle ? */}
            <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="comparaison"
                title="Mutuelle Famille, Mutuelle Couple ou Mutuelle Individuelle ?"
                subtitle="Choisissez la formule qui correspond le mieux à votre situation familiale"
              />

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    1
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Mutuelle Famille</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p className="mb-3">Idéale pour les foyers avec enfants, elle propose des <strong>garanties complètes et évolutives</strong> adaptées à chaque âge.</p>
                    <div className="mt-4">
                      <PrimaryButton href="/mutuelle-sante/mutuelle-famille">
                        En savoir plus
                      </PrimaryButton>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    2
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Mutuelle Couple</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p className="mb-3">Convient aux foyers sans enfants ou aux jeunes couples.</p>
                    <div className="mt-4">
                      <SecondaryButton href="/mutuelle-sante/mutuelle-couple">
                        Découvrir la mutuelle couple
                      </SecondaryButton>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    3
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Mutuelle Individuelle</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p className="mb-3">Plus adaptée aux personnes seules ou sans ayants droit.</p>
                    <div className="mt-4">
                      <PrimaryButton href="/comparateur-mutuelle">
                        Comparer les offres
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* Comment choisir la meilleure mutuelle famille ? */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="choisir"
                title="Comment choisir la meilleure mutuelle famille ?"
                subtitle="Les étapes essentielles pour trouver la mutuelle adaptée à votre foyer"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { 
                    title: "Identifier les besoins de chaque membre", 
                    desc: "Soins courants, pédiatrie, orthodontie, optique, hospitalisation", 
                    icon: "🎯",
                    image: images.enfants
                  },
                  { 
                    title: "Privilégier les garanties essentielles pour les enfants", 
                    desc: "Orthodontie, lunettes, consultations spécialisées", 
                    icon: "👶",
                    image: images.Privileges
                  },
                  { 
                    title: "Comparer plusieurs devis personnalisés", 
                    desc: "Grâce à notre comparateur de mutuelle famille, recevez rapidement des offres adaptées", 
                    icon: "📊",
                    image: images.comparateur
                  },
                  { 
                    title: "Se faire accompagner par un conseiller", 
                    desc: "Nos experts vous aident à choisir la mutuelle famille la plus avantageuse selon votre budget", 
                    icon: "🤝",
                    image: images.couple
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
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-2xl sm:text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm">{item.desc}</p>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Recommandé</span>
                        <span className="text-sm font-bold text-blue-600">★ ★ ★ ★ ★</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <SectionDivider />

            {/* Les garanties indispensables d'une mutuelle famille */}
            <section className="py-8 sm:py-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="garanties"
                title="Les garanties indispensables d'une mutuelle famille"
                subtitle="Les postes de remboursement essentiels pour protéger toute votre famille"
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    title: "Hospitalisation pour toute la famille",
                    items: ["Frais de séjour", "Chambre individuelle", "Actes chirurgicaux"],
                    icon: "🏥"
                  },
                  {
                    title: "Soins courants et médecine de ville",
                    items: ["Consultations", "Analyses", "Imagerie médicale"],
                    icon: "👨‍⚕️"
                  },
                  {
                    title: "Optique familiale",
                    items: ["Lunettes enfants", "Lentilles", "Chirurgie réfractive"],
                    icon: "👓"
                  },
                  {
                    title: "Dentaire et orthodontie",
                    items: ["Soins dentaires", "Appareils orthodontiques", "Prothèses"],
                    icon: "🦷"
                  },
                  {
                    title: "Prévention et médecines douces",
                    items: ["Vaccins", "Ostéopathie", "Bilans de prévention"],
                    icon: "💉"
                  },
                  {
                    title: "Pédiatrie et consultations spécialisées",
                    items: ["Pédiatre", "ORL", "Orthophoniste"],
                    icon: "👶"
                  }
                ].map((garantie) => (
                  <div
                    key={garantie.title}
                    className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full"
                  >
                    <div className="text-3xl mb-4">{garantie.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">{garantie.title}</h3>
                    <ul className="space-y-2">
                      {garantie.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <IconCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-slate-600 text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
            <SectionDivider />

            {/* Comment choisir ? - Étapes détaillées */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="etapes"
                title="Comparateur Mutuelle Famille -- Comment ça fonctionne ?"
                subtitle="Trouvez la mutuelle famille parfaite en 3 étapes simples"
              />

              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20 hidden md:block" />
                <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-200 md:hidden" />

                <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={1} title="Renseignez votre situation familiale">
                      <ul className="space-y-1 sm:space-y-2">
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Nombre de personnes</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Âge des enfants</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Besoins spécifiques</span>
                        </li>
                      </ul>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={2} title="Recevez des devis personnalisés">
                      <p>Comparaison des <strong>meilleures mutuelles famille</strong> du marché. Recevez des offres adaptées à votre foyer en quelques minutes.</p>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={3} title="Choisissez la meilleure offre">
                      <p>Accompagnement par un conseiller jusqu'à la souscription. Nos experts vous aident à faire le meilleur choix pour votre famille.</p>
                      <div className="mt-3 sm:mt-4">
                        <PrimaryButton href="tel:0188812108">
                          Parler à un conseiller
                        </PrimaryButton>
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
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Changer ou résilier sa mutuelle famille</h2>
                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 px-2">
                  Grâce à la <strong>résiliation infra-annuelle</strong>, vous pouvez changer de mutuelle à tout moment après un an sans difficulté.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <PrimaryButton href="/resiliation-mutuelle">En savoir plus sur la résiliation</PrimaryButton>
                  <SecondaryButton href="tel:0188812108">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                    </svg>
                    Parler à un conseiller : 01 88 81 21 08
                  </SecondaryButton>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* FAQ */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="faq"
                title="FAQ - Mutuelle Famille"
                subtitle="Toutes les réponses à vos questions sur la mutuelle famille"
              />

              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
                <FAQItem
                  q="Combien coûte une mutuelle famille ?"
                  a={
                    <div>
                      <p className="mb-3">Le budget moyen pour une famille de 4 personnes (2 adultes + 2 enfants) se situe généralement <strong className="text-blue-600">entre 100 € et 180 € par mois</strong> pour une couverture de niveau intermédiaire.</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Critères qui influencent le prix :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><strong>La composition du foyer :</strong> De nombreux assureurs proposent la <strong>gratuité à partir du 3ème enfant</strong>, ce qui est un avantage financier majeur pour les familles nombreuses.</li>
                          <li><strong>Le lieu de résidence :</strong> Les soins sont souvent plus chers dans les grandes agglomérations (Paris, Lyon), ce qui impacte la cotisation.</li>
                          <li><strong>L'âge des parents :</strong> Le tarif est indexé sur l'âge de l'adulte le plus âgé.</li>
                        </ul>
                      </div>
                      
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <h4 className="font-semibold text-yellow-800 mb-2">Astuce :</h4>
                        <p className="text-sm">Pour réduire la facture sans rogner sur la qualité, privilégiez les contrats "responsables" qui offrent des réductions familiales (souvent -10 % à -15 % pour les couples).</p>
                      </div>
                    </div>
                  }
                />
                <FAQItem
                  q="Les enfants sont-ils bien remboursés ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Oui, si vous choisissez les bonnes garanties.</p>
                      <p className="mb-3">Les besoins de santé des enfants sont spécifiques et une bonne mutuelle famille doit renforcer trois postes prioritaires souvent mal remboursés par la Sécurité sociale :</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Postes prioritaires :</h4>
                        <ol className="list-decimal pl-4 space-y-2 text-sm">
                          <li>
                            <strong>L'orthodontie :</strong> C'est la dépense n°1 à l'adolescence. La mutuelle doit compléter le remboursement de base (souvent insuffisant) avec un <strong>forfait semestriel solide</strong>.
                          </li>
                          <li>
                            <strong>L'optique :</strong> Les enfants cassent ou changent souvent de lunettes. Un contrat qui autorise un <strong>renouvellement fréquent</strong> (tous les ans pour les mineurs) est indispensable.
                          </li>
                          <li>
                            <strong>Les consultations spécialisées :</strong> Pédiatre, ORL ou orthophoniste pratiquent souvent des dépassements d'honoraires que votre mutuelle doit couvrir.
                          </li>
                        </ol>
                      </div>
                    </div>
                  }
                />
                <FAQItem
                  q="Peut-on ajouter un enfant en cours d'année ?"
                  a={
                    <div>
                      <p className="mb-3 font-semibold text-green-600">Absolument.</p>
                      <p className="mb-3">La mutuelle famille est un contrat flexible conçu pour évoluer avec votre foyer. L'ajout d'un nouvel <strong>ayant-droit</strong> (suite à une <strong>naissance</strong> ou une <strong>adoption</strong>) se fait à tout moment, sans attendre l'échéance annuelle du contrat.</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">La démarche est simple :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Il suffit d'envoyer un <strong>acte de naissance</strong> à votre assureur.</li>
                          <li>L'enfant est généralement couvert rétroactivement dès le jour de sa naissance.</li>
                        </ul>
                      </div>
                      
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <h4 className="font-semibold text-yellow-800 mb-2">Bon à savoir :</h4>
                        <p className="text-sm">Certaines mutuelles offrent une <strong>prime de naissance</strong> (entre 100 € et 300 €) lors de l'arrivée d'un bébé si vous l'inscrivez sur votre contrat.</p>
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Comparez les mutuelles famille et protégez votre foyer</h2>
                  <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Protégez la santé de vos proches avec une <strong>mutuelle familiale performante</strong>, adaptée à vos besoins et à votre budget.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
                    <PrimaryButton href="/comparateur-mutuelle">Comparer en 2 min</PrimaryButton>

                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center ring-1 ring-white/10">
                        <IconFamily className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm sm:text-base">Famille protégée</div>
                        <div className="text-xs sm:text-sm">Parents et enfants</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">100-180€</div>
                      <div className="text-xs sm:text-sm text-blue-200">Budget mensuel moyen</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">Gratuit</div>
                      <div className="text-xs sm:text-sm text-blue-200">À partir du 3ème enfant</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">Flexible</div>
                      <div className="text-xs sm:text-sm text-blue-200">Ajout d'enfant à tout moment</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">4.8/5</div>
                      <div className="text-xs sm:text-sm text-blue-200">Satisfaction client</div>
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