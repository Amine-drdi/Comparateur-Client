import React from "react";

const InsuranceBrands = () => {
  // Définition des marques d'assurance
  const brands = [
    { src: "/images/brands/allianz.png", alt: "Allianz" },
    { src: "/images/brands/axa.png", alt: "AXA" },
    { src: "/images/brands/macif.png", alt: "MACIF" },
    { src: "/images/brands/mma.png", alt: "MMA" },
    { src: "/images/brands/april.png", alt: "April" },
    { src: "/images/brands/maaf.png", alt: "MAAF" },
    { src: "/images/brands/groupama.png", alt: "Groupama" },
    { src: "/images/brands/swisslife.png", alt: "Swiss Life" },
    { src: "/images/brands/gan.png", alt: "GAN" },
    { src: "/images/brands/generali.png", alt: "Generali" },
    { src: "/images/brands/mgf.png", alt: "MGF" },
    { src: "/images/brands/mutuelle-des-motos.png", alt: "Mutuelle des Motos" },
  ];

  return (
    <>
      <div className="mt-10 w-full flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 w-full max-w-5xl">
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img 
                src={brand.src} 
                alt={brand.alt} 
                className="w-20 h-20 object-contain" 
              />
            </div>
          ))}
        </div>
        <a href="#brands" className="text-blue-600 mt-6 font-medium hover:text-blue-800 transition-colors">
          Voir toutes nos marques →
        </a>
      </div>
      
      <section className="text-center px-4 py-8 max-w-4xl mx-auto">
        {/* Statistiques */}
        <div className="mb-6 space-y-4 sm:space-y-0 sm:space-x-8 text-lg sm:text-xl font-medium flex flex-col sm:flex-row justify-center items-center">
          <div className="flex items-center gap-2">
            <span className="text-sky-900 font-bold text-2xl">420</span>
            <span>offres comparées</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sky-900 font-bold text-2xl">+175 000</span>
            <span>devis réalisés en 2024</span>
          </div>
        </div>

        {/* Texte descriptif */}
        <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
          Visualisez en un clin d'œil les tarifs de nos partenaires avec notre 
          <strong className="font-semibold text-black"> comparateur mutuelle santé gratuit</strong>. 
          Obtenez des La Mutuelle De France santé clairs et transparents, comparez les prix mutuelle, 
          et choisissez le niveau de garanties 
          <strong className="font-semibold text-black"> adapté à votre profil</strong> et à vos besoins.
          Profitez aussi des promotions du mois pour économiser jusqu'à <strong className="font-semibold text-black">36%</strong> 
          en moyenne sur votre couverture santé !
        </p>
      </section>
    </>
  );
};

export default InsuranceBrands;