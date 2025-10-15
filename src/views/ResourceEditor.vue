<template>
  <div class="resource-editor">
    <div class="container">
      <header class="editor-header">
        <h1>Gestion des Ressources</h1>
        <p>Ajoutez, modifiez ou supprimez vos ressources pédagogiques</p>
      </header>

      <!-- Actions principales -->
      <div class="editor-actions">
        <button @click="showForm = true; editingResource = null" class="btn btn-primary">
          <i class="fas fa-plus"></i> Ajouter une ressource
        </button>
        <button @click="downloadIndexFile" class="btn btn-success" :disabled="!hasChanges">
          <i class="fas fa-download"></i> Télécharger index.js
        </button>
        <button @click="resetChanges" class="btn btn-secondary" :disabled="!hasChanges">
          <i class="fas fa-undo"></i> Annuler les modifications
        </button>
      </div>

      <!-- Notification -->
      <div v-if="notification" class="notification" :class="notification.type">
        <i :class="notification.icon"></i>
        <span>{{ notification.message }}</span>
        <button @click="notification = null" class="close-btn">&times;</button>
      </div>

      <!-- Statistiques -->
      <div class="stats-bar">
        <div class="stat">
          <strong>{{ localResources.length }}</strong>
          <span>ressources</span>
        </div>
        <div class="stat">
          <strong>{{ getSubjectCount('maths') }}</strong>
          <span>maths</span>
        </div>
        <div class="stat">
          <strong>{{ getSubjectCount('physics') }}</strong>
          <span>physique</span>
        </div>
        <div class="stat">
          <strong>{{ getSubjectCount('chemistry') }}</strong>
          <span>chimie</span>
        </div>
        <div class="stat warning" v-if="hasChanges">
          <i class="fas fa-exclamation-circle"></i>
          <span>Modifications non sauvegardées</span>
        </div>
      </div>

      <!-- Liste des ressources -->
      <ResourceList
        :resources="localResources"
        @edit="handleEdit"
        @delete="handleDelete"
      />

      <!-- Formulaire d'édition (Modal) -->
      <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
        <div class="modal-content">
          <ResourceForm
            :resource="editingResource"
            @save="handleSave"
            @cancel="closeForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { resources } from '@/data/resources'
import ResourceList from '@/components/editor/ResourceList.vue'
import ResourceForm from '@/components/editor/ResourceForm.vue'

// État
const localResources = ref([...resources])
const originalResources = ref([...resources])
const showForm = ref(false)
const editingResource = ref(null)
const notification = ref(null)

// Computed
const hasChanges = computed(() => {
  return JSON.stringify(localResources.value) !== JSON.stringify(originalResources.value)
})

// Méthodes
const getSubjectCount = (subject) => {
  return localResources.value.filter(r => r.subject === subject).length
}

const showNotification = (message, type = 'info') => {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-triangle',
    warning: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle'
  }

  notification.value = {
    message,
    type,
    icon: icons[type]
  }

  setTimeout(() => {
    notification.value = null
  }, 5000)
}

const handleEdit = (resource) => {
  editingResource.value = { ...resource }
  showForm.value = true
}

const handleDelete = (resourceId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
    localResources.value = localResources.value.filter(r => r.id !== resourceId)
    showNotification('Ressource supprimée', 'success')
  }
}

const handleSave = (resource) => {
  if (editingResource.value) {
    // Modification
    const index = localResources.value.findIndex(r => r.id === editingResource.value.id)
    if (index !== -1) {
      localResources.value[index] = resource
      showNotification('Ressource modifiée', 'success')
    }
  } else {
    // Ajout
    localResources.value.push(resource)
    showNotification('Ressource ajoutée', 'success')
  }
  closeForm()
}

const closeForm = () => {
  showForm.value = false
  editingResource.value = null
}

const resetChanges = () => {
  if (confirm('Annuler toutes les modifications ?')) {
    localResources.value = [...originalResources.value]
    showNotification('Modifications annulées', 'info')
  }
}

