<template>
  <div class="resource-item" @click="$emit('click', resource)">
    <div class="resource-tags">
      <span class="tag level">{{ getLevelDisplay(resource.levelKey) }}</span>
      <span class="tag type">{{ getTypeDisplay(resource.typeKey) }}</span>
      <span v-if="resource.difficulty" class="tag difficulty" :class="resource.difficulty">
        {{ getDifficultyDisplay(resource.difficulty) }}
      </span>
    </div>

    <div class="resource-content">
      <h3 class="resource-title">
        {{ getResourceTitle(resource) }}
      </h3>
      <p class="resource-description">
        {{ getResourceDescription(resource) }}
      </p>

      <!-- Tags -->
      <div v-if="resource.tags && resource.tags.length" class="resource-tags-list">
        <span v-for="tag in resource.tags.slice(0, 3)" :key="tag" class="tag-small">
          {{ tag }}
        </span>
        <span v-if="resource.tags.length > 3" class="tag-small more">
          +{{ resource.tags.length - 3 }}
        </span>
      </div>

      <div class="resource-meta">
        <span class="meta-item">
          <i class="fas fa-clock"></i>
          {{ resource.duration }}
        </span>
        <span v-if="resource.hasVideo" class="meta-item video">
          <i class="fas fa-video"></i>
          Vidéo
        </span>
        <span class="meta-item">
          <i class="fas fa-file-pdf"></i>
          PDF
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  resource: {
    type: Object,
    required: true
  }
})

// Emits
defineEmits(['click'])

// Fonctions d'affichage (remplacent les traductions)
const getLevelDisplay = (levelKey) => {
  const levels = {
    terminale: 'Terminale',
    prepa1: 'Prépa 1A',
    prepa2: 'Prépa 2A'
  }
  return levels[levelKey] || levelKey
}

const getTypeDisplay = (typeKey) => {
  const types = {
    exercise: 'Exercice',
    course: 'Cours',
    method: 'Méthode',
    interro: 'Interrogation'
  }
  return types[typeKey] || typeKey
}

const getDifficultyDisplay = (difficulty) => {
  const difficulties = {
    facile: 'Facile',
    moyen: 'Moyen',
    difficile: 'Difficile'
  }
  return difficulties[difficulty] || difficulty
}

const getResourceTitle = (resource) => {
  // Mapping des titres depuis les traductions
  const titles = {
    'maths': {
      'interro0LLG': 'Interrogation 0 PC*'
    },
    'physics': {
      'mechanics': 'Mécanique du point'
    },
    'chemistry': {
      'equilibrium': 'Équilibres chimiques',
      'kinetics': 'Cinétique chimique'
    }
  }
  return titles[resource.subject]?.[resource.id] || `Ressource ${resource.id}`
}

const getResourceDescription = (resource) => {
  // Mapping des descriptions depuis les traductions
  const descriptions = {
    'maths': {
      'interro0LLG': 'Couvre arithmétique, combinatoire et analyse.'
    },
    'physics': {
      'mechanics': 'Cours et exercices sur la cinématique et la dynamique'
    },
    'chemistry': {
      'equilibrium': 'Constantes d\'équilibre et déplacements',
      'kinetics': 'Vitesse de réaction et mécanismes'
    }
  }
  return descriptions[resource.subject]?.[resource.id] || 'Description de la ressource'
}
</script>

<style scoped>
.resource-item {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform var(--transition-speed, 0.3s);
  border: 1px solid #eee;
}

.resource-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow, 0 5px 15px rgba(0, 0, 0, 0.1));
}

.resource-tags {
  padding: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.tag.level {
  background-color: #e8f4fd;
  color: #3498db;
}

.tag.type {
  background-color: #f0f9ff;
  color: #2563eb;
}

.tag.difficulty.facile {
  background-color: #d4edda;
  color: #155724;
}

.tag.difficulty.moyen {
  background-color: #fff3cd;
  color: #856404;
}

.tag.difficulty.difficile {
  background-color: #f8d7da;
  color: #721c24;
}

.resource-content {
  padding: 20px;
  text-align: left;
}

.resource-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--primary-color, #2c3e50);
  font-family: var(--heading-font, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
  font-weight: 700;
  line-height: 1.3;
}

.resource-description {
  color: var(--text-light, #666);
  font-size: 0.95rem;
  margin-bottom: 15px;
  line-height: 1.7;
}

.resource-tags-list {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.tag-small {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
  background-color: #f8f9fa;
  color: #6c757d;
  border: 1px solid #e9ecef;
}

.tag-small.more {
  background-color: var(--accent-color, #3498db);
  color: white;
  border-color: var(--accent-color, #3498db);
}

.resource-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 0.9rem;
  color: var(--text-light, #666);
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.meta-item i {
  color: var(--accent-color, #3498db);
}

.meta-item.video {
  color: #e74c3c;
}

.meta-item.video i {
  color: #e74c3c;
}
</style>