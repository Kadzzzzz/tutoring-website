// src/data/resources/index.js
// Données des ressources pédagogiques enrichies avec les textes intégrés

export const resources = [
  {
    id: "interro0LLG",
    subject: "maths",
    levelKey: "prepa2",
    typeKey: "interro",
    duration: "2h",
    hasVideo: false,
    videoUrl: "",
    pdfStatement: "/documents/exercices/maths/Interrogation_0_sujet.pdf",
    pdfSolution: "/documents/exercices/maths/Interrogation_0_correction.pdf",
    difficulty: "difficile",
    tags: ["analyse", "intégrales", "équations différentielles", "arithmétique", "combinatoire"],
    createdAt: "2024-01-15",
    title: "Interrogation 0 PC* - Louis-le-Grand",
    description: "Interrogation de haut niveau en arithmétique, combinatoire et analyse",
    fullDescription: "L'exercice 1 traite de l'irrationnalité de ln(3)/ln(2) par une démonstration par l'absurde. L'exercice 2 développe l'arithmétique des nombres premiers avec des estimations logarithmiques et aboutit à la preuve de l'infinité des nombres premiers. Les exercices 3 et 5 explorent la combinatoire des ensembles finis : dénombrement de parties avec contraintes, formule de la crosse de hockey, et propriétés des intersections démontrées par récurrence. L'exercice 4 combine analyse et trigonométrie avec des inégalités sur des suites, l'utilisation de l'arctangente, et des identités impliquant tan(π/12) = 2 - √3.",
    notes: "Interrogation de haut niveau nécessitant une excellente maîtrise des techniques fondamentales. Issue de la PC*3 du Lycée Louis-le-Grand.",
  },
  {
    id: "ascenseur",
    subject: "physics",
    levelKey: "prepa1",
    typeKey: "exercise",
    duration: "20",
    hasVideo: false,
    videoUrl: "",
    pdfStatement: "/documents/exercices/physique/Colles-MPSI-S2/ascenseur.png",
    pdfSolution: "/documents/exercices/physique/Colles-MPSI-S2/ascenseur_correction.png",
    difficulty: "facile",
    tags: ["PFD", "physique", "ascenseur", "dynamique", "colle"],
    createdAt: "2025-09-27",
    title: "Tension câble ascenseur",
    description: "Application PFD",
    notes: "Application importante du PFD/PFS. Exercice classique à maîtriser ",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "mpsi",
      week: 2,
      weekDate: "2025-09-25",
      planche: 1,
      teacher: "Jeremy Luccioni",
      timeSlot: "Jeudi 17-19",
      trinomes: []
    }
  },
  {
    id: "cascade",
    subject: "physics",
    levelKey: "prepa1",
    typeKey: "exercise",
    duration: "20",
    hasVideo: false,
    videoUrl: "",
    pdfStatement: "/documents/exercices/physique/Colles-MPSI-S2/cascade.png",
    pdfSolution: "/documents/exercices/physique/Colles-MPSI-S2/cascade_correction.png",
    difficulty: "moyen",
    tags: ["analyse dimensionnelle", "chute libre", "cinématique", "colle"],
    createdAt: "2025-09-27",
    title: "Cascade - Épaisseur airbag",
    description: "Détermination épaisseur airbag par analyse dimensionnelle et cinématique",
    fullDescription: "Exercice combinant analyse dimensionnelle et application des lois de la chute libre",
    notes: "Essentiel d'avoir compris la méthode",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "mpsi",
      week: 2,
      weekDate: "2025-09-25",
      planche: 1,
      teacher: "Jeremy Luccioni",
      timeSlot: "Jeudi 17-19",
      trinomes: []
    }
  },
  {
    id: "freinage-voiture",
    subject: "physics",
    levelKey: "prepa1",
    typeKey: "exercise",
    duration: "15",
    hasVideo: false,
    videoUrl: "",
    pdfStatement: "/documents/exercices/physique/Colles-MPSI-S2/freinage-voiture.png",
    pdfSolution: "/documents/exercices/physique/Colles-MPSI-S2/freinage-voiture_correction.png",
    difficulty: "facile",
    tags: ["cinématique", "MRUA", "homogénéité", "colle"],
    createdAt: "2025-09-27",
    title: "Freinage d'une voiture",
    description: "Mouvement rectiligne uniformément décéléré",
    fullDescription: "Exercice classique sur le MRUA avec vérification d'homogénéité",
    notes: "Classique",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "mpsi",
      week: 2,
      weekDate: "2025-09-25",
      planche: 2,
      teacher: "Jeremy Luccioni",
      timeSlot: "Jeudi 17-19",
      trinomes: []
    }
  },
  {
    id: "coup-franc",
    subject: "physics",
    levelKey: "prepa1",
    typeKey: "exercise",
    duration: "25",
    hasVideo: false,
    videoUrl: "",
    pdfStatement: "/documents/exercices/physique/Colles-MPSI-S2/coup-franc.png",
    pdfSolution: "/documents/exercices/physique/Colles-MPSI-S2/coup-franc_correction.png",
    difficulty: "moyen",
    tags: ["projectile", "cinématique", "chute libre", "colle", "foot", "football"],
    createdAt: "2025-09-27",
    title: "Coup franc",
    description: "Trajectoire d'un ballon de football - mouvement parabolique",
    notes: "calcul de trajectoire a bien maîtriser",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "mpsi",
      week: 2,
      weekDate: "2025-09-25",
      planche: 2,
      teacher: "Jeremy Luccioni",
      timeSlot: "Jeudi 17-19",
      trinomes: []
    }
  },
  {
    id: "differents-mouvements",
    subject: "physics",
    levelKey: "prepa1",
    typeKey: "exercise",
    duration: "20",
    hasVideo: false,
    videoUrl: "",
    pdfStatement: "/documents/exercices/physique/Colles-MPSI-S2/differents-mouvements.png",
    pdfSolution: "/documents/exercices/physique/Colles-MPSI-S2/differents-mouvements_correction.png",
    difficulty: "moyen",
    tags: ["coordonnées cartésiennes", "coordonnées polaires", "cinématique", "colle"],
    createdAt: "2025-09-27",
    title: "Différents mouvements",
    description: "Analyse de mouvements en coordonnées cartésiennes et polaires",
    fullDescription: "Exercice sur les différents systèmes de coordonnées et calcul de vitesse/accélération",
    notes: "Vraiment maîtriser cet exercice, c'est la base ",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "mpsi",
      week: 2,
      weekDate: "2025-09-25",
      planche: 3,
      teacher: "Jeremy Luccioni",
      timeSlot: "Jeudi 17-19",
      trinomes: []
    }
  },
  {
    id: "toboggan",
    subject: "physics",
    levelKey: "prepa1",
    typeKey: "exercise",
    duration: "20",
    hasVideo: false,
    videoUrl: "",
    pdfStatement: "/documents/exercices/physique/Colles-MPSI-S2/toboggan.png",
    pdfSolution: "/documents/exercices/physique/Colles-MPSI-S2/toboggan_correction.png",
    difficulty: "moyen",
    tags: ["coordonnées cylindriques", "trajectoire hélicoïdale", "cinématique", "colle", "toboggan"],
    createdAt: "2025-09-27",
    title: "Toboggan",
    description: "Mouvement hélicoïdal en coordonnées cylindriques",
    notes: "Exercice sur la trajectoire hélicoïdale, conversion de coordonnées",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "mpsi",
      week: 2,
      weekDate: "2025-09-25",
      planche: 3,
      teacher: "Jeremy Luccioni",
      timeSlot: "Jeudi 17-19",
      trinomes: []
    }
  },
  {
    id: "mouvement-helicoidal",
    subject: "physics",
    levelKey: "prepa1",
    typeKey: "exercise",
    duration: "15",
    hasVideo: false,
    videoUrl: "",
    pdfStatement: "/documents/exercices/physique/Colles-MPSI-S2/mouvement-helicoidal.png",
    pdfSolution: "/documents/exercices/physique/Colles-MPSI-S2/mouvement-helicoidal_correction.png",
    difficulty: "moyen",
    tags: ["coordonnées cylindriques", "mouvement uniforme", "champ magnétique", "colle"],
    createdAt: "2025-09-27",
    title: "Mouvement hélicoïdal",
    description: "Particule chargée dans un champ magnétique - mouvement hélicoïdal",
    fullDescription: "Exercice bonus de colle sur le mouvement hélicoïdal d'une particule chargée",
    notes: "Faire attention au système de coordonné",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "mpsi",
      week: 2,
      weekDate: "2025-09-25",
      planche: 4,
      teacher: "Jeremy Luccioni",
      timeSlot: "Jeudi 17-19",
      trinomes: []
    }
  },
  {
    id: "programme-colle-chimie-pcsi-s2",
    subject: "chemistry",
    levelKey: "prepa1",
    typeKey: "programme",
    duration: "N/A",
    hasVideo: false,
    videoUrl: "",
    showInResourcesPage: false,
    pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S2/Programme.pdf",
    pdfSolution: "",
    difficulty: "N/A",
    tags: ["programme", "questions de cours", "T1", "T2", "thermodynamique", "colle"],
    createdAt: "2025-09-23",
    title: "Programme de colle Chimie PCSI S2",
    description: "Questions de cours T1 et T2 - Semaine du 22 septembre",
    fullDescription: "Programme de colle incluant 10 questions de cours réparties sur deux chapitres : T1 (Description d'un système physique) avec 5 questions sur les grandeurs d'état, systèmes thermodynamiques, loi des gaz parfaits, fractions molaires et états de la matière. T2 (Étude thermodynamique des transformations chimiques) avec 5 questions sur les activités chimiques, quotient de réaction, tableau d'avancement, loi d'action des masses et prévision du sens d'évolution.",
    notes: "Programme de la semaine du 22 septembre. À connaître pour les colles.",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "pcsi",
      week: 2,
      weekDate: "2025-09-22",
      planche: 0,
      teacher: "Jeremy Luccioni",
      timeSlot: "Semaine du 22 septembre",
      trinomes: []
    }
  },
  {
    id: "equilibre-phase-gazeuse-pcsi",
    subject: "chemistry",
    levelKey: "prepa1",
    typeKey: "exercise",
    duration: "25",
    hasVideo: false,
    videoUrl: "",
    pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S2/Eq-PhaseGaz.pdf",
    pdfSolution: "/documents/exercices/chimie/Colles-PCSI-S2/Eq-PhaseGaz_correction.pdf",
    difficulty: "moyen",
    tags: ["équilibre chimique", "gaz parfaits", "pressions partielles", "constante d'équilibre", "N2O4", "NO2", "colle"],
    createdAt: "2025-09-23",
    title: "Équilibre en phase gazeuse - N₂O₄/NO₂",
    description: "Dissociation du tétraoxyde de diazote - Calcul de K° et taux d'avancement",
    fullDescription: "Exercice complet sur la dissociation partielle de N₂O₄(g) = 2NO₂(g). Calcul de l'avancement à partir de la pression finale, détermination des quantités de matière à l'équilibre, calcul des fractions molaires et pressions partielles. Calcul de la constante d'équilibre K°(298K). Détermination du taux d'avancement τ (réaction équilibrée). Étude qualitative de l'ajout de NO₂ supplémentaire et prévision du sens d'évolution.",
    notes: "Planche 1 - Questions de cours T1 et T2. Exercice fondamental sur les équilibres gazeux.",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "pcsi",
      week: 2,
      weekDate: "2025-09-22",
      planche: 1,
      teacher: "Jeremy Luccioni",
      timeSlot: "Semaine du 22 septembre",
      trinomes: []
    }
  },
  {
    id: "isomerisation-propanone-pcsi",
    subject: "chemistry",
    levelKey: "prepa1",
    typeKey: "exercise",
    duration: "20",
    hasVideo: false,
    videoUrl: "",
    pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S2/Isomerisation-propanone.pdf",
    pdfSolution: "/documents/exercices/chimie/Colles-PCSI-S2/Isomerisation-propanone_correction.pdf",
    difficulty: "moyen",
    tags: ["équilibre chimique", "solution aqueuse", "quotient réactionnel", "isomérisation", "cinétique", "bonus", "colle"],
    createdAt: "2025-09-23",
    title: "Isomérisation de la propanone",
    description: "Équilibre chimique en solution - Suivi temporel de la réaction",
    fullDescription: "Exercice sur l'isomérisation de la propanone en propèn-2-ol en solution aqueuse avec suivi temporel. Calcul de l'avancement volumique maximal, expression et calcul du quotient de réaction Qr , identification de l'état d'équilibre , détermination de la constante d'équilibre K° et du taux d'avancement τ",
    notes: "Synthèse sur les équilibres en solution avec aspect cinétique.",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "pcsi",
      week: 2,
      weekDate: "2025-09-22",
      planche: 4,
      teacher: "Jeremy Luccioni",
      timeSlot: "Semaine du 22 septembre",
      trinomes: []
    }
  },
  {
    id: "melange-gazeux-equilibre-pcsi",
    subject: "chemistry",
    levelKey: "prepa1",
    typeKey: "exercise",
    duration: "30",
    hasVideo: false,
    videoUrl: "",
    pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S2/MélangeGaz-EqChimique.pdf",
    pdfSolution: "/documents/exercices/chimie/Colles-PCSI-S2/MélangeGaz-EqChimique_correction.pdf",
    difficulty: "moyen",
    tags: ["mélange gazeux", "fractions molaires", "pressions partielles", "quotient réactionnel", "SO2", "SO3", "colle"],
    createdAt: "2025-09-23",
    title: "Mélange gazeux et équilibre - SO₂/O₂/SO₃",
    description: "Étude complète d'un mélange gazeux et prévision d'évolution",
    fullDescription: "Exercice en deux parties : Partie 1 - Étude d'un mélange O₂/CH₄ : calcul des quantités de matière, fractions molaires, pression totale, et pressions partielles. Partie 2 - Réaction 2SO₂ + O₂ = 2SO₃ : expression et calcul de Qr, comparaison avec K°, prévision du sens d'évolution, classification de la réaction et proposition de moyens pour favoriser SO₃.",
    notes: "Planche 2 - Questions de cours T1 et T2. Exercice complet combinant mélanges et équilibres.",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "pcsi",
      week: 2,
      weekDate: "2025-09-22",
      planche: 2,
      teacher: "Jeremy Luccioni",
      timeSlot: "Semaine du 22 septembre",
      trinomes: []
    }
  },
  {
    id: "solution-tableau-avancement-pcsi",
    subject: "chemistry",
    levelKey: "prepa1",
    typeKey: "exercise",
    duration: "30",
    hasVideo: false,
    videoUrl: "",
    pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S2/Solution-TableauAvancement.pdf",
    pdfSolution: "/documents/exercices/chimie/Colles-PCSI-S2/Solution-TableauAvancement_correction.pdf",
    difficulty: "facile",
    tags: ["concentration", "solubilité", "tableau d'avancement", "réactif limitant", "redox", "I2", "thiosulfate", "colle"],
    createdAt: "2025-09-23",
    title: "Solution et tableau d'avancement",
    description: "Glucose et réaction redox I₂/S₂O₃²⁻",
    fullDescription: "Exercice en deux parties : Partie 1 - Concentration d'une solution de glucose (C₆H₁₂O₆) : calcul de M(glucose), quantité de matière, concentration théorique, vérification de la solubilité. Partie 2 - Réaction redox I₂ + 2S₂O₃²⁻ = 2I⁻ + S₄O₆²⁻ : tableau d'avancement volumique, identification du mélange , détermination du réactif limitant, calcul de xmax et composition finale.",
    notes: "Planche 3 - Questions de cours T1 et T2. Exercice fondamental",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "pcsi",
      week: 2,
      weekDate: "2025-09-22",
      planche: 3,
      teacher: "Jeremy Luccioni",
      timeSlot: "Semaine du 22 septembre",
      trinomes: []
    }
  },

    {
  id: "programme-colle-chimie-pcsi-s3",
  subject: "chemistry",
  levelKey: "prepa1",
  typeKey: "programme",
  duration: "N/A",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S3/Programme.pdf",
  showInResourcesPage: false,
  pdfSolution: "",
  difficulty: "N/A",
  tags: ["programme", "questions de cours", "T1", "T2", "TP1", "thermodynamique", "Beer-Lambert", "dosage", "colle"],
  createdAt: "2025-09-30",
  title: "Programme de colle Chimie PCSI S3",
  description: "Questions de cours T1, T2 et TP1 - Semaine du 30 septembre",
  fullDescription: "Programme de colle incluant 12 questions de cours réparties sur trois chapitres : T1 (Description d'un système physique) avec 5 questions sur les grandeurs d'état, systèmes thermodynamiques, loi des gaz parfaits, fractions molaires et états de la matière. T2 (Étude d'une réaction chimique) avec 5 questions sur les activités chimiques, quotient de réaction, tableau d'avancement, loi d'action des masses et prévision du sens d'évolution. TP1 (Dosages par étalonnage) avec 2 questions sur la loi de Beer-Lambert et le dosage spectrophotométrique.",
  notes: "Programme de la semaine du 30 septembre au 4 octobre. À connaître pour les colles.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "pcsi",
    week: 3,
    weekDate: "2025-09-30",
    planche: 0,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 30 septembre",
    trinomes: []
  }
},
{
  id: "equilibre-n2o4-no2-pcsi-s3",
  subject: "chemistry",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "45",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S3/Planche1.pdf",
  pdfSolution: "/documents/exercices/chimie/Colles-PCSI-S3/Planche1_Correction.pdf",
  difficulty: "moyen",
  tags: ["équilibre chimique", "gaz parfaits", "N2O4", "NO2", "pressions partielles", "constante d'équilibre", "perturbation équilibre", "Le Chatelier", "colle"],
  createdAt: "2025-09-30",
  title: "Équilibre gazeux et analyse d'un mélange - N₂O₄/NO₂",
  description: "Dissociation du tétraoxyde de diazote - Analyse complète de l'équilibre",
  fullDescription: "Exercice complet sur l'équilibre de dissociation N₂O₄(g) = 2NO₂(g). Partie 1 : Calcul de la pression initiale, expression de la quantité totale en fonction de l'avancement. Partie 2 : Détermination de l'avancement à l'équilibre à partir de la pression finale, calcul des quantités de matière, fractions molaires, pressions partielles, constante d'équilibre K° et taux d'avancement. Partie 3 : Étude des perturbations de l'équilibre - ajout de NO₂ et effet de la compression (principe de Le Chatelier).",
  notes: "Planche 1 - Questions de cours T1 et T2. Exercice fondamental sur les équilibres gazeux avec étude des perturbations.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "pcsi",
    week: 3,
    weekDate: "2025-09-30",
    planche: 1,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 30 septembre",
    trinomes: []
  }
},
{
  id: "dosage-spectro-complexation-pcsi-s3",
  subject: "chemistry",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "45",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S3/Planche2.pdf",
  pdfSolution: "/documents/exercices/chimie/Colles-PCSI-S3/Planche2_Correction.pdf",
  difficulty: "moyen",
  tags: ["spectrophotométrie", "Beer-Lambert", "dosage", "complexation", "Fe2+", "équilibre chimique", "courbe étalonnage", "colle"],
  createdAt: "2025-09-30",
  title: "Dosage spectrophotométrique et équilibre de complexation",
  description: "Dosage des ions Fe²⁺ et formation d'un complexe [FeL₃]²⁺",
  fullDescription: "Exercice en deux parties. Partie 1 : Étalonnage spectrophotométrique - vérification de la loi de Beer-Lambert, tracé de la courbe d'étalonnage, détermination du coefficient d'absorption molaire ε, dosage d'une solution inconnue. Partie 2 : Réaction de complexation Fe²⁺ + 3L = [FeL₃]²⁺ - calcul des concentrations initiales après dilution, tableau d'avancement volumique, expressions de Qr et K°, calcul de l'avancement à l'équilibre, détermination de K° et proposition de méthodes pour favoriser la formation du complexe.",
  notes: "Planche 2 - Questions de cours TP1 et T2. Exercice combinant dosage spectrophotométrique et équilibre de complexation.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "pcsi",
    week: 3,
    weekDate: "2025-09-30",
    planche: 2,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 30 septembre",
    trinomes: []
  }
},
{
  id: "melange-gazeux-so2-so3-pcsi-s3",
  subject: "chemistry",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "45",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S3/Planche3.pdf",
  pdfSolution: "/documents/exercices/chimie/Colles-PCSI-S3/Planche3_Correction.pdf",
  difficulty: "moyen",
  tags: ["mélange gazeux", "fractions molaires", "fractions massiques", "équilibre chimique", "SO2", "SO3", "synthèse industrielle", "loi de Dalton", "colle"],
  createdAt: "2025-09-30",
  title: "Mélange gazeux industriel et équilibre - SO₂/O₂/SO₃",
  description: "Caractérisation d'un mélange et synthèse du trioxyde de soufre",
  fullDescription: "Exercice en deux parties. Partie 1 : Caractérisation d'un mélange O₂/CH₄ - calcul des quantités de matière, fractions molaires et massiques, pression totale et pressions partielles, vérification de la loi de Dalton. Partie 2 : Équilibre de synthèse 2SO₂ + O₂ = 2SO₃ - tableau d'avancement, expression du quotient réactionnel, vérification des proportions stœchiométriques, calcul de l'avancement à partir d'une pression partielle mesurée, détermination de toutes les grandeurs à l'équilibre, vérification de l'équilibre, calcul du taux d'avancement, proposition de moyens pour augmenter le rendement.",
  notes: "Planche 3 - Questions de cours T1 et T2. Exercice complet sur les mélanges gazeux et équilibres industriels.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "pcsi",
    week: 3,
    weekDate: "2025-09-30",
    planche: 3,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 30 septembre",
    trinomes: []
  }
},
{
  id: "test-alcoolemie-bonus-pcsi-s3",
  subject: "chemistry",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "30",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S3/Planche4.pdf",
  pdfSolution: "/documents/exercices/chimie/Colles-PCSI-S3/Planche4_Correction.pdf",
  difficulty: "difficile",
  tags: ["équilibre liquide-gaz", "éthanol", "alcoolémie", "constante équilibre", "application pratique", "bonus", "colle"],
  createdAt: "2025-09-30",
  title: "Test d'alcoolémie - Application de l'équilibre",
  description: "Relation entre éthanol dans l'air expiré et concentration sanguine",
  fullDescription: "Exercice d'application pratique sur l'équilibre EtOH(aq) = EtOH(g). À partir d'une mesure d'éthanol dans l'air expiré, détermination de la concentration dans le sang. Rappel des activités chimiques, expression de K°, calcul numérique de K° à 37°C à partir d'une loi logarithmique, calcul de la pression partielle d'éthanol, établissement d'une relation entre concentration sanguine et masse d'éthanol dans l'air, application numérique pour déterminer si l'automobiliste peut conduire.",
  notes: "Exercice bonus. Application concrète des équilibres chimiques. Exercice plus difficile nécessitant rigueur et manipulation d'expressions complexes.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "pcsi",
    week: 3,
    weekDate: "2025-09-30",
    planche: 4,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 30 septembre",
    trinomes: []
  }
},

