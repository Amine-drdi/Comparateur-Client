// app/mutuelle-sante/mutuelle-dentaire/page.tsx
import MutuelleDentairePage from "@/Components/Dropdown/MutuelleDentaire";
import type { Metadata } from "next";


// Données structurées JSON-LD
export const dentaireSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Les implants dentaires sont-ils remboursés ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non par la Sécurité sociale (0€), mais oui par les mutuelles dentaires via un forfait annuel. Les bons contrats offrent entre 400 € et 1 000 € par implant. Attention à choisir un plafond annuel élevé si vous devez en poser plusieurs."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le prix d'une mutuelle dentaire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une mutuelle avec de solides garanties dentaires coûte entre 40 € et 80 € par mois. Le prix varie selon le niveau de renfort choisi (orthodontie, implants) et le plafond annuel de remboursement (ex: 2000€/an)."
      }
    },
    {
      "@type": "Question",
      "name": "Une mutuelle dentaire est-elle suffisante seule ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Si vous cherchez une 'surcomplémentaire' pour booster votre contrat actuel, oui. Sinon, privilégiez une mutuelle 'modulable' : choisissez un niveau fort en Dentaire (Niveau 4 ou 5) et basique en Soins Courants pour maîtriser votre budget."
      }
    }
  ]
};

// Métadonnées SEO
export const metadata: Metadata = {
  // Titre : Promesse forte (Remboursement Implants) + Argument commercial (Zéro Reste à Charge)
  title: "Mutuelle Dentaire : Remboursement Implants & Couronnes (Devis)",
  
  // Description : Attaque sur le coût, solution (Zéro Reste à Charge) et rapidité (2 min).
  description: "Vos soins dentaires coûtent trop cher ? Comparez les mutuelles avec renforts Implants et Orthodontie. Objectif : Zéro Reste à Charge sur vos prothèses. Devis gratuit.",
  
  keywords: [
    "mutuelle dentaire",
    "remboursement implant dentaire",
    "mutuelle orthodontie adulte",
    "prix couronne dentaire",
    "mutuelle sans plafond dentaire",
    "assurance dentaire pas chère",
    "100% santé dentaire",
    "surcomplémentaire dentaire"
  ],
  
  alternates: {
    // URL normalisée
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-dentaire",
  },
  
  openGraph: {
    title: "Mutuelle Dentaire : Ne renoncez plus à vos soins coûteux",
    description: "Implants, Couronnes, Orthodontie... La Sécu rembourse mal. Trouvez la mutuelle qui prend en charge vos frais réels. Comparez les meilleures offres.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-dentaire",
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
    "audience": "seniors, adultes avec besoins orthodontie, personnes avec devis dentiste élevé",
    "intent": "remboursement soins coûteux, comparaison assurance, réduction reste à charge",
  },
};

// Fonction pour générer le JSON-LD
function JsonLdScript() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dentaireSchema) }}
    />
  );
}

export default function Page() {
  return (
    <>
      {/* Script JSON-LD pour les rich snippets */}
      <JsonLdScript />
      
      {/* Composant principal */}
      <MutuelleDentairePage />
    </>
  );
}