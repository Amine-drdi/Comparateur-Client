
import MutuelleHospitalisationPage from "@/Components/Dropdown/MutuelleHospitalisation";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Mutuelle hospitalisation : comparez les garanties et les tarifs",
  description:
    "Comparez les garanties d’une mutuelle hospitalisation : frais de séjour, forfait journalier, honoraires et chambre particulière. Demandez un devis gratuit et sans engagement.",
  path: "/mutuelle-sante/mutuelle-hospitalisation",
  keywords: [
    "mutuelle hospitalisation",
    "mutuelle hospitalisation seule",
    "remboursement hospitalisation",
    "prise en charge chambre particulière",
    "forfait journalier hospitalier",
    "dépassements d'honoraires hospitalisation",
    "devis mutuelle hospitalisation",
    "comparateur mutuelle santé",
  ],
});

export default function Page() {
  return <MutuelleHospitalisationPage />;
}