import PlanEpargneRetraitePER from "@/Components/epargne-retraite/PlanEpargneRetraitePER";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Épargne Retraite (PER) : Comparatif & Simulation Fiscale | Devis Mutuelle",
  description:
    "Ouvrez un PER Individuel et réduisez vos impôts dès maintenant. Comparatif des meilleurs PER (Frais 0%, Gestion Pilotée). Déblocage anticipé possible pour résidence principale.",
  keywords: [
    "plan épargne retraite",
    "PER individuel",
    "meilleur PER",
    "PER sans frais entrée",
    "déduction fiscale PER",
    "simulateur PER",
    "transfert PERP vers PER",
    "déblocage anticipé PER",
  ],
  openGraph: {
    title: "PER : Réduisez vos Impôts et Préparez votre Retraite",
    description:
      "Transformez vos impôts en patrimoine. Nos experts comparent les PER les plus performants du marché. Simulation gratuite de votre économie fiscale.",
    url: "https://www.lamutuelledefrance.fr/epargne-retraite/plan-epargne-retraite-per",
    siteName: "Devis Mutuelle",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.lamutuelledefrance.fr/images/og-per.jpg",
        width: 1200,
        height: 630,
        alt: "Plan Épargne Retraite Devis Mutuelle",
      },
    ],
  },
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/epargne-retraite/plan-epargne-retraite-per",
  },
};

export default function Page() {
  return <PlanEpargneRetraitePER />;
}
