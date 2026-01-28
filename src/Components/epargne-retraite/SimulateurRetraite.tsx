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

const images = {
  hero: "/images/simulateur-retraite.png", // à créer
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Simulateur Retraite Devis Mutuelle",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", description: "Utilisation gratuite" },
      description:
        "Outil en ligne permettant d'estimer le montant de la future pension de retraite et l'épargne nécessaire pour la compléter.",
    },
    {
      "@type": "FinancialService",
      name: "Service de Bilan Retraite",
      provider: { "@type": "Organization", name: "Devis Mutuelle", telephone: "+33-1-88-81-21-08", url: "https://www.lamutuelledefrance.fr" },
      serviceType: "Retirement Planning",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Comment est calculée ma retraite ?",
          acceptedAnswer: { "@type": "Answer", text: "Elle dépend de la moyenne de vos revenus, de votre durée de cotisation et de l'âge de départ." },
        },
        {
          "@type": "Question",
          name: "Qu'est-ce que le taux de remplacement ?",
          acceptedAnswer: { "@type": "Answer", text: "C'est le pourcentage de votre dernier revenu d'activité que vous conserverez à la retraite." },
        },
        {
          "@type": "Question",
          name: "Le simulateur retraite est-il gratuit ?",
          acceptedAnswer: { "@type": "Answer", text: "Oui, il est entièrement gratuit et sans engagement." },
        },
      ],
    },
  ],
};

export default function SimulateurRetraite() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Script id="jsonld-simulateur-retraite" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavbarA />

      <main className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        {/* HERO */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f6ff] via-[#f0f4ff] to-[#e8f2ff]" />
          <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-700 mt-32">
                  Simulateur Retraite Gratuit : Calculez votre Future Pension et vos Besoins
                </h1>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-4">
                  Combien toucherez-vous à la retraite ? La réforme et la complexité du système rendent les calculs difficiles.
                  Notre simulateur estime votre pension et calcule l’effort d’épargne (PER) pour maintenir votre niveau de vie.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <PrimaryButton onClick={() => setOpen(true)}>Lancer la simulation (2 min)</PrimaryButton>
                  <SecondaryButton href="tel:0188812108">Bilan par téléphone : 01 88 81 21 08</SecondaryButton>
                </div>

                <div className="mt-6">
                  <InlineLinks
                    items={[
                      { href: "/epargne-retraite/plan-epargne-retraite-per", label: "Tout savoir sur le PER" },
                      { href: "/epargne-retraite/conseils-avantages-fiscaux", label: "Conseils & Avantages Fiscaux" },
                    ]}
                  />
                </div>
              </div>

              <div className="relative">
                <div className="mt-12">
                  <Image src={images.hero} alt="Simulateur retraite"width={500} height={400} className="w-96 h-auto" priority />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 space-y-16 sm:space-y-20">
          <section>
            <SectionTitle
              id="pourquoi"
              pill="Simulation"
              title="Pourquoi utiliser notre simulateur de retraite ?"
              subtitle="Trois indicateurs essentiels pour passer de l’incertitude à un plan d’action."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title='1) Estimer votre "Choc de Revenus"' icon={<IconBolt className="w-6 h-6" />}>
                <p>Différence entre dernier salaire et première pension (taux de remplacement). Pour certains profils, la perte peut atteindre 50%.</p>
              </Card>
              <Card title="2) Calculer l’effort d’épargne nécessaire" icon={<IconShield className="w-6 h-6" />}>
                <p>Le simulateur estime la mensualité à investir (PER) pour combler l’écart entre pension attendue et objectif de revenu.</p>
              </Card>
              <Card title="3) Mesurer votre économie d’impôt" icon={<IconCheck className="w-6 h-6" />}>
                <p>Préparer sa retraite via un PER permet d’économiser immédiatement de l’impôt : l’État finance une partie de l’effort.</p>
              </Card>
            </div>
          </section>

          <SectionDivider />

          <section>
            <SectionTitle
              id="methode"
              pill="Méthode"
              title="Comment fonctionne le calcul de votre retraite ?"
              subtitle="Le simulateur et nos experts tiennent compte du statut, des trimestres, et de la situation familiale."
            />

            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Statut professionnel" icon={<IconShield className="w-6 h-6" />}>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Salariés : 25 meilleures années + points AGIRC-ARRCO</li>
                  <li>Fonctionnaires : 6 derniers mois (traitement indiciaire)</li>
                  <li>TNS : calcul par points + revenus moyens</li>
                </ul>
              </Card>
              <Card title="Durée de cotisation" icon={<IconBolt className="w-6 h-6" />}>
                <p>Simulation de l’impact d’un départ à 64 ans vs 67 ans (taux plein automatique), et des décotes en cas de trimestres manquants.</p>
              </Card>
              <Card title="Nombre d’enfants" icon={<IconCheck className="w-6 h-6" />}>
                <p>Trimestres supplémentaires et majorations de pension (ex : 10% à partir de 3 enfants).</p>
              </Card>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              {/*<PrimaryButton onClick={() => setOpen(true)}>Accéder au Formulaire de Simulation</PrimaryButton>*/}
              <SecondaryButton href="tel:0188812108">Être rappelé : 01 88 81 21 08</SecondaryButton>
            </div>
          </section>

          <SectionDivider />

          <section>
            <SectionTitle id="faq" pill="FAQ" title="FAQ – Simulation & Calcul Retraite" />
            <div className="max-w-3xl mx-auto space-y-4">
              <FAQItem
                q="À quel âge puis-je partir à la retraite ?"
                a={<p>Âge légal relevé progressivement à 64 ans ; taux plein dépend des trimestres (jusqu’à 172). À défaut, décote, sauf attente de 67 ans.</p>}
              />
              <FAQItem
                q="Le simulateur prend-il en compte l’inflation ?"
                a={<p>Une bonne projection intègre l’érosion monétaire. Nous raisonnons en “euros constants” (pouvoir d’achat réel).</p>}
              />
              <FAQItem
                q="Quelle est la fiabilité des simulateurs en ligne ?"
                a={<p>Fiables pour une estimation. Les écarts viennent souvent de carrières complexes (expatriation, polypensionnés), à affiner avec un expert.</p>}
              />
            </div>
          </section>
        </div>

        {/* Modal placeholder */}
        {open ? (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-slate-900">Simulation Retraite</h3>
              <p className="text-slate-600 mt-2 text-sm">
                Branche ici ton formulaire de simulation / composant existant.
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
