import MutuelleTnsIndependants from "@/Components/Dropdown/MutuelleTnsIndependants";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = {
  ...createSeoMetadata({
    title: "Mutuelle TNS : comparez les garanties",
    description:
      "Complémentaires santé pour TNS, indépendants et professions libérales : critères de choix et règles fiscales du dispositif Madelin.",
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
