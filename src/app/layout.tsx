import FloatingButtons from "@/Components/Accueil/FloatingButtons.client";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lamutuelledefrance.fr"),
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
    siteName: "La Mutuelle de France",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/comparateur-mutuelle.jpg",
        alt: "Comparateur Mutuelle Santé – La Mutuelle de France",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Comparateur Mutuelle Santé – Devis Gratuit",
    description:
      "Trouvez la meilleure mutuelle santé adaptée à vos besoins. Devis immédiat, gratuit et sans engagement.",
    images: ["/images/comparateur-mutuelle.jpg"],
  },

  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "La Mutuelle de France",
              url: "https://www.lamutuelledefrance.fr",
              inLanguage: "fr-FR",
            }),
          }}
        />
        {/* Boutons flottants */}
        <FloatingButtons />
      </body>
    </html>
  );
}
