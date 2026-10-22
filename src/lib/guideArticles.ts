export type GuideArticle = {
  category: "mutuelle" | "guides-pratiques" | "assurance" | "retraite";
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  introduction: string;
  sections: {
    heading: string;
    paragraphs: string[];
    points?: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedLinks: {
    href: string;
    label: string;
  }[];
};

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    category: "guides-pratiques",
    slug: "comment-utiliser-comparateur-mutuelle-sante",
    title: "Comment comparer les mutuelles santé et choisir la bonne couverture",
    description:
      "Un guide pratique pour comparer les garanties, les remboursements, les exclusions et le prix d’une mutuelle santé avant de demander un devis.",
    keywords: [
      "comment comparer une mutuelle santé",
      "guide comparateur mutuelle",
      "comparatif mutuelle santé",
      "choisir complémentaire santé",
    ],
    introduction:
      "Comparer une mutuelle ne consiste pas à retenir le tarif le plus bas. Il faut mettre en regard les garanties dont vous avez besoin, leurs plafonds, les exclusions et le coût total du contrat.",
    sections: [
      {
        heading: "Faire le point sur vos dépenses de santé",
        paragraphs: [
          "Commencez par vos soins habituels et ceux que vous anticipez : consultations, lunettes, soins dentaires, hospitalisation ou équipements auditifs. Le relevé de remboursements des derniers mois peut aider à estimer vos dépenses réelles.",
          "Tenez aussi compte des personnes à couvrir, de votre régime obligatoire et de votre budget mensuel. Une garantie élevée sur un poste que vous n’utilisez pas n’est pas toujours pertinente.",
        ],
        points: [
          "Séparez les soins courants des dépenses ponctuelles importantes.",
          "Vérifiez le dispositif 100 % Santé et les conditions des contrats responsables.",
          "Prévoyez une marge pour les soins imprévus sans surpayer toutes les garanties.",
        ],
      },
      {
        heading: "Comparer les garanties au-delà du pourcentage affiché",
        paragraphs: [
          "Un remboursement exprimé en pourcentage de la base de remboursement de la Sécurité sociale ne correspond pas nécessairement à un pourcentage de votre facture. Regardez également les forfaits en euros, les plafonds annuels, les délais de carence et les exclusions.",
          "Pour l’hospitalisation, contrôlez notamment le forfait journalier, les dépassements d’honoraires et la chambre particulière. Pour l’optique et le dentaire, comparez les forfaits et les conditions applicables aux équipements concernés.",
        ],
      },
      {
        heading: "Lire le tarif et les conditions du contrat",
        paragraphs: [
          "Comparez le montant des cotisations pour chaque personne couverte, les éventuelles évolutions de tarif et les services inclus. Avant de souscrire, lisez le tableau de garanties et les conditions générales : ils précisent les limites réelles de prise en charge.",
          "Demandez un devis personnalisé avec des informations exactes. Il permet de comparer des offres établies sur un profil comparable, sans confondre estimation de prix et garantie contractuelle.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quel est le critère le plus important pour comparer une mutuelle ?",
        answer:
          "Il n’y a pas de critère unique : le bon choix dépend de vos soins prévisibles, du reste à charge accepté et de votre budget. Comparez les garanties utiles, les plafonds, les exclusions et le prix ensemble.",
      },
      {
        question: "Un remboursement à 200 % signifie-t-il que tout est remboursé ?",
        answer:
          "Non. Le pourcentage s’applique généralement à une base de remboursement définie, et non au montant total de la facture. Les plafonds, forfaits et conditions du contrat peuvent aussi limiter le remboursement.",
      },
      {
        question: "Comment obtenir un devis de mutuelle santé ?",
        answer:
          "Renseignez votre situation et les garanties recherchées dans le formulaire de comparaison. Vérifiez ensuite le détail des propositions et les documents contractuels avant toute souscription.",
      },
    ],
    relatedLinks: [
      { href: "/comparateur-mutuelle-sante", label: "Demander un devis mutuelle gratuit" },
      { href: "/mutuelle-sante/mutuelle-pas-chere", label: "Comparer les mutuelles à petit budget" },
      { href: "/mutuelle-sante/mutuelle-dentaire", label: "Comparer les garanties dentaires" },
    ],
  },
  {
    category: "mutuelle",
    slug: "mutuelle-senior-comment-choisir",
    title: "Quelle mutuelle santé choisir quand on est senior ?",
    description:
      "Comment choisir une mutuelle senior : comparez les besoins en optique, dentaire, audition, hospitalisation, les plafonds et le coût des garanties.",
    keywords: [
      "quelle mutuelle santé pour senior",
      "choisir mutuelle senior",
      "comparatif mutuelle senior",
      "mutuelle retraité",
    ],
    introduction:
      "La mutuelle senior adaptée est celle qui couvre les dépenses réellement importantes pour vous, à un tarif soutenable. Il est utile de comparer les postes de soins séparément plutôt que de choisir uniquement selon l’âge ou le prix annoncé.",
    sections: [
      {
        heading: "Prioriser les garanties selon vos soins",
        paragraphs: [
          "Examinez vos dépenses en consultations, hospitalisation, optique, dentaire et audition. Les besoins varient d’une personne à l’autre : un renfort intéressant pour un assuré ne sera pas forcément utile à un autre.",
          "Vérifiez les forfaits et leurs plafonds annuels, ainsi que les conditions de prise en charge. Le 100 % Santé peut réduire le reste à charge sur certains équipements, selon les paniers et les conditions applicables.",
        ],
        points: [
          "Hospitalisation : honoraires, forfait journalier et chambre particulière.",
          "Dentaire et optique : plafonds, périodicité et équipements concernés.",
          "Audition : garanties prévues au contrat et articulation avec le 100 % Santé.",
        ],
      },
      {
        heading: "Vérifier le coût et les limites du contrat",
        paragraphs: [
          "Comparez le montant des cotisations pour votre âge et votre situation, mais aussi les règles d’évolution du tarif. Consultez les exclusions, les délais de carence éventuels et les plafonds avant de signer.",
          "Évitez de payer pour des niveaux de garantie dont vous n’avez pas l’usage. À l’inverse, un contrat très économique peut laisser un reste à charge important sur les soins dont vous avez besoin.",
        ],
      },
      {
        heading: "Comparer les contrats lors d’un départ à la retraite",
        paragraphs: [
          "Lors du départ à la retraite, renseignez-vous sur le maintien éventuel de votre couverture collective et ses conditions, notamment au titre de la loi Evin. Comparez cette solution avec des contrats individuels en tenant compte de leurs garanties et cotisations.",
          "Les modalités dépendent de votre situation et du contrat. Demandez les informations à votre employeur ou à l’organisme assureur avant de décider.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quelle mutuelle santé est la meilleure pour un senior ?",
        answer:
          "Il n’existe pas de meilleure offre pour tous. Comparez les garanties correspondant à vos soins, les plafonds, les exclusions et le tarif pour votre profil.",
      },
      {
        question: "Faut-il choisir une mutuelle avec de forts remboursements partout ?",
        answer:
          "Pas nécessairement. Un renfort ciblé sur vos dépenses prévisibles peut être plus adapté qu’un niveau élevé sur tous les postes. Vérifiez toutefois les plafonds et les conditions du contrat.",
      },
      {
        question: "Peut-on comparer sa mutuelle au moment de la retraite ?",
        answer:
          "Oui. Vous pouvez étudier le maintien de votre couverture collective et le comparer à des contrats individuels, en vérifiant les règles applicables à votre situation.",
      },
    ],
    relatedLinks: [
      { href: "/mutuelle-sante/mutuelle-senior", label: "Voir la page mutuelle senior" },
      { href: "/mutuelle-sante/mutuelle-retraite", label: "Comprendre la mutuelle à la retraite" },
      { href: "/comparateur-mutuelle-sante", label: "Comparer les offres et demander un devis" },
    ],
  },
  {
    category: "mutuelle",
    slug: "mutuelle-famille-pas-chere",
    title: "Comment trouver une mutuelle famille adaptée à son budget ?",
    description:
      "Les critères pour comparer une mutuelle famille pas chère : cotisation par assuré, soins des enfants, orthodontie, optique et niveaux de garanties.",
    keywords: [
      "quelle mutuelle famille pas chère",
      "mutuelle famille pas chère",
      "comparateur mutuelle famille",
      "mutuelle pour deux personnes",
    ],
    introduction:
      "Pour réduire le budget santé du foyer, comparez le coût total de la couverture familiale avec les besoins de chaque assuré. Une formule économique doit rester cohérente avec les soins courants et les dépenses prévisibles des enfants.",
    sections: [
      {
        heading: "Établir les besoins de chaque membre du foyer",
        paragraphs: [
          "Listez les soins qui reviennent régulièrement : consultations, lunettes, soins dentaires et, le cas échéant, orthodontie. Les besoins des enfants et des adultes peuvent être différents, même s’ils sont couverts par un même contrat.",
          "Vérifiez si le contrat permet d’ajuster les garanties ou si des options sont proposées. Contrôlez également la cotisation pour chaque ayant droit et les éventuels avantages familiaux dans les documents du contrat.",
        ],
      },
      {
        heading: "Comparer les remboursements et les plafonds",
        paragraphs: [
          "En optique et en dentaire, regardez les forfaits, les plafonds annuels et les conditions de renouvellement. Pour l’orthodontie, vérifiez la prise en charge prévue et les éventuelles limites liées à l’âge ou au type de soin.",
          "Le dispositif 100 % Santé concerne certains équipements et soins selon des paniers précis ; il ne signifie pas que toutes les dépenses de la famille seront intégralement remboursées.",
        ],
        points: [
          "Comparez le coût total annuel, pas seulement le prix mensuel affiché.",
          "Évaluez séparément les besoins des adultes et des enfants.",
          "Lisez les délais de carence, exclusions et plafonds applicables.",
        ],
      },
      {
        heading: "Éviter les économies qui augmentent le reste à charge",
        paragraphs: [
          "Choisir systématiquement la cotisation la plus basse peut être pénalisant si elle couvre peu les soins dont votre famille a besoin. À l’inverse, des garanties très élevées sur des postes rarement utilisés peuvent alourdir inutilement le budget.",
          "Demandez des devis comparables avec le même nombre d’assurés et les mêmes besoins, puis vérifiez le tableau de garanties avant toute décision.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quelle mutuelle famille pas chère choisir ?",
        answer:
          "Comparez le coût total du contrat et les garanties utiles à chaque membre du foyer, notamment en optique, dentaire et orthodontie. La formule la moins chère n’est pas toujours la plus économique si le reste à charge est élevé.",
      },
      {
        question: "Une mutuelle famille couvre-t-elle automatiquement les enfants ?",
        answer:
          "Les règles d’affiliation des enfants et les éventuels tarifs associés dépendent de chaque contrat. Vérifiez les conditions d’adhésion, les limites d’âge et les cotisations dans les documents de l’assureur.",
      },
      {
        question: "Comment comparer deux devis familiaux ?",
        answer:
          "Vérifiez que les devis couvrent les mêmes personnes, puis comparez les niveaux de remboursement, plafonds, délais de carence, exclusions et coût annuel total.",
      },
    ],
    relatedLinks: [
      { href: "/mutuelle-sante/mutuelle-famille", label: "Comparer les garanties famille" },
      { href: "/mutuelle-sante/mutuelle-dentaire", label: "Découvrir les garanties dentaires" },
      { href: "/comparateur-mutuelle-sante", label: "Demander un devis gratuit" },
    ],
  },
  {
    category: "mutuelle",
    slug: "mutuelle-dentaire-choisir",
    title: "Quelle mutuelle dentaire choisir pour ses soins ?",
    description:
      "Guide pour choisir une mutuelle dentaire : soins courants, couronnes, orthodontie, implants, plafonds et dispositif 100 % Santé.",
    keywords: [
      "quelle mutuelle dentaire choisir",
      "mutuelle dentaire",
      "remboursement couronne dentaire",
      "mutuelle implant dentaire",
      "mutuelle orthodontie",
    ],
    introduction:
      "Les garanties dentaires diffèrent fortement selon les contrats et les actes. Pour choisir une mutuelle, partez des soins envisagés et comparez les remboursements réellement prévus, leurs plafonds et les exclusions.",
    sections: [
      {
        heading: "Distinguer les types de soins dentaires",
        paragraphs: [
          "Les consultations et soins conservateurs, les prothèses, l’orthodontie et les implants ne sont pas nécessairement couverts de la même façon. Les implants, en particulier, peuvent relever de conditions et de forfaits spécifiques au contrat.",
          "Demandez un devis à votre chirurgien-dentiste et rapprochez-le du tableau de garanties. Vous pourrez ainsi estimer le remboursement et le reste à charge avant le début des soins.",
        ],
      },
      {
        heading: "Comprendre le 100 % Santé et les plafonds",
        paragraphs: [
          "Le panier 100 % Santé dentaire prévoit une prise en charge sans reste à charge pour certains actes et équipements, sous réserve de respecter les conditions réglementaires et de disposer d’un contrat responsable. D’autres solutions peuvent être proposées avec des tarifs différents.",
          "Vérifiez les plafonds annuels, les délais de carence, les limites par acte et les éventuelles périodes de renouvellement. Un taux de remboursement seul ne permet pas toujours d’estimer la dépense finale.",
        ],
      },
      {
        heading: "Choisir selon les soins prévus et non selon une promesse générale",
        paragraphs: [
          "Comparez les garanties en fonction de vos actes probables et du devis établi. Contrôlez aussi si le contrat applique un plafond global ou des plafonds propres aux prothèses et à l’orthodontie.",
          "Avant la souscription, demandez confirmation écrite de la prise en charge si un traitement coûteux est déjà planifié. Les conditions contractuelles déterminent le remboursement effectif.",
        ],
      },
    ],
    faqs: [
      {
        question: "Une mutuelle rembourse-t-elle les implants dentaires ?",
        answer:
          "La prise en charge varie selon le contrat. Les implants peuvent faire l’objet d’un forfait spécifique ou ne pas être couverts ; vérifiez le tableau de garanties et demandez une estimation à partir du devis du praticien.",
      },
      {
        question: "Le 100 % Santé couvre-t-il tous les soins dentaires ?",
        answer:
          "Non. Le dispositif concerne des actes et équipements définis dans un panier réglementé. D’autres actes, matériaux ou options peuvent entraîner un reste à charge.",
      },
      {
        question: "Que faut-il vérifier avant un soin dentaire coûteux ?",
        answer:
          "Comparez le devis du praticien avec les garanties de votre contrat, y compris les plafonds, exclusions et délais de carence, et demandez une simulation de remboursement à votre complémentaire.",
      },
    ],
    relatedLinks: [
      { href: "/mutuelle-sante/mutuelle-dentaire", label: "Voir les garanties de mutuelle dentaire" },
      { href: "/mutuelle-sante/mutuelle-famille", label: "Comparer les offres pour une famille" },
      { href: "/comparateur-mutuelle-sante", label: "Demander un devis mutuelle" },
    ],
  },
  {
    category: "mutuelle",
    slug: "mutuelle-optique-remboursement",
    title: "Quelle mutuelle optique rembourse le mieux les lunettes ?",
    description:
      "Comprendre les remboursements optiques et comparer les forfaits lunettes, lentilles, fréquence de renouvellement et conditions du 100 % Santé.",
    keywords: [
      "quelle mutuelle optique rembourse le mieux",
      "mutuelle optique",
      "remboursement lunettes mutuelle",
      "forfait lunettes mutuelle",
      "mutuelle lentilles",
    ],
    introduction:
      "La mutuelle optique qui vous convient dépend du type d’équipement dont vous avez besoin et de la fréquence de renouvellement. Comparez les montants et les règles de remboursement plutôt que de vous fier à un classement général.",
    sections: [
      {
        heading: "Comparer le remboursement des équipements",
        paragraphs: [
          "Vérifiez séparément les lunettes, les lentilles et les éventuelles prestations spécifiques. Pour les lunettes, regardez les montants dédiés à la monture et aux verres, ainsi que les conditions selon le panier choisi.",
          "Le panier 100 % Santé optique permet, sous conditions, de choisir certains équipements sans reste à charge avec un contrat responsable. Les équipements hors panier sont soumis aux garanties et aux plafonds du contrat.",
        ],
      },
      {
        heading: "Vérifier les fréquences, plafonds et conditions",
        paragraphs: [
          "Les contrats peuvent prévoir des limites de remboursement et des périodes minimales entre deux équipements, avec des exceptions réglementaires selon les situations. Lisez les conditions exactes et vérifiez les règles applicables à votre prescription.",
          "Pour les lentilles, consultez le forfait annuel, les éventuelles conditions de remboursement par l’Assurance Maladie et les justificatifs demandés.",
        ],
      },
      {
        heading: "Comparer à partir d’un devis opticien",
        paragraphs: [
          "Demandez un devis détaillé et comparez-le aux garanties de plusieurs contrats. Le réseau de soins, le tiers payant et les services associés peuvent aussi influencer le coût restant à votre charge.",
          "Si vous portez rarement des lunettes, une formule avec un forfait élevé peut ne pas être rentable. Estimez le coût total des cotisations au regard de vos dépenses habituelles.",
        ],
      },
    ],
    faqs: [
      {
        question: "Comment savoir quelle mutuelle rembourse le mieux mes lunettes ?",
        answer:
          "Comparez le devis de l’opticien au forfait et aux conditions du contrat : monture, verres, panier choisi, plafond et fréquence de renouvellement. Le meilleur remboursement dépend de votre équipement.",
      },
      {
        question: "Le 100 % Santé permet-il d’avoir toutes les lunettes sans frais ?",
        answer:
          "Il concerne une sélection d’équipements répondant aux critères du panier 100 % Santé, sous réserve des conditions applicables. Les équipements choisis hors panier peuvent entraîner un reste à charge.",
      },
      {
        question: "Les lentilles sont-elles toujours remboursées par la mutuelle ?",
        answer:
          "Non. Le niveau de prise en charge dépend du contrat et, selon les cas, du remboursement du régime obligatoire. Consultez les conditions et le forfait prévu pour les lentilles.",
      },
    ],
    relatedLinks: [
      { href: "/mutuelle-sante/mutuelle-optique", label: "Comparer les garanties optiques" },
      { href: "/mutuelle-sante/mutuelle-dentaire", label: "Comparer les garanties dentaires" },
      { href: "/comparateur-mutuelle-sante", label: "Demander un devis gratuit" },
    ],
  },
  {
    category: "guides-pratiques",
    slug: "changer-mutuelle-sante",
    title: "Quand et comment changer de mutuelle santé ?",
    description:
      "Les règles et étapes pour changer de complémentaire santé, comparer un nouveau contrat et organiser la transition sans interruption évitable.",
    keywords: [
      "quand changer de mutuelle",
      "comment changer de mutuelle santé",
      "changer mutuelle après un an",
      "résiliation complémentaire santé",
    ],
    introduction:
      "Un changement de mutuelle peut être envisagé lorsque vos besoins, votre budget ou votre situation professionnelle évoluent. Vérifiez les règles de résiliation applicables à votre contrat et comparez la nouvelle couverture avant de vous engager.",
    sections: [
      {
        heading: "Identifier le bon moment pour comparer",
        paragraphs: [
          "Un déménagement, un départ à la retraite, une évolution de la famille ou des garanties devenues inadaptées peuvent justifier une comparaison. Vous pouvez aussi vérifier périodiquement le rapport entre vos cotisations et les remboursements utiles.",
          "Pour un contrat individuel de complémentaire santé, la résiliation infra-annuelle est généralement possible après un an d’adhésion. Les contrats collectifs et certaines situations obéissent à des règles spécifiques : consultez vos documents contractuels.",
        ],
      },
      {
        heading: "Comparer avant de lancer la résiliation",
        paragraphs: [
          "Comparez les garanties poste par poste, les plafonds, exclusions, délais de carence éventuels et la date de prise d’effet. Ne vous limitez pas à la cotisation mensuelle.",
          "Vérifiez les besoins de chaque assuré, le caractère responsable du contrat si le 100 % Santé est important pour vous, et les modalités de résiliation de l’ancien contrat.",
        ],
      },
      {
        heading: "Organiser le passage au nouveau contrat",
        paragraphs: [
          "Lorsqu’un nouvel organisme prend en charge la résiliation pour vous, vérifiez que le contrat est bien éligible à cette démarche et demandez confirmation des dates. Si vous effectuez les démarches vous-même, conservez les justificatifs et contrôlez la date de fin de couverture.",
          "Évitez de résilier l’ancienne couverture avant d’avoir confirmé l’acceptation et la date d’effet de la nouvelle. Les délais et modalités exacts figurent dans les échanges avec les organismes concernés.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quand peut-on changer de mutuelle santé ?",
        answer:
          "Pour un contrat individuel de complémentaire santé, la résiliation infra-annuelle est généralement ouverte après un an d’adhésion. Des règles différentes peuvent s’appliquer selon le contrat et la situation.",
      },
      {
        question: "Le nouvel assureur peut-il s’occuper de la résiliation ?",
        answer:
          "Dans le cadre prévu par la réglementation, le nouvel organisme peut effectuer les démarches de résiliation d’un contrat individuel. Confirmez avec lui l’éligibilité du contrat et les dates de prise d’effet.",
      },
      {
        question: "Comment éviter une interruption de couverture ?",
        answer:
          "Confirmez l’acceptation et la date de prise d’effet du nouveau contrat, puis vérifiez la date de fin de l’ancien. Ne supposez pas que les garanties et dates se coordonnent automatiquement.",
      },
    ],
    relatedLinks: [
      { href: "/mutuelle-sante/changer-mutuelle", label: "Découvrir les démarches de changement" },
      { href: "/mutuelle-sante/resiliation-mutuelle", label: "Comprendre la résiliation" },
      { href: "/comparateur-mutuelle-sante", label: "Comparer les contrats de mutuelle" },
    ],
  },
  {
    category: "guides-pratiques",
    slug: "resilier-mutuelle-sante",
    title: "Comment résilier une mutuelle santé ?",
    description:
      "Guide des démarches de résiliation d’une complémentaire santé : contrat individuel, résiliation après un an, prise d’effet et précautions.",
    keywords: [
      "comment résilier une mutuelle",
      "résiliation mutuelle santé",
      "résilier complémentaire santé",
      "résiliation mutuelle après un an",
    ],
    introduction:
      "Les démarches pour résilier une mutuelle dépendent du type de contrat et de votre situation. Avant d’envoyer une demande, vérifiez les conditions, la date d’effet et les justificatifs éventuellement nécessaires.",
    sections: [
      {
        heading: "Vérifier le type de contrat et les règles applicables",
        paragraphs: [
          "Pour un contrat individuel de complémentaire santé, la résiliation infra-annuelle peut en principe être demandée après un an d’adhésion. Les garanties collectives d’entreprise et certaines situations particulières peuvent suivre d’autres modalités.",
          "Consultez votre échéancier, les conditions générales et les informations de l’organisme assureur pour confirmer la date d’éligibilité et le canal de demande.",
        ],
      },
      {
        heading: "Envoyer la demande et conserver une preuve",
        paragraphs: [
          "La demande peut, selon le contrat et les règles applicables, être transmise par différents moyens, notamment par l’intermédiaire du nouvel organisme lorsque vous souscrivez une autre complémentaire. Conservez une confirmation écrite et toute référence de dossier.",
          "Une demande de résiliation prend effet selon les délais légaux ou contractuels applicables. Vérifiez la date exacte communiquée par l’organisme avant d’arrêter vos prélèvements.",
        ],
      },
      {
        heading: "Préparer la nouvelle couverture",
        paragraphs: [
          "Comparez la couverture de remplacement avant de résilier : garanties, exclusions, plafonds, délais de carence et date d’effet. En cas de contrat collectif obligatoire ou de changement de situation, demandez conseil à l’assureur ou à l’employeur.",
          "Si un motif particulier permet une résiliation avant la première année, les justificatifs et délais peuvent varier. Vérifiez les conditions correspondant précisément à votre situation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Peut-on résilier une mutuelle à tout moment ?",
        answer:
          "Pour un contrat individuel de complémentaire santé, la résiliation à tout moment est généralement possible après un an d’adhésion. Avant cette échéance ou pour un contrat collectif, d’autres règles peuvent s’appliquer.",
      },
      {
        question: "La résiliation d’une mutuelle est-elle payante ?",
        answer:
          "La résiliation infra-annuelle prévue pour les contrats concernés ne donne pas lieu à des frais de résiliation. Vérifiez toutefois les sommes dues jusqu’à la date effective de fin du contrat.",
      },
      {
        question: "Quels documents faut-il pour résilier ?",
        answer:
          "Les documents dépendent du motif et du contrat. Consultez les conditions de l’organisme et fournissez les justificatifs demandés lorsqu’une situation particulière le requiert.",
      },
    ],
    relatedLinks: [
      { href: "/mutuelle-sante/resiliation-mutuelle", label: "Voir les démarches de résiliation" },
      { href: "/mutuelle-sante/changer-mutuelle", label: "Préparer un changement de mutuelle" },
      { href: "/comparateur-mutuelle-sante", label: "Comparer une nouvelle mutuelle" },
    ],
  },
  {
    category: "mutuelle",
    slug: "mutuelle-independant-tns",
    title: "Quelle mutuelle choisir quand on est indépendant ou TNS ?",
    description:
      "Les critères pour choisir une mutuelle TNS : garanties, budget, couverture de la famille et points fiscaux à vérifier pour le dispositif Madelin.",
    keywords: [
      "quelle mutuelle pour les indépendants",
      "mutuelle TNS",
      "mutuelle indépendant",
      "complémentaire santé travailleur non salarié",
      "loi Madelin mutuelle",
    ],
    introduction:
      "Les travailleurs indépendants peuvent comparer des contrats individuels en fonction de leur activité, de leur régime et de leurs besoins de santé. Les règles de déduction fiscale dépendent du statut et du régime fiscal : elles doivent être vérifiées au cas par cas.",
    sections: [
      {
        heading: "Comparer les garanties selon votre activité",
        paragraphs: [
          "Évaluez les soins que vous utilisez et le niveau de couverture dont vous avez besoin en cas d’hospitalisation, de soins dentaires ou d’optique. Pensez aussi aux ayants droit si vous souhaitez couvrir votre famille.",
          "Comparez les plafonds, exclusions, délais de carence et le coût annuel total. Vérifiez les modalités de paiement et les conditions de maintien du contrat.",
        ],
      },
      {
        heading: "Examiner le régime obligatoire et votre budget",
        paragraphs: [
          "Le niveau de remboursement du régime obligatoire dépend notamment de votre situation et des soins concernés. Une complémentaire peut couvrir tout ou partie du reste à charge selon le contrat, sans remplacer une prévoyance en cas d’arrêt de travail.",
          "Distinguez la complémentaire santé de la prévoyance professionnelle : leurs garanties et leurs objectifs ne sont pas identiques.",
        ],
      },
      {
        heading: "Vérifier les conditions du dispositif Madelin",
        paragraphs: [
          "Le traitement fiscal des cotisations dépend du statut juridique, du régime d’imposition et du respect des conditions légales. Le dispositif Madelin ne s’applique pas uniformément à tous les indépendants ; certaines situations, notamment le régime micro, nécessitent une vérification particulière.",
          "Avant de retenir un contrat pour son avantage fiscal, demandez confirmation à un professionnel compétent ou à l’administration fiscale. Ne déduisez pas une cotisation sur la seule base d’une promesse commerciale.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quelle mutuelle choisir quand on est indépendant ?",
        answer:
          "Comparez les garanties avec vos dépenses prévisibles, votre budget et les besoins des personnes que vous souhaitez couvrir. Vérifiez les plafonds et exclusions des contrats avant de souscrire.",
      },
      {
        question: "La mutuelle est-elle obligatoire pour un travailleur indépendant ?",
        answer:
          "Les obligations dépendent notamment de votre statut et de votre situation. Même en l’absence d’obligation individuelle, une complémentaire peut aider à couvrir certains frais restant à votre charge.",
      },
      {
        question: "Les cotisations de mutuelle TNS sont-elles déductibles ?",
        answer:
          "Une déduction peut être possible sous certaines conditions pour certains travailleurs non salariés, mais elle dépend du statut et du régime fiscal. Faites vérifier votre éligibilité avant de la déclarer.",
      },
    ],
    relatedLinks: [
      {
        href: "/mutuelle-sante/tns-independants-loi-madelin",
        label: "Voir la page mutuelle TNS et loi Madelin",
      },
      { href: "/mutuelle-sante/mutuelle-hospitalisation", label: "Comparer les garanties hospitalisation" },
      { href: "/comparateur-mutuelle-sante", label: "Comparer les offres et demander un devis" },
    ],
  },
  {
    category: "mutuelle",
    slug: "100-sante-optique-dentaire-audio",
    title: "100 % Santé : comprendre les paniers optique, dentaire et audio",
    description:
      "Ce que couvre le dispositif 100 % Santé en optique, dentaire et audiologie, ses conditions et les points à contrôler avant de choisir un équipement.",
    keywords: [
      "100 % Santé mutuelle",
      "100 % Santé lunettes",
      "100 % Santé dentaire",
      "reste à charge zéro mutuelle",
      "panier 100 santé",
    ],
    introduction:
      "Le dispositif 100 % Santé permet, sous conditions, d’accéder à certains équipements en optique, dentaire et audiologie sans reste à charge. Il s’appuie sur des paniers définis et sur la couverture par l’Assurance Maladie et une complémentaire responsable.",
    sections: [
      {
        heading: "Comprendre les paniers et les équipements concernés",
        paragraphs: [
          "Les paniers 100 % Santé proposent une sélection de lunettes, de prothèses dentaires et d’aides auditives répondant à des critères précis. Les équipements hors panier restent soumis aux tarifs et remboursements applicables, qui peuvent laisser un reste à charge.",
          "Demandez au professionnel de santé de présenter les options disponibles et un devis détaillé. Vous pourrez comparer les équipements du panier avec les alternatives proposées.",
        ],
      },
      {
        heading: "Vérifier les conditions de prise en charge",
        paragraphs: [
          "La prise en charge intégrale suppose notamment un équipement éligible et une complémentaire santé répondant aux conditions réglementaires, sauf situations particulières. Le détail dépend du poste de soins et des règles en vigueur.",
          "Le 100 % Santé ne signifie pas que toute dépense de santé ou tout équipement choisi librement est remboursé intégralement.",
        ],
      },
      {
        heading: "Comparer aussi les garanties hors panier",
        paragraphs: [
          "Si vous envisagez un équipement hors panier ou des soins complémentaires, comparez les forfaits et plafonds de votre contrat. Lisez le devis et le tableau de garanties avant de valider les soins.",
          "En cas de doute sur un remboursement, demandez une simulation à votre complémentaire et conservez les documents transmis par le professionnel.",
        ],
      },
    ],
    faqs: [
      {
        question: "Le 100 % Santé est-il accessible avec toutes les mutuelles ?",
        answer:
          "La prise en charge sans reste à charge dépend notamment du type de contrat et de l’équipement choisi. Vérifiez que votre complémentaire respecte les conditions applicables et demandez un devis au professionnel.",
      },
      {
        question: "Toutes les lunettes sont-elles incluses dans le 100 % Santé ?",
        answer:
          "Non. Le panier comporte une sélection d’équipements répondant à des critères précis. Les montures et verres choisis en dehors de cette sélection relèvent d’autres conditions de remboursement.",
      },
      {
        question: "Le 100 % Santé couvre-t-il les implants dentaires ?",
        answer:
          "Le dispositif concerne des actes et équipements définis. Les implants ne sont pas systématiquement pris en charge dans le panier 100 % Santé ; consultez le devis et les garanties de votre contrat.",
      },
    ],
    relatedLinks: [
      { href: "/mutuelle-sante/mutuelle-optique", label: "Comparer les garanties optiques" },
      { href: "/mutuelle-sante/mutuelle-dentaire", label: "Comparer les garanties dentaires" },
      { href: "/comparateur-mutuelle-sante", label: "Comparer les mutuelles santé" },
    ],
  },
  {
    category: "assurance",
    slug: "changer-assurance-emprunteur-loi-lemoine",
    title: "Changer d’assurance emprunteur avec la loi Lemoine : mode d’emploi",
    description:
      "Les étapes pour demander le changement d’une assurance emprunteur et vérifier l’équivalence des garanties exigées par la banque.",
    keywords: [
      "changer assurance emprunteur loi Lemoine",
      "résiliation assurance prêt immobilier",
      "équivalence garanties assurance emprunteur",
    ],
    introduction:
      "La loi Lemoine permet de demander le changement d’assurance emprunteur à tout moment, sous réserve notamment que le nouveau contrat respecte le niveau de garanties exigé par la banque.",
    sections: [
      {
        heading: "Comparer les garanties avant le tarif",
        paragraphs: [
          "La banque définit les garanties minimales exigées pour le prêt. Comparez les garanties du contrat proposé avec celles demandées, ainsi que les exclusions, franchises et délais de carence, avant d’évaluer le coût.",
          "Un tarif plus bas ne suffit pas si le nouveau contrat ne satisfait pas les exigences d’équivalence. Demandez une comparaison détaillée des garanties avant de choisir.",
        ],
      },
      {
        heading: "Transmettre la demande de substitution",
        paragraphs: [
          "Adressez à la banque une demande de substitution accompagnée des informations du nouveau contrat. L’établissement vérifie l’équivalence avec les garanties exigées pour le prêt et doit motiver sa réponse selon les règles applicables.",
          "Attendez la confirmation de la substitution et de la date de prise d’effet avant de mettre fin à l’assurance en cours.",
        ],
      },
      {
        heading: "Vérifier les conditions de votre situation",
        paragraphs: [
          "Les formalités dépendent du prêt et du contrat. Certaines règles relatives au questionnaire de santé ne s’appliquent que sous des conditions précises : vérifiez votre éligibilité avec la banque ou un professionnel.",
        ],
      },
    ],
    faqs: [
      {
        question: "Peut-on changer d’assurance emprunteur à tout moment ?",
        answer:
          "La loi Lemoine permet de demander un changement à tout moment, sous réserve notamment que le nouveau contrat présente un niveau de garanties équivalent à celui exigé par la banque.",
      },
      {
        question: "Faut-il résilier l’ancien contrat avant l’accord de la banque ?",
        answer:
          "Il est prudent d’attendre la validation de la substitution et de confirmer la date d’effet du nouveau contrat avant de mettre fin à l’assurance existante.",
      },
    ],
    relatedLinks: [
      { href: "/guides-conseils/assurance", label: "Retour aux guides assurance" },
      { href: "/Contact", label: "Contacter l’équipe" },
    ],
  },
  {
    category: "assurance",
    slug: "guide-assurance-auto-habitation-changement",
    title: "Changer d’assurance auto ou habitation : démarches et points de vigilance",
    description:
      "Les critères pour comparer une assurance auto ou habitation et les étapes à vérifier lors d’un changement de contrat.",
    keywords: [
      "changer assurance auto après un an",
      "changer assurance habitation",
      "résiliation assurance loi Hamon",
      "comparer assurance auto habitation",
    ],
    introduction:
      "Comparer une assurance auto ou habitation suppose de vérifier à la fois le prix et les garanties. Les règles de résiliation varient selon le contrat et son ancienneté : contrôlez les conditions applicables avant d’engager le changement.",
    sections: [
      {
        heading: "Comparer garanties, franchises et exclusions",
        paragraphs: [
          "Pour l’auto, examinez notamment la responsabilité civile, les dommages au véhicule, le vol, le bris de glace et l’assistance. Pour l’habitation, comparez les biens couverts, les événements garantis, les plafonds et les exclusions.",
          "Deux contrats de même prix peuvent offrir des niveaux de protection différents. Vérifiez les franchises, les plafonds d’indemnisation et les conditions de mise en œuvre des garanties.",
        ],
      },
      {
        heading: "Vérifier la résiliation et la date d’effet",
        paragraphs: [
          "Après la première année, certains contrats auto et habitation peuvent être résiliés à tout moment dans le cadre prévu par la loi. Les modalités dépendent du type de contrat et de votre situation.",
          "Si un nouvel assureur effectue les démarches, confirmez par écrit la date de fin de l’ancien contrat et celle de prise d’effet du nouveau.",
        ],
      },
      {
        heading: "Conserver les justificatifs",
        paragraphs: [
          "Ne mettez pas fin à une couverture obligatoire avant d’avoir confirmé la continuité avec le nouvel assureur. Pour un véhicule, assurez-vous que la couverture est effective avant de circuler.",
          "Conservez les devis, confirmations de souscription et échanges de résiliation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Peut-on changer d’assurance auto après un an ?",
        answer:
          "La résiliation après un an est possible pour les contrats concernés, selon les règles applicables. Vérifiez la date d’éligibilité et les démarches avec le nouvel assureur.",
      },
      {
        question: "Quels éléments comparer entre deux contrats ?",
        answer:
          "Comparez les garanties, plafonds, franchises, exclusions, assistance et cotisation en fonction de vos biens et de votre situation.",
      },
    ],
    relatedLinks: [
      { href: "/guides-conseils/assurance", label: "Retour aux guides assurance" },
      { href: "/Contact", label: "Contacter l’équipe" },
    ],
  },
  {
    category: "retraite",
    slug: "choisir-mutuelle-retraite",
    title: "Mutuelle à la retraite : comment choisir et comparer les garanties",
    description:
      "Départ à la retraite : comparez le maintien éventuel de votre couverture collective et les contrats individuels selon les garanties, le coût et vos besoins de santé.",
    keywords: [
      "mutuelle à la retraite",
      "choisir mutuelle retraité",
      "maintien mutuelle entreprise retraite",
      "loi Evin mutuelle retraite",
      "comparatif mutuelle retraite",
    ],
    introduction:
      "Au départ à la retraite, votre situation de couverture santé peut évoluer. Avant de choisir, vérifiez les conditions de maintien de votre contrat collectif et comparez-les avec des contrats individuels adaptés à vos besoins et à votre budget.",
    sections: [
      {
        heading: "Faire le point sur la couverture existante",
        paragraphs: [
          "Demandez à votre ancien employeur ou à l’organisme assureur les conditions de maintien de la couverture collective, les garanties conservées, les cotisations et les délais de réponse. Le maintien éventuel au titre de la loi Evin répond à des conditions spécifiques et peut entraîner une évolution des cotisations.",
          "Comparez les garanties qui vous seront réellement applicables après le départ : les niveaux de couverture et les services ne sont pas nécessairement identiques à ceux dont vous bénéficiiez comme salarié.",
        ],
      },
      {
        heading: "Comparer avec des contrats individuels",
        paragraphs: [
          "Établissez plusieurs devis sur un profil comparable. Examinez les garanties en optique, dentaire, audition, soins courants et hospitalisation, ainsi que les plafonds, exclusions, délais de carence et cotisations.",
          "Une formule avec des garanties élevées sur tous les postes n’est pas forcément la plus adaptée. Priorisez les dépenses prévisibles et le niveau de reste à charge que vous pouvez assumer.",
        ],
      },
      {
        heading: "Décider en tenant compte du coût total",
        paragraphs: [
          "Comparez les cotisations sur la durée et les règles d’évolution tarifaire, pas uniquement le prix annoncé au départ. Vérifiez également les conditions de résiliation et la date de prise d’effet du nouveau contrat avant de mettre fin à l’ancien.",
          "Le dispositif 100 % Santé peut concerner certains équipements optiques, dentaires et auditifs si les conditions prévues sont réunies. Il ne remplace pas l’examen des autres garanties et des dépenses hors panier.",
        ],
      },
    ],
    faqs: [
      {
        question: "Peut-on garder sa mutuelle d’entreprise après le départ à la retraite ?",
        answer:
          "Un maintien peut être proposé dans certaines conditions, notamment dans le cadre de la loi Evin. Les garanties, cotisations et formalités dépendent de votre situation : demandez les informations à l’ancien employeur et à l’assureur.",
      },
      {
        question: "Faut-il choisir une mutuelle senior avant le départ à la retraite ?",
        answer:
          "Il est utile de comparer les solutions avant la date de départ afin de comprendre les garanties et les échéances. Confirmez la date de prise d’effet de toute nouvelle couverture avant la fin de l’ancienne.",
      },
      {
        question: "Quels postes comparer dans une mutuelle retraite ?",
        answer:
          "Examinez vos besoins en hospitalisation, optique, dentaire, audition et soins courants. Comparez aussi les plafonds, exclusions, délais de carence, cotisations et règles d’évolution tarifaire.",
      },
    ],
    relatedLinks: [
      { href: "/mutuelle-sante/mutuelle-retraite", label: "Voir la page mutuelle retraite" },
      { href: "/mutuelle-sante/mutuelle-senior", label: "Comparer les garanties senior" },
      { href: "/comparateur-mutuelle-sante", label: "Demander un devis mutuelle gratuit" },
    ],
  },
];

export function getGuideArticle(category: string, slug: string) {
  return GUIDE_ARTICLES.find(
    (article) => article.category === category && article.slug === slug,
  );
}
