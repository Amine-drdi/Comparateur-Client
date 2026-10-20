import GuidesConseilsAssurance from "@/Components/Guides/GuidesConseilsAssurance";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Guides et Conseils en Assurance",
  description:
    "Guides pratiques sur l’assurance emprunteur, l’assurance auto et l’assurance habitation.",
  path: "/guides-conseils/assurance",
});

export default function Page() {
  return <GuidesConseilsAssurance />;
}
