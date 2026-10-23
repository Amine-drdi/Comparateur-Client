"use client";

import React from "react";
import Script from "next/script";
import Image from "next/image";

import NavbarA from "../Home/NavBar";
import Footer from "../Home/Footer";

// ⚠️ IMPORTANT :
// Je réutilise les mêmes composants UI que ton précédent composant
// (SectionTitle, Card, FAQItem, Buttons, Icons, etc).
// Si ton projet a déjà ces exports dans un fichier commun, garde le même import.
// Sinon, adapte le chemin selon ton organisation.
import {
  SectionDivider,
  SectionTitle,
  Card,
  FAQItem,
  PrimaryButton,
  SecondaryButton,
  IconShield,
  IconCheck,
  InlineLinks,
} from "../epargne-retraite/EpargneRetraiteBase";

type GuideCard = {
  title: string;
  href: string;
  category: string;
  readingTime: string;
  excerpt: string;
  bullets: string[];
  ctaLabel: string;
};

const images = {
  hero: "/images/guides-conseils-assurance.png",
};

const GUIDES: GuideCard[] = [
  {
    title: "Préparer sa retraite : PER, assurance vie et fiscalité",
    href: "/epargne-retraite/preparer-sa-retraite",
    category: "Épargne & Retraite",
    readingTime: "8–12 min",
    excerpt:
      "Découvrez les principales différences entre le PER et l’assurance vie, leurs règles fiscales et les questions à examiner selon votre situation.",
    bullets: [
      "Comparer disponibilité de l’épargne et modalités de sortie.",
      "Vérifier les conditions de déduction fiscale du PER.",
      "Examiner frais, risques et garanties de chaque contrat.",
      "Demander un conseil adapté à votre situation personnelle.",
    ],
    ctaLabel: "Lire le guide complet 2026",
  },
  {
    title: "Mutuelle à la retraite : comparer les garanties et le maintien du contrat",
    href: "/guides-conseils/retraite/choisir-mutuelle-retraite",
    category: "Mutuelle & Retraite",
    readingTime: "6 min",
    excerpt:
      "Départ à la retraite, maintien éventuel de la couverture collective et besoins de santé : les éléments à examiner avant de choisir.",
    bullets: [
      "Comparer les garanties de l’ancien contrat et des contrats individuels.",
      "Vérifier les conditions et cotisations en cas de maintien.",
      "Prioriser les besoins en optique, dentaire et hospitalisation.",
    ],
    ctaLabel: "Lire le guide mutuelle retraite",
  },
];

const SEO = {
  title: "Guides retraite : PER, assurance vie et mutuelle à la retraite",
  description:
    "Comparez les solutions pour préparer la retraite et découvrez les points à vérifier pour choisir une mutuelle adaptée lors du départ à la retraite.",
  canonical: "https://www.lamutuelledefrance.fr/guides-conseils/retraite",
  ogImage: "https://www.lamutuelledefrance.fr/images/PlanEpargneRetraite.jpg",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.lamutuelledefrance.fr/#organization",
      name: "La Mutuelle de France",
      url: "https://www.lamutuelledefrance.fr",
      logo: {
        "@type": "ImageObject",
        url: "https://www.lamutuelledefrance.fr/logo.png",
      },
    },
    {
      "@type": "Article",
      headline: "Guides retraite : PER, assurance vie et mutuelle à la retraite",
      description:
        "Guides pratiques sur la préparation financière de la retraite et le choix d'une couverture santé adaptée.",
      image: SEO.ogImage,
      publisher: { "@id": "https://www.lamutuelledefrance.fr/#organization" },
      mainEntityOfPage: { "@type": "WebPage", "@id": SEO.canonical },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Faut-il ouvrir un PER ou une Assurance Vie en 2026 ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Cela dépend de votre objectif fiscal. Le PER est idéal pour réduire vos impôts immédiatement si vous êtes fortement imposé. L'Assurance Vie est préférable pour garder votre épargne disponible et pour la transmission.",
          },
        },
        {
          "@type": "Question",
          name: "Combien peut-on déduire de ses impôts avec un PER ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Vous pouvez déduire vos versements dans la limite de 10% de vos revenus professionnels de l'année précédente, avec un plafond maximum fixé chaque année par la Sécurité Sociale (PASS).",
          },
        },
        {
          "@type": "Question",
          name: "L'argent du PER est-il totalement bloqué ?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "En principe oui, jusqu'à l'âge de la retraite. Cependant, la loi autorise le déblocage anticipé pour l'achat de la résidence principale ou en cas d'accident de la vie (invalidité, surendettement, etc.).",
          },
        },
      ],
    },
  ],
};

