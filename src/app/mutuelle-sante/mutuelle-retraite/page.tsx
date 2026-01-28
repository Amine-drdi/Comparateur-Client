// app/mutuelle-sante/mutuelle-retraite/page.tsx

import MutuelleRetraitePage from "@/Components/Dropdown/MutuelleRetraite";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mutuelle Retraité : Comparatif Gratuit & Guide Loi Evin",
  description: "Départ à la retraite ? Ne payez pas trop cher votre Loi Evin. Comparez les mutuelles spéciales retraités : renforts en auditif, dentaire et hospitalisation. Devis immédiat.",
  keywords: [
    "mutuelle retraité",
    "assurance santé retraite",
    "loi evin mutuelle",
    "mutuelle senior retraité",
    "prix mutuelle 60 ans",
    "meilleure mutuelle retraité",
    "comparateur mutuelle senior",
    "remboursement appareil auditif"
  ],
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-retraite",
  },
  openGraph: {
    title: "Mutuelle Retraité : Protégez votre Santé et votre Budget",
    description: "Vos besoins changent à la retraite. Trouvez une couverture renforcée (Auditif, Hospitalisation) à un prix juste. Comparez les offres dédiées aux retraités.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-retraite",
    siteName: "La Mutuelle De France",
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
    "audience": "retraités, pré-retraités, seniors actifs, personnes 60+",
    "intent": "comparaison assurance, information loi evin, devis santé",
  },
};

export default function Page() {
  return <MutuelleRetraitePage />;
}