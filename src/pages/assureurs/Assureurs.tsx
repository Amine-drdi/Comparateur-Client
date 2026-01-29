import React, { useState } from 'react'
import { partenaire } from '../../../public/data/Partenaire'

// Types pour les partenaires
interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  category: string;
  specialities: string[];
  founded: number | string;
  employees: number | string;
  coverage: string;
  website: string;
}

interface PartnerDetailCardProps {
  partner: Partner;
}

interface PartnerDetailModalProps {
  partner: Partner;
  onClose: () => void;
}

const Assureurs = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activePartner, setActivePartner] = useState<Partner | null>(null)

  // Catégories uniques basées sur les colonnes du tableau Excel
  const categories = [
    'Tous',
    'Plan Epargne Retraite',
    'assurance Vie & Capitalisation',
    'Mutuelle & Mutuelle senior',
    'Prevoyance du TNS & Liberal',
    'Assurance emprunteur',
    'La collective'
  ]

  // Filtrage des partenaires
  const filteredPartners = partenaire.filter((partner: Partner) => {
    const matchesCategory = selectedCategory === 'Tous' || 
                          partner.specialities.includes(selectedCategory)
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Composant Header
  const PageHeader = () => (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center mb-6 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <span className="text-white text-sm font-medium">Nos partenaires assurance</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Des assureurs
          <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2">
            d'exception
          </span>
        </h1>
        
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
          Découvrez notre sélection rigoureuse de partenaires assurance, choisis pour leur excellence, 
          leur innovation et leur engagement envers leurs clients.
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-6">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">{partenaire.length}+</div>
            <div className="text-sm text-blue-200 uppercase tracking-wider">Partenaires</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">{categories.length - 1}</div>
            <div className="text-sm text-blue-200 uppercase tracking-wider">Expertises</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">20+</div>
            <div className="text-sm text-blue-200 uppercase tracking-wider">Années d'expérience</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
    </div>
  )

  // Composant de recherche et filtres
  const SearchAndFilters = () => (
    <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 py-6 z-40 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Rechercher un partenaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500 flex items-center">
          <span>{filteredPartners.length} partenaire{filteredPartners.length > 1 ? 's' : ''} trouvé{filteredPartners.length > 1 ? 's' : ''}</span>
          {selectedCategory !== 'Tous' && (
            <button 
              onClick={() => setSelectedCategory('Tous')}
              className="ml-4 text-blue-600 hover:text-blue-800 text-xs flex items-center"
            >
              Réinitialiser le filtre
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )

  // Carte partenaire détaillée
  const PartnerDetailCard = ({ partner }: PartnerDetailCardProps) => (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
      <div className="relative h-40 bg-gradient-to-r from-slate-50 to-blue-50 p-6 flex items-center justify-between border-b border-gray-100">
        <div className="bg-white rounded-xl p-3 flex items-center justify-center shadow-sm border border-gray-100">
          <img
            src={partner.logo}
            alt={partner.name}
            className="max-h-14 max-w-40 object-contain"
          />
        </div>
        <div className="text-right">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1 border border-gray-200 shadow-sm">
            <span className="text-gray-700 text-xs font-medium">{partner.category}</span>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">{partner.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">{partner.description}</p>
        
        <div className="mb-5">
          <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Expertises</h4>
          <div className="flex flex-wrap gap-2">
            {partner.specialities.length > 0 ? (
              partner.specialities.slice(0, 3).map((spec, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100"
                >
                  {spec}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-xs">Aucune spécialité spécifiée</span>
            )}
            {partner.specialities.length > 3 && (
              <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                +{partner.specialities.length - 3}
              </span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="text-center bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="text-sm font-bold text-gray-700">{partner.founded}</div>
            <div className="text-xs text-gray-500">Fondé en</div>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="text-sm font-bold text-gray-700">{partner.employees}</div>
            <div className="text-xs text-gray-500">Employés</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${partner.coverage === 'Nationale' ? 'bg-green-400' : 'bg-blue-400'}`}></div>
            <span className="text-xs text-gray-600">Couverture: {partner.coverage}</span>
          </div>
        </div>
        
        <button 
          onClick={() => setActivePartner(partner)}
          className="w-full bg-white text-blue-600 py-2.5 rounded-xl font-semibold border border-blue-200 hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center"
        >
          Voir les détails
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )

  // Modal de détail du partenaire
  const PartnerDetailModal = ({ partner, onClose }: PartnerDetailModalProps) => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">{partner.name}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center border border-gray-200 md:w-1/3">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-24 max-w-48 object-contain"
              />
            </div>
            
            <div className="md:w-2/3">
              <p className="text-gray-600 mb-6">{partner.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="text-lg font-bold text-blue-700">{partner.founded}</div>
                  <div className="text-sm text-blue-600">Fondé en</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <div className="text-lg font-bold text-purple-700">{partner.employees}</div>
                  <div className="text-sm text-purple-600">Employés</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="text-lg font-bold text-green-700">{partner.coverage}</div>
                  <div className="text-sm text-green-600">Couverture</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                  <div className="text-lg font-bold text-orange-700">{partner.category}</div>
                  <div className="text-sm text-orange-600">Catégorie</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Expertises</h3>
            <div className="flex flex-wrap gap-3">
              {partner.specialities.map((spec, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Fermer
            </button>
            <button 
              onClick={() => window.open(partner.website, '_blank', 'noopener,noreferrer')}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center"
            >
              Visiter le site
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative">
      <main className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
        <PageHeader />
        <SearchAndFilters />
        
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner: Partner) => (
              <PartnerDetailCard key={partner.id} partner={partner} />
            ))}
          </div>
          
          {filteredPartners.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100">
                <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">Aucun partenaire trouvé</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">Aucun partenaire ne correspond à vos critères de recherche. Essayez de modifier vos filtres.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('Tous')
                  setSearchTerm('')
                }}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </main>
      
      {activePartner && (
        <PartnerDetailModal 
          partner={activePartner} 
          onClose={() => setActivePartner(null)} 
        />
      )}
    </div>
  )
}

export default Assureurs