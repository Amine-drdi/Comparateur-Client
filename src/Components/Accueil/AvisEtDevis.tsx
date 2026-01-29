import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Shield, Heart, CheckCircle } from 'lucide-react';

const AvisDevis = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Données des témoignages
  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      age: 37,
      location: "Paris",
      rating: 5,
      mutuelle: "April",
      savings: "180€/an",
      comment: "Grâce à ce comparateur, j'ai trouvé une mutuelle parfaitement adaptée à mes besoins de jeune maman. Le processus était simple et les conseillers très professionnels.",
      date: "Il y a 2 semaines",
      verified: true,
      highlight: "Économie réalisée"
    },
    {
      id: 2,
      name: "Pierre Martin",
      age: 55,
      location: "Lyon",
      rating: 5,
      mutuelle: "Néoliane",
      savings: "320€/an",
      comment: "En tant que travailleur indépendant, je cherchais une couverture complète à prix raisonnable. Le service m'a fait économiser plus de 300€ par an !",
      date: "Il y a 1 semaine",
      verified: true,
      highlight: "Travailleur indépendant"
    },
    {
      id: 3,
      name: "Sophie Leroy",
      age: 64,
      location: "Marseille",
      rating: 4,
      mutuelle: "Alptis",
      savings: "150€/an",
      comment: "Interface très intuitive et comparaison claire des différentes offres. J'ai pu choisir ma mutuelle en toute confiance grâce aux explications détaillées.",
      date: "Il y a 3 jours",
      verified: true,
      highlight: "Interface intuitive"
    },
    {
      id: 4,
      name: "Jean-Claude Moreau",
      age: 58,
      location: "Toulouse",
      rating: 5,
      mutuelle: "Swiss Life",
      savings: "250€/an",
      comment: "À l'approche de la retraite, je voulais optimiser ma couverture santé. Le comparateur m'a aidé à trouver une excellente mutuelle senior avec de vrais avantages.",
      date: "Il y a 5 jours",
      verified: true,
      highlight: "Mutuelle senior"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <span className="bg-yellow-300 text-gray-800 px-3 py-1 rounded-md text-sm font-medium">           
            Témoignages vérifiés
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les expériences de milliers de français qui ont trouvé leur mutuelle idéale grâce à notre comparateur
          </p>
        </div>

        {/* Carousel principal */}
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 relative overflow-hidden">
            {/* Décoration de fond */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full -ml-12 -mb-12"></div>
            
            {/* Icône de citation */}
            <Quote className="w-12 h-12 text-blue-500 mb-6 opacity-20 absolute top-8 left-8" />
            
            <div className="relative z-10">
              {/* Évaluation */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {renderStars(currentTestimonial.rating)}
                </div>
                <span className="text-gray-600 font-medium">
                  {currentTestimonial.rating}/5
                </span>
              </div>

              {/* Commentaire */}
              <blockquote className="text-xl sm:text-2xl text-gray-800 leading-relaxed mb-8 font-medium">
                "{currentTestimonial.comment}"
              </blockquote>

              {/* Informations client */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">
                        {currentTestimonial.name}, {currentTestimonial.age} ans
                      </h4>
                      {currentTestimonial.verified && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600">{currentTestimonial.location}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    -{currentTestimonial.savings}
                  </div>
                  <div className="text-sm text-gray-600">d'économies</div>
                  <div className="text-xs text-blue-600 font-medium">
                    avec {currentTestimonial.mutuelle}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                {currentTestimonial.date}
              </div>
            </div>
          </div>

          {/* Contrôles de navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 group"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 group"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>

        {/* Statistiques */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Note moyenne</div>
            <div className="flex justify-center mt-2">
              {renderStars(5)}
            </div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">12 000+</div>
            <div className="text-gray-600">Clients satisfaits</div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-indigo-600 mb-2">230€</div>
            <div className="text-gray-600">Économie moyenne/an</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvisDevis;