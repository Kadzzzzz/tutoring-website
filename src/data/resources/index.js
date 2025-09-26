// src/data/resources/index.js
// Données des ressources pédagogiques enrichies avec les textes intégrés

export const resources = [
  // Mathématiques
  {
    id: 'interro0LLG',
    subject: 'maths',
    levelKey: 'prepa2',
    typeKey: 'interro',
    duration: '2h',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '/documents/exercices/maths/Interrogation_0_sujet.pdf',
    pdfSolution: '/documents/exercices/maths/Interrogation_0_correction.pdf',
    difficulty: 'moyen',
    tags: ['analyse', 'intégrales', 'équations différentielles'],
    createdAt: '2024-01-15',
    // Textes intégrés (extraits des traductions)
    title: 'Interrogation 0 PC*',
    description: 'Couvre arithmétique, combinatoire et analyse.',
    fullDescription: 'L\'exercice 1 traite de l\'irrationnalité de ln(3)/ln(2) par une démonstration par l\'absurde.\nL\'exercice 2 développe l\'arithmétique des nombres premiers avec des estimations logarithmiques et aboutit à la preuve de l\'infinité des nombres premiers.\nLes exercices 3 et 5 explorent la combinatoire des ensembles finis : dénombrement de parties avec contraintes, formule de la crosse de hockey, et propriétés des intersections démontrées par récurrence.\nL\'exercice 4 combine analyse et trigonométrie avec des inégalités sur des suites, l\'utilisation de l\'arctangente, et des identités impliquant tan(π/12) = 2 - √3.',
    notes: 'Interrogation de haut niveau nécessitant une excellente maîtrise des techniques fondamentales. L\'exercice est issu de la PC*3 du Lycée Louis-le-Grand.'
  },

  // Physique
  {
    id: 'mechanics',
    subject: 'physics',
    levelKey: 'prepa1',
    typeKey: 'course',
    duration: '120 min',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '/documents/exercices/physics/mechanics-course.pdf',
    pdfSolution: '',
    difficulty: 'facile',
    tags: ['mécanique', 'cinématique', 'dynamique'],
    createdAt: '2024-02-01',
    title: 'Mécanique du point',
    description: 'Cours et exercices sur la cinématique et la dynamique',
    fullDescription: 'Étude complète de la mécanique du point : référentiels, vitesse, accélération, forces et théorèmes de Newton.',
    notes: 'Exercices progressifs avec corrections détaillées'
  },

  // Chimie
  {
    id: 'equilibrium',
    subject: 'chemistry',
    levelKey: 'terminale',
    typeKey: 'exercise',
    duration: '60 min',
    hasVideo: true,
    videoUrl: 'dQw4w9WgXcQ',
    pdfStatement: '/documents/exercices/chemistry/equilibrium-exercise.pdf',
    pdfSolution: '/documents/exercices/chemistry/equilibrium-solution.pdf',
    difficulty: 'facile',
    tags: ['équilibre chimique', 'constante d\'équilibre'],
    createdAt: '2024-01-20',
    title: 'Équilibres chimiques',
    description: 'Constantes d\'équilibre et déplacements',
    fullDescription: 'Étude des équilibres chimiques, calcul des constantes d\'équilibre et loi de Le Chatelier.',
    notes: 'Méthodes de calcul et exemples concrets'
  },
  {
    id: 'kinetics',
    subject: 'chemistry',
    levelKey: 'prepa1',
    typeKey: 'method',
    duration: '75 min',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '/documents/exercices/chemistry/kinetics-method.pdf',
    pdfSolution: '/documents/exercices/chemistry/kinetics-solution.pdf',
    difficulty: 'difficile',
    tags: ['cinétique chimique', 'vitesse de réaction'],
    createdAt: '2024-02-10',
    title: 'Cinétique chimique',
    description: 'Vitesse de réaction et mécanismes',
    fullDescription: 'Étude de la vitesse des réactions chimiques, ordres de réaction et mécanismes réactionnels.',
    notes: 'Approche expérimentale et théorique'
  }
]

// === MÉTADONNÉES DES COLLES (inchangées) ===
export const collesMetadata = {
  schools: [
    {
      id: 'jean-perrin',
      name: 'Lycée Jean Perrin',
      city: 'Lyon'
    }
  ],

  academicYears: [
    {
      id: '2025-2026',
      label: '2025-2026',
      startDate: '2025-09-01',
      endDate: '2026-06-30',
      isCurrent: true
    }
  ],

  classes: [
    {
      id: 'mpsi',
      name: 'MPSI',
      level: 'prepa1',
      subjects: ['physics', 'chemistry', 'maths'],
      description: 'Mathématiques, Physique et Sciences de l\'Ingénieur'
    },
    {
      id: 'pcsi',
      name: 'PCSI',
      level: 'prepa1',
      subjects: ['physics', 'chemistry', 'maths'],
      description: 'Physique, Chimie et Sciences de l\'Ingénieur'
    }
  ],

  // Calendrier des colles pour 2025-2026
  collesCalendar: {
    '2025-2026': {
      weeks: [
        { number: 1, date: '2025-09-15', label: 'Semaine 1' },
        { number: 2, date: '2025-09-22', label: 'Semaine 2' },
        { number: 3, date: '2025-09-29', label: 'Semaine 3' },
        { number: 4, date: '2025-10-06', label: 'Semaine 4' },
        { number: 5, date: '2025-10-13', label: 'Semaine 5' },
        { number: 6, date: '2025-11-03', label: 'Semaine 6' },
        { number: 7, date: '2025-11-10', label: 'Semaine 7' },
        { number: 8, date: '2025-11-14', label: 'Semaine 8' },
        { number: 9, date: '2025-11-24', label: 'Semaine 9' },
        { number: 10, date: '2025-12-01', label: 'Semaine 10' },
        { number: 11, date: '2025-12-08', label: 'Semaine 11' },
        { number: 12, date: '2025-12-15', label: 'Semaine 12' },
        { number: 13, date: '2026-01-05', label: 'Semaine 13' },
        { number: 14, date: '2026-01-12', label: 'Semaine 14' },
        { number: 15, date: '2026-01-19', label: 'Semaine 15' },
        { number: 16, date: '2026-01-26', label: 'Semaine 16' }
      ]
    }
  }
}

// === FONCTIONS UTILITAIRES (inchangées) ===

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

// Nouvelles fonctions pour les colles
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

// Statistiques étendues
export const getResourceStats = () => {
  const colles = getColleResources()
  const regular = resources.filter(r => !r.isColle)

  return {
    total: resources.length,
    regular: regular.length,
    colles: colles.length,
    bySubject: {
      maths: getResourcesBySubject('maths').length,
      physics: getResourcesBySubject('physics').length,
      chemistry: getResourcesBySubject('chemistry').length
    },
    byDifficulty: {
      facile: getResourcesByDifficulty('facile').length,
      moyen: getResourcesByDifficulty('moyen').length,
      difficile: getResourcesByDifficulty('difficile').length
    },
    withVideo: resources.filter(r => r.hasVideo).length
  }
}