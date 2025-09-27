<template>
  <section id="resources" class="content-section resources-section">
    <div class="container">
      <h2>Ressources Pédagogiques</h2>
      <p class="section-description">Découvrez mes exercices corrigés, cours et méthodes classés par matière et niveau. Chaque ressource est accompagnée de corrections détaillées et parfois de vidéos explicatives.</p>

      <!-- Aperçu des 3 ressources les plus récentes -->
      <div class="resources-preview-grid">
        <ResourceCard
          v-for="resource in recentResources"
          :key="resource.id"
          :resource="resource"
          @click="openResourceModal"
        />
      </div>

      <!-- Bouton vers la page complète -->
      <div class="preview-actions">
        <router-link to="/resources" class="btn btn-primary btn-large">
          <i class="fas fa-book-open"></i>
          Découvrir toutes mes ressources ({{ totalResources }})
        </router-link>
        <div class="preview-stats">
          <span class="stat">{{ resourcesWithVideo }} avec vidéo</span>
          <span class="stat">{{ collesCount }} colles disponibles</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ResourceCard from '@/components/resources/ResourceCard.vue'
import { resources, getResourceStats } from '@/data/resources'

// Props et émissions
const emit = defineEmits(['openResourceModal'])

// 3 ressources les plus récentes
const recentResources = computed(() => {
  return [...resources]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
})

// Statistiques
const stats = computed(() => getResourceStats())
const totalResources = computed(() => stats.value.total)
const resourcesWithVideo = computed(() => stats.value.withVideo)
const collesCount = computed(() => resources.filter(r => r.isColle === true).length)

// Actions
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
  margin: 0 auto 50px auto;
  color: var(--text-light, #666);
  line-height: 1.7;
  font-size: 1.1rem;
}

.resources-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 40px 0 60px 0;
}

.preview-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.btn-large {
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--accent-color, #3498db);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-large:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
  background: #2980b9;
  color: white;
}

.preview-stats {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.stat {
  color: var(--text-light, #666);
  font-size: 0.95rem;
  padding: 8px 16px;
  background: var(--secondary-color, #f8f9fa);
  border-radius: 20px;
  border: 1px solid var(--border-color, #ddd);
}

@media (max-width: 768px) {
  .resources-preview-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .preview-stats {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .btn-large {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}
</style>