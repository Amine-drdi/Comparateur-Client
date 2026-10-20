import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const publicRoutes = [
  "/",
  "/Contact",
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
  return publicRoutes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
  }));
}
