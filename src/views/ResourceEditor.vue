<template>
  <div class="resource-editor">
    <div class="container">
      <header class="editor-header">
        <h1>Gestion des Ressources</h1>
        <p>Uploadez des PDF automatiquement ou gérez vos ressources manuellement</p>
      </header>

      <!-- Notification -->
      <div v-if="notification" class="notification" :class="notification.type">
        <i :class="notification.icon"></i>
        <span>{{ notification.message }}</span>
        <button @click="notification = null" class="close-btn">&times;</button>
      </div>

      <!-- Onglets -->
      <div class="tabs">
        <button
          @click="activeTab = 'upload'"
          :class="['tab-btn', { active: activeTab === 'upload' }]"
        >
          <i class="fas fa-upload"></i> Upload PDF automatique
        </button>
        <button
          @click="activeTab = 'manage'"
          :class="['tab-btn', { active: activeTab === 'manage' }]"
        >
          <i class="fas fa-edit"></i> Gérer les ressources
        </button>
      </div>

      <!-- ONGLET 1: UPLOAD PDF -->
      <div v-if="activeTab === 'upload'" class="tab-content">
        <div class="upload-section">
          <h2><i class="fas fa-file-pdf"></i> Traitement automatique de PDF</h2>
          <p class="help-text">
            Uploadez un PDF de colle et le système le découpera automatiquement en exercices individuels
          </p>

          <form @submit.prevent="handlePdfUpload" class="upload-form">
            <div class="form-row">
              <div class="form-group">
                <label>Fichier PDF *</label>
                <input
                  type="file"
                  accept=".pdf"
                  @change="handleFileChange"
                  required
                  :disabled="isUploading"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Matière *</label>
                <select v-model="uploadData.matiere" required :disabled="isUploading">
                  <option value="">-- Choisir --</option>
                  <option value="physique">Physique</option>
                  <option value="chimie">Chimie</option>
                  <option value="maths">Mathématiques</option>
                </select>
              </div>

              <div class="form-group">
                <label>Classe *</label>
                <select v-model="uploadData.classe" required :disabled="isUploading">
                  <option value="">-- Choisir --</option>
                  <option value="MPSI">MPSI</option>
                  <option value="PCSI">PCSI</option>
                  <option value="MP">MP</option>
                  <option value="PC">PC</option>
                </select>
              </div>

              <div class="form-group">
                <label>Semaine *</label>
                <input
                  type="number"
                  v-model.number="uploadData.semaine"
                  min="1"
                  max="30"
                  required
                  :disabled="isUploading"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Année scolaire *</label>
                <input
                  type="text"
                  v-model="uploadData.year"
                  placeholder="2024-2025"
                  required
                  :disabled="isUploading"
                />
              </div>

              <div class="form-group">
                <label>Date de la semaine *</label>
                <input
                  type="date"
                  v-model="uploadData.weekDate"
                  required
                  :disabled="isUploading"
                />
              </div>

              <div class="form-group">
                <label>Professeur</label>
                <input
                  type="text"
                  v-model="uploadData.teacher"
                  placeholder="Nom du professeur"
                  :disabled="isUploading"
                />
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary btn-large" :disabled="isUploading">
                <i :class="isUploading ? 'fas fa-spinner fa-spin' : 'fas fa-magic'"></i>
                {{ isUploading ? 'Traitement en cours...' : 'Traiter le PDF' }}
              </button>
            </div>
          </form>

          <!-- Résultats du traitement -->
          <div v-if="processedResources.length > 0" class="processed-results">
            <h3><i class="fas fa-check-circle"></i> Ressources générées ({{ processedResources.length }})</h3>

            <div class="resources-preview">
              <div v-for="(resource, idx) in processedResources" :key="idx" class="resource-card">
                <div class="resource-header">
                  <strong>{{ resource.title }}</strong>
                  <span class="badge">{{ resource.subject }}</span>
                </div>
                <p class="resource-desc">{{ resource.description }}</p>
                <div class="resource-meta">
                  <span><i class="fas fa-file-pdf"></i> {{ resource.pdfStatement }}</span>
                </div>
              </div>
            </div>

            <div class="results-actions">
              <button @click="copyGeneratedCode" class="btn btn-success">
                <i class="fas fa-copy"></i> Copier le code JavaScript
              </button>
              <button @click="addProcessedToResources" class="btn btn-primary">
                <i class="fas fa-plus"></i> Ajouter aux ressources locales
              </button>
              <button @click="processedResources = []" class="btn btn-secondary">
                <i class="fas fa-times"></i> Fermer
              </button>
            </div>

            <!-- Code généré -->
            <details class="code-details">
              <summary>Voir le code JavaScript généré</summary>
              <pre class="code-preview">{{ generatedCode }}</pre>
            </details>
          </div>
        </div>
      </div>

      <!-- ONGLET 2: GESTION DES RESSOURCES -->
      <div v-if="activeTab === 'manage'" class="tab-content">
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
      </div>

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