{
  id: "programme-colle-physique-mpsi-s1",
  subject: "physics",
  levelKey: "prepa1",
  typeKey: "programme",
  duration: "N/A",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/physique/Colles-MPSI-S1/programme.pdf",
  showInResourcesPage: false,
  pdfSolution: "",
  difficulty: "N/A",
  tags: ["programme", "questions de cours", "P0", "P1", "grandeurs physiques", "cinématique", "colle"],
  createdAt: "2025-09-15",
  title: "Programme de colle Physique MPSI S1",
  description: "Questions de cours P0 et P1 - Semaine du 15 septembre",
  fullDescription: "Programme de colle incluant 10 questions de cours réparties sur deux chapitres : P0 (Grandeurs physiques) avec 3 questions sur la définition d'une grandeur physique, les dimensions et l'homogénéité, et les chiffres significatifs. P1 (Cinématique du point) avec 7 questions sur les référentiels, les systèmes de coordonnées, les vecteurs position/vitesse/accélération, et le mouvement à accélération constante.",
  notes: "Programme de la semaine du 15 septembre. À connaître pour les colles.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi",
    week: 1,
    weekDate: "2025-09-15",
    planche: 0,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 15 septembre",
    trinomes: []
  }
},

// ===== PLANCHE 1 MPSI S1 =====
{
  id: "analyse-dim-pendule-mpsi-s1",
  subject: "physics",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "10",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/physique/Colles-MPSI-S1/P1.pdf",
  pdfSolution: "",
  difficulty: "facile",
  tags: ["analyse dimensionnelle", "pendule", "période", "colle"],
  createdAt: "2025-09-15",
  title: "Analyse dimensionnelle - Pendule",
  description: "Détermination de la période d'un pendule par analyse dimensionnelle",
  fullDescription: "À l'aide de l'analyse dimensionnelle, déterminer la période d'un pendule de masse m et de longueur l placé dans le champ de pesanteur g.",
  notes: "Exercice P0 - Questions de cours P0 et P1. Exercice fondamental d'analyse dimensionnelle.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi",
    week: 1,
    weekDate: "2025-09-15",
    planche: 1,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 15 septembre",
    trinomes: []
  }
},
{
  id: "mouvement-helicoidal-mpsi-s1",
  subject: "physics",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "25",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/physique/Colles-MPSI-S1/P1.pdf",
  pdfSolution: "",
  difficulty: "moyen",
  tags: ["coordonnées cylindriques", "mouvement hélicoïdal", "particule chargée", "champ magnétique", "vitesse", "accélération", "colle"],
  createdAt: "2025-09-15",
  title: "Mouvement hélicoïdal d'une particule",
  description: "Particule chargée dans un champ magnétique - coordonnées cylindriques",
  fullDescription: "Dans un référentiel R, les coordonnées cylindriques d'une particule chargée M dans un champ magnétique uniforme sont données par r = R₀, θ = ωt et z = (h/(2π))ωt. Déterminer vitesse et accélération en base locale, montrer que le mouvement est uniforme, et exprimer tan α où α est l'angle entre la vitesse et l'axe z.",
  notes: "Exercice P1 - Questions de cours P0 et P1. Exercice important sur les coordonnées cylindriques.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi",
    week: 1,
    weekDate: "2025-09-15",
    planche: 1,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 15 septembre",
    trinomes: []
  }
},