const downloadIndexFile = () => {
  const fileContent = generateIndexFile(localResources.value)
  const blob = new Blob([fileContent], { type: 'text/javascript' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'index.js'
  link.click()
  URL.revokeObjectURL(url)

  // Marquer comme sauvegardé
  originalResources.value = [...localResources.value]
  showNotification('Fichier index.js téléchargé !', 'success')
}

// À remplacer dans ResourceEditor.vue
// VERSION AVEC GUILLEMETS DOUBLES UNIQUEMENT

const generateIndexFile = (resources) => {
  const formatResource = (r, indent = "  ") => {
    const lines = []
    lines.push(`${indent}{`)

    // Fonction pour échapper les guillemets doubles et backslashes
    const escape = (text) => {
      if (!text) return ""
      return text
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t")
    }

    // Champs de base
    lines.push(`${indent}  id: "${r.id}",`)
    lines.push(`${indent}  subject: "${r.subject}",`)
    lines.push(`${indent}  levelKey: "${r.levelKey}",`)
    lines.push(`${indent}  typeKey: "${r.typeKey}",`)
    lines.push(`${indent}  duration: "${r.duration || ""}",`)
    lines.push(`${indent}  hasVideo: ${r.hasVideo || false},`)
    lines.push(`${indent}  videoUrl: "${r.videoUrl || ""}",`)
    lines.push(`${indent}  pdfStatement: "${r.pdfStatement || ""}",`)
    lines.push(`${indent}  pdfSolution: "${r.pdfSolution || ""}",`)

    if (r.difficulty) {
      lines.push(`${indent}  difficulty: "${r.difficulty}",`)
    }

    // Tags avec guillemets doubles
    const tagsStr = r.tags.map(t => `"${escape(t)}"`).join(", ")
    lines.push(`${indent}  tags: [${tagsStr}],`)

    lines.push(`${indent}  createdAt: "${r.createdAt}",`)

    // Textes avec échappement
    lines.push(`${indent}  title: "${escape(r.title)}",`)
    lines.push(`${indent}  description: "${escape(r.description)}",`)

    if (r.fullDescription) {
      lines.push(`${indent}  fullDescription: "${escape(r.fullDescription)}",`)
    }

    if (r.notes) {
      lines.push(`${indent}  notes: "${escape(r.notes)}",`)
    }

    if (r.showInResourcesPage === false) {
      lines.push(`${indent}  showInResourcesPage: false,`)
    }

    // Données de colle - CORRECTION ICI
    if (r.isColle && r.colleData) {
      lines.push(`${indent}  isColle: true,`)
      lines.push(`${indent}  colleData: {`)
      lines.push(`${indent}    school: "${r.colleData.school || ""}",`)
      lines.push(`${indent}    year: "${r.colleData.year || ""}",`)
      lines.push(`${indent}    class: "${r.colleData.class || ""}",`)
      lines.push(`${indent}    week: ${r.colleData.week || 0},`)
      lines.push(`${indent}    weekDate: "${r.colleData.weekDate || ""}",`)
      lines.push(`${indent}    planche: ${r.colleData.planche || 0},`)
      lines.push(`${indent}    teacher: "${r.colleData.teacher || ""}",`)
      lines.push(`${indent}    timeSlot: "${r.colleData.timeSlot || ""}",`)

      // ✅ CORRECTION : Vérification sécurisée des trinomes
      const trinomesStr = Array.isArray(r.colleData.trinomes) && r.colleData.trinomes.length > 0
        ? r.colleData.trinomes.join(", ")
        : ""
      lines.push(`${indent}    trinomes: [${trinomesStr}]`)
      lines.push(`${indent}  }`)
    }

    lines.push(`${indent}}`)
    return lines.join("\n")
  }

  const resourcesCode = resources.map(r => formatResource(r)).join(",\n")

  return `// src/data/resources/index.js
// Données des ressources pédagogiques enrichies avec les textes intégrés

export const resources = [
${resourcesCode}
]

// === MÉTADONNÉES DES COLLES ===
export const collesMetadata = {
  schools: [
    {
      id: "jean-perrin",
      name: "Lycée Jean Perrin",
      city: "Lyon"
    }
  ],

  academicYears: [
    {
      id: "2025-2026",
      label: "2025-2026",
      startDate: "2025-09-01",
      endDate: "2026-06-30",
      isCurrent: true
    }
  ],

  classes: [
    {
      id: "mpsi",
      name: "MPSI",
      level: "prepa1",
      subjects: ["physics", "chemistry", "maths"],
      description: "Mathématiques, Physique et Sciences de l'Ingénieur"
    },
    {
      id: "pcsi",
      name: "PCSI",
      level: "prepa1",
      subjects: ["physics", "chemistry", "maths"],
      description: "Physique, Chimie et Sciences de l'Ingénieur"
    }
  ],

  collesCalendar: {
    "2025-2026": {
      weeks: [
        { number: 1, date: "2025-09-15", label: "Semaine 1" },
        { number: 2, date: "2025-09-22", label: "Semaine 2" },
        { number: 3, date: "2025-09-29", label: "Semaine 3" },
        { number: 4, date: "2025-10-06", label: "Semaine 4" },
        { number: 5, date: "2025-10-13", label: "Semaine 5" },
        { number: 6, date: "2025-11-03", label: "Semaine 6" },
        { number: 7, date: "2025-11-10", label: "Semaine 7" },
        { number: 8, date: "2025-11-14", label: "Semaine 8" },
        { number: 9, date: "2025-11-24", label: "Semaine 9" },
        { number: 10, date: "2025-12-01", label: "Semaine 10" },
        { number: 11, date: "2025-12-08", label: "Semaine 11" },
        { number: 12, date: "2025-12-15", label: "Semaine 12" },
        { number: 13, date: "2026-01-05", label: "Semaine 13" },
        { number: 14, date: "2026-01-12", label: "Semaine 14" },
        { number: 15, date: "2026-01-19", label: "Semaine 15" },
        { number: 16, date: "2026-01-26", label: "Semaine 16" }
      ]
    }
  }
}

// === FONCTIONS UTILITAIRES ===

export const getResourcesBySubject = (subject) => {
  return resources.filter(resource => resource.subject === subject)
}

export const getResourcesByLevel = (levelKey) => {
  return resources.filter(resource => resource.levelKey === levelKey)
}

export const getResourcesByType = (typeKey) => {
  return resources.filter(resource => resource.typeKey === typeKey)
}

export const getResourcesByDifficulty = (difficulty) => {
  return resources.filter(resource => resource.difficulty === difficulty)
}

export const searchResources = (query) => {
  const searchTerm = query.toLowerCase()
  return resources.filter(resource =>
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    resource.id.toLowerCase().includes(searchTerm) ||
    resource.title.toLowerCase().includes(searchTerm) ||
    resource.description.toLowerCase().includes(searchTerm)
  )
}

export const getResourceById = (id) => {
  return resources.find(resource => resource.id === id)
}

export const getColleResources = () => {
  return resources.filter(resource => resource.isColle === true)
}

export const getCollesBySchoolAndYear = (school, year) => {
  return getColleResources().filter(resource =>
    resource.colleData?.school === school &&
    resource.colleData?.year === year
  )
}

export const getCollesByWeek = (school, year, week) => {
  return getCollesBySchoolAndYear(school, year).filter(resource =>
    resource.colleData?.week === week
  )
}

export const getCollesByClass = (school, year, className) => {
  return getCollesBySchoolAndYear(school, year).filter(resource =>
    resource.colleData?.class === className
  )
}

export const getWeeksWithColles = (school, year, className = null) => {
  const colles = className ?
    getCollesByClass(school, year, className) :
    getCollesBySchoolAndYear(school, year)

  const weeks = [...new Set(colles.map(c => c.colleData?.week))].sort()
  return weeks.map(week => {
    const weekData = collesMetadata.collesCalendar[year]?.weeks.find(w => w.number === week)
    return {
      number: week,
      date: weekData?.date,
      label: weekData?.label,
      hasColles: true
    }
  })
}

export const getResourceStats = () => {
  const colles = getColleResources()
  const regular = resources.filter(r => !r.isColle)

  return {
    total: resources.length,
    regular: regular.length,
    colles: colles.length,
    bySubject: {
      maths: getResourcesBySubject("maths").length,
      physics: getResourcesBySubject("physics").length,
      chemistry: getResourcesBySubject("chemistry").length
    },
    byDifficulty: {
      facile: getResourcesByDifficulty("facile").length,
      moyen: getResourcesByDifficulty("moyen").length,
      difficile: getResourcesByDifficulty("difficile").length
    },
    withVideo: resources.filter(r => r.hasVideo).length
  }
}
`
}

</script>

<style scoped>
.resource-editor {
  min-height: calc(100vh - var(--header-height, 70px));
  padding: 100px 0 50px;
  background-color: var(--secondary-color, #f8f9fa);
}

.editor-header {
  text-align: center;
  margin-bottom: 40px;
}

.editor-header h1 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.editor-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: var(--accent-color, #3498db);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn-success {
  background-color: #27ae60;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background-color: #229954;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #7f8c8d;
}

.notification {
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideIn 0.3s;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.notification.success {
  background-color: #d4edda;
  color: #155724;
}

.notification.error {
  background-color: #f8d7da;
  color: #721c24;
}

.notification.warning {
  background-color: #fff3cd;
  color: #856404;
}

.notification.info {
  background-color: #d1ecf1;
  color: #0c5460;
}

.close-btn {
  margin-left: auto;
  background: none;
  color: inherit;
  font-size: 1.5rem;
  padding: 0 5px;
}

.stats-bar {
  display: flex;
  gap: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.stat strong {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.stat span {
  font-size: 0.9rem;
  color: var(--text-light);
}

.stat.warning {
  flex-direction: row;
  color: #f39c12;
  gap: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}
</style>