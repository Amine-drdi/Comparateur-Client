
import Accueil from "@/pages/Accueil/Accueil";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Comparateur Mutuelle Santé : Devis Gratuit en Ligne",
  description:
    "Comparez des offres de complémentaire santé selon votre profil et vos besoins. Demandez un devis gratuit, sans engagement.",
  path: "/",
});

export default function Home() {
  return (
   
   <main>
    
    <Accueil /> 
    </main>
  );
}
