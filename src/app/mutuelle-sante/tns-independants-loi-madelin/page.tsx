import MutuelleTnsIndependants from "@/Components/Dropdown/MutuelleTnsIndependants";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Mutuelle TNS et Indépendants : Comparatif Loi Madelin",
  description:
    "Comparez les complémentaires santé pour travailleurs indépendants et découvrez les informations sur la loi Madelin.",
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
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/tns-independants-loi-madelin",
    siteName: "La Mutuelle de France",
    images: [
      {
        url: "https://www.lamutuelledefrance.fr/images/tns-assistance-pro.jpeg",
        alt: "Accompagnement des travailleurs indépendants",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/tns-independants-loi-madelin",
  },
};

export default function Page() {
  return <MutuelleTnsIndependants />;
}
