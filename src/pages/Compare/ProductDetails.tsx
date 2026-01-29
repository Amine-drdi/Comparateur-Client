import React, { useState } from 'react';
import LogoNeoliane from "../../../public/Image/Partenaire/Neo.webp"
import LogoCegema from "../../../public/Image/Partenaire/LogoCegema-768x269-1.png"
import LogoApril from "../../../public/Image/Partenaire/april.png"
import Image from 'next/image';

interface PricingResult {
  provider: 'Néoliane' | 'Cegema' | 'April';
  productName?: string;
  monthlyPrice?: number;
  annualPrice?: number;
  formulaName?: string;
  effectiveDate?: string;
  warranties?: any[];
  warrantiesObject?: any;
  warrantiesDetailed?: any; // Pour les garanties détaillées April
  details?: any;
  fees?: any;
  rawData?: any;
  
  // Propriétés Néoliane
  nom?: string;
  montant?: number;
  formule_label?: string;
  dateEffetReelle?: string;
  is_responsable?: boolean;
  type_assurance?: string;
  fraisDetails?: any;
  
  // Propriétés Cegema
  tarifLabel?: string;
  price?: number;
  productCode?: string;
  
  // Propriétés April
  productTitle?: string;
  productCodeApril?: string;
  guaranteeDetails?: any[];
  
  [key: string]: any;
}

interface PricingResultsProps {
  results: PricingResult[];
}

const PricingResults: React.FC<PricingResultsProps> = ({ results }) => {
  const [selectedProduct, setSelectedProduct] = useState<PricingResult | null>(null);
  const [filter, setFilter] = useState<'all' | 'neoliane' | 'cegema' | 'april'>('all');

  // Protection maximale
  if (!results || !Array.isArray(results)) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-red-400">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5" />
          </svg>
        </div>
        <p className="text-red-600 font-medium">Erreur: Données invalides reçues</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 text-gray-400">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">Aucun résultat trouvé</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Aucune offre ne correspond à vos critères. Essayez de modifier vos paramètres de recherche.
        </p>
      </div>
    );
  }

  // Filtrer selon l'assureur sélectionné
  const filteredResults = filter === 'all' 
    ? results 
    : results.filter(r => r.provider === (
      filter === 'neoliane' ? 'Néoliane' : 
      filter === 'cegema' ? 'Cegema' : 'April'
    ));

  // Statistiques par assureur
  const neolianeResults = results.filter(r => r.provider === 'Néoliane');
  const cegemaResults = results.filter(r => r.provider === 'Cegema');
  const aprilResults = results.filter(r => r.provider === 'April');

  // Trier par prix
  const sortedResults = [...filteredResults]
    .filter(r => r && typeof r === 'object')
    .sort((a, b) => {
      const priceA = a.monthlyPrice || a.montant || a.price || 0;
      const priceB = b.monthlyPrice || b.montant || b.price || 0;
      return priceA - priceB;
    });

  // Calculer les statistiques
  const cheapestProduct = sortedResults[0];
  const avgPrice = sortedResults.length > 0 
    ? sortedResults.reduce((sum, r) => sum + (r.monthlyPrice || r.montant || r.price || 0), 0) / sortedResults.length 
    : 0;

  // FONCTION PRINCIPALE - AFFICHER LES DONNÉES ET OUVIR LES DÉTAILS
