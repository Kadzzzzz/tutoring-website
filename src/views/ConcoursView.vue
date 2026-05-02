<template>
  <div>
    <div class="page-header">
      <div class="container">
        <h1>Concours</h1>
        <p>Sujets écrits et oraux avec corrections</p>
      </div>
    </div>

    <div class="container" style="padding-top: 48px; padding-bottom: 80px;">
      <div class="filters">
        <div class="filter-group">
          <label>Type</label>
          <div class="btn-group">
            <button :class="['filter-btn', { active: activeType === '' }]" @click="activeType = ''">Tous</button>
            <button :class="['filter-btn', { active: activeType === 'ecrit_concours' }]" @click="activeType = 'ecrit_concours'">Écrits</button>
            <button :class="['filter-btn', { active: activeType === 'oral_concours' }]" @click="activeType = 'oral_concours'">Oraux</button>
          </div>
        </div>
        <div class="filter-group" v-if="availableBanks.length">
          <label>Concours</label>
          <div class="btn-group">
            <button :class="['filter-btn', { active: activeBank === '' }]" @click="activeBank = ''">Tous</button>
            <button v-for="b in availableBanks" :key="b"
              :class="['filter-btn', { active: activeBank === b }]"
              @click="activeBank = b">{{ b }}</button>
          </div>
        </div>
        <div class="filter-group" v-if="availableSubjects.length">
          <label>Matière</label>
          <div class="btn-group">
            <button :class="['filter-btn', { active: activeSubject === '' }]" @click="activeSubject = ''">Toutes</button>
            <button v-for="s in availableSubjects" :key="s.id"
              :class="['filter-btn', { active: activeSubject === String(s.id) }]"
              @click="activeSubject = String(s.id)">{{ s.name }}</button>
          </div>
        </div>
        <button v-if="activeType || activeSubject || activeBank"
          class="filter-btn filter-reset" @click="activeType = ''; activeSubject = ''; activeBank = ''">
          ✕ Réinitialiser
        </button>
      </div>

      <div v-if="loading" class="loading">Chargement...</div>

      <div v-else-if="grouped.length">
        <div v-for="group in grouped" :key="group.name" class="concours-section">
          <h2 class="concours-name">{{ group.name }}</h2>
          <div class="concours-grid">
            <div v-for="doc in group.items" :key="doc.id" class="concours-card"
              :style="{ '--color': doc.subject_color || '#3b82f6' }">
              <div class="concours-card-header">
                <div class="concours-tags">
                  <span class="type-badge" :class="doc.type">
                    {{ doc.type === 'ecrit_concours' ? 'Écrit' : 'Oral' }}
                  </span>
                  <span v-if="doc.subject_name" class="subject-badge"
                    :style="{ background: (doc.subject_color || '#3b82f6') + '20', color: doc.subject_color || '#3b82f6' }">
                    {{ doc.subject_name }}
                  </span>
                  <span v-if="doc.level" class="level-badge">{{ doc.level.toUpperCase() }}</span>
                </div>
                <span class="year-badge">{{ doc.concours_year }}</span>
              </div>
              <p class="doc-title-text">{{ doc.title }}</p>
              <div class="concours-actions">
                <a v-if="doc.pdf_statement_url" :href="pdfUrl(doc.pdf_statement_url)" target="_blank" class="btn btn-outline">📄 Sujet</a>
                <a v-if="doc.pdf_solution_url" :href="pdfUrl(doc.pdf_solution_url)" target="_blank" class="btn btn-primary">✅ Corrigé</a>
                <span v-else-if="!doc.pdf_solution_url" class="soon">Corrigé bientôt</span>
                <button v-if="doc.videos?.length" class="btn-video" @click="toggleVideos(doc.id)">
                  ▶ Vidéo{{ doc.videos.length > 1 ? 's' : '' }} ({{ doc.videos.length }})
                </button>
              </div>
              <div v-if="openVideos[doc.id]" class="video-list">
                <a v-for="v in doc.videos" :key="v.id" :href="v.url" target="_blank" class="video-item">
                  <span class="video-icon">▶</span>
                  <span>{{ v.title || 'Vidéo corrigée' }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <h3>Aucun concours disponible</h3>
        <p>Le contenu sera bientôt disponible.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { api } from '@/api.js'

const BASE_URL = import.meta.env.VITE_API_URL ?? ''
const docs = ref([])
const loading = ref(true)
const activeType    = ref('')
const activeSubject = ref('')
const activeBank    = ref('')
const openVideos = reactive({})

function toggleVideos(id) {
  openVideos[id] = !openVideos[id]
}

function pdfUrl(url) { return url?.startsWith('http') ? url : `${BASE_URL}${url}` }

const availableSubjects = computed(() => {
  const map = new Map()
  for (const d of docs.value) {
    if (d.subject_id && !map.has(d.subject_id))
      map.set(d.subject_id, { id: d.subject_id, name: d.subject_name })
  }
  return [...map.values()]
})

const availableBanks = computed(() => {
  const set = new Set()
  for (const d of docs.value) {
    if (d.concours_name) set.add(d.concours_name)
  }
  return [...set].sort()
})

const filtered = computed(() => docs.value.filter(d => {
  if (activeType.value    && d.type !== activeType.value) return false
  if (activeSubject.value && String(d.subject_id) !== activeSubject.value) return false
  if (activeBank.value    && d.concours_name !== activeBank.value) return false
  return true
}))

const grouped = computed(() => {
  const map = new Map()
  for (const d of filtered.value) {
    const key = d.concours_name || 'Autres'
    if (!map.has(key)) map.set(key, { name: key, items: [] })
    map.get(key).items.push(d)
  }
  return [...map.values()]
})

async function load() {
  loading.value = true
  try {
    docs.value = await api.getDocuments({ type: 'ecrit_concours,oral_concours' })
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

onMounted(load)
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #1e1b4b 60%, #312e81 100%);
  position: relative; overflow: hidden;
}
.page-header::before {
  content: '';
  position: absolute; top: -30px; right: 5%;
  width: 250px; height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%);
  pointer-events: none;
}
.page-header::after {
  content: '';
  position: absolute; bottom: -30px; left: 20%;
  width: 180px; height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
  pointer-events: none;
}

.filters { background: white; border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow); margin-bottom: 40px; display: flex; flex-wrap: wrap; gap: 24px; }
.filter-group label { display: block; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-light); margin-bottom: 8px; }
.btn-group { display: flex; flex-wrap: wrap; gap: 8px; }
.filter-btn { padding: 6px 16px; border-radius: 999px; font-size: 0.85rem; font-weight: 600; border: 2px solid var(--border); background: white; color: var(--text-light); cursor: pointer; transition: all 0.2s; }
.filter-btn:hover { border-color: var(--accent); color: var(--accent); }
.filter-btn.active { background: var(--accent); border-color: var(--accent); color: white; }
.filter-reset { border-color: transparent; color: var(--text-light); align-self: flex-end; }

