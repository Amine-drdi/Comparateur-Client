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
} from "./EpargneRetraiteBase";
import NavbarA from "../Home/NavBar";
import Footer from "../Home/Footer";

const images = { hero: "/images/preparer-retraite.png" }; // à créer

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      name: "Conseil en Préparation Retraite Devis Mutuelle",
      description: "Service de bilan patrimonial et de conseil en stratégie retraite (PER, Assurance Vie, Optimisation fiscale).",
      provider: {
        "@type": "Organization",
        name: "Devis Mutuelle",
        telephone: "+33-1-88-81-21-08",
        url: "https://www.lamutuelledefrance.fr",
        logo: "https://www.lamutuelledefrance.fr/logo.png",
      },
      areaServed: "FR",
      serviceType: "Retirement Planning",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", description: "Audit retraite préliminaire gratuit" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quand faut-il commencer à préparer sa retraite ?",
          acceptedAnswer: { "@type": "Answer", text: "Le plus tôt possible. Commencer à 30–40 ans lisse l’effort ; commencer à 50–55 ans reste très efficace via le PER." },
        },
        {
          "@type": "Question",
          name: "Combien vais-je perdre à la retraite ?",
          acceptedAnswer: { "@type": "Answer", text: "En moyenne 50–70% du dernier salaire pour certains salariés, mais parfois 30–40% pour cadres supérieurs ou indépendants." },
        },
        {
          "@type": "Question",
          name: "Le PER est-il la seule solution ?",
          acceptedAnswer: { "@type": "Answer", text: "Non : PER (fiscalité), Assurance Vie (disponibilité), et résidence principale sont complémentaires." },
        },
      ],
    },
  ],
};

export default function PreparerSaRetraite() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Script id="jsonld-preparer-retraite" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavbarA />

      <main className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f6ff] via-[#f0f4ff] to-[#e8f2ff]" />
          <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-700 mt-32">
                  Préparer sa Retraite : Anticipez la Baisse de Revenus et Défiscalisez dès Aujourd’hui
                </h1>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-4">
                  Avec un taux de remplacement moyen de 50% à 70%, la baisse de niveau de vie est probable sans stratégie.
                  Nous construisons une approche sur-mesure : audit des droits, PER/Assurance Vie, optimisation fiscale.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <PrimaryButton onClick={() => setOpen(true)}>Lancer mon Bilan Retraite</PrimaryButton>
                  <SecondaryButton href="tel:0188812108">Expert : 01 88 81 21 08</SecondaryButton>
                </div>

                <div className="mt-6">
                  <InlineLinks items={[{ href: "/epargne-retraite/comparateur-retraite", label: "Comparateur Retraite" }]} />
                </div>
              </div>

              <div className="relative">
                <div className="mt-24">
                  <Image src={images.hero} alt="Préparer sa retraite" width={500} height={400} className="w-96 h-auto" priority />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 space-y-16 sm:space-y-20">
          <section>
            <SectionTitle
              id="pourquoi"
              pill="Stratégie"
              title="Pourquoi est-il indispensable de préparer sa retraite soi-même ?"
              subtitle="La répartition s’essouffle. Pour maintenir votre train de vie, l’épargne individuelle est centrale."
            />
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Combler l’écart (taux de remplacement)" icon={<IconBolt className="w-6 h-6" />}>
                <p>Salarié privé : ~50–70%. Cadre/TNS : parfois 30–40%. L’épargne comble l’écart.</p>
              </Card>
              <Card title="Espérance de vie" icon={<IconShield className="w-6 h-6" />}>
                <p>Financer 20–25 ans sans revenus du travail nécessite un capital calibré et durable.</p>
              </Card>
              <Card title="Inflation" icon={<IconCheck className="w-6 h-6" />}>
                <p>L’argent inactif perd de la valeur. Investir via PER/immobilier permet de mieux la combattre.</p>
              </Card>
            </div>
          </section>

          <SectionDivider />

          <section>
            <SectionTitle id="quand" pill="Timing" title="Quand faut-il commencer à épargner ?" subtitle="Le temps est votre meilleur allié grâce aux intérêts composés." />
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="30–40 ans" icon={<IconBolt className="w-6 h-6" />}>
                <p>Effort indolore, lissage sur 30 ans, allocation plus dynamique possible.</p>
              </Card>
              <Card title="45–55 ans" icon={<IconShield className="w-6 h-6" />}>
                <p>Phase d’accélération : ouverture PER et gros versements défiscalisants (souvent période de revenus élevés).</p>
              </Card>
              <Card title="60 ans et +" icon={<IconCheck className="w-6 h-6" />}>
                <p>Sécurisation du capital (fonds euros) et préparation de la sortie (rente vs capital).</p>
              </Card>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <PrimaryButton onClick={() => setOpen(true)}>Obtenir une stratégie adaptée à mon âge</PrimaryButton>
              <SecondaryButton href="tel:0188812108">Être rappelé : 01 88 81 21 08</SecondaryButton>
            </div>
          </section>

          <SectionDivider />

          <section>
            <SectionTitle id="faq" pill="FAQ" title="FAQ – Préparation Retraite" />
            <div className="max-w-3xl mx-auto space-y-4">
              <FAQItem q="Combien épargner par mois ?" a={<p>Souvent 10% à 20% des revenus nets ; plus on commence tard, plus l’effort doit augmenter.</p>} />
              <FAQItem q="Peut-on préparer sa retraite sans payer d’impôts ?" a={<p>Oui via PER : déduction du revenu imposable ; l’efficacité dépend de votre TMI (30/41%).</p>} />
              <FAQItem q="Est-il trop tard à 55 ans ?" a={<p>Non. Il reste ~10 ans : période idéale pour maximiser PER et “gommer” une part d’IR.</p>} />
            </div>
          </section>
        </div>

        {open ? (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-slate-900">Bilan Retraite</h3>
              <p className="text-slate-600 mt-2 text-sm">Branche ici ton formulaire / prise de RDV.</p>
              <div className="mt-6 flex justify-end">
                <button className="text-sm font-semibold text-blue-700 hover:underline" onClick={() => setOpen(false)}>Fermer</button>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <Footer/>
    </>
  );
}
