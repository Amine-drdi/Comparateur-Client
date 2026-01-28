import React from "react";

interface TarificationResult {
  product: {
    productCode: string;
  };
  guaranteeCode: string;
  levelCode?: string;
  insured: string;
  contribution: {
    contributionAmount: number;
    startDate: string;
    endDate: string;
  };
}

interface TarificationResultsProps {
  results: TarificationResult[];
}

const TarificationResults: React.FC<TarificationResultsProps> = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-1 gap-6">
      {results.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* En-tête carte */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {item.product.productCode} - {item.guaranteeCode === 'MaladieChirurgie' ? 'Maladie / Chirurgie' : 'Renfort Bien-Être'}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Personne {item.insured.split('-')[1]} – Niveau {item.levelCode || '1'}
            </p>
            
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">
                {item.contribution.contributionAmount.toFixed(2)}€
              </p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                Souscrire en ligne
              </button>
            </div>
          </div>

          {/* Corps carte */}
          <div className="p-4 bg-gray-50">
            <p className="text-sm text-gray-600">
              Cotisation mensuelle du {item.contribution.startDate} au {item.contribution.endDate}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TarificationResults;