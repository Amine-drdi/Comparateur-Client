"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FaBars,
  FaChevronDown,
  FaEnvelope,
  FaPhone,
  FaTimes,
} from "react-icons/fa";
import {
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineStar,
  HiOutlineUsers,
} from "react-icons/hi";
import { MdCompare, MdHealthAndSafety, MdLocalHospital, MdVisibility } from "react-icons/md";
import { GiFishingPole } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import logoSrc from "../../../public/Image/logo.png";
// IMPORTANT Next.js: placez votre logo ici : /public/assets/Image/logo.png
// puis utilisez:


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
  const [isMobile, setIsMobile] = useState(false);

  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Next.js: window n'existe pas au SSR -> on initialise dans useEffect
    setIsMobile(window.innerWidth < 640);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          { label: "Comparateur mutuelle", link: "/mutuelle-sante/comparateur-mutuelle", icon: HiOutlineStar },
          { label: "Senior", link: "/mutuelle-sante/mutuelle-senior", icon: HiOutlineStar },
          { label: "Retraité", link: "/mutuelle-sante/mutuelle-retraite", icon: GiFishingPole },
          { label: "Famille", link: "/mutuelle-sante/mutuelle-famille", icon: HiOutlineUsers },
          { label: "Indépendant et TNS", link: "/mutuelle-sante/tns-independants-loi-madelin", icon: HiOutlineShieldCheck },
          //{ label: "Sans emploi", link: "/profil/sans-emploi", icon: HiOutlineHeart },
         // { label: "Fonctionnaire", link: "/profil/fonctionnaire", icon: HiOutlineShieldCheck },
         // { label: "Étudiant", link: "/profil/etudiant", icon: HiOutlineStar },
          { label: "Hospitalisation", link: "/mutuelle-sante/mutuelle-hospitalisation", icon: MdLocalHospital },
          { label: "Dentaire", link: "/mutuelle-sante/mutuelle-dentaire", icon: HiOutlineHeart },
          { label: "Optique", link: "/mutuelle-sante/mutuelle-optique", icon: MdVisibility },
          { label: "Changer de mutuelle", link: "/mutuelle-sante/changer-mutuelle", icon: MdCompare },
          { label: "Résilier sa mutuelle", link: "/mutuelle-sante/resiliation-mutuelle", icon: HiOutlineShieldCheck },
          { label: "Mutuelle pas chère", link: "/mutuelle-sante/mutuelle-pas-chere", icon: HiOutlineStar },
        ],
      },
      /*besoins: {
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
      },*/
      ÉpargneRetraite: {
        title: "Épargne & Retraite",
        items: [
          { label: "Comparateur Retraite", link: "/epargne-retraite/comparateur-retraite", icon: MdHealthAndSafety },
          { label: "Plan Épargne Retraite (PER)", link: "/epargne-retraite/plan-epargne-retraite-per", icon: MdVisibility },
          { label: "Épargne Senior", link: "/epargne-retraite/epargne-senior", icon: MdLocalHospital },
          { label: "Préparer sa Retraite", link: "/epargne-retraite/preparer-sa-retraite", icon: HiOutlineHeart },
          { label: "Conseils & Avantages Fiscaux", link: "/epargne-retraite/conseils-avantages-fiscaux", icon: HiOutlineUsers },
          { label: "Simulateur Retraite", link: "/epargne-retraite/simulateur-retraite", icon: MdLocalHospital },
        ],
      },
      GuidesConseils: {
        title: "Conseils",
        items: [
          { label: "Mutuelle", link: "/guides-conseils/mutuelle", icon: MdHealthAndSafety },
          { label: "Assurance", link: "/guides-conseils/assurance", icon: MdVisibility },
          { label: "Retraite", link: "/guides-conseils/retraite", icon: MdLocalHospital },
          { label: "Guides pratiques", link: "/guides-conseils/guides-pratiques/", icon: HiOutlineHeart },
        ],
      },
      assureurs: {
        title: "Contact",
        link: "/Contact",
        icon: HiOutlineUsers,
      },
    }),
    []
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
        style={{ cursor: isMobile ? "pointer" : "default" }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-600 rounded-full animate-ping opacity-75" />
                <div className="absolute top-1 left-1 w-1 h-1 bg-green-300 rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white/90">Service disponible</span>
                <span className="hidden sm:inline text-xs font-bold text-emerald-300 bg-emerald-900/30 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  24h/24 & 7j/7
                </span>
              </div>
            </div>

            <div className="hidden sm:block h-4 w-px bg-gradient-to-b from-transparent via-blue-400/50 to-transparent" />

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm">
              <a
                href="tel:+33188812109"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-all"
              >
                <div className="w-9 h-9 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <FaPhone className="text-base text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Numéro vert</span>
                  <span className="font-bold text-sm sm:text-base text-white tracking-wide">
                    +33 1 88 81 21 09
                  </span>
                </div>
              </a>

              <a
                href="mailto:contact@lamutuelledefrance.fr"
                className="hidden sm:flex items-center gap-2 text-white/90 hover:text-white transition-all"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <FaEnvelope className="text-xs sm:text-sm text-white" />
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="font-medium">Écrivez-nous</span>
                  <span className="font-bold text-sm text-white tracking-tight">
                    contact@lamutuelledefrance.fr
                  </span>
                </div>
              </a>

              <a
                href="tel:+33188812109"
                className="sm:hidden ml-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg"
              >
                Appeler
              </a>
            </div>
          </div>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-pulse" />
      </div>

      <div className="max-w-7xl ml-14">
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
          {/* Logo (image) - inchangé visuellement */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
            onClick={closeMobileMenu}
          >
            <motion.div className="relative" whileHover={{ rotate: 5 }}>
              <Image
                src={logoSrc}
                alt="logo"
                className="w-72 filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
                priority
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
                        <Link href={dropdown.link || "/"}>
                          <motion.button
                            className="flex items-center gap-1 px-1 xl:px-4 py-2 xl:py-3 text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold text-sm xl:text-base tracking-wide relative overflow-hidden rounded-xl group"
                            whileHover={{ y: -2 }}
                            type="button"
                          >
                            <span className="relative z-10 whitespace-nowrap">{dropdown.title}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                      absolute top-full left-80 -translate-x-1/2 mt-3
                      w-[90vw] max-w-[720px] min-w-[320px]
                      rounded-2xl border border-gray-200 bg-white shadow-2xl
                      overflow-hidden
                    "
                    onMouseEnter={clearCloseTimer}
                    onMouseLeave={scheduleCloseDropdown}
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* LEFT */}
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
                              href={item.link}
                              className="text-sm font-bold text-gray-800 hover:text-blue-600 transition-colors py-1"
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

                      {/* RIGHT CTA */}
                      <div className="lg:w-1/3 bg-blue-500 p-6 flex flex-col">
                        <div className="text-white">
                          <div className="text-xl text-white my-4 lg:my-6">
                            Comparez en 2 minutes les meilleures mutuelles selon votre profil.
                          </div>
                        </div>

                        <Link
                          href="/comparateur-mutuelle-santé"
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

          {/* Right actions (AUTH supprimée, le devis reste inchangé) */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/comparateur-mutuelle-santé"
                className="hidden sm:flex items-center justify-center w-28 sm:w-32 md:w-36 px-3 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold text-xs sm:text-sm"
              >
                <span className="whitespace-nowrap">DEVIS GRATUIT</span>
              </Link>
            </motion.div>

            {/* Auth supprimée : aucun bouton login ici */}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-gray-700 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors duration-200"
            onClick={toggleMobileMenu}
            type="button"
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
                      href={dropdown.link || "/"}
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
                        type="button"
                      >
                        <span className="text-sm sm:text-base">{dropdown.title}</span>
                        <FaChevronDown
                          className={`text-blue-600 transition-transform duration-200 ${
                            activeKey === key ? "rotate-180" : ""
                          }`}
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
                              href={item.link}
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
                  href="/comparateur-mutuelle-santé"
                  onClick={closeMobileMenu}
                  className="w-full py-3 px-4 text-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all duration-300 text-sm sm:text-base"
                >
                  Devis gratuit
                </Link>

                {/* Auth supprimée : aucun bouton Connexion / Déconnexion */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavbarA;
