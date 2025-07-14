// src/data/resources/index.js
// Données des ressources pédagogiques

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
    createdAt: '2024-01-15'
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
    createdAt: '2024-02-01'
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
    createdAt: '2024-01-20'
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
    createdAt: '2024-02-10'
  }
]

// Fonctions utilitaires pour filtrer et rechercher
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
    resource.id.toLowerCase().includes(searchTerm)
  )
}

export const getResourceById = (id) => {
  return resources.find(resource => resource.id === id)
}

// Statistiques
export const getResourceStats = () => {
  return {
    total: resources.length,
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