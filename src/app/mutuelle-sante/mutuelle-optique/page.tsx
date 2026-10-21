import MutuelleOptiquePage from "@/Components/Dropdown/MutuelleOptique";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mutuelle optique : lunettes, lentilles et chirurgie laser | La Mutuelle de France",
  description:
    "Comparez les meilleures mutuelles optique pour réduire le coût de vos lunettes, lentilles et soins visuels. Trouvez la couverture la plus adaptée à votre budget.",
  keywords: [
    "mutuelle optique",
    "mutuelle optique pas chère",
    "remboursement lunettes",
    "mutuelle lentilles de contact",
    "assurance lunettes",
    "chirurgie réfractive",
    "comparateur mutuelle optique",
    "devis mutuelle gratuit",
    "mutuelle santé optique",
    "forfait optique",
  ],
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-optique",
  },
  openGraph: {
    title: "Mutuelle optique : réduisez votre reste à charge",
    description:
      "Besoin de nouvelles lunettes ou de lentilles ? Trouvez une mutuelle optique adaptée à vos besoins et à votre budget. Devis gratuit.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-optique",
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
    audience: "porteurs de lunettes, seniors, myopes, astigmates",
    intent: "comparaison remboursement optique, devis mutuelle",
  },
};

export default function Page() {
  return <MutuelleOptiquePage />;
}
