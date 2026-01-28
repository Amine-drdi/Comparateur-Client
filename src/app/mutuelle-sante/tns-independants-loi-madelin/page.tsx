import MutuelleTnsIndependants from "@/Components/Dropdown/MutuelleTnsIndependants";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Mutuelle TNS & Indépendants 2026 : Comparatif Loi Madelin",
  description:
    "Comparateur de Mutuelle TNS pour artisans et libéraux. Profitez de la Loi Madelin pour déduire vos cotisations de vos impôts. Devis gratuit sur DevisMutuelle.fr.",
  keywords: [
    "Mutuelle TNS",
    "Assurance santé indépendant",
    "Loi Madelin",
    "Mutuelle artisan",
    "Comparateur mutuelle pro",
    "Déduction fiscale santé",
  ],
  openGraph: {
    title: "Mutuelle TNS : Moins d'impôts, meilleure santé !",
    description:
      "Artisans, Libéraux : Découvrez comment la Loi Madelin finance votre couverture santé. Comparez les offres 2026.",
    url: "https://devismutuelle.fr/mutuelle/tns-independants-loi-madelin",
    siteName: "Devis Mutuelle",
    images: [
      {
        url: "https://devismutuelle.fr/images/mutuelle-tns-madelin.jpg",
        width: 1200,
        height: 630,
        alt: "Artisan indépendant souriant sur son lieu de travail",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://devismutuelle.fr/mutuelle/tns-independants-loi-madelin",
  },
};

export default function Page() {
  return <MutuelleTnsIndependants />;
}
