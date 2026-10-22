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
  // Tu peux créer une image dédiée, sinon remplace par une image existante.
  hero: "/images/guides-conseils-assurance.png",
};

const BLOGS: BlogCard[] = [
  {
    title: "100 % Santé : comprendre les paniers optique, dentaire et audio",
    href: "/guides-conseils/mutuelle/100-sante-optique-dentaire-audio",
    category: "Mutuelle Santé",
    readingTime: "6 min",
    excerpt:
      "Comprenez les équipements concernés par le 100 % Santé, les conditions de prise en charge et les points à vérifier avant de choisir vos lunettes, prothèses dentaires ou aides auditives.",
    bullets: [
      "Les équipements concernés et les conditions de prise en charge.",
      "La différence entre un équipement du panier et une option hors panier.",
      "Les garanties à examiner dans votre contrat complémentaire santé.",
    ],
    ctaLabel: "Lire le guide 100 % Santé",
  },
  {
    title: "Quelle mutuelle dentaire choisir pour ses soins ?",
    href: "/guides-conseils/mutuelle/mutuelle-dentaire-choisir",
    category: "Dentaire",
    readingTime: "5 min",
    excerpt:
      "Comparez les remboursements des soins courants, prothèses et orthodontie, ainsi que les plafonds et conditions du contrat.",
    bullets: [
      "Distinguer les garanties selon le type de soin.",
      "Lire les plafonds et les délais de carence.",
      "Comparer le devis du praticien avec le tableau de garanties.",
    ],
    ctaLabel: "Choisir une mutuelle dentaire",
  },
  {
    title: "Quelle mutuelle optique rembourse le mieux les lunettes ?",
    href: "/guides-conseils/mutuelle/mutuelle-optique-remboursement",
    category: "Optique",
    readingTime: "5 min",
    excerpt:
      "Forfaits lunettes, lentilles, renouvellement et 100 % Santé : les éléments à vérifier pour comparer les contrats.",
    bullets: [
      "Comparer les forfaits avec un devis opticien.",
      "Vérifier les fréquences et plafonds de remboursement.",
      "Comprendre les équipements inclus dans le panier 100 % Santé.",
    ],
    ctaLabel: "Comparer les garanties optiques",
  },
  {
    title: "Quelle mutuelle santé choisir quand on est senior ?",
    href: "/guides-conseils/mutuelle/mutuelle-senior-comment-choisir",
    category: "Senior & retraite",
    readingTime: "6 min",
    excerpt:
      "Priorisez vos besoins en hospitalisation, optique, dentaire et audition, puis comparez plafonds, conditions et coût.",
    bullets: [
      "Évaluer les dépenses de santé prévisibles.",
      "Comparer les garanties sans se limiter au tarif.",
      "Examiner les options lors du départ à la retraite.",
    ],
    ctaLabel: "Lire le guide mutuelle senior",
  },
  {
    title: "Comment trouver une mutuelle famille adaptée à son budget ?",
    href: "/guides-conseils/mutuelle/mutuelle-famille-pas-chere",
    category: "Famille",
    readingTime: "5 min",
    excerpt:
      "Comparez les garanties et le coût total pour les besoins des parents et des enfants, dont l’optique, le dentaire et l’orthodontie.",
    bullets: [
      "Évaluer séparément les besoins de chaque assuré.",
      "Contrôler plafonds, orthodontie et conditions d’affiliation.",
      "Comparer le coût annuel au reste à charge attendu.",
    ],
    ctaLabel: "Lire le guide mutuelle famille",
  },
  {
    title: "Quelle mutuelle choisir quand on est indépendant ou TNS ?",
    href: "/guides-conseils/mutuelle/mutuelle-independant-tns",
    category: "Indépendants",
    readingTime: "5 min",
    excerpt:
      "Les critères de garanties, de budget et de couverture familiale, ainsi que les points fiscaux à vérifier pour le dispositif Madelin.",
    bullets: [
      "Comparer la couverture avec vos dépenses de santé.",
      "Distinguer complémentaire santé et prévoyance.",
      "Faire vérifier les conditions fiscales selon votre statut.",
    ],
    ctaLabel: "Lire le guide mutuelle TNS",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.lamutuelledefrance.fr/#organization",
      name: "La Mutuelle de France",
      url: "https://www.lamutuelledefrance.fr",
    },
    {
      "@type": "ItemList",
      name: "Guides & Conseils Mutuelle",
      itemListElement: BLOGS.map((b, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://www.lamutuelledefrance.fr${b.href}`,
        name: b.title,
      })),
    },
  ],
};

export default function GuidesConeilsMutuelle() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Script
        id="jsonld-guides-conseils-mutuelle"
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
                  Guides & Conseils Mutuelle : 100% Santé, remboursements et reste à charge
                </h1>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-4">
                  Comprenez concrètement ce qui est vraiment gratuit en 2026 (optique & dentaire), comment éviter les
                  mauvaises surprises, et quand comparer votre contrat pour optimiser vos garanties.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <SecondaryButton href="tel:0188812108">Parler à un expert : 06 09 99 98 02</SecondaryButton>
                </div>

                <div className="mt-6">
                  <InlineLinks
                    items={[
                      { href: BLOGS[0].href, label: "Guide 100% Santé 2026" },
                      { href: "/comparateur-mutuelle-sante", label: "Comparer ma mutuelle santé" },
                      { href: "/mutuelle-sante/mutuelle-dentaire", label: "Mutuelle Dentaire" },
                    ]}
                  />
                </div>
              </div>

              <div className="relative">
                <div className="mt-24">
                  <Image
                    src={images.hero}
                    alt="Guides & conseils mutuelle"
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
              title="Nos guides Mutuelle Santé"
              subtitle="Des explications claires et actionnables pour réduire votre reste à charge."
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

          {/* SECTION : FAQ */}
          <section>
            <SectionTitle id="faq" pill="FAQ" title="FAQ – Mutuelle & 100% Santé" />
            <div className="max-w-3xl mx-auto space-y-4">
              <FAQItem
                q="Quelles lunettes sont 100% remboursées en 2026 ?"
                a={
                  <p>
                    Les équipements optiques du <strong>Panier A (Classe A)</strong> sont intégralement remboursés :
                    montures sélectionnées et verres correcteurs avec traitements inclus (anti-reflets, durcissement,
                    amincissement selon les règles du dispositif).
                  </p>
                }
              />
              <FAQItem
                q="Qui a droit au 100% Santé dentaire ?"
                a={
                  <p>
                    Toute personne disposant d’une <strong>mutuelle responsable</strong> peut accéder aux prothèses
                    éligibles au reste à charge zéro (selon le panier de soins). Sans contrat responsable, le “0€” n’est
                    généralement pas activé.
                  </p>
                }
              />
              <FAQItem
                q="Comment être sûr de ne rien payer (reste à charge zéro) ?"
                a={
                  <p>
                    Demandez le <strong>devis normalisé</strong> au professionnel, vérifiez que votre contrat est bien
                    responsable, puis utilisez le <strong>tiers payant</strong> (la complémentaire règle directement le
                    praticien quand c’est possible).
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
