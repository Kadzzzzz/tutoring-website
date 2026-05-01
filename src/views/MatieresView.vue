<template>
  <div>
    <div class="page-header">
      <div class="container">
        <h1>Matières</h1>
        <p>Exercices corrigés, méthodes et cours classés par chapitre</p>
      </div>
    </div>

    <div class="container" style="padding-top: 56px; padding-bottom: 80px;">
      <div v-if="loading" class="loading">Chargement...</div>

      <div v-else-if="subjects.length" class="subjects-grid">
        <router-link
          v-for="s in subjects" :key="s.id"
          :to="`/matieres/${s.slug}`"
          class="subject-card"
          :style="{ '--color': s.color }"
        >
          <div class="subject-icon-wrap">
            <i :class="subjectIcon(s.slug)"></i>
          </div>
          <div class="subject-info">
            <h3>{{ s.name }}</h3>
            <p>{{ s.chapter_count }} chapitre{{ s.chapter_count !== 1 ? 's' : '' }}</p>
          </div>
          <span class="subject-arrow"><i class="fas fa-arrow-right"></i></span>
        </router-link>
      </div>

      <div v-else class="empty-state">
        <h3>Aucune matière disponible</h3>
        <p>Le contenu sera bientôt disponible.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/api.js'

const subjects = ref([])
const loading  = ref(true)

const icons = {
  mathematiques: 'fas fa-square-root-alt',
  physique:      'fas fa-atom',
  chimie:        'fas fa-flask'
}
function subjectIcon(slug) { return icons[slug] || 'fas fa-book' }

onMounted(async () => {
  try { subjects.value = await api.getSubjects() }
  catch (e) { console.error(e) }
  finally { loading.value = false }
})
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #1e293b 60%, #0f172a 100%);
  position: relative; overflow: hidden;
}
.page-header::before {
  content: '';
  position: absolute; top: -40px; right: 8%;
  width: 280px; height: 280px; border-radius: 50%;
  background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%);
  pointer-events: none;
}

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.subject-card {
  background: white;
  border-radius: var(--radius);
  padding: 28px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: var(--text);
  border: 2px solid var(--border);
  box-shadow: var(--shadow);
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.subject-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 4px; height: 100%;
  background: var(--color, var(--accent));
  transition: width 0.2s ease;
}

.subject-card:hover {
  border-color: var(--color, var(--accent));
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  color: var(--text);
}

.subject-card:hover::before { width: 6px; }

.subject-icon-wrap {
  font-size: 2rem;
  color: var(--color, var(--accent));
  width: 52px; height: 52px;
  background: color-mix(in srgb, var(--color, var(--accent)) 12%, white);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.subject-info { flex: 1; }
.subject-card h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 3px; }
.subject-card p  { color: var(--text-light); font-size: 0.88rem; margin: 0; }

.subject-arrow {
  color: var(--color, var(--accent));
  font-size: 0.95rem;
  transition: transform 0.2s;
  flex-shrink: 0;
}
.subject-card:hover .subject-arrow { transform: translateX(5px); }

@media (max-width: 600px) {
  .subjects-grid { grid-template-columns: 1fr; }
}
</style>
