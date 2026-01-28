
import MutuelleOptiquePage from "@/Components/Dropdown/MutuelleOptique";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mutuelle Optique : Vos Lunettes, Lentilles & Laser Bien Remboursés",
  description: "Lunettes trop chères ? La Sécu rembourse peu. Comparez les mutuelles optiques avec forfaits renforcés : verres complexes, lentilles et chirurgie réfractive. Devis gratuit.",
  keywords: [
    "mutuelle optique",
    "remboursement lunettes",
    "mutuelle lentilles de contact",
    "remboursement chirurgie réfractive",
    "assurance lunettes",
    "mutuelle optique pas chère",
    "forfait optique",
    "100% santé optique"
  ],
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-optique",
  },
  openGraph: {
    title: "Mutuelle Optique : Réduisez votre Reste à Charge",
    description: "Besoin de nouvelles lunettes ou de lentilles ? Trouvez la mutuelle qui rembourse le mieux vos équipements optiques et l'opération laser. Comparateur gratuit.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-optique",
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
    "audience": "porteurs de lunettes, seniors, myopes, astigmates",
    "intent": "comparaison remboursement optique, devis mutuelle",
  },
};

export default function Page() {
  return <MutuelleOptiquePage />;
}