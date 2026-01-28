import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function BanniereDevis() {
  return (
    <div className="flex items-center justify-between bg-[#cceeff] border border-blue-400 rounded-lg p-4 md:p-6 w-full max-w-5xl mx-auto shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-500 text-white p-3 rounded-full shadow-md">
          <FaPlus className="w-5 h-5" />
        </div>
        <p className="text-blue-600 font-semibold text-sm md:text-base">
          Devis personnalisé. Couverture dentaire optimale. Souscription rapide.
        </p>
      </div>

      {/* Lien vers la page devis */}
      <Link
        to="/compare"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm md:text-base px-6 py-3 rounded-md transition duration-200"
      >
        Obtenir un devis
      </Link>
    </div>
  );
}
