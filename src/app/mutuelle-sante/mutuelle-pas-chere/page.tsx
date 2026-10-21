// app/mutuelle-sante/mutuelle-pas-chere/page.tsx
import type { Metadata } from "next";

import MutuellePasCherePage from "@/Components/Dropdown/MutuellePasChere";

export const metadata: Metadata = {
  title: "Mutuelle pas chère : comparez le meilleur tarif santé | La Mutuelle de France",
  description:
    "Trouvez une mutuelle santé pas chère tout en gardant une bonne couverture. Comparez les garanties, les tarifs et les offres adaptées à votre budget. Devis gratuit.",
  keywords: [
    "mutuelle pas chère",
    "meilleure mutuelle pas chère",
    "prix mutuelle santé",
    "mutuelle santé pas chère",
    "comparateur mutuelle santé",
    "mutuelle senior pas chère",
    "mutuelle famille pas chère",
    "mutuelle en ligne",
    "devis mutuelle gratuit",
    "mutuelle santé économique",
  ],
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-pas-chere",
  },
  openGraph: {
    title: "Mutuelle pas chère : comparez le meilleur tarif santé",
    description:
      "Besoin d’économiser sur votre mutuelle santé ? Trouvez une offre adaptée à votre budget et à vos garanties. Comparateur gratuit et sans engagement.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-pas-chere",
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
    audience: "budget serré, étudiants, seniors, familles économes",
    intent: "économie, comparaison prix, couverture essentielle",
  },
};

export default function Page() {
  return <MutuellePasCherePage />;
}
