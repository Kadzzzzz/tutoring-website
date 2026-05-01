<template>
  <div>
    <div class="page-header">
      <div class="container">
        <h1>Colles</h1>
        <p>Planches d'exercices par semaine pour MPSI et PCSI</p>
      </div>
    </div>

    <div class="container" style="padding-top: 48px; padding-bottom: 80px;">
      <!-- Filtres -->
      <div class="filters">
        <div class="filter-group">
          <label>Classe</label>
          <div class="btn-group">
            <button v-for="c in classes" :key="c" :class="['filter-btn', { active: activeClass === c }]" @click="activeClass = c">{{ c }}</button>
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

      <div v-else-if="colles.length">
        <!-- Groupé par semaine -->
        <div v-for="week in weeks" :key="week" class="week-section">
          <h2 class="week-title">Semaine {{ week }}</h2>
          <div class="colles-grid">
            <div v-for="colle in collesByWeek(week)" :key="colle.id" class="colle-card" :style="{ '--color': colle.subject_color }">
              <div class="colle-header">
                <div class="colle-subject" :style="{ background: colle.subject_color }">{{ colle.subject_name }}</div>
                <span class="colle-class">{{ colle.class_name }}</span>
              </div>
              <div class="colle-info">
                <span v-if="colle.week_date">📅 {{ formatDate(colle.week_date) }}</span>
                <span v-if="colle.school">🏫 {{ colle.school }}</span>
              </div>
              <button class="expand-btn" @click="toggleColle(colle.id)">
                {{ expanded === colle.id ? 'Masquer les planches ▲' : `Voir les ${colle.planche_count} planche(s) ▼` }}
              </button>
              <div v-if="expanded === colle.id" class="planches">
                <div v-if="loadingPlanches" class="loading-sm">Chargement...</div>
                <div v-else>
                  <a v-if="currentColle?.programme_pdf_url" :href="pdfUrl(currentColle.programme_pdf_url)" target="_blank" class="planche-row programme">
                    📋 Programme
                  </a>
                  <div v-for="p in currentColle?.planches" :key="p.id" class="planche-row">
                    <span>Planche {{ p.planche_number }}{{ p.title ? ` — ${p.title}` : '' }}</span>
                    <div class="planche-btns">
                      <a v-if="p.pdf_statement_url" :href="pdfUrl(p.pdf_statement_url)" target="_blank" class="btn btn-outline">Énoncé</a>
                      <a v-if="p.pdf_solution_url" :href="pdfUrl(p.pdf_solution_url)" target="_blank" class="btn btn-primary">Corrigé</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <h3>Aucune colle disponible</h3>
        <p>Le contenu sera bientôt disponible pour cette sélection.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { api } from '@/api.js'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const colles = ref([])
const subjects = ref([])
const loading = ref(true)
const activeClass = ref('MPSI')
const activeSubject = ref('')
const expanded = ref(null)
const currentColle = ref(null)
const loadingPlanches = ref(false)

const classes = ['MPSI', 'PCSI', 'MP', 'PC']

function pdfUrl(url) { return url?.startsWith('http') ? url : `${BASE_URL}${url}` }
function formatDate(d) { return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) }

const filtered = computed(() => colles.value.filter(c => {
  if (activeClass.value && c.class_name !== activeClass.value) return false
  if (activeSubject.value && String(c.subject_id) !== activeSubject.value) return false
  return true
}))

const weeks = computed(() => [...new Set(filtered.value.map(c => c.week_number))].sort((a, b) => a - b))
function collesByWeek(w) { return filtered.value.filter(c => c.week_number === w) }

async function toggleColle(id) {
  if (expanded.value === id) { expanded.value = null; currentColle.value = null; return }
  expanded.value = id
  loadingPlanches.value = true
  try { currentColle.value = await api.getColle(id) }
  catch (e) { console.error(e) }
  finally { loadingPlanches.value = false }
}

async function load() {
  loading.value = true
  const params = {}
  if (activeSubject.value) params.subject_id = activeSubject.value
  try {
    [colles.value, subjects.value] = await Promise.all([api.getColles(params), api.getSubjects()])
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

onMounted(load)
watch([activeClass, activeSubject], () => { expanded.value = null; currentColle.value = null })
</script>

<style scoped>
.filters { background: white; border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow); margin-bottom: 40px; display: flex; flex-wrap: wrap; gap: 24px; }
.filter-group label { display: block; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-light); margin-bottom: 8px; }
.btn-group { display: flex; flex-wrap: wrap; gap: 8px; }
.filter-btn { padding: 6px 16px; border-radius: 999px; font-size: 0.85rem; font-weight: 600; border: 2px solid var(--border); background: white; color: var(--text-light); cursor: pointer; transition: all 0.2s; }
.filter-btn:hover { border-color: var(--accent); color: var(--accent); }
.filter-btn.active { background: var(--accent); border-color: var(--accent); color: white; }

.week-section { margin-bottom: 48px; }
.week-title { font-size: 1.1rem; font-weight: 700; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid var(--border); padding-bottom: 12px; margin-bottom: 20px; }

.colles-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }

.colle-card { background: white; border-radius: var(--radius); padding: 20px; box-shadow: var(--shadow); border-top: 4px solid var(--color, #3b82f6); }
.colle-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.colle-subject { color: white; font-size: 0.8rem; font-weight: 700; padding: 3px 10px; border-radius: 6px; }
.colle-class { font-size: 0.85rem; font-weight: 600; color: var(--text-light); }
.colle-info { display: flex; flex-wrap: wrap; gap: 12px; font-size: 0.85rem; color: var(--text-light); margin-bottom: 16px; }

.expand-btn { width: 100%; padding: 8px; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; font-size: 0.85rem; font-weight: 600; color: var(--accent); cursor: pointer; transition: all 0.2s; }
.expand-btn:hover { background: var(--accent); color: white; border-color: var(--accent); }

.planches { margin-top: 16px; border-top: 1px solid var(--border); padding-top: 16px; display: flex; flex-direction: column; gap: 8px; }
.loading-sm { text-align: center; padding: 12px; color: var(--text-light); font-size: 0.9rem; }

.planche-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 10px 12px; background: var(--bg); border-radius: 8px; font-size: 0.9rem; text-decoration: none; color: var(--text); }
.planche-row.programme { font-weight: 600; color: var(--accent); }
.planche-btns { display: flex; gap: 6px; }
</style>
