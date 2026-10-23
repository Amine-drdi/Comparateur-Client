import PageComparateurMutuelle from "@/Components/Dropdown/ComparateurMutuelle";
import Script from "next/script";
import { createSeoMetadata } from "@/lib/seo";
//import { faqSchema } from "./metadata"; // Si vous avez mis les métadonnées dans un fichier à part

export const metadata = createSeoMetadata({
  title: "Comparateur mutuelle santé : comparez",
  description:
    "Comparez des offres de mutuelle santé selon votre profil et les garanties recherchées, puis demandez un devis.",
  path: "/mutuelle-sante/comparateur-mutuelle",
});

export default function PageComparateur() {
  return (
    <>
      {/*<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />*/}
      
      {/* Reste du contenu de votre page (H1, H2, Formulaires...) */}
      <main>
        <PageComparateurMutuelle/>
      </main>
    </>
  );
}