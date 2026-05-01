<template>
  <div>
    <div class="admin-header">
      <h1 class="page-title">Colles</h1>
      <button class="btn btn-primary" @click="openForm(null)">+ Ajouter une colle</button>
    </div>

    <div v-if="showForm" class="form-card">
      <h2>{{ editing ? 'Modifier la colle' : 'Nouvelle colle' }}</h2>
      <form @submit.prevent="save" class="form-grid">
        <div class="field">
          <label>Matière *</label>
          <select v-model="form.subject_id" required>
            <option value="">Choisir</option>
            <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
        </div>
        <div class="field">
          <label>Classe *</label>
          <select v-model="form.class_name" required>
            <option value="MPSI">MPSI</option>
            <option value="PCSI">PCSI</option>
            <option value="MP">MP</option>
            <option value="PC">PC</option>
          </select>
        </div>
        <div class="field">
          <label>Semaine *</label>
          <input v-model.number="form.week_number" type="number" min="1" required />
        </div>
        <div class="field">
          <label>Date</label>
          <input v-model="form.week_date" type="date" />
        </div>
        <div class="field">
          <label>Établissement</label>
          <input v-model="form.school" placeholder="Ex: Lycée Jean Perrin" />
        </div>
        <div class="field">
          <label>Année scolaire</label>
          <input v-model="form.academic_year" placeholder="Ex: 2025-2026" />
        </div>
        <div class="field full">
          <label>PDF Programme</label>
          <div class="upload-row">
            <input v-model="form.programme_pdf_url" placeholder="/uploads/pdfs/programme.pdf" />
            <label class="upload-btn">📎 Upload<input type="file" accept=".pdf" @change="upload($event, 'programme_pdf_url')" hidden /></label>
          </div>
        </div>
        <div class="form-actions full">
          <p v-if="formError" class="error">{{ formError }}</p>
          <button type="button" class="btn btn-ghost" @click="showForm = false">Annuler</button>
          <button type="submit" class="btn btn-primary">{{ saving ? 'Enregistrement...' : 'Enregistrer' }}</button>
        </div>
      </form>

      <!-- Planches (si modification) -->
      <div v-if="editing" class="planches-section">
        <h3>Planches</h3>
        <div v-for="p in currentPlanches" :key="p.id" class="planche-row">
          <span>P{{ p.planche_number }}{{ p.title ? ` — ${p.title}` : '' }}</span>
          <div class="planche-links">
            <a v-if="p.pdf_statement_url" :href="p.pdf_statement_url" target="_blank" class="link-small">Énoncé</a>
            <a v-if="p.pdf_solution_url" :href="p.pdf_solution_url" target="_blank" class="link-small">Corrigé</a>
          </div>
          <button class="action-delete" @click="removePlanche(p.id)">✕</button>
        </div>

        <div class="add-planche">
          <h4>Ajouter une planche</h4>
          <div class="inline-form">
            <input v-model.number="newPlanche.planche_number" type="number" placeholder="N°" style="width:60px" />
            <input v-model="newPlanche.title" placeholder="Titre (optionnel)" style="flex:1" />
            <div class="upload-pair">
              <div class="upload-row">
                <input v-model="newPlanche.pdf_statement_url" placeholder="Énoncé URL" style="width:180px" />
                <label class="upload-btn">📎<input type="file" accept=".pdf" @change="uploadPlanche($event, 'pdf_statement_url')" hidden /></label>
              </div>
              <div class="upload-row">
                <input v-model="newPlanche.pdf_solution_url" placeholder="Corrigé URL" style="width:180px" />
                <label class="upload-btn">📎<input type="file" accept=".pdf" @change="uploadPlanche($event, 'pdf_solution_url')" hidden /></label>
              </div>
            </div>
            <button type="button" class="btn btn-primary" @click="addPlanche">Ajouter</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Liste -->
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else class="colles-list">
      <div v-for="c in colles" :key="c.id" class="colle-row">
        <div class="colle-info">
          <span class="colle-badge" :style="{ background: c.subject_color }">{{ c.subject_name }}</span>
          <span class="colle-text">{{ c.class_name }} — Semaine {{ c.week_number }}</span>
          <span class="colle-meta">{{ c.academic_year || '' }} {{ c.school || '' }}</span>
        </div>
        <div class="row-actions">
          <button class="action-edit" @click="openForm(c)">Modifier / Planches</button>
          <button class="action-delete" @click="remove(c.id)">Suppr.</button>
        </div>
      </div>
      <div v-if="!colles.length" class="empty-row">Aucune colle. Ajoutez-en une ci-dessus.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/api.js'

