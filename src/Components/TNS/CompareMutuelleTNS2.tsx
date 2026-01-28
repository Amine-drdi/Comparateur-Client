import React from 'react';
import CompareBanner from './CompareBanner';

export default function CompareMutuelleTNS2() {
  return (
       <section className="bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
      
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
            Pourquoi utiliser le comparateur de mutuelles TNS sur La Mutuelle De France ?
          </h2>
          <h3 className="text-xl font-semibold text-blue-900 mb-6">
            Comparer avec La Mutuelle De France, c'est gratuit
          </h3>
           <div className="py-8 ">
             <div className="flex-1 flex bg-blue-100 justify-center ">
          <img
            src="/src/assets/TNS/images/TNS3.png" // <-- à remplacer avec ton image du personnage
            alt="La Mutuelle De France comparateur"
            className="w-64 md:w-80"
          />
        </div>
        </div>

          {/* Bloc Explication */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              0 commission ou frais cachés
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Le comparateur n’applique aucun frais supplémentaires aux tarifs affichés. 
              Le prix que vous voyez affiché, c’est celui que vous paierez à la fin. 
              Aucun partenaire n’est mis en avant. L’offre qui apparaît en premier dans 
              les résultats est toujours la moins chère.
            </p>
          </div>

          {/* Bloc Fonctionnement */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              Comment le comparateur se rémunère ?
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Le comparateur ne prend aucune commission, ni frais cachés. 
              Ce sont les partenaires qui rémunèrent le service lorsqu’un 
              contrat est souscrit, sans aucun impact sur votre budget.
            </p>

            
          </div>

         <CompareBanner/>
        </div>


     

    </section>
  );
}