// Configuration de l'API backend
// En développement local : utilise localhost:3001
// En production : utilise l'API Render.com
const API_URL = import.meta.env.DEV
  ? 'http://localhost:3001'
  : 'https://colle-splitter-api.onrender.com'

// État
const activeTab = ref('upload')
const localResources = ref([...resources])
const originalResources = ref([...resources])
const showForm = ref(false)
const editingResource = ref(null)
const notification = ref(null)

// État pour l'upload PDF
const uploadData = ref({
  matiere: '',
  classe: '',
  semaine: '',
  year: '',
  weekDate: '',
  teacher: ''
})
const selectedFile = ref(null)
const isUploading = ref(false)
const processedResources = ref([])
const generatedCode = ref('')

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

// === FONCTIONS POUR L'UPLOAD PDF ===

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    selectedFile.value = file
  } else {
    showNotification('Veuillez sélectionner un fichier PDF valide', 'error')
    event.target.value = ''
  }
}

const handlePdfUpload = async () => {
  if (!selectedFile.value) {
    showNotification('Veuillez sélectionner un fichier PDF', 'warning')
    return
  }

  isUploading.value = true
  processedResources.value = []

  try {
    const formData = new FormData()
    formData.append('pdf', selectedFile.value)
    formData.append('matiere', uploadData.value.matiere)
    formData.append('classe', uploadData.value.classe)
    formData.append('semaine', uploadData.value.semaine)
    formData.append('year', uploadData.value.year)
    formData.append('weekDate', uploadData.value.weekDate)
    formData.append('teacher', uploadData.value.teacher || '')

    const response = await fetch(`${API_URL}/api/split-colle`, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erreur lors du traitement du PDF')
    }

    const data = await response.json()
    processedResources.value = data.resources || []
    generatedCode.value = generateCodeFromResources(processedResources.value)

    showNotification(
      `✅ ${processedResources.value.length} ressources générées avec succès !`,
      'success'
    )
  } catch (error) {
    console.error('Erreur upload:', error)
    showNotification(`❌ Erreur: ${error.message}`, 'error')
  } finally {
    isUploading.value = false
  }
}

const generateCodeFromResources = (resources) => {
  if (!resources || resources.length === 0) return ''

  const formatResource = (r) => {
    const lines = []
    lines.push('  {')
    lines.push(`    id: "${r.id}",`)
    lines.push(`    subject: "${r.subject}",`)
    lines.push(`    levelKey: "${r.levelKey}",`)
    lines.push(`    typeKey: "${r.typeKey}",`)
    lines.push(`    duration: "${r.duration || ''}",`)
    lines.push(`    hasVideo: false,`)
    lines.push(`    videoUrl: "",`)
    lines.push(`    pdfStatement: "${r.pdfStatement}",`)
    lines.push(`    pdfSolution: "${r.pdfSolution || ''}",`)
    lines.push(`    tags: [${r.tags.map(t => `"${t}"`).join(', ')}],`)
    lines.push(`    createdAt: "${r.createdAt}",`)
    lines.push(`    title: "${r.title}",`)
    lines.push(`    description: "${r.description}",`)
    lines.push(`    isColle: true,`)
    lines.push(`    colleAssignments: [`)
    lines.push(`      {`)
    lines.push(`        school: "${r.colleAssignments[0].school}",`)
    lines.push(`        year: "${r.colleAssignments[0].year}",`)
    lines.push(`        class: "${r.colleAssignments[0].class}",`)
    lines.push(`        week: ${r.colleAssignments[0].week},`)
    lines.push(`        weekDate: "${r.colleAssignments[0].weekDate}",`)
    lines.push(`        planche: ${r.colleAssignments[0].planche},`)
    lines.push(`        teacher: "${r.colleAssignments[0].teacher}",`)
    lines.push(`        timeSlot: "",`)
    lines.push(`        trinomes: []`)
    lines.push(`      }`)
    lines.push(`    ]`)
    lines.push('  }')
    return lines.join('\n')
  }

  return resources.map(r => formatResource(r)).join(',\n')
}

