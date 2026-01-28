import SimulateurRetraite from "@/Components/epargne-retraite/SimulateurRetraite";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Simulateur Retraite Gratuit : Calcul Pension & Épargne | Devis Mutuelle",
  description:
    "Calculez le montant de votre future retraite en 2 min. Estimez votre perte de revenus et découvrez combien épargner (PER) pour maintenir votre niveau de vie. Bilan gratuit.",
  keywords: [
    "simulateur retraite",
    "calcul retraite gratuit",
    "estimation pension retraite",
    "simulateur PER",
    "âge départ retraite",
    "taux de remplacement retraite",
    "calcul épargne retraite",
    "bilan retraite en ligne",
  ],
  openGraph: {
    title: "Simulateur Retraite : Combien toucherez-vous vraiment ?",
    description:
      "Ne restez pas dans le flou. Estimez votre pension et vos besoins d'épargne. Nos experts vous aident à combler l'écart de revenus.",
    url: "https://www.lamutuelledefrance.fr/epargne-retraite/simulateur-retraite",
    siteName: "Devis Mutuelle",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.lamutuelledefrance.fr/images/og-simulateur-retraite.jpg",
        width: 1200,
        height: 630,
        alt: "Simulateur Calcul Retraite Devis Mutuelle",
      },
    ],
  },
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/epargne-retraite/simulateur-retraite",
  },
};

export default function Page() {
  return <SimulateurRetraite />;
}
