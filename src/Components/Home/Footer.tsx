import React from "react";
import Link from "next/link";
import Image from "next/image";

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import LOGO_SRC from "../../../public/Image/logo.png";
// IMPORTANT (logo)
// - Si ton logo est dans /public, utilise: src="/images/logo.png"
// - Si tu veux garder l'import, assure-toi que Next est configuré pour les assets (souvent plus simple via /public).
// Exemple recommandé via /public :
//const LOGO_SRC = "../../../public/Image/logo.png";

interface LinkItem {
  title: string;
  link: string;
}

interface LinkBesoin {
  title: string;
  link: string;
}

interface LinkProfil {
  title: string;
  link: string;
}

interface SocialItem {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  hoverColor: string;
}

const LiensRapide: LinkItem[] = [
  { title: "Accueil", link: "/home" },
  { title: "Qui sommes-nous", link: "" },
  { title: "Assurances", link: "s" },
  { title: "Contact", link: "/contactez-nous" },
  { title: "Mentions légales", link: "" },
];

const LiensBesoin: LinkBesoin[] = [
  { title: "Mutuelle santé", link: "/InsuranceComparison" },
  { title: "Besoin dentaire", link: "/dentaire" },
  { title: "Besoin optique", link: "/optique" },
  { title: "Besoin orthodontie", link: "/orthodontie" },
  { title: "Assurance santé expatriés", link: "/expatries" },
];

const LiensProfil: LinkProfil[] = [
  { title: "Senior", link: "/profil/senior" },
  { title: "Indépandant et TNS", link: "/profil/tns" },
  { title: "Fonctionnaire", link: "/profil/fonctionnaire" },
  { title: "Famille", link: "/profil/famille" },
  { title: "Sans emploi", link: "/profil/sans-emploi" },
  { title: "Etudiant", link: "/profil/etudiant" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.03%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-10 md:mb-12">
          {/* Company Info */}
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="relative">
                {/* Logo optionnel */}
                {/* Si tu ne veux pas de logo, tu peux supprimer ce bloc */}
                <Image
                  src={LOGO_SRC}
                  alt="Logo la mutuelle de france"
                  width={44}
                  height={44}
                  className="rounded"
                />
              </div>

              <div className="ml-2">
                <span className="text-2xl font-bold">La Mutuelle de France</span>
                <p className="text-sm text-slate-400 font-medium">
                  Votre partenaire assurance
                </p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              Nous offrons une expertise approfondie et vous accompagnons dans la
              recherche du contrat le plus adapté à votre profil et à vos besoins
              spécifiques.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700/50">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-slate-300">Service 24/7</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700/50">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm text-slate-300">Devis gratuit</span>
              </div>
            </div>
          </div>

          {/* Besoins Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 relative">
              Besoins
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {LiensBesoin.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.link || "#"}
                    className="group flex items-center text-slate-300 hover:text-white transition-all duration-300 text-sm md:text-base"
                  >
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-3 group-hover:bg-green-500 transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Profils Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 relative">
              Profils
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {LiensProfil.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.link || "#"}
                    className="group flex items-center text-slate-300 hover:text-white transition-all duration-300 text-sm md:text-base"
                  >
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-3 group-hover:bg-green-500 transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens utiles */}
          <div className="sm:col-span-1 md:col-span-1">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 relative">
              Liens utiles
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {LiensRapide.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.link || "#"}
                    className="group flex items-center text-slate-300 hover:text-white transition-all duration-300 text-sm md:text-base"
                  >
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-3 group-hover:bg-green-500 transition-colors duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-10 md:mb-12">
          <h3 className="text-xl font-bold mb-6 relative text-center">
            Contact
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
          </h3>

          <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 md:gap-6">
            {/* Téléphone */}
            <div className="group flex flex-col items-center text-center p-4 rounded-lg hover:bg-slate-800/50 transition-colors duration-300 flex-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-colors mb-3">
                <FaPhone className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-medium text-sm md:text-base">Téléphone</p>
                <a
                  href="tel:+33756663333"
                  className="text-slate-300 hover:text-blue-400 transition-colors text-xs md:text-sm"
                >
                  +33 75 666 33 33
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="group flex flex-col items-center text-center p-4 rounded-lg hover:bg-slate-800/50 transition-colors duration-300 flex-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg flex items-center justify-center border border-orange-500/20 group-hover:border-orange-500/40 transition-colors mb-3">
                <MdEmail className="text-orange-400 w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-medium text-sm md:text-base">Email</p>
                <a
                  href="mailto:contact@lamutuelledefrance.fr"
                  className="text-slate-300 hover:text-orange-400 transition-colors text-xs md:text-sm break-all"
                >
                  contact@lamutuelledefrance.fr
                </a>
              </div>
            </div>

            {/* Localisation */}
            <div className="group flex flex-col items-center text-center p-4 rounded-lg hover:bg-slate-800/50 transition-colors duration-300 flex-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center border border-green-500/20 group-hover:border-green-500/40 transition-colors mb-3">
                <MdLocationOn className="text-green-400 w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-medium text-sm md:text-base">Localisation</p>
                <p className="text-slate-300 hover:text-green-400 transition-colors text-xs md:text-sm">
                  Paris, France
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="relative mb-6 md:mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gradient-to-r from-transparent via-slate-700 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-slate-900 px-4 md:px-6">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full opacity-50" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="text-center md:text-left order-2 md:order-1">
            <p className="text-slate-300 text-xs md:text-sm mb-1">
              © 2025 <span className="font-semibold text-white">La Mutuelle De France</span>{" "}
              - Tous droits réservés
            </p>
            <p className="text-slate-400 text-xs">
              Votre partenaire de confiance pour l&apos;assurance santé
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-1 order-1 md:order-2 mb-4 md:mb-0">
            <p className="text-slate-400 text-sm mr-0 md:mr-4">Suivez-nous :</p>
            <div className="flex gap-2 md:gap-3">
              {(
                [
                  {
                    icon: FaInstagram,
                    href: "#",
                    color: "from-pink-500 to-purple-500",
                    hoverColor: "hover:text-pink-400",
                  },
                  {
                    icon: FaFacebook,
                    href: "#",
                    color: "from-blue-500 to-blue-600",
                    hoverColor: "hover:text-blue-400",
                  },
                  {
                    icon: FaLinkedin,
                    href: "#",
                    color: "from-blue-600 to-blue-700",
                    hoverColor: "hover:text-blue-500",
                  },
                ] as SocialItem[]
              ).map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`group relative w-8 h-8 md:w-10 md:h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center transition-all duration-300 hover:bg-slate-700/50 hover:border-slate-600/50 hover:scale-110 ${social.hoverColor}`}
                    aria-label="Social link"
                    rel="noreferrer"
                  >
                    <IconComponent className="w-3 h-3 md:w-4 md:h-4 text-slate-400 group-hover:scale-110 transition-all duration-300" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500" />
    </footer>
  );
}
