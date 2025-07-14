// src/data/subjects/index.js
// Configuration des matières et niveaux

export const subjects = [
  {
    key: 'maths',
    name: 'Mathématiques',
    icon: 'fas fa-calculator',
    enabled: true,
    color: '#3498db'
  },
  {
    key: 'physics',
    name: 'Physique',
    icon: 'fas fa-atom',
    enabled: true,
    color: '#e74c3c'
  },
  {
    key: 'chemistry',
    name: 'Chimie',
    icon: 'fas fa-flask',
    enabled: true,
    color: '#f39c12'
  }
]

export const levels = [
  {
    key: 'terminale',
    name: 'Terminale',
    order: 1
  },
  {
    key: 'prepa1',
    name: 'Prépa 1A',
    order: 2
  },
  {
    key: 'prepa2',
    name: 'Prépa 2A',
    order: 3
  }
]

export const resourceTypes = [
  {
    key: 'exercise',
    name: 'Exercice',
    icon: 'fas fa-pencil-alt',
    color: '#27ae60'
  },
  {
    key: 'course',
    name: 'Cours',
    icon: 'fas fa-book-open',
    color: '#3498db'
  },
  {
    key: 'method',
    name: 'Méthode',
    icon: 'fas fa-lightbulb',
    color: '#f39c12'
  },
  {
    key: 'interro',
    name: 'Interrogation',
    icon: 'fas fa-clipboard-question',
    color: '#e74c3c'
  }
]

// Fonctions utilitaires
export const getSubjectByKey = (key) => {
  return subjects.find(subject => subject.key === key)
}

export const getLevelByKey = (key) => {
  return levels.find(level => level.key === key)
}

export const getResourceTypeByKey = (key) => {
  return resourceTypes.find(type => type.key === key)
}

export const getEnabledSubjects = () => {
  return subjects.filter(subject => subject.enabled)
}