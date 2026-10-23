import React from "react";
import Link from "next/link";
import {
  HeartPulse,
  Users,
  PiggyBank,
  Check,
  ArrowRight,
} from "lucide-react";

const COMPARATEUR_URL = "/comparateur-mutuelle-sante";

const profils = [
  {
    id: "senior",
    icon: <HeartPulse className="w-7 h-7 text-white" />,
    titre: "Mutuelle senior : des garanties pensées pour les plus de 55 ans",
    textes: [
      "Avec l'âge, les besoins de santé évoluent : consultations plus fréquentes, dépenses d'optique, soins dentaires (couronnes, implants), frais d'hospitalisation ou aides auditives. Le reste à charge sur ces postes devient vite élevé, et c'est précisément là qu'une bonne mutuelle senior fait toute la différence.",
      "Notre comparateur analyse en quelques minutes les offres de plus de 30 assureurs partenaires et sélectionne les contrats les mieux adaptés aux seniors : remboursements renforcés en dentaire, optique et audiologie, prise en charge de l'hospitalisation, le tout sans questionnaire médical. Grâce à la résiliation infra-annuelle, vous pouvez changer de mutuelle après 12 mois de contrat, sans justificatif : l'occasion idéale de comparer et de réduire votre cotisation.",
    ],
    avantages: [
      "Jusqu'à 40% d'économies sur votre cotisation",
      "Garanties renforcées : dentaire, optique, audiologie",
      "Hospitalisation bien couverte",
      "Sans questionnaire médical",
    ],
    cta: "Comparer les mutuelles senior",
    lienInfos: {
      href: "/mutuelle-sante/mutuelle-senior",
      label: "En savoir plus sur la mutuelle senior",
    },
  },
  {
    id: "famille",
    icon: <Users className="w-7 h-7 text-white" />,
    titre: "Mutuelle famille : une protection complète pour petits et grands",
    textes: [
      "Une mutuelle famille doit répondre aux besoins de chaque membre du foyer : consultations et pédiatre pour les enfants, orthodontie — un poste particulièrement coûteux —, optique pour toute la famille, ainsi qu'une solide protection hospitalisation et maternité pour les parents.",
      "Notre comparateur met en concurrence les contrats famille des plus grands assureurs et identifie la formule offrant le meilleur rapport garanties/prix pour votre foyer. Une seule cotisation, des remboursements adaptés à chacun, et des économies pouvant atteindre 36% par rapport à une mutuelle traditionnelle. Le devis est gratuit, sans engagement, et obtenu en moins de 2 minutes.",
    ],
    avantages: [
      "Orthodontie et optique enfant bien remboursées",
      "Hospitalisation et maternité pour les parents",
      "Une seule cotisation pour toute la famille",
      "Jusqu'à 36% d'économies sur votre budget",
    ],
    cta: "Comparer les mutuelles famille",
    lienInfos: {
      href: "/mutuelle-sante/mutuelle-famille",
      label: "En savoir plus sur la mutuelle famille",
    },
  },
  {
    id: "pas-chere",
    icon: <PiggyBank className="w-7 h-7 text-white" />,
    titre: "Mutuelle pas chère : un coût très bas, sans rogner sur l'essentiel",
    textes: [
      "À garanties comparables, le prix d'une mutuelle santé peut varier du simple au double selon les assureurs. Notre comparateur met en concurrence plus de 30 compagnies pour vous proposer des mutuelles à coût très bas : certaines formules essentielles démarrent à quelques dizaines d'euros par mois, tout en conservant une protection efficace sur les soins courants.",
      "Adapter les garanties à vos besoins réels, choisir un contrat responsable, profiter des réseaux de soins partenaires : autant de leviers que notre outil exploite pour vous faire économiser jusqu'à 40% sur votre budget santé. Le devis est gratuit et sans engagement : vous ne risquez rien à comparer.",
    ],
    avantages: [
      "Formules essentielles à très bas prix",
      "Jusqu'à 40% d'économies",
      "Devis gratuit et sans engagement",
      "Souscription en ligne en quelques minutes",
    ],
    cta: "Trouver une mutuelle pas chère",
    lienInfos: {
      href: "/mutuelle-sante/mutuelle-pas-chere",
      label: "En savoir plus sur la mutuelle pas chère",
    },
  },
];

export default function MutuellesParProfil() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 text-gray-800 space-y-10">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">
          Mutuelle senior, mutuelle famille ou mutuelle pas chère : le bon
          contrat pour chaque profil
        </h2>
        <p className="text-lg text-gray-600">
          Quel que soit votre âge ou votre situation, notre comparateur de
          mutuelles santé analyse les offres de plus de 30 assureurs pour vous
          proposer une couverture adaptée à vos besoins et à votre budget.
          Découvrez ce que notre outil peut faire pour vous.
        </p>
      </div>

      {profils.map((profil, index) => (
        <article
          key={profil.id}
          className={`rounded-xl shadow-md p-8 ${
            index % 2 === 0
              ? "bg-gradient-to-r from-blue-50 to-indigo-50"
              : "bg-white"
          }`}
        >
          <div className="flex items-start mb-5">
            <div className="bg-blue-600 p-3 rounded-full mr-4 shrink-0">
              {profil.icon}
            </div>
            <h3 className="text-2xl font-semibold text-blue-800 pt-1">
              {profil.titre}
            </h3>
          </div>

          <div className="space-y-4">
            {profil.textes.map((texte, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">
                {texte}
              </p>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            {profil.avantages.map((avantage) => (
              <div key={avantage} className="flex items-start">
                <div className="bg-green-100 p-1.5 rounded-full mr-3 shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-gray-700 text-sm">{avantage}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-7">
            <Link
              href={COMPARATEUR_URL}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              {profil.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={profil.lienInfos.href}
              className="text-blue-700 font-medium hover:underline underline-offset-4"
            >
              {profil.lienInfos.label}
            </Link>
          </div>
        </article>
      ))}

      <div className="bg-blue-800 rounded-xl shadow-md p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">
          Prêt à réduire votre budget santé ?
        </h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Obtenez votre devis mutuelle santé gratuit en moins de 2 minutes,
          sans engagement. Nos conseillers vous accompagnent pour trouver la
          couverture idéale au meilleur prix.
        </p>
        <Link
          href={COMPARATEUR_URL}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          Obtenir mon devis gratuit
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
