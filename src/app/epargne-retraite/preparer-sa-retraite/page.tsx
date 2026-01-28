import PreparerSaRetraite from "@/Components/epargne-retraite/PreparerSaRetraite";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Préparer sa Retraite : Guide Complet & Bilan Gratuit | Devis Mutuelle",
  description:
    "Comment anticiper la baisse de revenus ? Découvrez nos solutions pour préparer votre retraite : PER, Assurance Vie, Bilan Patrimonial. Audit gratuit par nos experts.",
  keywords: [
    "préparer sa retraite",
    "épargne retraite",
    "bilan retraite gratuit",
    "combien épargner pour la retraite",
    "PER ou assurance vie",
    "retraite à 40 ans",
    "calcul retraite",
    "complément de revenus retraite",
  ],
  openGraph: {
    title: "Préparer sa Retraite : Anticipez pour mieux vivre",
    description:
      "Le système par répartition ne suffira pas. Construisez votre capital dès aujourd'hui avec nos solutions défiscalisantes. Simulation gratuite.",
    url: "https://www.lamutuelledefrance.fr/epargne-retraite/preparer-sa-retraite",
    siteName: "Devis Mutuelle",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.lamutuelledefrance.fr/images/og-preparer-retraite.jpg",
        width: 1200,
        height: 630,
        alt: "Préparer sa Retraite Devis Mutuelle",
      },
    ],
  },
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/epargne-retraite/preparer-sa-retraite",
  },
};

export default function Page() {
  return <PreparerSaRetraite />;
}
