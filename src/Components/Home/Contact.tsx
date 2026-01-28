"use client";

import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp, FaClock } from "react-icons/fa";
import NavbarA from "./NavBar";
import Footer from "./Footer";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  age: string;
  situation: string;
  insuranceType: string;
  subject: string;
  message: string;
  acceptTerms: boolean;
};

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  age: "",
  situation: "",
  insuranceType: "",
  subject: "",
  message: "",
  acceptTerms: false,
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showCallbackForm, setShowCallbackForm] = useState<boolean>(false);
  const [callbackTime, setCallbackTime] = useState<string>("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      setError("Veuillez accepter les conditions de contact.");
      return;
    }
    
    setSuccess("");
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setSuccess("Votre message a bien été envoyé ✅ Un conseiller vous contactera dans les 24h.");
      setFormData(INITIAL_FORM);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("✅ Votre demande de rappel a été enregistrée. Un conseiller vous appellera à l'heure choisie.");
    setCallbackTime("");
    setShowCallbackForm(false);
  };

  const situations = [
    "Salarié",
    "TNS / Indépendant",
    "Retraité / Senior",
    "Sans emploi / Autre"
  ];

  const insuranceTypes = [
    "Mutuelle Santé",
    "Assurance Auto",
    "Assurance Habitation",
    "Assurance Emprunteur",
    "Prévoyance / Obsèques",
    "Épargne / Retraite"
  ];

  const timeSlots = [
    "9h-10h", "10h-11h", "11h-12h", 
    "14h-15h", "15h-16h", "16h-17h"
  ];

  return (
    <main>
      <NavbarA />
      <section className="py-12 mt-20 bg-gradient-to-b from-sky-50 to-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          {/* En-tête */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold leading-tight text-blue-500 sm:text-5xl lg:text-6xl">
              Contactez-nous 
            </h1>
            <div className="mx-auto mt-4 h-1.5 w-24 bg-blue-500 rounded-full" />
            <p className="max-w-2xl mx-auto mt-6 text-lg leading-relaxed text-gray-600">
              Besoin d'un devis personnalisé ? Une question sur vos garanties ? 
              Ou simplement besoin d'aide pour utiliser notre comparateur ?
            </p>
            <p className="max-w-2xl mx-auto mt-4 text-lg leading-relaxed text-gray-700 font-medium">
              Chez <span className="text-blue-600">La Mutuelle De France</span>, nous privilégions le contact humain. 
              Nos conseillers basés en France sont disponibles pour vous accompagner dans toutes vos démarches d'assurance.
            </p>
          </div>

          {/* Section Contact Rapide */}
          <div className="max-w-5xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
              Besoin d'une réponse immédiate ?
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Ne restez pas avec vos doutes. Choisissez le moyen de contact qui vous convient le mieux.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 text-center md:px-0">
              {/* Téléphone */}
              <div className="overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 rounded-full">
                    <FaPhoneAlt className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-blue-600">📞 Par Téléphone</h3>
                  <p className="mt-3 text-gray-600">Parlez directement à un expert pour une réponse claire et rapide. Appel non surtaxé.</p>
                  <p className="mt-6 text-2xl font-bold text-blue-500">01 88 81 21 08</p>
                  <p className="mt-2 text-gray-500">
                    <FaClock className="inline mr-2" />
                    Du lundi au vendredi, de 9h00 à 18h00.
                  </p>
                  <a 
                    href="tel:+33188812108" 
                    className="inline-flex items-center justify-center px-6 py-3 mt-6 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaPhoneAlt className="mr-2" />
                    Appeler maintenant
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                    <FaWhatsapp className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-blue-600">Par WhatsApp</h3>
                  <p className="mt-3 text-gray-600">Pratique et discret. Posez vos questions ou envoyez-nous vos documents directement.</p>
                  <p className="mt-6 text-2xl font-bold text-green-600">WhatsApp</p>
                  <p className="mt-2 text-gray-500">Réponse immédiate</p>
                  <a 
                    href="https://wa.me/33188812108" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 mt-6 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaWhatsapp className="mr-2" />
                    Discuter sur WhatsApp
                  </a>
                </div>
              </div>

              {/* Rappel Gratuit */}
              <div className="overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 rounded-full">
                    <FaClock className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-blue-600">Être Rappelé Gratuitement</h3>
                  <p className="mt-3 text-gray-600">Vous n'avez pas le temps ? Laissez-nous votre numéro, nous vous rappelons au créneau de votre choix.</p>
                  
                  {!showCallbackForm ? (
                    <>
                      <button
                        onClick={() => setShowCallbackForm(true)}
                        className="inline-flex items-center justify-center px-6 py-3 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaClock className="mr-2" />
                        Je veux être rappelé
                      </button>
                    </>
                  ) : (
                    <form onSubmit={handleCallbackSubmit} className="mt-6 space-y-4">
                      <input
                        type="tel"
                        placeholder="Votre numéro de téléphone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <select
                        value={callbackTime}
                        onChange={(e) => setCallbackTime(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      >
                        <option value="">Choisissez un créneau</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                      >
                        Demander un rappel
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de Demande de Devis */}
          <div className="max-w-5xl mx-auto mt-20">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
              Demande de Devis en Ligne
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Vous préférez nous écrire ? Remplissez ce formulaire rapide. 
              Nos courtiers étudient votre demande et vous envoient une proposition sous 24h.
            </p>

            <div className="overflow-hidden bg-white rounded-xl shadow-xl">
              <div className="px-8 py-12 sm:p-12">
                <form className="mt-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Vos Informations */}
                    <div className="sm:col-span-2">
                      <h3 className="text-xl font-semibold text-blue-600 mb-4">Vos Informations</h3>
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-blue-500 mb-2">
                        Nom & Prénom
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom complet"
                        className="block w-full px-5 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-blue-500 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Votre numéro de téléphone"
                        className="block w-full px-5 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-blue-500 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Votre adresse email"
                        className="block w-full px-5 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-blue-500 mb-2">
                        Âge
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Votre âge"
                        className="block w-full px-5 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    {/* Votre Besoin */}
                    <div className="sm:col-span-2">
                      <h3 className="text-xl font-semibold text-blue-600 mb-4 mt-4">Votre Besoin</h3>
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-blue-500 mb-2">
                        Situation
                      </label>
                      <select
                        name="situation"
                        value={formData.situation}
                        onChange={handleChange}
                        className="block w-full px-5 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                        required
                      >
                        <option value="">Sélectionnez votre situation</option>
                        {situations.map((situation) => (
                          <option key={situation} value={situation}>{situation}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-blue-500 mb-2">
                        Type d'Assurance
                      </label>
                      <select
                        name="insuranceType"
                        value={formData.insuranceType}
                        onChange={handleChange}
                        className="block w-full px-5 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                        required
                      >
                        <option value="">Sélectionnez un type</option>
                        {insuranceTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-lg font-medium text-blue-500 mb-2">
                        Message ou Précisions (facultatif)
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre demande..."
                        className="block w-full px-5 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Protection des données */}
                    <div className="sm:col-span-2">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="mt-1 mr-3"
                          required
                        />
                        <label className="text-gray-700">
                          J'accepte d'être contacté par La Mutuelle De France pour recevoir mon devis gratuit. 
                          Mes données sont protégées et ne seront pas vendues.
                        </label>
                      </div>
                    </div>

                    {/* Bouton d'envoi */}
                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center justify-center w-full px-8 py-4 mt-4 text-lg font-semibold text-white rounded-lg transition-all ${
                          isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                        } shadow-md hover:shadow-lg`}
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <FaPaperPlane className="mr-2" />
                            ENVOYER MA DEMANDE
                          </>
                        )}
                      </button>
                    </div>

                    {/* Messages de succès/erreur */}
                    {success && (
                      <div className="sm:col-span-2 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-700 font-medium">{success}</p>
                      </div>
                    )}

                    {error && (
                      <div className="sm:col-span-2 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 font-medium">{error}</p>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Section Adresse */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">📍 Nous trouver</h2>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-500">La Mutuelle De France</h3>
              <p className="mt-3 text-gray-600">Service Clientèle & Courtage</p>
              <div className="mt-6 flex items-center justify-center text-gray-700">
                <FaEnvelope className="mr-2 text-blue-500" />
                <a href="mailto:contact@lamutuelledefrance.fr" className="hover:text-blue-600">
                  contact@lamutuelledefrance.fr
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-20">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">FAQ -- Aide & Contact</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-blue-500 mb-3">
                  Le devis est-il vraiment gratuit ?
                </h3>
                <p className="text-gray-700">
                  Oui, toutes nos demandes de devis et nos conseils téléphoniques sont 
                  <strong> 100% gratuits et sans engagement</strong>. Vous ne payez que si vous décidez 
                  de souscrire un contrat d'assurance chez nous.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-blue-500 mb-3">
                  Quels sont vos délais de réponse ?
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Téléphone / WhatsApp :</strong> Immédiat (aux heures d'ouverture).</li>
                  <li>• <strong>Formulaire / E-mail :</strong> Sous 24 heures ouvrées.</li>
                  <li>• <strong>Comparateur Santé en ligne :</strong> Résultat instantané.</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-blue-500 mb-3">
                  J'ai déjà une assurance, pouvez-vous m'aider à changer ?
                </h3>
                <p className="text-gray-700">
                  Absolument. Si vous souscrivez un nouveau contrat avec La Mutuelle De France 
                  (Auto, Habitation, Santé après 1 an), nous nous occupons de 
                  <strong> toutes les démarches de résiliation</strong> auprès de votre ancien assureur. 
                  C'est le service "zéro paperasse".
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-blue-500 mb-3">
                  Comment faire une réclamation ?
                </h3>
                <p className="text-gray-700">
                  Votre satisfaction est notre priorité. En cas de mécontentement, vous pouvez contacter 
                  notre service qualité à l'adresse{" "}
                  <a href="mailto:reclamation@lamutuelledefrance.fr" className="text-blue-600 hover:underline">
                    reclamation@lamutuelledefrance.fr
                  </a>. 
                  Nous nous engageons à traiter votre demande sous 48h.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}