"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PricingResults from './PricingResults';
import NavbarA from '@/Components/Home/NavBar';
import Footer from '@/Components/Home/Footer';

interface PricingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  wantsContact: boolean;
  birthDate: string;
  postalCode: string;
  startDate: string;
  regime: string;
  hasSpouse: boolean;
  spouseBirthDate?: string;
  spouseRegime?: string;
  childrenCount: number;
  productType: string;
  coverageLevel: 'minimum' | 'moyen' | 'fort' | 'maximum';
  [key: `childBirthDate${number}`]: string;
  [key: `childRegime${number}`]: string;
}

const schema = yup.object().shape({
  firstName: yup.string()
    .required('Le prénom est requis')
    .min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: yup.string()
    .required('Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: yup.string()
    .required('L\'email est requis')
    .email('Format d\'email invalide'),
  phone: yup.string()
    .required('Le téléphone est requis')
    .matches(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Numéro de téléphone français invalide')
    .test('phone-length', 'Numéro de téléphone trop court', (value) => {
      const digitsOnly = value?.replace(/[\s.-]/g, '');
      return digitsOnly && digitsOnly.length >= 10;
    }),
  wantsContact: yup.boolean()
    .oneOf([true], 'Vous devez accepter d\'être contacté pour continuer')
    .required('Ce champ est obligatoire'),
  birthDate: yup.string().required('La date de naissance est requise'),
  postalCode: yup.string()
    .matches(/^\d{5}$/, 'Code postal invalide')
    .required('Le code postal est requis'),
  startDate: yup.string().required('La date d\'effet est requise'),
  regime: yup.string().required('Le régime est requis'),
  hasSpouse: yup.boolean().default(false),
  spouseBirthDate: yup.string().nullable(),
  spouseRegime: yup.string().nullable(),
  childrenCount: yup.number().default(0).min(0).max(6),
  productType: yup.string().default('sante'),
  coverageLevel: yup
    .string()
    .oneOf(['minimum', 'moyen', 'fort', 'maximum'])
    .required('Veuillez choisir un niveau de couverture'),
});

const FORM_TO_APRIL_LEVEL = {
  'minimum': '01',
  'moyen': '02',
  'fort': '03',
  'maximum': '04'
} as const;

const PricingForm: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [childrenCount, setChildrenCount] = useState(0);
  const [step, setStep] = useState(1);
  const [comparisonStats, setComparisonStats] = useState<any>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [autoScrollProgress, setAutoScrollProgress] = useState(0);
  
  const { register, handleSubmit, formState: { errors }, watch, trigger, reset } = useForm<PricingFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      productType: 'sante',
      regime: 'SS',
      childrenCount: 0,
      hasSpouse: false,
      coverageLevel: 'moyen',
      wantsContact: false
    }
  });
  
  const hasSpouse = watch('hasSpouse');
  const birthDate = watch('birthDate');
  const phone = watch('phone');
  const coverageLevel = watch('coverageLevel');
  const wantsContact = watch('wantsContact');
  
  const calculateAge = (dateString: string) => {
    if (!dateString) return null;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatPhone = (value: string): string => {
    if (!value) return '';
    
    const digits = value.replace(/\D/g, '');
    
    if (digits.startsWith('0')) {
      if (digits.length <= 2) return digits;
      if (digits.length <= 4) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
      if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4)}`;
      if (digits.length <= 8) return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`;
      return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
    }
    
    return value;
  };

  useEffect(() => {
    // Auto-scroll progress indicator
    if (loading) {
      const interval = setInterval(() => {
        setAutoScrollProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      
      return () => clearInterval(interval);
    } else {
      setAutoScrollProgress(0);
    }
  }, [loading]);

  useEffect(() => {
    // Scroll to top when step changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show success animation when reaching step 4
    if (step === 4) {
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 2000);
    }
  }, [step]);

  const onSubmit = async (data: PricingFormData) => {
    const isValid = await trigger();
    if (!isValid) {
      alert('Veuillez corriger les erreurs dans le formulaire');
      return;
    }
    
    if (!data.wantsContact) {
      alert('Vous devez accepter d\'être contacté pour obtenir les offres');
      return;
    }
    
    setLoading(true);
    setAutoScrollProgress(0);
    
    try {
      const childrenData = [];
      for (let i = 0; i < childrenCount; i++) {
        childrenData.push({
          birthDate: data[`childBirthDate${i}` as keyof PricingFormData] as string,
          regime: data[`childRegime${i}` as keyof PricingFormData] as string || 'SS'
        });
      }
      
      const aprilLevelCode = FORM_TO_APRIL_LEVEL[data.coverageLevel] || '02';
      
      const requestData = {
        personalInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone.replace(/\s/g, ''),
          wantsContact: data.wantsContact,
          birthDate: data.birthDate,
          postalCode: data.postalCode,
          startDate: data.startDate,
          regime: data.regime,
          coverageLevel: data.coverageLevel,
          aprilLevelCode: aprilLevelCode
        },
        comparisonData: {
          birthDate: data.birthDate,
          postalCode: data.postalCode,
          startDate: data.startDate,
          regime: data.regime,
          productType: data.productType,
          aprilLevelCode: aprilLevelCode,
          ...(data.hasSpouse && data.spouseBirthDate && data.spouseRegime && {
            spouse: {
              birthDate: data.spouseBirthDate,
              regime: data.spouseRegime
            }
          }),
          ...(childrenCount > 0 && {
            children: childrenData
          })
        },
        fullData: {
          ...data,
          children: childrenCount > 0 ? childrenData : [],
          phone: data.phone.replace(/\s/g, ''),
          aprilLevelCode: aprilLevelCode
        }
      };
      
      // Sauvegarde
      const saveResponse = await fetch('http://localhost:5000/api/pricing/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData.fullData)
      });
      
      const saveResult = await saveResponse.json();
      
      if (!saveResult.success) {
        console.warn('⚠️ Attention: La sauvegarde a échoué mais on continue la comparaison');
      }
      
      // Comparaison
      const comparisonResponse = await fetch('http://localhost:5000/api/comparison/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData.comparisonData)
      });
      
      const comparisonResult = await comparisonResponse.json();
      
      if (comparisonResult.success) {
        setResults(comparisonResult.results);
        setComparisonStats({
          neoliane: comparisonResult.providers.neoliane,
          cegema: comparisonResult.providers.cegema,
          april: comparisonResult.providers.april,
          total: comparisonResult.stats.total,
          priceRange: comparisonResult.stats.priceRange,
          aprilLevelUsed: aprilLevelCode
        });
        setStep(4);
      } else {
        alert('Erreur lors de la comparaison: ' + (comparisonResult.message || 'Erreur inconnue'));
      }
    } catch (error) {
      console.error('❌ Erreur réseau:', error);
      alert('Erreur de connexion au serveur. Vérifiez que le serveur est démarré sur le port 5000.');
    } finally {
      setLoading(false);
    }
  };
  
  const addChild = () => {
    if (childrenCount < 6) {
      setChildrenCount(prev => prev + 1);
    } else {
      alert('Maximum 6 enfants autorisés');
    }
  };
  
  const removeChild = () => {
    if (childrenCount > 0) {
      setChildrenCount(prev => prev - 1);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const goNext = async () => {
    let isValid = true;
    
    if (step === 1) {
      isValid = await trigger(['birthDate', 'postalCode', 'startDate', 'regime']);
    } else if (step === 2) {
      isValid = await trigger(['coverageLevel']);
    } else if (step === 3) {
      isValid = await trigger(['firstName', 'lastName', 'email', 'phone', 'wantsContact']);
    }
    
    if (isValid) {
      setStep(step + 1);
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.text-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const resetForm = () => {
    reset();
    setChildrenCount(0);
    setStep(1);
    setResults([]);
    setComparisonStats(null);
  };

  const getCoverageLevelLabel = (level: string) => {
    const labels = {
      'minimum': { emoji: '🟢', text: 'Minimum', desc: 'Essentiel & économique' },
      'moyen': { emoji: '🔵', text: 'Moyen', desc: 'Bon équilibre' },
      'fort': { emoji: '🟣', text: 'Fort', desc: 'Confort renforcé' },
      'maximum': { emoji: '🔥', text: 'Maximum', desc: 'Protection optimale' }
    };
    return labels[level as keyof typeof labels] || labels.moyen;
  };

  const renderStep1 = () => (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideIn">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
            1
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Informations de simulation
            </h2>
            <p className="text-gray-600">Renseignez vos informations personnelles</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                👤
              </div>
              Vos informations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance *
                </label>
                <input
                  type="date"
                  {...register('birthDate')}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.birthDate && (
                  <p className="text-red-500 text-sm mt-2">{errors.birthDate.message}</p>
                )}
                {birthDate && (
                  <p className="text-sm text-blue-600 mt-2 font-medium">
                    ✓ Âge: {calculateAge(birthDate)} ans
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code postal *
                </label>
                <input
                  type="text"
                  {...register('postalCode')}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="39100"
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-2">{errors.postalCode.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'effet souhaitée *
                </label>
                <input
                  type="date"
                  {...register('startDate')}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-2">{errors.startDate.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Régime d'assurance maladie *
                </label>
                <select
                  {...register('regime')}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                >
                  <option value="SS">Salarié</option>
                  <option value="TNS">Travailleur Non Salarié (TNS)</option>
                  <option value="FONCTIONNAIRE">Fonctionnaire</option>
                  <option value="RETRAITE">Retraité</option>
                  <option value="ETUDIANT">Étudiant</option>
                </select>
                {errors.regime && (
                  <p className="text-red-500 text-sm mt-2">{errors.regime.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Conjoint */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  💑
                </div>
                Ajouter un conjoint
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('hasSpouse')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            {hasSpouse && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance du conjoint *
                  </label>
                  <input
                    type="date"
                    {...register('spouseBirthDate')}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.spouseBirthDate && (
                    <p className="text-red-500 text-sm mt-2">{errors.spouseBirthDate.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Régime du conjoint *
                  </label>
                  <select
                    {...register('spouseRegime')}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="SS">Salarié</option>
                    <option value="TNS">Travailleur Non Salarié (TNS)</option>
                    <option value="FONCTIONNAIRE">Fonctionnaire</option>
                    <option value="RETRAITE">Retraité</option>
                    <option value="ETUDIANT">Étudiant</option>
                  </select>
                  {errors.spouseRegime && (
                    <p className="text-red-500 text-sm mt-2">{errors.spouseRegime.message}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enfants */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    👨‍👩‍👧‍👦
                  </div>
                  Enfants à charge
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {childrenCount} enfant(s) ajouté(s)
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={addChild}
                  disabled={childrenCount >= 6}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + Ajouter un enfant
                </button>
                {childrenCount > 0 && (
                  <button
                    type="button"
                    onClick={removeChild}
                    className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
                  >
                    - Retirer
                  </button>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              {Array.from({ length: childrenCount }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-700">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm mr-2">
                        {index + 1}
                      </span>
                      Enfant {index + 1}
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date de naissance *
                      </label>
                      <input
                        type="date"
                        {...register(`childBirthDate${index}` as any)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Régime *
                      </label>
                      <select
                        {...register(`childRegime${index}` as any)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                      >
                        <option value="SS">Salarié</option>
                        <option value="ETUDIANT">Étudiant</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 pt-4">
            <div className="text-sm text-gray-500">
              Tous les champs marqués d'un * sont obligatoires
            </div>
            <button
              type="button"
              onClick={goNext}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-2"
            >
              Continuer
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideIn">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl">
            2
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Niveau de couverture
            </h2>
            <p className="text-gray-600">Choisissez le niveau de protection qui vous convient</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                🛡️
              </div>
              Choisissez votre niveau de protection
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { value: 'minimum', label: 'Minimum', icon: '🟢', desc: 'Essentiel & économique', aprilCode: '01', color: 'from-green-500 to-emerald-600' },
                { value: 'moyen', label: 'Moyen', icon: '🔵', desc: 'Bon équilibre', aprilCode: '02', color: 'from-blue-500 to-cyan-600' },
                { value: 'fort', label: 'Fort', icon: '🟣', desc: 'Confort renforcé', aprilCode: '03', color: 'from-purple-500 to-pink-600' },
                { value: 'maximum', label: 'Maximum', icon: '🔥', desc: 'Protection optimale', aprilCode: '04', color: 'from-red-500 to-orange-600' },
              ].map((level) => (
                <label
                  key={level.value}
                  className="relative cursor-pointer group"
                >
                  <input
                    type="radio"
                    value={level.value}
                    {...register('coverageLevel')}
                    className="peer hidden"
                  />
                  <div className={`
                    rounded-2xl border-2 p-5 text-center transition-all duration-300
                    ${coverageLevel === level.value 
                      ? `border-transparent bg-gradient-to-br ${level.color} text-white shadow-lg transform scale-105` 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md group-hover:transform group-hover:scale-[1.02] bg-white'
                    }
                  `}>
                    <div className={`text-3xl mb-2 ${coverageLevel === level.value ? 'filter drop-shadow-lg' : ''}`}>
                      {level.icon}
                    </div>
                    <div className={`font-bold text-lg ${coverageLevel === level.value ? 'text-white' : 'text-gray-800'}`}>
                      {level.label}
                    </div>
                    <div className={`text-sm mt-1 ${coverageLevel === level.value ? 'text-white/90' : 'text-gray-600'}`}>
                      {level.desc}
                    </div>
                    {coverageLevel === level.value && (
                      <div className="mt-3 text-xs font-medium bg-white/20 px-3 py-1 rounded-full inline-block">
                        Code April: {level.aprilCode}
                      </div>
                    )}
                  </div>
                  {coverageLevel === level.value && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              ))}
            </div>

            {errors.coverageLevel && (
              <p className="text-red-500 text-sm mt-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.coverageLevel.message}
              </p>
            )}

            {coverageLevel && (
              <div className="mt-6 p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${coverageLevel === 'minimum' ? 'bg-green-100 text-green-600' : coverageLevel === 'moyen' ? 'bg-blue-100 text-blue-600' : coverageLevel === 'fort' ? 'bg-purple-100 text-purple-600' : 'bg-red-100 text-red-600'}`}>
                    {getCoverageLevelLabel(coverageLevel).emoji}
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong className="text-gray-900">{getCoverageLevelLabel(coverageLevel).text}</strong> • 
                      <span className="text-gray-600 ml-2">{getCoverageLevelLabel(coverageLevel).desc}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Les offres April seront recherchées avec le niveau de garantie <strong>{FORM_TO_APRIL_LEVEL[coverageLevel]}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
            <button
              type="button"
              onClick={goBack}
              className="w-full md:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour
            </button>
            <button
              type="button"
              onClick={goNext}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-2"
            >
              Continuer
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideIn">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl">
            3
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Informations de contact
            </h2>
            <p className="text-gray-600">Renseignez vos coordonnées pour recevoir les offres</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                📝
              </div>
              Vos coordonnées
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  {...register('firstName')}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Jean"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  {...register('lastName')}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Dupont"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="jean.dupont@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    e.target.value = formatted;
                  }}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="06 12 34 56 78"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.phone.message}
                  </p>
                )}
                {phone && !errors.phone && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Format valide
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mt-1">
                📞
              </div>
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    {...register('wantsContact')}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Souhaitez-vous être contacté(e) par l'un de nos conseillers ?
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      En acceptant, un conseiller vous contactera pour vous proposer la mutuelle santé 
                      offrant le meilleur rapport qualité-prix selon vos besoins. Ce service est gratuit 
                      et sans engagement.
                    </p>
                    {errors.wantsContact && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.wantsContact.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-gray-50 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mt-1">
                🔒
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Confidentialité et utilisation des données
                </h3>
                <p className="text-gray-600 text-sm">
                  Vos données personnelles sont utilisées uniquement pour générer votre simulation et vous contacter 
                  si vous l'avez accepté. Elles sont stockées de manière sécurisée et ne sont en aucun cas vendues 
                  à des tiers. Vous pouvez exercer votre droit d'accès, de rectification et d'opposition à tout moment.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
            <button
              type="button"
              onClick={goBack}
              className="w-full md:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Recherche en cours...
                </span>
              ) : (
                <>
                  Voir les offres
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Résultats de votre recherche
          </h2>
          <p className="text-gray-600">Comparez les meilleures offres de mutuelle santé</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetForm}
            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Nouvelle simulation
          </button>
        </div>
      </div>
      
      {/* Animation de succès */}
      {showSuccessAnimation && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg animate-bounce z-50">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Simulation terminée avec succès !
          </div>
        </div>
      )}
      
      {comparisonStats && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-blue-600">
                {comparisonStats.total}
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                📊
              </div>
            </div>
            <div className="text-sm font-medium text-gray-800">Offres trouvées</div>
            <div className="text-xs text-gray-500 mt-1">Total des résultats</div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-emerald-600">
                {comparisonStats.neoliane?.count || 0}
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                🏢
              </div>
            </div>
            <div className="text-sm font-medium text-gray-800">Néoliane</div>
            <div className="text-xs text-gray-500 mt-1">Offres disponibles</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-orange-600">
                {comparisonStats.cegema?.count || 0}
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                🏛️
              </div>
            </div>
            <div className="text-sm font-medium text-gray-800">Cegema</div>
            <div className="text-xs text-gray-500 mt-1">Offres disponibles</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-purple-600">
                {comparisonStats.april?.count || 0}
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                🏦
              </div>
            </div>
            <div className="text-sm font-medium text-gray-800">April</div>
            <div className="text-xs text-gray-500 mt-1">
              Niveau {comparisonStats.aprilLevelUsed} ({getCoverageLevelLabel(Object.keys(FORM_TO_APRIL_LEVEL).find(key => FORM_TO_APRIL_LEVEL[key as keyof typeof FORM_TO_APRIL_LEVEL] === comparisonStats.aprilLevelUsed) || 'moyen').text})
            </div>
          </div>
        </div>
      )}
      
      {/* Barre de progression pendant le chargement */}
      {loading && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Recherche en cours...</span>
            <span>{autoScrollProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${autoScrollProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Comparaison des offres en temps réel...
          </p>
        </div>
      )}
      
      <PricingResults results={results} />
      
      {results.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            💡 Pour plus d'informations sur une offre ou pour souscrire, contactez-nous au 
            <span className="font-semibold text-blue-600 ml-1">01 23 45 67 89</span>
          </p>
        </div>
      )}
    </div>
  );

  return (
    <main>
      <NavbarA/>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          {/* En-tête */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4 mt-32">
              Comparez les Mutuelles Santé
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Obtenez en 2 minutes les meilleures offres de mutuelle santé adaptées à votre profil
            </p>
          </div>

          {/* Indicateur d'étape amélioré */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <React.Fragment key={stepNumber}>
                    <div className="relative">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                        ${step >= stepNumber 
                          ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-400'
                        } ${step === stepNumber ? 'ring-4 ring-blue-200 scale-110' : ''}
                        transition-all duration-300
                      `}>
                        {stepNumber}
                        {step > stepNumber && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {stepNumber < 4 && (
                        <div className={`
                          w-16 md:w-24 h-1 mx-2 md:mx-4 relative
                          ${step > stepNumber ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gray-200'}
                          transition-all duration-500
                        `}>
                          {step > stepNumber && (
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 animate-progress"></div>
                          )}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="flex justify-center text-sm text-gray-600">
              <div className={`w-24 text-center font-medium ${step >= 1 ? 'text-blue-600' : ''}`}>Simulation</div>
              <div className={`w-24 text-center font-medium ${step >= 2 ? 'text-blue-600' : ''}`}>Couverture</div>
              <div className={`w-24 text-center font-medium ${step >= 3 ? 'text-blue-600' : ''}`}>Contact</div>
              <div className={`w-24 text-center font-medium ${step >= 4 ? 'text-blue-600' : ''}`}>Offres</div>
            </div>
          </div>

          {/* Contenu de l'étape actuelle */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          {/* Aide rapide */}
          {step !== 4 && (
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  💡
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Besoin d'aide ?</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Notre équipe est disponible du lundi au vendredi de 9h à 18h au 
                    <span className="font-semibold text-blue-600 ml-1">01 23 45 67 89</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer/>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-progress {
          animation: progress 1s ease-in-out;
        }
      `}</style>
    </main>
  );
};

export default PricingForm;