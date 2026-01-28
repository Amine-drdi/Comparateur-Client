import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBars,
  FaChevronDown,
  FaEnvelope,
  FaHome,
  FaPhone,
  FaTimes,
} from "react-icons/fa";
import { HiOutlineHeart, HiOutlineShieldCheck, HiOutlineStar, HiOutlineUsers } from "react-icons/hi";
import { MdCompare, MdHealthAndSafety, MdLocalHospital, MdVisibility } from "react-icons/md";
import { GiFishingPole } from "react-icons/gi";
import logo from "../../assets/Image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

type DropdownItem = {
  label: string;
  link: string;
  icon?: React.ComponentType<any>;
  desc?: string;
};

type DropdownSection = {
  title: string;
  items?: DropdownItem[];
  link?: string;
  icon?: React.ComponentType<any>;
};

const NavbarA: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);

  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveKey(null);
    setIsDropdownOpen(false);
  };

  const handleTopBarClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = "tel:+33756663333";
    }
  };

  const dropdownData: Record<string, DropdownSection> = useMemo(
    () => ({
      MutuelleSanté: {
        title: "Mutuelle",
        items: [
          { label: "Comparateur mutuelle", link: "/profil/senior", icon: HiOutlineStar },
          { label: "Senior", link: "/profil/senior", icon: HiOutlineStar },
          { label: "Retraité", link: "/profil/senior", icon: GiFishingPole },
          { label: "Famille", link: "/profil/famille", icon: HiOutlineUsers },
          { label: "Indépendant et TNS", link: "/profil/tns", icon: HiOutlineShieldCheck },
          { label: "Sans emploi", link: "/profil/sans-emploi", icon: HiOutlineHeart },
          { label: "Fonctionnaire", link: "/profil/fonctionnaire", icon: HiOutlineShieldCheck },
          { label: "Étudiant", link: "/profil/etudiant", icon: HiOutlineStar },
          { label: "Hospitalisation", link: "/hospitalisation", icon: MdLocalHospital },
          { label: "Dentaire", link: "/dentaire", icon: HiOutlineHeart },
          { label: "Optique", link: "/optique", icon: MdVisibility },
          { label: "Changer de mutuelle", link: "/changer-mutuelle", icon: MdCompare },
          { label: "Résilier sa mutuelle", link: "/resiliation", icon: HiOutlineShieldCheck },
          { label: "Mutuelle pas chère", link: "/mutuelle-pas-cher", icon: HiOutlineStar },
        ],
      },
      besoins: {
        title: "Assurance",
        items: [
          { label: "Comparateur Assurance", link: "/InsuranceComparison", icon: MdHealthAndSafety },
          { label: "Assurance Vie", link: "/optique", icon: MdVisibility },
          { label: "Assurance Obsèques", link: "/dentaire", icon: MdLocalHospital },
          { label: "Assurance Prévoyance", link: "/orthodontie", icon: HiOutlineHeart },
          { label: "Assurance Habitation", link: "/expatries", icon: HiOutlineUsers },
          { label: "Assurance Auto", link: "/dentaire", icon: MdLocalHospital },
          { label: "Assurance Accident de la Vie (AAV)", link: "/orthodontie", icon: HiOutlineHeart },
          { label: "Assurance Prêt Immobilier", link: "/expatries", icon: HiOutlineUsers },
        ],
      },
       ÉpargneRetraite: {
        title: "Épargne & Retraite",
        items: [
          { label: "Comparateur Retraite", link: "/InsuranceComparison", icon: MdHealthAndSafety },
          { label: "Plan Épargne Retraite (PER)", link: "/optique", icon: MdVisibility },
          { label: "Épargne Senior", link: "/dentaire", icon: MdLocalHospital },
          { label: "Préparer sa Retraite", link: "/orthodontie", icon: HiOutlineHeart },
          { label: "Conseils & Avantages Fiscaux", link: "/expatries", icon: HiOutlineUsers },
          { label: "Simulateur Retraite", link: "/dentaire", icon: MdLocalHospital },

        ],
      },
             GuidesConseils: {
        title: "Conseils",
        items: [
          { label: "Mutuelle", link: "/", icon: MdHealthAndSafety },
          { label: "Assurance", link: "/", icon: MdVisibility },
          { label: "Retraite", link: "/", icon: MdLocalHospital },
          { label: "Guides pratiques", link: "/", icon: HiOutlineHeart },


        ],
      },
      assureurs: {
        title: "Contact",
        link: "/contact",
        icon: HiOutlineUsers,
      },
    }),
    []
  );

  const dropdownKeys = useMemo(
    () => Object.entries(dropdownData).filter(([, v]) => v.items?.length).map(([k]) => k),
    [dropdownData]
  );

  const activeSection = activeKey ? dropdownData[activeKey] : null;

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function scheduleCloseDropdown() {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
      setActiveKey(null);
    }, 120);
  }

  function openDropdownFor(key: string) {
    clearCloseTimer();
    setActiveKey(key);
    setIsDropdownOpen(true);
  }

  return (
    <header
      className={`w-full bg-white fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-xl" : "shadow-md"
      }`}
    >
      {/* Top bar */}
      <div 
        className="bg-blue-500 relative overflow-hidden"
        onClick={handleTopBarClick}
        style={{
          cursor: isMobile ? 'pointer' : 'default'
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            {/* Supprimé la section "Service disponible" en mobile */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-600 rounded-full animate-ping opacity-75"></div>
                <div className="absolute top-1 left-1 w-1 h-1 bg-green-300 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white/90">Service disponible</span>
                <span className="hidden sm:inline text-xs font-bold text-emerald-300 bg-emerald-900/30 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  24h/24 & 7j/7
                </span>
              </div>
            </div>

            <div className="hidden sm:block h-4 w-px bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm">
              <a href="tel:+33756663333" className="flex items-center gap-2 text-white/90 hover:text-white transition-all">
                <div className="w-9 h-9 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <FaPhone className="text-base sm:text-base text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Numéro vert</span>
                  <span className="font-bold text-sm sm:text-base text-white tracking-wide">+33 7 56 66 33 33</span>
                </div>
              </a>

              <a href="mailto:contact@lamutuelledefrance.fr" className="hidden sm:flex items-center gap-2 text-white/90 hover:text-white transition-all">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <FaEnvelope className="text-xs sm:text-sm text-white" />
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="font-medium">Écrivez-nous</span>
                  <span className="font-bold text-sm text-white tracking-tight">contact@lamutuelledefrance.fr</span>
                </div>
              </a>

              <a
                href="tel:+33756663333"
                className="sm:hidden ml-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg"
              >
                Appeler
              </a>
            </div>
          </div>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-pulse"></div>
      </div>

      <div className="max-w-7xl ml-14 ">
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-all duration-300 " onClick={closeMobileMenu}>
            <motion.div className="relative" whileHover={{ rotate: 5 }}>
              <img 
                src={logo} 
                alt="logo" 
                className="w-[75%] h-[40%] filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300 " 
              />
            </motion.div>
          </Link>

          {/* NAV DESKTOP + DROPDOWN */}
          <div
            className="hidden lg:flex flex-1 justify-center"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleCloseDropdown}
          >
            <div className="relative">
              <nav className="flex items-center space-x-1 xl:space-x-2">
                {Object.entries(dropdownData).map(([key, dropdown]) => {
                  const hasDropdown = !!dropdown.items?.length;
                  const isActive = activeKey === key && isDropdownOpen;

                  if (!hasDropdown) {
                    return (
                      <div key={key} className="relative">
                        <Link to={dropdown.link || "/"}>
                          <motion.button
                            className="flex items-center gap-1 px-1 xl:px-4 py-2 xl:py-3 text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold text-sm xl:text-base tracking-wide relative overflow-hidden rounded-xl group"
                            whileHover={{ y: -2 }}
                          >
                            <span className="relative z-10 whitespace-nowrap">{dropdown.title}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </motion.button>
                        </Link>
                      </div>
                    );
                  }

                  return (
                    <div key={key} className="relative">
                      <motion.button
                        type="button"
                        onMouseEnter={() => openDropdownFor(key)}
                        className="flex items-center gap-1 px-3 xl:px-4 py-2 xl:py-3 text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold text-sm xl:text-base tracking-wide relative overflow-hidden rounded-xl group"
                        whileHover={{ y: -2 }}
                      >
                        <span className="relative z-10 whitespace-nowrap">{dropdown.title}</span>
                        <FaChevronDown
                          className={`text-xs transition-all duration-300 relative z-10 ${
                            isActive ? "rotate-180 text-blue-600" : "group-hover:text-blue-600"
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.button>
                    </div>
                  );
                })}
              </nav>

              {/* DROPDOWN SHARED */}
              <AnimatePresence>
                {isDropdownOpen && activeSection?.items?.length ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.985 }}
                    transition={{ duration: 0.16 }}
                    className="
                      absolute top-full -left-32 -translate-x-1/2 mt-3
                      w-[90vw] max-w-[720px] min-w-[320px]
                      rounded-2xl border border-gray-200 bg-white shadow-2xl
                      overflow-hidden
                    "
                    onMouseEnter={clearCloseTimer}
                    onMouseLeave={scheduleCloseDropdown}
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* LEFT: labels only */}
                      <div className="lg:w-2/3 p-4">
                        <div className="text-lg font-semibold text-blue-500 mb-3">
                          {activeSection.title}
                        </div>

                        <motion.div
                          key={activeKey ?? "none"}
                          initial={{ opacity: 0.7 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.12 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2"
                        >
                          {activeSection.items.map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.link}
                              className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors py-1"
                              onClick={() => {
                                setIsDropdownOpen(false);
                                setActiveKey(null);
                              }}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      </div>

                      {/* RIGHT: CTA */}
                      <div className="lg:w-1/3 bg-blue-500 p-6 flex flex-col">
                        <div className="text-white">
                          <div className="text-xl text-white my-4 lg:my-6">
                            Comparez en 2 minutes les meilleures mutuelles selon votre profil.
                          </div>
                        </div>

                        <Link
                          to="/comparateur-mutuelle-santé"
                          className="
                            mt-auto inline-flex items-center justify-center
                            rounded-xl bg-green-600 px-4 py-3
                            text-sm font-bold text-white
                            hover:bg-green-700 transition-colors
                            shadow-lg text-center
                          "
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setActiveKey(null);
                          }}
                        >
                          Comparer les offres
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/comparateur-mutuelle-santé"
                className="hidden sm:flex items-center justify-center w-28 sm:w-32 md:w-36 px-3 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold text-xs sm:text-sm"
              >
                <span className="whitespace-nowrap">DEVIS GRATUIT</span>
              </Link>
            </motion.div>

           {/* {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                  <span className="font-medium text-sm">{user?.name || "Mon compte"}</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center px-4 py-2.5 rounded-lg border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 text-sm"
              >
                Connexion
              </Link>
            )} */}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-gray-700 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4">
              {Object.entries(dropdownData).map(([key, dropdown]) => (
                <div key={key} className="mb-3">
                  {!dropdown.items?.length ? (
                    <Link
                      to={dropdown.link || "/"}
                      className="flex items-center gap-3 py-3 px-4 text-gray-700 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-200"
                      onClick={closeMobileMenu}
                    >
                      <span className="text-sm sm:text-base">{dropdown.title}</span>
                    </Link>
                  ) : (
                    <div>
                      <button
                        className="flex items-center justify-between w-full py-3 px-4 text-gray-700 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                        onClick={() => setActiveKey(activeKey === key ? null : key)}
                      >
                        <span className="text-sm sm:text-base">{dropdown.title}</span>
                        <FaChevronDown
                          className={`text-blue-600 transition-transform duration-200 ${activeKey === key ? "rotate-180" : ""}`}
                        />
                      </button>

                      {activeKey === key && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 ml-4 space-y-2 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl p-3"
                        >
                          {dropdown.items.map((item, index) => (
                            <Link
                              key={index}
                              to={item.link}
                              className="flex items-center gap-3 py-2.5 px-4 text-gray-700 rounded-lg hover:bg-white hover:text-blue-600 hover:shadow-md transition-all duration-200 font-medium text-sm sm:text-base"
                              onClick={closeMobileMenu}
                            >
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/comparateur-mutuelle-santé"
                  onClick={closeMobileMenu}
                  className="w-full py-3 px-4 text-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all duration-300 text-sm sm:text-base"
                >
                  Devis gratuit
                </Link>

                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="w-full py-3 px-4 text-center rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
                  >
                    Connexion
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="w-full py-3 px-4 text-center rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg transition-all duration-300 text-sm sm:text-base"
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