const handleViewDetails = async (product: PricingResult, index: number) => {
  console.log('🎯 PRODUIT SÉLECTIONNÉ POUR DÉTAILS', product);
  
  // ⭐⭐ CORRECTION CRITIQUE : Récupérer les garanties April si manquantes
  let warrantiesDetailed = product.warrantiesDetailed;
  
  if (product.provider === 'April' && !warrantiesDetailed && product.details) {
    console.log('🔄 Tentative de récupération des garanties April...');
    
    try {
      // Appeler votre API pour récupérer les garanties April
      const response = await fetch('http://localhost:5000/api/comparison/april/warranties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productData: product
        })
      });
      
      const result = await response.json();
      
      if (result.success && result.warranties) {
        console.log('✅ Garanties April récupérées:', result.warranties.postes?.length);
        warrantiesDetailed = result.warranties;
      } else {
        console.log('⚠️ Échec récupération garanties:', result.error);
      }
    } catch (error) {
      console.error('❌ Erreur API garanties:', error);
    }
  }
  
  // Préparer les données COMPLÈTES
  const fullProductData = {
    provider: product.provider,
    productName: product.productName || product.nom || product.productTitle || 'Produit',
    monthlyPrice: product.monthlyPrice || product.montant || product.price || 0,
    formulaName: product.formulaName || product.formule_label || product.tarifLabel || 'Formule',
    effectiveDate: product.effectiveDate || product.dateEffetReelle || 'Immédiate',
    
    // Garanties Néoliane
    warranties: product.provider === 'Néoliane' 
      ? (Array.isArray(product.warranty || product.warranties) 
          ? product.warranty || product.warranties 
          : Object.values((product.warranty || product.warranties) || {}))
      : [],
    
    // ⭐⭐ GARANTIES APRIL (maintenant avec la valeur récupérée)
    warrantiesDetailed: warrantiesDetailed,
    
    details: product.details || {},
    fees: product.fees || { total: 0, association: 0, assistance: 0 },
    rawData: product.rawData || {},
    productCode: product.productCode,
    productTitle: product.productTitle,
    is_responsable: product.is_responsable || false,
    type_assurance: product.type_assurance || 'Non spécifié'
  };

  console.log('📦 Données complètes avec garanties:', {
    nom: fullProductData.productName,
    prix: fullProductData.monthlyPrice,
    provider: fullProductData.provider,
    garantiesDetaillees: fullProductData.warrantiesDetailed ? 'OUI' : 'NON'
  });

  // 1. Créer une clé UNIQUE
  const storageKey = `product_details_${product.provider}_${Date.now()}_${index}`;
  
  // 2. Sauvegarder dans localStorage AVANT d'ouvrir la fenêtre
  localStorage.setItem(storageKey, JSON.stringify({
    data: fullProductData,
    timestamp: Date.now(),
    source: 'PricingResults'
  }));
  
  console.log('💾 Sauvegardé avec clé:', storageKey);
  console.log('🔍 Vérification localStorage:', localStorage.getItem(storageKey) ? 'OK' : 'ÉCHEC');

  // 3. Préparer l'URL AVEC la clé
  const urlParams = new URLSearchParams();
  
  urlParams.append('p', product.provider);
  urlParams.append('n', encodeURIComponent(
    fullProductData.productName.substring(0, 50)
  ));
  urlParams.append('pr', fullProductData.monthlyPrice.toString());
  urlParams.append('f', encodeURIComponent(
    fullProductData.formulaName.substring(0, 30)
  ));
  
  if (fullProductData.effectiveDate) {
    urlParams.append('d', fullProductData.effectiveDate);
  }
  
  // AJOUTER LA CLÉ DANS L'URL
  urlParams.append('storageKey', storageKey);
  
  const detailsUrl = `/product-details?${urlParams.toString()}`;
  console.log('🌐 URL COMPLÈTE:', detailsUrl);

  // 4. Ouvrir la fenêtre
  const newWindow = window.open(detailsUrl, '_blank', 'width=1200,height=800,scrollbars=yes');
  
  // 5. Nettoyer après 5 minutes
  setTimeout(() => {
    localStorage.removeItem(storageKey);
    console.log('🗑️ Nettoyage localStorage clé:', storageKey);
  }, 5 * 60 * 1000);

  // 6. Envoyer aussi via postMessage
  if (newWindow) {
    setTimeout(() => {
      try {
        newWindow.postMessage({ 
          type: 'PRODUCT_DATA', 
          data: fullProductData 
        }, '*');
        console.log('📨 Données envoyées via postMessage');
      } catch (error) {
        console.warn('⚠️ postMessage échoué:', error);
      }
    }, 500);
  }
};

  return (
    <div className="mt-12">
      {/* En-tête avec statistiques */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {sortedResults.length} offres trouvées
        </h2>
        
        {/* Filtres par assureur */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tous ({results.length})
          </button>
          <button
            onClick={() => setFilter('neoliane')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              filter === 'neoliane' 
                ? 'bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg' 
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            Néoliane ({neolianeResults.length})
          </button>
          <button
            onClick={() => setFilter('cegema')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              filter === 'cegema' 
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-800 text-white shadow-lg' 
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Cegema ({cegemaResults.length})
          </button>
          <button
            onClick={() => setFilter('april')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              filter === 'april' 
                ? 'bg-gradient-to-r from-orange-600 to-orange-800 text-white shadow-lg' 
                : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
            }`}
          >
            April ({aprilResults.length})
          </button>
        </div>

        {sortedResults.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span>Prix le plus bas: <strong>{cheapestProduct?.monthlyPrice?.toFixed(2) || '0.00'} €/mois</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Moyenne: <strong>{avgPrice.toFixed(2)} €/mois</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Grille des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedResults.map((result, index) => {
          const displayName = result.productName || result.nom || result.tarifLabel || result.productTitle || `Produit ${index + 1}`;
          const displayPrice = result.monthlyPrice || result.montant || result.price || 0;
          const displayFormula = result.formulaName || result.formule_label || result.tarifLabel || result.productTitle || 'Formule';
          
          const isCegema = result.provider === 'Cegema';
          const isApril = result.provider === 'April';
          const isNeoliane = result.provider === 'Néoliane';
          
          // Déterminer les couleurs selon l'assureur
          let colors = {
            primary: 'blue',
            secondary: 'blue-700',
            accent: 'blue-600',
            bgHeader: 'bg-gradient-to-r from-blue-700 to-blue-900',
            bgLight: 'bg-blue-50',
            text: 'text-blue-700',
            border: 'border-blue-200',
            button: 'from-blue-600 to-blue-800',
            buttonHover: 'from-blue-700 to-blue-900',
            outline: 'border-blue-300 text-blue-700 hover:bg-blue-50'
          };

          if (isCegema) {
            colors = {
              primary: 'emerald',
              secondary: 'emerald-700',
              accent: 'emerald-600',
              bgHeader: 'bg-gradient-to-r from-emerald-600 to-emerald-800',
              bgLight: 'bg-emerald-50',
              text: 'text-emerald-700',
              border: 'border-emerald-200',
              button: 'from-emerald-600 to-emerald-800',
              buttonHover: 'from-emerald-700 to-emerald-900',
              outline: 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
            };
          } else if (isApril) {
            colors = {
              primary: 'orange',
              secondary: 'orange-700',
              accent: 'orange-600',
              bgHeader: 'bg-gradient-to-r from-orange-600 to-orange-800',
              bgLight: 'bg-orange-50',
              text: 'text-orange-700',
              border: 'border-orange-200',
              button: 'from-orange-600 to-orange-800',
              buttonHover: 'from-orange-700 to-orange-900',
              outline: 'border-orange-300 text-orange-700 hover:bg-orange-50'
            };
          }
          
          // Gestion des garanties par assureur
          let includedWarranties = 'Non détaillées';
          let warrantyCount = 0;
          let hasDetailedWarranties = false;

          if (isNeoliane) {
            // CORRECTION : utiliser result.warranty (SINGULIER)
            const warranties = result.warranty || result.warranties || [];
            const warrantyArray = Array.isArray(warranties) ? warranties : Object.values(warranties);
            warrantyCount = warrantyArray.length;
            const includedCount = warrantyArray.filter((w: any) => 
              w.valeur !== 'Néant' && w.valeur !== 'Non'
            ).length;
            includedWarranties = `${includedCount}/${warrantyCount}`;
            hasDetailedWarranties = warrantyCount > 0;
          } else if (isApril && result.details?.guarantees) {
            warrantyCount = result.details.guarantees.length;
            includedWarranties = warrantyCount.toString();
            // Vérifier si on a des garanties détaillées
            hasDetailedWarranties = !!result.warrantiesDetailed;
          } else if (isCegema) {
            includedWarranties = 'Contacter un conseiller';
          }
          
          const isCheapest = index === 0;
          const isResponsable = result.is_responsable === true || result.details?.isResponsable === true;

          return (
            <div
              key={index}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                isCheapest 
                  ? `border-${colors.accent} shadow-lg shadow-${colors.primary}-100` 
                  : `border-${colors.border} hover:border-${colors.primary}-300`
              }`}
            >
              {/* En-tête de la carte */}
              <div className={`p-6 ${colors.bgHeader}`}>
                <div className="flex justify-between items-start">
                  <div>
                    {/* Logo de l'assureur */}
                    <div className="mb-3">
                      <div className="w-20 h-16 bg-white rounded-xl p-3 flex items-center justify-center shadow-md">
                        {isCegema ? (
                          <Image
                            src={LogoCegema} 
                            alt="Logo Cegema" 
                            className="w-full h-full object-contain"
                          />
                        ) : isApril ? (
                          <Image 
                            src={LogoApril} 
                            alt="Logo April" 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Image 
                            src={LogoNeoliane} 
                            alt="Logo Néoliane" 
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                    </div>
                    
                    {/* Nom du produit */}
                    <h3 className="text-xl font-bold text-white mt-2 line-clamp-2">
                      {displayName}
                    </h3>
                  </div>
                  
                  {/* Badge RESPONSABLE */}
                  {isResponsable ? (
                    <span className={`bg-gradient-to-r from-${colors.button} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap`}>
                      🛡️ RESPONSABLE
                    </span>
                  ) : null}
                </div>
                
                {/* Nom de la formule */}
                <p className="text-white/90 text-sm mt-3">{displayFormula}</p>
              </div>

              {/* Corps de la carte */}
              <div className={`p-6 ${colors.bgLight}`}>
                {/* Prix */}
                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <div className={`text-4xl font-bold text-${colors.secondary}`}>
                      {displayPrice.toFixed(2)} €
                    </div>
                    <div className={`text-${colors.secondary} mb-2`}>/ mois</div>
                  </div>
                  <div className="text-gray-600 text-sm">
                    Soit {(displayPrice * 12).toFixed(2)} € par an
                  </div>
                </div>

                {/* Caractéristiques */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${colors.primary}-100 text-${colors.secondary}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Garanties</div>
                      <div className={`font-medium text-${colors.secondary}`}>
                        {hasDetailedWarranties ? (
                          <span className="text-green-600">✓ Détaillées disponibles</span>
                        ) : isCegema ? (
                          <span className="text-gray-600">{includedWarranties}</span>
                        ) : (
                          <span>{includedWarranties} {isNeoliane ? 'incluses' : 'garanties'}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${colors.primary}-100 text-${colors.secondary}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Date d'effet</div>
                      <div className={`font-medium text-${colors.secondary}`}>
                        {result.effectiveDate || result.dateEffetReelle || result.details?.date_effet || 'Immédiate'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Boutons */}
                <div className="space-y-3">
                  <button 
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r ${colors.button} hover:${colors.buttonHover} text-white shadow-lg hover:shadow-xl`}
                    onClick={() => handleViewDetails(result, index)}
                  >
                    Voir tous les détails
                  </button>
                  
                  <button 
                    className={`w-full py-2.5 border font-medium rounded-xl transition-colors duration-200 ${colors.outline}`}
                    onClick={() => alert(`Rappel demandé pour ${displayName}. Un conseiller vous contactera dans les 24h.`)}
                  >
                    Rappel gratuit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Aucun résultat avec le filtre actif */}
      {sortedResults.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 text-gray-300">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            Aucune offre {filter !== 'all' ? 
              `de ${filter === 'neoliane' ? 'Néoliane' : filter === 'cegema' ? 'Cegema' : 'April'}` : 
              ''}
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Essayez de changer le filtre ou modifiez vos critères de recherche.
          </p>
          <button
            onClick={() => setFilter('all')}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:from-gray-800 hover:to-gray-950 transition-all"
          >
            Voir toutes les offres
          </button>
        </div>
      )}

      {/* Ligne d'information */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 text-sm mb-4">
          💡 <strong>Astuce :</strong> Comparez les offres des 3 assureurs pour trouver la meilleure couverture au meilleur prix.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white border border-blue-300 p-1 flex items-center justify-center">
              <Image 
                src={LogoNeoliane} 
                alt="Logo Néoliane" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left">
              <span className="text-sm font-medium text-gray-700">Néoliane</span>
              <p className="text-xs text-gray-500">Garanties détaillées ✓</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white border border-emerald-300 p-1 flex items-center justify-center">
              <Image 
                src={LogoCegema} 
                alt="Logo Cegema" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left">
              <span className="text-sm font-medium text-gray-700">Cegema</span>
              <p className="text-xs text-gray-500">Contact conseiller</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white border border-orange-300 p-1 flex items-center justify-center">
              <Image 
                src={LogoApril} 
                alt="Logo April" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left">
              <span className="text-sm font-medium text-gray-700">April</span>
              <p className="text-xs text-gray-500">Garanties détaillées ✓</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-xs text-gray-500">
          <p>Les garanties April sont disponibles en cliquant sur "Voir tous les détails"</p>
        </div>
      </div>
    </div>
  );
};

export default PricingResults;