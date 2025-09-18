<template>
  <div class="colles-page">
    <!-- En-tête -->
    <section class="colles-header">
      <div class="container">
        <div class="header-content">
          <h1>Exercices de Colles</h1>
          <p class="header-description">
            Retrouvez tous vos exercices de colles organisés par semaine.
            Chaque planche contient les énoncés et corrections détaillées.
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
            <p>{{ availableWeeks.length }} semaines de colles disponibles</p>
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
              <div class="week-label">{{ week.label }}</div>
            </div>
          </div>
        </div>

        <!-- Exercices de la semaine sélectionnée -->
        <div v-if="selectedWeek" class="week-exercises">
          <h3>Semaine {{ selectedWeek }} - {{ getWeekLabel(selectedWeek) }}</h3>

          <div class="exercises-grid">
            <ColleExerciseCard
              v-for="exercise in weekExercises"
              :key="exercise.id"
              :exercise="exercise"
              @click="openResourceModal"
            />
          </div>

          <!-- Message si pas d'exercices -->
          <div v-if="weekExercises.length === 0" class="no-exercises">
            <p>Aucun exercice disponible pour cette semaine.</p>
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
import ColleExerciseCard from '@/components/colles/ColleExerciseCard.vue'

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

// Synchronisation des variables locales avec le composable
watch(localSchool, (newValue) => {
  setSchool(newValue)
})

watch(localYear, (newValue) => {
  setYear(newValue)
})

watch(localClass, (newValue) => {
  setClass(newValue)
})

// Synchronisation inverse (du composable vers les variables locales)
watch(selectedSchool, (newValue) => {
  localSchool.value = newValue
})

watch(selectedYear, (newValue) => {
  localYear.value = newValue
})

watch(selectedClass, (newValue) => {
  localClass.value = newValue
})

// Validation de sélection calculée localement
const canValidateSelection = computed(() =>
  localSchool.value && localYear.value && localClass.value
)

// Actions pour la sélection par boutons
const selectYear = (yearId) => {
  localYear.value = yearId
  // Reset les sélections suivantes
  localSchool.value = ''
  localClass.value = ''
}

const selectSchool = (schoolId) => {
  localSchool.value = schoolId
  // Reset la sélection de classe
  localClass.value = ''
}

const selectClass = (classId) => {
  localClass.value = classId
}

// Actions locales
const handleValidateSelection = () => {
  if (validateSelection()) {
    // Scroll vers le haut après validation
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const selectWeek = (weekNumber) => {
  setWeek(weekNumber)
}

const openResourceModal = (resource) => {
  selectedResource.value = resource
  document.body.style.overflow = 'hidden'
}

const closeResourceModal = () => {
  selectedResource.value = null
  document.body.style.overflow = ''
}

// Chargement initial
onMounted(() => {
  // Scroll vers le haut au chargement
  window.scrollTo({ top: 0, behavior: 'smooth' })

  // Restaurer le contexte sauvegardé
  const contextLoaded = loadSavedContext()

  // Si pas de contexte sauvegardé, définir l'année par défaut
  if (!contextLoaded) {
    setDefaultYear()
  }
})
</script>

<style scoped>
.colles-page {
  min-height: 100vh;
  padding-top: var(--header-height);
}

.colles-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, #34495e 100%);
  color: var(--text-white);
  padding: 4rem 0;
  margin-bottom: 3rem;
}

.header-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.colles-header h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--text-white);
  font-weight: 700;
}

.header-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: var(--text-white);
  text-decoration: none;
  font-weight: 500;
  padding: 0.8rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  transition: all var(--transition-speed);
}

.back-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  color: var(--text-white);
  transform: translateY(-2px);
}

.context-selection {
  padding: 2rem 0 4rem 0;
  background-color: #f8f9fa;
}

.selection-card {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: var(--box-shadow);
}

.selection-card h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 3rem;
  font-size: 2rem;
}

.step {
  margin-bottom: 3rem;
}

.step h3 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

/* Boutons d'année */
.year-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.year-btn {
  background: white;
  border: 2px solid var(--border-color);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all var(--transition-speed);
  text-align: center;
  min-width: 180px;
}

.year-btn:hover {
  border-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.15);
}

.year-btn.active {
  border-color: var(--accent-color);
  background: rgba(52, 152, 219, 0.05);
}

.year-label {
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.current-badge {
  display: inline-block;
  background: var(--accent-color);
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Grille des lycées */
.school-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.school-card {
  background: white;
  border: 2px solid var(--border-color);
  padding: 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all var(--transition-speed);
  text-align: center;
}

.school-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.school-card.active {
  border-color: var(--accent-color);
  background: rgba(52, 152, 219, 0.05);
}

.school-card h4 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.school-card p {
  color: var(--text-light);
  margin: 0;
  font-size: 0.9rem;
}

/* Grille des classes */
.class-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.class-card {
  background: white;
  border: 2px solid var(--border-color);
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all var(--transition-speed);
  text-align: center;
}

.class-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.class-card.active {
  border-color: var(--accent-color);
  background: rgba(52, 152, 219, 0.05);
}

.class-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.class-description {
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Section de validation */
.validation-section {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.validate-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-speed);
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}

.validate-btn:hover {
  background: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
}

.arrow {
  font-size: 1.2rem;
  transition: transform var(--transition-speed);
}

.validate-btn:hover .arrow {
  transform: translateX(5px);
}

/* Interface des colles */
.colles-interface {
  padding: 2rem 0 4rem 0;
}

.context-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  margin-bottom: 3rem;
}

.context-details h3 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.context-details p {
  color: var(--text-light);
  margin: 0;
}

.change-context-btn {
  background: var(--border-color);
  color: var(--text-color);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all var(--transition-speed);
}

.change-context-btn:hover {
  background: var(--text-light);
  color: white;
}

.weeks-navigation {
  margin-bottom: 3rem;
}

.weeks-navigation h3 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.weeks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.week-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-speed);
  border: 2px solid transparent;
}

.week-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.week-card.active {
  border-color: var(--accent-color);
  background: rgba(52, 152, 219, 0.05);
}

.week-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
}

.week-date {
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 0.3rem;
}

.week-label {
  font-size: 0.85rem;
  color: var(--text-color);
  font-weight: 500;
}

.week-exercises h3 {
  color: var(--primary-color);
  margin-bottom: 2rem;
}

.exercises-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
}

.no-exercises {
  text-align: center;
  padding: 3rem;
  color: var(--text-light);
}

/* Responsive */
@media (max-width: 768px) {
  .colles-header h1 {
    font-size: 2.2rem;
  }

  .selection-card {
    padding: 2rem 1.5rem;
    margin: 0 1rem;
  }

  .year-buttons {
    flex-direction: column;
    align-items: center;
  }

  .school-grid {
    grid-template-columns: 1fr;
  }

  .class-grid {
    grid-template-columns: 1fr;
  }

  .context-info {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .weeks-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .exercises-grid {
    grid-template-columns: 1fr;
  }
}
</style>