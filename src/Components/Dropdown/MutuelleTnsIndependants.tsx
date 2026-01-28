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
  hero: "/images/mutuelle-tns.png", // prévoir ce visuel (cf meta doc)
  artisan: "/images/tns-artisan.jpg",
  fiscalite: "/images/tns-fiscalite.jpeg",
  entrepreneurs: "/images/tns-entrepreneurs.jpg",
  comparatif: "/images/tns-comparatif.avif",
  assistance: "/images/tns-assistance-pro.jpeg",
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
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
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
      <button onClick={onClick} className={className}>
        {ButtonContent}
      </button>
    );
  }

  return (
    <a href={href} className={className}>
      {ButtonContent}
    </a>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
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
  pill,
}: {
  title: string;
  subtitle?: string;
  id?: string;
  pill?: string;
}) {
  return (
    <header id={id} className="text-center space-y-4 mb-8 lg:mb-10 px-2 sm:px-0">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold ring-1 ring-blue-100">
        <IconCheck className="w-3 h-3" />
        {pill ?? "Mutuelle Pro"}
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
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />

      {image ? (
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
      ) : null}

      <div className="flex items-start gap-3 sm:gap-4">
        {icon ? (
          <span className="mt-1 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg flex-shrink-0">
            {icon}
          </span>
        ) : null}

        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{title}</h3>
          <div className="text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
            {children}
          </div>
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
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">
        {title}
      </h3>
      <div className="text-slate-600 leading-relaxed text-sm sm:text-base">{children}</div>
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 opacity-20">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-500/10 blur-xl" />
      </div>
    </div>
  );
}

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

          <div className="hidden md:block text-xs sm:text-sm text-slate-700 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-96 transition-all duration-500">
            {a}
          </div>

          <div
            className={`md:hidden text-xs sm:text-sm text-slate-700 leading-relaxed transition-all duration-500 overflow-hidden ${
              isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
            }`}
          >
            {a}
          </div>
        </div>

        <div className={`flex-shrink-0 text-blue-600 transition-transform ${isOpen ? "rotate-90" : ""}`}>
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Schema JSON-LD (doc) ------------------------------ */

const tnsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://devismutuelle.fr/#organization",
      name: "Devis Mutuelle",
      url: "https://devismutuelle.fr",
      logo: {
        "@type": "ImageObject",
        url: "https://devismutuelle.fr/logo.png",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+33-1-00-00-00-00",
        contactType: "sales",
        areaServed: "FR",
        availableLanguage: "French",
      },
    },
    {
      "@type": "Service",
      name: "Courtage Mutuelle TNS & Loi Madelin",
      provider: { "@id": "https://devismutuelle.fr/#organization" },
      description:
        "Comparaison et souscription de complémentaires santé éligibles à la Loi Madelin pour les travailleurs non salariés (TNS).",
      areaServed: "FR",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Travailleurs Non Salariés, Artisans, Professions Libérales",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://devismutuelle.fr/mutuelle/tns-independants-loi-madelin",
      name: "Mutuelle TNS & Indépendants : Comparatif Loi Madelin",
      description: "Tout savoir sur la mutuelle TNS et la fiscalité Madelin.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://devismutuelle.fr" },
          { "@type": "ListItem", position: 2, name: "Mutuelle", item: "https://devismutuelle.fr/mutuelle" },
          { "@type": "ListItem", position: 3, name: "TNS & Indépendants" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Qui peut bénéficier de la Loi Madelin ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "La Loi Madelin s'adresse aux travailleurs non salariés (TNS) imposés au titre des BIC ou des BNC : artisans, commerçants, professions libérales, gérants majoritaires de SARL. Les auto-entrepreneurs ne peuvent pas déduire les cotisations.",
          },
        },
        {
          "@type": "Question",
          name: "Est-il obligatoire d'avoir une mutuelle quand on est TNS ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Non, contrairement aux salariés du privé, la mutuelle n'est pas obligatoire pour les indépendants. Cependant, elle est fortement recommandée car la couverture du régime obligatoire est souvent insuffisante.",
          },
        },
        {
          "@type": "Question",
          name: "Peut-on couvrir sa famille avec un contrat Madelin ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Oui, vous pouvez affilier votre conjoint et vos enfants sur votre contrat TNS. La part de cotisation les concernant est également déductible, à condition qu'ils soient ayants droit au sens de la Sécurité sociale.",
          },
        },
      ],
    },
  ],
};

