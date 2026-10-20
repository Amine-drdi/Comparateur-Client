import ConseilsAvantagesFiscaux from "@/Components/epargne-retraite/ComparateurRetraite";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conseils Fiscaux : PER et Avantages de l’Épargne Retraite",
  description:
    "Comment payer moins d'impôts ? Découvrez nos conseils en défiscalisation : PER, Assurance Vie, Loi Madelin. Audit fiscal et patrimonial gratuit par nos experts.",
  keywords: [
    "conseils fiscaux",
    "rédudduire impôts",
    "défiscalisation PER",
    "avantage fiscal assurance vie",
    "loi madelin fiscalité",
    "optimisation fiscale particuliers",
    "tranche marginale imposition TMI",
    "audit patrimonial gratuit",
  ],
  openGraph: {
    title: "Conseils Fiscaux : Transformez vos Impôts en Épargne",
    description:
      "Ne donnez pas tout au fisc. Utilisez les dispositifs légaux (PER, Assurance Vie) pour préparer votre avenir. Simulation d'économie d'impôt gratuite.",
    url: "https://www.lamutuelledefrance.fr/epargne-retraite/conseils-avantages-fiscaux",
    siteName: "La Mutuelle de France",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.lamutuelledefrance.fr/images/conseils-fiscaux.jpg",
        alt: "Conseils et Avantages Fiscaux Devis Mutuelle",
      },
    ],
  },
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/epargne-retraite/conseils-avantages-fiscaux",
  },
};

export default function Page() {
  return <ConseilsAvantagesFiscaux />;
}
