import FloatingButtons from "@/Components/Accueil/FloatingButtons.client";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Comparateur Mutuelle Santé – Devis Gratuit | La Mutuelle de France",
    template: "%s | La Mutuelle de France",
  },

  description:
    "Comparez les meilleures mutuelles santé en 2 minutes. Jusqu’à 40 % d’économies sur vos garanties (Senior, Famille, Dentaire, Optique). Devis gratuit, immédiat et sans engagement.",

  keywords: [
    "comparateur mutuelle santé",
    "devis mutuelle gratuit",
    "mutuelle santé pas chère",
    "mutuelle senior",
    "mutuelle retraité",
    "mutuelle famille",
    "comparaison assurance santé",
    "changer de mutuelle santé",
    "résilier mon contrat mutuelle santé"
  ],

  alternates: {
    canonical: "https://www.lamutuelledefrance.fr/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Comparateur Mutuelle Santé – Économisez Jusqu’à 40 %",
    description:
      "Comparez +30 offres de mutuelles santé partenaires et trouvez la couverture idéale selon votre budget. Service 100 % gratuit.",
    url: "https://www.lamutuelledefrance.fr/",
    siteName: "La Mutuelle de France",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.lamutuelledefrance.fr/images/og-mutuelle.jpg",
        width: 1200,
        height: 630,
        alt: "Comparateur Mutuelle Santé – La Mutuelle de France",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Comparateur Mutuelle Santé – Devis Gratuit",
    description:
      "Trouvez la meilleure mutuelle santé adaptée à vos besoins. Devis immédiat, gratuit et sans engagement.",
    images: ["https://www.lamutuelledefrance.fr/images/og-mutuelle.jpg"],
  },

  icons: {
    icon: "/logo.png",
    apple: "/apple-touch-icon.png",
  },

  other: {
    "geo.region": "FR",
    "geo.placename": "France",
    audience: "seniors, retraités, familles, actifs",
    telephone: "01 88 81 21 08",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}
        {/* Boutons flottants */}
        <FloatingButtons />
      </body>
    </html>
  );
}
