import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import {
  FaCheckCircle
} from 'react-icons/fa';
import {
  regimesSociaux
} from "../../assets/mutuelle-sante/Data/regimesSociaux";
import {
  codesPostaux
} from "../../assets/mutuelle-sante/Data/codesPostaux";
import {
  registerDevis,
  getDevisById,
  updateDevis ,

} from "../../api/devisApi";
import { demandeRappel } from '../../api/devisApi';
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
import { useNavigate } from 'react-router-dom';
import SubscriptionModal from './SubscriptionModal';
import Neo from "../../../public/images/Neo.webp"
// Types
type Props = {
  id?: string;
};

type NiveauRemboursement = {
  soinsCourants: string;
  hospitalisation: string;
  dentaire: string;
  optique: string;
};

type FormData = {
  genre: string;
  couverture: string;
  dateNaissance: string;
  regimeSocial: string;
  codePostal: string;
  selectedCode: CodePostalOption;
  dateDebutAssurance: string;
  typeCouverture: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  accepteAppel: string;
  conditionsAcceptees: boolean;
  niveauRemboursement: NiveauRemboursement;
  dateNaissanceConjoint: string;
  nombreEnfants: number;
  datesNaissanceEnfants: string[];
};
type DevisPayload = Omit<FormData, 'selectedCode'>;

type ResultatDevis = {
  nom: string | null;
  formule_label: string | null;
  montant: number | null;
  type_assurance: string | null;
  gamme_label: string;
  formule_id: string ;
  gamme_id: string;
  warranties_typed?: {
    soins_courants: string | null;
    hospitalisation: string | null;
    dentaire: string | null;
    optique: string | null;
  };
}[];

type CodePostalOption = {
  value: string;
  label: string;
} | null;

type FieldErrors = {
  [key: string]: string;
};

