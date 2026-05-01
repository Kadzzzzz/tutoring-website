<template>
  <div>
    <h1 class="page-title">Matières & Chapitres</h1>

    <!-- Matières -->
    <section class="section-block">
      <div class="section-header">
        <h2>Matières</h2>
        <button class="btn btn-primary" @click="openSubjectForm(null)">+ Ajouter</button>
      </div>

      <div v-if="showSubjectForm" class="form-card">
        <h3>{{ editSubject ? 'Modifier' : 'Nouvelle matière' }}</h3>
        <form @submit.prevent="saveSubject" class="inline-form">
          <input v-model="subjectForm.name" placeholder="Nom (ex: Mathématiques)" required />
          <input v-model="subjectForm.slug" placeholder="Slug (ex: mathematiques)" required />
          <input v-model="subjectForm.color" type="color" title="Couleur" />
          <button type="submit" class="btn btn-primary">{{ editSubject ? 'Modifier' : 'Ajouter' }}</button>
          <button type="button" class="btn btn-ghost" @click="showSubjectForm = false">Annuler</button>
        </form>
      </div>

      <div class="items-list">
        <div v-for="s in subjects" :key="s.id" class="item-row">
          <div class="item-color" :style="{ background: s.color }" />
          <div class="item-info">
            <span class="item-name">{{ s.name }}</span>
            <span class="item-slug">{{ s.slug }}</span>
          </div>
          <div class="item-actions">
            <button class="action-edit" @click="openSubjectForm(s)">Modifier</button>
            <button class="action-delete" @click="deleteSubject(s.id)">Suppr.</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapitres -->
    <section class="section-block">
      <div class="section-header">
        <h2>Chapitres</h2>
        <button class="btn btn-primary" @click="openChapterForm(null)">+ Ajouter</button>
      </div>

      <div v-if="showChapterForm" class="form-card">
        <h3>{{ editChapter ? 'Modifier' : 'Nouveau chapitre' }}</h3>
        <form @submit.prevent="saveChapter" class="inline-form">
          <select v-model="chapterForm.subject_id" required>
            <option value="">Matière</option>
            <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
          <input v-model="chapterForm.name" placeholder="Nom du chapitre" required />
          <input v-model="chapterForm.slug" placeholder="Slug" required />
          <input v-model.number="chapterForm.order_index" type="number" placeholder="Ordre" style="width: 80px" />
          <button type="submit" class="btn btn-primary">{{ editChapter ? 'Modifier' : 'Ajouter' }}</button>
          <button type="button" class="btn btn-ghost" @click="showChapterForm = false">Annuler</button>
        </form>
      </div>

      <div class="items-list">
        <div v-for="c in chapters" :key="c.id" class="item-row">
          <div class="item-info">
            <span class="item-name">{{ c.name }}</span>
            <span class="item-slug">{{ c.subject_name }} · ordre {{ c.order_index }}</span>
          </div>
          <div class="item-actions">
            <button class="action-edit" @click="openChapterForm(c)">Modifier</button>
            <button class="action-delete" @click="deleteChapter(c.id)">Suppr.</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { api } from '@/api.js'

const subjects = ref([])
const chapters = ref([])
const showSubjectForm = ref(false)
const showChapterForm = ref(false)
const editSubject = ref(null)
const editChapter = ref(null)
const subjectForm = ref({ name: '', slug: '', color: '#3b82f6' })
const chapterForm = ref({ subject_id: '', name: '', slug: '', order_index: 0 })

watch(() => chapterForm.value.name, (v) => {
  if (!editChapter.value) chapterForm.value.slug = v.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
})
watch(() => subjectForm.value.name, (v) => {
  if (!editSubject.value) subjectForm.value.slug = v.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
})

function openSubjectForm(s) {
  editSubject.value = s
  subjectForm.value = s ? { name: s.name, slug: s.slug, color: s.color } : { name: '', slug: '', color: '#3b82f6' }
  showSubjectForm.value = true
}
function openChapterForm(c) {
  editChapter.value = c
  chapterForm.value = c ? { subject_id: c.subject_id, name: c.name, slug: c.slug, order_index: c.order_index } : { subject_id: '', name: '', slug: '', order_index: 0 }
  showChapterForm.value = true
}

async function saveSubject() {
  try {
    if (editSubject.value) await api.updateSubject(editSubject.value.id, subjectForm.value)
    else await api.createSubject(subjectForm.value)
    showSubjectForm.value = false
    await load()
  } catch (e) { alert(e.message) }
}

async function saveChapter() {
  try {
    if (editChapter.value) await api.updateChapter(editChapter.value.id, chapterForm.value)
    else await api.createChapter(chapterForm.value)
    showChapterForm.value = false
    await load()
  } catch (e) { alert(e.message) }
}

async function deleteSubject(id) {
  if (!confirm('Supprimer cette matière ? Tous ses chapitres seront aussi supprimés.')) return
  try { await api.deleteSubject(id); await load() } catch (e) { alert(e.message) }
}

async function deleteChapter(id) {
  if (!confirm('Supprimer ce chapitre ?')) return
  try { await api.deleteChapter(id); await load() } catch (e) { alert(e.message) }
}

async function load() {
  try {
    [subjects.value, chapters.value] = await Promise.all([api.getAdminSubjects(), api.getAdminChapters()])
  } catch (e) { console.error(e) }
}

onMounted(load)
</script>

<style scoped>
.page-title { font-size: 1.8rem; margin-bottom: 2rem; }
.section-block { background: white; border-radius: var(--radius); box-shadow: var(--shadow); padding: 24px; margin-bottom: 24px; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.section-header h2 { font-size: 1.2rem; margin: 0; }
.form-card { background: var(--bg); border-radius: 8px; padding: 16px; margin-bottom: 16px; }
.form-card h3 { font-size: 1rem; margin-bottom: 12px; }
.inline-form { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.inline-form input, .inline-form select { padding: 8px 12px; border: 2px solid var(--border); border-radius: 8px; font-size: 0.9rem; outline: none; }
.inline-form input:focus, .inline-form select:focus { border-color: var(--accent); }
.items-list { display: flex; flex-direction: column; }
.item-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.item-row:last-child { border-bottom: none; }
.item-color { width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0; }
.item-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.item-name { font-weight: 600; font-size: 0.95rem; }
.item-slug { font-size: 0.8rem; color: var(--text-light); }
.item-actions { display: flex; gap: 8px; }
.action-edit { font-size: 0.85rem; font-weight: 600; color: var(--accent); background: none; border: none; cursor: pointer; padding: 4px 8px; border-radius: 4px; }
.action-edit:hover { background: #dbeafe; }
.action-delete { font-size: 0.85rem; font-weight: 600; color: #ef4444; background: none; border: none; cursor: pointer; padding: 4px 8px; border-radius: 4px; }
.action-delete:hover { background: #fee2e2; }
</style>