const colles = ref([])
const subjects = ref([])
const loading = ref(true)
const showForm = ref(false)
const editing = ref(null)
const saving = ref(false)
const formError = ref('')
const currentPlanches = ref([])
const newPlanche = ref({ planche_number: 1, title: '', pdf_statement_url: '', pdf_solution_url: '' })

const emptyForm = () => ({ subject_id: '', class_name: 'MPSI', week_number: 1, week_date: '', school: '', academic_year: '', programme_pdf_url: '' })
const form = ref(emptyForm())

async function load() {
  loading.value = true
  try {
    [colles.value, subjects.value] = await Promise.all([api.getColles({}), api.getAdminSubjects()])
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

async function openForm(c) {
  editing.value = c
  form.value = c ? { ...c } : emptyForm()
  currentPlanches.value = []
  showForm.value = true
  if (c) {
    try {
      const data = await api.getColle(c.id)
      currentPlanches.value = data.planches || []
    } catch (e) { console.error(e) }
  }
}

async function upload(event, field) {
  const file = event.target.files[0]; if (!file) return
  try { const { url } = await api.uploadPdf(file); form.value[field] = url } catch (e) { formError.value = e.message }
}

async function uploadPlanche(event, field) {
  const file = event.target.files[0]; if (!file) return
  try { const { url } = await api.uploadPdf(file); newPlanche.value[field] = url } catch (e) { alert(e.message) }
}

async function save() {
  saving.value = true; formError.value = ''
  try {
    if (editing.value) await api.updateColle(editing.value.id, form.value)
    else await api.createColle(form.value)
    showForm.value = false; await load()
  } catch (e) { formError.value = e.message }
  finally { saving.value = false }
}

async function addPlanche() {
  if (!editing.value) return
  try {
    const p = await api.createPlanche(editing.value.id, newPlanche.value)
    currentPlanches.value.push(p)
    newPlanche.value = { planche_number: (newPlanche.value.planche_number || 0) + 1, title: '', pdf_statement_url: '', pdf_solution_url: '' }
  } catch (e) { alert(e.message) }
}

async function removePlanche(id) {
  if (!confirm('Supprimer cette planche ?')) return
  try { await api.deletePlanche(id); currentPlanches.value = currentPlanches.value.filter(p => p.id !== id) } catch (e) { alert(e.message) }
}

async function remove(id) {
  if (!confirm('Supprimer cette colle et toutes ses planches ?')) return
  try { await api.deleteColle(id); await load() } catch (e) { alert(e.message) }
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
.upload-row { display: flex; gap: 8px; }
.upload-row input { flex: 1; }
.upload-btn { padding: 8px 12px; background: var(--bg); border: 2px solid var(--border); border-radius: 8px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
.upload-btn:hover { border-color: var(--accent); }
.form-actions { display: flex; gap: 12px; justify-content: flex-end; align-items: center; padding-top: 8px; }
.error { color: #ef4444; font-size: 0.9rem; flex: 1; }

.planches-section { border-top: 2px solid var(--border); margin-top: 24px; padding-top: 24px; }
.planches-section h3 { margin-bottom: 16px; }
.planche-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
.planche-links { display: flex; gap: 8px; margin-left: auto; }
.link-small { font-size: 0.8rem; color: var(--accent); font-weight: 600; }
.add-planche { margin-top: 16px; background: var(--bg); border-radius: 8px; padding: 16px; }
.add-planche h4 { font-size: 0.95rem; margin-bottom: 12px; }
.inline-form { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.upload-pair { display: flex; flex-direction: column; gap: 8px; }

.colles-list { background: white; border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
.colle-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border); gap: 12px; }
.colle-info { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.colle-badge { color: white; font-size: 0.75rem; font-weight: 700; padding: 3px 10px; border-radius: 6px; }
.colle-text { font-weight: 600; }
.colle-meta { font-size: 0.85rem; color: var(--text-light); }
.row-actions { display: flex; gap: 8px; }
.action-edit { font-size: 0.85rem; font-weight: 600; color: var(--accent); background: none; border: none; cursor: pointer; padding: 6px 10px; border-radius: 4px; }
.action-edit:hover { background: #dbeafe; }
.action-delete { font-size: 0.85rem; font-weight: 600; color: #ef4444; background: none; border: none; cursor: pointer; padding: 6px 10px; border-radius: 4px; }
.action-delete:hover { background: #fee2e2; }
.empty-row { padding: 40px; text-align: center; color: var(--text-light); }
</style>
