<template>
  <div>
    <div class="admin-header">
      <h1 class="page-title">Concours</h1>
      <button class="btn btn-primary" @click="openForm(null)">+ Ajouter</button>
    </div>

    <div v-if="showForm" class="form-card">
      <h2>{{ editing ? 'Modifier' : 'Nouveau concours' }}</h2>
      <form @submit.prevent="save" class="form-grid">
        <div class="field">
          <label>Nom du concours *</label>
          <input v-model="form.name" required placeholder="Ex: Mines-Ponts" />
        </div>
        <div class="field">
          <label>Année *</label>
          <input v-model.number="form.year" type="number" required placeholder="2024" />
        </div>
        <div class="field">
          <label>Type *</label>
          <select v-model="form.type" required>
            <option value="ecrit">Écrit</option>
            <option value="oral">Oral</option>
          </select>
        </div>
        <div class="field">
          <label>Matière</label>
          <select v-model="form.subject_id">
            <option value="">—</option>
            <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
        </div>
        <div class="field">
          <label>Classes cibles</label>
          <input v-model="form.class_target" placeholder="Ex: MPSI, PCSI" />
        </div>
        <div class="field">
          <label>PDF Sujet</label>
          <div class="upload-row">
            <input v-model="form.pdf_url" placeholder="/uploads/pdfs/sujet.pdf" />
            <label class="upload-btn">📎<input type="file" accept=".pdf" @change="upload($event, 'pdf_url')" hidden /></label>
          </div>
        </div>
        <div class="field">
          <label>PDF Corrigé</label>
          <div class="upload-row">
            <input v-model="form.pdf_solution_url" placeholder="/uploads/pdfs/corrige.pdf" />
            <label class="upload-btn">📎<input type="file" accept=".pdf" @change="upload($event, 'pdf_solution_url')" hidden /></label>
          </div>
        </div>
        <div class="field">
          <label class="checkbox-label">
            <input type="checkbox" v-model="form.is_published" />
            Publié
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
        entity-type="concours"
        :entity-id="editing.id"
        :videos="editingVideos"
        @update="editingVideos = $event"
      />
    </div>

    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else class="concours-list">
      <div v-for="c in concours" :key="c.id" class="concours-row">
        <div class="concours-info">
          <span :class="['type-badge', c.type]">{{ c.type === 'ecrit' ? 'Écrit' : 'Oral' }}</span>
          <span class="concours-name">{{ c.name }} {{ c.year }}</span>
          <span v-if="c.subject_name" class="concours-subject">{{ c.subject_name }}</span>
          <span v-if="!c.is_published" class="draft">brouillon</span>
        </div>
        <div class="row-actions">
          <button class="action-edit" @click="openForm(c)">Modifier</button>
          <button class="action-delete" @click="remove(c.id)">Suppr.</button>
        </div>
      </div>
      <div v-if="!concours.length" class="empty-row">Aucun concours. Ajoutez-en un ci-dessus.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/api.js'
import VideoManager from '@/components/admin/VideoManager.vue'

const concours = ref([])
const subjects = ref([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref(null)
const editingVideos = ref([])
const saving = ref(false)
const formError = ref('')

const emptyForm = () => ({ name: '', year: new Date().getFullYear(), type: 'ecrit', subject_id: '', class_target: '', pdf_url: '', pdf_solution_url: '', is_published: true })
const form = ref(emptyForm())

async function load() {
  loading.value = true
  try {
    [concours.value, subjects.value] = await Promise.all([api.getAdminConcours(), api.getAdminSubjects()])
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

async function openForm(c) {
  editing.value = c
  form.value = c ? { ...c } : emptyForm()
  showForm.value = true
  formError.value = ''
  editingVideos.value = []
  if (c) {
    try { editingVideos.value = await api.getContentVideos('concours', c.id) }
    catch (e) { console.error(e) }
  }
}

async function upload(event, field) {
  const file = event.target.files[0]; if (!file) return
  try { const { url } = await api.uploadPdf(file); form.value[field] = url } catch (e) { formError.value = e.message }
}

async function save() {
  saving.value = true; formError.value = ''
  try {
    if (editing.value) await api.updateConcours(editing.value.id, form.value)
    else await api.createConcours(form.value)
    showForm.value = false; await load()
  } catch (e) { formError.value = e.message }
  finally { saving.value = false }
}

async function remove(id) {
  if (!confirm('Supprimer ce concours ?')) return
  try { await api.deleteConcours(id); await load() } catch (e) { alert(e.message) }
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
input, select { padding: 8px 12px; border: 2px solid var(--border); border-radius: 8px; font-size: 0.9rem; outline: none; font-family: inherit; }
input:focus, select:focus { border-color: var(--accent); }
.checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.checkbox-label input { width: auto; padding: 0; }
.upload-row { display: flex; gap: 8px; }
.upload-row input { flex: 1; }
.upload-btn { padding: 8px 12px; background: var(--bg); border: 2px solid var(--border); border-radius: 8px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
.upload-btn:hover { border-color: var(--accent); }
.form-actions { display: flex; gap: 12px; justify-content: flex-end; align-items: center; padding-top: 8px; }
.error { color: #ef4444; font-size: 0.9rem; flex: 1; }

.concours-list { background: white; border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
.concours-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid var(--border); gap: 12px; }
.concours-info { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.type-badge { font-size: 0.75rem; font-weight: 700; padding: 3px 10px; border-radius: 6px; text-transform: uppercase; }
.type-badge.ecrit { background: #dbeafe; color: #1d4ed8; }
.type-badge.oral  { background: #fce7f3; color: #be185d; }
.concours-name { font-weight: 600; }
.concours-subject { font-size: 0.85rem; color: var(--text-light); }
.draft { font-size: 0.7rem; background: #fef3c7; color: #d97706; padding: 2px 6px; border-radius: 4px; font-weight: 700; text-transform: uppercase; }
.row-actions { display: flex; gap: 8px; }
.action-edit { font-size: 0.85rem; font-weight: 600; color: var(--accent); background: none; border: none; cursor: pointer; padding: 6px 10px; border-radius: 4px; }
.action-edit:hover { background: #dbeafe; }
.action-delete { font-size: 0.85rem; font-weight: 600; color: #ef4444; background: none; border: none; cursor: pointer; padding: 6px 10px; border-radius: 4px; }
.action-delete:hover { background: #fee2e2; }
.empty-row { padding: 40px; text-align: center; color: var(--text-light); }
</style>
