// app/mutuelle-sante/mutuelle-dentaire/page.tsx
import MutuelleDentairePage from "@/Components/Dropdown/MutuelleDentaire";
import type { Metadata } from "next";

export const dentaireSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Les implants dentaires sont-ils remboursés ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Sécurité sociale rembourse peu les soins dentaires lourds. Une bonne mutuelle dentaire peut prendre en charge une partie importante des implants, couronnes et orthodontie.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le prix d'une mutuelle dentaire ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le prix dépend de la couverture choisie, du niveau de remboursement et de votre situation. Le bon comparatif permet de trouver une mutuelle dentaire au meilleur rapport qualité-prix.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Mutuelle dentaire : implants & couronnes",
  description:
    "Comparez les meilleures mutuelles dentaire pour réduire votre reste à charge sur les implants, couronnes, orthodontie et soins dentaires. Devis gratuit.",
  keywords: [
    "mutuelle dentaire",
    "mutuelle dentaire pas chère",
    "remboursement implant dentaire",
    "mutuelle orthodontie",
    "couronne dentaire",
    "comparateur mutuelle dentaire",
    "assurance dentaire",
    "devis mutuelle gratuit",
    "surcomplémentaire dentaire",
    "mutuelle dentaire senior",
  ],
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-dentaire",
  },
  openGraph: {
    title: "Mutuelle dentaire : réduisez votre reste à charge",
    description:
      "Trouvez une mutuelle dentaire adaptée à vos soins et à votre budget. Comparez les garanties de remboursement et demandez votre devis gratuit.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-dentaire",
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
    audience: "seniors, adultes avec orthodontie, personnes avec soins dentaires coûteux",
    intent: "remboursement soins coûteux, comparaison assurance, réduction reste à charge",
  },
};

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
      <JsonLdScript />
      <MutuelleDentairePage />
    </>
  );
}
