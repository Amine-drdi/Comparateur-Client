import neoliane from "../Image/Partenaire/Neo.webp"
import april from "../Image/Partenaire/april.png"
import alptis from "../Image/Partenaire/alptis.png"
import swisslife from "../Image/Partenaire/Logo-swisslife.png"
import cegema from "../Image/Partenaire/LogoCegema-768x269-1.png"
import malakoff from "../Image/Partenaire/Malakoff.png"
import axa from "../Image/Partenaire/AXA.png"
import generali from "../Image/Partenaire/generali.svg"
import abeille from "../Image/Partenaire/abeille-assurance.webp"
import mma from "../Image/Partenaire/mma.png"
import oddo from "../Image/Partenaire/oddo.png"
import corum from "../Image/Partenaire/corum-avis.png"
import primonial from "../Image/Partenaire/primonial.png"
import viePlus from "../Image/Partenaire/vie-plus.png"
import metlife from "../Image/Partenaire/metLife.png"
import unimUNICED from "../Image/Partenaire/unim-logo.svg"
import ugip from "../Image/Partenaire/UGIP.svg"
import digitalInsure from "../Image/Partenaire/logo_digital_insure.png"
import sollyAzar from "../Image/Partenaire/logo_solly.png"
import ikapital from "../Image/Partenaire/logo-ikapital-investissement-cabinet.webp"
import magellim from "../Image/Partenaire/magellim.png"
import equitim from "../Image/Partenaire/equitim1_logo.jfif"
import foncierProsper from "../Image/Partenaire/foncier.png"
import exculivePartners from "../Image/Partenaire/exculive parteners.png"