// ===== PLANCHE 2 MPSI S1 =====
{
  id: "analyse-dim-force-helice-mpsi-s1",
  subject: "physics",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "10",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/physique/Colles-MPSI-S1/P2.pdf",
  pdfSolution: "",
  difficulty: "facile",
  tags: ["analyse dimensionnelle", "force", "hélice", "fluide", "colle"],
  createdAt: "2025-09-15",
  title: "Analyse dimensionnelle - Force sur une hélice",
  description: "Détermination de l'expression d'une force en fonction de μ, S et v",
  fullDescription: "Déterminer l'expression de la force F exercée par une hélice sur le fluide dans lequel elle se déplace sachant qu'elle dépend de la masse volumique du fluide μ, de l'aire balayée par l'hélice S et de la vitesse relative v.",
  notes: "Exercice P0 - Questions de cours P0 et P1. Application de l'analyse dimensionnelle.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi",
    week: 1,
    weekDate: "2025-09-15",
    planche: 2,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 15 septembre",
    trinomes: []
  }
},
{
  id: "risque-collision-freinage-mpsi-s1",
  subject: "physics",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "30",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/physique/Colles-MPSI-S1/P2.pdf",
  pdfSolution: "",
  difficulty: "moyen",
  tags: ["cinématique", "MRUA", "freinage", "sécurité routière", "temps de réaction", "colle"],
  createdAt: "2025-09-15",
  title: "Risque de collision au freinage",
  description: "Distance d'arrêt et condition pour éviter une collision",
  fullDescription: "Partie 1 : Une voiture roule à vitesse constante puis freine après un temps de réaction. Calculer l'instant d'arrêt et la distance parcourue pour V₁ = 54 km/h puis 108 km/h. Partie 2 : Deux voitures se suivent à distance d. Déterminer la condition sur d pour éviter la collision sachant que la seconde voiture a un temps de réaction ε et une décélération plus faible.",
  notes: "Exercice P1 - Questions de cours P0 et P1. Exercice classique de cinématique avec application à la sécurité routière.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi",
    week: 1,
    weekDate: "2025-09-15",
    planche: 2,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 15 septembre",
    trinomes: []
  }
},

