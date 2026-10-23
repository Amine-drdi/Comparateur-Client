// app/mutuelle-sante/mutuelle-retraite/page.tsx

import MutuelleRetraitePage from "@/Components/Dropdown/MutuelleRetraite";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Mutuelle retraite : comparez les offres",
  description:
    "À la retraite, comparez les garanties santé : optique, dentaire, audition, hospitalisation. Maintien du contrat et devis gratuit.",
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