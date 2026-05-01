<template>
  <div>
    <div class="page-header">
      <div class="container">
        <h1>Concours</h1>
        <p>Sujets écrits et oraux avec corrections</p>
      </div>
    </div>

    <div class="container" style="padding-top: 48px; padding-bottom: 80px;">
      <!-- Filtres -->
      <div class="filters">
        <div class="filter-group">
          <label>Type</label>
          <div class="btn-group">
            <button :class="['filter-btn', { active: activeType === '' }]" @click="activeType = ''">Tous</button>
            <button :class="['filter-btn', { active: activeType === 'ecrit' }]" @click="activeType = 'ecrit'">Écrits</button>
            <button :class="['filter-btn', { active: activeType === 'oral' }]" @click="activeType = 'oral'">Oraux</button>
          </div>
        </div>
        <div class="filter-group">
          <label>Matière</label>
          <div class="btn-group">
            <button :class="['filter-btn', { active: activeSubject === '' }]" @click="activeSubject = ''">Toutes</button>
            <button v-for="s in subjects" :key="s.id" :class="['filter-btn', { active: activeSubject === String(s.id) }]" @click="activeSubject = String(s.id)">{{ s.name }}</button>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading">Chargement...</div>

      <div v-else-if="filtered.length">
        <!-- Groupé par nom de concours -->
        <div v-for="group in groupedByName" :key="group.name" class="concours-section">
          <h2 class="concours-name">{{ group.name }}</h2>
          <div class="concours-grid">
            <div v-for="c in group.items" :key="c.id" class="concours-card" :style="{ '--color': c.subject_color || '#3b82f6' }">
              <div class="concours-card-header">
                <div class="concours-tags">
                  <span class="type-badge" :class="c.type">{{ c.type === 'ecrit' ? 'Écrit' : 'Oral' }}</span>
                  <span v-if="c.subject_name" class="subject-badge" :style="{ background: c.subject_color + '20', color: c.subject_color }">{{ c.subject_name }}</span>
                </div>
                <span class="year-badge">{{ c.year }}</span>
              </div>
              <p v-if="c.class_target" class="target">{{ c.class_target }}</p>
              <div class="concours-actions">
                <a v-if="c.pdf_url" :href="pdfUrl(c.pdf_url)" target="_blank" class="btn btn-outline">📄 Sujet</a>
                <a v-if="c.pdf_solution_url" :href="pdfUrl(c.pdf_solution_url)" target="_blank" class="btn btn-primary">✅ Corrigé</a>
                <span v-else class="soon">Corrigé bientôt</span>
                <button v-if="c.videos?.length" class="btn btn-video" @click="toggleVideos(c.id)">
                  ▶ Vidéo{{ c.videos.length > 1 ? 's' : '' }} ({{ c.videos.length }})
                </button>
              </div>
              <div v-if="openVideos.has(c.id)" class="video-list">
                <a v-for="v in c.videos" :key="v.id" :href="v.url" target="_blank" class="video-item">
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
import { ref, computed, onMounted } from 'vue'
import { api } from '@/api.js'

const BASE_URL = import.meta.env.VITE_API_URL ?? ''
const concours = ref([])
const loading = ref(true)
const activeType = ref('')
const activeSubject = ref('')
const openVideos = ref(new Set())

function toggleVideos(id) {
  const s = new Set(openVideos.value)
  s.has(id) ? s.delete(id) : s.add(id)
  openVideos.value = s
}

function pdfUrl(url) { return url?.startsWith('http') ? url : `${BASE_URL}${url}` }

const subjects = computed(() => {
  const map = new Map()
  for (const c of concours.value) {
    if (c.subject_id && !map.has(c.subject_id)) map.set(c.subject_id, { id: c.subject_id, name: c.subject_name })
  }
  return [...map.values()]
})

const filtered = computed(() => concours.value.filter(c => {
  if (activeType.value && c.type !== activeType.value) return false
  if (activeSubject.value && String(c.subject_id) !== activeSubject.value) return false
  return true
}))

const groupedByName = computed(() => {
  const map = new Map()
  for (const c of filtered.value) {
    if (!map.has(c.name)) map.set(c.name, { name: c.name, items: [] })
    map.get(c.name).items.push(c)
  }
  return [...map.values()]
})

async function load() {
  loading.value = true
  try {
    concours.value = await api.getConcours({})
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

onMounted(load)
</script>

<style scoped>
.filters { background: white; border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow); margin-bottom: 40px; display: flex; flex-wrap: wrap; gap: 24px; }
.filter-group label { display: block; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-light); margin-bottom: 8px; }
.btn-group { display: flex; flex-wrap: wrap; gap: 8px; }
.filter-btn { padding: 6px 16px; border-radius: 999px; font-size: 0.85rem; font-weight: 600; border: 2px solid var(--border); background: white; color: var(--text-light); cursor: pointer; transition: all 0.2s; }
.filter-btn:hover { border-color: var(--accent); color: var(--accent); }
.filter-btn.active { background: var(--accent); border-color: var(--accent); color: white; }

.concours-section { margin-bottom: 48px; }
.concours-name { font-size: 1.3rem; border-bottom: 2px solid var(--border); padding-bottom: 12px; margin-bottom: 20px; }

.concours-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.concours-card { background: white; border-radius: var(--radius); padding: 20px; box-shadow: var(--shadow); border-top: 4px solid var(--color); }
.concours-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.concours-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.type-badge { font-size: 0.75rem; font-weight: 700; padding: 3px 10px; border-radius: 6px; text-transform: uppercase; }
.type-badge.ecrit { background: #dbeafe; color: #1d4ed8; }
.type-badge.oral  { background: #fce7f3; color: #be185d; }
.subject-badge { font-size: 0.75rem; font-weight: 600; padding: 3px 10px; border-radius: 6px; }
.year-badge { font-size: 1rem; font-weight: 800; color: var(--text-light); }
.target { font-size: 0.85rem; color: var(--text-light); margin-bottom: 16px; }
.concours-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.soon { font-size: 0.8rem; color: var(--text-light); font-style: italic; align-self: center; }
.btn-video { background: #7c3aed; color: white; border: none; padding: 6px 14px; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.btn-video:hover { background: #6d28d9; }
.video-list { margin-top: 12px; display: flex; flex-direction: column; gap: 6px; border-top: 1px solid var(--border); padding-top: 12px; }
.video-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #7c3aed; font-weight: 600; text-decoration: none; padding: 4px 0; }
.video-item:hover { text-decoration: underline; }
.video-icon { font-size: 0.75rem; }
</style>
