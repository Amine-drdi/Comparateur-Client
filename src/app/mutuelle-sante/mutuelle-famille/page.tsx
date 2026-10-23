// app/mutuelle-sante/mutuelle-famille/page.tsx
import MutuelleFamillePage from "@/Components/Dropdown/MutuelleFamille";
import type { Metadata } from "next";

export const familleSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte une mutuelle famille ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le budget moyen pour une famille varie selon le nombre d'enfants, l'âge des parents et les garanties choisies. Une bonne mutuelle famille doit couvrir l'optique, l'orthodontie et les soins courants sans dépasser votre budget.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle mutuelle famille est la plus avantageuse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La meilleure mutuelle famille est celle qui couvre les besoins réels de votre foyer : visites, optique, dentaire et hospitalisation. Il faut comparer les garanties et le reste à charge avant de choisir.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Mutuelle famille pas chère : comparez",
  description:
    "Trouvez la meilleure mutuelle famille pour votre budget. Comparez les garanties optique, dentaire, orthodontie et hospitalisation. Devis gratuit et rapide.",
  keywords: [
    "mutuelle famille",
    "mutuelle famille pas chère",
    "meilleure mutuelle famille",
    "assurance santé familiale",
    "mutuelle dentaire famille",
    "mutuelle optique famille",
    "mutuelle orthodontie",
    "comparateur mutuelle famille",
    "devis mutuelle gratuit",
    "mutuelle santé famille",
  ],
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-famille",
  },
  openGraph: {
    title: "Mutuelle famille : protégez votre foyer au meilleur prix",
    description:
      "Comparez les meilleures mutuelles famille et trouvez une couverture adaptée à vos enfants, votre budget et vos besoins de santé. Devis gratuit.",
    url: "https://www.lamutuelledefrance.fr/mutuelle-sante/mutuelle-famille",
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
    audience: "familles, parents, couples avec enfants, familles nombreuses",
    intent: "comparaison assurance famille, remboursement orthodontie, économie budget",
  },
};

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
      <JsonLdScript />
      <MutuelleFamillePage />
    </>
  );
}
