// app/components/MutuelleOptique.tsx
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
  hero: "/images/mutuelle-optique.jpeg",
  lunettes: "/images/lunettes-optique.jpg",
  lentilles: "/images/lentilles-optique.AVIF",
  chirurgie: "/images/chirurgie-laser-optique.webp",
  famille: "/images/optique-famille.jpg",
  examen: "/images/examen-vue-optique.jpg",
  forfait: "/images/forfait-optique.png",
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
        Protection Optique
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

const optiqueSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Les lunettes sont-elles remboursées chaque année ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En règle générale, non. Pour les plus de 16 ans, le remboursement est limité à une fois tous les deux ans. Des exceptions existent en cas d'évolution de la vue (changement de correction) ou de casse selon les contrats."
      }
    },
    {
      "@type": "Question",
      "name": "Les lentilles sont-elles remboursées ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, mais quasi exclusivement par la mutuelle via un forfait annuel (ex: 100€ ou 200€). La Sécurité sociale ne rembourse que des cas médicaux très rares (kératocône, etc.)."
      }
    },
    {
      "@type": "Question",
      "name": "La chirurgie laser est-elle prise en charge ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Considérée comme une opération de confort, elle n'est jamais remboursée par la Sécu. Cependant, les bonnes mutuelles optiques incluent un forfait spécifique (ex: 300€ à 700€ par œil). Attention aux délais de carence."
      }
    }
  ]
};

/* ------------------------------ Page content ------------------------------ */

export default function MutuelleOptiquePage() {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = React.useState(false);

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(optiqueSchema) }}
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
                  Comparateur Mutuelle Optique : Vos Lunettes Bien Remboursées
                </h1>
                
                {/* Sous-titre descriptif */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed py-2">
                  Les équipements optiques représentent un coût important : <strong className="text-blue-600">lunettes, verres correcteurs, montures, lentilles</strong>.
                  La Sécurité sociale rembourse très peu ces dépenses.
                  La <strong className="text-blue-600">mutuelle optique</strong> permet de compléter ces remboursements et de préserver votre <strong className="text-blue-600">budget santé visuelle</strong>.
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
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 sm:pt-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center ring-1 ring-green-200">
                      <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-green-700">Lunettes Remboursées</span>
                      <span className="block text-xs text-green-600">Montures et verres</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center ring-1 ring-blue-200">
                      <IconShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-blue-700">Lentilles Incluses</span>
                      <span className="block text-xs text-blue-600">Forfait annuel</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/20 flex items-center justify-center ring-1 ring-yellow-200">
                      <IconBolt className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-yellow-700">Chirurgie Laser</span>
                      <span className="block text-xs text-yellow-600">Forfait par œil</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Hero */}
              <div className="relative mt-8 sm:mt-16 lg:mt-0">
                <div
  className="
    relative
    ml-16
    overflow-hidden
  
  "
