<template>
  <div class="colles-page">
    <!-- En-tête -->
    <section class="colles-header">
      <div class="container">
        <div class="header-content">
          <h1>Exercices de Colles</h1>
          <p class="header-description">
            Retrouvez tous vos exercices de colles organisés par semaine.
          </p>
          <router-link to="/" class="back-link">
            ← Retour à l'accueil
          </router-link>
        </div>
      </div>
    </section>

    <!-- Sélection du contexte -->
    <section v-if="!contextSelected" class="context-selection">
      <div class="container">
        <div class="selection-card">
          <h2>Accès aux exercices de colles</h2>

          <!-- Sélection année -->
          <div class="step">
            <h3>1. Choisissez l'année scolaire</h3>
            <div class="year-buttons">
              <button
                v-for="year in academicYears"
                :key="year.id"
                @click="selectYear(year.id)"
                :class="['year-btn', { 'active': localYear === year.id }]"
              >
                <span class="year-label">{{ year.label }}</span>
                <span v-if="year.isCurrent" class="current-badge">En cours</span>
              </button>
            </div>
          </div>

          <!-- Sélection lycée -->
          <div v-if="localYear" class="step">
            <h3>2. Sélectionnez votre lycée</h3>
            <div class="school-grid">
              <div
                v-for="school in schools"
                :key="school.id"
                @click="selectSchool(school.id)"
                :class="['school-card', { 'active': localSchool === school.id }]"
              >
                <h4>{{ school.name }}</h4>
                <p>{{ school.city }}</p>
              </div>
            </div>
          </div>

          <!-- Sélection classe -->
          <div v-if="localSchool" class="step">
            <h3>3. Choisissez votre classe</h3>
            <div class="class-grid">
              <div
                v-for="cls in classes"
                :key="cls.id"
                @click="selectClass(cls.id)"
                :class="['class-card', { 'active': localClass === cls.id }]"
              >
                <div class="class-name">{{ cls.name }}</div>
                <div class="class-description">{{ cls.description }}</div>
              </div>
            </div>
          </div>

          <!-- Bouton validation -->
          <div class="validation-section" v-if="canValidateSelection">
            <button @click="handleValidateSelection" class="validate-btn">
              <span>Accéder aux colles</span>
              <span class="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Interface des colles -->
    <section v-if="contextSelected" class="colles-interface">
      <div class="container">
        <!-- Informations contexte -->
        <div class="context-info">
          <div class="context-details">
            <h3>{{ getSchoolName(selectedSchool) }} - {{ selectedYear }} - {{ getClassName(selectedClass) }}</h3>
          </div>
          <button @click="resetSelection" class="change-context-btn">
            Changer d'établissement
          </button>
        </div>

        <!-- Navigation par semaines -->
        <div class="weeks-navigation">
          <h3>Sélectionnez une semaine</h3>
          <div class="weeks-grid">
            <div
              v-for="week in availableWeeks"
              :key="week.number"
              @click="selectWeek(week.number)"
              :class="['week-card', { 'active': selectedWeek === week.number }]"
            >
              <div class="week-number">S{{ week.number }}</div>
              <div class="week-date">{{ formatDate(week.date) }}</div>
            </div>
          </div>
        </div>

        <!-- Exercices de la semaine sélectionnée -->
        <div v-if="selectedWeek" class="week-exercises">
          <h3 class="section-title">Semaine {{ selectedWeek }} - {{ getWeekLabel(selectedWeek) }}</h3>

          <!-- Programme de colle et Questions de cours -->
          <div class="category-section">
            <h4 class="category-title">Programme de colle et Questions de cours</h4>
            <div class="resources-grid">
              <ResourceCard
                v-for="exercise in programmeExercises"
                :key="exercise.id"
                :resource="exercise"
                @click="openResourceModal"
              />
            </div>
            <div v-if="programmeExercises.length === 0" class="no-exercises">
              <p>Aucun programme disponible pour cette semaine.</p>
            </div>
          </div>

          <!-- Planche 1 -->
          <div class="category-section">
            <h4 class="category-title">Planche 1</h4>
            <div class="resources-grid">
              <ResourceCard
                v-for="exercise in planche1Exercises"
                :key="exercise.id"
                :resource="exercise"
                @click="openResourceModal"
              />
            </div>
            <div v-if="planche1Exercises.length === 0" class="no-exercises">
              <p>Aucun exercice disponible pour Planche 1.</p>
            </div>
          </div>

          <!-- Planche 2 -->
          <div class="category-section">
            <h4 class="category-title">Planche 2</h4>
            <div class="resources-grid">
              <ResourceCard
                v-for="exercise in planche2Exercises"
                :key="exercise.id"
                :resource="exercise"
                @click="openResourceModal"
              />
            </div>
            <div v-if="planche2Exercises.length === 0" class="no-exercises">
              <p>Aucun exercice disponible pour Planche 2.</p>
            </div>
          </div>

          <!-- Planche 3 -->
          <div class="category-section">
            <h4 class="category-title">Planche 3</h4>
            <div class="resources-grid">
              <ResourceCard
                v-for="exercise in planche3Exercises"
                :key="exercise.id"
                :resource="exercise"
                @click="openResourceModal"
              />
            </div>
            <div v-if="planche3Exercises.length === 0" class="no-exercises">
              <p>Aucun exercice disponible pour Planche 3.</p>
            </div>
          </div>

          <!-- Bonus -->
          <div class="category-section">
            <h4 class="category-title">Bonus</h4>
            <div class="resources-grid">
              <ResourceCard
                v-for="exercise in bonusExercises"
                :key="exercise.id"
                :resource="exercise"
                @click="openResourceModal"
              />
            </div>
            <div v-if="bonusExercises.length === 0" class="no-exercises">
              <p>Aucun exercice bonus pour cette semaine.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal pour afficher les ressources -->
    <ResourceModal
      v-if="selectedResource"
      :resource="selectedResource"
      @close="closeResourceModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useColles } from '@/composables/useColles'
