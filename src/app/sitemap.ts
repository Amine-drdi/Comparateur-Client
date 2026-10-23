import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { GUIDE_ARTICLES } from "@/lib/guideArticles";

const STATIC_LASTMOD = "2026-10-22";

const publicRoutes = [
  "/",
  "/contact",
  "/comparateur-mutuelle-sante",
  "/mutuelle-sante/comparateur-mutuelle",
  "/mutuelle-sante/changer-mutuelle",
  "/mutuelle-sante/mutuelle-dentaire",
  "/mutuelle-sante/mutuelle-famille",
  "/mutuelle-sante/mutuelle-hospitalisation",
  "/mutuelle-sante/mutuelle-optique",
  "/mutuelle-sante/mutuelle-pas-chere",
  "/mutuelle-sante/mutuelle-retraite",
  "/mutuelle-sante/mutuelle-senior",
  "/mutuelle-sante/resiliation-mutuelle",
  "/mutuelle-sante/tns-independants-loi-madelin",
  "/epargne-retraite/comparateur-retraite",
  "/epargne-retraite/conseils-avantages-fiscaux",
  "/epargne-retraite/epargne-senior",
  "/epargne-retraite/plan-epargne-retraite-per",
  "/epargne-retraite/preparer-sa-retraite",
  "/epargne-retraite/simulateur-retraite",
  "/guides-conseils/assurance",
  "/guides-conseils/guides-pratiques",
  "/guides-conseils/mutuelle",
  "/guides-conseils/retraite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: STATIC_LASTMOD,
  }));
  const articleEntries: MetadataRoute.Sitemap = GUIDE_ARTICLES.map(
    ({ category, slug, updatedAt }) => ({
      url: new URL(`/guides-conseils/${category}/${slug}`, SITE_URL).toString(),
      lastModified: updatedAt,
    }),
  );
  return [...staticEntries, ...articleEntries];
}
