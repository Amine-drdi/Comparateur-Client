
import MutuelleHospitalisationPage from "@/Components/Dropdown/MutuelleHospitalisation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mutuelle Hospitalisation : Votre Séjour 100% Remboursé (Devis)",
  description: "Anticipez les coups durs à moindre coût. Comparez les mutuelles hospitalisation seule : prise en charge chirurgie, anesthésie et chambre particulière. Devis gratuit.",
  keywords: [
    "mutuelle hospitalisation",
    "assurance hospitalisation seule",
    "mutuelle chirurgie",
    "remboursement chambre particulière",
    "forfait journalier hospitalier",
    "mutuelle coup dur",
    "assurance santé économique",
    "dépassements d'honoraires chirurgien"
  ],
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-hospitalisation",
  },
  openGraph: {
    title: "Mutuelle Hospitalisation : Couvrez l'Essentiel à Petit Prix",
    description: "Pourquoi payer pour l'inutile ? Optez pour une couverture ciblée sur l'hospitalisation (Frais de séjour, Chirurgie, Chambre privée). Idéal pour réduire votre budget.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-hospitalisation",
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
    "audience": "seniors, indépendants, petits budgets, personnes hospitalisées",
    "intent": "comparaison assurance hospitalisation, devis chirurgie, économie santé",
  },
};

export default function Page() {
  return <MutuelleHospitalisationPage />;
}