import ResourceModal from '@/components/ResourceModal.vue'
import ResourceCard from '@/components/resources/ResourceCard.vue'

// Utilisation du composable
const {
  // État
  selectedSchool,
  selectedYear,
  selectedClass,
  selectedWeek,

  // Données de référence
  schools,
  academicYears,
  classes,

  // État calculé
  contextSelected,
  availableWeeks,
  weekExercises,

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
  getWeekLabel,
  formatDate
} = useColles()

// Variables locales pour les v-model
const localSchool = ref('')
const localYear = ref('')
const localClass = ref('')

// État local pour la modal
const selectedResource = ref(null)

// Computed pour séparer les exercices par catégorie
const programmeExercises = computed(() => {
  return weekExercises.value.filter(ex =>
    ex.colleData?.planche === 0 || ex.typeKey === 'course'
  )
})

const planche1Exercises = computed(() => {
  return weekExercises.value.filter(ex => ex.colleData?.planche === 1)
})

const planche2Exercises = computed(() => {
  return weekExercises.value.filter(ex => ex.colleData?.planche === 2)
})

const planche3Exercises = computed(() => {
  return weekExercises.value.filter(ex => ex.colleData?.planche === 3)
})

const bonusExercises = computed(() => {
  return weekExercises.value.filter(ex =>
    ex.colleData?.planche === 4 || ex.notes?.toLowerCase().includes('bonus')
  )
})

const canValidateSelection = computed(() => {
  return localSchool.value && localYear.value && localClass.value
})

// Méthodes
const selectYear = (yearId) => {
  localYear.value = yearId
  setYear(yearId)
}

const selectSchool = (schoolId) => {
  localSchool.value = schoolId
  setSchool(schoolId)
}

