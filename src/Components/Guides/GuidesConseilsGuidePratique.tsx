"use client";

import React from "react";
import Script from "next/script";
import Image from "next/image";

import NavbarA from "../Home/NavBar";
import Footer from "../Home/Footer";

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
    title: "Comment utiliser notre comparateur de mutuelle santé pour économiser en 3 minutes ?",
    href: "/guides-conseils/guides-pratiques/comment-utiliser-comparateur-mutuelle-sante",
    category: "Guide Pratique",
    readingTime: "4–7 min",
    excerpt:
      "Un pas-à-pas ultra simple : remplissez vos critères, définissez vos besoins, comparez les résultats au-delà du prix, puis finalisez en ligne ou avec un expert.",
    bullets: [
      "Étape 1 : âge, code postal, régime social — la précision compte.",
      "Étape 2 : ajustez optique / dentaire / hospitalisation selon vos besoins réels.",
      "Étape 3 : vérifiez taux de remboursement, 100% Santé, délais de carence.",
      "Étape 4 : devis par email ou rappel gratuit par un conseiller.",
    ],
    ctaLabel: "Lire le tuto comparateur",
  },
  {
    title: "Comment résilier votre mutuelle AXA en 2026 ? Procédure, adresse et modèle de lettre",
    href: "/guides-conseils/guides-pratiques/comment-resilier-contrat-mutuelle-axa",
    category: "Résiliation",
    readingTime: "6–9 min",
    excerpt:
      "Résiliation infra-annuelle après 1 an, motifs légitimes avant 1 an, méthodes d’envoi, adresse, et lettre type prête à copier-coller.",
    bullets: [
      "Après 12 mois : résiliation à tout moment, sans frais (infra-annuelle).",
      "Avant 1 an : uniquement avec motifs légitimes (déménagement, mutuelle entreprise…).",
      "3 méthodes : via le nouvel assureur (recommandé), LRAR, ou espace client.",
      "Modèle de lettre + conseils pour éviter une coupure de couverture.",
    ],
    ctaLabel: "Lire le guide AXA",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lamutuelledefrance.fr/#organization",
      name: "Devis Mutuelle",
      url: "https://lamutuelledefrance.fr",
      logo: {
        "@type": "ImageObject",
        url: "https://lamutuelledefrance.fr/logo.png",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+33-1-88-81-21-08",
        contactType: "sales",
        areaServed: "FR",
        availableLanguage: ["fr"],
      },
    },
    {
      "@type": "ItemList",
      name: "Guides Pratiques Devis Mutuelle",
      itemListElement: GUIDES.map((g, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://lamutuelledefrance.fr${g.href}`,
        name: g.title,
      })),
    },
  ],
};

export default function GuidesConseilsGuidePratique() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Script
        id="jsonld-guides-pratiques"
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
                  Guides Pratiques : comparateur, démarches & résiliation mutuelle
                </h1>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-4">
                  Des guides concrets pour aller vite : utiliser le comparateur correctement, comprendre les résultats,
                  et gérer vos démarches (résiliation, transition, éviter les erreurs).
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <SecondaryButton href="tel:0188812108">Parler à un expert : 01 88 81 21 08</SecondaryButton>
                  <PrimaryButton onClick={() => setOpen(true)}>Être rappelé</PrimaryButton>
                </div>

                <div className="mt-6">
                  <InlineLinks
                    items={[
                      { href: "/comparateur-mutuelle-sante", label: "Lancer le comparateur" },
                      { href: GUIDES[0].href, label: "Tuto comparateur" },
                      { href: GUIDES[1].href, label: "Comment résilier un contrat mutuelle AXA" },
                    ]}
                  />
                </div>
              </div>

              <div className="relative">
                <div className="mt-24">
                  <Image
                    src={images.hero}
                    alt="Guides pratiques mutuelle"
                    width={520}
                    height={420}
                    className="w-[420px] sm:w-[480px] h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 space-y-16 sm:space-y-20">
          {/* SECTION : GUIDES */}
          <section>
            <SectionTitle
              id="guides"
              pill="Pratique"
              title="Nos guides pratiques"
              subtitle="Tutoriels pas-à-pas, modèles, procédures et bonnes pratiques."
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

          {/* SECTION : FAQ */}
          <section>
            <SectionTitle id="faq" pill="FAQ" title="FAQ – Guides pratiques" />
            <div className="max-w-3xl mx-auto space-y-4">
              <FAQItem
                q="En combien de temps puis-je comparer une mutuelle sur lamutuelledefrance.fr ?"
                a={
                  <p>
                    Le formulaire peut être complété en quelques minutes si vous connaissez votre âge, code postal et
                    régime social, puis vos besoins (optique, dentaire, hospitalisation).
                  </p>
                }
              />
              <FAQItem
                q="Dois-je regarder uniquement le prix mensuel ?"
                a={
                  <p>
                    Non : comparez aussi les taux de remboursement, la présence du dispositif 100% Santé et les délais
                    de carence pour éviter les mauvaises surprises.
                  </p>
                }
              />
              <FAQItem
                q="Quelle est la méthode la plus simple pour résilier AXA ?"
                a={
                  <p>
                    La plus simple est souvent de laisser le nouvel assureur gérer la résiliation pour éviter une
                    coupure de couverture. Sinon, le recommandé LRAR reste la preuve la plus solide.
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
              <h3 className="text-lg font-bold text-slate-900">Demande de rappel</h3>
              <p className="text-slate-600 mt-2 text-sm">
                Branche ici ton formulaire (lead) ou ton composant de rappel / souscription.
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
