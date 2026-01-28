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
    "audience": "assurés insatisfaits, personnes qui déménagent, retraités",
    "intent": "information résiliation, téléchargement lettre type, changement assurance",
  },
};

// Données structurées JSON-LD (FAQ Schema)
export const resiliationSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Puis-je résilier ma mutuelle à tout moment ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, après un an de contrat, grâce au dispositif de résiliation infra-annuelle. Vous pouvez changer de mutuelle librement, sans frais ni pénalité."
      }
    },
    {
      "@type": "Question",
      "name": "Dois-je envoyer un courrier recommandé ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, ce n'est plus obligatoire. La résiliation peut se faire par lettre simple, email ou via l'espace client. Votre nouvel assureur peut aussi s'en charger pour vous."
      }
    },
    {
      "@type": "Question",
      "name": "La résiliation est-elle gratuite ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, totalement. Aucun frais ni pénalité ne peut être exigé si votre contrat a plus de 12 mois d'ancienneté."
      }
    }
  ]
};

// Intégration du Schema JSON-LD dans la page
export default function ResiliationPage() {
  return (
    <>
      {/* Script pour les données structurées JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resiliationSchema) }}
      />
      
      {/* Composant principal */}
      <ResiliationMutuellePage />
    </>
  );
}