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
    title: "100% Santé : Quelles lunettes et prothèses dentaires sont vraiment gratuites en 2026 ?",
    href: "/guides-conseils/mutuelle/100-sante-lunettes-protheses-dentaires-gratuites-2026",
    category: "Mutuelle Santé",
    readingTime: "6–9 min",
    excerpt:
      "En 2026, le dispositif 100% Santé (Reste à Charge Zéro) permet d’obtenir certains équipements optiques et dentaires intégralement remboursés… à condition d’avoir un contrat responsable.",
    bullets: [
      "Optique : montures Classe A + verres (anti-reflets, amincis) = 0€.",
      "Dentaire : paniers 100% Santé / tarifs maîtrisés / tarifs libres (implants).",
      "Pour ne rien payer : devis normalisé + tiers payant + contrat responsable.",
      "Comparer votre mutuelle pour mieux couvrir les options (Classe B / dépassements).",
    ],
    ctaLabel: "Lire le guide 100% Santé 2026",
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
      name: "Guides & Conseils Mutuelle",
      itemListElement: BLOGS.map((b, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://lamutuelledefrance.fr${b.href}`,
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
                  <SecondaryButton href="tel:0188812108">Parler à un expert : 01 88 81 21 08</SecondaryButton>
                </div>

                <div className="mt-6">
                  <InlineLinks
                    items={[
                      { href: BLOGS[0].href, label: "Guide 100% Santé 2026" },
                      { href: "/comparateur-mutuelle-sante", label: "Comparer ma mutuelle santé" },
                      { href: "/mutuelle-dentaire", label: "Mutuelle Dentaire" },
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
