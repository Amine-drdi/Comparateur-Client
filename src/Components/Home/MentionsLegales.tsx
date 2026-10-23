import React from "react";
import Link from "next/link";
import NavbarA from "./NavBar";
import Footer from "./Footer";

const ACompleter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-semibold text-amber-600">{children}</span>
);

export default function MentionsLegales() {
  return (
    <main>
      <NavbarA />
      <section className="py-12 mt-20 bg-gradient-to-b from-sky-50 to-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            {/* En-tête */}
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold leading-tight text-blue-500 sm:text-5xl">
                Mentions légales
              </h1>
              <div className="mx-auto mt-4 h-1.5 w-24 bg-blue-500 rounded-full" />
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Dernière mise à jour : octobre 2026
              </p>
            </div>

            <div className="mt-12 space-y-8 text-gray-700 leading-relaxed">
              {/* Éditeur */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  1. Éditeur du site
                </h2>
                <p>
                  Le site <strong>www.lamutuelledefrance.fr</strong> (ci-après « le Site »)
                  est édité par :
                </p>
                <ul className="mt-4 space-y-2 list-none">
                  <li><strong>Raison sociale :</strong> <ACompleter>[À compléter : raison sociale de l&apos;éditeur]</ACompleter></li>
                  <li><strong>Forme juridique :</strong> <ACompleter>[À compléter : forme juridique]</ACompleter></li>
                  <li><strong>Capital social :</strong> <ACompleter>[À compléter : montant du capital social]</ACompleter></li>
                  <li><strong>Siège social :</strong> <ACompleter>[À compléter : adresse complète du siège social]</ACompleter></li>
                  <li><strong>SIRET :</strong> <ACompleter>[À compléter : numéro SIRET]</ACompleter></li>
                  <li><strong>RCS :</strong> <ACompleter>[À compléter : ville et numéro RCS]</ACompleter></li>
                  <li><strong>ORIAS :</strong> <ACompleter>[À compléter : numéro d&apos;immatriculation ORIAS — obligatoire pour toute activité de courtage ou de comparaison en assurance]</ACompleter></li>
                </ul>
                <p className="mt-4">
                  <strong>Coordonnées :</strong> téléphone :{" "}
                  <a href="tel:+33609999802" className="text-blue-600 hover:underline">
                    06 01 02 03 04
                  </a>{" "}
                  — e-mail :{" "}
                  <a href="mailto:contact@lamutuelledefrance.fr" className="text-blue-600 hover:underline">
                    contact@lamutuelledefrance.fr
                  </a>
                </p>
              </section>

              {/* Directeur de la publication */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  2. Directeur de la publication
                </h2>
                <p>
                  Le directeur de la publication est :{" "}
                  <ACompleter>[À compléter : nom et prénom du directeur de la publication]</ACompleter>.
                </p>
              </section>

              {/* Hébergeur */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  3. Hébergeur
                </h2>
                <p>
                  Le Site est hébergé par <strong>Vercel Inc.</strong>, société de droit
                  américain dont le siège social est situé au{" "}
                  <strong>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</strong>,
                  joignable sur le site{" "}
                  <a
                    href="https://www.vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    www.vercel.com
                  </a>
                  .
                </p>
              </section>

              {/* Propriété intellectuelle */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  4. Propriété intellectuelle
                </h2>
                <p>
                  L&apos;ensemble des contenus du Site (textes, logos, images, graphismes,
                  icônes, base de données, etc.) est la propriété exclusive de l&apos;éditeur
                  ou de ses partenaires. Toute reproduction, représentation, modification,
                  adaptation ou exploitation, totale ou partielle, de ces contenus, par
                  quelque procédé que ce soit, sans l&apos;autorisation écrite préalable de
                  l&apos;éditeur, est strictement interdite et constituerait une contrefaçon
                  sanctionnée par les articles L.335-2 et suivants du Code de la propriété
                  intellectuelle.
                </p>
                <p className="mt-4">
                  Les marques et logos figurant sur le Site sont des marques déposées. Toute
                  utilisation non autorisée est interdite.
                </p>
              </section>

              {/* Données personnelles */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  5. Données personnelles
                </h2>
                <p>
                  Les données personnelles collectées sur le Site (notamment via les
                  formulaires de contact, de demande de devis et le comparateur) font
                  l&apos;objet d&apos;un traitement destiné à vous mettre en relation avec
                  des conseillers et, le cas échéant, à vous proposer des contrats
                  d&apos;assurance adaptés à votre profil.
                </p>
                <p className="mt-4">
                  Conformément au Règlement (UE) 2016/679 du 27 avril 2016 (RGPD) et à la
                  loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez de
                  droits sur vos données : droit d&apos;accès, de rectification, d&apos;effacement,
                  de portabilité, de limitation et d&apos;opposition.
                </p>
                <p className="mt-4">
                  Pour plus de détails, consultez notre{" "}
                  <Link href="/politique-confidentialite" className="text-blue-600 hover:underline">
                    Politique de confidentialité
                  </Link>
                  .
                </p>
              </section>

              {/* Cookies */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  6. Cookies
                </h2>
                <p>
                  Le Site utilise des cookies et technologies de mesure d&apos;audience
                  destinés à améliorer votre navigation et à établir des statistiques de
                  fréquentation. Vous pouvez configurer votre navigateur pour refuser les
                  cookies. Le détail des cookies utilisés et de leur gestion figure dans
                  notre{" "}
                  <Link href="/politique-confidentialite" className="text-blue-600 hover:underline">
                    Politique de confidentialité
                  </Link>
                  .
                </p>
              </section>

              {/* Contact */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  7. Contact
                </h2>
                <p>
                  Pour toute question relative au Site ou à ses mentions légales, vous
                  pouvez nous contacter :
                </p>
                <ul className="mt-4 space-y-2 list-none">
                  <li>
                    Par téléphone :{" "}
                    <a href="tel:+33609999802" className="text-blue-600 hover:underline">
                      06 01 02 03 04
                    </a>
                  </li>
                  <li>
                    Par e-mail :{" "}
                    <a href="mailto:contact@lamutuelledefrance.fr" className="text-blue-600 hover:underline">
                      contact@lamutuelledefrance.fr
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
