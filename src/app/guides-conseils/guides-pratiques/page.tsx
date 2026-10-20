import GuidesConseilsGuidePratique from "@/Components/Guides/GuidesConseilsGuidePratique";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Guides Pratiques sur la Mutuelle Santé",
  description:
    "Consultez nos guides sur l’utilisation du comparateur, les démarches liées à la mutuelle et la résiliation.",
  path: "/guides-conseils/guides-pratiques",
});

export default function Page() {
  return <GuidesConseilsGuidePratique />;
}
