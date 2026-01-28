// app/mutuelle-sante/mutuelle-pas-chere/page.tsx
import type { Metadata } from "next";

import MutuellePasCherePage from "@/Components/Dropdown/MutuellePasChere";

// Métadonnées SEO
export const metadata: Metadata = {
  // Titre : Promesse principale (Pas Chère) + Argument rassurant (100% Santé / Protection)
  title: "Mutuelle Pas Chère : Devis Gratuit & 100% Santé Inclus",
  
  // Description : Attaque sur le budget, mentionne les cibles (Seniors/Familles) et l'action (Comparer).
  description: "Assurez-vous à petit prix sans sacrifier l'essentiel. Comparez les mutuelles pas chères : couverture hospitalisation, optique et dentaire 100% Santé. Devis immédiat.",
  
  keywords: [
    "mutuelle pas chère",
    "assurance santé économique",
    "mutuelle senior pas chère",
    "complémentaire santé petit budget",
    "mutuelle hospitalisation seule",
    "100% santé mutuelle",
    "comparateur mutuelle moins chère"
  ],
  
  alternates: {
    // Note : URL normalisée (minuscules, sans accents) pour le SEO technique
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-pas-chere",
  },
  
  openGraph: {
    title: "Mutuelle Pas Chère : Réduisez vos Cotisations Immédiatement",
    description: "Besoin d'économies ? Trouvez une mutuelle ajustée à vos besoins réels. Zéro superflu, juste l'essentiel pour être bien protégé. Comparateur gratuit.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-pas-chere",
    siteName: "Devis Mutuelle",
    locale: "fr_FR",
    type: "website",
  },
  
  robots: {
    index: true,
    follow: true,
  },
  
  other: {
    "geo.region": "FR",
    "geo.placename": "France",
    "audience": "budget serré, étudiants, seniors, familles économes",
    "intent": "économie, comparaison prix, couverture essentielle",
  },
};

// Composant de page
export default function Page() {
  return <MutuellePasCherePage />;
}