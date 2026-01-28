import React from "react";
import {
  FaFileContract,
  FaMoneyBillWave,
  FaInfoCircle,
  FaGavel,
  FaUsers,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaUserTie
} from "react-icons/fa";

import Image1 from "../../../public/Accueil/images/rembourssement.png";
import Image2 from "../../../public/Accueil/images/rembourssement2.png";

export default function ComprendreMonDevis() {
  return (
    <div className="text-gray-800 font-sans">
      {/* Hero avec fond dégradé */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
           <span className="bg-yellow-300 text-gray-800 px-3 py-1 rounded-md text-sm font-medium">           
            Que devez-vous savoir sur un devis de mutuelle ?
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-6 mb-6">
            Comment choisir l'offre la plus adaptée à vos besoins ?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed">
            Un La Mutuelle De France vous informe en toute transparence sur vos remboursements, garanties et tarifs.
            Il est 100% gratuit, sans engagement, et totalement adapté à votre profil.
          </p>
        </div>
      </section>

      {/* Cartes explicatives */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Les éléments clés de votre devis</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaFileContract className="text-blue-600 text-3xl" />,
              title: "Tableau des garanties",
              desc: "Remboursements pour soins, hospitalisation, optique, etc."
            },
            {
              icon: <FaMoneyBillWave className="text-green-600 text-3xl" />,
              title: "Montant des cotisations",
              desc: "Tarifs mensuels selon votre profil et les niveaux de couverture."
            },
            {
              icon: <FaInfoCircle className="text-orange-500 text-3xl" />,
              title: "Notice d'information",
              desc: "Conditions d'adhésion, exclusions, délais de carence…"
            },
            {
              icon: <FaGavel className="text-purple-600 text-3xl" />,
              title: "Mentions légales",
              desc: "Coordonnées de l'assureur, mentions réglementaires obligatoires."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="bg-blue-50 p-4 rounded-full mb-5">{item.icon}</div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Détails complémentaires + image */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-12 items-center">
          <div className="md:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold text-blue-800 mb-6">Détails complémentaires</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                  <FaFileContract className="text-blue-600 text-lg" />
                </div>
                <p><span className="font-semibold text-gray-900">Le tableau des garanties</span> vous permet de visualiser tous les remboursements.</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                  <FaInfoCircle className="text-blue-600 text-lg" />
                </div>
                <p><span className="font-semibold text-gray-900">La notice d'information</span> explique les droits et limites du contrat.</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                  <FaGavel className="text-blue-600 text-lg" />
                </div>
                <p><span className="font-semibold text-gray-900">Les coordonnées de l'assureur</span> sont toujours fournies.</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                  <FaMoneyBillWave className="text-blue-600 text-lg" />
                </div>
                <p><span className="font-semibold text-gray-900">La cotisation mensuelle</span> est affichée clairement avec tous les frais.</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-red-500 shadow-sm mt-6">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-red-600">Important :</span> les tarifs sont identiques à ceux des assureurs en direct. Comparez et économisez jusqu'à 36%
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-200 rounded-2xl rotate-3 opacity-50"></div>
              <img
                src={Image1}
                alt="Femme remboursée heureuse"
                className="relative w-full max-w-md rounded-2xl shadow-xl z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Profil + image */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-200 rounded-2xl -rotate-3 opacity-50"></div>
              <img
                src={Image2}
                alt="Homme en colère sans remboursement"
                className="relative w-full max-w-md rounded-2xl shadow-xl z-10"
              />
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold text-blue-800 mb-6">
              Pourquoi vos informations personnelles sont-elles demandées ?
            </h3>
            <p className="text-gray-700">Pour vous proposer une offre personnalisée, nous avons besoin de :</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <FaUsers className="text-indigo-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Nombre d'assurés</span>
                </div>
                <p className="text-sm text-gray-600">Individuel, couple, ou famille.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <FaBirthdayCake className="text-indigo-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Âge</span>
                </div>
                <p className="text-sm text-gray-600">Les tarifs varient selon l'âge.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <FaMapMarkerAlt className="text-indigo-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Département</span>
                </div>
                <p className="text-sm text-gray-600">Les tarifs peuvent varier localement.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <FaUserTie className="text-indigo-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Régime social</span>
                </div>
                <p className="text-sm text-gray-600">Salarié, indépendant, etc.</p>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
              <p className="text-sm text-blue-800">
                Ces informations sont <span className="font-semibold">100% confidentielles</span> et ne servent qu'à affiner le devis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coordonnées */}
      <section className="bg-gradient-to-r from-blue-400 to-indigo-200 px-4 py-16 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">Pourquoi demandons-nous vos coordonnées ?</h3>
          <p className="text-lg opacity-90 leading-relaxed">
            Nom, prénom, email et téléphone nous permettent de vous envoyer un devis personnalisé. 
            Aucun engagement, juste les meilleures offres santé adaptées à vous.
          </p>
        </div>
      </section>
    </div>
  );
}