import type { Metadata } from "next";
import ComparateurRetraite from "@/Components/epargne-retraite/ComparateurRetraite";

export const metadata: Metadata = {
  title: "Comparateur Retraite : PER et Assurance Vie",
  description:
    "Comparez les meilleures solutions d'épargne retraite (PER, Madelin). Réduisez vos impôts et préparez votre avenir. Bilan patrimonial gratuit par nos experts.",
  keywords: [
    "comparateur retraite",
    "plan épargne retraite",
    "meilleur PER",
    "comparatif PER",
    "épargne retraite TNS",
    "défiscalisation retraite",
    "simulation rente viagère",
    "transfert PERP vers PER",
  ],
  openGraph: {
    title: "Comparateur Retraite : Optimisez votre Pension et vos Impôts",
    description:
      "PER ou Assurance Vie ? Rente ou Capital ? Nos experts comparent pour vous les contrats les plus performants du marché. Audit gratuit.",
    url: "https://www.lamutuelledefrance.fr/epargne-retraite/comparateur-retraite",
    siteName: "La Mutuelle de France",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.lamutuelledefrance.fr/images/PlanEpargneRetraite.jpg",
        alt: "Comparateur Plan Épargne Retraite",
      },
    ],
  },
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/epargne-retraite/comparateur-retraite",
  },
};

export default function Page() {
  return <ComparateurRetraite />;
}
