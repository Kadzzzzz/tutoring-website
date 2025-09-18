<template>
  <div class="resources-page">
    <!-- En-tête de la page -->
    <section class="resources-header">
      <div class="container">
        <div class="header-content">
          <h1>Toutes mes ressources</h1>
          <p class="header-description">
            Explorez l'ensemble des ressources disponibles pour vos études.
            Exercices corrigés, cours, méthodes et exercices de colles.
          </p>

          <!-- Navigation -->
          <div class="navigation-links">
            <router-link to="/" class="back-link">
              ← Retour à l'accueil
            </router-link>
            <router-link to="/colles" class="colles-link">
              Exercices de colles →
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Contenu principal -->
    <section class="resources-content">
      <div class="container">
        <!-- Barre de recherche -->
        <div class="search-section">
          <div class="search-box">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher dans les ressources (titre, tags, contenu...)"
              class="search-input"
            />
            <button v-if="searchQuery" @click="clearSearch" class="clear-search">
              ✕
            </button>
          </div>
        </div>

        <!-- Filtres -->
        <div class="filters-section">
          <div class="filters-row">
            <!-- Filtre par matière -->
            <div class="filter-group">
              <label>Matière :</label>
              <select v-model="selectedSubject" class="filter-select">
                <option value="all">Toutes les matières</option>
                <option value="maths">Mathématiques</option>
                <option value="physics">Physique</option>
                <option value="chemistry">Chimie</option>
              </select>
            </div>

            <!-- Filtre par niveau -->
            <div class="filter-group">
              <label>Niveau :</label>
              <select v-model="selectedLevel" class="filter-select">
                <option value="all">Tous les niveaux</option>
                <option value="terminale">Terminale</option>
                <option value="prepa1">Prépa 1ère année</option>
                <option value="prepa2">Prépa 2ème année</option>
              </select>
            </div>

            <!-- Filtre par type -->
            <div class="filter-group">
              <label>Type :</label>
              <select v-model="selectedType" class="filter-select">
                <option value="all">Tous les types</option>
                <option value="course">Cours</option>
                <option value="exercise">Exercice</option>
                <option value="method">Méthode</option>
                <option value="interro">Interrogation</option>
                <option value="colle">Colle</option>
              </select>
            </div>

            <!-- Filtre avec vidéo -->
            <div class="filter-group">
              <label class="checkbox-label">
                <input
                  v-model="showOnlyWithVideo"
                  type="checkbox"
                />
                Avec vidéo uniquement
              </label>
            </div>
          </div>

          <!-- Bouton reset filtres -->
          <div class="filters-actions">
            <button @click="resetFilters" class="reset-filters-btn">
              Réinitialiser les filtres
            </button>
          </div>
        </div>

        <!-- Statistiques -->
        <div class="stats-section">
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-number">{{ filteredResources.length }}</span>
              <span class="stat-label">ressource{{ filteredResources.length > 1 ? 's' : '' }} trouvée{{ filteredResources.length > 1 ? 's' : '' }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ resourcesWithVideo }}</span>
              <span class="stat-label">avec vidéo</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalColles }}</span>
              <span class="stat-label">exercice{{ totalColles > 1 ? 's' : '' }} de colle{{ totalColles > 1 ? 's' : '' }}</span>
            </div>
          </div>
        </div>

        <!-- Grille des ressources -->
        <div class="resources-grid">
          <ResourceCard
            v-for="resource in sortedResources"
            :key="resource.id"
            :resource="resource"
            @click="openResourceModal"
          />
        </div>

        <!-- Message si aucune ressource -->
        <div v-if="filteredResources.length === 0" class="no-resources">
          <h3>Aucune ressource trouvée</h3>
          <p>Essayez de modifier vos filtres ou votre recherche.</p>
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
import { ref, computed, onMounted } from 'vue'
import { resources, getResourceStats } from '@/data/resources'
import ResourceModal from '@/components/ResourceModal.vue'
import ResourceCard from '@/components/resources/ResourceCard.vue'

