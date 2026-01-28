"use client";

import React from "react";
import Script from "next/script";
import Image from "next/image";

import {
  SectionDivider,
  SectionTitle,
  Card,
  FAQItem,
  PrimaryButton,
  SecondaryButton,
  IconBolt,
  IconShield,
  IconCheck,
  InlineLinks,
} from "../epargne-retraite/EpargneRetraiteBase";

import NavbarA from "../Home/NavBar";
import Footer from "../Home/Footer";

type BlogCard = {
  title: string;
  href: string;
  category: string;
  readingTime: string;
  excerpt: string;
  bullets: string[];
  ctaLabel: string;
};

const images = {
  hero: "/images/guides-conseils-assurance.png", // à créer (ou remplace par une image existante)
};

const BLOGS: BlogCard[] = [
  {
    title: "Assurance Emprunteur : Comment économiser 15 000 € grâce à la Loi Lemoine ?",
    href: "/guides-conseils/assurance-emprunteur/economiser-15000-euros-loi-lemoine",
    category: "Assurance Emprunteur",
    readingTime: "6–8 min",
    excerpt:
      "Depuis la Loi Lemoine (2022), vous pouvez changer d’assurance de prêt à tout moment, sans frais, et réduire fortement le coût total du crédit.",
    bullets: [
      "Résiliation à tout moment (sans date anniversaire).",
      "Questionnaire de santé supprimé sous conditions.",
      "Mode d’emploi simple en 3 étapes (comparaison, équivalence, envoi banque).",
    ],
    ctaLabel: "Lire le guide Loi Lemoine",
  },
  {
    title: "Assurance Auto & Habitation : Jeune Conducteur, Malus, Sinistres… être bien protégé sans se ruiner",
    href: "/guides-conseils/assurance-auto-habitation/guide-complet",
    category: "Auto & Habitation",
    readingTime: "7–10 min",
    excerpt:
      "Surprime jeune conducteur, malus/résiliation, Loi Hamon, et gestion des dégâts des eaux : les leviers concrets pour payer moins et éviter les pièges.",
    bullets: [
      "Réduire la surprime : AAC, conducteur secondaire, véhicule modeste.",
      "Solutions malussés/résilies : courtier spécialisé, transparence AGIRA.",
      "Loi Hamon : changement gratuit après 1 an + délégation de résiliation.",
    ],
    ctaLabel: "Lire le guide Auto & Habitation",
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
      name: "Guides & Conseils Assurance",
      itemListElement: BLOGS.map((b, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://lamutuelledefrance.fr${b.href}`,
        name: b.title,
      })),
    },
  ],
};

export default function GuidesConseilsAssurance() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Script
        id="jsonld-guides-conseils-assurance"
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
                  Guides & Conseils Assurance : Payez Moins, Soyez Mieux Couvert
                </h1>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-4">
                  Des articles pratiques (Loi Lemoine, Loi Hamon, malus, sinistres…) pour optimiser vos contrats
                  et éviter les mauvaises surprises au moment d’un sinistre.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <SecondaryButton href="tel:0188812108">Parler à un expert : 01 88 81 21 08</SecondaryButton>
                </div>

                <div className="mt-6">
                  <InlineLinks
                    items={[
                      { href: BLOGS[0].href, label: "Assurance Emprunteur (Loi Lemoine)" },
                      { href: BLOGS[1].href, label: "Auto & Habitation (Loi Hamon)" },
                      { href: "/comparateur-assurance", label: "Comparer mes assurances" },
                    ]}
                  />
                </div>
              </div>

              <div className="relative">
                <div className="mt-24">
                  <Image
                    src={images.hero}
                    alt="Guides & conseils assurance"
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
          {/* SECTION : BLOGS */}
          <section>
            <SectionTitle
              id="blogs"
              pill="Guides"
              title="Nos derniers blogs & conseils"
              subtitle="Deux guides complets pour optimiser vos contrats et gagner en pouvoir d’achat."
            />

            <div className="grid md:grid-cols-2 gap-6">
              {BLOGS.map((b) => (
                <Card key={b.href} title={b.title} icon={<IconShield className="w-6 h-6" />}>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700 font-semibold">{b.category}</span>
                    <span>•</span>
                    <span>{b.readingTime}</span>
                  </div>

                  <p className="mt-3 text-slate-700 leading-relaxed">{b.excerpt}</p>

                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {b.bullets.map((x) => (
                      <li key={x} className="flex gap-2">
                        <IconCheck className="w-5 h-5 mt-0.5" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <SecondaryButton href={b.href}>{b.ctaLabel}</SecondaryButton>
                    <PrimaryButton onClick={() => setOpen(true)}>Être conseillé</PrimaryButton>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* SECTION : POURQUOI */}
          {/*<section>
            <SectionTitle
              id="pourquoi"
              pill="Conseils"
              title="Pourquoi ces guides font la différence"
              subtitle="Objectif : réduire la facture et sécuriser l’indemnisation (prêt, auto, habitation)."
            />
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Économies immédiates" icon={<IconBolt className="w-6 h-6" />}>
                <p>
                  Changer au bon moment (Lemoine/Hamon) et comparer des garanties équivalentes peut réduire drastiquement
                  votre coût annuel.
                </p>
              </Card>
              <Card title="Moins de risques en sinistre" icon={<IconShield className="w-6 h-6" />}>
                <p>
                  Comprendre exclusions, franchises, et procédures (dégât des eaux, expertise) évite les mauvaises surprises.
                </p>
              </Card>
              <Card title="Décisions plus simples" icon={<IconCheck className="w-6 h-6" />}>
                <p>
                  Des checklists concrètes (jeune conducteur, malus/résiliation, équivalence de garanties) pour choisir vite et bien.
                </p>
              </Card>
            </div>
          </section>*/}

          <SectionDivider />

          {/* SECTION : FAQ */}
          <section>
            <SectionTitle id="faq" pill="FAQ" title="FAQ – Guides Assurance" />
            <div className="max-w-3xl mx-auto space-y-4">
              <FAQItem
                q="Puis-je changer d’assurance emprunteur quand je veux ?"
                a={
                  <p>
                    Oui : avec la Loi Lemoine, la résiliation est possible à tout moment. La banque doit répondre dans un délai encadré si l’équivalence de garanties est respectée.
                  </p>
                }
              />
              <FAQItem
                q="La Loi Hamon s’applique à l’auto et à l’habitation ?"
                a={
                  <p>
                    Oui : après 1 an d’ancienneté, vous pouvez changer sans pénalité. En pratique, le nouvel assureur gère la résiliation pour vous.
                  </p>
                }
              />
              <FAQItem
                q="Je suis malussé / résilié : ai-je encore des solutions ?"
                a={
                  <p>
                    Oui : des compagnies acceptent les profils “à risque”, souvent via un courtier. Le plus important : ne pas faire de fausse déclaration.
                  </p>
                }
              />
            </div>
          </section>
        </div>

        {/* MODAL */}
        {open ? (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-slate-900">Conseil personnalisé</h3>
              <p className="text-slate-600 mt-2 text-sm">
                Branche ici ton formulaire (lead) ou ton flow de prise de RDV.
              </p>
              <div className="mt-6 flex justify-end">
                <button className="text-sm font-semibold text-blue-700 hover:underline" onClick={() => setOpen(false)}>
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
