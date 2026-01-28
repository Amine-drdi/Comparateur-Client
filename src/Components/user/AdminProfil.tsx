import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDevisByCategory, deleteDevisById } from '../../api/devisApi';
import { RootState } from '../../redux/store';
import axios from 'axios';

interface DevisItem {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  codePostal: string;
  genre: string;
  dateNaissance: string;
  regimeSocial: string;
  dateDebutAssurance: string;
  typeCouverture: string;
  dateCreation: string;
  niveauRemboursement?: {
    soinsCourants: string;
    hospitalisation: string;
    dentaire: string;
    optique: string;
  };
  
couverture:string;
  nombreEnfants?: number;
  datesNaissanceEnfants:string;
  dateNaissanceConjoint:string;
  accepteAppel:string;
}

interface MessageItem {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

type CategoryKey = 'Devis' | 'Messages';

export default function AdminProfil() {
  const [tab, setTab] = useState<CategoryKey>('Devis');
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
const [visibleCount, setVisibleCount] = useState(8);
  const [devisData, setDevisData] = useState<Record<CategoryKey, DevisItem[] | MessageItem[]>>({
    Devis: [],
    Messages: [],
  });

  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [dateNFilter, setDateNFilter] = useState('');

  const tabs: { key: CategoryKey; label: string }[] = [
    { key: 'Devis', label: 'Devis enregistrés' },
    { key: 'Messages', label: 'Messages reçus' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tab === 'Messages') {
          const response = await axios.get('http://localhost:5000/api/contact/messages');
          setDevisData(prev => ({ ...prev, Messages: response.data }));
        } else if (tab === 'Devis') {
          const response = await axios.get('http://localhost:5000/api/devis');
          setDevisData(prev => ({ ...prev, Devis: response.data }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tab]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fonction pour filtrer les devis
  const filteredDevis = (devisData.Devis as DevisItem[]).filter(devis => {
    const fullName = `${devis.prenom} ${devis.nom}` ;
    const matchesSearch = 
  (fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
  (devis.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
  (devis.telephone?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

  
    const matchesDate = dateFilter 
      ? new Date(devis.dateCreation).toISOString().split('T')[0] === dateFilter
      : true;

      const matchesDateN = dateNFilter 
      ? new Date(devis.dateNaissance).toISOString().split('T')[0] === dateNFilter
      : true;
    
    return matchesSearch && matchesDate && matchesDateN ;
  });

  // Fonction pour filtrer les messages
  const filteredMessages = (devisData.Messages as MessageItem[]).filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject ? message.subject === selectedSubject : true;
    
    const matchesDate = dateFilter 
      ? new Date(message.createdAt).toISOString().split('T')[0] === dateFilter
      : true;
    
    return matchesSearch && matchesSubject && matchesDate;
  });

 const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

  if (scrollTop + clientHeight >= scrollHeight - 8) {
    // On est en bas, on charge plus de devis
    setVisibleCount((prev) => prev + 8);
  }
};
  useEffect(() => {
  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 8;
    if (bottom) {
      setVisibleCount((prev) => prev + 8); // charge 9 devis en plus
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">📋 Tableau de bord admin</h1>

      <div className="flex border-b border-gray-200 overflow-x-auto mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              tab === t.key
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {tab === 'Devis' && (
          <>
            {/* Filtres pour les devis */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
                  <input
                    type="text"
                    placeholder="Nom, prénom, email ou téléphone"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date du devis</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={dateNFilter}
                    onChange={(e) => setDateNFilter(e.target.value)}
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setDateFilter('');
                      setDateNFilter('');
                    }}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>

            {/* Tableau des devis */}
             <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date du devis</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Genre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Personne concerné</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nom complet</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Téléphone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Régime Social</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date de naissance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Code Postal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date d'effet</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date de naissance conjoint</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre d'enfant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date de naissance enfant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Niveau de remourseement</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Accepte l'appel</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                   {filteredDevis.map((devis) => (

                      <tr key={devis._id} className="hover:bg-blue-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">{formatDate(devis.dateCreation)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{devis.genre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{devis.couverture}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{devis.prenom} {devis.nom}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{devis.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{devis.telephone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{devis.regimeSocial}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{devis.dateNaissance}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{devis.codePostal}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{devis.dateDebutAssurance}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{devis.dateNaissanceConjoint}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{devis.nombreEnfants}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{devis.datesNaissanceEnfants}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">soins courant: {devis.niveauRemboursement?.soinsCourants}<br/>

                          hospitalisation: {devis.niveauRemboursement?.hospitalisation}<br/>
                          dentaire: {devis.niveauRemboursement?.dentaire}<br/>
                          optique: {devis.niveauRemboursement?.optique}<br/>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{devis.accepteAppel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tab === 'Messages' && (
          <>
            {/* Filtres pour les messages */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
                  <input
                    type="text"
                    placeholder="Nom, email ou téléphone"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">Tous les sujets</option>
                    <option value="Demande d'un devis">Demande d'un devis</option>
                    <option value="Questions sur notre comparateur">Questions sur notre comparateur</option>
                    <option value="Réclamation">Réclamation</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date d'envoi</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSubject('');
                      setDateFilter('');
                    }}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>

            {/* Tableau des messages */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date d'envoi</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nom complet</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Téléphone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sujet</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Message</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMessages.map((message) => (
                      <tr key={message._id} className="hover:bg-blue-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(message.createdAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{message.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{message.subject}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs whitespace-normal break-words">{message.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}