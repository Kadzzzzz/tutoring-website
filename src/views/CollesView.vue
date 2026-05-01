<template>
  <div>
    <div class="page-header">
      <div class="container">
        <h1>Colles</h1>
        <p>Planches d'exercices par semaine</p>
      </div>
    </div>

    <div class="container" style="padding-top: 40px; padding-bottom: 80px;">
      <!-- Sélecteur de classe -->
      <div class="class-selector">
        <button
          v-for="c in classes" :key="c"
          :class="['class-btn', { active: activeClass === c }]"
          @click="activeClass = c">{{ c }}</button>
      </div>

      <div v-if="loading" class="loading">Chargement...</div>

      <div v-else-if="filteredColles.length">
        <div v-for="colle in filteredColles" :key="colle.id" class="week-block">
          <div class="week-header">
            <h2 class="week-title">Semaine {{ colle.week_number }}</h2>
            <span v-if="colle.week_date" class="week-date">{{ formatDate(colle.week_date) }}</span>
          </div>

          <!-- Programme PDF si disponible -->
          <a v-if="colle.programme_pdf_url"
            :href="pdfUrl(colle.programme_pdf_url)" target="_blank"
            class="programme-link">
            <i class="fas fa-list-alt"></i> Programme de la semaine
          </a>

          <!-- Planches -->
          <div v-if="colle.planches && colle.planches.length" class="planches-grid"
            :class="{ 'multi': colle.planches.length > 1 }">
            <div v-for="p in colle.planches" :key="p.id" class="planche-card">
              <div v-if="p.title" class="planche-title">{{ p.title }}</div>
              <div v-else class="planche-title">Planche {{ p.planche_number }}</div>
              <div class="planche-btns">
                <a v-if="p.pdf_statement_url"
                  :href="pdfUrl(p.pdf_statement_url)" target="_blank"
                  class="btn btn-outline">
                  <i class="fas fa-file-pdf"></i> Énoncé
                </a>
                <a v-if="p.pdf_solution_url"
                  :href="pdfUrl(p.pdf_solution_url)" target="_blank"
                  class="btn btn-primary">
                  <i class="fas fa-check-circle"></i> Corrigé
                </a>
                <span v-else class="soon">Corrigé bientôt</span>
              </div>
              <!-- Vidéos corrigées -->
              <div v-if="p.videos && p.videos.length" class="video-links">
                <a v-for="v in p.videos" :key="v.id"
                  :href="v.url" target="_blank"
                  class="video-btn">
                  <i class="fas fa-play-circle"></i>
                  {{ v.title || 'Vidéo corrigée' }}
                </a>
              </div>
            </div>
          </div>

          <p v-else class="no-planches">Planches en cours d'ajout...</p>
        </div>
      </div>

      <div v-else class="empty-state">
        <h3>Aucune colle disponible pour {{ activeClass }}</h3>
        <p>Le contenu sera bientôt disponible.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { api } from '@/api.js'

const BASE_URL = import.meta.env.VITE_API_URL ?? ''
function pdfUrl(url) { return url?.startsWith('http') ? url : `${BASE_URL}${url}` }
function formatDate(d) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const classes = ['MPSI', 'PCSI', 'MP', 'PC']
const activeClass = ref('MPSI')
const colles = ref([])
const loading = ref(true)

const filteredColles = computed(() =>
  colles.value
    .filter(c => c.class_name === activeClass.value)
    .sort((a, b) => a.week_number - b.week_number)
)

async function load() {
  loading.value = true
  try { colles.value = await api.getColles({}) }
  catch (e) { console.error(e) }
  finally { loading.value = false }
}

onMounted(load)
</script>

<style scoped>
/* Sélecteur de classe */
.class-selector {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.class-btn {
  padding: 10px 32px;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 700;
  border: 2px solid var(--border);
  background: white;
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.2s;
}
.class-btn:hover { border-color: var(--accent); color: var(--accent); }
.class-btn.active { background: var(--accent); border-color: var(--accent); color: white; }

/* Bloc semaine */
.week-block {
  background: white;
  border-radius: var(--radius);
  padding: 24px 28px;
  box-shadow: var(--shadow);
  margin-bottom: 20px;
}

.week-header {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 16px;
}

.week-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text);
  margin: 0;
}

.week-date {
  font-size: 0.85rem;
  color: var(--text-light);
}

.programme-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 14px;
  text-decoration: none;
}
.programme-link:hover { text-decoration: underline; }

/* Grille planches */
.planches-grid {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.planches-grid.multi .planche-card {
  flex: 1;
  min-width: 200px;
}

.planche-card {
  background: var(--bg);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  align-content: flex-start;
}

.planches-grid:not(.multi) .planche-card {
  flex: 1;
}

.planche-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  min-width: 80px;
}

.planche-btns {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-left: auto;
}

.soon {
  font-size: 0.8rem;
  color: var(--text-light);
  font-style: italic;
}

.video-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
  width: 100%;
}

.video-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: #f5f3ff;
  color: #7c3aed;
  border: 1px solid #ddd6fe;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}
.video-btn:hover { background: #ede9fe; color: #6d28d9; }

.no-planches {
  font-size: 0.9rem;
  color: var(--text-light);
  font-style: italic;
  margin: 0;
}

@media (max-width: 600px) {
  .planches-grid.multi { flex-direction: column; }
  .planche-card { flex-direction: column; align-items: flex-start; }
  .planche-btns { margin-left: 0; }
}
</style>
