import React from 'react';
import image from "../../assets/expatries/images/pexels-gustavo-fring-3885589-removebg-preview.png"
const ExpatriateMutuelleBanner: React.FC = () => {


  return (
    <div className="bg-blue-100 w-full py-20 flex flex-col md:flex-row items-center justify-between">
      <div className="max-w-7xl mx-auto px-4 w-full flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Mutuelle santé expatriés
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Choisissez la meilleure mutuelle pour vos frais de santé à l'étranger.
          </h2>
            <a href="/compare" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow text-center">
              Comparer en 2 minutes
            </a>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            <div className="flex text-yellow-400 text-xl">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span className="text-gray-400">⭐</span>
            </div>
            <span className="ml-2 font-bold">4.6</span>
            <span className="ml-2">(8223 avis)</span>
          </div>
        </div>
        <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center">
          <img src={image} alt="Nurse Character" className="w-52 md:w-72" />
        </div>
      </div>
    </div>
  );
};

export default ExpatriateMutuelleBanner;
