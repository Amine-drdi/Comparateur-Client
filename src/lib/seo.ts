import type { Metadata } from "next";

export const SITE_URL = "https://www.lamutuelledefrance.fr";

type SeoMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function createSeoMetadata({
  title,
  description,
  path,
}: SeoMetadataOptions): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
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
