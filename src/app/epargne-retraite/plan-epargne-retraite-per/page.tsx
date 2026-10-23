import PlanEpargneRetraitePER from "@/Components/epargne-retraite/PlanEpargneRetraitePER";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan épargne retraite (PER) : comparatif",
  description:
    "Ouvrez un PER individuel et réduisez vos impôts. Comparatif des meilleurs PER : frais 0 %, gestion pilotée, déblocage anticipé possible.",
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
    siteName: "La Mutuelle de France",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.lamutuelledefrance.fr/images/PlanEpargneRetraite.jpg",
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
