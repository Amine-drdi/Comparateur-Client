import PricingForm from "@/pages/Compare/PricingForm";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Comparateur mutuelle santé : demandez votre devis en ligne | La Mutuelle de France",
  description:
    "Comparez les offres de mutuelle santé adaptées à votre situation. Obtenez un devis mutuelle gratuit, rapide et sans engagement pour votre budget.",
  path: "/comparateur-mutuelle-sante",
  keywords: [
    "comparateur mutuelle santé",
    "devis mutuelle gratuit",
    "mutuelle santé en ligne",
    "comparatif mutuelle santé",
    "meilleure mutuelle santé",
    "mutuelle pas chère",
    "mutuelle senior",
    "mutuelle famille",
  ],
});

export default function TarifPage() {
  return <PricingForm />;
}
