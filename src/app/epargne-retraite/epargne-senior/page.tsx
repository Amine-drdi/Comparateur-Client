import EpargneSenior from "@/Components/epargne-retraite/EpargneSenior";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Épargne Senior : Placements Garantis & Succession | Devis Mutuelle",
  description:
    "Sécurisez votre capital et préparez votre succession. Assurance Vie Senior, Rente Viagère et SCPI. Profitez de l'abattement successoral de 152 500€. Bilan gratuit.",
  keywords: [
    "épargne senior",
    "placement senior",
    "assurance vie après 70 ans",
    "succession assurance vie",
    "rente viagère",
    "capital garanti",
    "placement retraite sans risque",
    "fiscalité assurance vie décès",
  ],
  openGraph: {
    title: "Épargne Senior : Protégez votre Capital et vos Proches",
    description:
      "Besoin de revenus complémentaires ou d'organiser votre héritage ? Nos experts sélectionnent les meilleures assurances vie pour seniors. Devis gratuit.",
    url: "https://www.lamutuelledefrance.fr/epargne-retraite/epargne-senior",
    siteName: "Devis Mutuelle",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.lamutuelledefrance.fr/images/og-epargne-senior.jpg",
        width: 1200,
        height: 630,
        alt: "Épargne Senior et Transmission Devis Mutuelle",
      },
    ],
  },
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/epargne-retraite/epargne-senior",
  },
};

export default function Page() {
  return <EpargneSenior />;
}
