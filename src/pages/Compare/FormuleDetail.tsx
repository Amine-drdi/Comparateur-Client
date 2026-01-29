import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Formule {
  id: string;
  nom: string;
  formule_label: string;
  montant: number;
  type_assurance: string;
  gamme_label: string;
}

export default function FormuleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [formule, setFormule] = useState<Formule | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulation de récupération de données
      // Remplacez par votre appel API réel
      const fetchFormule = async () => {
        // Exemple avec des données mock
        const mockFormule: Formule = {
          id: id as string,
          nom: 'Formule Premium',
          formule_label: 'Assurance complète',
          montant: 150,
          type_assurance: 'Auto',
          gamme_label: 'Haute gamme'
        };
        setFormule(mockFormule);
        setLoading(false);
      };
      
      fetchFormule();
    }
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Chargement...</div>;
  }

  if (!formule) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Aucune formule sélectionnée.</p>
        <button onClick={() => router.back()} className="mt-4 text-sky-700 underline">
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-sky-800 mb-4">{formule.nom}</h1>
      <p className="text-lg text-gray-700 mb-2"><strong>Formule :</strong> {formule.formule_label}</p>
      <p className="text-lg text-gray-700 mb-2"><strong>Montant :</strong> {formule.montant} €</p>
      <p className="text-lg text-gray-700 mb-2"><strong>Type d'assurance :</strong> {formule.type_assurance}</p>
      <p className="text-lg text-gray-700 mb-2"><strong>Gamme :</strong> {formule.gamme_label}</p>

      <button onClick={() => router.back()} className="mt-6 bg-sky-800 text-white px-4 py-2 rounded hover:bg-sky-700">
        Retour
      </button>
    </div>
  );
}