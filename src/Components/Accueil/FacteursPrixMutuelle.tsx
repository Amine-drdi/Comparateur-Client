import React from "react";

export default function FacteursPrixMutuelle() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800 space-y-12">
      {/* Titre principal */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">
          Prix des mutuelles : quels éléments influencent le coût ?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Le tarif d'une complémentaire santé dépend de nombreux critères liés à votre profil et aux garanties sélectionnées.
          Comprendre ces facteurs vous aide à mieux choisir votre mutuelle et à optimiser votre budget santé.
        </p>
      </section>

      {/* Facteurs */}
      <section className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-2xl font-semibold mb-6 text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Les principaux critères qui influencent le tarif d'une mutuelle
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
            <div className="flex items-start mb-3">
              <div className="bg-blue-600 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg">L'âge de l'assuré</h4>
            </div>
            <p className="text-gray-700 ml-11">Plus on avance en âge, plus les besoins médicaux augmentent, ce qui impacte directement les tarifs, notamment sur les postes comme les soins dentaires, optiques ou l'hospitalisation.</p>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
            <div className="flex items-start mb-3">
              <div className="bg-blue-600 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg">Le profil et la situation professionnelle</h4>
            </div>
            <p className="text-gray-700 ml-11">Un étudiant paiera généralement moins qu'un salarié. Un travailleur indépendant peut bénéficier d'offres spécifiques. Les besoins varient aussi selon la profession, influençant le tarif.</p>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
            <div className="flex items-start mb-3">
              <div className="bg-blue-600 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg">Le niveau de garanties choisi</h4>
            </div>
            <p className="text-gray-700 ml-11">Plus vous souhaitez un remboursement élevé, plus le prix augmente.</p>
            <ul className="list-disc list-inside mt-2 ml-11 space-y-1 text-sm text-gray-600">
              <li>Une mutuelle basique propose un remboursement limité.</li>
              <li>Une couverture renforcée (optique, dentaire, hospitalisation) augmente le tarif.</li>
              <li>Les soins spécifiques (médecine douce, implant auditif) coûtent plus cher.</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
            <div className="flex items-start mb-3">
              <div className="bg-blue-600 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg">La zone géographique</h4>
            </div>
            <p className="text-gray-700 ml-11">Les tarifs peuvent varier selon votre département. Certaines zones sont plus chères en raison du niveau des honoraires pratiqués par les professionnels de santé.</p>
          </div>
        </div>
      </section>

      {/* Réduire le prix */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-8">
        <h3 className="text-2xl font-semibold mb-6 text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Comment réduire le prix d'une mutuelle sans négliger la qualité ?
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h4 className="font-semibold text-blue-700 mb-2">Adaptez vos garanties à vos besoins</h4>
            <p className="text-gray-700">Inutile de payer pour des options dont vous n'avez pas l'utilité (ex: couverture optique renforcée si vous ne portez pas de lunettes).</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h4 className="font-semibold text-blue-700 mb-2">Choisissez une mutuelle responsable</h4>
            <p className="text-gray-700">Ces contrats offrent un bon compromis entre prix et réglementation avantageuse.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h4 className="font-semibold text-blue-700 mb-2">Optez pour les réseaux de soins</h4>
            <p className="text-gray-700">Certaines mutuelles négocient des tarifs avantageux avec des professionnels partenaires.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h4 className="font-semibold text-blue-700 mb-2">Comparez plusieurs offres</h4>
            <p className="text-gray-700">Mettez en concurrence les assureurs pour trouver le meilleur rapport qualité/prix.</p>
          </div>
        </div>
      </section>

      {/* Avantages du comparateur */}
      <section className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-2xl font-semibold mb-6 text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Pourquoi utiliser notre comparateur de mutuelles ?
        </h3>
        <p className="mb-6 text-gray-600">Voici les avantages offerts par notre outil de simulation :</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-semibold">Gratuit et sans engagement</h4>
            </div>
            <p className="text-gray-700 text-sm">Comparez les offres librement, sans pression ni inscription obligatoire.</p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 className="font-semibold">Large choix de contrats</h4>
            </div>
            <p className="text-gray-700 text-sm">Accédez à une large sélection de mutuelles adaptées à différents profils.</p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold">Des informations claires</h4>
            </div>
            <p className="text-gray-700 text-sm">Consultez facilement les garanties, tarifs et avis.</p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold">Gain de temps</h4>
            </div>
            <p className="text-gray-700 text-sm">Tout se fait en ligne, sans avoir besoin de démarcher chaque assureur.</p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold">Accompagnement personnalisé</h4>
            </div>
            <p className="text-gray-700 text-sm">Recevez des conseils pour sélectionner la meilleure couverture selon vos besoins.</p>
          </div>
        </div>
      </section>
    </div>
  );
}