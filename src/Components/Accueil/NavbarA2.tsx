import React, { useState, useEffect } from "react";
import { FaUserCircle, FaSignInAlt, FaChevronDown, FaBars, FaTimes, FaHome, FaPhone, FaEnvelope } from "react-icons/fa";
import { HiOutlineHeart, HiOutlineShieldCheck, HiOutlineUsers, HiOutlineStar } from "react-icons/hi";
import logo from "../../assets/Image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { MdCompare, MdHealthAndSafety, MdVisibility, MdLocalHospital } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";

const NavbarA: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);

  // Détection du scroll pour effet d'ombre
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Détection de la taille d'écran
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDropdownEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const dropdownData = {
    accueil: {
      link: "/",
      title: "ACCUEIL",
      icon: FaHome,
    },
    besoins: {
      title: isSmallScreen ? "BESOINS" : "VOS BESOINS",
      items: [
        { label: "Mutuelle santé", link: "/InsuranceComparison", icon: MdHealthAndSafety, desc: "Protection santé complète" },
        { label: "Besoin optique", link: "/optique", icon: MdVisibility, desc: "Lunettes et lentilles" },
        { label: "Besoin dentaire", link: "/dentaire", icon: MdLocalHospital, desc: "Soins et prothèses dentaires" },
        { label: "Besoin orthodontie", link: "/orthodontie", icon: HiOutlineHeart, desc: "Appareils et traitements" },
        { label: "Assurance santé expatriés", link: "/expatries", icon: HiOutlineUsers, desc: "Protection à l'international" }
      ]
    },
    profil: {
      title: isSmallScreen ? "PROFIL" : "VOTRE PROFIL",
      items: [
        { label: "Senior", link: "/profil/senior", icon: HiOutlineStar, desc: "Solutions adaptées 55+" },
        { label: "Famille", link: "/profil/famille", icon: HiOutlineUsers, desc: "Protection familiale" },
        { label: "Indépendant et TNS", link: "/profil/tns", icon: HiOutlineShieldCheck, desc: "Travailleurs non-salariés" },
        { label: "Sans emploi", link: "/profil/sans-emploi", icon: HiOutlineHeart, desc: "Couverture temporaire" },
        { label: "Fonctionnaire", link: "/profil/fonctionnaire", icon: HiOutlineShieldCheck, desc: "Complémentaire fonction publique" },
        { label: "Étudiant", link: "/profil/etudiant", icon: HiOutlineStar, desc: "Tarifs préférentiels jeunes" }
      ]
    },
    assureurs: {
      link: "/assureurs", 
      title: isSmallScreen ? "ASSUREURS" : "ASSUREURS PARTENAIRES",
      icon: HiOutlineUsers,
    },
  };

  return (
    <header className={`w-full bg-white fixed top-0 left-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-xl' : 'shadow-md'
    }`}>

      
      {/* Barre de contact */}
{/* Barre de contact améliorée */}
<div className="bg-blue-500 relative overflow-hidden">
  {/* Effet de brillance animé */}
  <div className="absolute inset-0">
    <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-700/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-700/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
  </div>
  
  <div className="max-w-7xl mx-auto px-4 py-2 relative z-10">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
      {/* Disponibilité avec badge animé */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-3 h-3 bg-green-600 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-1 left-1 w-1 h-1 bg-green-300 rounded-full"></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-white/90">Service disponible</span>
          <span className="hidden sm:inline text-xs font-bold text-emerald-300 bg-emerald-900/30 px-2 py-0.5 rounded-full border border-emerald-500/30">
            24h/24 & 7j/7
          </span>
          <span className="sm:hidden text-xs font-bold bg-green-500 ">24/7</span>
        </div>
      </div>
      
      {/* Séparateur décoratif */}
      <div className="hidden sm:block h-4 w-px bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
      
      {/* Coordonnées améliorées */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
        {/* Téléphone */}
        <a 
          href="tel:+33756663333" 
          className="group relative flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur group-hover:blur-md transition-all duration-300"></div>
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 group-hover:scale-110 transition-all duration-300">
              <FaPhone className="text-xs sm:text-sm text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-medium group-hover:text-green-400 transition-colors duration-300">Appelez-nous</span>
            <span className="font-bold text-sm sm:text-base text-white tracking-wide">+33 7 56 66 33 33</span>
          </div>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></div>
        </a>
        
        {/* Email */}
        <a 
          href="mailto:contact@lamutuelledefrance.fr" 
          className="group relative flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur group-hover:blur-md transition-all duration-300"></div>
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/25 group-hover:scale-110 transition-all duration-300">
              <FaEnvelope className="text-xs sm:text-sm text-white" />
            </div>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-medium group-hover:text-emerald-200 transition-colors duration-300">Écrivez-nous</span>
            <span className="font-bold text-sm text-white tracking-tight">contact@lamutuelledefrance.fr</span>
          </div>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></div>
        </a>
        
        {/* Bouton Appel direct mobile */}
        <a 
          href="tel:+33756663333" 
          className="sm:hidden ml-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 active:scale-95"
        >
          Appeler
        </a>
      </div>
    </div>
  </div>
  
  {/* Barre de progression (effet visuel) */}
  <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-pulse"></div>
</div>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:scale-105 transition-all duration-300 group"
            onClick={closeMobileMenu}
          >
            <motion.div className="relative" whileHover={{ rotate: 5 }}>
              <img 
                src={logo} 
                alt="logo" 
                className="w-[70%] h-[20%] filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
              />
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-1 justify-center">
            {Object.entries(dropdownData).map(([key, dropdown]) => (
              <div
                key={key}
                className="relative group"
                onMouseEnter={() => handleDropdownEnter(key)}
                onMouseLeave={handleDropdownLeave}
              >
                {key === 'accueil' || key === 'assureurs' ? (
                  <Link to={dropdown.link}>
                    <motion.button 
                      className="flex items-center gap-1 px-4 py-3 xl:px-5 xl:py-3 text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold text-sm xl:text-base tracking-wide relative overflow-hidden rounded-xl group"
                      whileHover={{ y: -2 }}
                    >
                      <span className="relative z-10 whitespace-nowrap">{dropdown.title}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>
                  </Link>
                ) : (
                  <motion.button 
                    className="flex items-center gap-1 px-4 py-3 xl:px-5 xl:py-3 text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold text-sm xl:text-base tracking-wide relative overflow-hidden rounded-xl group"
                    whileHover={{ y: -2 }}
                  >
                    <span className="relative z-10 whitespace-nowrap">{dropdown.title}</span>
                    <FaChevronDown 
                      className={`text-xs transition-all duration-300 relative z-10 ${
                        activeDropdown === key ? 'rotate-180 text-blue-600' : 'group-hover:text-blue-600'
                      }`} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                )}
              </div>
            ))}
          </nav>

          {/* Côté droit desktop */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Devis gratuit (desktop) */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
              <Link
                to="/comparateur-mutuelle-santé"
                className="hidden md:flex items-center gap-2 w-36 px-2 py-2.5 xl:px-5 xl:py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold text-xs xl:text-sm"
              >
                {/*<MdCompare className="text-lg" /> */}
                <span>DEVIS GRATUIT</span>
              </Link>
            </motion.div>

            {/* Connexion (desktop) - Commenté mais avec nouveau style
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <motion.button 
                    className="flex items-center gap-2 px-4 py-2 xl:px-6 xl:py-3 text-xs xl:text-sm rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold shadow-md"
                    whileHover={{ y: -2 }}
                  >
                    <FaUserCircle className="text-blue-600 text-lg" />
                    <span className="truncate max-w-[120px]">{user?.nom} {user?.prenom}</span>
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 p-2"
                      >
                        <Link 
                          to="/dashboard" 
                          className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg font-medium transition-colors duration-200"
                        >
                          <MdAccountCircle className="text-xl" /> Mon Profil
                        </Link>
                        <button 
                          onClick={handleLogout} 
                          className="flex items-center gap-2 w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors duration-200"
                        >
                          <PiSignOut className="text-xl" /> Déconnexion
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-5 py-2.5 xl:px-6 xl:py-3 rounded-full text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white font-bold transition-all duration-300 shadow-md"
                  >
                    <FaSignInAlt className="text-lg" /> Connexion
                  </Link>
                </motion.div>
              )}
            </div>*/}
          </div>

          {/* Bouton menu mobile */}
          <button 
            className="lg:hidden text-gray-700 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>

        {/* Dropdown desktop */}
        <AnimatePresence>
          {(activeDropdown === 'besoins' || activeDropdown === 'profil') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 w-full bg-white border-t border-gray-200 shadow-2xl overflow-hidden"
              onMouseEnter={() => handleDropdownEnter(activeDropdown)}
              onMouseLeave={handleDropdownLeave}
            >
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-2 gap-6">
                  {dropdownData[activeDropdown]?.items?.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={index}
                        to={item.link}
                        className="flex items-start gap-4 p-5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group border border-transparent hover:border-blue-200 hover:shadow-lg"
                      >
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3.5 rounded-xl group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 shadow-md">
                          <IconComponent className="text-2xl text-blue-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <div className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                            {item.label}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 sm:py-6">
              {Object.entries(dropdownData).map(([key, dropdown]) => (
                <div key={key} className="mb-3 sm:mb-4">
                  {key === 'accueil' || key === 'assureurs' ? (
                    <Link
                      to={dropdown.link}
                      className="flex items-center gap-3 py-3 px-4 text-gray-700 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-200"
                      onClick={closeMobileMenu}
                    >
                      {key === 'accueil' && <FaHome className="text-lg" />}
                      <span>{dropdown.title}</span>
                    </Link>
                  ) : (
                    <div>
                      <button
                        className="flex items-center justify-between w-full py-3 px-4 text-gray-700 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                        onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                      >
                        <span>{dropdown.title}</span>
                        <FaChevronDown className={`text-blue-600 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {activeDropdown === key && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 ml-4 space-y-2 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl p-3"
                        >
                          {dropdown.items?.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                              <Link
                                key={index}
                                to={item.link}
                                className="flex items-center gap-3 py-2.5 px-4 text-gray-700 rounded-lg hover:bg-white hover:text-blue-600 hover:shadow-md transition-all duration-200 font-medium"
                                onClick={closeMobileMenu}
                              >
                                <IconComponent className="text-lg text-blue-600" />
                                <span>{item.label}</span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Boutons mobile */}
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/compare"
                  onClick={closeMobileMenu}
                  className="w-full py-3 px-4 text-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all duration-300"
                >
                  Devis gratuit
                </Link>

                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="w-full py-3 px-4 text-center rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    Connexion
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="w-full py-3 px-4 text-center rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg transition-all duration-300"
                  >
                    Déconnexion
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavbarA;