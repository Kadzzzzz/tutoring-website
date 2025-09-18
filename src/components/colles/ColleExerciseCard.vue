<template>
  <div
    @click="$emit('click', exercise)"
    :class="['colle-card', { 'has-video': exercise.hasVideo }]"
  >
    <!-- En-tête avec planche et matière -->
    <div class="card-header">
      <div class="planche-info">
        <span class="planche-number">Planche {{ exercise.colleData.planche }}</span>
        <span class="subject-badge" :class="subjectClass">
          {{ subjectName }}
        </span>
      </div>
      <div class="week-info">
        <span class="week-badge">S{{ exercise.colleData.week }}</span>
      </div>
    </div>

    <!-- Informations principales -->
    <div class="card-content">
      <div class="exercise-details">
        <div class="time-difficulty">
          <span class="duration">{{ exercise.duration }}</span>
          <span :class="['difficulty', difficultyClass]">
            {{ exercise.difficulty }}
          </span>
        </div>

        <div class="schedule-info">
          <span class="time-slot">{{ exercise.colleData.timeSlot }}</span>
          <span class="teacher">{{ exercise.colleData.teacher }}</span>
        </div>
      </div>

      <!-- Tags -->
      <div class="tags-section">
        <span
          v-for="tag in limitedTags"
          :key="tag"
          class="tag"
        >
          {{ tag }}
        </span>
        <span v-if="exercise.tags.length > 3" class="more-tags">
          +{{ exercise.tags.length - 3 }}
        </span>
      </div>
    </div>

    <!-- Actions et indicateurs -->
    <div class="card-footer">
      <div class="file-indicators">
        <div class="indicator pdf-indicator">
          <span class="icon">📄</span>
          <span class="label">Énoncé PDF</span>
        </div>
        <div v-if="exercise.pdfSolution" class="indicator solution-indicator">
          <span class="icon">✅</span>
          <span class="label">Correction</span>
        </div>
        <div v-if="exercise.hasVideo" class="indicator video-indicator">
          <span class="icon">🎥</span>
          <span class="label">Vidéo</span>
        </div>
      </div>

      <!-- Date de création -->
      <div class="creation-date">
        <span>{{ formattedDate }}</span>
      </div>
    </div>

    <!-- Indicateur visuel pour les trinômes (optionnel) -->
    <div v-if="showTrinomes && exercise.colleData.trinomes?.length" class="trinomes-info">
      <span class="trinomes-label">Trinômes:</span>
      <span class="trinomes-list">{{ trinomesList }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  exercise: {
    type: Object,
    required: true
  },
  showTrinomes: {
    type: Boolean,
    default: false
  }
})

// Émissions
defineEmits(['click'])

// Données calculées
const subjectName = computed(() => {
  const subjects = {
    'physics': 'Physique',
    'chemistry': 'Chimie',
    'maths': 'Mathématiques'
  }
  return subjects[props.exercise.subject] || props.exercise.subject
})

const subjectClass = computed(() => {
  const classes = {
    'physics': 'subject-physics',
    'chemistry': 'subject-chemistry',
    'maths': 'subject-maths'
  }
  return classes[props.exercise.subject] || 'subject-default'
})

const difficultyClass = computed(() => {
  const classes = {
    'facile': 'difficulty-easy',
    'moyen': 'difficulty-medium',
    'difficile': 'difficulty-hard'
  }
  return classes[props.exercise.difficulty] || 'difficulty-default'
})

const limitedTags = computed(() => {
  return props.exercise.tags.slice(0, 3)
})

const formattedDate = computed(() => {
  const date = new Date(props.exercise.createdAt)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short'
  })
})

const trinomesList = computed(() => {
  if (!props.exercise.colleData?.trinomes?.length) return ''
  return props.exercise.colleData.trinomes.join(', ')
})
</script>

<style scoped>
.colle-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid var(--accent-color);
  position: relative;
  overflow: hidden;
}

.colle-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.colle-card.has-video::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 25px 25px 0;
  border-color: transparent #e74c3c transparent transparent;
}

.colle-card.has-video::after {
  content: '🎥';
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 0.8rem;
  z-index: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.planche-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.planche-number {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-color);
}

.subject-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
}

.subject-physics {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.subject-chemistry {
  background: linear-gradient(135deg, #e67e22, #d35400);
}

.subject-maths {
  background: linear-gradient(135deg, #8e44ad, #732d91);
}

.subject-default {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
}

.week-info {
  display: flex;
  align-items: center;
}

.week-badge {
  background: var(--secondary-color);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.card-content {
  margin-bottom: 1rem;
}

.exercise-details {
  margin-bottom: 1rem;
}

.time-difficulty {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
}

.duration {
  background: rgba(52, 152, 219, 0.1);
  color: var(--accent-color);
  padding: 0.25rem 0.6rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 500;
}

.difficulty {
  padding: 0.25rem 0.6rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
}

.difficulty-easy {
  background: linear-gradient(135deg, #27ae60, #229954);
}

.difficulty-medium {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.difficulty-hard {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.difficulty-default {
  background: var(--text-light);
}

.schedule-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.time-slot, .teacher {
  font-size: 0.85rem;
  color: var(--text-light);
}

.teacher {
  font-weight: 500;
  color: var(--text-color);
}

.tags-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

.tag {
  background: rgba(149, 165, 166, 0.1);
  color: var(--text-color);
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(149, 165, 166, 0.2);
}

.more-tags {
  background: var(--accent-color);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 600;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.file-indicators {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.indicator {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.indicator .icon {
  font-size: 0.9rem;
}

.indicator .label {
  font-size: 0.75rem;
  color: var(--text-light);
  font-weight: 500;
}

.pdf-indicator .label {
  color: #e74c3c;
}

.solution-indicator .label {
  color: #27ae60;
}

.video-indicator .label {
  color: #8e44ad;
}

.creation-date {
  font-size: 0.75rem;
  color: var(--text-light);
  font-style: italic;
}

.trinomes-info {
  margin-top: 1rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.8rem;
}

.trinomes-label {
  color: var(--text-light);
  font-weight: 500;
}

.trinomes-list {
  color: var(--accent-color);
  font-weight: 600;
  margin-left: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .colle-card {
    padding: 1rem;
  }

  .card-header {
    flex-direction: column;
    gap: 0.8rem;
    align-items: flex-start;
  }

  .time-difficulty {
    flex-direction: column;
    gap: 0.4rem;
  }

  .file-indicators {
    gap: 0.5rem;
  }

  .card-footer {
    flex-direction: column;
    gap: 0.8rem;
    align-items: flex-start;
  }
}

/* Animation pour l'apparition */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.colle-card {
  animation: fadeInUp 0.5s ease-out;
}
</style>