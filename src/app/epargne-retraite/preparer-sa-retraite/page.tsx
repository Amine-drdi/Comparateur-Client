import PreparerSaRetraite from "@/Components/epargne-retraite/PreparerSaRetraite";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Préparer sa retraite : guide et solutions",
  description:
    "Anticipez la baisse de revenus à la retraite : PER, assurance vie, bilan patrimonial. Solutions d’épargne et audit gratuit par nos experts.",
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
    siteName: "La Mutuelle de France",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.lamutuelledefrance.fr/images/PlanEpargneRetraite.jpg",
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
