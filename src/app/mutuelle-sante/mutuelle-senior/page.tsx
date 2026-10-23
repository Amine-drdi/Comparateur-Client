// app/mutuelle-sante/mutuelle-senior/page.tsx
import type { Metadata } from "next";
import MutuelleSeniorPage from "@/Components/Dropdown/MutuelleSenior";

export const metadata: Metadata = {
  title: "Mutuelle senior : comparez les offres",
  description:
    "Trouvez la meilleure mutuelle senior pour votre budget. Comparez les garanties optique, dentaire, hospitalisation et audiologie. Devis gratuit.",
  keywords: [
    "mutuelle senior",
    "mutuelle retraité",
    "meilleure mutuelle senior",
    "mutuelle santé senior",
    "mutuelle retraite",
    "mutuelle pas chère senior",
    "mutuelle dentaire senior",
    "mutuelle optique senior",
    "comparateur mutuelle senior",
    "assurance santé senior",
  ],
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-senior",
  },
  openGraph: {
    title: "Mutuelle senior : trouvez la bonne couverture à prix juste",
    description:
      "Comparez les offres de mutuelle senior adaptées à votre âge et à vos besoins. Réduisez votre reste à charge avec une couverture plus adaptée.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-senior",
    siteName: "La Mutuelle de France",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.lamutuelledefrance.fr/images/comparateur-mutuelle.jpg",
        alt: "Comparateur de mutuelle santé",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": "FR",
    "geo.placename": "France",
    audience: "seniors, retraités, pré-retraités, 55+, 60+, 65+",
    intent: "comparaison assurance santé, réduction coût mutuelle, couverture senior",
  },
};

export default function Page() {
  return <MutuelleSeniorPage />;
}
