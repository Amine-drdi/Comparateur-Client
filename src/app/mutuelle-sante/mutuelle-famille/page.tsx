// app/mutuelle-sante/mutuelle-famille/page.tsx
import MutuelleFamillePage from "@/Components/Dropdown/MutuelleFamille";
import type { Metadata } from "next";


// Données structurées JSON-LD
export const familleSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte une mutuelle famille ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le budget moyen pour une famille de 4 personnes varie entre 100 € et 180 € par mois. Le prix dépend de votre lieu de résidence et de l'âge des parents. Astuce : visez les contrats offrant la gratuité à partir du 3ème enfant."
      }
    },
    {
      "@type": "Question",
      "name": "Les enfants sont-ils bien remboursés ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, si le contrat est bien choisi. Une bonne mutuelle famille doit renforcer trois postes clés : l'orthodontie (souvent chère à l'adolescence), l'optique (renouvellement fréquent) et les dépassements d'honoraires des pédiatres."
      }
    },
    {
      "@type": "Question",
      "name": "Peut-on ajouter un enfant en cours d'année ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument. L'ajout d'un enfant (naissance ou adoption) se fait à tout moment sur simple envoi de l'acte de naissance. L'enfant est couvert rétroactivement et certaines mutuelles versent même une prime de naissance."
      }
    }
  ]
};

// Métadonnées SEO
export const metadata: Metadata = {
  // Titre : Promesse de prix ("Pas Chère") + Le besoin n°1 des familles ("Orthodontie/Soins")
  title: "Mutuelle Famille Pas Chère : Devis Gratuit & Orthodontie Incluse",
  
  // Description : Mentionne les avantages financiers (Gratuité 3ème enfant) et les garanties clés.
  description: "Protéger votre foyer sans vous ruiner ? Comparez les mutuelles famille : renforts orthodontie, pédiatrie et optique. Gratuité dès le 3ème enfant. Devis en 2 min.",
  
  keywords: [
    "mutuelle famille",
    "assurance santé familiale",
    "mutuelle orthodontie",
    "mutuelle famille nombreuse",
    "gratuité 3ème enfant mutuelle",
    "prime de naissance mutuelle",
    "comparateur mutuelle famille",
    "mutuelle pas chère famille"
  ],
  
  alternates: {
    // URL normalisée
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-famille",
  },
  
  openGraph: {
    title: "Mutuelle Famille : Protégez Parents et Enfants à Petit Prix",
    description: "Orthodontie, Lunettes, Pédiatre... Vos enfants coûtent cher ? Trouvez une mutuelle qui couvre vraiment leurs besoins tout en préservant votre budget.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-famille",
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
    "audience": "familles, parents, couples avec enfants, familles nombreuses",
    "intent": "comparaison assurance famille, remboursement orthodontie, économie budget",
  },
};

// Fonction pour générer le JSON-LD
function JsonLdScript() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(familleSchema) }}
    />
  );
}

export default function Page() {
  return (
    <>
      {/* Script JSON-LD pour les rich snippets */}
      <JsonLdScript />
      
      {/* Composant principal */}
      <MutuelleFamillePage />
    </>
  );
}