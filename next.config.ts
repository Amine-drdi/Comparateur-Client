import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/contactez-nous", destination: "/Contact", permanent: true },
      {
        source: "/mutuelle-dentaire",
        destination: "/mutuelle-sante/mutuelle-dentaire",
        permanent: true,
      },
      {
        source: "/comparateur-epargne",
        destination: "/epargne-retraite/comparateur-retraite",
        permanent: true,
      },
      {
        source: "/guides-conseils/epargne-retraite",
        destination: "/guides-conseils/retraite",
        permanent: true,
      },
      {
        source: "/comparateur-assurance",
        destination: "/Contact",
        permanent: true,
      },
      {
        source:
          "/guides-conseils/assurance-emprunteur/economiser-15000-euros-loi-lemoine",
        destination: "/guides-conseils/assurance",
        permanent: true,
      },
      {
        source: "/guides-conseils/assurance-auto-habitation/guide-complet",
        destination: "/guides-conseils/assurance",
        permanent: true,
      },
      {
        source:
          "/guides-conseils/guides-pratiques/comment-utiliser-comparateur-mutuelle-sante",
        destination: "/guides-conseils/guides-pratiques",
        permanent: true,
      },
      {
        source:
          "/guides-conseils/guides-pratiques/comment-resilier-contrat-mutuelle-axa",
        destination: "/guides-conseils/guides-pratiques",
        permanent: true,
      },
      {
        source:
          "/guides-conseils/mutuelle/100-sante-lunettes-protheses-dentaires-gratuites-2026",
        destination: "/guides-conseils/mutuelle",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
