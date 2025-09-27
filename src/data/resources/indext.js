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
    pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S2/programme-colle-chimie-s2.pdf",
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
    pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S2/equilibre-phase-gazeuse.pdf",
    pdfSolution: "/documents/exercices/chimie/Colles-PCSI-S2/equilibre-phase-gazeuse-correction.pdf",
    difficulty: "moyen",
    tags: ["équilibre chimique", "gaz parfaits", "pressions partielles", "constante d'équilibre", "N2O4", "NO2", "colle"],
    createdAt: "2025-09-23",
    title: "Équilibre en phase gazeuse - N₂O₄/NO₂",
    description: "Dissociation du tétraoxyde de diazote - Calcul de K° et taux d'avancement",
    fullDescription: "Exercice complet sur la dissociation partielle de N₂O₄(g) = 2NO₂(g). Calcul de l'avancement à partir de la pression finale (0,39 bar), détermination des quantités de matière à l'équilibre, calcul des fractions molaires et pressions partielles. Calcul de la constante d'équilibre K°(298K) = 0,11. Détermination du taux d'avancement τ = 26% (réaction équilibrée). Étude qualitative de l'ajout de NO₂ supplémentaire et prévision du sens d'évolution (sens inverse).",
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
    pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S2/isomerisation-propanone.pdf",
    pdfSolution: "/documents/exercices/chimie/Colles-PCSI-S2/isomerisation-propanone-correction.pdf",
    difficulty: "moyen",
    tags: ["équilibre chimique", "solution aqueuse", "quotient réactionnel", "isomérisation", "cinétique", "bonus", "colle"],
    createdAt: "2025-09-23",
    title: "Isomérisation de la propanone (Bonus)",
    description: "Équilibre chimique en solution - Suivi temporel de la réaction",
    fullDescription: "Exercice bonus sur l'isomérisation de la propanone en propèn-2-ol en solution aqueuse avec suivi temporel. Calcul de l'avancement volumique maximal (xmax = 0,050 mol·L⁻¹). Expression et calcul du quotient de réaction Qr à t = 5,0 min (Qr = 1,3) et t = 10,0 min (Qr = 2,6). Identification de l'état d'équilibre atteint à t ≥ 20 min. Détermination de la constante d'équilibre K° = 3,5 et du taux d'avancement τ = 78%.",
    notes: "Exercice bonus - Excellente synthèse sur les équilibres en solution avec aspect cinétique.",
    isColle: true,
    colleData: {
      school: "jean-perrin",
      year: "2025-2026",
      class: "pcsi",
      week: 2,
      weekDate: "2025-09-22",
      planche: 99,
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
    pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S2/melange-gazeux-equilibre.pdf",
    pdfSolution: "/documents/exercices/chimie/Colles-PCSI-S2/melange-gazeux-equilibre-correction.pdf",
    difficulty: "moyen",
    tags: ["mélange gazeux", "fractions molaires", "pressions partielles", "quotient réactionnel", "SO2", "SO3", "colle"],
    createdAt: "2025-09-23",
    title: "Mélange gazeux et équilibre - SO₂/O₂/SO₃",
    description: "Étude complète d'un mélange gazeux et prévision d'évolution",
    fullDescription: "Exercice en deux parties : Partie 1 - Étude d'un mélange O₂/CH₄ : calcul des quantités de matière (nO₂ = 0,188 mol, nCH₄ = 0,563 mol), fractions molaires (xO₂ = 0,25, xCH₄ = 0,75), pression totale (Ptot = 114 Pa) et pressions partielles. Partie 2 - Réaction 2SO₂ + O₂ = 2SO₃ : expression et calcul de Qr = 16, comparaison avec K° = 2500, prévision du sens d'évolution (sens direct), classification de la réaction (équilibrée) et proposition de moyens pour favoriser SO₃ (augmenter P ou retirer SO₃).",
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
    pdfStatement: "/documents/exercices/chimie/Colles-PCSI-S2/solution-tableau-avancement.pdf",
    pdfSolution: "/documents/exercices/chimie/Colles-PCSI-S2/solution-tableau-avancement-correction.pdf",
    difficulty: "facile",
    tags: ["concentration", "solubilité", "tableau d'avancement", "réactif limitant", "redox", "I2", "thiosulfate", "colle"],
    createdAt: "2025-09-23",
    title: "Solution et tableau d'avancement",
    description: "Glucose et réaction redox I₂/S₂O₃²⁻",
    fullDescription: "Exercice en deux parties : Partie 1 - Concentration d'une solution de glucose (C₆H₁₂O₆) : calcul de M(glucose) = 180 g·mol⁻¹, quantité de matière (0,167 mol), concentration théorique (1,67 mol·L⁻¹), vérification de la solubilité (solution limpide car C < s). Partie 2 - Réaction redox I₂ + 2S₂O₃²⁻ = 2I⁻ + S₄O₆²⁻ : tableau d'avancement volumique, identification du mélange (équimolaire mais pas stœchiométrique), détermination du réactif limitant (S₂O₃²⁻), calcul de xmax = 2,0×10⁻² mol·L⁻¹ et composition finale. Cas avec proportions stœchiométriques.",
    notes: "Planche 3 - Questions de cours T1 et T2. Exercice fondamental sur les tableaux d'avancement.",
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
