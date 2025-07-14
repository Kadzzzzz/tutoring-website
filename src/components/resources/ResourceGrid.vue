<template>
  <div class="resources-grid">
    <ResourceCard
      v-for="resource in resources"
      :key="resource.id"
      :resource="resource"
      @click="$emit('resourceClick', resource)"
    />

    <!-- Message si aucune ressource -->
    <div v-if="resources.length === 0" class="no-resources">
      <i class="fas fa-search"></i>
      <h3>{{ t('resources.noResourcesFound') }}</h3>
      <p>{{ t('resources.noResourcesFoundDesc') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useTranslations } from '@/composables/useTranslations.js'
import ResourceCard from './ResourceCard.vue'

const { t } = useTranslations()

// Props
defineProps({
  resources: {
    type: Array,
    required: true
  }
})

// Emits
defineEmits(['resourceClick'])
</script>

<style scoped>
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.no-resources {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: var(--text-light, #666);
}

.no-resources i {
  font-size: 3rem;
  margin-bottom: 20px;
  color: var(--accent-color, #3498db);
}

.no-resources h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--primary-color, #2c3e50);
}

.no-resources p {
  font-size: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .resources-grid {
    grid-template-columns: 1fr;
  }
}
</style>