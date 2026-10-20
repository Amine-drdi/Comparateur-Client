// app/mutuelle-sante/resiliation-mutuelle/page.tsx
import ResiliationMutuellePage from "@/Components/Dropdown/ResiliationMutuellePage";
import type { Metadata } from "next";

// Metadata SEO (identique à celle du document Word)
export const metadata: Metadata = {
  // Titre : Promesse de facilité ("Sans Frais") + Aimant à clic ("Modèle" ou "Loi")
  title: "Résiliation Mutuelle Santé : Comment Résilier Sans Frais ? (Loi Infra-annuelle)",
  
  // Description : Explique la règle des "1 an", rassure sur la gratuité et propose la solution (comparer/changer).
  description: "Vous souhaitez changer d'assurance ? Résiliez votre mutuelle santé à tout moment après 1 an. Démarches gratuites, sans pénalité et sans coupure de droits. Comparateur inclus.",
  
  keywords: [
    "résiliation mutuelle santé",
    "résilier mutuelle",
    "lettre de résiliation mutuelle",
    "résiliation infra-annuelle",
    "changer de mutuelle en cours d'année",
    "modèle lettre résiliation assurance santé",
    "résiliation mutuelle sans frais"
  ],
  
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/resiliation-mutuelle",
  },
  
  openGraph: {
    title: "Résilier sa Mutuelle : C'est enfin simple et gratuit !",
    description: "Trop cher ? Mal remboursé ? Changez de mutuelle à tout moment après 1 an. On vous explique comment faire étape par étape. Zéro frais.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/resiliation-mutuelle",
    siteName: "La Mutuelle de France",
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
    "audience": "assurés insatisfaits, personnes qui déménagent, retraités",
    "intent": "information résiliation, téléchargement lettre type, changement assurance",
  },
};

export default function ResiliationPage() {
  return <ResiliationMutuellePage />;
}