import PricingForm from "@/pages/Compare/PricingForm";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Comparateur Mutuelle Santé : Demandez votre Devis",
  description:
    "Complétez le formulaire de comparaison pour obtenir une estimation adaptée à votre profil et à vos besoins en santé.",
  path: "/comparateur-mutuelle-sante",
});

export default function TarifPage() {
  return <PricingForm />;
}
