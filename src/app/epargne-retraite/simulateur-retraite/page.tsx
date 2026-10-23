import SimulateurRetraite from "@/Components/epargne-retraite/SimulateurRetraite";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Simulateur retraite : estimez votre pension",
  description:
    "Calculez votre future retraite en 2 min : pension estimée, perte de revenus et épargne nécessaire (PER) pour garder votre niveau de vie.",
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
    siteName: "La Mutuelle de France",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.lamutuelledefrance.fr/images/revenue.webp",
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