export const partenaire = [
  {
    id: 1,
    name: "AXA",
    logo: axa,
    description: "Leader mondial de l'assurance, AXA propose des solutions complètes pour la retraite et l'épargne.",
    category: "Plan Epargne Retraite",
    specialities: ["Plan Epargne Retraite", "assurance Vie & Capitalisation"],
    founded: "1817",
    employees: "160,000",
    coverage: "Internationale",
    color: "from-blue-100 to-blue-200",
    website :"https://www.axa.fr/"
  },
  {
    id: 2,
    name: "ABEILLE",
    logo: abeille,
    description: "Abeille Assurance, filiale du groupe Covéa, spécialiste en assurance de personnes.",
    category: "Plan Epargne Retraite",
    specialities: ["Plan Epargne Retraite", "assurance Vie & Capitalisation", "Prevoyance du TNS & Liberal"],
    founded: "1986",
    employees: "1,200",
    coverage: "Nationale",
    color: "from-yellow-100 to-yellow-200" ,
    website : "https://www.abeille-assurances.fr/"
  },
  {
    id: 3,
    name: "GENERALI",
    logo: generali,
    description: "Groupe d'assurance international présent dans 50 pays avec une expertise en épargne-retraite.",
    category: "Plan Epargne Retraite",
    specialities: ["Plan Epargne Retraite", "assurance Vie & Capitalisation", "Prevoyance du TNS & Liberal"],
    founded: "1831",
    employees: "72,000",
    coverage: "Internationale",
    color: "from-green-100 to-green-200",
    website:"https://www.generali.fr/"
  },
  {
    id: 4,
    name: "SWISSLIFE",
    logo: swisslife,
    description: "Spécialiste de la prévoyance et de la gestion de patrimoine.",
    category: "Plan Epargne Retraite",
    specialities: ["Plan Epargne Retraite", "assurance Vie & Capitalisation", "Mutuelle & Mutuelle senior", "La collective"],
    founded: "1857",
    employees: "9,000",
    coverage: "Internationale",
    color: "from-red-100 to-red-200",
    website:"https://www.swisslife.fr/home.html"
  },
  {
    id: 5,
    name: "MMA",
    logo: mma,
    description: "Mutuelles du Mans Assurances, acteur historique de l'assurance française.",
    category: "Plan Epargne Retraite",
    specialities: ["Plan Epargne Retraite", "assurance Vie & Capitalisation"],
    founded: "1828",
    employees: "7,500",
    coverage: "Nationale",
    color: "from-blue-100 to-indigo-200",
    website :"https://www.mma.fr/"
  },
  {
    id: 6,
    name: "ODDO",
    logo: oddo,
    description: "Banque et gestion d'actifs avec une expertise en assurance vie.",
    category: "Plan Epargne Retraite",
    specialities: ["Plan Epargne Retraite", "assurance Vie & Capitalisation"],
    founded: "1986",
    employees: "1,800",
    coverage: "Internationale",
    color: "from-purple-100 to-purple-200",
    website : "https://www.oddo-bhf.com/fr/"
  },

  {
    id: 7,
    name: "CORUM",
    logo: corum,
    description: "Expert en épargne retraite et assurance vie pour les professionnels.",
    category: "Plan Epargne Retraite",
    specialities: ["Plan Epargne Retraite", "assurance Vie & Capitalisation"],
    founded: "1990",
    employees: "400",
    coverage: "Nationale",
    color: "from-teal-100 to-teal-200",
    website: "https://www.corum.fr/"
  },
  {
    id: 8,
    name: "PRIMONIAL",
    logo: primonial,
    description: "Groupe spécialisé dans la gestion de patrimoine et l'assurance.",
    category: "Plan Epargne Retraite",
    specialities: ["Plan Epargne Retraite", "assurance Vie & Capitalisation"],
    founded: "1990",
    employees: "1,200",
    coverage: "Nationale",
    color: "from-blue-100 to-cyan-200",
    website : "https://www.primonialpartenaires.fr/"
  },
  {
    id: 9,
    name: "VIE PLUS",
    logo: viePlus,
    description: "Spécialiste des contrats d'assurance vie haut de gamme.",
    category: "Plan Epargne Retraite",
    specialities: ["Plan Epargne Retraite", "assurance Vie & Capitalisation"],
    founded: "1995",
    employees: "150",
    coverage: "Nationale",
    color: "from-pink-100 to-pink-200",
    website : "https://www.vieplus.fr/"
  },
  {
    id: 10,
    name: "ALPTIS",
    logo: alptis,
    description: "Courtier en assurance spécialisé dans la protection sociale.",
    category: "Mutuelle & Mutuelle senior",
    specialities: ["Mutuelle & Mutuelle senior", "Prevoyance du TNS & Liberal", "Assurance emprunteur", "La collective"],
    founded: "2002",
    employees: "300",
    coverage: "Nationale",
    color: "from-purple-100 to-purple-200",
    website : "https://www.alptis.org/"
  },
  {
    id: 11,
    name: "NEOLIANE",
    logo: neoliane,
    description: "Spécialiste des contrats santé et prévoyance pour les particuliers.",
    category: "Mutuelle & Mutuelle senior",
    specialities: ["Mutuelle & Mutuelle senior", "Assurance emprunteur"],
    founded: "2006",
    employees: "500",
    coverage: "Nationale",
    color: "from-green-100 to-green-200",
    website: "https://www.neoliane-sante.fr/"
  },
  {
    id: 12,
    name: "APRIL",
    logo: april,
    description: "Groupe international spécialisé en assurance santé et prévoyance.",
    category: "Mutuelle & Mutuelle senior",
    specialities: ["Mutuelle & Mutuelle senior", "Prevoyance du TNS & Liberal", "Assurance emprunteur", "La collective"],
    founded: "1988",
    employees: "3,500",
    coverage: "Internationale",
    color: "from-orange-100 to-orange-200" ,
    website :"https://www.april.fr/"
  },
  {
    id: 13,
    name: "CEGEMA",
    logo: cegema,
    description: "Mutuelle spécialisée dans la santé et la prévoyance.",
    category: "Mutuelle & Mutuelle senior",
    specialities: ["Mutuelle & Mutuelle senior"],
    founded: "1960",
    employees: "200",
    coverage: "Nationale",
    color: "from-blue-100 to-blue-200" ,
    website :"https://www.cegema.com/"
  },
  {
    id: 14,
    name: "METLIFE",
    logo: metlife,
    description: "Assureur international proposant des solutions de prévoyance collective.",
    category: "Mutuelle & Mutuelle senior",
    specialities: ["Mutuelle & Mutuelle senior", "Prevoyance du TNS & Liberal", "La collective"],
    founded: "1868",
    employees: "43,000",
    coverage: "Internationale",
    color: "from-red-100 to-red-200",
    website :"https://www.metlife.fr/"
  },
  {
    id: 15,
    name: "MALAKOFF",
    logo: malakoff,
    description: "Acteur majeur de la protection sociale en France.",
    category: "Plan Epargne Retraite",
    specialities: [
      "Plan Epargne Retraite",
      "assurance Vie & Capitalisation",
      "Mutuelle & Mutuelle senior",
      "Prevoyance du TNS & Liberal",
      "Assurance emprunteur",
      "La collective"
    ],
    founded: "1905",
    employees: "6,700",
    coverage: "Nationale",
    color: "from-blue-100 to-teal-200",
    website:"https://www.malakoffhumanis.com/"
  },
  {
    id: 16,
    name: "UNIM & UNICED",
    logo: unimUNICED,
    description: "Spécialiste de la prévoyance pour les indépendants et professions libérales.",
    category: "Prevoyance du TNS & Liberal",
    specialities: ["Mutuelle & Mutuelle senior", "Prevoyance du TNS & Liberal", "Assurance emprunteur", "La collective"],
    founded: "1947",
    employees: "800",
    coverage: "Nationale",
    color: "from-indigo-100 to-indigo-200",
    website:"https://www.uniced.fr/"
  },
  {
    id: 17,
    name: "UGIP ASSURANCE",
    logo: ugip,
    description: "Assureur mutualiste spécialisé dans la protection des indépendants.",
    category: "Prevoyance du TNS & Liberal",
    specialities: ["Mutuelle & Mutuelle senior", "Prevoyance du TNS & Liberal", "Assurance emprunteur"],
    founded: "1962",
    employees: "350",
    coverage: "Nationale",
    color: "from-yellow-100 to-yellow-200",
    website: "https://www.ugipassurances.com/"
  },
  {
    id: 18,
    name: "DIGITAL INSURE",
    logo: digitalInsure,
    description: "Courtier digital spécialisé dans les assurances emprunteurs.",
    category: "Assurance emprunteur",
    specialities: ["Prevoyance du TNS & Liberal", "Assurance emprunteur"],
    founded: "2015",
    employees: "120",
    coverage: "Nationale",
    color: "from-gray-100 to-gray-200",
    website:"https://www.digital-insure.fr/"
  },
  {
    id: 19,
    name: "SOLLY AZAR",
    logo: sollyAzar,
    description: "Courtier en assurance spécialisé dans la santé des professionnels.",
    category: "Mutuelle & Mutuelle senior",
    specialities: ["Mutuelle & Mutuelle senior"],
    founded: "1980",
    employees: "180",
    coverage: "Nationale",
    color: "from-red-100 to-pink-200",
    website :"https://www.sollyazar.com/"
  },
  {
    id: 20,
    name: "IKAPITAL",
    logo: ikapital,
    description: "Plateforme digitale d'assurance pour les professionnels.",
    category: "Autre",
    specialities: [],
    founded: "2018",
    employees: "50",
    coverage: "Nationale",
    color: "from-blue-100 to-indigo-200",
    website:"https://www.i-kapital.fr/"
  },
  {
    id: 21,
    name: "MAGELLIM",
    logo: magellim,
    description: "Courtier en assurance spécialisé dans les solutions digitales.",
    category: "Autre",
    specialities: [],
    founded: "2016",
    employees: "80",
    coverage: "Nationale",
    color: "from-purple-100 to-purple-200",
    website:"https://www.groupemagellim.com/"
  },
  {
    id: 22,
    name: "EQUITIM",
    logo: equitim,
    description: "Expert en gestion de patrimoine et solutions d'assurance.",
    category: "Autre",
    specialities: [],
    founded: "2010",
    employees: "90",
    coverage: "Nationale",
    color: "from-green-100 to-green-200",
    website:"https://www.equitim.fr/"
  },
  {
    id: 23,
    name: "FONCIERE PROSPER",
    logo: foncierProsper,
    description: "Société de gestion spécialisée dans l'immobilier et l'assurance.",
    category: "Autre",
    specialities: [],
    founded: "2005",
    employees: "70",
    coverage: "Nationale",
    color: "from-yellow-100 to-yellow-200",
    website:"https://fonciere.merciprosper.com/"
  },
  {
    id: 24,
    name: "EXCULIVE PARTNERS",
    logo: exculivePartners,
    description: "Réseau de courtage haut de gamme en assurance.",
    category: "Autre",
    specialities: [],
    founded: "2012",
    employees: "60",
    coverage: "Nationale",
    color: "from-red-100 to-red-200",
    website :"https://fonciere.merciprosper.com/"
  }
];