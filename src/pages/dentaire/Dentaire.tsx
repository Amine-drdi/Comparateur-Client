
import React  from 'react';
import MutuelleDentaireBanner from '../../Components/dentaire/MutuelleDentaireBanner';
import QuestionsSection  from '../../Components/dentaire/QuestionsSection'
import AssuranceBanner from '../../Components/optique/AssuranceBanner';
//import  Footer from '../../Components/mutuelle-entreprises/Footer';
import InsuranceBrands from '../../Components/dentaire/InsuranceBrands'
import Guides from '../../Components/dentaire/Guide/Guides';
import QuestionsChoixMutuelle from '../../Components/dentaire/QuestionsChoixMutuelle'
import BanniereDevis from '../../Components/dentaire/BanniereDevis';
import FaqDentaires from '../../Components/dentaire/FaqDentaires';
import EnSavoirPlusDentaire from '../../Components/dentaire/EnSavoirPlusDentaire';
export default function denatire() {
  return (


<div className="min-h-screen bg-gray-100">
      {/* Bannière en pleine largeur */}
      <div className="w-full">
        <MutuelleDentaireBanner/>
      </div>
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Notre bannière de mutuelle entreprise */}
        
        <InsuranceBrands/>
        <QuestionsSection/>
        <QuestionsChoixMutuelle/>
        <BanniereDevis/>
        <FaqDentaires/>
        <EnSavoirPlusDentaire/>
        <Guides/>
        {/* Section supplémentaire */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Pourquoi choisir notre mutuelle dentaire ?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-xl mb-2">🛡️</div>
              <h3 className="font-bold text-lg mb-2 text-blue-500">Protection complète</h3>
              <p className="text-gray-600">Des garanties adaptées aux besoins spécifiques de votre entreprise et de vos employés.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-xl mb-2">💰</div>
              <h3 className="font-bold text-lg mb-2 text-blue-500">Tarifs avantageux</h3>
              <p className="text-gray-600">Des offres compétitives avec un excellent rapport qualité-prix pour tous les budgets.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-xl mb-2">⚡</div>
              <h3 className="font-bold text-lg mb-2 text-blue-500">Prise en charge rapide</h3>
              <p className="text-gray-600">Un traitement efficace des dossiers et un remboursement accéléré de vos frais de santé.</p>
            </div>
          </div>
        </section>
      </main>
      <AssuranceBanner/>
   
   {/*<Footer/>*/}
    </div>
  );
}