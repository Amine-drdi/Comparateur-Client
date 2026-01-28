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

const images = { hero: "/images/og-epargne-senior.jpg" }; // à créer

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialProduct",
      name: "Solutions Épargne Senior Devis Mutuelle",
      description: "Sélection de contrats d'assurance vie et de capitalisation optimisés pour les seniors (sécurité, revenus, transmission).",
      provider: {
        "@type": "Organization",
        name: "Devis Mutuelle",
        telephone: "+33-1-88-81-21-08",
        url: "https://www.lamutuelledefrance.fr",
        logo: "https://www.lamutuelledefrance.fr/logo.png",
      },
      areaServed: "FR",
      serviceType: "Wealth Management",
      audience: { "@type": "Audience", audienceType: "Seniors" },
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", description: "Bilan patrimonial gratuit" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Peut-on ouvrir une Assurance Vie après 70 ans ?",
          acceptedAnswer: { "@type": "Answer", text: "Oui. Après 70 ans, l’abattement capital est 30 500€ mais les intérêts générés restent exonérés de droits de succession." },
        },
        {
          "@type": "Question",
          name: "L'argent est-il disponible pour payer une maison de retraite ?",
          acceptedAnswer: { "@type": "Answer", text: "Oui. Vous pouvez effectuer des rachats partiels programmés pour financer EHPAD ou soins." },
        },
        {
          "@type": "Question",
          name: "Quels sont les avantages successoraux ?",
          acceptedAnswer: { "@type": "Answer", text: "Avant 70 ans : 152 500€ d’abattement par bénéficiaire sur l’assurance vie." },
        },
      ],
    },
  ],
};

export default function EpargneSenior() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Script id="jsonld-epargne-senior" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavbarA />

      <main className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f6ff] via-[#f0f4ff] to-[#e8f2ff]" />
          <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-700 mt-24">
                  Épargne Senior : Sécurisez votre Capital et Optimisez votre Transmission
                </h1>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-4">
                  Après 50–60 ans, l’objectif est la sécurité, des revenus complémentaires et l’organisation de la succession.
                  Nous sélectionnons des solutions prudentes (fonds euros, SCPI, assurance vie).
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <PrimaryButton onClick={() => setOpen(true)}>Demander mon étude gratuite</PrimaryButton>
                  <SecondaryButton href="tel:0188812108">Parler à un Expert : 01 88 81 21 08</SecondaryButton>
                </div>

                <div className="mt-6">
                  <InlineLinks items={[{ href: "/assurance-obseques", label: "Assurance Obsèques" }]} />
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/40 bg-white/20">
                  <Image src={images.hero} alt="Épargne senior" width={1200} height={630} className="w-full h-auto" priority />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 space-y-16 sm:space-y-20">
          <section>
            <SectionTitle
              id="strategie"
              pill="Senior"
              title="Pourquoi une stratégie d’épargne spécifique pour les seniors ?"
              subtitle="Sécurité, disponibilité, et transmission : trois priorités à piloter ensemble."
            />
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Sécurité" icon={<IconShield className="w-6 h-6" />}>
                <p>Fonds euros et obligations pour limiter l’impact des krachs et préserver le capital.</p>
              </Card>
              <Card title="Revenus complémentaires" icon={<IconBolt className="w-6 h-6" />}>
                <p>Rachats programmés / rentes pour compléter la pension, souvent avec une fiscalité modérée.</p>
              </Card>
              <Card title="Transmission" icon={<IconCheck className="w-6 h-6" />}>
                <p>Assurance vie : jusqu’à 152 500€ par bénéficiaire exonérés (versements avant 70 ans).</p>
              </Card>
            </div>
          </section>

          <SectionDivider />

          <section>
            <SectionTitle
              id="placements"
              pill="Placements"
              title="Les meilleurs placements pour les seniors"
              subtitle="Assurance Vie multi-support, PER si vous êtes imposable, SCPI pour des revenus immobiliers sans gestion."
            />
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Assurance Vie (pilier)" icon={<IconShield className="w-6 h-6" />}>
                <p>Liquidité, fiscalité après 8 ans, et atouts successoraux. Outil “couteau suisse”.</p>
              </Card>
              <Card title="PER (si imposable)" icon={<IconBolt className="w-6 h-6" />}>
                <p>Utile en fin de carrière/jeune retraité avec forte imposition pour réduire l’IR.</p>
              </Card>
              <Card title="SCPI (pierre-papier)" icon={<IconCheck className="w-6 h-6" />}>
                <p>Revenus locatifs réguliers sans gestion : complément de pension pertinent.</p>
              </Card>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <PrimaryButton onClick={() => setOpen(true)}>Comparer ces solutions</PrimaryButton>
              <SecondaryButton href="tel:0188812108">Conseiller : 01 88 81 21 08</SecondaryButton>
            </div>
          </section>

          <SectionDivider />

          <section>
            <SectionTitle id="faq" pill="FAQ" title="FAQ – Épargne Senior & Succession" />
            <div className="max-w-3xl mx-auto space-y-4">
              <FAQItem q="Assurance vie après 70 ans ?" a={<p>Oui. Abattement capital 30 500€ (partagé), intérêts exonérés de droits de succession.</p>} />
              <FAQItem q="L’argent est-il bloqué en maison de retraite ?" a={<p>Non. Vous pouvez retirer via rachats partiels (ponctuels ou programmés).</p>} />
              <FAQItem q="Rente viagère ou capital ?" a={<p>La rente sécurise à vie mais “aliène” le capital ; le capital protège la famille via transmission.</p>} />
            </div>
          </section>
        </div>

        {open ? (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-slate-900">Étude Patrimoniale Senior</h3>
              <p className="text-slate-600 mt-2 text-sm">Branche ici ton formulaire / prise de contact.</p>
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
