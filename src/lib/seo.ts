import type { Metadata } from "next";

export const SITE_URL = "https://www.lamutuelledefrance.fr";

type SeoMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createSeoMetadata({
  title,
  description,
  path,
  keywords = [
    "mutuelle santé",
    "comparateur mutuelle santé",
    "devis mutuelle gratuit",
    "mutuelle senior",
    "mutuelle famille",
    "mutuelle pas chère",
    "mutuelle dentaire",
    "mutuelle optique",
    "mutuelle retraite",
    "mutuelle en ligne",
    "prix mutuelle santé",
    "comparatif mutuelle santé",
  ],
}: SeoMetadataOptions): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "La Mutuelle de France",
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/comparateur-mutuelle.jpg`,
          alt: "Comparateur de mutuelle santé",
        },
      ],
    },
  };
}
