// app/mutuelle-sante/mutuelle-retraite/page.tsx

import MutuelleRetraitePage from "@/Components/Dropdown/MutuelleRetraite";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Mutuelle retraite : comparez les offres pour retraités",
  description:
    "À la retraite, comparez les garanties santé selon vos besoins en optique, dentaire, audition et hospitalisation. Découvrez les règles de maintien du contrat et demandez un devis gratuit.",
  path: "/mutuelle-sante/mutuelle-retraite",
  keywords: [
    "mutuelle retraité",
    "mutuelle retraite",
    "mutuelle santé retraité",
    "maintien mutuelle retraite loi Evin",
    "mutuelle senior",
    "prix mutuelle retraité",
    "comparateur mutuelle retraité",
    "comparateur mutuelle senior",
    "remboursement appareil auditif",
    "devis mutuelle retraite",
  ],
});

export default function Page() {
  return <MutuelleRetraitePage />;
}