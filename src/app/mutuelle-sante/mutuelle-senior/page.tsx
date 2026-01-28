// app/mutuelle-sante/mutuelle-senior/page.tsx
import type { Metadata } from "next";
import MutuelleSeniorPage from "@/Components/Dropdown/MutuelleSenior";

// Métadonnées SEO
export const metadata: Metadata = {
  // Titre : Cible le public (Senior/Retraité) + Les besoins coûteux (Optique, Dentaire)
  title: "Mutuelle Senior & Retraité : Comparatif Optique, Dentaire & Audio",
  
  // Description : Attaque sur l'âge (+55 ans), la promesse (-40%) et les garanties spécifiques.
  description: "Retraité ou +55 ans ? Réduisez vos cotisations santé. Comparez les mutuelles adaptées : renforts en dentaire (implants), optique et hospitalisation. Devis gratuit.",
  
  keywords: [
    "mutuelle senior",
    "mutuelle retraité",
    "assurance santé senior",
    "mutuelle 55 plus",
    "meilleure mutuelle senior",
    "remboursement appareil auditif",
    "mutuelle implants dentaires",
    "comparateur mutuelle senior"
  ],
  
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-senior",
  },
  
  openGraph: {
    title: "Mutuelle Senior : Quelle Assurance Choisir après 55 ans ?",
    description: "Ne payez plus pour des garanties inutiles (maternité). Trouvez une mutuelle ajustée à vos besoins réels : Hospitalisation, Dentaire et Auditif. Devis immédiat.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-senior",
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
    "audience": "seniors, retraités, pré-retraités, 55+, 60+, 65+",
    "intent": "comparaison assurance santé, réduction coût mutuelle, couverture senior",
  },
};

// Composant de page
export default function page() {
  return <MutuelleSeniorPage />;
}