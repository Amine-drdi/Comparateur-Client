import GuidesConseilsRetraite from "@/Components/Guides/GuidesConseilsRetraite";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Guides et Conseils pour Préparer sa Retraite",
  description:
    "Découvrez nos guides sur le PER, l’assurance vie, la préparation de la retraite et les avantages fiscaux.",
  path: "/guides-conseils/retraite",
});

export default function Page() {
  return <GuidesConseilsRetraite />;
}
