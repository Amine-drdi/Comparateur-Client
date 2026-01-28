"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch } from 'react-icons/fi';

import Avatar from "../../../public/images/Avatar.png";
import man from "../../../public/Accueil/images/man.png";
import woman from "../../../public/Accueil/images/woman.png";
import img1 from "../../../public/icones/single.png";
import img2 from "../../../public/icones/couple.png";
import img3 from "../../../public/icones/maman.png";
import img4 from "../../../public/icones/famille.png";
import InsuranceBrands from "../../Components/Accueil/InsuranceBrands";
import ComparateurMutuelle from "../../Components/Accueil/ComparateurMutuelle";
import EtapesEtComparatif from "../../Components/Accueil/EtapesEtComparatif";
import ComprendreMonDevis from "../../Components/Accueil/ComprendreMonDevis";
import FacteursPrixMutuelle from "../../Components/Accueil/FacteursPrixMutuelle";
import AvisEtDevis from "../../Components/Accueil/AvisEtDevis";
import MutuelleFAQSection from "../../Components/Accueil/MutuelleFAQSection";
import HealthInsuranceMenuWithNavbar from "../../Components/Accueil/InsuranceAndMutualHealth";
import Navbar from "@/Components/Home/NavBar";
import Footer from "@/Components/Home/Footer";

