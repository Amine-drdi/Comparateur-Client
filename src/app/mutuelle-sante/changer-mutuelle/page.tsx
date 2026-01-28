// app/mutuelle-sante/changer-mutuelle/page.tsx
import ChangerMutuellePage from "@/Components/Dropdown/ChangerMutuelle";
import type { Metadata } from "next";


// Métadonnées SEO
export const metadata: Metadata = {
  // Titre : Combine l'action (Changer), l'outil (Comparatif) et le service à forte demande (Modèle Lettre)
  title: "Changer de Mutuelle : Modèle Lettre Résiliation & Comparatif Gratuit",
  
  // Description : Rassure sur la facilité (sans frais, loi infra-annuelle) et incite au clic avec le modèle gratuit.
  description: "Vous payez trop cher ? Changez de mutuelle gratuitement grâce à la Loi Infra-annuelle. Téléchargez notre modèle de lettre de résiliation et comparez les offres.",
  
  keywords: [
    "changer de mutuelle santé",
    "résiliation mutuelle",
    "modèle lettre résiliation mutuelle", // Mot-clé à très fort volume
    "loi infra-annuelle mutuelle",
    "nouvelle mutuelle santé",
    "comparatif mutuelle",
    "changer assurance santé en cours d'année",
    "lettre type résiliation mutuelle"
  ],
  
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/changer-mutuelle",
  },
  
  openGraph: {
    title: "Changer de Mutuelle : Démarches Gratuites et Simplifiées",
    description: "Ne restez pas bloqué avec une mutuelle trop chère. Découvrez comment résilier sans frais après 1 an et trouvez une meilleure couverture immédiatement.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/changer-mutuelle",
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
    "audience": "assurés insatisfaits, retraités, familles, personnes qui déménagent",
    "intent": "résiliation, changement de contrat, économie, téléchargement lettre type",
  },
};

// Données structurées JSON-LD pour FAQ
export const changerMutuelleSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Puis-je changer de mutuelle sans attendre la date anniversaire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, absolument, si votre contrat a plus d'un an. Depuis la Loi Infra-annuelle (décembre 2020), vous n'êtes plus obligé d'attendre l'échéance. Avant 1 an, il faut un motif légitime (déménagement, changement professionnel)."
      }
    },
    {
      "@type": "Question",
      "name": "Vais-je avoir une interruption de couverture ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, la continuité est garantie. Votre nouvelle mutuelle coordonne la résiliation avec l'ancienne pour que le basculement se fasse sans aucune période de carence (couvert jusqu'au soir par l'une, dès le lendemain par l'autre)."
      }
    },
    {
      "@type": "Question",
      "name": "Est-ce que le changement est gratuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, c'est une procédure 100 % gratuite. Aucuns frais de résiliation ni pénalités ne peuvent être appliqués après 12 mois de contrat. Si vous passez par notre comparateur, nous gérons les démarches administratives gratuitement."
      }
    }
  ]
};

// Composant de page
export default function Page() {
  return <ChangerMutuellePage/>;
}