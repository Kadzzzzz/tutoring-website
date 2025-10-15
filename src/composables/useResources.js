// src/composables/useResources.js
import { ref, computed } from 'vue'
import {
  resources,
  getResourcesBySubject,
  getResourcesByLevel,
  getResourcesByType,
  searchResources,
  getResourceStats
} from '@/data/resources'

export function useResources() {
  // État réactif
  const activeSubject = ref('maths')
  const activeLevel = ref('all')
  const activeType = ref('all')
  const searchQuery = ref('')
  const selectedResource = ref(null)

  // Ressources filtrées selon les critères actifs
  const filteredResources = computed(() => {
    let filtered = [...resources]

    if (activeType.value !== 'programme') {
      filtered = filtered.filter(resource => resource.showInResourcesPage !== false)
    }

    // Filtrer par matière
    if (activeSubject.value !== 'all') {
      filtered = filtered.filter(resource => resource.subject === activeSubject.value)
    }

    // Filtrer par niveau
    if (activeLevel.value !== 'all') {
      filtered = filtered.filter(resource => resource.levelKey === activeLevel.value)
    }

    // Filtrer par type
    if (activeType.value !== 'all') {
      filtered = filtered.filter(resource => resource.typeKey === activeType.value)
    }

    // Filtrer par recherche
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(resource =>
        resource.tags.some(tag => tag.toLowerCase().includes(query)) ||
        resource.id.toLowerCase().includes(query)
      )
    }

    return filtered
  })

  // Statistiques des ressources filtrées
  const filteredStats = computed(() => {
    const filtered = filteredResources.value
    return {
      total: filtered.length,
      withVideo: filtered.filter(r => r.hasVideo).length,
      byDifficulty: {
        facile: filtered.filter(r => r.difficulty === 'facile').length,
        moyen: filtered.filter(r => r.difficulty === 'moyen').length,
        difficile: filtered.filter(r => r.difficulty === 'difficile').length
      }
    }
  })

  // Actions
  const setActiveSubject = (subject) => {
    activeSubject.value = subject
  }

  const setActiveLevel = (level) => {
    activeLevel.value = level
  }

  const setActiveType = (type) => {
    activeType.value = type
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const clearFilters = () => {
    activeSubject.value = 'maths'
    activeLevel.value = 'all'
    activeType.value = 'all'
    searchQuery.value = ''
  }

  const selectResource = (resource) => {
    selectedResource.value = resource
  }

  const clearSelection = () => {
    selectedResource.value = null
  }

  // Fonctions utilitaires
  const getResourcesByCurrentSubject = () => {
    return getResourcesBySubject(activeSubject.value)
  }

  const getAllStats = () => {
    return getResourceStats()
  }

  return {
    // État
    activeSubject: computed(() => activeSubject.value),
    activeLevel: computed(() => activeLevel.value),
    activeType: computed(() => activeType.value),
    searchQuery: computed(() => searchQuery.value),
    selectedResource: computed(() => selectedResource.value),

    // Données calculées
    filteredResources,
    filteredStats,

    // Actions
    setActiveSubject,
    setActiveLevel,
    setActiveType,
    setSearchQuery,
    clearFilters,
    selectResource,
    clearSelection,

    // Utilitaires
    getResourcesByCurrentSubject,
    getAllStats
  }
}