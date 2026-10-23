import MentionsLegales from "@/Components/Home/MentionsLegales";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site La Mutuelle de France : éditeur, hébergeur, propriété intellectuelle, données personnelles et coordonnées.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return <MentionsLegales />;
}