export default function Accueil() {
  return (
    <div className="overflow-x-hidden">
      <Navbar/>
      <section className="relative bg-gradient-to-br from-[#f5f6ff] via-[#f0f4ff] to-[#e8f2ff] md:pt-24 px-4 sm:px-6 md:px-12 lg:px-24">
        {/* ================= MOBILE ================= */}
        <div className="block md:hidden">
          <div className="text-center mt-32 mb-6 pt-6">
            {/*<div className="inline-flex items-center justify-center bg-blue-50 border border-blue-200 rounded-full px-6 py-2 mb-4">
              <FiSearch className="mr-2 h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700 uppercase tracking-wide">
                Le comparateur intelligent
              </span>
            </div>*/}

            <h1 className="text-3xl xs:text-4xl font-bold text-blue-700 mb-1 leading-tight">
              Économisez jusqu'à
              <span className="block mt-0">
                <span className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 px-5 py-2 rounded-2xl text-white shadow-xl transform -rotate-2 text-2xl xs:text-3xl font-black">
                  40%
                </span>
              </span>
            </h1>

            <p className="text-xs text-gray-600 mb-0 px-2 leading-relaxed">
              Comparez en <strong className="text-blue-600">2 minutes</strong> les offres de plus de 30 assureurs.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Image
              src={Avatar}
              alt="comparateur mutuelle"
              className="w-[250px] xs:w-[280px] h-auto drop-shadow-2xl"
              priority
            />
          </div>

          {/* ========== SECTION "QUI SOUHAITE S'ASSURER" - MOBILE EN LIGNE HORIZONTALE ========== */}
          <div className="mt-2 mb-2">
            <p className="text-base font-semibold text-gray-800 mb-3 text-center">
              Qui souhaite s'assurer ?
            </p>

            {/* Conteneur avec les 4 cartes sur une ligne */}
            <div className="flex justify-between gap-2 px-2 pb-10">
              <Link
                href="/comparateur-mutuelle-santé"
                className="flex-1 border-2 border-blue-200 rounded-xl p-2 flex flex-col items-center hover:border-blue-300 hover:shadow-lg transition-all bg-white min-w-0"
              >
                <Image src={img1} alt="Mutuelle Moi" className="w-8 mb-1" />
                <span className="font-semibold text-xs text-gray-900">Moi</span>
              </Link>

              <Link
                href="/comparateur-mutuelle-santé"
                className="flex-1 border-2 border-blue-200 rounded-xl p-2 flex flex-col items-center hover:border-blue-300 hover:shadow-lg transition-all bg-white min-w-0"
              >
                <Image src={img2} alt="Mutuelle Couple" className="w-8 mb-1" />
                <span className="font-semibold text-center text-xs text-gray-900">Mon conjoint et moi</span>
              </Link>

              <Link
                href="/comparateur-mutuelle-santé"
                className="flex-1 border-2 border-blue-200 rounded-xl p-2 flex flex-col items-center hover:border-blue-300 hover:shadow-lg transition-all bg-white min-w-0"
              >
                <Image src={img3} alt="Mutuelle Famille" className="w-8 mb-1" />
                <span className="font-semibold text-center text-xs text-gray-900">Mes enfants et moi</span>
              </Link>

              <Link
                href="/comparateur-mutuelle-santé"
                className="flex-1 border-2 border-blue-200 rounded-xl p-2 flex flex-col items-center hover:border-blue-300 hover:shadow-lg transition-all bg-white min-w-0"
              >
                <Image src={img4} alt="Mutuelle Famille complète" className="w-8 mb-1" />
                <span className="font-semibold text-center text-[10px] leading-tight text-gray-900">
                  Mes enfants, conjoint et moi
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex items-center justify-between gap-10 pt-20">
          {/* TEXTE À GAUCHE */}
          <div className="w-full md:max-w-xl md:ml-4 lg:ml-8">
            {/* BADGE ALIGNÉ AVEC L'IMAGE */}
            <div className="flex items-center mb-3">
              <p className="flex items-center text-base uppercase text-blue-600">
                <FiSearch className="mr-3 h-5 w-5" />
                Le comparateur d'assurances intelligent
              </p>
            </div>

            <h1 className="mb-5 text-4xl font-extrabold text-blue-700 lg:text-6xl leading-tight">
              Économisez jusqu'à
              <span className="ml-3 inline-block bg-gradient-to-r from-green-500 to-green-600 px-6 py-2 text-white rounded-2xl shadow-xl transform -rotate-1 text-4xl">
                40%
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-2 leading-relaxed">
              Comparez en 2 minutes les offres de plus de 30 assureurs partenaires
              et trouvez la meilleure protection au prix idéal.
            </p>

            <p className="text-lg font-semibold text-gray-800 mb-5">
              Qui souhaite s'assurer ?
            </p>

            <div className="grid grid-cols-2 gap-2 pb-5">
              <Link
                href="/comparateur-mutuelle-santé"
                className="border-2 border-blue-200 rounded-2xl p-2 flex flex-col items-center hover:border-blue-300 hover:shadow-xl transition-all bg-white"
              >
                <Image src={img1} alt="Mutuelle Moi" className="w-12 mb-2" />
                <span className="font-semibold">Moi</span>
              </Link>

              <Link
                href="/comparateur-mutuelle-santé"
                className="border-2 border-blue-200 rounded-2xl p-2 flex flex-col items-center hover:border-blue-300 hover:shadow-xl transition-all bg-white"
              >
                <Image src={img2} alt="Mutuelle Couple" className="w-12 mb-2" />
                <span className="font-semibold text-center">Mon conjoint et moi</span>
              </Link>

              <Link
                href="/comparateur-mutuelle-santé"
                className="border-2 border-blue-200 rounded-2xl p-2 flex flex-col items-center hover:border-blue-300 hover:shadow-xl transition-all bg-white"
              >
                <Image src={img3} alt="Mutuelle Famille" className="w-12 mb-2" />
                <span className="font-semibold text-center">Mes enfants et moi</span>
              </Link>

              <Link
                href="/comparateur-mutuelle-santé"
                className="border-2 border-blue-200 rounded-2xl p-2 flex flex-col items-center hover:border-blue-300 hover:shadow-xl transition-all bg-white"
              >
                <Image src={img4} alt="Mutuelle Famille complète" className="w-12 mb-2" />
                <span className="font-semibold text-center">
                  Mes enfants, conjoint et moi
                </span>
              </Link>
            </div>
          </div>

          {/* IMAGE À DROITE — MÊME NIVEAU QUE LE BADGE */}
          <div className="flex items-center md:mr-4 lg:mr-8">
            <Image
              src={Avatar}
              alt="comparateur mutuelle"
              className="w-[400px] lg:w-[500px] xl:w-[600px] drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        <InsuranceBrands />
        <EtapesEtComparatif />
        <ComprendreMonDevis />
        <FacteursPrixMutuelle />
        <AvisEtDevis />
        <MutuelleFAQSection />
      </div>
      <Footer/>
    </div>
  );
}