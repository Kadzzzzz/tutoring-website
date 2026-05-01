<template>
  <div>
    <div class="admin-header">
      <h1 class="page-title">Exercices & Concours</h1>
      <button class="btn btn-primary" @click="openForm(null)">+ Ajouter</button>
    </div>

    <div v-if="showForm" class="form-card">
      <h2>{{ editing ? 'Modifier' : 'Nouveau document' }}</h2>
      <form @submit.prevent="save" class="form-grid">

        <div class="field full">
          <label>Titre *</label>
          <input v-model="form.title" required placeholder="Ex: Diagonalisation — exercice 3" />
        </div>

        <!-- Chapitre + création inline -->
        <div class="field full">
          <label>Chapitre *</label>
          <div class="chapter-row">
            <select v-model="form.chapter_id" required class="chapter-select">
              <option value="">Choisir un chapitre</option>
              <optgroup v-for="s in subjectGroups" :key="s.name" :label="s.name">
                <option v-for="c in s.chapters" :key="c.id" :value="c.id">{{ c.name }}</option>
              </optgroup>
            </select>
            <button type="button" class="btn-add-ch" @click="showNewChapter = !showNewChapter" title="Créer un nouveau chapitre">＋</button>
          </div>
          <div v-if="showNewChapter" class="new-chapter-box">
            <span class="new-ch-label">Nouveau chapitre</span>
            <select v-model="newChapter.subject_id" required>
              <option value="">Matière</option>
              <option v-for="s in subjectsList" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
            <input v-model="newChapter.name" placeholder="Nom du chapitre" @input="autoSlug" />
            <input v-model="newChapter.slug" placeholder="slug" />
            <button type="button" class="btn btn-primary btn-sm" @click="createChapterInline">Créer</button>
            <button type="button" class="btn btn-ghost btn-sm" @click="showNewChapter = false">Annuler</button>
          </div>
        </div>

        <div class="field">
          <label>Type</label>
          <select v-model="form.type">
            <option value="exercice">Exercice</option>
            <option value="cours">Cours</option>
            <option value="methode">Méthode</option>
            <option value="interro">Interrogation</option>
            <option value="colle">Colle</option>
            <option value="ecrit_concours">Écrit concours</option>
            <option value="oral_concours">Oral concours</option>
          </select>
        </div>

        <div class="field">
          <label>Difficulté</label>
          <select v-model="form.difficulty">
            <option value="">—</option>
            <option value="facile">Facile</option>
            <option value="moyen">Moyen</option>
            <option value="difficile">Difficile</option>
          </select>
        </div>

        <!-- Champs concours (conditionnels) -->
        <template v-if="form.type === 'ecrit_concours' || form.type === 'oral_concours'">
          <div class="field">
            <label>Nom du concours</label>
            <input v-model="form.concours_name" placeholder="Ex: Mines-Ponts, CentraleSupélec…" />
          </div>
          <div class="field">
            <label>Année</label>
            <input v-model.number="form.concours_year" type="number" placeholder="2024" />
          </div>
        </template>

        <!-- Niveaux multi-sélection -->
        <div class="field full">
          <label>Niveau(x)</label>
          <div class="level-checks">
            <label v-for="l in levelOptions" :key="l.value" class="check-label">
              <input type="checkbox" :checked="levelArray.includes(l.value)" @change="toggleLevel(l.value)" />
              {{ l.label }}
            </label>
          </div>
        </div>

        <div class="field full">
          <label>Description</label>
          <textarea v-model="form.description" rows="2" placeholder="Courte description (optionnel)" />
        </div>

        <div class="field">
          <label>PDF Énoncé</label>
          <div class="upload-row">
            <input v-model="form.pdf_statement_url" placeholder="/uploads/pdfs/fichier.pdf" />
            <label class="upload-btn">
              📎 Upload
              <input type="file" accept=".pdf" @change="upload($event, 'pdf_statement_url')" hidden />
            </label>
          </div>
        </div>

        <div class="field">
          <label>PDF Corrigé</label>
          <div class="upload-row">
            <input v-model="form.pdf_solution_url" placeholder="/uploads/pdfs/fichier.pdf" />
            <label class="upload-btn">
              📎 Upload
              <input type="file" accept=".pdf" @change="upload($event, 'pdf_solution_url')" hidden />
            </label>
          </div>
        </div>

        <div class="field">
          <label class="checkbox-label">
            <input type="checkbox" v-model="form.is_published" />
            Publié (visible sur le site)
          </label>
        </div>

        <div class="form-actions full">
          <p v-if="formError" class="error">{{ formError }}</p>
          <button type="button" class="btn btn-ghost" @click="showForm = false">Annuler</button>
          <button type="submit" class="btn btn-primary" :disabled="saving">{{ saving ? 'Enregistrement...' : 'Enregistrer' }}</button>
        </div>
      </form>

      <VideoManager
        v-if="editing"
        entity-type="document"
        :entity-id="editing.id"
        :videos="editingVideos"
        @update="editingVideos = $event"
      />
    </div>

    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else class="docs-table">
      <div class="table-row header">
        <span>Titre</span><span>Chapitre</span><span>Type</span><span>Niveau</span><span>Actions</span>
      </div>
      <div v-for="doc in documents" :key="doc.id" class="table-row">
        <span class="doc-title">
          <span v-if="!doc.is_published" class="draft">brouillon</span>
          {{ doc.title }}
        </span>
        <span class="meta">{{ doc.chapter_name }}</span>
        <span class="meta">{{ typeLabel(doc.type) }}</span>
        <span class="meta">{{ doc.level || '—' }}</span>
        <div class="row-actions">
          <button class="action-edit" @click="openForm(doc)">Modifier</button>
          <button class="action-delete" @click="remove(doc.id)">Suppr.</button>
        </div>
      </div>
      <div v-if="!documents.length" class="empty-row">Aucun document. Ajoutez-en un ci-dessus.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { api } from '@/api.js'
