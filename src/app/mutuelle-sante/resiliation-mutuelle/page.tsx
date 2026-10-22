// app/mutuelle-sante/resiliation-mutuelle/page.tsx
import ResiliationMutuellePage from "@/Components/Dropdown/ResiliationMutuellePage";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Résiliation mutuelle santé : démarches et délais",
  description:
    "Comprenez les conditions et les étapes pour résilier une complémentaire santé, notamment après la première année du contrat. Comparez une nouvelle couverture avec un devis gratuit.",
  path: "/mutuelle-sante/resiliation-mutuelle",
  keywords: [
    "résiliation mutuelle santé",
    "résilier mutuelle",
    "résiliation infra-annuelle",
    "résilier mutuelle après un an",
    "comment résilier une complémentaire santé",
    "démarches résiliation mutuelle",
    "changer de mutuelle santé",
    "devis mutuelle santé",
  ],
});

export default function ResiliationPage() {
  return <ResiliationMutuellePage />;
}