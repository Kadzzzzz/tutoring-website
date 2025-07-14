<template>
  <div class="subject-filters">
    <button
      v-for="subject in subjectOptions"
      :key="subject.key"
      class="filter-btn"
      :class="{ active: activeSubject === subject.key }"
      @click="$emit('update:activeSubject', subject.key)"
    >
      <i :class="subject.icon"></i>
      {{ t(`resources.subjects.${subject.key}`) }}
    </button>
  </div>
</template>

<script setup>
import { useTranslations } from '@/composables/useTranslations.js'
import { useSubjects } from '@/composables/useSubjects.js'

const { t } = useTranslations()
const { subjectOptions } = useSubjects()

// Props
defineProps({
  activeSubject: {
    type: String,
    required: true
  }
})

// Emits
defineEmits(['update:activeSubject'])
</script>

<style scoped>
.subject-filters {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid var(--accent-color, #3498db);
  color: var(--accent-color, #3498db);
  background: none;
  transition: all var(--transition-speed, 0.3s);
  cursor: pointer;
  font-family: inherit;
}

.filter-btn.active,
.filter-btn:hover {
  background-color: var(--accent-color, #3498db);
  color: white;
}

.filter-btn i {
  margin-right: 8px;
}

@media (max-width: 768px) {
  .subject-filters {
    flex-direction: column;
    align-items: center;
  }

  .filter-btn {
    width: 200px;
  }
}
</style>