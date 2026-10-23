import FloatingButtons from "@/Components/Accueil/FloatingButtons.client";
import BreadcrumbJsonLd from "@/Components/Seo/BreadcrumbJsonLd";
import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lamutuelledefrance.fr"),
  alternates: {
    canonical: "https://www.lamutuelledefrance.fr",
  },
  title: {
    default: "Comparateur Mutuelle Santé – Devis Gratuit | La Mutuelle de France",
    template: "%s | La Mutuelle de France",
  },

  description:
    "Comparez les meilleures mutuelles santé selon votre profil : pas chère, senior, famille, TNS. Devis gratuit et sans engagement en 2 minutes.",

  keywords: [
    "mutuelle santé",
    "comparateur mutuelle santé",
    "comparateur mutuelle",
    "meilleure mutuelle santé",
    "devis mutuelle santé",
    "devis mutuelle gratuit",
    "mutuelle santé pas chère",
    "mutuelle santé en ligne",
    "mutuelle senior",
    "mutuelle famille",
    "mutuelle retraité",
    "mutuelle dentaire",
    "mutuelle optique",
    "comparaison mutuelle santé",
    "changer de mutuelle santé",
    "prix mutuelle santé",
    "tarif mutuelle santé",
    "meilleur prix mutuelle santé",
    "mutuelle sans engagement",
    "mutuelle santé pour senior",
    "mutuelle pour 2 personnes",
    "mutuelle retraite",
    "devis mutuelle en ligne",
    "meilleure mutuelle pas chère",
    "assurance santé mutuelle",
  ],

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
        <BreadcrumbJsonLd />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "La Mutuelle de France",
              url: "https://www.lamutuelledefrance.fr",
              logo: "https://www.lamutuelledefrance.fr/logo.ico",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33609999802",
                email: "contact@lamutuelledefrance.fr",
                contactType: "customer service",
                areaServed: "FR",
                availableLanguage: "fr",
              },
            }),
          }}
        />
        {/* Boutons flottants */}
        <FloatingButtons />
        <Analytics />
      </body>
    </html>
  );
}
