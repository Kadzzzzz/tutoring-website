// src/stores/resources.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useResourcesStore = defineStore('resources', () => {
  // État
  const selectedClass = ref('')
  const selectedSubject = ref('')
  const showColles = ref(false)

  // Données des ressources (à terme depuis une DB)
  const resources = ref([
    {
      id: 1,
      title: 'Interrogation 0 PC*',
      subject: 'maths',
      class: 'pcsi',
      type: 'exercice',
      date: '2024-09-15',
      isColle: false,
      files: [
        { type: 'enonce', url: '/documents/exercices/maths/Interrogation_0_sujet.pdf' },
        { type: 'correction', url: '/documents/exercices/maths/Interrogation_0_correction.pdf' }
      ]
    },
    {
      id: 2,
      title: 'Intégrales - Énoncé',
      subject: 'maths',
      class: 'terminale',
      type: 'exercice',
      date: '2024-10-01',
      isColle: true,
      files: [
        { type: 'enonce', url: '/documents/exercices/maths/integrals-enonce.pdf' }
      ]
    }
    // Plus de ressources...
  ])

  // Classes et matières disponibles
  const availableClasses = ref([
    { value: 'seconde', label: 'Seconde' },
    { value: 'premiere', label: 'Première' },
    { value: 'terminale', label: 'Terminale' },
    { value: 'pcsi', label: 'PCSI' },
    { value: 'pc', label: 'PC*' }
  ])

  const availableSubjects = ref([
    { value: 'maths', label: 'Mathématiques', icon: '📐' },
    { value: 'physics', label: 'Physique', icon: '⚛️' },
    { value: 'chemistry', label: 'Chimie', icon: '🧪' }
  ])

  // Computed
  const filteredResources = computed(() => {
    return resources.value.filter(resource => {
      const matchClass = !selectedClass.value || resource.class === selectedClass.value
      const matchSubject = !selectedSubject.value || resource.subject === selectedSubject.value
      const matchColle = !showColles.value || resource.isColle

      return matchClass && matchSubject && matchColle
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  const resourcesPreview = computed(() => {
    return resources.value.slice(0, 3)
  })

  // Actions
  const setClassFilter = (classValue) => {
    selectedClass.value = classValue
  }

  const setSubjectFilter = (subjectValue) => {
    selectedSubject.value = subjectValue
  }

  const toggleColles = (value) => {
    showColles.value = value
  }

  const clearFilters = () => {
    selectedClass.value = ''
    selectedSubject.value = ''
    showColles.value = false
  }

  return {
    selectedClass,
    selectedSubject,
    showColles,
    resources,
    availableClasses,
    availableSubjects,
    filteredResources,
    resourcesPreview,
    setClassFilter,
    setSubjectFilter,
    toggleColles,
    clearFilters
  }
})