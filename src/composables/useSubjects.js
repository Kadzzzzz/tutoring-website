// src/composables/useSubjects.js
import { computed } from 'vue'
import {
  subjects,
  levels,
  resourceTypes,
  getSubjectByKey,
  getLevelByKey,
  getResourceTypeByKey,
  getEnabledSubjects
} from '@/data/subjects'

export function useSubjects() {
  // Données réactives (computed pour la réactivité)
  const allSubjects = computed(() => subjects)
  const allLevels = computed(() => levels)
  const allResourceTypes = computed(() => resourceTypes)
  const enabledSubjects = computed(() => getEnabledSubjects())

  // Fonctions utilitaires
  const getSubject = (key) => {
    return getSubjectByKey(key)
  }

  const getLevel = (key) => {
    return getLevelByKey(key)
  }

  const getResourceType = (key) => {
    return getResourceTypeByKey(key)
  }

  // Formatters pour l'affichage
  const getSubjectDisplayName = (key) => {
    const subject = getSubjectByKey(key)
    return subject ? subject.name : key
  }

  const getLevelDisplayName = (key) => {
    const level = getLevelByKey(key)
    return level ? level.name : key
  }

  const getResourceTypeDisplayName = (key) => {
    const type = getResourceTypeByKey(key)
    return type ? type.name : key
  }

  // Validation
  const isValidSubject = (key) => {
    return subjects.some(subject => subject.key === key)
  }

  const isValidLevel = (key) => {
    return levels.some(level => level.key === key)
  }

  const isValidResourceType = (key) => {
    return resourceTypes.some(type => type.key === key)
  }

  // Options pour les sélecteurs
  const subjectOptions = computed(() => [
    { key: 'all', name: 'Toutes les matières', icon: 'fas fa-list' },
    ...enabledSubjects.value
  ])

  const levelOptions = computed(() => [
    { key: 'all', name: 'Tous les niveaux', order: 0 },
    ...allLevels.value
  ])

  const typeOptions = computed(() => [
    { key: 'all', name: 'Tous les types', icon: 'fas fa-layer-group' },
    ...allResourceTypes.value
  ])

  return {
    // Données
    allSubjects,
    allLevels,
    allResourceTypes,
    enabledSubjects,

    // Options pour les sélecteurs
    subjectOptions,
    levelOptions,
    typeOptions,

    // Getters
    getSubject,
    getLevel,
    getResourceType,

    // Formatters
    getSubjectDisplayName,
    getLevelDisplayName,
    getResourceTypeDisplayName,

    // Validation
    isValidSubject,
    isValidLevel,
    isValidResourceType
  }
}