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

const images = { hero: "/images/conseils-fiscaux.jpg" }; // à créer

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      name: "Conseil en Optimisation Fiscale Devis Mutuelle",
      description: "Services de conseil en gestion de patrimoine et défiscalisation (PER, Assurance Vie, Madelin).",
      provider: {
        "@type": "Organization",
        name: "Devis Mutuelle",
        telephone: "+33-1-88-81-21-08",
        url: "https://www.lamutuelledefrance.fr",
        logo: "https://www.lamutuelledefrance.fr/logo.png",
      },
      areaServed: "FR",
      serviceType: "Tax Planning",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", description: "Audit fiscal gratuit" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Comment payer moins d'impôts légalement ?",
          acceptedAnswer: { "@type": "Answer", text: "Le PER est l’un des leviers les plus efficaces : les versements sont déductibles du revenu imposable." },
        },
        {
          "@type": "Question",
          name: "Le PER entre-t-il dans le plafonnement des niches fiscales ?",
          acceptedAnswer: { "@type": "Answer", text: "Non, le PER/Madelin ne rentre pas dans le plafonnement global des niches fiscales (10 000 €)." },
        },
        {
          "@type": "Question",
          name: "Qu'est-ce que la TMI ?",
          acceptedAnswer: { "@type": "Answer", text: "La Tranche Marginale d'Imposition est le taux appliqué à la dernière tranche de vos revenus (0/11/30/41/45%)." },
        },
      ],
    },
  ],
};

export default function ConseilsAvantagesFiscaux() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Script id="jsonld-conseils-fiscaux" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavbarA />

      <main className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f6ff] via-[#f0f4ff] to-[#e8f2ff] " />
          <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-700 mt-32">
                  Conseils & Avantages Fiscaux : Transformez vos Impôts en Patrimoine
                </h1>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-4">
                  Utilisez les dispositifs légaux (PER, Assurance Vie, Madelin) pour réduire l’impôt et construire un capital.
                  Nos experts vous guident dans l’optimisation patrimoniale.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <PrimaryButton onClick={() => setOpen(true)}>Lancer mon Audit Fiscal</PrimaryButton>
                  <SecondaryButton href="tel:0188812108">Expert Fiscalité : 01 88 81 21 08</SecondaryButton>
                </div>

                <div className="mt-6">
                  <InlineLinks
                    items={[
                      { href: "/epargne-retraite/preparer-sa-retraite", label: "Préparer sa Retraite" },
                      { href: "/epargne-retraite/plan-epargne-retraite-per", label: "Tout savoir sur le PER" },
                      { href: "/assurance-vie", label: "Assurance Vie" },
                    ]}
                  />
                </div>
              </div>

              <div className="relative">
                <div className=" mt-24">
                  <Image src={images.hero} alt="Conseils fiscaux" width={500} height={400} className="w-96 h-auto" priority />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 space-y-16 sm:space-y-20">
          <section>
            <SectionTitle
              id="pourquoi"
              pill="Fiscalité"
              title="Pourquoi l’optimisation fiscale est accessible à tous ?"
              subtitle="Si vous payez l’impôt (et surtout si votre TMI est à 30% ou 41%), vous avez intérêt à activer les bons leviers."
            />
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Réduire l’IR" icon={<IconBolt className="w-6 h-6" />}>
                <p>Déduire de vos revenus imposables ce que vous épargnez pour la retraite : vous investissez au lieu de “donner”.</p>
              </Card>
              <Card title="Préparer la transmission" icon={<IconShield className="w-6 h-6" />}>
                <p>Solutions hors succession pour transmettre davantage, dans un cadre légal optimisé.</p>
              </Card>
              <Card title="Sécuriser le pouvoir d’achat" icon={<IconCheck className="w-6 h-6" />}>
                <p>Un euro d’impôt économisé peut devenir un euro investi ; sur 10–20 ans, l’effet composé change tout.</p>
              </Card>
            </div>
          </section>

          <SectionDivider />

          <section>
            <SectionTitle
              id="per"
              pill="PER"
              title="Le PER : l’arme absolue de la défiscalisation"
              subtitle="La déduction fiscale est le moteur du PER : plus votre TMI est élevée, plus l’avantage est fort."
            />
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Mécanisme de déduction" icon={<IconShield className="w-6 h-6" />}>
                <p>
                  Les versements volontaires sur un PER sont déductibles (dans la limite des plafonds).
                  Exemple : TMI 41%, versement 5 000€ → économie d’impôt 2 050€.
                </p>
              </Card>
              <Card title="TNS & Loi Madelin" icon={<IconBolt className="w-6 h-6" />}>
                <p>
                  Pour indépendants, les cotisations peuvent passer en charges pro : baisse du bénéfice imposable,
                  et effet “double lame” (impôt + charges sociales).
                </p>
              </Card>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <PrimaryButton onClick={() => setOpen(true)}>Simuler mon économie d’impôt</PrimaryButton>
              <SecondaryButton href="tel:0188812108">Parler à un Expert : 01 88 81 21 08</SecondaryButton>
            </div>
          </section>

          <SectionDivider />

          <section>
            <SectionTitle id="faq" pill="FAQ" title="FAQ – Fiscalité & Épargne" />
            <div className="max-w-3xl mx-auto space-y-4">
              <FAQItem q="Qu’est-ce que la TMI ?" a={<p>Taux appliqué à votre dernière tranche de revenus. Plus elle est élevée, plus le PER est efficace.</p>} />
              <FAQItem q="Le plafonnement des niches fiscales concerne-t-il le PER ?" a={<p>Non. Le PER/Madelin est une enveloppe de déduction spécifique hors plafond 10 000€.</p>} />
              <FAQItem q="Faut-il choisir PFU ou barème progressif ?" a={<p>Sur certains gains, vous avez le choix : PFU 30% ou barème. Nos experts arbitrent selon votre tranche.</p>} />
            </div>
          </section>
        </div>

        {open ? (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-slate-900">Audit Fiscal</h3>
              <p className="text-slate-600 mt-2 text-sm">Branche ici ton formulaire / flow d’audit fiscal.</p>
              <div className="mt-6 flex justify-end">
                <button className="text-sm font-semibold text-blue-700 hover:underline" onClick={() => setOpen(false)}>Fermer</button>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <Footer />
    </>
  );
}
