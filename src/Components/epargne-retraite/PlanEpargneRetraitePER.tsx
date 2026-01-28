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

const images = { hero: "/images/PlanEpargneRetraite.jpg" }; // à créer

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialProduct",
      name: "Plan Épargne Retraite (PER) Individuel",
      description: "Produit d'épargne long terme permettant la constitution d'un capital retraite avec déductibilité fiscale des versements.",
      provider: {
        "@type": "Organization",
        name: "Devis Mutuelle",
        telephone: "+33-1-88-81-21-08",
        url: "https://www.lamutuelledefrance.fr",
        logo: "https://www.lamutuelledefrance.fr/logo.png",
      },
      areaServed: "FR",
      serviceType: "Retirement Planning",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", description: "Simulation fiscale et ouverture de dossier gratuites" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quels sont les avantages fiscaux du PER ?",
          acceptedAnswer: { "@type": "Answer", text: "Les versements volontaires sont déductibles du revenu imposable, générant une économie proportionnelle à votre TMI." },
        },
        {
          "@type": "Question",
          name: "Peut-on récupérer l'argent du PER pour acheter sa maison ?",
          acceptedAnswer: { "@type": "Answer", text: "Oui, l'achat de la résidence principale est un motif légal de déblocage anticipé." },
        },
        {
          "@type": "Question",
          name: "PER assurance vs PER compte-titres ?",
          acceptedAnswer: { "@type": "Answer", text: "Le PER Assurance offre une fiscalité décès plus favorable et l'accès aux fonds en euros." },
        },
      ],
    },
  ],
};

export default function PlanEpargneRetraitePER() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Script id="jsonld-per" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <NavbarA  />

      <main className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f6ff] via-[#f0f4ff] to-[#e8f2ff]" />
          <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-700 mt-32">
                  Plan Épargne Retraite (PER) : Réduisez vos Impôts et Préparez votre Avenir
                </h1>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-4">
                  Le PER est le placement incontournable des Français imposés : vous déduisez vos versements, et l’État finance une partie de votre effort.
                  Nous sélectionnons des PER performants (frais réduits, fonds diversifiés).
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <PrimaryButton onClick={() => setOpen(true)}>Calculer mon économie d’impôt</PrimaryButton>
                  <SecondaryButton href="tel:0188812108">Expert PER : 01 88 81 21 08</SecondaryButton>
                </div>

                <div className="mt-6">
                  <InlineLinks items={[{ href: "/epargne-retraite/comparateur-retraite", label: "Comparateur Retraite" }, { href: "/assurance-vie", label: "Assurance Vie" }]} />
                </div>
              </div>

              <div className="relative">
                <div className=" mt-24">
                  <Image src={images.hero} alt="Plan épargne retraite PER" width={500} height={400} className="w-96 h-auto" priority />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 space-y-16 sm:space-y-20">
          <section>
            <SectionTitle id="fonctionnement" pill="PER" title="Le PER Individuel : Comment ça marche ?" subtitle="Déduction fiscale, gestion financière, et sortie flexible (capital/rente/mix)." />
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="1) Déduction fiscale" icon={<IconBolt className="w-6 h-6" />}>
                <p>Chaque euro versé peut être déduit (selon plafonds). Exemple : TMI 30% → 1 000€ versés = 300€ d’impôt économisé.</p>
              </Card>
              <Card title="2) Gestion financière" icon={<IconShield className="w-6 h-6" />}>
                <p>Gestion pilotée : dynamique quand on est jeune, sécurisation progressive via fonds euros à l’approche de la retraite.</p>
              </Card>
              <Card title="3) Sortie" icon={<IconCheck className="w-6 h-6" />}>
                <p>À la retraite : 100% capital, 100% rente, ou mix — selon vos objectifs.</p>
              </Card>
            </div>
          </section>

          <SectionDivider />

          <section>
            <SectionTitle id="deblocage" pill="Déblocage" title="Cas de déblocage anticipé (argent non piégé)" subtitle="Résidence principale et accidents de la vie (invalidité, chômage, liquidation...)."/>
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Résidence principale" icon={<IconShield className="w-6 h-6" />}>
                <p>Vous pouvez débloquer le PER pour financer votre logement (apport).</p>
              </Card>
              <Card title="Accidents de la vie" icon={<IconBolt className="w-6 h-6" />}>
                <p>Décès du conjoint, invalidité, surendettement, fin de droits chômage, cessation d’activité non salariée, etc.</p>
              </Card>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <PrimaryButton onClick={() => setOpen(true)}>Vérifier mon éligibilité</PrimaryButton>
              <SecondaryButton href="tel:0188812108">Conseiller : 01 88 81 21 08</SecondaryButton>
            </div>
          </section>

          <SectionDivider />

          <section>
            <SectionTitle id="faq" pill="FAQ" title="FAQ – Plan Épargne Retraite" />
            <div className="max-w-3xl mx-auto space-y-4">
              <FAQItem
                q="Quel est le plafond de versement sur un PER ?"
                a={<p>Pas de plafond de versement, mais un plafond de déductibilité. Pour TNS : plafond plus élevé (bénéfice + tranche entre 1 et 8 PASS).</p>}
              />
              <FAQItem
                q="Que se passe-t-il en cas de décès avant la retraite ?"
                a={<p>Le capital est transmis aux bénéficiaires. Avant 70 ans, la fiscalité est généralement avantageuse.</p>}
              />
              <FAQItem
                q="La sortie en capital est-elle imposable ?"
                a={<p>Si versements déduits à l’entrée : capital imposé à la sortie (TMI) + plus-values au PFU 30%. Sinon, taxation uniquement sur plus-values.</p>}
              />
            </div>
          </section>
        </div>

        {open ? (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-slate-900">Simulation PER</h3>
              <p className="text-slate-600 mt-2 text-sm">Branche ici ton simulateur d’économie d’impôt / formulaire.</p>
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
