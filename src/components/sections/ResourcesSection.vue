<template>
  <section id="resources" class="content-section resources-section">
    <div class="container">
      <h2>{{ t('resources.title') }}</h2>
      <p class="section-description">{{ t('resources.description') }}</p>

      <!-- Filtres par matière -->
      <SubjectFilters
        :activeSubject="activeSubject"
        @update:activeSubject="setActiveSubject"
      />

      <!-- Grille des ressources -->
      <ResourceGrid
        :resources="filteredResources"
        @resourceClick="openResourceModal"
      />

      <!-- Statistiques (optionnel) -->
      <div v-if="showStats" class="resources-stats">
        <div class="stat-item">
          <span class="stat-number">{{ filteredStats.total }}</span>
          <span class="stat-label">{{ t('resources.stats.total') }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ filteredStats.withVideo }}</span>
          <span class="stat-label">{{ t('resources.stats.withVideo') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTranslations } from '@/composables/useTranslations.js'
import { useResources } from '@/composables/useResources.js'
import SubjectFilters from '@/components/resources/SubjectFilters.vue'
import ResourceGrid from '@/components/resources/ResourceGrid.vue'

const { t } = useTranslations()
const {
  activeSubject,
  filteredResources,
  filteredStats,
  setActiveSubject
} = useResources()

// Props
defineProps({
  showStats: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['openResourceModal'])

// Méthodes
const openResourceModal = (resource) => {
  emit('openResourceModal', resource)
}
</script>

<style scoped>
.content-section {
  padding: 80px 0;
  border-bottom: 1px solid var(--border-color, #ddd);
}

.resources-section {
  background-color: white;
  text-align: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 25px;
}

.resources-section h2 {
  font-family: var(--heading-font, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
  font-weight: 700;
  line-height: 1.3;
  color: var(--primary-color, #2c3e50);
  margin-bottom: 1rem;
  font-size: 2.2rem;
}

.resources-section h2::after {
  content: '';
  display: block;
  width: 70px;
  height: 4px;
  background-color: var(--accent-color, #3498db);
  margin: 15px auto 25px auto;
}

.section-description {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 40px auto;
  color: var(--text-light, #666);
  line-height: 1.7;
}

.resources-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
  padding: 30px;
  background-color: var(--secondary-color, #f8f9fa);
  border-radius: 10px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-color, #3498db);
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-light, #666);
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>