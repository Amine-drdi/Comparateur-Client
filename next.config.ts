import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/contactez-nous", destination: "/contact", permanent: true },
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
        destination: "/contact",
        permanent: true,
      },
      {
        source:
          "/guides-conseils/assurance-emprunteur/economiser-15000-euros-loi-lemoine",
        destination:
          "/guides-conseils/assurance/changer-assurance-emprunteur-loi-lemoine",
        permanent: true,
      },
      {
        source: "/guides-conseils/assurance-auto-habitation/guide-complet",
        destination:
          "/guides-conseils/assurance/guide-assurance-auto-habitation-changement",
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
        destination: "/guides-conseils/guides-pratiques/resilier-mutuelle-sante",
        permanent: true,
      },
      {
        source:
          "/guides-conseils/mutuelle/100-sante-lunettes-protheses-dentaires-gratuites-2026",
        destination: "/guides-conseils/mutuelle/100-sante-optique-dentaire-audio",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
