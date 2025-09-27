// src/data/resources/index.js
// Données des ressources pédagogiques

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
  {
    id: 'colle-pcsi-s1-p1',
    subject: 'physics',
    levelKey: 'prepa1',
    typeKey: 'colle',
    duration: '1h',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '/documents/exercices/physics/colle-pcsi-semaine1-planche1.pdf',
    pdfSolution: '/documents/exercices/physics/colle-pcsi-semaine1-planche1-corr.pdf',
    difficulty: 'moyen',
    tags: ['mécanique', 'cinématique', 'colle'],
    createdAt: '2025-09-15',
    title: 'Colle Physique - Mécanique du point',
    description: 'Cinématique et dynamique du point matériel',
    fullDescription: 'Exercices de colle portant sur la cinématique (repères, vitesse, accélération) et la dynamique du point matériel (lois de Newton, énergie cinétique).',
    notes: 'Bien réviser les changements de référentiels et les théorèmes énergétiques.',
    isColle: true,
    colleData: {
      school: 'jean-perrin',
      year: '2025-2026',
      class: 'pcsi',
      week: 1,
      weekDate: '2025-09-15',
      planche: 1,
      teacher: 'Jeremy Luccioni',
      timeSlot: 'Lundi 14h-15h',
      trinomes: [1, 2, 3]
    }
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
  },

  // === RESSOURCES DE TEST (À SUPPRIMER PLUS TARD) ===
  {
    id: 'test1',
    subject: 'maths',
    levelKey: 'terminale',
    typeKey: 'exercise',
    duration: '45 min',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'facile',
    tags: ['algèbre', 'équations'],
    createdAt: '2024-03-01',
    title: 'Exercice d\'algèbre 1',
    description: 'Résolution d\'équations du second degré',
    fullDescription: 'Exercices progressifs sur les équations du second degré avec discriminant.',
    notes: 'Exercice de base pour maîtriser les fondamentaux'
  },
  {
    id: 'test2',
    subject: 'physics',
    levelKey: 'terminale',
    typeKey: 'exercise',
    duration: '50 min',
    hasVideo: true,
    videoUrl: 'dQw4w9WgXcQ',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'moyen',
    tags: ['optique', 'lentilles'],
    createdAt: '2024-03-02',
    title: 'Optique géométrique',
    description: 'Exercices sur les lentilles convergentes',
    fullDescription: 'Étude des lentilles minces et construction d\'images.',
    notes: 'Bien réviser les formules avant de commencer'
  },
  {
    id: 'test3',
    subject: 'chemistry',
    levelKey: 'prepa1',
    typeKey: 'course',
    duration: '90 min',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'moyen',
    tags: ['thermodynamique', 'enthalpie'],
    createdAt: '2024-03-03',
    title: 'Thermodynamique chimique',
    description: 'Cours sur l\'enthalpie et l\'entropie',
    fullDescription: 'Introduction à la thermodynamique chimique avec applications.',
    notes: 'Cours fondamental pour la suite du programme'
  },
  {
    id: 'test4',
    subject: 'maths',
    levelKey: 'prepa1',
    typeKey: 'method',
    duration: '60 min',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'difficile',
    tags: ['analyse', 'séries'],
    createdAt: '2024-03-04',
    title: 'Méthode séries numériques',
    description: 'Techniques de convergence des séries',
    fullDescription: 'Méthodes avancées pour étudier la convergence des séries numériques.',
    notes: 'Nécessite une bonne maîtrise des suites'
  },
  {
    id: 'test5',
    subject: 'physics',
    levelKey: 'prepa2',
    typeKey: 'interro',
    duration: '2h',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'difficile',
    tags: ['électromagnétisme', 'maxwell'],
    createdAt: '2024-03-05',
    title: 'Interrogation électromagnétisme',
    description: 'Équations de Maxwell et applications',
    fullDescription: 'Interrogation complète sur l\'électromagnétisme en régime variable.',
    notes: 'Niveau concours, bien se préparer'
  },
  {
    id: 'test6',
    subject: 'maths',
    levelKey: 'prepa2',
    typeKey: 'exercise',
    duration: '90 min',
    hasVideo: true,
    videoUrl: 'dQw4w9WgXcQ',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'moyen',
    tags: ['probabilités', 'variables aléatoires'],
    createdAt: '2024-03-06',
    title: 'Probabilités avancées',
    description: 'Variables aléatoires continues',
    fullDescription: 'Étude des lois continues classiques et leurs applications.',
    notes: 'Exercices type concours avec corrections détaillées'
  },
  {
    id: 'test7',
    subject: 'chemistry',
    levelKey: 'terminale',
    typeKey: 'exercise',
    duration: '40 min',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'facile',
    tags: ['pH', 'acides', 'bases'],
    createdAt: '2024-03-07',
    title: 'Acides et bases',
    description: 'Calculs de pH en solution aqueuse',
    fullDescription: 'Exercices progressifs sur les calculs de pH.',
    notes: 'Bien connaître les constantes d\'acidité'
  },
  {
    id: 'test8',
    subject: 'physics',
    levelKey: 'prepa1',
    typeKey: 'method',
    duration: '70 min',
    hasVideo: true,
    videoUrl: 'dQw4w9WgXcQ',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'moyen',
    tags: ['mécanique', 'énergétique'],
    createdAt: '2024-03-08',
    title: 'Méthode énergétique',
    description: 'Résolution de problèmes par l\'énergie',
    fullDescription: 'Approche énergétique en mécanique du point et du solide.',
    notes: 'Méthode puissante à bien maîtriser'
  },
  {
    id: 'test9',
    subject: 'maths',
    levelKey: 'terminale',
    typeKey: 'course',
    duration: '100 min',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'facile',
    tags: ['fonctions', 'dérivées'],
    createdAt: '2024-03-09',
    title: 'Dérivation et fonctions',
    description: 'Cours complet sur la dérivation',
    fullDescription: 'Étude complète des fonctions dérivables et applications.',
    notes: 'Cours de base indispensable'
  },
  {
    id: 'test10',
    subject: 'chemistry',
    levelKey: 'prepa2',
    typeKey: 'interro',
    duration: '2h30',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'difficile',
    tags: ['chimie organique', 'synthèse'],
    createdAt: '2024-03-10',
    title: 'Synthèse organique',
    description: 'Interrogation mécanismes réactionnels',
    fullDescription: 'Étude approfondie des mécanismes de chimie organique.',
    notes: 'Interrogation type X-ENS, niveau élevé requis'
  },
  {
    id: 'test11',
    subject: 'physics',
    levelKey: 'terminale',
    typeKey: 'exercise',
    duration: '55 min',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'moyen',
    tags: ['électricité', 'circuits'],
    createdAt: '2024-03-11',
    title: 'Circuits électriques',
    description: 'Analyse de circuits RC et RL',
    fullDescription: 'Exercices sur les circuits électriques en régime transitoire.',
    notes: 'Bien maîtriser les lois de Kirchhoff'
  },
  {
    id: 'test12',
    subject: 'maths',
    levelKey: 'prepa1',
    typeKey: 'exercise',
    duration: '80 min',
    hasVideo: true,
    videoUrl: 'dQw4w9WgXcQ',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'difficile',
    tags: ['algèbre linéaire', 'matrices'],
    createdAt: '2024-03-12',
    title: 'Algèbre linéaire avancée',
    description: 'Diagonalisation et applications',
    fullDescription: 'Étude approfondie de la diagonalisation avec applications.',
    notes: 'Exercices de niveau supérieur avec vidéo explicative'
  },
  {
    id: 'test13',
    subject: 'chemistry',
    levelKey: 'prepa1',
    typeKey: 'method',
    duration: '65 min',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'moyen',
    tags: ['oxydoréduction', 'électrochimie'],
    createdAt: '2024-03-13',
    title: 'Méthode oxydoréduction',
    description: 'Techniques d\'équilibrage redox',
    fullDescription: 'Méthodes systématiques pour équilibrer les équations redox.',
    notes: 'Méthode applicable à tous les exercices du programme'
  },
  {
    id: 'test14',
    subject: 'physics',
    levelKey: 'prepa2',
    typeKey: 'course',
    duration: '120 min',
    hasVideo: true,
    videoUrl: 'dQw4w9WgXcQ',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'difficile',
    tags: ['quantique', 'mécanique ondulatoire'],
    createdAt: '2024-03-14',
    title: 'Introduction à la mécanique quantique',
    description: 'Bases de la mécanique quantique',
    fullDescription: 'Cours complet sur les fondements de la mécanique quantique.',
    notes: 'Cours avancé avec vidéos d\'accompagnement'
  },
  {
    id: 'test15',
    subject: 'maths',
    levelKey: 'prepa2',
    typeKey: 'interro',
    duration: '3h',
    hasVideo: false,
    videoUrl: '',
    pdfStatement: '',
    pdfSolution: '',
    difficulty: 'difficile',
    tags: ['analyse complexe', 'intégrales'],
    createdAt: '2024-03-15',
    title: 'Analyse complexe',
    description: 'Interrogation sur les nombres complexes',
    fullDescription: 'Interrogation complète couvrant l\'analyse dans le plan complexe.',
    notes: 'Interrogation marathon, gérer son temps'
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