function CompareMutuelleSante({ id }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [montantMin, setMontantMin] = useState('');
    const [montantMax, setMontantMax] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [drawerType, setDrawerType] = useState<null | 'profil' | 'garantie'>(null);
    const [formData, setFormData] = useState<FormData>({
      genre: '',
      couverture: '',
      dateNaissance: '',
      regimeSocial: '',
      codePostal: '',
      selectedCode: null,
      dateDebutAssurance: '',
      typeCouverture: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      accepteAppel: '',
      conditionsAcceptees: false,
      niveauRemboursement: {
        soinsCourants: '',
        hospitalisation: '',
        dentaire: '',
        optique: '',
      },
      dateNaissanceConjoint: '',
      nombreEnfants: 0,
      datesNaissanceEnfants: []
    });
   
    const navigate = useNavigate();
const [showModal, setShowModal] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedOffer, setSelectedOffer] = useState<ResultatDevis[number] | null>(null);
const [accessToken, setAccessToken] = useState<string>('YOUR_ACCESS_TOKEN_HERE');
    const [result, setResult] = useState<ResultatDevis | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<FieldErrors>({});
    const [step, setStep] = useState<number>(1);
    const [filteredCodes, setFilteredCodes] = useState(codesPostaux);
    const [garantieFilters, setGarantieFilters] = useState({
      soinsCourants: '',
      hospitalisation: '',
      dentaire: '',
      optique: '',
    });
    const [demandeRappelEnAttente, setDemandeRappelEnAttente] = useState(false);
    const niveaux = ['', '1', '2', '3', '4', '5'];

    useEffect(() => {
      if (id) {
        const fetchDevis = async () => {
          try {
            const response = await getDevisById(id);
            const data = response.data;
            setFormData({
              genre: data.genre || '',
              couverture: data.couverture || '',
              dateNaissance: data.dateNaissance || '',
              regimeSocial: data.regimeSocial || '',
              codePostal: data.codePostal || '',
              selectedCode: codesPostaux.find(c => c.value === data.codePostal) || null,
              dateDebutAssurance: data.dateDebutAssurance || '',
              typeCouverture: data.typeCouverture || '',
              nom: data.nom || '',
              prenom: data.prenom || '',
              email: data.email || '',
              telephone: data.telephone || '',
              niveauRemboursement: {
                soinsCourants: data.niveauRemboursement?.soinsCourants || '',
                hospitalisation: data.niveauRemboursement?.hospitalisation || '',
                dentaire: data.niveauRemboursement?.dentaire || '',
                optique: data.niveauRemboursement?.optique || ''
              },
              accepteAppel: data.accepteAppel || '',
              conditionsAcceptees: data.conditionsAcceptees || false
            });
          } catch (error) {
            console.error("Erreur lors du chargement du devis :", error);
          }
        };
  
        fetchDevis();
      }
    }, [id]);
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData({ ...formData, codePostal: value });
  
      if (value) {
        const filtered = codesPostaux.filter((code) =>
          code.value.includes(value) || code.label.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCodes(filtered);
      } else {
        setFilteredCodes(codesPostaux);
      }
    };
  
    const handleSelectCode = (code: Exclude<CodePostalOption, null>) => {
      setFormData({
        ...formData,
        codePostal: code.value,
        selectedCode: code,
      });
      setFilteredCodes([]);
    };
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    // Appel à notre backend qui va contacter Néoliane
    const formatDateForNeoliane = (date: string) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      };
      
      const mapRegimeToNeoliane = (regime: string) => {
        switch (regime) {
          case 'salarie': return '1';
          case 'sans_emploi': return '7';
          case 'retraite': return '4';
          case 'fonctionnaire': return '9';
          default: return '1';
        }
      };
      
      const getTarifNeoliane = async () => {
        const payload: any = {
          postalcode: formData.codePostal,
          effectdate: formatDateForNeoliane(formData.dateDebutAssurance),
          birthdate_adult1: formatDateForNeoliane(formData.dateNaissance),
          regime_adult1: mapRegimeToNeoliane(formData.regimeSocial),
        };
      
        if (formData.dateNaissanceConjoint) {
          payload.birthdate_adult2 = formatDateForNeoliane(formData.dateNaissanceConjoint);
          payload.regime_adult2 = mapRegimeToNeoliane(formData.regimeSocial);
        }
      
        formData.datesNaissanceEnfants.forEach((date, index) => {
          if (date) {
            payload[`birthdate_child${index + 1}`] = formatDateForNeoliane(date);
            payload[`regime_child${index + 1}`] = mapRegimeToNeoliane(formData.regimeSocial);
          }
        });
      
        console.log("🔍 Payload Néoliane :", payload);
      
        try {
          const response = await axios.post('http://localhost:5000/api/neoliane/comparateur-mutuelle-santé', payload);
          console.log("Réponse API :", response.data);
          setResult(response.data.value);
        } catch (error) {
          console.error('Erreur appel Néoliane', error);
          setError({ general: "Erreur lors de la tarification Néoliane." });
        }
      };


      const getTarifApril = async (userData: any) => {
  try {
    const response = await axios.post('http://localhost:5000/api/april/comparateur-mutuelle-santé', userData);
    return response.data;
  } catch (error) {
    console.error('Erreur appel April', error);
    return [];
  }
};
      


  
  
      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError({});
        setStep(6);
      
        const { selectedCode, ...dataToSend } = formData;
      
        try {
          // Étape 1 : préparer le payload pour Néoliane
          const payload: any = {
            postalcode: formData.codePostal,
            effectdate: formatDateForNeoliane(formData.dateDebutAssurance),
            birthdate_adult1: formatDateForNeoliane(formData.dateNaissance),
            regime_adult1: mapRegimeToNeoliane(formData.regimeSocial),
          };
      
          if (formData.dateNaissanceConjoint) {
            payload.birthdate_adult2 = formatDateForNeoliane(formData.dateNaissanceConjoint);
            payload.regime_adult2 = mapRegimeToNeoliane(formData.regimeSocial);
          }
      
          formData.datesNaissanceEnfants.forEach((date, index) => {
            if (date) {
              payload[`birthdate_child${index + 1}`] = formatDateForNeoliane(date);
              payload[`regime_child${index + 1}`] = mapRegimeToNeoliane(formData.regimeSocial);
            }
          });
      
          // Étape 2 : appel API Néoliane direct
          const response = await axios.post('http://localhost:5000/api/neoliane/comparateur-mutuelle-santé', payload);
          const resultData = response.data.value;
      
          setResult(resultData); // maj état local
      
          // Étape 3 : recalcul des résultats filtrés manuellement
          const niveauMap = { Minimum: 1, Moyen: 2, Fort: 3, Maximum: 4 };
      
          const filteredToSend = resultData
            ?.filter((produit: any) => produit.type === "sante")
            ?.filter((produit: any) => {
              const matchNom = true;
              const matchMin = montantMin ? (produit.montant ?? 0) >= parseFloat(montantMin) : true;
              const matchMax = montantMax ? (produit.montant ?? 0) <= parseFloat(montantMax) : true;
      
              const matchGarantie = Object.entries(warrantyCategoryMap).every(([key, warrantyId]) => {
                const niveauSouhaite = niveauMap[formData.niveauRemboursement[key as keyof NiveauRemboursement]];
                if (!niveauSouhaite) return true;
                const garantie = produit.warranty?.[warrantyId];
                const niveauGarantie = getMaxWarrantyValueLevel(garantie);
                return niveauGarantie >= niveauSouhaite;
              });
      
              return matchNom && matchMin && matchMax && matchGarantie;
            });
      
          // Étape 4 : enregistrement et envoi mail
          await registerDevis(dataToSend, filteredToSend ?? []);
          console.log("Réponse API :", response.data);
        } catch (error) {
          console.error('Erreur lors de la tarification :', error);
          setError({ general: "Erreur lors de la tarification Néoliane." });
        } finally {
          setLoading(false);
        }
      };
      
  // Scroll automatique au changement d’étape
useEffect(() => {
  window.scrollTo({ top: 10, behavior: 'smooth' });
}, [step]);
  
    const handleNiveauChange = (categorie: keyof NiveauRemboursement, valeur: string) => {
      setFormData(prev => ({
        ...prev,
        niveauRemboursement: {
          ...prev.niveauRemboursement,
          [categorie]: valeur
        }
      }));
    };
  
    const nextStep = () => {
      const errors: FieldErrors = {};
  
      if (step === 1) {
        if (!formData.genre) errors.genre = "Genre requis";
        if (!formData.couverture) errors.couverture = "Couverture requise";
        if (!formData.dateNaissance) errors.dateNaissance = "Date de naissance requise";
        if (!formData.regimeSocial) errors.regimeSocial = "Régime social requis";
      } else if (step === 2) {
        if (!formData.codePostal) errors.codePostal = "Code postal requis";
        if (!formData.dateDebutAssurance) errors.dateDebutAssurance = "Date requise";
        if (!formData.typeCouverture) errors.typeCouverture = "Type de couverture requis";
      } else if (step === 3) {
        if (!formData.niveauRemboursement.soinsCourants) errors.soinsCourants = 'Niveau requis';
        if (!formData.niveauRemboursement.hospitalisation) errors.hospitalisation = 'Niveau requis';
        if (!formData.niveauRemboursement.dentaire) errors.dentaire = 'Niveau requis';
        if (!formData.niveauRemboursement.optique) errors.optique = 'Niveau requis';
        if (!formData.accepteAppel) errors.accepteAppel = 'Choix requis';
        if (!formData.conditionsAcceptees) errors.conditionsAcceptees = 'Condition requise';

      } else if (step === 4) {
        if (!formData.nom) errors.nom = "Nom requis";
        if (!formData.prenom) errors.prenom = "Prénom requis";
        if (!formData.email) errors.email = "Email requis";
        if (!formData.telephone) errors.telephone = "Téléphone requis";
      }
  
      if (Object.keys(errors).length > 0) {
        setError(errors);
        return;
      }
  
      setError({});
      setStep(step + 1);
    };
    const stepsData = [
        { label: 'Adhérent', number: 1 },
        { label: 'Contrat', number: 2 },
        { label: 'Couverture', number: 3 },
        { label: 'Coordonnées', number: 4 },
        { label: 'Vérification', number: 5 },
      ];
      
    const prevStep = () => setStep(step - 1);
  
    const getRegimeSocialLabel = (value: string) => {
      switch (value) {
        case 'salarie':
          return 'Salarié';
        case 'sans_emploi':
          return 'Sans emploi';
        case 'retraite':
          return 'SS';
        case 'fonctionnaire':
          return 'Fonctionnaire';
        default:
          return value;
      }
    };
  
    const getCouvertureLabel = (value: string) => {
      switch (value) {
        case 'adulte':
          return 'Un adulte';
        case 'adulte_enfant':
          return 'Adulte + enfant';
        case 'couple':
          return 'Un couple';
        case 'couple_enfant':
          return 'Couple + enfant';
        default:
          return value;
      }
    };





    const WarrantyDots = ({ value }: { value: string | null }) => {
      const getLevel = () => {
        if (!value || value.toLowerCase().includes("néant")) return 0;
        const num = parseInt(value.replace(/\D/g, ""));
        if (value.includes("€")) {
          if (num >= 150) return 5;
          if (num >= 125) return 4;
          if (num >= 100) return 3;
          if (num >= 75) return 2;
          return 1;
        }
        if (value.includes("%")) {
          if (num >= 150) return 5;
          if (num >= 125) return 4;
          if (num >= 100) return 3;
          if (num >= 75) return 2;
          return 1;
        }
        return 1;
      };
    
      const level = getLevel();
    
      return (
        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < level ? 'bg-blue-500' : 'bg-blue-200'
              }`}
            ></span>
          ))}
        </div>
      );
    };
    

   // ✅ Déclare d'abord la fonction
  // Traduit une seule valeur (ex: "150%", "100 €", "Néant") en niveau 1 à 5
const convertValueToLevel = (valeur: string): number => {
  if (!valeur || valeur.toLowerCase().includes("néant")) return 0;
  const num = parseInt(valeur.replace(/\D/g, ""));
  if (valeur.includes("€") || valeur.includes("%")) {
    if (num >= 200) return 5;
    if (num >= 150) return 4;
    if (num >= 125) return 3;
    if (num >= 100) return 2;
    if (num > 0) return 1;
  }
  return 1;
};

// Retourne le niveau MAX d'une garantie : soins, optique, etc.
const getMaxWarrantyValueLevel = (warranty: any): number => {
  if (!warranty || typeof warranty !== "object" || !warranty.garanties) return 0;

  const values = Object.values(warranty.garanties).map((g: any) =>
    convertValueToLevel(g.valeur)
  );
  return Math.max(0, ...values);
};

const warrantyCategoryMap: Record<string, string> = {
  soinsCourants: "112",
  hospitalisation: "109",
  dentaire: "110",
  optique: "111",
};

  

// ✅ Ensuite tu peux définir filteredResults
const filteredResults = result
  ?.filter((produit) => produit.type === "sante")
  ?.filter((produit) => {
    const matchNom = produit.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    const matchMin = montantMin ? (produit.montant ?? 0) >= parseFloat(montantMin) : true;
    const matchMax = montantMax ? (produit.montant ?? 0) <= parseFloat(montantMax) : true;

    const niveauMap: Record<string, number> = {
      Minimum: 1,
      Moyen: 2,
      Fort: 3,
      Maximum: 4,
    };
    
    const matchGarantie = Object.entries(warrantyCategoryMap).every(([key, warrantyId]) => {
      const niveauSouhaite = niveauMap[formData.niveauRemboursement[key as keyof NiveauRemboursement]];
      if (!niveauSouhaite) return true; // si l'utilisateur n’a rien sélectionné
      const garantie = produit.warranty?.[warrantyId];
      const niveauGarantie = getMaxWarrantyValueLevel(garantie);
      return niveauGarantie >= niveauSouhaite;
    });
    

    return matchNom && matchMin && matchMax && matchGarantie;
  });

  const getWarrantyIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'soins courants':
        return '🩺';
      case 'hospitalisation':
        return '🚑';
      case 'dentaire':
        return '🦷';
      case 'optique':
        return '👓';
      default:
        return '💊';
    }
  };

  const handleDemandeRappel = async (offre: any) => {
    try {
     
  
      const payload = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        codePostal: formData.codePostal,
        dateNaissance: formData.dateNaissance,
        genre: formData.genre,
        regimeSocial: formData.regimeSocial,
        offre: {
          gamme: selectedOffer.gamme_label,
          formule: selectedOffer.formule_label,
          montant: selectedOffer.montant,
          garanties: selectedOffer.warranty
        }
      };
  
      await demandeRappel(payload);
      alert("Demande de rappel envoyée !");
    } catch (error) {
      console.error("Erreur lors de la demande de rappel :", error);
      alert("Erreur !");
    }
  };
  
  
  
  useEffect(() => {
    if (demandeRappelEnAttente && selectedOffer) {
      handleDemandeRappel(selectedOffer);
      setDemandeRappelEnAttente(false);
    }
  }, [selectedOffer, demandeRappelEnAttente]);
  
  const handleDemandeRappelClick = (produit: any) => {
    setSelectedOffer(produit);
    setDemandeRappelEnAttente(true);
  };
  
  const handleChooseOffer = (offer: ResultatDevis[number]) => {
  setSelectedOffer(offer);
  setIsModalOpen(true);
};

    
    return (
      <div className="w-full max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8 bg-white ">

            <h1 className="text-2xl md:text-3xl font-semibold text-sky-800 text-center mb-8">
                Comparateur de Mutuelles Santé
            </h1>
            
            {/* Barre de progression */}
            <div className="relative mb-8">
      {/* Les cercles numérotés */}
      <div className="flex justify-between relative z-10">
        {stepsData.map(({ label, number }) => (
          <div key={number} className="flex flex-col items-center" style={{ width: `${100 / stepsData.length}%` }}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 text-white text-lg font-bold 
                ${step >= number ? 'bg-sky-800' : 'bg-gray-300 text-gray-500'}`}
            >
              {/* Icône simulée par un numéro stylisé */}
              <span>{number}</span>
            </div>
            <span className={`text-xs text-center ${step >= number ? 'text-sky-800 font-semibold' : 'text-gray-500'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Barre de progression arrière */}
      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0"></div>

      {/* Barre de progression avant */}
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
                                          <img src={hommeImg} className="text-6xl mb-2 text-sky-800" />
                                          <span>Homme</span> 
                                      </button>
                                      <button
                                          type="button"
                                          onClick={() => setFormData({...formData, genre: 'femme'})}
                                          className={`p-4 border rounded-lg flex flex-col items-center transition ${formData.genre === 'femme' ? 'border-sky-500 bg-sky-50 text-sky-800' : 'border-gray-300 hover:border-sky-300'}`}
                                      >
                                          <img src={femmeImg} className="text-6xl mb-2 text-sky-800" />
                                          <span>Femme</span>
                                      </button>
                                  </div>
                                  {error.genre && <p className="text-red-500 text-sm mt-2 text-center">{error.genre}</p>}

                              </div>
                              <div>
                                  <label className="block text-gray-700 font-semibold mb-3">Qui souhaitez-vous assurer ?</label>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                      {[
                                          { value: 'adulte', label: 'Un adulte', icon: <img  src={femmeImg} className="text-6xl mb-2 text-sky-800" /> },
                                          { value: 'adulte_enfant', label: 'Un adulte + enfant', icon: <div className="flex items-center justify-center mb-2"><img src={enfantsImg} className="text-6xl mb-2 text-sky-800" /></div> },
                                          { value: 'couple', label: 'Un couple', icon: <img src={conjointImg} className="text-6xl mb-2 text-sky-800" /> },
                                          { value: 'couple_enfant', label: 'Un couple + enfant', icon: <div className="flex items-center justify-center mb-2"><img src={familleImg} className="text-6xl mb-2 text-sky-800" /></div> }
                                      ].map((option) => (
                                          <button
                                              key={option.value}
                                              type="button"
                                              onClick={() => setFormData({...formData, couverture: option.value})}
                                              className={`p-4 border rounded-lg flex flex-col items-center transition ${formData.couverture === option.value ? 'border-sky-500 bg-sky-50 text-sky-800' : 'border-gray-300 hover:border-sky-300'}`}
                                          >
                                              {option.icon}
                                              <span>{option.label}</span>
                                          </button>
                                      ))}
                                  </div>
                                  {error.couverture && <p className="text-red-500 text-sm mt-1">{error.couverture}</p>}
                              </div>
          
                              <div>
                                  <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                                  <img src={calandrierImg} className="w-10 h-10 mr-2" alt="icon" />
                                      Date de naissance
                                  </label>
                                  <input
                                      type="date"
                                      name="dateNaissance"
                                      value={formData.dateNaissance}
                                      onChange={handleChange}
                                      required
                                      className="w-full sm:w-[300px] px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"                                  />
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
      className="w-full sm:w-[300px] px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"    />
  </div>
) : null}

{formData.couverture === 'adulte_enfant' || formData.couverture === 'couple_enfant' ? (
  <div>
    <label className="block text-gray-700 font-semibold mb-2">
      Nombre d’enfants à assurer
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
      className="w-full sm:w-[300px] px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"    />

    {/* champs dates enfants */}
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
          className="w-full sm:w-[300px] px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"        />
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
                          //size={5} // Définit une liste visible avec 5 options affichées
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
               { 
                    step === 2 && (
                        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                                    <img src={codePostale} className="w-10 h-10 mr-2" alt="icon"  />
                                    Code Postal
                                </label>
                                <input
                                    type="text"
                                    name="codePostal"
                                    value={formData.codePostal}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full sm:w-[300px] px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"                                    pattern="\d{5}"
                                    title="5 chiffres requis"
                                />
                            {error.codePostal && <p className="text-red-500 text-sm mt-1">{error.codePostal}</p>}
                                {filteredCodes.length > 0 && (
                                    <ul className="mt-2 border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
                                        {filteredCodes.map((code) => (
                                            <li
                                                key={code.value}
                                                onClick={() => handleSelectCode(code)}
                                                className="px-4 py-2 cursor-pointer hover:bg-sky-500 hover:text-white"
                                            >
                                                {code.value} - {code.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
            
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 flex items-center">
                                <img src={calandrierImg} className="w-10 h-10 mr-2" alt="icon" />
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
                                <img src={assurance} className="w-10 h-10 mr-2" alt="icon" />

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
                                <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-sky-800 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Continuer
                        </button>
                    </div>
                            </div>
                        </form>
                    )}

            {/* Étape 3: Coordonnées */}
            {step === 3 && (
                           <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                           <div className="bg-sky-50 p-6 rounded-lg">
                               <h2 className="text-xl font-semibold text-sky-800 mb-4">
                                   Quel niveau de remboursement souhaitez-vous ?
                               </h2>
                               <p className="text-gray-600 mb-6">
                                   Pas d'inquiétude, vous pourrez modifier votre couverture sur la page de résultats.<br/>
                                   <span className="text-red-500">Attention, sélectionner le niveau maximum réduira le nombre de résultats proposés.</span>
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
                                       {error.accepteAppel && <p className="text-red-500 text-sm mt-1">{error.accepteAppel}</p>}
                   
                                   </div>
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
                                    {error.conditionsAcceptees && <p className="text-red-500 text-sm mt-1">{error.conditionsAcceptees}</p>}
                                   <span className="ml-2 text-sm text-gray-600">
                                       J'accepte les conditions d'utilisation et d'être contacté par les partenaires 
                                       Assurance Santé pour recevoir des offres personnalisées.
                                   </span>
                               </label>
                           </div>
                   
                           <div className="flex justify-between">
                               <button
                                   type="button"
                                   onClick={prevStep}
                                   className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg"
                               >
                                   Retour
                               </button>
                               <div className="flex justify-end">
                                           <button
                                               type="submit"
                                               className="bg-sky-800 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                                           >
                                               Continuer
                                           </button>
                                       </div>
                           </div>
                       </form>
                        )}

            {/* Nouvelle Étape 4: Couverture */}
            {step === 4 && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      nextStep();
    }}
    className="animate-fade-in bg-gradient-to-br from-white via-blue-50 to-sky-100 rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto"
  >
    <h2 className="text-2xl font-bold text-sky-800 mb-6 text-center">Vos coordonnées</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-2 flex items-center">
          <img src={nomIcon} className="w-8 h-8 mr-2" alt="Nom" />
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
        <label className="block text-gray-700 font-semibold mb-2 flex items-center">
          <img src={nomIcon} className="w-8 h-8 mr-2" alt="Prénom" />
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
      <label className="block text-gray-700 font-semibold mb-2 flex items-center">
        <img src={mailIcon} className="w-8 h-8 mr-2" alt="Email" />
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
      <label className="block text-gray-700 font-semibold mb-2 flex items-center">
        <img src={phoneIcon} className="w-8 h-8 mr-2" alt="Téléphone" />
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
                                       <h3 className="text-xl text-sky-800 mb-4 flex items-center">
                                           <FaCheckCircle className="mr-2" />
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
                                               <>
                                                   <FaCheckCircle className="mr-2" />
                                                   Confirmer et obtenir mon devis
                                               </>
                                           )}
                                       </button>
                                   </div>
                               </div>
            )}

            {/* Étape 6 : Résultats de la tarification Néoliane */}
            {step === 6 && (
  <div className="space-y-6 mt-10">
    <h2 className="text-2xl font-bold text-center text-sky-800">Résultats de votre tarification</h2>
   
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
        <div className="flex flex-col md:flex-row  gap-2">
          <p className="text-gray-700 font-medium">
            {filteredResults?.length ?? 0} formule(s) trouvée(s)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
           
           <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-50 border border-sky-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required 
            placeholder="Rechercher par nom de la gamme"
            />
            <input
              type="number"
              placeholder="Montant min"
              value={montantMin}
              onChange={(e) => setMontantMin(e.target.value)}
              className="bg-gray-50 border border-sky-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required 

            />
            <input
              type="number"
              placeholder="Montant max"
              value={montantMax}
              onChange={(e) => setMontantMax(e.target.value)}
              className="bg-gray-50 border border-sky-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required 

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
    <div
      key={index}
      className="bg-white w-full p-6 rounded-2xl shadow-md border flex flex-col gap-4 hover:shadow-lg transition-all"
    >
     <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-4">

        {/* Colonne gauche */}
        <div className="flex items-center gap-4 w-full md:w-1/5">
        <img src={Neo} alt="Logo Néoliane" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />

          <div>
            <span className="text-lg font-medium text-sky-900">{produit.gamme_label || produit.nom}</span>
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
          <p className="text-sm text-gray-500">Budget estimé : {(produit.montant! * 12).toFixed(2)} €/an</p>
          <div className="flex flex-wrap justify-end gap-2">
      
            <button onClick={() => handleDemandeRappelClick(produit)} className="border border-orange-500 text-orange-500 font-semibold px-4 py-1.5 rounded-lg text-sm hover:bg-orange-50">📞 Être rappelé par un expert</button>
           
            {/*<button  
            onClick={() => handleChooseOffer(produit)}
            className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-orange-600">
              Ajouter au panier
              </button>*/}

              <button  
            onClick={() => handleDemandeRappelClick(produit)}
            className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-orange-600">
              Ajouter au panier
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
            <strong >Formule :</strong> {produit.formule_label || 'Non spécifié'}    
          </p>
          <p className="text-gray-700 mb-2">
            <strong>type d'assurance : </strong>{produit.type_assurance || 'Non spécifié'}  
          </p>
          {produit.warranty && Object.values(produit.warranty).map((w: any, i) => (
  <div key={i} className="mb-4">
    <p className="font-semibold text-sky-900">
      {getWarrantyIcon(w.libelle)} {w.libelle}
    </p>
    {w.garanties && (
      <ul className="list-disc ml-5 text-sm text-gray-700">
        {Object.values(w.garanties).map((g: any) => (
          <li key={g.id}>{g.libelle} : {g.valeur}</li>
        ))}
      </ul>
    )}
  </div>
))}

              <div className="flex justify-center">
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="text-sm text-sky-800 underline hover:text-sky-600 transition"
      >
        {isOpen ? 'Moins de détails' : 'Plus de détails'}
      </button>
    </div>
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
          {/* Exemple de champs profil */}
          <label className="block text-gray-700 font-semibold  flex items-center">
          Nom
        </label>
          <input
            type="text"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            placeholder="Nom"
            className="w-full border border-gray-300 p-2 rounded"
          />
            <label className="block text-gray-700 font-semibold  flex items-center">
          Prenom
        </label>
          <input
            type="text"
            value={formData.prenom}
            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
            placeholder="Prénom"
            className="w-full border border-gray-300 p-2 rounded"
          />
        <label className="block text-gray-700 font-semibold  flex items-center">
          Email
        </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded"
          />
        <label className="block text-gray-700 font-semibold flex items-center">
          Téléphone
        </label>
          <input
            type="tel"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            placeholder="Téléphone"
            className="w-full border border-gray-300 p-2 rounded"
          />
        <label className="block text-gray-700 font-semibold flex items-center">
          Date de naissance
        </label>
          <input
  type="date"
  value={formData.dateNaissance}
  onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
  className="w-full border border-gray-300 p-2 rounded"
  placeholder="Date de naissance"
/>
      <label className="block text-gray-700 font-semibold flex items-center">
          Date d'effet
        </label>
<input
  type="date"
  value={formData.dateDebutAssurance}
  onChange={(e) => setFormData({ ...formData, dateDebutAssurance: e.target.value })}
  className="w-full border border-gray-300 p-2 rounded"
  placeholder="Date d'effet"
/>
<label className="block text-gray-700 font-semibold flex items-center">
          Code postal
        </label>
<input
    type="text"
    value={formData.codePostal}
    onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
    placeholder="Code postal"
    className="w-full border border-gray-300 p-2 rounded"
  />
            <label className="block text-gray-700 font-semibold flex items-center">
            Régime social
        </label>
<select
  value={formData.regimeSocial}
  onChange={(e) => setFormData({ ...formData, regimeSocial: e.target.value })}
  className="w-full border border-gray-300 p-2 rounded"
>
  <option value="">Sélectionner votre régime social</option>
  {regimesSociaux.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select>

        </div>
      )}

      {drawerType === 'garantie' && (
        <div className="space-y-4">
          {['soinsCourants', 'hospitalisation', 'dentaire', 'optique'].map((key) => (
            <div key={key}>
              <label className="block font-semibold text-gray-700 capitalize">{key}</label>
              <select
                value={formData.niveauRemboursement[key as keyof NiveauRemboursement]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    niveauRemboursement: {
                      ...prev.niveauRemboursement,
                      [key]: e.target.value,
                    },
                  }))
                }
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option 
                
                
                
                value="">Choisir</option>
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
  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
  onClick={async () => {
    setDrawerType(null);
    setLoading(true);
    await getTarifNeoliane(); // Recharge les offres selon les nouvelles infos
    setLoading(false);
  }}
>
   Enregistrer
</button>

      </div>
    </div>
  </div>
)}
{isModalOpen && selectedOffer && (
  <SubscriptionModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    formData={formData}
    selectedOffer={selectedOffer}
  />
)}


        </div>



    );
}

export default CompareMutuelleSante;