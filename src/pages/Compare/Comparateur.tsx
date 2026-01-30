// ComparateurApril.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import femmeImg from '../../assets/Accueil/images/compareImage/woman.png';
import hommeImg from '../../assets/Accueil/images/compareImage/man.png';
import vousImg from '../../images/compareImage/man.png';
import conjointImg from '../../assets/Accueil/images/compareImage/icon-couple.DNy2uJdQ.png';
import enfantsImg from '../../assets/Accueil/images/compareImage/icon-single-with-children.DyCgMNJT.png';
import familleImg from '../../assets/Accueil/images/compareImage/icon-family.C0um2KMM.png';
import calandrierImg from '../../assets/mutuelle-sante/images/calandrier.png';
import codePostale from '../../assets/mutuelle-sante/images/codePostale.png';
import assurance from '../../assets/mutuelle-sante/images/assurance.png';
import nomIcon from "../../assets/mutuelle-sante/images/nom.png";
import mailIcon from "../../assets/mutuelle-sante/images/mail.png";
import phoneIcon from "../../assets/mutuelle-sante/images/phone.png";

import SubscriptionModal from './SubscriptionModal';
import April from "../../../public/images/april-logo.png"
interface FormData {
  genre: string;
  couverture: string;
  dateNaissance: string;
  dateNaissanceConjoint: string;
  nombreEnfants: number;
  datesNaissanceEnfants: string[];
  regimeSocial: string;
  codePostal: string;
  dateDebutAssurance: string;
  typeCouverture: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  niveauRemboursement: {
    soinsCourants: string;
    hospitalisation: string;
    dentaire: string;
    optique: string;
  };
  accepteAppel: string;
  conditionsAcceptees: boolean;
}

interface AprilProduct {
  nom: string;
  formule_label: string;
  montant: number;
  type_assurance: string;
  warranties_typed: {
    soins_courants: string;
    hospitalisation: string;
    dentaire: string;
    optique: string;
  };
  warranty: Record<string, {
    libelle: string;
    garanties: Record<string, {
      libelle: string;
      valeur: string;
    }>;
  }>;
}

