// 📁 src/components/WarrantiesDisplay.tsx
import React, { useState } from 'react';

interface WarrantyItem {
  id: string;
  libelle: string;
  valeur: string;
  pos?: string;
  garanties?: Record<string, {
    id: string;
    libelle: string;
    valeur: string;
    delai_attente?: string;
    rembourssement_sup?: string;
    pos?: string;
  }>;
  delai_attente?: string;
  rembourssement_sup?: string;
}

interface WarrantiesDisplayProps {
  warranties: Record<string, WarrantyItem>;
  provider: string;
}

const WarrantiesDisplay: React.FC<WarrantiesDisplayProps> = ({ warranties, provider }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyIncluded, setShowOnlyIncluded] = useState(false);

  // Convertir l'objet en tableau et trier par position
  const warrantyArray = Object.values(warranties)
    .sort((a, b) => parseInt(a.pos || '999') - parseInt(b.pos || '999'));

  // Filtrer les garanties
  const filteredWarranties = warrantyArray.filter(warranty => {
    const matchesSearch = warranty.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warranty.valeur.toLowerCase().includes(searchTerm.toLowerCase());
    
    const isIncluded = warranty.valeur !== 'Néant' && warranty.valeur !== 'Non';
    
    if (showOnlyIncluded) {
      return matchesSearch && isIncluded;
    }
    
    return matchesSearch;
  });

  // Statistiques
  const totalWarranties = warrantyArray.length;
  const includedWarranties = warrantyArray.filter(w => 
    w.valeur !== 'Néant' && w.valeur !== 'Non'
  ).length;
  const excludedWarranties = totalWarranties - includedWarranties;

  // Toggle section expansion
  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Rendu d'une sous-garantie
  const renderSubWarranty = (subWarranty: any, level: number = 0) => {
    const isIncluded = subWarranty.valeur && subWarranty.valeur !== 'Néant' && subWarranty.valeur !== 'Non';
    
    return (
      <div 
        key={subWarranty.id} 
        className={`ml-${level * 4} mt-2 p-3 rounded-lg border ${
          isIncluded 
            ? 'border-green-200 bg-green-50/30' 
            : 'border-red-200 bg-red-50/30'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-start gap-2">
              <div className={`w-6 h-6 rounded flex items-center justify-center mt-1 ${
                isIncluded ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {subWarranty.pos || '•'}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {subWarranty.libelle}
                </h4>
                {subWarranty.valeur && (
                  <div className={`mt-1 font-medium ${isIncluded ? 'text-green-600' : 'text-red-600'}`}>
                    {subWarranty.valeur}
                  </div>
                )}
                {(subWarranty.delai_attente || subWarranty.rembourssement_sup) && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {subWarranty.delai_attente && subWarranty.delai_attente !== '0' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                        ⏱️ Délai: {subWarranty.delai_attente}
                      </span>
                    )}
                    {subWarranty.rembourssement_sup && subWarranty.rembourssement_sup !== '0' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
                        💰 Remb. sup: {subWarranty.rembourssement_sup}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
            isIncluded 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {isIncluded ? '✓ Incluse' : '✗ Non incluse'}
          </span>
        </div>
      </div>
    );
  };

  // Rendu d'une garantie principale
  const renderMainWarranty = (warranty: WarrantyItem, index: number) => {
    const hasSubWarranties = warranty.garanties && Object.keys(warranty.garanties).length > 0;
    const isExpanded = expandedSections[warranty.id];
    const isIncluded = warranty.valeur !== 'Néant' && warranty.valeur !== 'Non';
    
    // Trier les sous-garanties par position
    const subWarranties = hasSubWarranties 
      ? Object.values(warranty.garanties!)
          .sort((a, b) => parseInt(a.pos || '999') - parseInt(b.pos || '999'))
      : [];

    return (
      <div 
        key={warranty.id} 
        className={`rounded-xl border transition-all duration-200 ${
          isIncluded 
            ? 'border-green-200 bg-green-50/20 hover:bg-green-50/40' 
            : 'border-red-200 bg-red-50/20 hover:bg-red-50/40'
        }`}
      >
        <div className="p-4">
          {/* En-tête de la garantie */}
          <div 
            className="flex items-start justify-between cursor-pointer"
            onClick={() => hasSubWarranties && toggleSection(warranty.id)}
          >
            <div className="flex items-start gap-3 flex-1">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mt-1 ${
                isIncluded 
                  ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-700' 
                  : 'bg-gradient-to-br from-red-100 to-red-200 text-red-700'
              }`}>
                <span className="font-bold">{warranty.pos || index + 1}</span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {warranty.libelle}
                </h3>
                
                {warranty.valeur && (
                  <div className={`mt-2 text-lg font-bold ${isIncluded ? 'text-green-600' : 'text-red-600'}`}>
                    {warranty.valeur}
                  </div>
                )}
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {hasSubWarranties && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                      📋 {subWarranties.length} sous-garantie{subWarranties.length > 1 ? 's' : ''}
                    </span>
                  )}
                  {warranty.delai_attente && warranty.delai_attente !== '0' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                      ⏱️ {warranty.delai_attente}
                    </span>
                  )}
                  {provider === 'Néoliane' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700">
                      🏢 Néoliane
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2 ml-4">
              <span className={`px-4 py-2 rounded-full font-medium ${
                isIncluded 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {isIncluded ? '✓ GARANTIE INCLUSE' : '✗ NON INCLUSE'}
              </span>
              
              {hasSubWarranties && (
                <button className="text-gray-500 hover:text-gray-700">
                  <svg 
                    className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Sous-garanties (si développé) */}
          {hasSubWarranties && isExpanded && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-md font-semibold text-gray-700 mb-4">
                Détail des sous-garanties
              </h4>
              <div className="space-y-3">
                {subWarranties.map(subWarranty => renderSubWarranty(subWarranty))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* En-tête avec statistiques */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 mb-8 shadow-sm border">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              📋 Garanties du contrat
            </h2>
            <p className="text-gray-600">
              Détail complet des garanties incluses et non incluses dans votre offre
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{includedWarranties}</div>
                <div className="text-sm text-gray-500">Garanties incluses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{excludedWarranties}</div>
                <div className="text-sm text-gray-500">Non incluses</div>
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                style={{ width: `${(includedWarranties / totalWarranties) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 text-center mt-1">
              {Math.round((includedWarranties / totalWarranties) * 100)}% de couverture
            </div>
          </div>
        </div>
      </div>

      {/* Barre de contrôle */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une garantie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg 
                className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowOnlyIncluded(!showOnlyIncluded)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showOnlyIncluded
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showOnlyIncluded ? '✓ Voir uniquement les garanties incluses' : 'Voir toutes'}
            </button>
            
            <button
              onClick={() => {
                const allExpanded: Record<string, boolean> = {};
                warrantyArray.forEach(w => {
                  if (w.garanties) allExpanded[w.id] = true;
                });
                setExpandedSections(allExpanded);
              }}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200"
            >
              Développer tout
            </button>
            
            <button
              onClick={() => setExpandedSections({})}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
            >
              Réduire tout
            </button>
          </div>
        </div>
      </div>

      {/* Liste des garanties */}
      {filteredWarranties.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">Aucune garantie trouvée</h3>
          <p className="text-gray-500">
            Essayez de modifier votre recherche ou affichez toutes les garanties
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWarranties.map((warranty, index) => renderMainWarranty(warranty, index))}
          </div>
          
          {/* Résumé */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Résumé des garanties</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    ✓
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{includedWarranties}</div>
                    <div className="text-sm text-gray-600">Garanties incluses</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Ces garanties sont activées dans votre contrat
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    ✗
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{excludedWarranties}</div>
                    <div className="text-sm text-gray-600">Non incluses</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Ces garanties ne sont pas comprises dans cette formule
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    📋
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{totalWarranties}</div>
                    <div className="text-sm text-gray-600">Total garanties</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Nombre total de garanties analysées
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Légende */}
      <div className="mt-8 bg-gray-50 rounded-xl p-4 border">
        <h4 className="font-semibold text-gray-700 mb-3">📖 Comment lire les garanties</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center text-green-600">
              ✓
            </div>
            <div>
              <div className="font-medium text-gray-800">Garantie incluse</div>
              <div className="text-sm text-gray-600">Activée dans votre contrat</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center text-red-600">
              ✗
            </div>
            <div>
              <div className="font-medium text-gray-800">Non incluse</div>
              <div className="text-sm text-gray-600">Non comprise dans cette formule</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-600">
              ⏱️
            </div>
            <div>
              <div className="font-medium text-gray-800">Délai d'attente</div>
              <div className="text-sm text-gray-600">Période avant activation</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-yellow-100 flex items-center justify-center text-yellow-600">
              📋
            </div>
            <div>
              <div className="font-medium text-gray-800">Sous-garanties</div>
              <div className="text-sm text-gray-600">Détail des couvertures</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantiesDisplay;