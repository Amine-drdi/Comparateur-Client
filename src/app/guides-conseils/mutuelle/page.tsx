import GuidesConeilsMutuelle from "@/Components/Guides/GuidesConeilsMutuelle";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Guides et Conseils sur la Mutuelle Santé",
  description:
    "Découvrez nos guides sur le 100 % Santé, les remboursements, les lunettes et les soins dentaires.",
  path: "/guides-conseils/mutuelle",
});

export default function Page() {
  return <GuidesConeilsMutuelle />;
}