const ComparateurApril: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    genre: '',
    couverture: '',
    dateNaissance: '',
    dateNaissanceConjoint: '',
    nombreEnfants: 0,
    datesNaissanceEnfants: [],
    regimeSocial: '',
    codePostal: '',
    dateDebutAssurance: '',
    typeCouverture: 'equilibree',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    niveauRemboursement: {
      soinsCourants: 'Moyen',
      hospitalisation: 'Moyen',
      dentaire: 'Moyen',
      optique: 'Moyen'
    },
    accepteAppel: 'non',
    conditionsAcceptees: false
  });
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AprilProduct[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<AprilProduct[] | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [drawerType, setDrawerType] = useState<'profil' | 'garantie' | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [montantMin, setMontantMin] = useState<string>('');
  const [montantMax, setMontantMax] = useState<string>('');

  const stepsData = [
    { number: 1, label: 'Adhérent' },
    { number: 2, label: 'Contrat' },
    { number: 3, label: 'Garanties' },
    { number: 4, label: 'Coordonnées' },
    { number: 5, label: 'Validation' }
  ];

  const regimesSociaux = [
    { value: '1', label: 'Salarié' },
    { value: '7', label: 'Sans emploi' },
    { value: '4', label: 'Retraité' },
    { value: '9', label: 'Fonctionnaire' }
  ];

  useEffect(() => {
    if (result) {
      let filtered = [...result];
      
      if (searchTerm) {
        filtered = filtered.filter(p => 
          p.nom.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (montantMin) {
        filtered = filtered.filter(p => p.montant >= parseFloat(montantMin));
      }
      
      if (montantMax) {
        filtered = filtered.filter(p => p.montant <= parseFloat(montantMax));
      }
      
      setFilteredResults(filtered);
    }
  }, [result, searchTerm, montantMin, montantMax]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNiveauChange = (field: keyof FormData['niveauRemboursement'], value: string) => {
    setFormData(prev => ({
      ...prev,
      niveauRemboursement: {
        ...prev.niveauRemboursement,
        [field]: value
      }
    }));
  };

  const validateStep = (step: number): boolean => {
    const newError: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.genre) newError.genre = 'Veuillez sélectionner votre genre';
      if (!formData.couverture) newError.couverture = 'Veuillez sélectionner votre couverture';
      if (!formData.dateNaissance) newError.dateNaissance = 'Veuillez entrer votre date de naissance';
      if (!formData.regimeSocial) newError.regimeSocial = 'Veuillez sélectionner votre régime social';
    }
    
    if (step === 2) {
      if (!formData.codePostal) newError.codePostal = 'Veuillez entrer votre code postal';
      if (!formData.dateDebutAssurance) newError.dateDebutAssurance = 'Veuillez sélectionner une date de début';
      if (!formData.typeCouverture) newError.typeCouverture = 'Veuillez sélectionner un type de couverture';
    }
    
    if (step === 3) {
      if (!formData.niveauRemboursement.soinsCourants) newError.soinsCourants = 'Veuillez sélectionner un niveau';
      if (!formData.niveauRemboursement.hospitalisation) newError.hospitalisation = 'Veuillez sélectionner un niveau';
      if (!formData.niveauRemboursement.dentaire) newError.dentaire = 'Veuillez sélectionner un niveau';
      if (!formData.niveauRemboursement.optique) newError.optique = 'Veuillez sélectionner un niveau';
      if (!formData.conditionsAcceptees) newError.conditionsAcceptees = 'Veuillez accepter les conditions';
    }
    
    if (step === 4) {
      if (!formData.nom) newError.nom = 'Veuillez entrer votre nom';
      if (!formData.prenom) newError.prenom = 'Veuillez entrer votre prénom';
      if (!formData.email) newError.email = 'Veuillez entrer votre email';
      if (!formData.telephone) newError.telephone = 'Veuillez entrer votre téléphone';
    }
    
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const getTarifApril = async () => {
    try {
      setLoading(true);
      
      const response = await axios.post('/api/april/comparateur-mutuelle-sante', {
        postalcode: formData.codePostal,
        birthdate_adult1: formData.dateNaissance,
        effectdate: formData.dateDebutAssurance,
        regime_adult1: formData.regimeSocial,
        typeCouverture: formData.typeCouverture,
        gender: formData.genre
      });

      setResult(response.data);
      setFilteredResults(response.data);
      setLoading(false);
      setStep(6); // Aller à l'étape des résultats
    } catch (error) {
      console.error('Erreur lors de la récupération des tarifs April:', error);
      setLoading(false);
      setError({ general: 'Une erreur est survenue lors de la récupération des tarifs' });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await getTarifApril();
  };

  const getCouvertureLabel = (value: string): string => {
    switch (value) {
      case 'adulte': return 'Un adulte';
      case 'adulte_enfant': return 'Un adulte + enfant';
      case 'couple': return 'Un couple';
      case 'couple_enfant': return 'Un couple + enfant';
      default: return value;
    }
  };

  const getRegimeSocialLabel = (value: string): string => {
    const regime = regimesSociaux.find(r => r.value === value);
    return regime ? regime.label : value;
  };

  const WarrantyDots = ({ value }: { value: string }) => {
    let level = 1;
    if (value.includes('150')) level = 2;
    if (value.includes('200')) level = 3;
    if (value.includes('250')) level = 4;
    
    return (
      <div className="flex justify-center">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full mx-1 ${i <= level ? 'bg-sky-800' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const getWarrantyIcon = (libelle: string) => {
    switch (libelle) {
      case 'Soins courants': return '💊';
      case 'Hospitalisation': return '🏥';
      case 'Dentaire': return '🦷';
      case 'Optique': return '👓';
      default: return '';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8 bg-white">
      <h1 className="text-2xl md:text-3xl font-semibold text-sky-800 text-center mb-8">
        Comparateur de Mutuelles Santé April
      </h1>
      
      {/* Barre de progression */}
      <div className="relative mb-8">
        <div className="flex justify-between relative z-10">
          {stepsData.map(({ label, number }) => (
            <div key={number} className="flex flex-col items-center" style={{ width: `${100 / stepsData.length}%` }}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 text-white text-lg font-bold 
                  ${step >= number ? 'bg-sky-800' : 'bg-gray-300 text-gray-500'}`}
              >
                <span>{number}</span>
              </div>
              <span className={`text-xs text-center ${step >= number ? 'text-sky-800 font-semibold' : 'text-gray-500'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0"></div>
        <div
          className={`absolute top-4 left-0 h-1 bg-sky-800 z-0 transition-all duration-300 
            ${step === 1 ? 'w-0' :
              step === 2 ? 'w-1/5' :
              step === 3 ? 'w-2/5' :
              step === 4 ? 'w-3/5' :
              step === 5 ? 'w-4/5' : 'w-full'}`}
        ></div>
      </div>

      {error.general && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 text-center">
          {error.general}
        </div>
      )}

      {/* Étape 1: Adhérent */}
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-3">Êtes-vous...</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({...formData, genre: 'homme'})}
                className={`p-4 border rounded-lg flex flex-col items-center transition ${formData.genre === 'homme' ? 'border-sky-500 bg-sky-50 text-sky-800' : 'border-gray-300 hover:border-sky-300'}`}
              >
                <span className="text-4xl mb-2">👨</span>
                <span>Homme</span> 
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, genre: 'femme'})}
                className={`p-4 border rounded-lg flex flex-col items-center transition ${formData.genre === 'femme' ? 'border-sky-500 bg-sky-50 text-sky-800' : 'border-gray-300 hover:border-sky-300'}`}
              >
                <span className="text-4xl mb-2">👩</span>
                <span>Femme</span>
              </button>
            </div>
            {error.genre && <p className="text-red-500 text-sm mt-2 text-center">{error.genre}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-3">Qui souhaitez-vous assurer ?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: 'adulte', label: 'Un adulte', icon: '👩' },
                { value: 'adulte_enfant', label: 'Un adulte + enfant', icon: '👩‍👦' },
                { value: 'couple', label: 'Un couple', icon: '👫' },
                { value: 'couple_enfant', label: 'Un couple + enfant', icon: '👨‍👩‍👦' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({...formData, couverture: option.value})}
                  className={`p-4 border rounded-lg flex flex-col items-center transition ${formData.couverture === option.value ? 'border-sky-500 bg-sky-50 text-sky-800' : 'border-gray-300 hover:border-sky-300'}`}
                >
                  <span className="text-4xl mb-2">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
            {error.couverture && <p className="text-red-500 text-sm mt-1">{error.couverture}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 flex items-center">
              <span className="text-2xl mr-2">📅</span>
              Date de naissance
            </label>
            <input
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              required
              className="w-full sm:w-[300px] px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
            />
            {error.dateNaissance && <p className="text-red-500 text-sm mt-1">{error.dateNaissance}</p>}
          </div>

          {formData.couverture === 'couple' || formData.couverture === 'couple_enfant' ? (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Date de naissance du conjoint
              </label>
              <input
                type="date"
                name="dateNaissanceConjoint"
                value={formData.dateNaissanceConjoint}
                onChange={(e) => setFormData({ ...formData, dateNaissanceConjoint: e.target.value })}
                className="w-full sm:w-[300px] px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
              />
            </div>
          ) : null}

          {formData.couverture === 'adulte_enfant' || formData.couverture === 'couple_enfant' ? (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Nombre d'enfants à assurer
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={formData.nombreEnfants}
                onChange={(e) => {
                  const count = parseInt(e.target.value) || 0;
                  const dates = Array(count).fill('').map((_, i) => formData.datesNaissanceEnfants[i] || '');
                  setFormData({ ...formData, nombreEnfants: count, datesNaissanceEnfants: dates });
                }}
                className="w-full sm:w-[300px] px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
              />

              {Array.from({ length: formData.nombreEnfants }).map((_, i) => (
                <div key={i} className="mt-2">
                  <label className="block text-gray-600 mb-1">Date de naissance enfant {i + 1}</label>
                  <input
                    type="date"
                    value={formData.datesNaissanceEnfants[i] || ''}
                    onChange={(e) => {
                      const newDates = [...formData.datesNaissanceEnfants];
                      newDates[i] = e.target.value;
                      setFormData({ ...formData, datesNaissanceEnfants: newDates });
                    }}
                    className="w-full sm:w-[300px] px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
                  />
                </div>
              ))}
            </div>
          ) : null}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Quel est votre régime social ?
            </label>
            <select
              name="regimeSocial"
              value={formData.regimeSocial}
              onChange={handleChange}
              required
              className="w-full sm:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            >
              <option value="">Sélectionnez votre régime</option>
              {regimesSociaux.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error.regimeSocial && <p className="text-red-500 text-sm mt-1">{error.regimeSocial}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-sky-800 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Continuer
            </button>
          </div>
        </form>
      )}

      {/* Étape 2: Contrat */}
      {step === 2 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 flex items-center">
              <span className="text-2xl mr-2">📮</span>
              Code Postal
            </label>
            <input
              type="text"
              name="codePostal"
              value={formData.codePostal}
              onChange={handleChange}
              required
              className="w-full sm:w-[300px] px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
              pattern="\d{5}"
              title="5 chiffres requis"
            />
            {error.codePostal && <p className="text-red-500 text-sm mt-1">{error.codePostal}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 flex items-center">
              <span className="text-2xl mr-2">📅</span>
              A quelle date souhaitez-vous être assuré(e) ?
            </label>
            <input
              type="date"
              name="dateDebutAssurance"
              value={formData.dateDebutAssurance}
              onChange={handleChange}
              required
              className="w-full sm:w-[300px] px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
            />
            {error.dateDebutAssurance && <p className="text-red-500 text-sm mt-1">{error.dateDebutAssurance}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-3 flex items-center">
              <span className="text-2xl mr-2">🛡️</span>
              Je souhaite une couverture...
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[ 
                { value: 'minimale', label: 'Minimale', sublabel: 'Essentielle' },
                { value: 'equilibree', label: 'Equilibrée', sublabel: 'Recommandée' },
                { value: 'maximale', label: 'Maximale', sublabel: 'Complète' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, typeCouverture: option.value })}
                  className={`p-4 border rounded-lg flex flex-col items-center transition ${formData.typeCouverture === option.value ? 'border-sky-500 bg-sky-50 text-sky-800' : 'border-gray-300 hover:border-sky-300'}`}
                >
                  <span>{option.label}</span>
                  <span className="text-xs text-gray-500 mt-1">{option.sublabel}</span>
                </button>
              ))}
            </div>
            {error.typeCouverture && <p className="text-red-500 text-sm mt-1">{error.typeCouverture}</p>}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Retour
            </button>
            <button
              type="submit"
              className="bg-sky-800 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Continuer
            </button>
          </div>
        </form>
      )}

      {/* Étape 3: Garanties */}
      {step === 3 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
          <div className="bg-sky-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-sky-800 mb-4">
              Quel niveau de remboursement souhaitez-vous ?
            </h2>
            <p className="text-gray-600 mb-6">
              Pas d'inquiétude, vous pourrez modifier votre couverture sur la page de résultats.
            </p>

            {/* Soins courants */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-4">Soins courants</h3>
              <p className="text-sm text-gray-500 mb-4">(médecine générale, pharmacie, radios, etc.)</p>
              <div className="grid grid-cols-4 gap-2">
                {['Minimum', 'Moyen', 'Fort', 'Maximum'].map((niveau) => (
                  <button
                    key={niveau}
                    type="button"
                    onClick={() => handleNiveauChange('soinsCourants', niveau)}
                    className={`p-3 text-sm rounded-md transition-all ${
                      formData.niveauRemboursement.soinsCourants === niveau 
                      ? 'bg-sky-800 text-white border-2 border-sky-900' 
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-sky-300'
                    }`}
                  >
                    {niveau}
                  </button>
                ))}
              </div>
              {error.soinsCourants && <p className="text-red-500 text-sm mt-2">{error.soinsCourants}</p>}
            </div>

            {/* Hospitalisation */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-4">Hospitalisation</h3>
              <p className="text-sm text-gray-500 mb-4">(frais de séjour, frais de transport, chirurgie, etc.)</p>
              <div className="grid grid-cols-4 gap-2">
                {['Minimum', 'Moyen', 'Fort', 'Maximum'].map((niveau) => (
                  <button
                    key={niveau}
                    type="button"
                    onClick={() => handleNiveauChange('hospitalisation', niveau)}
                    className={`p-3 text-sm rounded-md transition-all ${
                      formData.niveauRemboursement.hospitalisation === niveau 
                      ? 'bg-sky-800 text-white border-2 border-sky-900' 
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-sky-300'
                    }`}
                  >
                    {niveau}
                  </button>
                ))}
              </div>
              {error.hospitalisation && <p className="text-red-500 text-sm mt-2">{error.hospitalisation}</p>}
            </div>

            {/* Dentaire */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-4">Dentaire</h3>
              <p className="text-sm text-gray-500 mb-4">(dentiste, prothèses, soins, etc.)</p>
              <div className="grid grid-cols-4 gap-2">
                {['Minimum', 'Moyen', 'Fort', 'Maximum'].map((niveau) => (
                  <button
                    key={niveau}
                    type="button"
                    onClick={() => handleNiveauChange('dentaire', niveau)}
                    className={`p-3 text-sm rounded-md transition-all ${
                      formData.niveauRemboursement.dentaire === niveau 
                      ? 'bg-sky-800 text-white border-2 border-sky-900' 
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-sky-300'
                    }`}
                  >
                    {niveau}
                  </button>
                ))}
              </div>
              {error.dentaire && <p className="text-red-500 text-sm mt-2">{error.dentaire}</p>}
            </div>

            {/* Optique */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-4">Optique</h3>
              <p className="text-sm text-gray-500 mb-4">(lentilles, lunettes, chirurgie réfractive, etc.)</p>
              <div className="grid grid-cols-4 gap-2">
                {['Minimum', 'Moyen', 'Fort', 'Maximum'].map((niveau) => (
                  <button
                    key={niveau}
                    type="button"
                    onClick={() => handleNiveauChange('optique', niveau)}
                    className={`p-3 text-sm rounded-md transition-all ${
                      formData.niveauRemboursement.optique === niveau 
                      ? 'bg-sky-800 text-white border-2 border-sky-900' 
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-sky-300'
                    }`}
                  >
                    {niveau}
                  </button>
                ))}
              </div>
              {error.optique && <p className="text-red-500 text-sm mt-2">{error.optique}</p>}
            </div>

            {/* Contact partenaires */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">
                Accepteriez-vous d'être contacté par nos partenaires ?
              </h3>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="accepteAppel"
                    value="oui"
                    checked={formData.accepteAppel === 'oui'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-sky-800"
                  />
                  <span className="ml-2">Oui</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="accepteAppel"
                    value="non"
                    checked={formData.accepteAppel === 'non'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-sky-800"
                  />
                  <span className="ml-2">Non</span>
                </label>
              </div>
              {error.accepteAppel && <p className="text-red-500 text-sm mt-1">{error.accepteAppel}</p>}
            </div>

            {/* Conditions */}
            <label className="flex items-start mt-6">
              <input
                type="checkbox"
                name="conditionsAcceptees"
                checked={formData.conditionsAcceptees}
                onChange={(e) => setFormData({...formData, conditionsAcceptees: e.target.checked})}
                className="form-checkbox h-4 w-4 mt-1 text-sky-800"
              />
              <span className="ml-2 text-sm text-gray-600">
                J'accepte les conditions d'utilisation et d'être contacté par les partenaires 
                Assurance Santé pour recevoir des offres personnalisées.
              </span>
            </label>
            {error.conditionsAcceptees && <p className="text-red-500 text-sm mt-1">{error.conditionsAcceptees}</p>}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg"
            >
              Retour
            </button>
            <button
              type="submit"
              className="bg-sky-800 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Continuer
            </button>
          </div>
        </form>
      )}

      {/* Étape 4: Coordonnées */}
      {step === 4 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-sky-800 mb-6 text-center">Vos coordonnées</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Nom
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
              />
              {error.nom && <p className="text-red-500 text-sm mt-1">{error.nom}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Prénom
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
              />
              {error.prenom && <p className="text-red-500 text-sm mt-1">{error.prenom}</p>}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
            />
            {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="10 chiffres requis"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
            />
            {error.telephone && <p className="text-red-500 text-sm mt-1">{error.telephone}</p>}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-xl transition duration-300 w-full sm:w-auto"
            >
              Retour
            </button>

            <button
              type="submit"
              className="bg-sky-800 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 w-full sm:w-auto"
            >
              Continuer
            </button>
          </div>
        </form>
      )}

      {/* Étape 5: Vérification */}
      {step === 5 && (
        <div className="space-y-6">
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-6">
            <h3 className="text-xl text-sky-800 mb-4">
              Vérifiez vos informations
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Informations personnelles</h4>
                <div className="bg-white p-4 rounded-lg">
                  <p><span className="text-gray-600">Genre:</span> {formData.genre === 'homme' ? 'Homme' : 'Femme'}</p>
                  <p><span className="text-gray-600">Couverture:</span> {getCouvertureLabel(formData.couverture)}</p>
                  <p><span className="text-gray-600">Date de naissance:</span> {formData.dateNaissance}</p>
                  <p><span className="text-gray-600">Régime social:</span> {getRegimeSocialLabel(formData.regimeSocial)}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Contrat</h4>
                <div className="bg-white p-4 rounded-lg">
                  <p><span className="text-gray-600">Code postal:</span> {formData.codePostal}</p>
                  <p><span className="text-gray-600">Date début assurance:</span> {formData.dateDebutAssurance}</p>
                  <p><span className="text-gray-600">Type de couverture:</span> 
                    {formData.typeCouverture === 'minimale' ? ' Minimale' : 
                     formData.typeCouverture === 'equilibree' ? ' Equilibrée' : 
                     ' Maximale'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Coordonnées</h4>
                <div className="bg-white p-4 rounded-lg">
                  <p><span className="text-gray-600">Nom:</span> {formData.nom}</p>
                  <p><span className="text-gray-600">Prénom:</span> {formData.prenom}</p>
                  <p><span className="text-gray-600">Email:</span> {formData.email}</p>
                  <p><span className="text-gray-600">Téléphone:</span> {formData.telephone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Modifier
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                'Confirmer et obtenir mon devis'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Étape 6 : Résultats */}
      {step === 6 && (
        <div className="space-y-6 mt-10">
          <h2 className="text-2xl font-bold text-center text-sky-800">Résultats de votre tarification April</h2>
          
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setDrawerType('profil')}
              className="px-4 py-2 bg-sky-800 text-white rounded-lg hover:bg-sky-700 transition"
            >
              Modifier mon profil
            </button>
            <button
              onClick={() => setDrawerType('garantie')}
              className="px-4 py-2 bg-sky-800 text-white rounded-lg hover:bg-sky-700 transition"
            >
              Modifier mon niveau de garantie
            </button>
          </div>

          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-800 border-t-transparent"></div>
            </div>
          )}

          {!loading && result && (
            <>
              <div className="flex flex-col md:flex-row gap-2 mb-6">
                <p className="text-gray-700 font-medium">
                  {filteredResults?.length ?? 0} formule(s) trouvée(s)
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-50 border border-sky-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Rechercher par nom"
                  />
                  <input
                    type="number"
                    placeholder="Montant min"
                    value={montantMin}
                    onChange={(e) => setMontantMin(e.target.value)}
                    className="bg-gray-50 border border-sky-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <input
                    type="number"
                    placeholder="Montant max"
                    value={montantMax}
                    onChange={(e) => setMontantMax(e.target.value)}
                    className="bg-gray-50 border border-sky-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
              </div>
            
              {filteredResults?.length === 0 ? (
                <p className="text-center text-red-500 mt-6">Aucune formule ne correspond à vos critères.</p>
              ) : (
                <div className="space-y-6 mt-6">
                  {filteredResults?.map((produit, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <div key={index} className="bg-white w-full p-6 rounded-2xl shadow-md border flex flex-col gap-4 hover:shadow-lg transition-all">
                        <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-4">
                          {/* Colonne gauche */}
                          <div className="flex items-center gap-4 w-full md:w-1/5">
                            <div className="bg-sky-100 p-3 rounded-full">
                              <span className="text-sky-800 text-2xl">🛡️</span>
                            </div>
                            <div>
                              <span className="text-lg font-medium text-sky-900">{produit.nom}</span>
                              <p className="text-sm text-gray-500">{produit.formule_label}</p>
                            </div>
                          </div>

                          {/* Niveaux */}
                          {produit.warranties_typed && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                              <div><p className="text-sm text-gray-600">Soins courants</p><WarrantyDots value={produit.warranties_typed.soins_courants} /></div>
                              <div><p className="text-sm text-gray-600">Hospitalisation</p><WarrantyDots value={produit.warranties_typed.hospitalisation} /></div>
                              <div><p className="text-sm text-gray-600">Dentaire</p><WarrantyDots value={produit.warranties_typed.dentaire} /></div>
                              <div><p className="text-sm text-gray-600">Optique</p><WarrantyDots value={produit.warranties_typed.optique} /></div>
                            </div>
                          )}

                          {/* Montant + actions */}
                          <div className="flex flex-col items-end w-full md:w-1/4 text-right gap-2">
                            <p className="text-3xl font-bold text-sky-900">
                              {produit.montant} €<span className="text-sm text-gray-500"> /mois</span>
                            </p>
                            <p className="text-sm text-gray-500">Budget estimé : {(produit.montant * 12).toFixed(2)} €/an</p>
                            <div className="flex flex-wrap justify-end gap-2">
                              <button className="border border-orange-500 text-orange-500 font-semibold px-4 py-1.5 rounded-lg text-sm hover:bg-orange-50">
                                📞 Être rappelé par un expert
                              </button>
                              <button className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-orange-600">
                                Souscrire en ligne
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Bouton Plus/Moins de détails */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="text-sm text-sky-800 underline hover:text-sky-600 transition"
                          >
                            {isOpen ? 'Moins de détails' : 'Plus de détails'}
                          </button>
                        </div>

                        {/* Détails supplémentaires */}
                        {isOpen && (
                          <div className="mt-4 border-t pt-4">
                            <p className="text-gray-700 mb-2">
                              <strong>Formule :</strong> {produit.formule_label || 'Non spécifié'}    
                            </p>
                            <p className="text-gray-700 mb-2">
                              <strong>Type d'assurance :</strong> {produit.type_assurance || 'Non spécifié'}  
                            </p>
                            {produit.warranty && Object.values(produit.warranty).map((w: any, i) => (
                              <div key={i} className="mb-4">
                                <p className="font-semibold text-sky-900">
                                  {getWarrantyIcon(w.libelle)} {w.libelle}
                                </p>
                                {w.garanties && (
                                  <ul className="list-disc ml-5 text-sm text-gray-700">
                                    {Object.values(w.garanties).map((g: any) => (
                                      <li key={g.libelle}>{g.libelle} : {g.valeur}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Drawer de modification */}
      {drawerType && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-30"
            onClick={() => setDrawerType(null)}
          />

          {/* Drawer */}
          <div className="relative w-full sm:w-[400px] bg-white shadow-lg h-full p-6 overflow-y-auto z-50">
            <h2 className="text-xl font-bold text-sky-800 mb-4">
              {drawerType === 'profil' ? 'Modifier mon profil' : 'Modifier mon niveau de garantie'}
            </h2>

            {drawerType === 'profil' && (
              <div className="space-y-4">
                <label className="block text-gray-700 font-semibold">Nom</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />

                <label className="block text-gray-700 font-semibold">Prénom</label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />

                <label className="block text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />

                <label className="block text-gray-700 font-semibold">Téléphone</label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />

                <label className="block text-gray-700 font-semibold">Date de naissance</label>
                <input
                  type="date"
                  value={formData.dateNaissance}
                  onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />

                <label className="block text-gray-700 font-semibold">Code postal</label>
                <input
                  type="text"
                  value={formData.codePostal}
                  onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            )}

            {drawerType === 'garantie' && (
              <div className="space-y-4">
                {['soinsCourants', 'hospitalisation', 'dentaire', 'optique'].map((key) => (
                  <div key={key}>
                    <label className="block font-semibold text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <select
                      value={formData.niveauRemboursement[key as keyof FormData['niveauRemboursement']]}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          niveauRemboursement: {
                            ...prev.niveauRemboursement,
                            [key]: e.target.value
                          }
                        }))
                      }
                      className="w-full border border-gray-300 p-2 rounded"
                    >
                      <option value="Minimum">Minimum</option>
                      <option value="Moyen">Moyen</option>
                      <option value="Fort">Fort</option>
                      <option value="Maximum">Maximum</option>
                    </select>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                onClick={async () => {
                  setDrawerType(null);
                  setLoading(true);
                  await getTarifApril();
                  setLoading(false);
                }}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparateurApril;