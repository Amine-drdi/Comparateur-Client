import GuidesConseilsAssurance from "@/Components/Guides/GuidesConseilsAssurance";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Guides & Conseils Assurance | Devis Mutuelle",
  description:
    "Guides pratiques : assurance emprunteur (Loi Lemoine), auto & habitation (Loi Hamon), malus, sinistres… pour payer moins et être mieux couvert.",
  alternates: {
    canonical: "https://devismutuelle.fr/guides-conseils/assurance",
  },
};

export default function Page() {
  return <GuidesConseilsAssurance />;
}
