// src/composables/useColles.js
import { ref, computed } from 'vue'
import {
  collesMetadata,
  getColleResources,
  getCollesBySchoolAndYear,
  getCollesByWeek,
  getCollesByClass,
  getWeeksWithColles
} from '@/data/resources'

export function useColles() {
  // État réactif
  const selectedSchool = ref('')
  const selectedYear = ref('')
  const selectedClass = ref('')
  const selectedWeek = ref(null)

  // Données de référence
  const schools = computed(() => collesMetadata.schools)
  const academicYears = computed(() => collesMetadata.academicYears)
  const classes = computed(() => collesMetadata.classes)

  // État de sélection
  const contextSelected = computed(() =>
    selectedSchool.value && selectedYear.value && selectedClass.value
  )

  const canValidateSelection = computed(() =>
    selectedSchool.value && selectedYear.value && selectedClass.value
  )

  // Données calculées
  const availableWeeks = computed(() => {
    if (!contextSelected.value) return []
    return getWeeksWithColles(
      selectedSchool.value,
      selectedYear.value,
      selectedClass.value
    )
  })

  const weekExercises = computed(() => {
    if (!selectedWeek.value || !contextSelected.value) return []
    return getCollesByWeek(
      selectedSchool.value,
      selectedYear.value,
      selectedWeek.value
    )
      .filter(exercise =>
        exercise.colleData?.class === selectedClass.value.toUpperCase()
      )
      .sort((a, b) => a.colleData.planche - b.colleData.planche)
  })

  const colleStats = computed(() => {
    if (!contextSelected.value) return {}

    const colles = getCollesByClass(
      selectedSchool.value,
      selectedYear.value,
      selectedClass.value
    )

    return {
      totalColles: colles.length,
      totalWeeks: availableWeeks.value.length,
      withVideo: colles.filter(c => c.hasVideo).length,
      subjects: [...new Set(colles.map(c => c.subject))],
      teachers: [...new Set(colles.map(c => c.colleData?.teacher))].filter(Boolean)
    }
  })

  // Actions
  const setSchool = (schoolId) => {
    selectedSchool.value = schoolId
  }

  const setYear = (yearId) => {
    selectedYear.value = yearId
  }

  const setClass = (classId) => {
    selectedClass.value = classId
  }

  const setWeek = (weekNumber) => {
    selectedWeek.value = weekNumber
  }

  const validateSelection = () => {
    if (!canValidateSelection.value) return false

    // Sauvegarder le contexte dans localStorage
    const context = {
      school: selectedSchool.value,
      year: selectedYear.value,
      class: selectedClass.value,
      timestamp: Date.now()
    }

    try {
      localStorage.setItem('colles-context', JSON.stringify(context))
      return true
    } catch (error) {
      console.warn('Impossible de sauvegarder le contexte:', error)
      return true // Continue même si la sauvegarde échoue
    }
  }

  const resetSelection = () => {
    selectedSchool.value = ''
    selectedYear.value = ''
    selectedClass.value = ''
    selectedWeek.value = null

    try {
      localStorage.removeItem('colles-context')
    } catch (error) {
      console.warn('Impossible de supprimer le contexte sauvegardé:', error)
    }
  }

  const loadSavedContext = () => {
    try {
      const saved = localStorage.getItem('colles-context')
      if (!saved) return false

      const context = JSON.parse(saved)

      // Vérifier que le contexte n'est pas trop ancien (7 jours)
      const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 jours en millisecondes
      if (context.timestamp && (Date.now() - context.timestamp) > maxAge) {
        localStorage.removeItem('colles-context')
        return false
      }

      // Vérifier que les valeurs sont toujours valides
      const validSchool = schools.value.find(s => s.id === context.school)
      const validYear = academicYears.value.find(y => y.id === context.year)
      const validClass = classes.value.find(c => c.id === context.class)

      if (validSchool && validYear && validClass) {
        selectedSchool.value = context.school
        selectedYear.value = context.year
        selectedClass.value = context.class
        return true
      }

      // Si les données ne sont plus valides, nettoyer
      localStorage.removeItem('colles-context')
      return false
    } catch (error) {
      console.warn('Erreur lors du chargement du contexte:', error)
      return false
    }
  }

  const setDefaultYear = () => {
    const currentYear = academicYears.value.find(y => y.isCurrent)
    if (currentYear && !selectedYear.value) {
      selectedYear.value = currentYear.id
    }
  }

  // Fonctions utilitaires
  const getSchoolName = (schoolId) => {
    return schools.value.find(s => s.id === schoolId)?.name || ''
  }

  const getClassName = (classId) => {
    return classes.value.find(c => c.id === classId)?.name || ''
  }

  const getYearLabel = (yearId) => {
    return academicYears.value.find(y => y.id === yearId)?.label || ''
  }

  const getWeekLabel = (weekNumber) => {
    return availableWeeks.value.find(w => w.number === weekNumber)?.label || ''
  }

  const getSubjectName = (subject) => {
    const subjects = {
      'physics': 'Physique',
      'chemistry': 'Chimie',
      'maths': 'Mathématiques'
    }
    return subjects[subject] || subject
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  // Fonction pour obtenir les exercices d'un trinôme spécifique
  const getExercisesForTrinome = (trinomeNumber) => {
    if (!selectedWeek.value || !contextSelected.value) return []

    return weekExercises.value.filter(exercise =>
      exercise.colleData?.trinomes?.includes(trinomeNumber)
    )
  }

  // Fonction pour obtenir le programme de colles d'une semaine
  const getWeekProgram = (weekNumber) => {
    const exercises = getCollesByWeek(
      selectedSchool.value,
      selectedYear.value,
      weekNumber
    ).filter(exercise =>
      exercise.colleData?.class === selectedClass.value.toUpperCase()
    )

    return {
      week: weekNumber,
      exercises: exercises,
      subjects: [...new Set(exercises.map(e => e.subject))],
      planches: exercises.length,
      timeSlots: [...new Set(exercises.map(e => e.colleData?.timeSlot))].filter(Boolean)
    }
  }

  return {
    // État
    selectedSchool: computed(() => selectedSchool.value),
    selectedYear: computed(() => selectedYear.value),
    selectedClass: computed(() => selectedClass.value),
    selectedWeek: computed(() => selectedWeek.value),

    // Données de référence
    schools,
    academicYears,
    classes,

    // État calculé
    contextSelected,
    canValidateSelection,
    availableWeeks,
    colleStats,

    // Actions
    setSchool,
    setYear,
    setClass,
    setWeek,
    validateSelection,
    resetSelection,
    loadSavedContext,
    setDefaultYear,

    // Utilitaires
    getSchoolName,
    getClassName,
    getYearLabel,
    getWeekLabel,
    getSubjectName,
    formatDate,
    getExercisesForTrinome,
    getWeekProgram
  }
}