// ===== PLANCHE 3 MPSI S1 =====
{
  id: "analyse-dim-systeme-mecanique-mpsi-s1",
  subject: "physics",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "15",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/physique/Colles-MPSI-S1/P3.pdf",
  pdfSolution: "",
  difficulty: "moyen",
  tags: ["analyse dimensionnelle", "homogénéité", "équation différentielle", "ressort", "frottement", "colle"],
  createdAt: "2025-09-15",
  title: "Analyse dimensionnelle - Système mécanique",
  description: "Vérification de l'homogénéité d'une équation différentielle",
  fullDescription: "Analyse de l'équation différentielle dv/dt + (λ/m)v = (kl/m)cos(2α/m) où λ est lié aux frottements, k est la constante de raideur d'un ressort, l son allongement, et α un angle. Analyser la dimension de chaque terme et vérifier l'homogénéité.",
  notes: "Exercice P0 - Questions de cours P0 et P1. Important pour comprendre l'homogénéité des équations.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi",
    week: 1,
    weekDate: "2025-09-15",
    planche: 3,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 15 septembre",
    trinomes: []
  }
},
{
  id: "trajectoire-cycloidale-mpsi-s1",
  subject: "physics",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "35",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/physique/Colles-MPSI-S1/P3.pdf",
  pdfSolution: "",
  difficulty: "difficile",
  tags: ["cycloïde", "trajectoire", "vélo", "coordonnées cartésiennes", "vitesse", "accélération", "longueur d'arc", "colle"],
  createdAt: "2025-09-15",
  title: "Trajectoire cycloïdale",
  description: "Étude du mouvement d'un point sur une roue de vélo",
  fullDescription: "Étude complète de la trajectoire d'un point M à la périphérie d'une roue de vélo de rayon R roulant sans glisser. Exprimer les vecteurs position, calculer les coordonnées de M en fonction de l'angle θ, déterminer vitesse et accélération, et calculer la longueur d'un arc de cycloïde.",
  notes: "Exercice P1 - Questions de cours P0 et P1. Exercice avancé nécessitant une bonne maîtrise de la cinématique.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi",
    week: 1,
    weekDate: "2025-09-15",
    planche: 3,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 15 septembre",
    trinomes: []
  }
},

