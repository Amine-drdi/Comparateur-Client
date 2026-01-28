import GuidesConseilsRetraite from "@/Components/Guides/GuidesConseilsRetraite";

export const metadata = {
  title: "Guides & Conseils Épargne & Retraite | PER, Assurance Vie, Défiscalisation",
  description:
    "Découvrez nos guides Épargne & Retraite : PER, assurance vie, défiscalisation, préparation retraite, stratégies patrimoniales et conseils pratiques.",
  alternates: {
    canonical: "https://lamutuelledefrance.fr/guides-conseils/epargne-retraite",
  },
};

export default function Page() {
  return <GuidesConseilsRetraite />;
}