.concours-section { margin-bottom: 48px; }
.concours-name { font-size: 1.3rem; border-bottom: 2px solid var(--border); padding-bottom: 12px; margin-bottom: 20px; }

.concours-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.concours-card { background: white; border-radius: var(--radius); padding: 20px; box-shadow: var(--shadow); border-top: 4px solid var(--color); }
.concours-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
.concours-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.type-badge { font-size: 0.75rem; font-weight: 700; padding: 3px 10px; border-radius: 6px; text-transform: uppercase; }
.type-badge.ecrit_concours { background: #dbeafe; color: #1d4ed8; }
.type-badge.oral_concours  { background: #fce7f3; color: #be185d; }
.subject-badge { font-size: 0.75rem; font-weight: 600; padding: 3px 10px; border-radius: 6px; }
.level-badge { font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: #f1f5f9; color: var(--text-light); }
.year-badge { font-size: 1rem; font-weight: 800; color: var(--text-light); white-space: nowrap; }
.doc-title-text { font-size: 0.9rem; font-weight: 500; color: var(--text); margin: 8px 0 14px; }
.concours-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.soon { font-size: 0.8rem; color: var(--text-light); font-style: italic; align-self: center; }
.btn-video { background: #7c3aed; color: white; border: none; padding: 6px 14px; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.btn-video:hover { background: #6d28d9; }
.video-list { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; border-top: 1px solid var(--border); padding-top: 12px; }
.video-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #7c3aed; font-weight: 600; text-decoration: none; padding: 4px 0; }
.video-item:hover { text-decoration: underline; }
.video-icon { font-size: 0.75rem; }
</style>
