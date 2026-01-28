// app/components/FloatingButtons.client.tsx
"use client";

import * as React from "react";
import ComparateurMutuelleProfiles from "../Dropdown/ComparateurMutuelleProfiles.client";


export default function FloatingButtons() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+33612345678"; // Remplacez par votre numéro
    const message = "Bonjour, je souhaite obtenir des informations sur vos mutuelles.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCallClick = () => {
    window.location.href = "tel:+33123456789"; // Remplacez par votre numéro
  };

  return (
    <>
          {/* Modal de rappel */}
      {isModalOpen && (
  <ComparateurMutuelleProfiles
    isOpen
    onClose={() => setIsModalOpen(false)}
  />
)}

      {/* Boutons flottants */}
      <div className="fixed right-3 bottom-72 md:right-8 md:bottom-52 z-40 flex flex-col gap-3">
                {/* Bouton Appel direct */}
        <button
          onClick={handleCallClick}
          className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-200 group"
          aria-label="Appeler maintenant"
        >
          <svg
            className="w-5 h-5 md:w-8 md:h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="absolute right-full mr-2 px-2 py-1 bg-blue-500 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Appeler
          </span>
        </button>
        {/* Bouton WhatsApp */}
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-200 group"
          aria-label="Contacter sur WhatsApp"
        >
          <svg
            className="w-5 h-5 md:w-8 md:h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411z" />
          </svg>
          <span className="absolute right-full mr-2 px-2 py-1 bg-green-500 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            WhatsApp
          </span>
        </button>

       {/* Bouton Rappel*/}
<button
  onClick={() => setIsModalOpen(true)}
  className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-200 group"
  aria-label="Demander un rappel"
>
  <svg
    className="w-5 h-5 md:w-8 md:h-8 transform rotate-90" // Ajout de rotate-90
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
  <span className="absolute right-full mr-2 px-2 py-1 bg-blue-500 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
    Être rappelé
  </span>
</button>

      </div>


    </>
  );
}