// ===== SEMAINE 3 MPSI - Programme de colle =====
{
  id: "programme-colle-physique-mpsi-s3",
  subject: "physics",
  levelKey: "prepa1",
  typeKey: "programme",
  duration: "N/A",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/physique/Colles-MPSI-S3/programme.pdf",
  showInResourcesPage: false,
  pdfSolution: "",
  difficulty: "N/A",
  tags: ["programme", "questions de cours", "P2", "P3", "lois de Newton", "oscillateurs", "colle"],
  createdAt: "2025-09-29",
  title: "Programme de colle Physique MPSI S3",
  description: "Questions de cours P2 et P3 - Semaine du 29 septembre",
  fullDescription: "Programme de colle incluant 10 questions de cours réparties sur deux chapitres : P2 (Lois de Newton) avec 6 questions sur la quantité de mouvement, les trois lois de Newton, les référentiels galiléens, et la chute libre. P3 (Oscillateurs mécaniques) avec 4 questions sur l'oscillateur harmonique, les solutions temporelles, le système masse-ressort et le pendule simple.",
  notes: "Programme de la semaine du 29 septembre. À connaître pour les colles.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi",
    week: 3,
    weekDate: "2025-09-29",
    planche: 0,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 29 septembre",
    trinomes: []
  }
},

