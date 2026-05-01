<template>
  <div>
    <div class="page-header" :style="{ '--color': chapter?.subject_color || '#3b82f6' }">
      <div class="container">
        <div class="breadcrumb">
          <router-link to="/">Accueil</router-link>
          <span>/</span>
          <router-link :to="`/matieres/${chapter?.subject_slug}`">{{ chapter?.subject_name }}</router-link>
          <span>/</span>
          <span>{{ chapter?.name }}</span>
        </div>
        <h1>{{ chapter?.name || 'Chargement...' }}</h1>
        <p v-if="chapter">{{ filtered.length }} document{{ filtered.length > 1 ? 's' : '' }}</p>
      </div>
    </div>

    <div class="container" style="padding-top: 40px; padding-bottom: 80px;">
      <!-- Filtres -->
      <div class="filters" v-if="chapter">
        <button
          v-for="f in typeFilters" :key="f.value"
          class="filter-btn" :class="{ active: activeType === f.value }"
          @click="activeType = activeType === f.value ? '' : f.value"
        >{{ f.label }}</button>
        <button
          v-for="f in diffFilters" :key="f.value"
          class="filter-btn diff" :class="['diff-' + f.value, { active: activeDiff === f.value }]"
          @click="activeDiff = activeDiff === f.value ? '' : f.value"
        >{{ f.label }}</button>
        <button v-if="activeType || activeDiff" class="filter-btn reset" @click="resetFilters">✕ Réinitialiser</button>
      </div>

      <div v-if="loading" class="loading">Chargement...</div>

      <div v-else-if="filtered.length" class="docs-list">
        <div v-for="doc in filtered" :key="doc.id" class="doc-card">
          <div class="doc-main">
            <div class="doc-meta">
              <span class="type-tag">{{ typeLabel(doc.type) }}</span>
              <span v-if="doc.difficulty" :class="`badge badge-${doc.difficulty}`">{{ doc.difficulty }}</span>
              <span v-if="doc.level" class="level-tag">{{ doc.level }}</span>
            </div>
            <h3>{{ doc.title }}</h3>
            <p v-if="doc.description">{{ doc.description }}</p>
          </div>
          <div class="doc-actions">
            <a v-if="doc.pdf_statement_url" :href="pdfUrl(doc.pdf_statement_url)" target="_blank" class="btn btn-outline">
              📄 Énoncé
            </a>
            <a v-if="doc.pdf_solution_url" :href="pdfUrl(doc.pdf_solution_url)" target="_blank" class="btn btn-primary">
              ✅ Corrigé
            </a>
            <a v-if="doc.has_video && doc.video_url" :href="doc.video_url" target="_blank" class="btn btn-ghost">
              ▶ Vidéo
            </a>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <h3>Aucun document trouvé</h3>
        <p>Essayez de changer les filtres.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/api.js'

const BASE_URL = import.meta.env.VITE_API_URL ?? ''
const route = useRoute()
const chapter = ref(null)
const loading = ref(true)
const activeType = ref('')
const activeDiff = ref('')

const typeFilters = [
  { label: 'Exercices', value: 'exercice' },
  { label: 'Cours',     value: 'cours' },
  { label: 'Méthodes',  value: 'methode' },
  { label: 'Interros',  value: 'interro' },
]
const diffFilters = [
  { label: 'Facile',    value: 'facile' },
  { label: 'Moyen',     value: 'moyen' },
  { label: 'Difficile', value: 'difficile' },
]

const typeLabels = { exercice: 'Exercice', cours: 'Cours', methode: 'Méthode', interro: 'Interrogation', colle: 'Colle' }
function typeLabel(t) { return typeLabels[t] || t }
function pdfUrl(url) { return url?.startsWith('http') ? url : `${BASE_URL}${url}` }
function resetFilters() { activeType.value = ''; activeDiff.value = '' }

const filtered = computed(() => {
  if (!chapter.value?.documents) return []
  return chapter.value.documents.filter(d => {
    if (activeType.value && d.type !== activeType.value) return false
    if (activeDiff.value && d.difficulty !== activeDiff.value) return false
    return true
  })
})

async function load() {
  loading.value = true
  chapter.value = null
  try { chapter.value = await api.getChapter(route.params.id) }
  catch (e) { console.error(e) }
  finally { loading.value = false }
}

onMounted(load)
watch(() => route.params.id, load)
</script>

<style scoped>
.page-header { background: linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--color) 25%, var(--primary)) 100%); }

.filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
.filter-btn {
  padding: 6px 16px; border-radius: 999px; font-size: 0.85rem; font-weight: 600;
  border: 2px solid var(--border); background: white; color: var(--text-light); cursor: pointer; transition: all 0.2s;
}
.filter-btn:hover { border-color: var(--accent); color: var(--accent); }
.filter-btn.active { background: var(--accent); border-color: var(--accent); color: white; }
.filter-btn.diff-facile.active    { background: #16a34a; border-color: #16a34a; }
.filter-btn.diff-moyen.active     { background: #ca8a04; border-color: #ca8a04; }
.filter-btn.diff-difficile.active { background: #dc2626; border-color: #dc2626; }
.filter-btn.reset { border-color: transparent; color: var(--text-light); }

.docs-list { display: flex; flex-direction: column; gap: 16px; }

.doc-card {
  background: white; border-radius: var(--radius); padding: 24px 28px;
  box-shadow: var(--shadow); display: flex; justify-content: space-between;
  align-items: flex-start; gap: 20px; transition: box-shadow 0.2s;
}
.doc-card:hover { box-shadow: var(--shadow-lg); }
.doc-main { flex: 1; }
.doc-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
.type-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); }
.level-tag { font-size: 0.75rem; background: #f1f5f9; color: var(--text-light); padding: 2px 8px; border-radius: 4px; font-weight: 600; }
.doc-card h3 { font-size: 1rem; margin-bottom: 4px; }
.doc-card p { font-size: 0.9rem; color: var(--text-light); margin: 0; }
.doc-actions { display: flex; flex-direction: column; gap: 8px; min-width: 120px; }

@media (max-width: 600px) {
  .doc-card { flex-direction: column; }
  .doc-actions { flex-direction: row; flex-wrap: wrap; }
}
</style>
