import React, { useState } from "react";
import myImage from '../../assets/optique/images/optique.png';

export default function MutuelleDentaireBanner() {

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value) {
      window.location.href = event.target.value;
    }
  };
  return (
    <div className="bg-blue-100 w-full py-20 flex flex-col md:flex-row items-center justify-between">
      <div className="max-w-7xl mx-auto px-4 w-full flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Trouvez les meilleurs remboursements pour vos soins dentaires
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <select className="p-3 rounded-lg border border-gray-300 w-full md:w-auto" onChange={handleChange} value={selectedOption}>
              <option value="">Qui souhaitez-vous assurer ?</option>
              <option value="/compare">Vous</option>
              <option value="/compare">Vous et vos enfants</option>
              <option value="/compare">Vous et votre conjoint</option>
              <option value="/compare">Vous, votre conjoint et vos enfants</option>
            </select>
            <a href="/compare" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow text-center">
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
            <span className="ml-2 font-bold">4.1</span>
            <span className="ml-2">(9249 avis)</span>
          </div>
        </div>
        <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center">
          <img src={myImage} alt="Nurse Character" className="w-64 md:w-96" />
        </div>
      </div>
    </div>
  );
}