// ===== PLANCHE 1 MPSI S3 =====
{
  id: "masse-ressort-decollement-mpsi-s3",
  subject: "physics",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "50",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/physique/Colles-MPSI-S3/P1.pdf",
  pdfSolution: "",
  difficulty: "difficile",
  tags: ["oscillateur", "décollement", "référentiel tournant", "force d'inertie", "bifurcation", "équilibre", "stabilité", "colle"],
  createdAt: "2025-09-29",
  title: "Masse accrochée à un ressort - Oscillations avec décollement",
  description: "Anneau sur support circulaire tournant - Équilibre, stabilité et décollement",
  fullDescription: "Exercice avancé sur un anneau de masse m sur un support circulaire de rayon r tournant à vitesse angulaire ω constante. Partie A : Établir l'équation différentielle du mouvement dans le référentiel tournant, déterminer les positions d'équilibre θₑ et leur stabilité selon ω, identifier la valeur critique ωc de bifurcation. Partie B : Étudier la condition de décollement en établissant l'expression de la réaction normale N(θ), déterminer ωmin pour que l'anneau reste toujours en contact, et calculer l'angle de décollement θd pour ω = ωmin/2.",
  notes: "Questions de cours P3. Exercice de niveau élevé combinant dynamique en référentiel non galiléen, étude de bifurcation et conditions de décollement.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi",
    week: 3,
    weekDate: "2025-09-29",
    planche: 1,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 29 septembre",
    trinomes: []
  }
},

