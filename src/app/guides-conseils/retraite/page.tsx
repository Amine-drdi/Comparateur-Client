import GuidesConseilsRetraite from "@/Components/Guides/GuidesConseilsRetraite";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Guides retraite : PER, épargne et mutuelle santé",
  description:
    "Préparez votre retraite avec nos guides sur le PER, l’épargne et la mutuelle santé : garanties à comparer, maintien du contrat et démarches à vérifier.",
  path: "/guides-conseils/retraite",
  keywords: [
    "guide retraite",
    "préparer sa retraite",
    "mutuelle retraite",
    "mutuelle pour retraité",
    "choisir mutuelle senior",
    "PER retraite",
    "épargne retraite",
    "loi Evin mutuelle retraite",
  ],
});

export default function Page() {
  return <GuidesConseilsRetraite />;
}
