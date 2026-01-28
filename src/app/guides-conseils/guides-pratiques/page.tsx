import GuidesConseilsGuidePratique from "@/Components/Guides/GuidesConseilsGuidePratique";


export const metadata = {
  title: "Guides Pratiques Mutuelle Santé | Comparateur, Démarches & Résiliation",
  description:
    "Guides pratiques lamutuelledefrance.fr : comment utiliser le comparateur de mutuelle, comprendre les résultats, résilier une mutuelle (AXA) et réussir la transition sans coupure.",
  alternates: {
    canonical: "https://lamutuelledefrance.fr/guides-conseils/guides-pratiques",
  },
};

export default function Page() {
  return <GuidesConseilsGuidePratique />;
}
