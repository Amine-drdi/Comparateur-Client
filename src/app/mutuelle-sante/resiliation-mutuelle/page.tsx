// app/mutuelle-sante/resiliation-mutuelle/page.tsx
import ResiliationMutuellePage from "@/Components/Dropdown/ResiliationMutuellePage";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Résiliation mutuelle : démarches et délais",
  description:
    "Résiliez votre complémentaire santé : conditions et étapes, notamment après la première année du contrat. Devis pour une nouvelle couverture.",
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