// ===== PLANCHE 2 MPSI S3 =====
{
  id: "coup-franc-frottements-mpsi-s3",
  subject: "physics",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "45",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/physique/Colles-MPSI-S3/P2.pdf",
  pdfSolution: "",
  difficulty: "moyen",
  tags: ["projectile", "frottements", "football", "trajectoire", "loi de Newton", "équation différentielle", "colle"],
  createdAt: "2025-09-29",
  title: "Coup franc avec frottements",
  description: "Étude d'un tir de football avec et sans frottements de l'air",
  fullDescription: "Exercice complet sur un coup franc de football tiré à 20 m du but (h = 2,44 m) avec un mur à 9,15 m. Ballon de masse m = 430 g lancé avec v₀ = 20 m/s à α = 20° de l'horizontale. Partie 1 (sans frottements) : Appliquer la 2ème loi de Newton, établir les lois horaires et l'équation de trajectoire, vérifier si le ballon passe le mur et si le tir est cadré. Partie 2 (avec frottements F = -h⃗v avec h = 5,0×10⁻³ kg·s⁻¹) : Déterminer les équations horaires avec la constante τ = m/h, établir l'équation de trajectoire, analyser l'influence des frottements sur la trajectoire.",
  notes: "Questions de cours P3. Exercice important combinant lois de Newton et résolution d'équations différentielles avec conditions réelles.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi",
    week: 3,
    weekDate: "2025-09-29",
    planche: 2,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 29 septembre",
    trinomes: []
  }
},

// ===== PLANCHE 3 MPSI S3 =====
{
  id: "oscillateur-vertical-rupture-mpsi-s3",
  subject: "physics",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "50",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/physique/Colles-MPSI-S3/P3.pdf",
  pdfSolution: "",
  difficulty: "difficile",
  tags: ["oscillateur", "ressort vertical", "rupture", "énergie mécanique", "équation différentielle", "conservation", "colle"],
  createdAt: "2025-09-29",
  title: "Oscillateur vertical avec rupture",
  description: "Masse suspendue à un ressort vertical - Oscillations, rupture et analyse énergétique",
  fullDescription: "Exercice complet sur une masse m = 0,5 kg suspendue à un ressort vertical (k = 50 N/m, ℓ₀ = 20 cm). Partie A : Déterminer la position d'équilibre ze, établir l'équation différentielle en posant Z = z - ze, identifier ω₀, et résoudre pour A = 5 cm. Partie B : Le ressort supporte Tmax = 30 N. Déterminer l'amplitude maximale Amax avant rupture, calculer l'instant tr et la position zr de rupture, établir l'équation du mouvement après rupture et déterminer l'altitude maximale zmax. Partie C : Analyse énergétique avant/après rupture et calcul de l'énergie dissipée lors de la rupture.",
  notes: "Questions de cours P3. Exercice avancé combinant oscillateur harmonique, dynamique après rupture et conservation de l'énergie.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi",
    week: 3,
    weekDate: "2025-09-29",
    planche: 3,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 29 septembre",
    trinomes: []
  }
},

// ===== PLANCHE BONUS MPSI S3 =====
{
  id: "skateur-rampe-decollement-mpsi-s3",
  subject: "physics",
  levelKey: "prepa1",
  typeKey: "exercise",
  duration: "60",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/physique/Colles-MPSI-S3/P4.pdf",
  pdfSolution: "",
  difficulty: "difficile",
  tags: ["mécanique", "décollement", "rampe circulaire", "énergie mécanique", "intégrale première", "trajectoire", "bonus", "colle"],
  createdAt: "2025-09-29",
  title: "Skateur sur une rampe circulaire avec décollement",
  description: "Étude complète du mouvement d'un skateur sur rampe circulaire",
  fullDescription: "Exercice bonus très complet sur un skateur (masse m) descendant l'intérieur d'une rampe circulaire de rayon R avec vitesse initiale horizontale v₀. Partie 1 : Établir l'équation différentielle du mouvement, utiliser le théorème de l'énergie mécanique pour obtenir l'intégrale première, exprimer v²(θ). Partie 2 : Déterminer la réaction normale N(θ), établir la condition sur v₀ pour contact permanent, calculer l'angle de décollement θd pour v₀ = 0 et pour v₀ = √(gR). Partie 3 : Déterminer les composantes de vitesse au décollement, établir les équations paramétriques de la trajectoire après décollement, analyser si le skateur retombe sur la rampe (h = 2R). Partie 4 : Tracer N(θ) pour différentes valeurs de v₀/√(gR) et analyser l'énergie au décollement.",
  notes: "Exercice bonus très difficile nécessitant une excellente maîtrise de la mécanique, des intégrales premières et de l'analyse énergétique.",
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi",
    week: 3,
    weekDate: "2025-09-29",
    planche: 4,
    teacher: "Jeremy Luccioni",
    timeSlot: "Semaine du 29 septembre",
    trinomes: []
  }
}

]

