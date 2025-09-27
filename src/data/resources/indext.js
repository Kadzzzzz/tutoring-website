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
    notes: "Exercice combinant analyse dimensionnelle et application des lois de la chute libre",
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
    notes: "Exercice classique sur le MRUA avec vérification d'homogénéité",
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
    tags: ["projectile", "cinématique", "chute libre", "colle"],
    createdAt: "2025-09-27",
    title: "Coup franc",
    description: "Trajectoire d'un ballon de football - mouvement parabolique",
    notes: "Exercice de balistique appliquée au football, calcul de trajectoire",
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
    notes: "Exercice sur les différents systèmes de coordonnées et calcul de vitesse/accélération",
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
    tags: ["coordonnées cylindriques", "trajectoire hélicoïdale", "cinématique", "colle"],
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
    title: "Mouvement hélicoïdal (Bonus)",
    description: "Particule chargée dans un champ magnétique - mouvement hélicoïdal",
    notes: "Exercice bonus sur le mouvement hélicoïdal d'une particule chargée",
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
