// app/mutuelle-sante/changer-mutuelle/page.tsx
import ChangerMutuellePage from "@/Components/Dropdown/ChangerMutuelle";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Changer de mutuelle : démarches et devis",
  description:
    "Quand et comment changer de mutuelle santé ? Démarches de résiliation, points à vérifier avant de souscrire et devis gratuit sans engagement.",
  path: "/mutuelle-sante/changer-mutuelle",
  keywords: [
    "changer de mutuelle santé",
    "comment changer de mutuelle",
    "résiliation mutuelle",
    "résiliation infra-annuelle mutuelle",
    "changer de mutuelle après un an",
    "nouvelle mutuelle santé",
    "comparer mutuelle santé",
    "devis mutuelle sans engagement",
  ],
});

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
          "text": "Pour un contrat individuel de complémentaire santé, la résiliation infra-annuelle est généralement possible après un an d’adhésion. Elle prend effet un mois après la réception de la notification. Avant un an, les possibilités dépendent des motifs prévus par la loi ou le contrat."
      }
    },
    {
      "@type": "Question",
      "name": "Vais-je avoir une interruption de couverture ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La continuité n’est pas automatique. Confirmez la date d’effet du nouveau contrat et la date de fin de l’ancien auprès des organismes concernés pour éviter une interruption de couverture."
      }
    },
    {
      "@type": "Question",
      "name": "Est-ce que le changement est gratuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La résiliation infra-annuelle des contrats concernés est sans frais après un an d’adhésion. Vérifiez la date de fin communiquée par l’organisme et les sommes éventuellement dues jusqu’à cette date."
      }
    }
  ]
};

// Composant de page
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(changerMutuelleSchema) }}
      />
      <ChangerMutuellePage />
    </>
  );
}