const copyGeneratedCode = async () => {
  try {
    await navigator.clipboard.writeText(generatedCode.value)
    showNotification('Code copié dans le presse-papier !', 'success')
  } catch (error) {
    showNotification('Erreur lors de la copie', 'error')
  }
}

const addProcessedToResources = () => {
  processedResources.value.forEach(resource => {
    localResources.value.push(resource)
  })

  showNotification(
    `${processedResources.value.length} ressources ajoutées à la liste`,
    'success'
  )

  // Basculer vers l'onglet de gestion
  activeTab.value = 'manage'
  processedResources.value = []
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

    // Données de colle - Support pour colleAssignments (nouveau format) et colleData (ancien format)
    if (r.isColle) {
      lines.push(`${indent}  isColle: true,`)

      // Nouveau format avec colleAssignments (tableau)
      if (r.colleAssignments && Array.isArray(r.colleAssignments)) {
        lines.push(`${indent}  colleAssignments: [`)

        r.colleAssignments.forEach((assignment, idx) => {
          lines.push(`${indent}    {`)
          lines.push(`${indent}      school: "${assignment.school || ""}",`)
          lines.push(`${indent}      year: "${assignment.year || ""}",`)
          lines.push(`${indent}      class: "${assignment.class || ""}",`)
          lines.push(`${indent}      week: ${assignment.week || 0},`)
          lines.push(`${indent}      weekDate: "${assignment.weekDate || ""}",`)
          lines.push(`${indent}      planche: ${assignment.planche || 0},`)
          lines.push(`${indent}      teacher: "${assignment.teacher || ""}",`)
          lines.push(`${indent}      timeSlot: "${assignment.timeSlot || ""}",`)

          const trinomesStr = Array.isArray(assignment.trinomes) && assignment.trinomes.length > 0
            ? assignment.trinomes.join(", ")
            : ""
          lines.push(`${indent}      trinomes: [${trinomesStr}]`)

          // Virgule sauf pour le dernier élément
          if (idx < r.colleAssignments.length - 1) {
            lines.push(`${indent}    },`)
          } else {
            lines.push(`${indent}    }`)
          }
        })

        lines.push(`${indent}  ]`)
      }
      // Ancien format avec colleData (rétrocompatibilité)
      else if (r.colleData) {
        lines.push(`${indent}  colleData: {`)
        lines.push(`${indent}    school: "${r.colleData.school || ""}",`)
        lines.push(`${indent}    year: "${r.colleData.year || ""}",`)
        lines.push(`${indent}    class: "${r.colleData.class || ""}",`)
        lines.push(`${indent}    week: ${r.colleData.week || 0},`)
        lines.push(`${indent}    weekDate: "${r.colleData.weekDate || ""}",`)
        lines.push(`${indent}    planche: ${r.colleData.planche || 0},`)
        lines.push(`${indent}    teacher: "${r.colleData.teacher || ""}",`)
        lines.push(`${indent}    timeSlot: "${r.colleData.timeSlot || ""}",`)

        const trinomesStr = Array.isArray(r.colleData.trinomes) && r.colleData.trinomes.length > 0
          ? r.colleData.trinomes.join(", ")
          : ""
        lines.push(`${indent}    trinomes: [${trinomesStr}]`)
        lines.push(`${indent}  }`)
      }
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

// Helper: Get all assignments for a resource (supports both colleData and colleAssignments)
const getResourceAssignments = (resource) => {
  if (resource.colleAssignments && Array.isArray(resource.colleAssignments)) {
    return resource.colleAssignments
  }
  // Backward compatibility with old colleData format
  if (resource.colleData) {
    return [resource.colleData]
  }
  return []
}

export const getCollesBySchoolAndYear = (school, year) => {
  return getColleResources().filter(resource => {
    const assignments = getResourceAssignments(resource)
    return assignments.some(assignment =>
      assignment.school === school && assignment.year === year
    )
  })
}

export const getCollesByWeek = (school, year, week) => {
  return getColleResources().flatMap(resource => {
    const assignments = getResourceAssignments(resource)
    const matchingAssignments = assignments.filter(assignment =>
      assignment.school === school &&
      assignment.year === year &&
      assignment.week === week
    )

    // Return a copy of the resource for each matching assignment
    return matchingAssignments.map(assignment => ({
      ...resource,
      colleData: assignment // For backward compatibility with components
    }))
  })
}

export const getCollesByClass = (school, year, className) => {
  return getColleResources().filter(resource => {
    const assignments = getResourceAssignments(resource)
    return assignments.some(assignment =>
      assignment.school === school &&
      assignment.year === year &&
      assignment.class === className
    )
  })
}

export const getWeeksWithColles = (school, year, className = null) => {
  const colles = getColleResources()

  const allWeeks = new Set()
  colles.forEach(resource => {
    const assignments = getResourceAssignments(resource)
    assignments.forEach(assignment => {
      if (assignment.school === school && assignment.year === year) {
        if (!className || assignment.class === className) {
          allWeeks.add(assignment.week)
        }
      }
    })
  })

  const weeks = [...allWeeks].sort((a, b) => a - b)
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

/* === NOUVEAUX STYLES POUR L'UPLOAD === */

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid #e0e0e0;
}

.tab-btn {
  padding: 15px 30px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 1rem;
  font-weight: 600;
  color: #7f8c8d;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-btn:hover {
  color: var(--primary-color);
}

.tab-btn.active {
  color: var(--primary-color);
  border-bottom-color: var(--accent-color);
}

.tab-content {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.upload-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.upload-section h2 {
  color: var(--primary-color);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.help-text {
  color: #7f8c8d;
  margin-bottom: 30px;
}

.upload-form {
  margin-bottom: 30px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-dark);
}

.form-group input,
.form-group select {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--accent-color);
}

.form-group input:disabled,
.form-group select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.form-group input[type="file"] {
  padding: 10px;
  cursor: pointer;
}

.form-actions {
  margin-top: 30px;
}

.btn-large {
  padding: 15px 40px;
  font-size: 1.1rem;
}

.processed-results {
  margin-top: 40px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #27ae60;
}

.processed-results h3 {
  color: #27ae60;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.resources-preview {
  display: grid;
  gap: 15px;
  margin-bottom: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.resource-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid var(--accent-color);
}

.resource-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.resource-header strong {
  color: var(--primary-color);
}

.badge {
  padding: 4px 12px;
  background: var(--accent-color);
  color: white;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.resource-desc {
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.resource-meta {
  font-size: 0.85rem;
  color: #7f8c8d;
}

.resource-meta i {
  margin-right: 5px;
}

.results-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.code-details {
  margin-top: 20px;
}

.code-details summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--primary-color);
  padding: 10px;
  background: white;
  border-radius: 8px;
  user-select: none;
}

.code-details summary:hover {
  background: #f0f0f0;
}

.code-preview {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-top: 10px;
  max-height: 500px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
  }

  .tab-btn {
    border-bottom: none;
    border-left: 3px solid transparent;
  }

  .tab-btn.active {
    border-left-color: var(--accent-color);
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .results-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>