export default function GuidesConseilsRetraite() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Script
        id="jsonld-guides-conseils-retraite"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <NavbarA />

      <main className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        {/* HERO */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f6ff] via-[#f0f4ff] to-[#e8f2ff]" />
          <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-700 mt-32">
                  Tout savoir sur le PER, l’Assurance Vie et la Défiscalisation : le guide complet 2026
                </h1>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-4">
                  Préparer sa retraite n’est plus une option : baisse des pensions, fiscalité, inflation… Ce dossier vous
                  aide à structurer une stratégie simple : <strong>PER</strong> pour défiscaliser, <strong>Assurance Vie</strong> pour
                  la souplesse, et une allocation adaptée à votre profil.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <SecondaryButton href="tel:0188812108">Parler à un conseiller : 06 01 02 03 04</SecondaryButton>
                  <PrimaryButton onClick={() => setOpen(true)}>Demander un audit patrimonial</PrimaryButton>
                </div>

                <div className="mt-6">
                  <InlineLinks
                    items={[
                      { href: "/contact", label: "Audit patrimonial gratuit" },
                      { href: "/epargne-retraite/comparateur-retraite", label: "Comparer nos offres d’épargne" },
                      { href: "/epargne-retraite/preparer-sa-retraite", label: "Préparer sa retraite" },
                    ]}
                  />
                </div>
              </div>

              <div className="relative">
                <div className="mt-24">
                  <Image
                    src={images.hero}
                    alt="Guide épargne retraite PER assurance vie défiscalisation"
                    width={560}
                    height={440}
                    className="w-[420px] sm:w-[500px] h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 space-y-16 sm:space-y-20">
          {/* GUIDES */}
          <section>
            <SectionTitle
              id="guides"
              pill="Épargne"
              title="Guides Épargne & Retraite"
              subtitle="PER, assurance vie, défiscalisation : des explications claires, des exemples concrets."
            />

            <div className="grid md:grid-cols-2 gap-6">
              {GUIDES.map((g) => (
                <Card key={g.href} title={g.title} icon={<IconShield className="w-6 h-6" />}>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700 font-semibold">{g.category}</span>
                    <span>•</span>
                    <span>{g.readingTime}</span>
                  </div>

                  <p className="mt-3 text-slate-700 leading-relaxed">{g.excerpt}</p>

                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {g.bullets.map((x) => (
                      <li key={x} className="flex gap-2">
                        <IconCheck className="w-5 h-5 mt-0.5" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <SecondaryButton href={g.href}>{g.ctaLabel}</SecondaryButton>
                    <PrimaryButton onClick={() => setOpen(true)}>Être conseillé</PrimaryButton>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* CONTENU (aperçu structuré) */}
          <section className="max-w-4xl mx-auto">
            <SectionTitle
              id="contenu"
              pill="Dossier"
              title="Le constat : pourquoi faut-il agir dès maintenant ?"
              subtitle="Le temps est votre meilleur allié : les intérêts composés font une différence massive."
            />

            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Attendre la veille de la retraite pour épargner est l’erreur n°1 : plus vous commencez tôt, plus votre
                épargne peut capitaliser.
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <IconCheck className="w-5 h-5 mt-0.5" />
                  <span>
                    <strong>Baisse de revenus :</strong> la perte peut atteindre <strong>jusqu’à 50%</strong> pour les cadres et professions libérales.
                  </span>
                </li>
                <li className="flex gap-2">
                  <IconCheck className="w-5 h-5 mt-0.5" />
                  <span>
                    <strong>Pression fiscale :</strong> trop d’impôts aujourd’hui = moins de capital qui “travaille” pour vous.
                  </span>
                </li>
                <li className="flex gap-2">
                  <IconCheck className="w-5 h-5 mt-0.5" />
                  <span>
                    <strong>Inflation :</strong> laisser dormir sur Livret A ne suffit souvent plus pour protéger le pouvoir d’achat.
                  </span>
                </li>
              </ul>

              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <p className="font-semibold text-slate-900">Notre conseil</p>
                <p className="mt-1">
                  Diversifiez : ne mettez pas tous vos œufs dans le même panier. Combinez PER (défiscalisation) et
                  Assurance Vie (souplesse + transmission).
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <SecondaryButton href="/contact">Demander un audit patrimonial gratuit</SecondaryButton>
                  <PrimaryButton onClick={() => setOpen(true)}>Parler à un expert</PrimaryButton>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* FAQ */}
          <section>
            <SectionTitle id="faq" pill="FAQ" title="FAQ – PER, Assurance Vie & défiscalisation" />
            <div className="max-w-3xl mx-auto space-y-4">
              <FAQItem
                q="Faut-il choisir un PER ou une Assurance Vie en 2026 ?"
                a={
                  <p>
                    Si votre objectif principal est de <strong>réduire vos impôts immédiatement</strong>, le PER est souvent
                    le meilleur levier (avantage fiscal à l’entrée). Si vous voulez une <strong>épargne disponible</strong> et
                    un outil fort de <strong>transmission</strong>, l’Assurance Vie est incontournable. Dans beaucoup de cas,
                    ouvrir les deux est optimal.
                  </p>
                }
              />
              <FAQItem
                q="Comment fonctionne la déduction fiscale du PER ?"
                a={
                  <p>
                    Les versements sur PER peuvent être <strong>déduits du revenu imposable</strong> dans la limite des plafonds.
                    Exemple : 5 000€ versés, TMI 30% ⇒ environ 1 500€ d’impôt économisé.
                  </p>
                }
              />
              <FAQItem
                q="L’assurance vie est-elle bloquée ?"
                a={
                  <p>
                    Non. Les fonds restent disponibles. La fiscalité est particulièrement intéressante après <strong>8 ans</strong>,
                    avec un abattement annuel sur les gains retirés (4 600€ / 9 200€ pour un couple).
                  </p>
                }
              />
            </div>
          </section>
        </div>

        {/* MODAL */}
        {open ? (
          <div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-slate-900">Audit patrimonial / demande de devis</h3>
              <p className="text-slate-600 mt-2 text-sm">
                Branche ici ton formulaire (lead) ou ton composant de prise de rendez-vous.
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  className="text-sm font-semibold text-blue-700 hover:underline"
                  onClick={() => setOpen(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <Footer />
    </>
  );
}
