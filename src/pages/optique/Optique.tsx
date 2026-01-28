import React from 'react';
import MutuelleOptiqueBanner from '../../Components/optique/MutuelleOptiqueBanner';
import QuestionsSection from '../../Components/optique/QuestionsSection';
import AssuranceBanner from '../../Components/optique/AssuranceBanner';
//import Footer from '../../Components/mutuelle-entreprises/Footer';
import InsuranceBrands from '../../Components/optique/InsuranceBrands';
import Guides from '../../Components/optique/Guide/Guides';

export default function Optique() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Bannière en pleine largeur */}
      <div className="w-full">
        <MutuelleOptiqueBanner />
      </div>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <InsuranceBrands />
        <QuestionsSection />
        <Guides />
        
        {/* Section supplémentaire */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Pourquoi choisir notre mutuelle optique ?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-xl mb-2">👓</div>
              <h3 className="font-bold text-lg text-blue-500 mb-2">Remboursements optimisés</h3>
              <p className="text-gray-600">Des garanties adaptées pour vos équipements optiques avec des remboursements avantageux.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-xl mb-2">💰</div>
              <h3 className="font-bold text-lg text-blue-500 mb-2">Tarifs compétitifs</h3>
              <p className="text-gray-600">Des offres spécialement conçues pour les besoins visuels à des prix avantageux.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-xl  mb-2">⚡</div>
              <h3 className="font-bold text-lg text-blue-500 mb-2">Prise en charge rapide</h3>
              <p className="text-gray-600">Un traitement accéléré de vos demandes de remboursement pour vos équipements optiques.</p>
            </div>
          </div>
        </section>
      </main>
      
      <AssuranceBanner />
      {/* <Footer /> */}
    </div>
  );
}