import VideoManager from '@/components/admin/VideoManager.vue'

const documents = ref([])
const chapters = ref([])
const subjectsList = ref([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref(null)
const editingVideos = ref([])
const saving = ref(false)
const formError = ref('')

const showNewChapter = ref(false)
const newChapter = ref({ subject_id: '', name: '', slug: '' })

const levelOptions = [
  { value: 'terminale', label: 'Terminale' },
  { value: 'mpsi',      label: 'MPSI' },
  { value: 'pcsi',      label: 'PCSI' },
  { value: 'mp',        label: 'MP' },
  { value: 'pc',        label: 'PC' },
]

const typeLabels = {
  exercice: 'Exercice', cours: 'Cours', methode: 'Méthode',
  interro: 'Interro', colle: 'Colle',
  ecrit_concours: 'Écrit concours', oral_concours: 'Oral concours'
}
function typeLabel(t) { return typeLabels[t] || t }

const emptyForm = () => ({
  title: '', chapter_id: '', type: 'exercice', level: '', difficulty: '',
  description: '', pdf_statement_url: '', pdf_solution_url: '',
  is_published: true, concours_name: '', concours_year: new Date().getFullYear()
})

const form = ref(emptyForm())

const levelArray = computed({
  get: () => form.value.level ? form.value.level.split(',').filter(Boolean) : [],
  set: (arr) => { form.value.level = arr.join(',') }
})

function toggleLevel(val) {
  const arr = [...levelArray.value]
  const idx = arr.indexOf(val)
  if (idx >= 0) arr.splice(idx, 1)
  else arr.push(val)
  levelArray.value = arr
}

const subjectGroups = computed(() => {
  const map = new Map()
  for (const c of chapters.value) {
    if (!map.has(c.subject_name)) map.set(c.subject_name, { name: c.subject_name, chapters: [] })
    map.get(c.subject_name).chapters.push(c)
  }
  return [...map.values()]
})

function autoSlug() {
  newChapter.value.slug = newChapter.value.name
    .toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

async function createChapterInline() {
  if (!newChapter.value.subject_id || !newChapter.value.name) {
    formError.value = 'Matière et nom requis pour créer un chapitre'
    return
  }
  formError.value = ''
  try {
    const c = await api.createChapter(newChapter.value)
    chapters.value = await api.getAdminChapters()
    form.value.chapter_id = c.id
    showNewChapter.value = false
    newChapter.value = { subject_id: '', name: '', slug: '' }
  } catch (e) { formError.value = e.message }
}

async function load() {
  loading.value = true
  try {
    [documents.value, chapters.value, subjectsList.value] = await Promise.all([
      api.getAdminDocuments(), api.getAdminChapters(), api.getAdminSubjects()
    ])
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

async function openForm(doc) {
  editing.value = doc
  form.value = doc ? { ...doc, concours_name: doc.concours_name || '', concours_year: doc.concours_year || new Date().getFullYear() } : emptyForm()
  showForm.value = true
  formError.value = ''
  showNewChapter.value = false
  editingVideos.value = []
  if (doc) {
    try { editingVideos.value = await api.getContentVideos('document', doc.id) }
    catch (e) { console.error(e) }
  }
}

async function upload(event, field) {
  const file = event.target.files[0]
  if (!file) return
  try {
    const { url } = await api.uploadPdf(file)
    form.value[field] = url
  } catch (e) { formError.value = 'Erreur upload: ' + e.message }
}

async function save() {
  saving.value = true
  formError.value = ''
  try {
    if (editing.value) await api.updateDocument(editing.value.id, form.value)
    else await api.createDocument(form.value)
    showForm.value = false
    await load()
  } catch (e) { formError.value = e.message }
  finally { saving.value = false }
}

async function remove(id) {
  if (!confirm('Supprimer ce document ?')) return
  try { await api.deleteDocument(id); await load() }
  catch (e) { alert(e.message) }
}

onMounted(load)
</script>

<style scoped>
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.page-title { font-size: 1.8rem; color: var(--text); margin: 0; }

.form-card { background: white; border-radius: var(--radius); padding: 28px; box-shadow: var(--shadow); margin-bottom: 2rem; }
.form-card h2 { margin-bottom: 1.5rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field.full { grid-column: 1 / -1; }
label { font-size: 0.85rem; font-weight: 600; color: #374151; }
input, select, textarea { padding: 8px 12px; border: 2px solid var(--border); border-radius: 8px; font-size: 0.95rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
input:focus, select:focus, textarea:focus { border-color: var(--accent); }

.chapter-row { display: flex; gap: 8px; }
.chapter-select { flex: 1; }
.btn-add-ch { padding: 8px 14px; background: var(--accent); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: background 0.2s; flex-shrink: 0; }
.btn-add-ch:hover { background: #1d4ed8; }
.new-chapter-box { margin-top: 8px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.new-ch-label { font-size: 0.8rem; font-weight: 700; color: var(--accent); width: 100%; }
.new-chapter-box input, .new-chapter-box select { padding: 6px 10px; font-size: 0.9rem; }
.btn-sm { padding: 6px 14px; font-size: 0.85rem; }

.level-checks { display: flex; flex-wrap: wrap; gap: 12px; }
.check-label { display: flex; align-items: center; gap: 6px; font-size: 0.9rem; font-weight: 500; cursor: pointer; }
.check-label input[type="checkbox"] { width: 16px; height: 16px; cursor: pointer; accent-color: var(--accent); padding: 0; border: none; }

.checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; cursor: pointer; }
.checkbox-label input { width: auto; padding: 0; }
.upload-row { display: flex; gap: 8px; }
.upload-row input { flex: 1; }
.upload-btn { padding: 8px 12px; background: var(--bg); border: 2px solid var(--border); border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
.upload-btn:hover { border-color: var(--accent); color: var(--accent); }
.form-actions { display: flex; gap: 12px; justify-content: flex-end; align-items: center; padding-top: 8px; }
.error { color: #ef4444; font-size: 0.9rem; flex: 1; }

.docs-table { background: white; border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
.table-row { display: grid; grid-template-columns: 3fr 2fr 1fr 1fr auto; align-items: center; padding: 14px 20px; gap: 12px; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
.table-row.header { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-light); background: var(--bg); }
.doc-title { font-weight: 600; display: flex; align-items: center; gap: 8px; }
.draft { font-size: 0.7rem; background: #fef3c7; color: #d97706; padding: 2px 6px; border-radius: 4px; font-weight: 700; text-transform: uppercase; }
.meta { color: var(--text-light); }
.row-actions { display: flex; gap: 8px; }
.action-edit { font-size: 0.85rem; font-weight: 600; color: var(--accent); background: none; border: none; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: background 0.15s; }
.action-edit:hover { background: #dbeafe; }
.action-delete { font-size: 0.85rem; font-weight: 600; color: #ef4444; background: none; border: none; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: background 0.15s; }
.action-delete:hover { background: #fee2e2; }
.empty-row { padding: 40px; text-align: center; color: var(--text-light); }
</style>
