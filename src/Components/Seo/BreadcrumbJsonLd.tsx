"use client";

import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  "mutuelle-sante": "Mutuelle santé",
  "epargne-retraite": "Épargne retraite",
  "guides-conseils": "Guides & conseils",
  "mutuelle-senior": "Mutuelle senior",
  "mutuelle-famille": "Mutuelle famille",
  "mutuelle-dentaire": "Mutuelle dentaire",
  "mutuelle-optique": "Mutuelle optique",
  "mutuelle-pas-chere": "Mutuelle pas chère",
  "mutuelle-hospitalisation": "Mutuelle hospitalisation",
  "mutuelle-retraite": "Mutuelle retraite",
  "changer-mutuelle": "Changer de mutuelle",
  "resiliation-mutuelle": "Résiliation",
  "comparateur-mutuelle": "Comparateur",
  "tns-independants-loi-madelin": "TNS & loi Madelin",
  "comparateur-mutuelle-sante": "Comparateur mutuelle santé",
  contact: "Contact",
  "mentions-legales": "Mentions légales",
  "politique-confidentialite": "Politique de confidentialité",
  assurance: "Assurance",
  mutuelle: "Mutuelle",
  retraite: "Retraite",
  "guides-pratiques": "Guides pratiques",
};

function humanize(segment: string): string {
  return decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

export default function BreadcrumbJsonLd() {
  const pathname = usePathname();
  if (!pathname) return null;

  const segments = pathname.split("/").filter(Boolean);

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.lamutuelledefrance.fr",
    },
    ...segments.map((segment, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: LABELS[segment] ?? humanize(segment),
      item: `https://www.lamutuelledefrance.fr/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
