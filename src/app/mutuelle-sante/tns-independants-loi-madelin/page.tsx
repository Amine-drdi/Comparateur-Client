import MutuelleTnsIndependants from "@/Components/Dropdown/MutuelleTnsIndependants";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = {
  ...createSeoMetadata({
    title: "Mutuelle TNS et indépendants : comparez les garanties",
    description:
      "Comparez les complémentaires santé pour travailleurs non salariés, indépendants et professions libérales. Comprenez les critères de choix et les règles fiscales liées au dispositif Madelin.",
    path: "/mutuelle-sante/tns-independants-loi-madelin",
    keywords: [
      "mutuelle TNS",
      "mutuelle indépendant",
      "complémentaire santé travailleur non salarié",
      "mutuelle profession libérale",
      "mutuelle artisan",
      "contrat santé loi Madelin",
      "fiscalité mutuelle TNS",
      "comparateur mutuelle indépendant",
      "devis mutuelle TNS",
    ],
    image: {
      url: "https://www.lamutuelledefrance.fr/images/tns-assistance-pro.jpeg",
      alt: "Accompagnement des travailleurs indépendants",
    },
  }),
};

export default function Page() {
  return <MutuelleTnsIndependants />;
}
