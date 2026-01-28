import { useLocation, useNavigate } from 'react-router-dom';

export default function FormuleDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const formule = state?.formule;

  if (!formule) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Aucune formule sélectionnée.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-sky-700 underline">
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-sky-800 mb-4">{formule.nom || 'Formule'}</h1>
      <p className="text-lg text-gray-700 mb-2"><strong>Formule :</strong> {formule.formule_label || 'N/A'}</p>
      <p className="text-lg text-gray-700 mb-2"><strong>Montant :</strong> {formule.montant} €</p>
      <p className="text-lg text-gray-700 mb-2"><strong>Type d’assurance :</strong> {formule.type_assurance || 'Non spécifié'}</p>
      <p className="text-lg text-gray-700 mb-2"><strong>Gamme :</strong> {formule.gamme_label}</p>

      <button onClick={() => navigate(-1)} className="mt-6 bg-sky-800 text-white px-4 py-2 rounded hover:bg-sky-700">
        Retour
      </button>
    </div>
  );
}