>
                  <Image
                    src={images.hero}
                    alt="Mutuelle optique - Lunettes et équipements visuels remboursés"
                    width={500}
                    height={400}
                    className="ml-6"
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
            {/* Qu'est-ce qu'une mutuelle optique ? */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="definition"
                title="Qu'est-ce qu'une mutuelle optique ?"
                subtitle="Une complémentaire santé spécialisée pour la prise en charge des frais liés à la vue"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card
                  title="Couverture spécialisée"
                  icon={<IconCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
                  image={images.lunettes}
                >
                  <p>La <strong>mutuelle optique</strong> est une <strong>complémentaire santé spécialisée</strong> dédiée à la prise en charge des <strong>frais liés à la vue</strong>.</p>
                </Card>

                <Card 
                  title="Dépenses optiques couvertes" 
                  icon={<IconBolt className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.examen}
                >
                  <p>Elle permet de réduire le <strong>reste à charge optique</strong>, notamment sur les équipements hors 100% Santé (lunettes, lentilles, examens de la vue).</p>
                </Card>

                <Card 
                  title="À qui s'adresse-t-elle ?" 
                  icon={<IconShield className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  image={images.famille}
                >
                  <p>• <strong>Seniors et retraités</strong><br/>
                  • <strong>Familles</strong> avec enfants<br/>
                  • Personnes portant des lunettes ou lentilles<br/>
                  • Actifs ayant des besoins visuels réguliers</p>
                </Card>
              </div>
            </section>
            <SectionDivider />

            {/* Pourquoi souscrire une mutuelle optique ? */}
            <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="pourquoi"
                title="Pourquoi souscrire une mutuelle optique ?"
                subtitle="Les avantages d'une couverture spécialisée pour votre vue"
              />

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    1
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Compenser les faibles remboursements Sécu</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p>Les remboursements de base sont insuffisants face aux coûts réels des équipements optiques (montures et verres peu remboursés).</p>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    2
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Accéder à des équipements de qualité</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p>Une <strong>bonne mutuelle optique</strong> permet d'opter pour des verres adaptés à votre correction et à votre confort visuel (verres techniques et traitements spécifiques).</p>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    3
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">Anticiper le renouvellement</h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p>La <strong>mutuelle optique pas chère</strong> permet de maîtriser les dépenses sur le long terme et d'anticiper le renouvellement régulier de vos équipements.</p>
                  </div>
                </div>
              </div>
            </section>
            <SectionDivider />

            {/* Les garanties essentielles */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="garanties"
                title="Les garanties essentielles d'une mutuelle optique"
                subtitle="Les postes de remboursement indispensables pour votre santé visuelle"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { 
                    title: "Lunettes de vue", 
                    desc: "Montures et verres correcteurs, remboursement tous les 2 ans", 
                    icon: "👓",
                    image: images.lunettes
                  },
                  { 
                    title: "Lentilles de contact", 
                    desc: "Remboursement annuel ou forfait pour tous types de lentilles", 
                    icon: "🔍",
                    image: images.lentilles
                  },
                  { 
                    title: "Chirurgie réfractive", 
                    desc: "Laser et actes spécifiques pour myopie, astigmatisme, presbytie", 
                    icon: "⚡",
                    image: images.chirurgie
                  },
                  { 
                    title: "100% Santé Optique", 
                    desc: "Équipements sans reste à charge dans le cadre du dispositif", 
                    icon: "💯",
                    image: images.forfait
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
                        <span className="text-xs text-slate-500">Forfait moyen</span>
                        <span className="text-sm font-bold text-blue-600">100€ - 400€</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <SectionDivider />

            {/* Mutuelle optique seule ou complète ? */}
            <section className="py-8 sm:py-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Mutuelle optique seule ou mutuelle santé complète ?</h2>
                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 px-2">
                  Choisissez la formule qui correspond le mieux à vos besoins visuels et votre budget
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
                  <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
                    <div className="text-3xl mb-4 text-blue-600">👓</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Mutuelle optique seule</h3>
                    <p className="text-slate-600 mb-4">Adaptée si vos besoins concernent principalement la vue et les équipements optiques. Parfaite pour une couverture ciblée.</p>
                    <div className="text-center">
                      <span className="text-lg font-bold text-blue-600">Couverture spécialisée</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                    <div className="text-3xl mb-4 text-green-600">💊</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Mutuelle santé complète</h3>
                    <p className="text-slate-600 mb-4">Inclut optique, dentaire, hospitalisation et soins courants pour une protection santé globale.</p>
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
                title="Comment choisir la meilleure mutuelle optique ?"
                subtitle="Les critères essentiels pour faire le bon choix"
              />

              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20 hidden md:block" />
                <div className="absolute left-4 top-0 bottom-0 w-px bg-blue-200 md:hidden" />

                <div className="grid md:grid-cols-4 gap-6 md:gap-8 relative">
                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={1} title="Comparer les remboursements">
                      <ul className="space-y-1 sm:space-y-2">
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Forfaits annuels</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Plafonds</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          <span className="text-sm sm:text-base">Fréquences de renouvellement</span>
                        </li>
                      </ul>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={2} title="Vérifier les délais de carence">
                      <p>Certains contrats imposent un <strong>délai avant remboursement</strong>. Vérifiez ces conditions pour éviter les mauvaises surprises.</p>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={3} title="Examiner les équipements">
                      <p>Toutes les mutuelles ne couvrent pas les mêmes verres ou montures. Vérifiez bien les équipements pris en charge (verres progressifs, traitements, etc.).</p>
                    </StepCard>
                  </div>

                  <div className="relative md:pl-0 pl-8">
                    <StepCard step={4} title="Utiliser un comparateur">
                      <p>Utilisez notre <strong>comparateur de mutuelle optique</strong> pour identifier la meilleure solution.</p>
                      <div className="mt-3 sm:mt-4">
                        <PrimaryButton href="/comparateur-mutuelle">
                          Comparer maintenant
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
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Changer ou résilier sa mutuelle optique</h2>
                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 px-2">
                  Grâce à la <strong>résiliation infra-annuelle</strong>, vous pouvez changer de mutuelle après un an sans difficulté.
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
                title="FAQ - Mutuelle Optique"
                subtitle="Toutes les réponses à vos questions sur la mutuelle optique"
              />

              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
                <FAQItem
                  q="Les lunettes sont-elles remboursées chaque année ?"
                  a={
                    <div>
                      <p className="mb-3"><strong className="text-blue-600">En règle générale, non.</strong> Pour les adultes et les enfants de plus de 16 ans, le remboursement d'une monture et de deux verres est limité à <strong>une fois tous les deux ans</strong>.</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Exceptions importantes :</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li><strong>Changement de vue :</strong> Si votre ophtalmologue constate une évolution de votre correction (myopie, presbytie, etc.)</li>
                          <li><strong>Pour les enfants :</strong> Les moins de 16 ans peuvent renouveler leurs lunettes tous les ans (voire tous les 6 mois pour les moins de 6 ans)</li>
                          <li><strong>Casse :</strong> Selon les contrats, une garantie casse peut permettre un renouvellement anticipé</li>
                        </ul>
                      </div>
                      
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <h4 className="font-semibold text-yellow-800 mb-2">Conseil :</h4>
                        <p className="text-sm">Vérifiez bien la date de votre dernier achat pour ne pas voir votre demande de remboursement refusée.</p>
                      </div>
                    </div>
                  }
                />
                <FAQItem
                  q="Les lentilles sont-elles remboursées ?"
                  a={
                    <div>
                      <p className="mb-3 text-green-600 font-semibold">Oui, mais quasi exclusivement par la mutuelle.</p>
                      <p className="mb-3">L'Assurance Maladie ne rembourse les lentilles que dans des cas très rares et médicaux (kératocône, strabisme accommodatif, etc.). Pour la grande majorité des porteurs (myopie, astigmatisme classique), la Sécurité sociale ne verse rien.</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Comment ça fonctionne ?</h4>
                        <p className="text-sm mb-2">C'est votre <strong>mutuelle optique</strong> qui prend le relais via un <strong>forfait annuel en euros</strong> (par exemple : 100€, 200€ ou plus par an).</p>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Ce forfait est valable pour tous types de lentilles (journalières, mensuelles, progressives)</li>
                          <li>Il fonctionne sur présentation de la facture de l'opticien</li>
                          <li>Il est souvent "indépendant" du forfait lunettes, ce qui vous permet de cumuler les deux remboursements la même année</li>
                        </ul>
                      </div>
                    </div>
                  }
                />
                <FAQItem
                  q="La chirurgie laser est-elle prise en charge ?"
                  a={
                    <div>
                      <p className="mb-3">L'opération des yeux au laser (chirurgie réfractive pour la myopie, l'astigmatisme ou la presbytie) est considérée comme une <strong>opération de confort</strong> par la Sécurité sociale. Elle n'est donc <strong className="text-red-600">jamais remboursée</strong> par le régime obligatoire.</p>
                      
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-2">Prise en charge par la mutuelle :</h4>
                        <p className="text-sm mb-2">En revanche, les <strong>bonnes mutuelles optiques</strong> incluent un forfait spécifique pour la chirurgie réfractive :</p>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Le remboursement s'exprime généralement en <strong>forfait par œil</strong> (ex : 300€ à 700€ par œil)</li>
                          <li>Attention, certaines mutuelles imposent un <strong>délai de carence</strong> (souvent 3 à 6 mois) avant de pouvoir utiliser ce forfait</li>
                        </ul>
                      </div>
                      
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <h4 className="font-semibold text-yellow-800 mb-2">Conseil important :</h4>
                        <p className="text-sm">Pensez à souscrire votre contrat bien avant de planifier l'opération pour respecter les délais de carence.</p>
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Comparez les mutuelles optiques et protégez votre vue</h2>
                  <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    La santé visuelle est essentielle à votre qualité de vie. Comparez les <strong>meilleures mutuelles optiques</strong> et bénéficiez d'un accompagnement personnalisé.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
                    <PrimaryButton href="/comparateur-mutuelle">Comparer en 2 min</PrimaryButton>

                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center ring-1 ring-white/10">
                        <IconShield className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm sm:text-base">Meilleur remboursement</div>
                        <div className="text-xs sm:text-sm">Lunettes et lentilles</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">100-400€</div>
                      <div className="text-xs sm:text-sm text-blue-200">Forfait lunettes</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">100-200€</div>
                      <div className="text-xs sm:text-sm text-blue-200">Forfait lentilles/an</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">2 ans</div>
                      <div className="text-xs sm:text-sm text-blue-200">Renouvellement</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">4.9/5</div>
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