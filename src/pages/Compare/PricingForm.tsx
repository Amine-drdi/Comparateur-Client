"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import NavbarA from '@/Components/Home/NavBar';
import Footer from '@/Components/Home/Footer';
import type { Resolver } from 'react-hook-form';

// ───────────────────────────────────────────────────────────
// TYPES
// ───────────────────────────────────────────────────────────
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
  productType: string;
  coverageLevel: 'minimum' | 'moyen' | 'fort' | 'maximum';
  [key: `childBirthDate${number}`]: string;
  [key: `childRegime${number}`]: string;
}

// ───────────────────────────────────────────────────────────
// VALIDATION
// ───────────────────────────────────────────────────────────
const schema = yup.object().shape({
  firstName: yup.string().required('Le prénom est requis').min(2, 'Au moins 2 caractères'),
  lastName: yup.string().required('Le nom est requis').min(2, 'Au moins 2 caractères'),
  email: yup.string().required('L\'email est requis').email('Format d\'email invalide'),
  phone: yup.string()
    .required('Le téléphone est requis')
    .matches(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Numéro de téléphone français invalide'),
  wantsContact: yup.boolean()
    .oneOf([true], 'Vous devez accepter d\'être contacté pour continuer')
    .required('Ce champ est obligatoire'),
  birthDate: yup.string().required('La date de naissance est requise'),
  postalCode: yup.string().matches(/^\d{5}$/, 'Code postal invalide').required('Le code postal est requis'),
  startDate: yup.string().required('La date d\'effet est requise'),
  regime: yup.string().required('Le régime est requis'),
  hasSpouse: yup.boolean().default(false),
  spouseBirthDate: yup.string().nullable().notRequired(),
  spouseRegime: yup.string().nullable().notRequired(),
  productType: yup.string().default('sante'),
  coverageLevel: yup.string()
    .oneOf(['minimum', 'moyen', 'fort', 'maximum'])
    .required('Veuillez choisir un niveau de couverture'),
});

const FORM_TO_APRIL_LEVEL = {
  minimum: '01',
  moyen: '02',
  fort: '03',
  maximum: '04',
} as const;

// ───────────────────────────────────────────────────────────
// COMPOSANT
// ───────────────────────────────────────────────────────────
const PricingForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any>(null);
  const [childrenCount, setChildrenCount] = useState(0);

  const { register, handleSubmit, formState: { errors }, watch, trigger, reset } =
    useForm<PricingFormData>({
      resolver: yupResolver(schema) as unknown as Resolver<PricingFormData>,
      defaultValues: {
        productType: 'sante',
        regime: 'SS',
        hasSpouse: false,
        coverageLevel: 'moyen',
        wantsContact: false,
      },
    });

  const hasSpouse = watch('hasSpouse');
  const birthDate = watch('birthDate');
  const phone = watch('phone');
  const coverageLevel = watch('coverageLevel');

  const calculateAge = (dateString: string) => {
    if (!dateString) return null;
    const today = new Date();
    const bd = new Date(dateString);
    let age = today.getFullYear() - bd.getFullYear();
    const m = today.getMonth() - bd.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) age--;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, submitted]);

  // ─── SOUMISSION ─────────────────────────────────────────
  const onSubmit = async (data: PricingFormData) => {
    const isValid = await trigger();
    if (!isValid) {
      alert('Veuillez corriger les erreurs dans le formulaire');
      return;
    }
    if (!data.wantsContact) {
      alert('Vous devez accepter d\'être contacté');
      return;
    }

    setLoading(true);
    try {
      const childrenData = [];
      for (let i = 0; i < childrenCount; i++) {
        childrenData.push({
          birthDate: data[`childBirthDate${i}` as keyof PricingFormData] as string,
          regime: (data[`childRegime${i}` as keyof PricingFormData] as string) || 'SS',
        });
      }


      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone.replace(/\s/g, ''),
        wantsContact: data.wantsContact,
        birthDate: data.birthDate,
        postalCode: data.postalCode,
        startDate: data.startDate,
        regime: data.regime,
        productType: data.productType,
        coverageLevel: data.coverageLevel,
        hasSpouse: data.hasSpouse,
        spouseBirthDate: data.spouseBirthDate,
        spouseRegime: data.spouseRegime,
        children: childrenData,
      };

      const response = await fetch('/api/save-pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        alert('Erreur: ' + (result.message || 'Erreur inconnue'));
        return;
      }

      // ✅ Succès
      setSubmittedLead({
        firstName: data.firstName,
        email: data.email,
        leadId: result.leadId,
        emailSent: result.emailSent,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('❌ Erreur réseau:', error);
      alert('Erreur de connexion au serveur. Réessayez dans quelques instants.');
    } finally {
      setLoading(false);
    }
  };

  const addChild = () => {
    if (childrenCount < 6) setChildrenCount((c) => c + 1);
    else alert('Maximum 6 enfants autorisés');
  };
  const removeChild = () => {
    if (childrenCount > 0) setChildrenCount((c) => c - 1);
  };

  const goBack = () => step > 1 && setStep(step - 1);

  const goNext = async () => {
    let isValid = true;
    if (step === 1) {
      isValid = await trigger(['birthDate', 'postalCode', 'startDate', 'regime', 'coverageLevel']);
    } else if (step === 2) {
      isValid = await trigger(['firstName', 'lastName', 'email', 'phone', 'wantsContact']);
    }
    if (isValid) setStep(step + 1);
    else {
      const firstError = document.querySelector('.text-red-500');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const resetForm = () => {
    reset();
    setChildrenCount(0);
    setStep(1);
    setSubmitted(false);
    setSubmittedLead(null);
  };

  const getCoverageLevelLabel = (level: string) => {
    const labels = {
      minimum: { emoji: '🟢', text: 'Minimum', desc: 'Essentiel & économique' },
      moyen: { emoji: '🔵', text: 'Moyen', desc: 'Bon équilibre' },
      fort: { emoji: '🟣', text: 'Fort', desc: 'Confort renforcé' },
      maximum: { emoji: '🔥', text: 'Maximum', desc: 'Protection optimale' },
    };
    return labels[level as keyof typeof labels] || labels.moyen;
  };

  // ─── RENDU ──────────────────────────────────────────────
  return (
    <main>
      <NavbarA />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24">
        <div className="max-w-4xl mx-auto px-4">
          {!submitted ? (
            <>
              {/* En-tête */}
              <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-4 mt-32">
                  Comparez les Mutuelles Santé
                </h1>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                  Obtenez en 2 minutes les meilleures offres de mutuelle santé adaptées à votre profil
                </p>
              </div>

              {/* Indicateur d'étape */}
              <div className="mb-8 md:mb-12">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center">
                    {[1, 2].map((n) => (
                      <React.Fragment key={n}>
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                          ${step >= n ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg' : 'bg-gray-200 text-gray-400'}
                          ${step === n ? 'ring-4 ring-blue-200 scale-110' : ''}
                          transition-all duration-300
                        `}>
                          {n}
                        </div>
                        {n < 2 && (
                          <div className={`w-24 h-1 mx-4 ${step > n ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gray-200'}`} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center text-sm text-gray-600 gap-8">
                  <div className={`font-medium ${step >= 1 ? 'text-blue-600' : ''}`}>Simulation</div>
                  <div className={`font-medium ${step >= 2 ? 'text-blue-600' : ''}`}>Contact</div>
                </div>
              </div>

              {/* Étape 1 */}
              {step === 1 && (
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations de simulation</h2>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance *</label>
                        <input type="date" {...register('birthDate')}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          max={new Date().toISOString().split('T')[0]} />
                        {errors.birthDate && <p className="text-red-500 text-sm mt-2">{errors.birthDate.message}</p>}
                        {birthDate && <p className="text-sm text-blue-600 mt-2">✓ Âge: {calculateAge(birthDate)} ans</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Code postal *</label>
                        <input type="text" {...register('postalCode')}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          placeholder="39100" />
                        {errors.postalCode && <p className="text-red-500 text-sm mt-2">{errors.postalCode.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date d'effet souhaitée *</label>
                        <input type="date" {...register('startDate')}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          min={new Date().toISOString().split('T')[0]} />
                        {errors.startDate && <p className="text-red-500 text-sm mt-2">{errors.startDate.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Régime *</label>
                        <select {...register('regime')}
                          className="w-full p-3 border border-gray-300 rounded-xl bg-white">
                          <option value="SS">Salarié</option>
                          <option value="TNS">Travailleur Non Salarié (TNS)</option>
                          <option value="FONCTIONNAIRE">Fonctionnaire</option>
                          <option value="RETRAITE">Retraité</option>
                          <option value="ETUDIANT">Étudiant</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Niveau de couverture */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Niveau de couverture *</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { value: 'minimum', label: 'Minimum', icon: '🟢', color: 'from-green-500 to-emerald-600' },
                        { value: 'moyen', label: 'Moyen', icon: '🔵', color: 'from-blue-500 to-cyan-600' },
                        { value: 'fort', label: 'Fort', icon: '🟣', color: 'from-purple-500 to-pink-600' },
                        { value: 'maximum', label: 'Maximum', icon: '🔥', color: 'from-red-500 to-orange-600' },
                      ].map((lvl) => (
                        <label key={lvl.value} className="cursor-pointer">
                          <input type="radio" value={lvl.value} {...register('coverageLevel')} className="peer hidden" />
                          <div className={`rounded-2xl border-2 p-4 text-center transition-all ${
                            coverageLevel === lvl.value
                              ? `border-transparent bg-gradient-to-br ${lvl.color} text-white shadow-lg scale-105`
                              : 'border-gray-200 bg-white hover:shadow-md'
                          }`}>
                            <div className="text-2xl mb-1">{lvl.icon}</div>
                            <div className={`font-bold ${coverageLevel === lvl.value ? 'text-white' : 'text-gray-800'}`}>{lvl.label}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.coverageLevel && <p className="text-red-500 text-sm mt-3">{errors.coverageLevel.message}</p>}
                  </div>

                  {/* Conjoint */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">💑 Ajouter un conjoint</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" {...register('hasSpouse')} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    {hasSpouse && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance du conjoint *</label>
                          <input type="date" {...register('spouseBirthDate')}
                            className="w-full p-3 border border-gray-300 rounded-xl"
                            max={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Régime du conjoint *</label>
                          <select {...register('spouseRegime')} className="w-full p-3 border border-gray-300 rounded-xl bg-white">
                            <option value="SS">Salarié</option>
                            <option value="TNS">Travailleur Non Salarié</option>
                            <option value="FONCTIONNAIRE">Fonctionnaire</option>
                            <option value="RETRAITE">Retraité</option>
                            <option value="ETUDIANT">Étudiant</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enfants */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">👨‍👩‍👧‍👦 Enfants à charge</h3>
                        <p className="text-gray-600 text-sm">{childrenCount} enfant(s)</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={addChild} disabled={childrenCount >= 6}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl disabled:opacity-50">
                          + Ajouter
                        </button>
                        {childrenCount > 0 && (
                          <button type="button" onClick={removeChild}
                            className="px-4 py-2 bg-gray-500 text-white rounded-xl">
                            - Retirer
                          </button>
                        )}
                      </div>
                    </div>
                    {Array.from({ length: childrenCount }).map((_, i) => (
                      <div key={i} className="bg-white rounded-xl p-4 mb-3 border border-gray-200">
                        <p className="font-medium text-gray-700 mb-3">Enfant {i + 1}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input type="date" {...register(`childBirthDate${i}` as any)}
                            className="w-full p-3 border border-gray-300 rounded-xl"
                            max={new Date().toISOString().split('T')[0]} />
                          <select {...register(`childRegime${i}` as any)} className="w-full p-3 border border-gray-300 rounded-xl bg-white">
                            <option value="SS">Salarié</option>
                            <option value="ETUDIANT">Étudiant</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button type="button" onClick={goNext}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg">
                      Continuer →
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 2 */}
              {step === 2 && (
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations de contact</h2>

                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                        <input type="text" {...register('firstName')}
                          className="w-full p-3 border border-gray-300 rounded-xl" placeholder="Jean" />
                        {errors.firstName && <p className="text-red-500 text-sm mt-2">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                        <input type="text" {...register('lastName')}
                          className="w-full p-3 border border-gray-300 rounded-xl" placeholder="Dupont" />
                        {errors.lastName && <p className="text-red-500 text-sm mt-2">{errors.lastName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input type="email" {...register('email')}
                          className="w-full p-3 border border-gray-300 rounded-xl" placeholder="jean.dupont@example.com" />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                        <input type="tel" {...register('phone')}
                          onChange={(e) => { e.target.value = formatPhone(e.target.value); }}
                          className="w-full p-3 border border-gray-300 rounded-xl" placeholder="06 12 34 56 78" />
                        {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" {...register('wantsContact')} className="mt-1 w-5 h-5" />
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Souhaitez-vous être contacté(e) par un conseiller ? *
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Un conseiller vous contactera pour vous proposer la meilleure mutuelle santé.
                          Service gratuit et sans engagement.
                        </p>
                        {errors.wantsContact && <p className="text-red-500 text-sm mt-2">{errors.wantsContact.message}</p>}
                      </div>
                    </label>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
                    <button type="button" onClick={goBack}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50">
                      ← Retour
                    </button>
                    <button type="button" onClick={handleSubmit(onSubmit)} disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50">
                      {loading ? '⏳ Envoi en cours...' : '✅ Valider ma demande'}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            // ─── ÉCRAN DE SUCCÈS ─────────────────────────────
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fadeIn">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Merci {submittedLead?.firstName} ! 🎉
              </h2>

              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                Votre demande a bien été enregistrée. Un conseiller vous contactera prochainement pour vous présenter les meilleures offres.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-lg mx-auto mb-8">
                <p className="text-sm text-gray-700 mb-2">
                  📧 Un email de confirmation a été envoyé à :
                </p>
                <p className="font-semibold text-blue-700">{submittedLead?.email}</p>
                {submittedLead?.emailSent === false && (
                  <p className="text-xs text-orange-600 mt-2">
                    ⚠️ L'email n'a pas pu être envoyé — un conseiller vous contactera directement.
                  </p>
                )}
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 max-w-lg mx-auto mb-8 text-left">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>📞 Besoin d'aide ?</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Notre équipe est disponible du lundi au vendredi, 9h-18h, au{' '}
                  <span className="font-semibold text-blue-600">01 23 45 67 89</span>.
                </p>
              </div>

              <button onClick={resetForm}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl">
                Nouvelle simulation
              </button>
            </div>
          )}

          {/* Aide rapide */}
          {!submitted && step !== 2 && (
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              <p className="text-gray-600 text-sm">
                💡 Besoin d'aide ? Appelez-nous au <span className="font-semibold text-blue-600">01 23 45 67 89</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
    </main>
  );
};

export default PricingForm;