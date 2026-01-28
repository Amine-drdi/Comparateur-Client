import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Fonction de vérification - à ajouter
const checkAprilWarranties = (product: any) => {
  if (product.provider === 'April') {
    console.log('🔍 VÉRIFICATION APRIL:', {
      nom: product.productName,
      prix: product.monthlyPrice,
      garantiesDetaillees: product.warrantiesDetailed ? 'OUI' : 'NON',
      structure: product.warrantiesDetailed,
      localStorage: localStorage.length
    });
    
    // Vérifier toutes les clés dans localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('product_details')) {
        console.log(`📦 Clé trouvée: ${key}`);
      }
    }
  }
};
// Interface pour les données du produit
interface ProductData {
  provider: 'Néoliane' | 'Cegema' | 'April' | string;
  productName: string;
  monthlyPrice: number;
  formulaName?: string;
  effectiveDate?: string;
  warranties?: any;
  warrantiesDetailed?: any; // Pour les garanties détaillées April
  details?: any;
  fees?: any;
  productCode?: string;
  productTitle?: string;
  rawData?: any;
  [key: string]: any;
}

const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'warranties' | 'details' | 'fees'>('overview');

  useEffect(() => {
    console.log('🚀 ProductDetailsPage - Démarrage...');
    console.log('🔗 URL complète:', window.location.href);
    console.log('🔗 URL search:', window.location.search);
    
    // Vérifier IMMÉDIATEMENT toutes les clés dans localStorage
    console.log('🔍 Toutes les clés localStorage:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('product_details')) {
        console.log(`📦 Clé trouvée: ${key}`);
      }
    }
    
    const loadProductData = () => {
      // 1. Chercher la clé de stockage dans l'URL
      const params = new URLSearchParams(window.location.search);
      const storageKey = params.get('storageKey');
      
      console.log('🔑 Clé de stockage depuis URL:', storageKey);
      
      if (storageKey) {
        // 2. Récupérer les données depuis localStorage
        const savedData = localStorage.getItem(storageKey);
        
if (savedData) {
  try {
    const parsed = JSON.parse(savedData);
    console.log('✅✅✅ DONNÉES COMPLÈTES RÉCUPÉRÉES depuis localStorage:', parsed.data);
    console.log('📋 Garanties disponibles:', parsed.data.warranties?.length || 0);
    console.log('📋 Garanties détaillées April:', parsed.data.warrantiesDetailed ? 'OUI' : 'NON');
    
    // ⭐⭐ AJOUTEZ CES TROIS LIGNES :
    setProduct(parsed.data);
    checkAprilWarranties(parsed.data);  // <-- LIGNE À AJOUTER
    setLoading(false);
    
    return;
  } catch (error) {
    console.error('❌ Erreur parsing localStorage:', error);
  }
}
      }
      
      // 3. Si pas de clé, essayer window.opener
      if (window.opener) {
        console.log('📌 Mode : Fenêtre popup depuis le comparateur');
        
        let attempts = 0;
        const maxAttempts = 10;
        
        const tryLoadFromOpener = () => {
          attempts++;
          
          try {
            // @ts-ignore
            if (window.opener && window.opener.productData) {
              // @ts-ignore
              const data = window.opener.productData;
              console.log('✅ Données récupérées depuis window.opener:', data);
              
              setProduct(data);
              setLoading(false);
              return true;
            }
          } catch (error) {
            console.log('⚠️ Erreur accès parent, tentative', attempts, ':', error);
          }
          
          if (attempts < maxAttempts) {
            setTimeout(tryLoadFromOpener, 300);
          } else {
            console.log('❌ Échec après', maxAttempts, 'tentatives');
            loadBasicDataFromURL();
          }
          return false;
        };
        
        tryLoadFromOpener();
      } else {
        // 4. Sinon, charger les données basiques depuis l'URL
        loadBasicDataFromURL();
      }
    };
    
    const loadBasicDataFromURL = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        console.log('🔗 Paramètres URL:', Object.fromEntries(params));
        
        const provider = params.get('p');
        const name = params.get('n');
        const price = params.get('pr');
        const formula = params.get('f');
        
        if (provider && name && price) {
          const productData: ProductData = {
            provider: provider as any,
            productName: decodeURIComponent(name),
            monthlyPrice: parseFloat(price),
            formulaName: formula ? decodeURIComponent(formula) : 'Formule',
            effectiveDate: params.get('d') || 'Immédiate',
            warranties: [],
            details: {},
            fees: { total: 0, association: 0, assistance: 0 }
          };
          
          console.log('⚠️ Produit créé depuis URL (données basiques):', productData);
          setProduct(productData);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('❌ Erreur parsing URL:', error);
      }
      
      // Si rien ne fonctionne
      console.log('❌ Aucune donnée trouvée');
      setLoading(false);
    };
    
    loadProductData();
    
    // Écouter les messages
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'PRODUCT_DATA') {
        console.log('📨 Données reçues via postMessage:', event.data.data);
        setProduct(event.data.data);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Fonction SIMPLIFIÉE pour afficher les garanties Néoliane
  const renderNeolianeWarranties = (warranties: any) => {
    console.log('🎯 Rendu garanties Néoliane:', warranties);
    
    if (!warranties || (Array.isArray(warranties) && warranties.length === 0)) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune garantie disponible</p>
        </div>
      );
    }
    
    // Convertir en tableau
    const warrantyArray = Array.isArray(warranties) 
      ? warranties 
      : Object.values(warranties);
    
    // Trier par position
    warrantyArray.sort((a: any, b: any) => {
      const posA = parseInt(a.position || a.pos || '999');
      const posB = parseInt(b.position || b.pos || '999');
      return posA - posB;
    });
    
    // Calculer les statistiques
    const includedCount = warrantyArray.filter((w: any) => 
      w.valeur && w.valeur !== 'Néant' && w.valeur !== 'Non'
    ).length;
    const totalCount = warrantyArray.length;
    
    return (
      <div className="w-full">
        {/* En-tête avec statistiques */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 shadow-sm border border-blue-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                📋 {totalCount} Garanties Néoliane
              </h2>
              <p className="text-gray-600">
                Détail complet des garanties incluses et non incluses
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{includedCount}</div>
                  <div className="text-sm text-gray-500">Garanties incluses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{totalCount - includedCount}</div>
                  <div className="text-sm text-gray-500">Non incluses</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des garanties */}
        <div className="space-y-4">
          {warrantyArray.map((w: any, index: number) => {
            const isIncluded = w.valeur && w.valeur !== 'Néant' && w.valeur !== 'Non';
            
            return (
              <div 
                key={w.id || index}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  isIncluded 
                    ? 'border-green-200 bg-green-50/30 hover:bg-green-50/50' 
                    : 'border-red-200 bg-red-50/30 hover:bg-red-50/50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mt-1 ${
                      isIncluded 
                        ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-700' 
                        : 'bg-gradient-to-br from-red-100 to-red-200 text-red-700'
                    }`}>
                      <span className="font-bold">{w.position || w.pos || index + 1}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {w.nom || w.libelle || `Garantie ${index + 1}`}
                      </h3>
                      
                      {w.valeur && (
                        <div className={`mt-2 text-lg font-bold ${isIncluded ? 'text-green-600' : 'text-red-600'}`}>
                          {w.valeur}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <span className={`px-4 py-2 rounded-full font-medium ${
                      isIncluded 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {isIncluded ? '✓ INCLUSE' : '✗ NON INCLUSE'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Fonction pour afficher les garanties April
  const renderAprilWarranties = (warranties: any) => {
    console.log('🎯 Rendu garanties April:', warranties);
    
    if (!warranties || !warranties.postes || warranties.postes.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 text-orange-400">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5" />
            </svg>
          </div>
          <p className="text-gray-500">Aucune garantie détaillée disponible pour ce produit April</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Rafraîchir la page
          </button>
        </div>
      );
    }
    
    const totalPrestations = warranties.postes.reduce((sum: number, poste: any) => 
      sum + (poste.prestations?.length || 0), 0
    );
    
    return (
      <div className="w-full">
        {/* En-tête avec statistiques */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 mb-8 shadow-sm border border-orange-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                📋 Garanties April
              </h2>
              <p className="text-gray-600">
                Détail complet des garanties et prestations
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{warranties.postes.length}</div>
                  <div className="text-sm text-gray-500">Catégories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{totalPrestations}</div>
                  <div className="text-sm text-gray-500">Prestations</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes/références */}
        {warranties.renvois && warranties.renvois.length > 0 && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h3 className="font-bold text-yellow-800 mb-2">📝 Notes et références :</h3>
            <div className="space-y-2">
              {warranties.renvois.map((renvoi: any, index: number) => (
                <div key={index} className="text-sm text-yellow-700">
                  {renvoi.numero && <span className="font-bold">[{renvoi.numero}] </span>}
                  {renvoi.lignes.join(' ')}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Liste des catégories de garanties */}
        <div className="space-y-6">
          {warranties.postes.map((poste: any, index: number) => {
            // Compter les prestations incluses
            const prestationsIncluses = poste.prestations?.filter((p: any) => p.isIncluded).length || 0;
            const totalPrestationsPoste = poste.prestations?.length || 0;
            
            return (
              <div key={poste.id || index} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                      {index + 1}
                    </div>
                    {poste.title}
                  </h3>
                  
                  <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {prestationsIncluses}/{totalPrestationsPoste} prestations
                  </div>
                </div>
                
                {poste.prestations && poste.prestations.length > 0 ? (
                  <div className="space-y-4">
                    {poste.prestations.map((prestation: any, prestaIndex: number) => (
                      <div 
                        key={prestation.id || prestaIndex} 
                        className={`border-l-4 pl-4 py-3 ${prestation.isIncluded ? 'border-green-400 bg-green-50/30' : 'border-red-300 bg-red-50/30'}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{prestation.title}</h4>
                            <div className="mt-2 text-sm text-gray-600 whitespace-pre-line bg-white/50 p-3 rounded-lg">
                              {prestation.value}
                            </div>
                          </div>
                          <div className="ml-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              prestation.isIncluded 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {prestation.isIncluded ? '✓ INCLUS' : '✗ NON INCLUS'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Aucune prestation détaillée dans cette catégorie</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Fonction pour afficher les garanties Cegema (simplifiée)
  const renderCegemaWarranties = () => {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 text-emerald-400">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Garanties Cegema</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Pour consulter le détail complet des garanties Cegema, veuillez contacter directement notre service client.
        </p>
        <button
          onClick={() => window.open('tel:+33123456789', '_blank')}
          className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          📞 Appeler le service client
        </button>
      </div>
    );
  };

  // Écran de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des détails du produit...</p>
          <p className="text-sm text-gray-500 mt-2">Veuillez patienter</p>
        </div>
      </div>
    );
  }

  // Écran d'erreur si pas de produit
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Produit non trouvé
            </h1>
            <p className="text-gray-600">
              Veuillez retourner au comparateur et cliquer à nouveau sur "Voir tous les détails"
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
            >
              Retour au comparateur
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normaliser le produit
  const safeProduct = {
    provider: product.provider || 'Inconnu',
    productName: product.productName || 'Produit sans nom',
    monthlyPrice: product.monthlyPrice || 0,
    formulaName: product.formulaName || product.productTitle || 'Formule standard',
    effectiveDate: product.effectiveDate || product.details?.effectiveDate || 'Non spécifiée',
    warranties: product.warranties || [],
    warrantiesDetailed: product.warrantiesDetailed || null, // Garanties détaillées April
    details: product.details || {},
    fees: product.fees || { total: 0, association: 0, assistance: 0 },
    productCode: product.productCode,
    productTitle: product.productTitle,
    rawData: product.rawData || {},
    is_responsable: product.is_responsable || false,
    type_assurance: product.type_assurance || 'Non spécifié'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 md:py-16">
      {/* Bouton retour */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button
          onClick={() => {
            if (window.opener && !window.opener.closed) {
              window.opener.focus();
              window.close();
            } else {
              navigate('/');
            }
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour au comparateur
        </button>
      </div>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bandeau produit */}
        <div className={`rounded-2xl text-white p-6 md:p-8 mb-8 bg-gradient-to-r ${
          safeProduct.provider === 'Néoliane' ? 'from-blue-600 to-purple-600' :
          safeProduct.provider === 'Cegema' ? 'from-green-600 to-emerald-700' :
          safeProduct.provider === 'April' ? 'from-orange-600 to-red-600' :
          'from-gray-800 to-gray-900'
        }`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 flex items-center justify-center">
                  <div className="text-2xl md:text-3xl">
                    {safeProduct.provider === 'Néoliane' && '🏥'}
                    {safeProduct.provider === 'Cegema' && '🛡️'}
                    {safeProduct.provider === 'April' && '📋'}
                    {!['Néoliane', 'Cegema', 'April'].includes(safeProduct.provider) && '🏢'}
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{safeProduct.productName}</h1>
                  <p className="text-white/90 text-lg">{safeProduct.formulaName}</p>
                </div>
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  🏢 {safeProduct.provider}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  📅 Effet: {safeProduct.effectiveDate}
                </span>
                {safeProduct.is_responsable && (
                  <span className="bg-red-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                    🛡️ CONTRAT RESPONSABLE
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-center lg:text-right mt-4 lg:mt-0">
              <div className="text-4xl md:text-5xl font-bold mb-2">{safeProduct.monthlyPrice.toFixed(2)} €</div>
              <div className="text-white/90 text-lg">par mois</div>
              <div className="text-sm mt-2 opacity-80">
                Soit {(safeProduct.monthlyPrice * 12).toFixed(2)} € par an
              </div>
            </div>
          </div>
        </div>

        {/* Onglets de navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                className={`px-4 md:px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'overview' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('overview')}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vue d'ensemble
                </span>
              </button>
              
              <button
                className={`px-4 md:px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'warranties' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('warranties')}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Garanties
                </span>
              </button>
            </nav>
          </div>
          
          {/* Contenu des onglets */}
          <div className="p-4 md:p-6">
            {/* Onglet Vue d'ensemble */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Résumé de l'offre</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Assureur</span>
                        <span className="font-semibold">{safeProduct.provider}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Formule</span>
                        <span className="font-semibold">{safeProduct.formulaName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Date d'effet</span>
                        <span className="font-semibold">{safeProduct.effectiveDate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Prix mensuel</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {safeProduct.monthlyPrice.toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </div>
                  
<div className="flex justify-between items-center">
  <span className="text-gray-600">Garanties</span>
  <span className={`text-xl font-semibold ${
    safeProduct.provider === 'April' ? 'text-orange-600' : 'text-gray-800'
  }`}>
    {safeProduct.provider === 'April' 
      ? 'Disponibles en détails'  // ← CHANGÉ ICI
      : Array.isArray(safeProduct.warranties) 
        ? safeProduct.warranties.length + ' garanties'
        : 'Non spécifiées'}
  </span>
</div>
                </div>
                
                {/* Informations supplémentaires */}
                {safeProduct.details && Object.keys(safeProduct.details).length > 0 && (
                  <div className="bg-gradient-to-br from-gray-50 to-blue-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Informations complémentaires</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(safeProduct.details)
                        .filter(([key]) => !key.includes('warrantyRequestData'))
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span className="font-semibold text-gray-800">
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Onglet Garanties */}
            {activeTab === 'warranties' && (
              <div>
                {safeProduct.provider === 'Néoliane' && safeProduct.warranties ? (
                  renderNeolianeWarranties(safeProduct.warranties)
                ) : safeProduct.provider === 'April' && safeProduct.warrantiesDetailed ? (
                  renderAprilWarranties(safeProduct.warrantiesDetailed)
                ) : safeProduct.provider === 'Cegema' ? (
                  renderCegemaWarranties()
                ) : (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">
                      Garanties {safeProduct.provider}
                    </h3>
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        {safeProduct.warranties && safeProduct.warranties.length > 0
                          ? `${safeProduct.warranties.length} garanties disponibles`
                          : 'Aucune garantie détaillée disponible'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Barre d'action fixe en bas */}
        <div className="sticky bottom-4 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <div className="text-2xl font-bold text-gray-800">{safeProduct.monthlyPrice.toFixed(2)} €</div>
              <div className="text-gray-600">par mois • Souscription en 5 minutes</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => window.open(`tel:+33123456789`, '_blank')}
                className="px-4 sm:px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                📞 Appeler un conseiller
              </button>
              
              <button
                onClick={() => alert(`Souscription à ${safeProduct.productName} - ${safeProduct.monthlyPrice}€/mois`)}
                className="px-4 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-center"
              >
                Souscrire maintenant
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer informatif */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>⚠️ Cette simulation n'a pas de valeur contractuelle. Les tarifs sont donnés à titre indicatif.</p>
            <p className="mt-1">Offre valable jusqu'au {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}</p>
            <div className="mt-4 flex justify-center gap-4 text-xs text-gray-500">
              <span>Assurance: {safeProduct.provider}</span>
              <span>•</span>
              <span>Code: {safeProduct.productCode || 'N/A'}</span>
              <span>•</span>
              <span>Type: {safeProduct.type_assurance}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailsPage;