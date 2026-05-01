<template>
  <div>
    <div class="admin-header">
      <h1 class="page-title">Exercices</h1>
      <button class="btn btn-primary" @click="openForm(null)">+ Ajouter</button>
    </div>

    <!-- Formulaire -->
    <div v-if="showForm" class="form-card">
      <h2>{{ editing ? 'Modifier' : 'Nouvel exercice' }}</h2>
      <form @submit.prevent="save" class="form-grid">
        <div class="field full">
          <label>Titre *</label>
          <input v-model="form.title" required placeholder="Ex: Diagonalisation — exercice 3" />
        </div>
        <div class="field">
          <label>Chapitre *</label>
          <select v-model="form.chapter_id" required>
            <option value="">Choisir un chapitre</option>
            <optgroup v-for="s in subjectGroups" :key="s.name" :label="s.name">
              <option v-for="c in s.chapters" :key="c.id" :value="c.id">{{ c.name }}</option>
            </optgroup>
          </select>
        </div>
        <div class="field">
          <label>Type</label>
          <select v-model="form.type">
            <option value="exercice">Exercice</option>
            <option value="cours">Cours</option>
            <option value="methode">Méthode</option>
            <option value="interro">Interrogation</option>
            <option value="colle">Colle</option>
          </select>
        </div>
        <div class="field">
          <label>Niveau</label>
          <select v-model="form.level">
            <option value="">—</option>
            <option value="terminale">Terminale</option>
            <option value="mpsi">MPSI</option>
            <option value="pcsi">PCSI</option>
            <option value="mp">MP</option>
            <option value="pc">PC</option>
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

      <!-- Vidéos (seulement si modification) -->
      <VideoManager
        v-if="editing"
        entity-type="document"
        :entity-id="editing.id"
        :videos="editingVideos"
        @update="editingVideos = $event"
      />
    </div>

    <!-- Liste -->
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
        <span class="meta">{{ doc.type }}</span>
        <span class="meta">{{ doc.level || '—' }}</span>
        <div class="row-actions">
          <button class="action-edit" @click="openForm(doc)">Modifier</button>
          <button class="action-delete" @click="remove(doc.id)">Suppr.</button>
        </div>
      </div>
      <div v-if="!documents.length" class="empty-row">Aucun exercice. Ajoutez-en un ci-dessus.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '@/api.js'
import VideoManager from '@/components/admin/VideoManager.vue'

const documents = ref([])
const chapters = ref([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref(null)
const editingVideos = ref([])
const saving = ref(false)
const formError = ref('')

const emptyForm = () => ({
  title: '', chapter_id: '', type: 'exercice', level: '', difficulty: '',
  description: '', pdf_statement_url: '', pdf_solution_url: '',
  has_video: false, video_url: '', is_published: true
})

const form = ref(emptyForm())

const subjectGroups = computed(() => {
  const map = new Map()
  for (const c of chapters.value) {
    if (!map.has(c.subject_name)) map.set(c.subject_name, { name: c.subject_name, chapters: [] })
    map.get(c.subject_name).chapters.push(c)
  }
  return [...map.values()]
})

async function load() {
  loading.value = true
  try {
    [documents.value, chapters.value] = await Promise.all([api.getAdminDocuments(), api.getAdminChapters()])
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

async function openForm(doc) {
  editing.value = doc
  form.value = doc ? { ...doc } : emptyForm()
  showForm.value = true
  formError.value = ''
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
  if (!confirm('Supprimer cet exercice ?')) return
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
