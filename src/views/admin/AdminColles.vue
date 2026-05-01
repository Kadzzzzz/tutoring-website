<template>
  <div>
    <div class="admin-header">
      <h1 class="page-title">Colles</h1>
    </div>

    <!-- Sélecteur de classe -->
    <div class="class-tabs">
      <button v-for="c in classes" :key="c"
        :class="['class-tab', { active: activeClass === c }]"
        @click="activeClass = c">{{ c }}</button>
    </div>

    <!-- Grille des semaines -->
    <div class="weeks-grid">
      <div v-for="w in totalWeeks" :key="w"
        :class="['week-cell', weekStatus(w)]"
        @click="openWeek(w)">
        <span class="week-num">S{{ w }}</span>
        <span class="week-dot"></span>
        <span v-if="getColle(w)" class="week-count">{{ getColle(w).planche_count }} planche{{ getColle(w).planche_count > 1 ? 's' : '' }}</span>
        <span v-else class="week-empty">vide</span>
      </div>
    </div>

    <!-- Formulaire de saisie rapide -->
    <div v-if="editingWeek !== null" class="quick-form-card">
      <div class="quick-form-header">
        <h2>{{ activeClass }} — Semaine {{ editingWeek }}</h2>
        <button class="close-btn" @click="editingWeek = null">✕</button>
      </div>

      <!-- Planches existantes -->
      <div v-if="existingPlanches.length" class="existing-planches">
        <h3>Planches existantes</h3>
        <div v-for="p in existingPlanches" :key="p.id" class="existing-planche-block">
          <div class="existing-planche-row">
            <span class="p-label">P{{ p.planche_number }}{{ p.title ? ` — ${p.title}` : '' }}</span>
            <div class="p-links">
              <a v-if="p.pdf_statement_url" :href="pdfUrl(p.pdf_statement_url)" target="_blank" class="p-link">Énoncé</a>
              <a v-if="p.pdf_solution_url" :href="pdfUrl(p.pdf_solution_url)" target="_blank" class="p-link">Corrigé</a>
            </div>
            <button class="video-toggle-btn" @click="toggleVideos(p.id)">
              ▶ Vidéos {{ p.videos?.length ? `(${p.videos.length})` : '' }}
            </button>
            <button class="del-btn" @click="deletePlanche(p.id)">✕</button>
          </div>

          <!-- Gestion des vidéos -->
          <div v-if="openVideoPanel === p.id" class="video-panel">
            <div v-for="v in p.videos" :key="v.id" class="video-row">
              <i class="fas fa-play-circle video-icon"></i>
              <span class="video-title">{{ v.title || 'Vidéo corrigée' }}</span>
              <a :href="v.url" target="_blank" class="p-link">Voir</a>
              <button class="del-btn" @click="removeVideo(p, v.id)">✕</button>
            </div>
            <div v-if="!p.videos?.length" class="no-videos">Aucune vidéo pour cette planche.</div>
            <div class="add-video-row">
              <input v-model="newVideo.title" placeholder="Titre (ex: Exercice 1)" class="video-input" />
              <input v-model="newVideo.url" placeholder="URL YouTube / Vimeo..." class="video-input video-url" />
              <button class="btn btn-primary" style="font-size:0.85rem;padding:6px 14px" @click="addVideo(p)">Ajouter</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Nouvelles planches à ajouter -->
      <h3>{{ existingPlanches.length ? 'Ajouter des planches' : 'Planches' }}</h3>

      <div v-for="(p, i) in newPlanches" :key="i" class="planche-entry">
        <div class="planche-entry-header">
          <span class="planche-num">Planche {{ i + 1 }}</span>
          <input v-model="p.title" placeholder="Titre (ex: Option PC, Option PSI)" class="title-input" />
          <button v-if="newPlanches.length > 1" class="del-btn" @click="newPlanches.splice(i, 1)">✕</button>
        </div>
        <div class="upload-pair">
          <div class="upload-field">
            <label>Énoncé</label>
            <div class="upload-row">
              <span v-if="p.pdf_statement_url" class="file-ok">✓ Chargé</span>
              <span v-else class="file-none">Aucun</span>
              <label class="upload-btn">
                {{ uploadingField === `stmt_${i}` ? 'Upload...' : '📎 Upload' }}
                <input type="file" accept=".pdf" @change="uploadFile($event, i, 'pdf_statement_url')" hidden />
              </label>
            </div>
          </div>
          <div class="upload-field">
            <label>Corrigé</label>
            <div class="upload-row">
              <span v-if="p.pdf_solution_url" class="file-ok">✓ Chargé</span>
              <span v-else class="file-none">Aucun</span>
              <label class="upload-btn">
                {{ uploadingField === `sol_${i}` ? 'Upload...' : '📎 Upload' }}
                <input type="file" accept=".pdf" @change="uploadFile($event, i, 'pdf_solution_url')" hidden />
              </label>
            </div>
          </div>
        </div>
      </div>

      <button class="add-planche-btn" @click="addPlancheSlot">+ Ajouter une planche</button>

      <p v-if="formError" class="error">{{ formError }}</p>

      <div class="form-actions">
        <button class="btn btn-ghost" @click="editingWeek = null">Annuler</button>
        <button class="btn btn-outline" @click="save(false)" :disabled="saving">
          {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
        </button>
        <button class="btn btn-primary" @click="save(true)" :disabled="saving">
          {{ saving ? '...' : 'Enregistrer + Semaine suivante →' }}
        </button>
      </div>
    </div>

    <!-- Liste complète -->
    <div class="colles-list-section">
      <h2>Toutes les colles — {{ activeClass }}</h2>
      <div v-if="loading" class="loading">Chargement...</div>
      <div v-else-if="!filteredColles.length" class="empty-msg">Aucune colle pour {{ activeClass }}.</div>
      <div v-else class="colles-table">
        <div v-for="c in filteredColles" :key="c.id" class="colle-row">
          <span class="colle-week">Semaine {{ c.week_number }}</span>
          <span class="colle-count">{{ c.planche_count }} planche{{ c.planche_count > 1 ? 's' : '' }}</span>
          <div class="row-actions">
            <button class="action-edit" @click="openWeek(c.week_number)">Modifier</button>
            <button class="action-delete" @click="deleteColle(c.id)">Suppr.</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { api } from '@/api.js'

const BASE_URL = import.meta.env.VITE_API_URL ?? ''
function pdfUrl(url) { return url?.startsWith('http') ? url : `${BASE_URL}${url}` }

const classes = ['MPSI', 'PCSI', 'MP', 'PC']
const activeClass = ref('MPSI')
const colles = ref([])
const loading = ref(true)
const editingWeek = ref(null)
const existingPlanches = ref([])
const newPlanches = ref([])
const saving = ref(false)
const formError = ref('')
const uploadingField = ref('')
const openVideoPanel = ref(null)
const newVideo = ref({ title: '', url: '' })

const filteredColles = computed(() =>
  colles.value.filter(c => c.class_name === activeClass.value)
    .sort((a, b) => a.week_number - b.week_number)
)

const totalWeeks = computed(() => {
  const max = filteredColles.value.reduce((m, c) => Math.max(m, c.week_number), 0)
  return Math.max(25, max + 3)
})

function getColle(week) {
  return filteredColles.value.find(c => c.week_number === week)
}

function weekStatus(week) {
  const c = getColle(week)
  if (!c) return 'empty'
  if (c.planche_count === 0) return 'created'
  return 'done'
}

async function load() {
  loading.value = true
  try { colles.value = await api.getColles({}) }
  catch (e) { console.error(e) }
  finally { loading.value = false }
}

async function openWeek(week) {
  editingWeek.value = week
  formError.value = ''
  openVideoPanel.value = null
  newVideo.value = { title: '', url: '' }
  newPlanches.value = [{ title: '', pdf_statement_url: '', pdf_solution_url: '' }]
  const existing = getColle(week)
  if (existing) {
    try {
      const data = await api.getColle(existing.id)
      existingPlanches.value = data.planches || []
    } catch (e) { existingPlanches.value = [] }
  } else {
    existingPlanches.value = []
  }
}

function addPlancheSlot() {
  newPlanches.value.push({ title: '', pdf_statement_url: '', pdf_solution_url: '' })
}

async function uploadFile(event, index, field) {
  const file = event.target.files[0]
  if (!file) return
  const key = field === 'pdf_statement_url' ? `stmt_${index}` : `sol_${index}`
  uploadingField.value = key
  try {
    const { url } = await api.uploadPdf(file)
    newPlanches.value[index][field] = url
  } catch (e) {
    formError.value = 'Erreur upload : ' + e.message
  } finally {
    uploadingField.value = ''
  }
}

async function save(goNext) {
  const toAdd = newPlanches.value.filter(p => p.pdf_statement_url || p.pdf_solution_url)
  if (!toAdd.length) { formError.value = 'Uploadez au moins un PDF avant d\'enregistrer.'; return }

  saving.value = true
  formError.value = ''
  try {
    const planches = toAdd.map((p, i) => ({
      planche_number: (existingPlanches.value.length || 0) + i + 1,
      title: p.title,
      pdf_statement_url: p.pdf_statement_url,
      pdf_solution_url: p.pdf_solution_url
    }))
    await api.quickSaveColle({ class_name: activeClass.value, week_number: editingWeek.value, planches })
    await load()
    if (goNext) {
      const next = editingWeek.value + 1
      editingWeek.value = null
      if (next <= 25) openWeek(next)
    } else {
      editingWeek.value = null
    }
  } catch (e) {
    formError.value = e.message
  } finally {
    saving.value = false
  }
}

function toggleVideos(plancheId) {
  openVideoPanel.value = openVideoPanel.value === plancheId ? null : plancheId
  newVideo.value = { title: '', url: '' }
}

async function addVideo(planche) {
  if (!newVideo.value.url.trim()) { alert('Entrez une URL de vidéo.'); return }
  try {
    const v = await api.addPlancheVideo(planche.id, {
      title: newVideo.value.title,
      url: newVideo.value.url,
      order_index: (planche.videos?.length || 0)
    })
    if (!planche.videos) planche.videos = []
    planche.videos.push(v)
    newVideo.value = { title: '', url: '' }
  } catch (e) { alert(e.message) }
}

async function removeVideo(planche, videoId) {
  if (!confirm('Supprimer cette vidéo ?')) return
  try {
    await api.deleteVideo(videoId)
    planche.videos = planche.videos.filter(v => v.id !== videoId)
  } catch (e) { alert(e.message) }
}

async function deletePlanche(id) {
  if (!confirm('Supprimer cette planche ?')) return
  try {
    await api.deletePlanche(id)
    const existing = getColle(editingWeek.value)
    if (existing) {
      const data = await api.getColle(existing.id)
      existingPlanches.value = data.planches || []
    }
    await load()
  } catch (e) { alert(e.message) }
}

async function deleteColle(id) {
  if (!confirm('Supprimer cette colle et toutes ses planches ?')) return
  try { await api.deleteColle(id); await load() }
  catch (e) { alert(e.message) }
}

watch(activeClass, () => { editingWeek.value = null })
onMounted(load)
</script>

<style scoped>
.admin-header { margin-bottom: 1.5rem; }
.page-title { font-size: 1.8rem; color: var(--text); margin: 0; }

.class-tabs { display: flex; gap: 8px; margin-bottom: 1.5rem; }
.class-tab {
  padding: 8px 24px; border-radius: 8px; font-weight: 700; font-size: 0.95rem;
  border: 2px solid var(--border); background: white; color: var(--text-light); cursor: pointer; transition: all 0.2s;
}
.class-tab:hover { border-color: var(--accent); color: var(--accent); }
.class-tab.active { background: var(--accent); border-color: var(--accent); color: white; }

/* Grille des 25 semaines */
.weeks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 10px;
  margin-bottom: 2rem;
}
.week-cell {
  background: white; border-radius: 10px; padding: 12px 8px;
  text-align: center; cursor: pointer; border: 2px solid var(--border);
  transition: all 0.2s; display: flex; flex-direction: column; align-items: center; gap: 4px;
}
.week-cell:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.week-cell.done { border-color: #10b981; background: #f0fdf4; }
.week-cell.created { border-color: #f59e0b; background: #fffbeb; }
.week-cell.empty { border-style: dashed; }
.week-num { font-size: 1rem; font-weight: 800; color: var(--text); }
.week-dot { width: 8px; height: 8px; border-radius: 50%; background: #d1d5db; }
.week-cell.done .week-dot { background: #10b981; }
.week-cell.created .week-dot { background: #f59e0b; }
.week-count { font-size: 0.7rem; color: #10b981; font-weight: 600; }
.week-empty { font-size: 0.7rem; color: #9ca3af; }

/* Formulaire rapide */
.quick-form-card {
  background: white; border-radius: var(--radius); padding: 28px;
  box-shadow: var(--shadow); margin-bottom: 2rem;
}
.quick-form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.quick-form-header h2 { margin: 0; font-size: 1.3rem; }
.close-btn { background: none; border: none; font-size: 1.2rem; color: var(--text-light); cursor: pointer; padding: 4px 8px; border-radius: 4px; }
.close-btn:hover { background: var(--bg); }

.existing-planches { margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 2px solid var(--border); }
.existing-planches h3 { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-light); margin-bottom: 10px; }
.existing-planche-block { border-bottom: 1px solid var(--bg); }
.existing-planche-row { display: flex; align-items: center; gap: 12px; padding: 8px 0; font-size: 0.9rem; }
.p-label { font-weight: 600; flex: 1; }
.p-links { display: flex; gap: 8px; }
.p-link { font-size: 0.8rem; color: var(--accent); font-weight: 600; }

.video-toggle-btn {
  font-size: 0.8rem; font-weight: 600; color: #7c3aed;
  background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 6px;
  padding: 4px 10px; cursor: pointer; transition: all 0.2s; white-space: nowrap;
}
.video-toggle-btn:hover { background: #ede9fe; }

.video-panel {
  background: #fafafa; border-radius: 8px; padding: 12px 14px;
  margin: 0 0 8px 0; border: 1px solid var(--border);
}
.video-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; border-bottom: 1px solid #f0f0f0; font-size: 0.85rem; }
.video-icon { color: #7c3aed; font-size: 1rem; }
.video-title { flex: 1; font-weight: 500; }
.no-videos { font-size: 0.85rem; color: var(--text-light); padding: 6px 0; font-style: italic; }
.add-video-row { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
.video-input { padding: 6px 10px; border: 2px solid var(--border); border-radius: 6px; font-size: 0.85rem; font-family: inherit; }
.video-input:focus { outline: none; border-color: #7c3aed; }
.video-url { flex: 1; min-width: 200px; }

h3 { font-size: 1rem; font-weight: 700; margin-bottom: 1rem; color: var(--text); }

.planche-entry {
  background: var(--bg); border-radius: 10px; padding: 16px;
  margin-bottom: 12px; border: 1px solid var(--border);
}
.planche-entry-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.planche-num { font-weight: 700; font-size: 0.9rem; color: var(--accent); white-space: nowrap; }
.title-input { flex: 1; padding: 6px 10px; border: 2px solid var(--border); border-radius: 6px; font-size: 0.9rem; font-family: inherit; }
.title-input:focus { outline: none; border-color: var(--accent); }

.upload-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.upload-field label { display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-light); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em; }
.upload-row { display: flex; align-items: center; gap: 8px; }
.file-ok { font-size: 0.85rem; color: #10b981; font-weight: 600; flex: 1; }
.file-none { font-size: 0.85rem; color: #9ca3af; flex: 1; }
.upload-btn {
  padding: 7px 14px; background: white; border: 2px solid var(--border);
  border-radius: 8px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; white-space: nowrap;
}
.upload-btn:hover { border-color: var(--accent); color: var(--accent); }

.add-planche-btn {
  background: none; border: 2px dashed var(--border); border-radius: 8px;
  padding: 10px 20px; font-size: 0.9rem; font-weight: 600; color: var(--accent);
  cursor: pointer; width: 100%; transition: all 0.2s; margin-bottom: 1rem;
}
.add-planche-btn:hover { border-color: var(--accent); background: #eff6ff; }

.del-btn { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1rem; padding: 4px 8px; border-radius: 4px; }
.del-btn:hover { background: #fee2e2; }
.error { color: #ef4444; font-size: 0.9rem; margin-bottom: 8px; }

.form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px; }

/* Liste colles */
.colles-list-section { margin-top: 2rem; }
.colles-list-section h2 { font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; color: var(--text); }
.empty-msg { text-align: center; padding: 30px; color: var(--text-light); }
.colles-table { background: white; border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
.colle-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid var(--border); gap: 12px; }
.colle-row:last-child { border-bottom: none; }
.colle-week { font-weight: 700; min-width: 100px; }
.colle-count { font-size: 0.85rem; color: var(--text-light); flex: 1; }
.row-actions { display: flex; gap: 8px; }
.action-edit { font-size: 0.85rem; font-weight: 600; color: var(--accent); background: none; border: none; cursor: pointer; padding: 6px 10px; border-radius: 4px; }
.action-edit:hover { background: #dbeafe; }
.action-delete { font-size: 0.85rem; font-weight: 600; color: #ef4444; background: none; border: none; cursor: pointer; padding: 6px 10px; border-radius: 4px; }
.action-delete:hover { background: #fee2e2; }

.loading { text-align: center; padding: 30px; color: var(--text-light); }
</style>