const selectClass = (classId) => {
  localClass.value = classId
  setClass(classId)
}

const selectWeek = (weekNumber) => {
  setWeek(weekNumber)
}

const handleValidateSelection = () => {
  validateSelection()
}

const openResourceModal = (resource) => {
  selectedResource.value = resource
}

const closeResourceModal = () => {
  selectedResource.value = null
}

// Synchronisation des variables locales avec le composable
watch(selectedSchool, (newValue) => {
  localSchool.value = newValue
})

watch(selectedYear, (newValue) => {
  localYear.value = newValue
})

watch(selectedClass, (newValue) => {
  localClass.value = newValue
})

// Initialisation
onMounted(() => {
  setDefaultYear()
  loadSavedContext()
})
</script>

<style scoped>
/* En-tête */
.colles-header {
  background: linear-gradient(135deg, rgba(44, 62, 80, 0.9), rgba(52, 73, 94, 0.9)),
              url('https://images.pexels.com/photos/8197497/pexels-photo-8197497.jpeg?auto=compress&cs=tinysrgb&w=2000') center/cover;
  color: white;
  padding: 4rem 0 3rem;
  text-align: center;
  position: relative;
}

.header-content h1 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
}

.header-description {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.back-link {
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  transition: all 0.3s;
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Sélection du contexte */
.context-selection {
  padding: 3rem 0;
  background: var(--bg-light);
}

.selection-card {
  background: white;
  border-radius: 15px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
}

.selection-card h2 {
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
}

.step {
  margin-bottom: 2.5rem;
}

.step h3 {
  color: var(--text-color);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.year-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.year-btn {
  background: white;
  border: 2px solid var(--border-color);
  padding: 1rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.year-btn:hover {
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.year-btn.active {
  border-color: var(--accent-color);
  background: var(--accent-color);
  color: white;
}

.current-badge {
  display: block;
  font-size: 0.75rem;
  margin-top: 0.3rem;
  opacity: 0.8;
}

.school-grid, .class-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.school-card, .class-card {
  background: white;
  border: 2px solid var(--border-color);
  padding: 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.school-card:hover, .class-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.school-card.active, .class-card.active {
  border-color: var(--accent-color);
  background: rgba(52, 152, 219, 0.05);
}

.class-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.class-description {
  font-size: 0.9rem;
  color: var(--text-light);
}

.validation-section {
  text-align: center;
  margin-top: 2rem;
}

.validate-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s;
}

.validate-btn:hover {
  background: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Interface des colles */
.colles-interface {
  padding: 3rem 0;
}

.context-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.context-details h3 {
  color: var(--primary-color);
  margin-bottom: 0.3rem;
}

.change-context-btn {
  background: var(--border-color);
  color: var(--text-color);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.change-context-btn:hover {
  background: var(--text-light);
  color: white;
}

/* Navigation semaines */
.weeks-navigation {
  margin-bottom: 3rem;
}

.weeks-navigation h3 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.weeks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.week-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.week-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.week-card.active {
  border-color: var(--accent-color);
  background: rgba(52, 152, 219, 0.05);
}

.week-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
}

.week-date {
  font-size: 0.85rem;
  color: var(--text-light);
}

/* Exercices */
.week-exercises {
  margin-top: 2rem;
}

.section-title {
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.category-section {
  margin-bottom: 3rem;
}

.category-title {
  color: var(--text-color);
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-color);
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.no-exercises {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
  font-style: italic;
}

/* Responsive */
@media (max-width: 768px) {
  .colles-header h1 {
    font-size: 2rem;
  }

  .selection-card {
    padding: 2rem 1.5rem;
  }

  .year-buttons {
    flex-direction: column;
  }

  .school-grid, .class-grid {
    grid-template-columns: 1fr;
  }

  .context-info {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .weeks-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  .resources-grid {
    grid-template-columns: 1fr;
  }
}
</style>