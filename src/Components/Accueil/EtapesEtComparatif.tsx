import { FileText, SearchCheck, HandCoins } from "lucide-react";

export default function EtapesEtComparatif() {
  const steps = [
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Décrivez votre besoin",
      text: "Remplissez un formulaire rapide en quelques clics.",
    },
    {
      icon: <SearchCheck className="w-8 h-8 text-blue-600" />,
      title: "Comparez les offres",
      text: "Obtenez une sélection des meilleures assurances.",
    },
    {
      icon: <HandCoins className="w-8 h-8 text-blue-600" />,
      title: "Économisez de l'argent",
      text: "Demandez vos devis en un clic.",
    },
  ];

  return (
    <section className="bg-blue-50 py-6 px-6">
      <div className="max-w-4xl mx-auto text-center">
            <span className="bg-yellow-300 text-gray-800 px-3 py-1 rounded-md text-sm font-medium">
              Comment ça marche ?
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4">
              Comment comparer avec Le Comparateur de mutuelle ?
            </h2>
            <p className="text-gray-600 mt-2">
            En quelques minutes, notre comparateur vous aide à choisir la meilleure mutuelle santé selon vos besoins et votre budget. Profitez d’une couverture optimale tout en maîtrisant vos dépenses
            </p>
          </div>

      {/* Étapes avec flèches */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-10">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* Carte étape */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center w-72">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{step.text}</p>
            </div>

            {/* Flèche, sauf pour le dernier */}
            {index !== steps.length - 1 && (
              <div className="hidden md:block">
                <svg
                  className="w-10 h-10 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bloc explicatif final */}
<div className="max-w-4xl mx-auto mt-20 bg-white rounded-xl shadow-md p-8 text-center">
  <h3 className="text-2xl font-bold text-blue-600 mb-4">💡 Pourquoi utiliser notre comparateur ?</h3>
  <p className="text-gray-700 text-base leading-relaxed">
    Complétez simplement votre profil en moins de 2 minutes pour recevoir des devis personnalisés,
    adaptés à votre situation et à votre budget.
  </p>
  <p className="text-gray-700 text-base leading-relaxed mt-4">
    Notre outil analyse en temps réel les offres de plus de <strong>30 assureurs et courtiers</strong>,
    en toute impartialité. Les garanties et tarifs sont clairs, transparents, et pensés pour vous.
  </p>
  <p className="text-gray-700 text-base leading-relaxed mt-4">
    Comparez, choisissez, puis <strong>économisez jusqu’à 36&nbsp;%</strong> sur votre contrat mutuelle.
    Vous pouvez souscrire en ligne ou contacter l’assureur à tout moment.
  </p>
</div>

    </section>
  );
}
