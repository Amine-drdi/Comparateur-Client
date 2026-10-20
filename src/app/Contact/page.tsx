import ContactPage from "@/Components/Home/Contact";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Contactez-nous",
  description:
    "Une question sur votre devis, vos garanties ou l’utilisation du comparateur ? Contactez La Mutuelle de France.",
  path: "/Contact",
});

export default function TarifPage() {
  return <ContactPage/>
}