// === MÉTADONNÉES DES COLLES ===
export const collesMetadata = {
  schools: [
    {
      id: "jean-perrin",
      name: "Lycée Jean Perrin",
      city: "Lyon"
    }
  ],

  academicYears: [
    {
      id: "2025-2026",
      label: "2025-2026",
      startDate: "2025-09-01",
      endDate: "2026-06-30",
      isCurrent: true
    }
  ],

  classes: [
    {
      id: "mpsi",
      name: "MPSI",
      level: "prepa1",
      subjects: ["physics", "chemistry", "maths"],
      description: "Mathématiques, Physique et Sciences de l'Ingénieur"
    },
    {
      id: "pcsi",
      name: "PCSI",
      level: "prepa1",
      subjects: ["physics", "chemistry", "maths"],
      description: "Physique, Chimie et Sciences de l'Ingénieur"
    }
  ],

  collesCalendar: {
    "2025-2026": {
      weeks: [
        { number: 1, date: "2025-09-15", label: "Semaine 1" },
        { number: 2, date: "2025-09-22", label: "Semaine 2" },
        { number: 3, date: "2025-09-29", label: "Semaine 3" },
        { number: 4, date: "2025-10-06", label: "Semaine 4" },
        { number: 5, date: "2025-10-13", label: "Semaine 5" },
        { number: 6, date: "2025-11-03", label: "Semaine 6" },
        { number: 7, date: "2025-11-10", label: "Semaine 7" },
        { number: 8, date: "2025-11-14", label: "Semaine 8" },
        { number: 9, date: "2025-11-24", label: "Semaine 9" },
        { number: 10, date: "2025-12-01", label: "Semaine 10" },
        { number: 11, date: "2025-12-08", label: "Semaine 11" },
        { number: 12, date: "2025-12-15", label: "Semaine 12" },
        { number: 13, date: "2026-01-05", label: "Semaine 13" },
        { number: 14, date: "2026-01-12", label: "Semaine 14" },
        { number: 15, date: "2026-01-19", label: "Semaine 15" },
        { number: 16, date: "2026-01-26", label: "Semaine 16" }
      ]
    }
  }
}

// === FONCTIONS UTILITAIRES ===

export const getResourcesBySubject = (subject) => {
  return resources.filter(resource => resource.subject === subject)
}

export const getResourcesByLevel = (levelKey) => {
  return resources.filter(resource => resource.levelKey === levelKey)
}

export const getResourcesByType = (typeKey) => {
  return resources.filter(resource => resource.typeKey === typeKey)
}

export const getResourcesByDifficulty = (difficulty) => {
  return resources.filter(resource => resource.difficulty === difficulty)
}

export const searchResources = (query) => {
  const searchTerm = query.toLowerCase()
  return resources.filter(resource =>
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    resource.id.toLowerCase().includes(searchTerm) ||
    resource.title.toLowerCase().includes(searchTerm) ||
    resource.description.toLowerCase().includes(searchTerm)
  )
}

export const getResourceById = (id) => {
  return resources.find(resource => resource.id === id)
}

export const getColleResources = () => {
  return resources.filter(resource => resource.isColle === true)
}

export const getCollesBySchoolAndYear = (school, year) => {
  return getColleResources().filter(resource =>
    resource.colleData?.school === school &&
    resource.colleData?.year === year
  )
}

export const getCollesByWeek = (school, year, week) => {
  return getCollesBySchoolAndYear(school, year).filter(resource =>
    resource.colleData?.week === week
  )
}

export const getCollesByClass = (school, year, className) => {
  return getCollesBySchoolAndYear(school, year).filter(resource =>
    resource.colleData?.class === className
  )
}

export const getWeeksWithColles = (school, year, className = null) => {
  const colles = className ?
    getCollesByClass(school, year, className) :
    getCollesBySchoolAndYear(school, year)

  const weeks = [...new Set(colles.map(c => c.colleData?.week))].sort()
  return weeks.map(week => {
    const weekData = collesMetadata.collesCalendar[year]?.weeks.find(w => w.number === week)
    return {
      number: week,
      date: weekData?.date,
      label: weekData?.label,
      hasColles: true
    }
  })
}

export const getResourceStats = () => {
  const colles = getColleResources()
  const regular = resources.filter(r => !r.isColle)

  return {
    total: resources.length,
    regular: regular.length,
    colles: colles.length,
    bySubject: {
      maths: getResourcesBySubject("maths").length,
      physics: getResourcesBySubject("physics").length,
      chemistry: getResourcesBySubject("chemistry").length
    },
    byDifficulty: {
      facile: getResourcesByDifficulty("facile").length,
      moyen: getResourcesByDifficulty("moyen").length,
      difficile: getResourcesByDifficulty("difficile").length
    },
    withVideo: resources.filter(r => r.hasVideo).length
  }
}
