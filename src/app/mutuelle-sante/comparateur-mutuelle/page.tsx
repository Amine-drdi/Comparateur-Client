import PageComparateurMutuelle from "@/Components/Dropdown/ComparateurMutuelle";
import Script from "next/script";
//import { faqSchema } from "./metadata"; // Si vous avez mis les métadonnées dans un fichier à part

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