/* ------------------------------ Page content ------------------------------ */

export default function MutuelleTnsIndependants() {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = React.useState(false);

  return (
    <>
      <Script
        id="tns-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tnsSchema) }}
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

          <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-20 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl leading-tight font-extrabold text-blue-700 mb-3 sm:mb-4 mt-32">
                  Mutuelle TNS & Indépendants : La couverture santé qui réduit vos impôts en 2026
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed py-2">
                  Artisans, commerçants, professions libérales ou gérants majoritaires : en tant
                  qu’indépendant, votre santé est votre premier outil de travail. Si vous vous
                  arrêtez, <strong className="text-blue-600">votre chiffre d’affaires s’arrête aussi</strong>.
                  
                  Contrairement aux salariés, vous ne bénéficiez pas d’une mutuelle d’entreprise obligatoire
                  financée à 50%. C’est à vous de vous protéger.
                  
                  Avec la <strong className="text-blue-600">Loi Madelin</strong>, cette contrainte devient une
                  opportunité fiscale : vous pouvez <strong className="text-blue-600">déduire vos cotisations</strong>{" "}
                  de votre bénéfice imposable.
                </p>

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

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 sm:pt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center ring-1 ring-green-200">
                      <IconCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-green-700">Déductible Madelin</span>
                      <span className="block text-xs text-green-600">BIC / BNC</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center ring-1 ring-blue-200">
                      <IconShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-blue-700">Contrats TNS</span>
                      <span className="block text-xs text-blue-600">Pensés “pro”</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/20 flex items-center justify-center ring-1 ring-yellow-200">
                      <IconBolt className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm font-semibold text-yellow-700">Effet rapide</span>
                      <span className="block text-xs text-yellow-600">Sans carence si possible</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Hero */}
              <div className="relative mt-8 sm:mt-16 lg:mt-0">
                <div className="relative ml-16 overflow-hidden ">
                  <Image
                    src={images.hero}
                    alt="Mutuelle TNS et Loi Madelin"
                    width={500}
                    height={400}
                   
                    priority
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
            {/* Pourquoi indispensable */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="pourquoi"
                pill="Protection TNS"
                title="Pourquoi une Mutuelle TNS spécifique est indispensable ?"
                subtitle="Une mutuelle “particulier” ne couvre pas correctement vos enjeux d’indépendant : rapidité, continuité d’activité et protection du revenu."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card
                  title="Vos besoins sont différents"
                  icon={<IconShield className="w-5 h-5 sm:w-6 sm:h-6" />}
                  image={images.artisan}
                >
                  <p>
                    Les contrats TNS sont conçus pour répondre à vos priorités : <strong>se soigner vite</strong>,
                    limiter les restes à charge et sécuriser votre activité.
                  </p>
                </Card>

                <Card
                  title="Le levier fiscal Madelin"
                  icon={<IconBolt className="w-5 h-5 sm:w-6 sm:h-6" />}
                  image={images.fiscalite}
                >
                  <p>
                    Avec une mutuelle TNS <strong>responsable</strong>, vos cotisations peuvent être{" "}
                    <strong>déductibles</strong> (BIC/BNC).{" "}
                    <strong className="text-blue-700">Plus vous vous protégez, moins vous payez d’impôts.</strong>
                  </p>
                </Card>

                <Card
                  title="Attention aux auto-entrepreneurs"
                  icon={<IconCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
                  image={images.entrepreneurs}
                >
                  <p>
                    Les micro-entrepreneurs ne peuvent pas déduire les cotisations Madelin (abattement
                    forfaitaire). Pour eux :{" "}
                    <Link className="text-blue-700 font-semibold hover:underline" href="/mutuelle/auto-entrepreneur">
                      offres spécifiques à petit prix
                    </Link>
                    .
                  </p>
                </Card>
              </div>
            </section>

            <SectionDivider />

            {/* Critères de choix */}
            <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-blue-50/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <SectionTitle
                id="criteres"
                pill="Choisir correctement"
                title="Quels critères pour bien choisir sa mutuelle Indépendant ?"
                subtitle="Ne regardez pas que le prix : en cas de coup dur, une mauvaise couverture peut mettre en péril votre activité."
              />

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    1
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">
                    Le délai de carence (Attention)
                  </h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p>
                      Certains contrats imposent <strong>3 à 6 mois</strong> avant de rembourser l’hospitalisation
                      ou le dentaire. Nous privilégions les contrats à <strong>effet immédiat</strong> quand c’est
                      possible.
                    </p>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    2
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">
                    Les remboursements renforcés
                  </h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <ul className="space-y-2">
                      <li className="flex gap-2">
                        <IconCheck className="w-4 h-4 text-green-600 mt-0.5" />
                        <span>
                          <strong>Dentaire / Optique</strong> : forfaits élevés si lunettes ou soins en attente
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <IconCheck className="w-4 h-4 text-green-600 mt-0.5" />
                        <span>
                          <strong>Médecines douces</strong> : ostéo, chiro… (souvent utile pour les artisans)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    3
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pl-8 sm:pl-10">
                    La prévoyance (indispensable)
                  </h3>
                  <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    <p>
                      Pensez à coupler la mutuelle avec une garantie <strong>maintien de salaire</strong> pour
                      percevoir des <strong>indemnités journalières</strong> en cas d’arrêt maladie.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <SectionDivider />

            {/* Comparatif */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="comparatif"
                pill="Comparatif"
                title="Comparatif : Mutuelle TNS vs Mutuelle Classique"
                subtitle="Pourquoi ne faut-il pas garder votre ancien contrat salarié ?"
              />

              <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
                <div className="rounded-2xl border border-slate-100 bg-white shadow-lg overflow-hidden">
                  <div className="relative h-40 sm:h-56">
                    <Image
                      src={images.comparatif}
                      alt="Comparatif mutuelle TNS vs classique"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="text-slate-900">
                            <th className="py-3 pr-4 font-bold">Critère</th>
                            <th className="py-3 pr-4 font-bold">Mutuelle classique</th>
                            <th className="py-3 font-bold">Mutuelle TNS (Madelin)</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-700">
                          {[
                            ["Fiscalité", "Aucune déduction", "Déductible des impôts (BIC/BNC)"],
                            ["Tarification", "Standardisée par âge", "Souvent plus avantageuse pour les TNS"],
                            ["Services", "Assistance standard", "Assistance Pro (retour au travail)"],
                            [
                              "Famille",
                              "Payante pour les ayants droit",
                              "Possibilité de couvrir la famille (part TNS déductible)",
                            ],
                          ].map((row) => (
                            <tr key={row[0]} className="border-t border-slate-100">
                              <td className="py-3 pr-4 font-semibold text-slate-900">{row[0]}</td>
                              <td className="py-3 pr-4">{row[1]}</td>
                              <td className="py-3">
                                <span className="inline-flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-green-500" />
                                  {row[2]}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <PrimaryButton onClick={() => setIsCallbackModalOpen(true)}>
                        Je demande mon devis
                      </PrimaryButton>
                      <SecondaryButton href="/comparateur-mutuelle">Comparer en 2 min</SecondaryButton>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <Card
                    title="Pourquoi c’est plus cohérent pour un indépendant"
                    icon={<IconShield className="w-5 h-5 sm:w-6 sm:h-6" />}
                  >
                    <p>
                      Votre couverture doit soutenir votre activité : remboursements utiles, services pro,
                      et une logique de coût réellement optimisée grâce à la <strong>Loi Madelin</strong>.
                    </p>
                  </Card>

                  <Card
                    title="Objectif : moins de paperasse, plus d’efficacité"
                    icon={<IconBolt className="w-5 h-5 sm:w-6 sm:h-6" />}
                    image={images.assistance}
                  >
                    <p>
                      Un contrat adapté TNS peut inclure des services d’<strong>assistance pro</strong> (aide à
                      domicile, garde d’enfants…) pour reprendre plus vite.
                    </p>
                  </Card>

                  <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/60 p-5 sm:p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Conseil d’expert</h3>
                    <p className="text-slate-700 text-sm sm:text-base">
                      Pour bénéficier de Madelin, vous devez être <strong>à jour</strong> de vos cotisations aux
                      régimes obligatoires maladie et vieillesse.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <SectionDivider />

            {/* Pourquoi DevisMutuelle */}
            <section className="py-8 sm:py-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                  Pourquoi confier votre protection sociale à DevisMutuelle.fr ?
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 px-2">
                  Nous savons que vous n’avez pas de temps à perdre avec la paperasse.
                </p>

                <div className="grid md:grid-cols-3 gap-4 sm:gap-6 text-left mb-8">
                  <Card title="Courtier spécialisé" icon={<IconCheck className="w-5 h-5 sm:w-6 sm:h-6" />}>
                    <p>
                      Nous comparons les offres de <strong>SwissLife, April, Alptis</strong> et d’autres leaders
                      pro.
                    </p>
                  </Card>
                  <Card title="Attestation Loi Madelin" icon={<IconShield className="w-5 h-5 sm:w-6 sm:h-6" />}>
                    <p>Chaque année, nous vous fournissons l’attestation fiscale pour votre expert-comptable.</p>
                  </Card>
                  <Card title="Gestion simplifiée" icon={<IconBolt className="w-5 h-5 sm:w-6 sm:h-6" />}>
                    <p>Un seul interlocuteur pour gérer votre santé et celle de votre famille.</p>
                  </Card>
                </div>

                <PrimaryButton onClick={() => setIsCallbackModalOpen(true)}>
                  Je demande mon devis Mutuelle TNS
                </PrimaryButton>

                <p className="text-xs sm:text-sm text-slate-500 mt-4">
                  Comparaison gratuite et sans engagement en 2 min.
                </p>
              </div>
            </section>

            <SectionDivider />

            {/* FAQ */}
            <section className="py-8 sm:py-12">
              <SectionTitle
                id="faq"
                pill="FAQ"
                title="FAQ - Mutuelle TNS & Loi Madelin"
                subtitle="Les questions les plus fréquentes des indépendants."
              />

              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
                <FAQItem
                  q="Qui peut bénéficier de la Loi Madelin ?"
                  a={
                    <p>
                      La Loi Madelin s’adresse aux <strong>TNS</strong> imposés en <strong>BIC</strong> ou{" "}
                      <strong>BNC</strong> (artisans, commerçants, professions libérales, gérants majoritaires). Les{" "}
                      <strong>auto-entrepreneurs</strong> ne peuvent pas déduire les cotisations.
                    </p>
                  }
                />
                <FAQItem
                  q="Est-il obligatoire d’avoir une mutuelle quand on est TNS ?"
                  a={
                    <p>
                      Non, ce n’est pas obligatoire. En revanche, c’est fortement recommandé car la couverture du
                      régime obligatoire est souvent insuffisante, et votre activité dépend directement de votre
                      capacité à travailler.
                    </p>
                  }
                />
                <FAQItem
                  q="Peut-on couvrir sa famille avec un contrat Madelin ?"
                  a={
                    <p>
                      Oui. Vous pouvez affilier conjoint et enfants. La part de cotisation les concernant est
                      également déductible, à condition qu’ils soient ayants droit au sens de la Sécurité sociale.
                    </p>
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                    Optimisez votre protection sociale en 2026
                  </h2>
                  <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Ne laissez pas votre santé au hasard et ne payez pas plus d’impôts que nécessaire.
                    Nos experts calculent votre <strong>enveloppe fiscale Madelin</strong> gratuitement.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12">
                    <PrimaryButton onClick={() => setIsCallbackModalOpen(true)}>Je demande mon devis</PrimaryButton>

                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center ring-1 ring-white/10">
                        <IconShield className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm sm:text-base">TNS / Professions libérales</div>
                        <div className="text-xs sm:text-sm">Comparaison gratuite</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">BIC / BNC</div>
                      <div className="text-xs sm:text-sm text-blue-200">Éligibilité</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">Madelin</div>
                      <div className="text-xs sm:text-sm text-blue-200">Déduction fiscale</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">2 min</div>
                      <div className="text-xs sm:text-sm text-blue-200">Devis</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold">Sans engagement</div>
                      <div className="text-xs sm:text-sm text-blue-200">Gratuit</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Note : isCallbackModalOpen est prêt si vous avez un modal global.
                Vous pouvez brancher ici votre composant de modal si besoin. */}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
