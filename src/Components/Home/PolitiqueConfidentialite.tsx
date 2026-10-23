import React from "react";
import NavbarA from "./NavBar";
import Footer from "./Footer";

const ACompleter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-semibold text-amber-600">{children}</span>
);

export default function PolitiqueConfidentialite() {
  return (
    <main>
      <NavbarA />
      <section className="py-12 mt-20 bg-gradient-to-b from-sky-50 to-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            {/* En-tête */}
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold leading-tight text-blue-500 sm:text-5xl">
                Politique de confidentialité
              </h1>
              <div className="mx-auto mt-4 h-1.5 w-24 bg-blue-500 rounded-full" />
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Dernière mise à jour : octobre 2026
              </p>
            </div>

            <div className="mt-12 space-y-8 text-gray-700 leading-relaxed">
              {/* Responsable du traitement */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  1. Responsable du traitement
                </h2>
                <p>
                  Le site <strong>www.lamutuelledefrance.fr</strong> (ci-après « le Site »)
                  est édité par la société <ACompleter>[À compléter : raison sociale de l&apos;éditeur]</ACompleter>,
                  <ACompleter>[À compléter : forme juridique]</ACompleter>, au capital de{" "}
                  <ACompleter>[À compléter : capital social]</ACompleter>, immatriculée au
                  RCS de <ACompleter>[À compléter : ville RCS]</ACompleter> sous le numéro{" "}
                  <ACompleter>[À compléter : numéro SIRET]</ACompleter>, dont le siège social
                  est situé <ACompleter>[À compléter : adresse complète du siège social]</ACompleter>.
                </p>
                <p className="mt-4">
                  Cette société est le responsable du traitement des données personnelles
                  collectées sur le Site.
                </p>
                <p className="mt-4">
                  <strong>Contact :</strong>{" "}
                  <a href="mailto:contact@lamutuelledefrance.fr" className="text-blue-600 hover:underline">
                    contact@lamutuelledefrance.fr
                  </a>{" "}
                  —{" "}
                  <a href="tel:+33609999802" className="text-blue-600 hover:underline">
                    06 01 02 03 04
                  </a>
                  .
                </p>
              </section>

              {/* Données collectées et finalités */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  2. Données collectées et finalités
                </h2>
                <p>
                  Dans le cadre de l&apos;utilisation du Site, nous sommes amenés à collecter
                  les catégories de données suivantes :
                </p>
                <ul className="mt-4 space-y-2 list-disc pl-6">
                  <li>
                    <strong>Données d&apos;identification et de contact</strong> (nom, prénom,
                    adresse e-mail, numéro de téléphone, âge, situation professionnelle) :
                    elles sont nécessaires au traitement de vos demandes de devis, à la mise
                    en relation avec un conseiller et au suivi de votre dossier.
                  </li>
                  <li>
                    <strong>Données relatives à vos besoins</strong> (type d&apos;assurance
                    recherché, profil, garanties souhaitées) : elles permettent de vous
                    proposer des offres adaptées à votre situation.
                  </li>
                  <li>
                    <strong>Données de navigation et de mesure d&apos;audience</strong> :
                    elles servent à améliorer le fonctionnement du Site et à établir des
                    statistiques de fréquentation (voir section « Cookies »).
                  </li>
                </ul>
              </section>

              {/* Base légale */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  3. Base légale du traitement
                </h2>
                <p>
                  Vos données sont traitées sur les bases légales suivantes : l&apos;exécution
                  des mesures précontractuelles prises à votre demande (demande de devis),
                  votre consentement lorsqu&apos;il est requis (notamment pour l&apos;envoi de
                  sollicitations commerciales ou le dépôt de cookies non essentiels), et
                  l&apos;intérêt légitime de l&apos;éditeur à améliorer ses services et à
                  prévenir la fraude.
                </p>
              </section>

              {/* Destinataires */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  4. Destinataires des données
                </h2>
                <p>
                  Vos données sont destinées aux conseillers et aux services habilités de
                  l&apos;éditeur, ainsi qu&apos;à ses éventuels partenaires assureurs, dans la
                  seule mesure nécessaire à l&apos;étude et à la gestion de votre demande.
                </p>
                <p className="mt-4">
                  Vos données ne sont <strong>jamais vendues</strong> à des tiers. Elles ne
                  sont transférées à des partenaires qu&apos;avec votre accord préalable ou
                  lorsque la loi l&apos;exige.
                </p>
                <p className="mt-4">
                  L&apos;hébergement du Site est assuré par Vercel Inc. (États-Unis). Des
                  transferts de données hors Union européenne peuvent intervenir dans ce
                  cadre, encadrés par des garanties appropriées conformément au RGPD.
                </p>
              </section>

              {/* Durée de conservation */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  5. Durée de conservation
                </h2>
                <p>
                  Vos données sont conservées pour la durée nécessaire aux finalités décrites
                  ci-dessus, et en tout état de cause au maximum :
                </p>
                <ul className="mt-4 space-y-2 list-disc pl-6">
                  <li>
                    <strong>Données des formulaires de contact et de devis</strong> : durée
                    nécessaire au traitement de votre demande, puis archivage conforme aux
                    durées légales applicables.
                  </li>
                  <li>
                    <strong>Données commerciales</strong> : trois ans à compter du dernier
                    contact, conformément aux recommandations de la CNIL.
                  </li>
                  <li>
                    <strong>Données de navigation et cookies</strong> : selon la durée de vie
                    de chaque cookie, précisée dans la section « Cookies ».
                  </li>
                </ul>
              </section>

              {/* Vos droits */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  6. Vos droits (RGPD)
                </h2>
                <p>
                  Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique
                  et Libertés du 6 janvier 1978 modifiée, vous disposez des droits suivants
                  sur vos données personnelles :
                </p>
                <ul className="mt-4 space-y-2 list-disc pl-6">
                  <li>Droit d&apos;accès à vos données ;</li>
                  <li>Droit de rectification des données inexactes ;</li>
                  <li>Droit à l&apos;effacement de vos données ;</li>
                  <li>Droit à la portabilité de vos données ;</li>
                  <li>Droit à la limitation du traitement ;</li>
                  <li>Droit d&apos;opposition, notamment à la prospection commerciale ;</li>
                  <li>Droit de retirer votre consentement à tout moment ;</li>
                  <li>Droit de définir des directives relatives au sort de vos données après votre décès.</li>
                </ul>
                <p className="mt-4">
                  Pour exercer ces droits, écrivez-nous à{" "}
                  <a href="mailto:contact@lamutuelledefrance.fr" className="text-blue-600 hover:underline">
                    contact@lamutuelledefrance.fr
                  </a>{" "}
                  ou appelez-nous au{" "}
                  <a href="tel:+33609999802" className="text-blue-600 hover:underline">
                    06 01 02 03 04
                  </a>
                  . Une pièce d&apos;identité pourra vous être demandée en cas de doute raisonnable.
                </p>
                <p className="mt-4">
                  Vous disposez également du droit d&apos;introduire une réclamation auprès de
                  la Commission Nationale de l&apos;Informatique et des Libertés (CNIL),{" "}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    www.cnil.fr
                  </a>
                  .
                </p>
              </section>

              {/* Cookies */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  7. Cookies
                </h2>
                <p>
                  Le Site dépose des cookies strictement nécessaires à son fonctionnement,
                  ainsi que des cookies de mesure d&apos;audience destinés à établir des
                  statistiques de fréquentation et à améliorer le Site.
                </p>
                <p className="mt-4">
                  Vous pouvez à tout moment configurer votre navigateur pour refuser les
                  cookies ou être informé de leur dépôt. La plupart des navigateurs acceptent
                  les cookies par défaut ; modifier ce paramétrage peut toutefois affecter
                  certaines fonctionnalités du Site.
                </p>
              </section>

              {/* Sécurité */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  8. Sécurité des données
                </h2>
                <p>
                  L&apos;éditeur met en œuvre les mesures techniques et organisationnelles
                  appropriées afin de garantir la sécurité et la confidentialité de vos
                  données personnelles et de les protéger contre toute destruction accidentelle
                  ou illicite, perte, altération, divulgation ou accès non autorisé.
                </p>
              </section>

              {/* Modifications */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  9. Modification de la présente politique
                </h2>
                <p>
                  La présente politique de confidentialité peut être mise à jour à tout
                  moment, notamment pour tenir compte d&apos;évolutions légales ou techniques.
                  La version applicable est celle en ligne sur le Site à la date de votre
                  visite.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  10. Contact
                </h2>
                <p>
                  Pour toute question relative à la protection de vos données personnelles :
                </p>
                <ul className="mt-4 space-y-2 list-none">
                  <li>
                    Par e-mail :{" "}
                    <a href="mailto:contact@lamutuelledefrance.fr" className="text-blue-600 hover:underline">
                      contact@lamutuelledefrance.fr
                    </a>
                  </li>
                  <li>
                    Par téléphone :{" "}
                    <a href="tel:+33609999802" className="text-blue-600 hover:underline">
                      06 01 02 03 04
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
