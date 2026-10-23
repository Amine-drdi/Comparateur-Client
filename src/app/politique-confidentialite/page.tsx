import PolitiqueConfidentialite from "@/Components/Home/PolitiqueConfidentialite";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de La Mutuelle de France : données collectées, finalités, conservation, cookies et vos droits RGPD.",
  path: "/politique-confidentialite",
});

export default function PolitiqueConfidentialitePage() {
  return <PolitiqueConfidentialite />;
}
