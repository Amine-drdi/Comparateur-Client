import React, { useEffect, useState } from "react";
import axios from "axios";
import TarificationResults from "./comparateur-mutuelle-santéicationResults";

interface Person {
  id: string;
  birthDate: string;
  mandatoryScheme: string;
  role?: 'AssurePrincipal' | 'Conjoint' | 'Enfant';
}

interface Department {
  code: string;
  name: string;
}

// Nouvelle interface pour les garanties
interface Guarantee {
  code: string;
  title: string;
  levels: {
    code: string;
    title: string;
  }[];
  selectedLevel?: string;
}

const TarificationForm: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [effectDate, setEffectDate] = useState("");
  const [postCode, setPostCode] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [count, setCount] = useState(1);
  const [persons, setPersons] = useState<Person[]>([{ birthDate: "", mandatoryScheme: "" }]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [gender, setGender] = useState<string>("");
  const [familyType, setFamilyType] = useState<string>("");
  const [showDetails, setShowDetails] = useState(false);
const [guarantees, setGuarantees] = useState<Guarantee[]>([]);
const [selectedProduct, setSelectedProduct] = useState<string>("");

// Charger les produits et garanties au montage
useEffect(() => {
  const fetchProductsAndGuarantees = async () => {
    try {
      // Récupérer la liste des produits
      const productsRes = await axios.get("http://localhost:5000/api/april/products");
      
      // Pour chaque produit, récupérer les garanties
      const productsWithGuarantees = await Promise.all(
        productsRes.data.map(async (product: any) => {
          const guaranteesRes = await axios.get(
            `http://localhost:5000/api/april/products/${product.code}/guarantees`
          );
          return {
            ...product,
            guarantees: guaranteesRes.data
          };
        })
      );
      
      setProducts(productsWithGuarantees);
    } catch (err) {
      console.error("Erreur récupération produits/garanties", err);
    }
  };
  
  fetchProductsAndGuarantees();
}, []);

  // Charger les départements via backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/april/departments");
        setDepartments(res.data);
      } catch (err) {
        console.error("Erreur récupération départements", err);
      }
    };
    fetchDepartments();
  }, []);

  // Gestion changement du nombre de personnes
  const handleCountChange = (value: number) => {
    setCount(value);
    const newPersons = Array.from({ length: value }, (_, i) => persons[i] || { birthDate: "", mandatoryScheme: "" });
    setPersons(newPersons);
  };

  // Gestion changement d'une personne
  const handlePersonChange = (index: number, field: keyof Person, value: string) => {
    const updated = [...persons];
    updated[index][field] = value;
    setPersons(updated);
  };

  // Soumission du formulaire
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setResult(null);

  try {
    const res = await axios.post("http://localhost:5000/api/april/comparateur-mutuelle-santé", {
      firstName,
      lastName,
      email,
      phone,
      postCode,
      effectDate,
      birthDate,
      addressLine1,
      city,
      department: selectedDept,
      persons: persons.map((p, index) => ({
        ...p,
        role: index === 0 ? "AssurePrincipal" : 
             familyType.includes("Couple") && index === 1 ? "Conjoint" : "Enfant",
        id: `i-${index + 1}`
      })),
      gender,
      familyType
    });

    setResult(res.data.data);
  } catch (err) {
    alert("Erreur lors de la tarification");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Comparateur de Mutuelles Santé</h2>

      {/* Stepper */}
      <div className="flex justify-between items-center mb-8 relative">
        {/* Progress bar */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
        <div className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 z-0" style={{ width: `${(currentStep / 3) * 100}%` }}></div>

        {/* Steps */}
        {['Adhérant', 'Contrat', 'Informations', 'Validation'].map((step, index) => (
          <div key={index} className="flex flex-col items-center z-10">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {index + 1}
            </div>
            <span className={`mt-2 text-sm ${currentStep >= index ? 'font-medium text-blue-600' : 'text-gray-500'}`}>{step}</span>
          </div>
        ))}
      </div>

      {/* Formulaire avec étapes */}
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg space-y-6">
        {/* Étape 1 - Adhérant */}
        {currentStep === 0 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Profil de l'adhérant</h3>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sexe</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-blue-600"
                    name="gender"
                    value="Homme"
                    checked={gender === "Homme"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700">Homme</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-blue-600"
                    name="gender"
                    value="Femme"
                    checked={gender === "Femme"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700">Femme</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Type de famille</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-blue-600"
                    name="familyType"
                    value="Adulte"
                    checked={familyType === "Adulte"}
                    onChange={(e) => setFamilyType(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700">Adulte seul</span>
                </label>
                <label className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-blue-600"
                    name="familyType"
                    value="Adulte + Enfant"
                    checked={familyType === "Adulte + Enfant"}
                    onChange={(e) => setFamilyType(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700">Adulte + Enfant</span>
                </label>
                <label className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-blue-600"
                    name="familyType"
                    value="Couple"
                    checked={familyType === "Couple"}
                    onChange={(e) => setFamilyType(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700">Couple</span>
                </label>
                <label className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-blue-600"
                    name="familyType"
                    value="Couple + Enfant"
                    checked={familyType === "Couple + Enfant"}
                    onChange={(e) => setFamilyType(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700">Couple + Enfant</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Étape 2 - Contrat */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Informations du contrat</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'effet</label>
                <input
                  type="date"
                  value={effectDate}
                  onChange={(e) => setEffectDate(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de personnes</label>
              <input
                type="number"
                min="1"
                max="10"
                value={count}
                onChange={(e) => handleCountChange(parseInt(e.target.value))}
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {persons.map((p, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-800 mb-3">Personne {idx + 1}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                    <input
                      type="date"
                      value={p.birthDate}
                      onChange={(e) => handlePersonChange(idx, "birthDate", e.target.value)}
                      className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Régime obligatoire</label>
                    <input
                      type="text"
                      placeholder="ex: AlsaceMoselle"
                      value={p.mandatoryScheme}
                      onChange={(e) => handlePersonChange(idx, "mandatoryScheme", e.target.value)}
                      className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Étape 3 - Informations personnelles */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Informations personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                <input
                  type="text"
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionnez</option>
                  {departments.map((dept) => (
                    <option key={dept.code} value={dept.code}>
                      {dept.code} - {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

           { /*<div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>*/}
          </div>
        )}

        {/* Étape 4 - Validation */}
        {currentStep === 3 && (
          <div className="animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Récapitulatif</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Profil de l'adhérant</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                <p><span className="font-medium">Sexe:</span> {gender}</p>
                <p><span className="font-medium">Type de famille:</span> {familyType}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Informations du contrat</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                <p><span className="font-medium">Date d'effet:</span> {effectDate}</p>
                <p><span className="font-medium">Nombre de personnes:</span> {count}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Informations personnelles</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                <p><span className="font-medium">Nom:</span> {lastName}</p>
                <p><span className="font-medium">Prénom:</span> {firstName}</p>
                <p><span className="font-medium">Email:</span> {email}</p>
                <p><span className="font-medium">Téléphone:</span> {phone}</p>
                <p><span className="font-medium">Adresse:</span> {addressLine1}, {postCode} {city}</p>
                <p><span className="font-medium">Département:</span> {selectedDept}</p>
                <p><span className="font-medium">Date de naissance:</span> {birthDate}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-3">Personnes à assurer ({persons.length})</h4>
              {persons.map((p, idx) => (
                <div key={idx} className="mb-3 last:mb-0">
                  <p className="text-sm font-medium text-gray-700">Personne {idx + 1}</p>
                  <div className="text-sm text-gray-600">
                    <p>Date de naissance: {p.birthDate}</p>
                    <p>Régime obligatoire: {p.mandatoryScheme}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Boutons de navigation */}
        <div className="flex justify-between pt-4">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Précédent
            </button>
          ) : (
            <div></div> 
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calcul en cours...
                </span>
              ) : (
                "Valider et calculer"
              )}
            </button>
          )}
        </div>
      </form>

      {/* Résultat */}
{result && <TarificationResults results={result.results} />}

    </div>
  );
};

export default TarificationForm;