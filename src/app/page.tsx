import Accueil from "@/pages/Accueil/Accueil";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Comparateur mutuelle santé : devis gratuit et sans engagement | La Mutuelle de France",
  description:
    "Comparez les meilleures mutuelles santé selon votre profil. Trouvez une mutuelle pas chère, senior, famille, dentaire ou optique. Devis gratuit et sans engagement.",
  path: "/",
  keywords: [
    "mutuelle santé",
    "comparateur mutuelle santé",
    "devis mutuelle gratuit",
    "mutuelle pas chère",
    "mutuelle senior",
    "mutuelle famille",
    "mutuelle dentaire",
    "mutuelle optique",
    "mutuelle en ligne",
    "prix mutuelle santé",
  ],
});

export default function Home() {
  return (
    <main>
      <Accueil />
    </main>
  );
}