// État local
const searchQuery = ref('')
const selectedSubject = ref('all')
const selectedLevel = ref('all')
const selectedType = ref('all')
const showOnlyWithVideo = ref(false)
const selectedResource = ref(null)

// Ressources filtrées
const filteredResources = computed(() => {
  let filtered = [...resources]

  // Filtre par recherche textuelle
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(resource =>
      resource.tags.some(tag => tag.toLowerCase().includes(query)) ||
      resource.id.toLowerCase().includes(query) ||
      (resource.colleData?.class && resource.colleData.class.toLowerCase().includes(query)) ||
      (resource.colleData?.teacher && resource.colleData.teacher.toLowerCase().includes(query))
    )
  }

  // Filtre par matière
  if (selectedSubject.value !== 'all') {
    filtered = filtered.filter(resource => resource.subject === selectedSubject.value)
  }

  // Filtre par niveau
  if (selectedLevel.value !== 'all') {
    filtered = filtered.filter(resource => resource.levelKey === selectedLevel.value)
  }

  // Filtre par type
  if (selectedType.value !== 'all') {
    filtered = filtered.filter(resource => resource.typeKey === selectedType.value)
  }

  // Filtre vidéo
  if (showOnlyWithVideo.value) {
    filtered = filtered.filter(resource => resource.hasVideo)
  }

  return filtered
})

// Tri par date (plus récent en premier)
const sortedResources = computed(() => {
  return [...filteredResources.value].sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  )
})

// Statistiques
const resourcesWithVideo = computed(() =>
  filteredResources.value.filter(r => r.hasVideo).length
)

const totalColles = computed(() =>
  filteredResources.value.filter(r => r.typeKey === 'colle').length
)

// Actions
const clearSearch = () => {
  searchQuery.value = ''
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedSubject.value = 'all'
  selectedLevel.value = 'all'
  selectedType.value = 'all'
  showOnlyWithVideo.value = false
}

const openResourceModal = (resource) => {
  selectedResource.value = resource
  document.body.style.overflow = 'hidden'
}

const closeResourceModal = () => {
  selectedResource.value = null
  document.body.style.overflow = ''
}

// Gestion URL paramètres (optionnel)
onMounted(() => {
  // Scroll vers le haut au chargement
  window.scrollTo({ top: 0, behavior: 'smooth' })

  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('subject')) {
    selectedSubject.value = urlParams.get('subject')
  }
  if (urlParams.get('type')) {
    selectedType.value = urlParams.get('type')
  }
})
</script>

<style scoped>
.resources-page {
  min-height: 100vh;
  padding-top: var(--header-height);
}

.resources-header {
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

.resources-header h1 {
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

.navigation-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.back-link, .colles-link {
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

.back-link:hover, .colles-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  color: var(--text-white);
  transform: translateY(-2px);
}

.resources-content {
  padding-bottom: 4rem;
}

.search-section {
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid var(--border-color);
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
  transition: all var(--transition-speed);
}

.search-input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.clear-search {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
}

.filters-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
}

.filters-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
  color: var(--primary-color);
  font-size: 0.9rem;
}

.filter-select {
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  outline: none;
  transition: border-color var(--transition-speed);
}

.filter-select:focus {
  border-color: var(--accent-color);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex-direction: row !important;
}

.filters-actions {
  text-align: center;
}

.reset-filters-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all var(--transition-speed);
}

.reset-filters-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.stats-section {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-light);
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.no-resources {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-light);
}

.no-resources h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

/* Responsive */
@media (max-width: 768px) {
  .resources-header {
    padding: 3rem 0;
  }

  .resources-header h1 {
    font-size: 2.2rem;
  }

  .header-description {
    font-size: 1rem;
  }

  .navigation-links {
    flex-direction: column;
    align-items: center;
  }

  .filters-row {
    grid-template-columns: 1fr;
  }

  .resources-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .stat-item {
    padding: 0.8rem 0.5rem;
  }

  .stat-number {
    font-size: 1.4rem;
  }

  .stat-label {
    font-size: 0.8rem;
  }
}
</style>