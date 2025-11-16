<template>
  <div class="resource-form">
    <h2>{{ isEditing ? 'Modifier la ressource' : 'Ajouter une ressource' }}</h2>

    <form @submit.prevent="handleSubmit">
      <!-- Informations de base -->
      <div class="form-section">
        <h3>Informations de base</h3>

        <div class="form-row">
          <div class="form-group">
            <label>ID <span class="required">*</span></label>
            <input
              v-model="form.id"
              type="text"
              required
              :disabled="isEditing"
              placeholder="ex: integrales-by-parts"
            >
            <small v-if="!isEditing">Généré automatiquement à partir du titre si vide</small>
          </div>

          <div class="form-group">
            <label>Matière <span class="required">*</span></label>
            <select v-model="form.subject" required>
              <option value="">Sélectionner...</option>
              <option value="maths">Mathématiques</option>
              <option value="physics">Physique</option>
              <option value="chemistry">Chimie</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Niveau <span class="required">*</span></label>
            <select v-model="form.levelKey" required>
              <option value="">Sélectionner...</option>
              <option value="terminale">Terminale</option>
              <option value="prepa1">Prépa 1A</option>
              <option value="prepa2">Prépa 2A</option>
            </select>
          </div>

          <div class="form-group">
            <label>Type <span class="required">*</span></label>
            <select v-model="form.typeKey" required>
              <option value="">Sélectionner...</option>
              <option value="exercise">Exercice</option>
              <option value="course">Cours</option>
              <option value="method">Méthode</option>
              <option value="interro">Interrogation</option>
              <option value="programme">Programme de colle</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Durée</label>
            <input v-model="form.duration" type="text" placeholder="ex: 90 min">
          </div>

          <div class="form-group">
            <label>Difficulté</label>
            <select v-model="form.difficulty">
              <option value="">Sélectionner...</option>
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Contenu -->
      <div class="form-section">
        <h3>Contenu</h3>

        <div class="form-group">
          <label>Titre <span class="required">*</span></label>
          <input v-model="form.title" type="text" required placeholder="Titre de la ressource">
        </div>

        <div class="form-group">
          <label>Description courte <span class="required">*</span></label>
          <textarea
            v-model="form.description"
            required
            rows="2"
            placeholder="Description courte affichée dans la carte"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Description complète</label>
          <textarea
            v-model="form.fullDescription"
            rows="4"
            placeholder="Description détaillée affichée dans la modal"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Notes et conseils</label>
          <textarea
            v-model="form.notes"
            rows="3"
            placeholder="Notes pédagogiques et conseils pour les étudiants"
          ></textarea>
        </div>
      </div>

      <!-- Tags -->
      <div class="form-section">
        <h3>Tags</h3>
        <div class="form-group">
          <label>Tags <span class="required">*</span></label>
          <input
            v-model="tagInput"
            type="text"
            @keydown.enter.prevent="addTag"
            placeholder="Appuyez sur Entrée pour ajouter un tag"
          >
          <div class="tags-display">
            <span v-for="(tag, index) in form.tags" :key="index" class="tag">
              {{ tag }}
              <button type="button" @click="removeTag(index)" class="tag-remove">&times;</button>
            </span>
          </div>
        </div>
      </div>

      <!-- Fichiers PDF -->
      <div class="form-section">
        <h3>Fichiers PDF</h3>

        <div class="form-group">
          <label>Énoncé (PDF)</label>
          <input v-model="form.pdfStatement" type="text" placeholder="/documents/exercices/maths/...">
        </div>

        <div class="form-group">
          <label>Correction (PDF)</label>
          <input v-model="form.pdfSolution" type="text" placeholder="/documents/exercices/maths/...">
        </div>
      </div>

      <!-- Vidéo -->
      <div class="form-section">
        <h3>Vidéo (optionnel)</h3>

        <div class="form-group">
          <label class="checkbox-label">
            <input v-model="form.hasVideo" type="checkbox">
            <span>Cette ressource a une vidéo explicative</span>
          </label>
        </div>

        <div v-if="form.hasVideo" class="form-group">
          <label>ID YouTube</label>
          <input v-model="form.videoUrl" type="text" placeholder="dQw4w9WgXcQ">
          <small>Uniquement l'ID (pas l'URL complète)</small>
        </div>
      </div>

      <!-- Catégorie Colle -->
      <div class="form-section colle-category">
        <h3>
          <i class="fas fa-graduation-cap"></i>
          Catégorie Colle
        </h3>

        <div class="form-group">
          <label class="checkbox-label colle-checkbox">
            <input v-model="form.isColle" type="checkbox">
            <span>
              <strong>Cette ressource est une colle</strong>
              <small>Disponible pour exercices, méthodes, programmes, etc.</small>
            </span>
          </label>
        </div>

        <!-- Champs spécifiques colle (affichés seulement si isColle = true) -->
        <transition name="slide-fade">
          <div v-if="form.isColle" class="colle-specific-fields">
            <div class="info-banner">
              <i class="fas fa-info-circle"></i>
              <p>Cette ressource peut être attribuée à plusieurs planches de colles</p>
            </div>

            <!-- Liste des assignations existantes -->
            <div v-if="colleAssignments.length > 0" class="assignments-list">
              <h4><i class="fas fa-list"></i> Assignations de colles ({{ colleAssignments.length }})</h4>
              <div v-for="(assignment, index) in colleAssignments" :key="index" class="assignment-card">
                <div class="assignment-header">
                  <span class="assignment-title">
                    <strong>{{ assignment.class?.toUpperCase() || 'N/A' }}</strong> -
                    Semaine {{ assignment.week }} -
                    Planche {{ assignment.planche }}
                  </span>
                  <button type="button" @click="removeAssignment(index)" class="btn-remove-assignment">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="assignment-details">
                  <span><i class="fas fa-school"></i> {{ assignment.school }}</span>
                  <span><i class="fas fa-calendar"></i> {{ assignment.year }}</span>
                  <span><i class="fas fa-calendar-day"></i> {{ formatDate(assignment.weekDate) }}</span>
                  <span v-if="assignment.teacher"><i class="fas fa-user"></i> {{ assignment.teacher }}</span>
                </div>
              </div>
            </div>

            <!-- Formulaire pour ajouter une nouvelle assignation -->
            <div class="add-assignment-form">
              <h4><i class="fas fa-plus-circle"></i> Ajouter une assignation</h4>

              <div class="form-row">
                <div class="form-group">
                  <label>École</label>
                  <input v-model="newAssignment.school" type="text" placeholder="jean-perrin">
                </div>

                <div class="form-group">
                  <label>Année scolaire</label>
                  <input v-model="newAssignment.year" type="text" placeholder="2025-2026">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Classe</label>
                  <select v-model="newAssignment.class">
                    <option value="">Sélectionner...</option>
                    <option value="mpsi">MPSI</option>
                    <option value="pcsi">PCSI</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Semaine</label>
                  <input v-model.number="newAssignment.week" type="number" min="1" placeholder="1">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Date de la semaine</label>
                  <input v-model="newAssignment.weekDate" type="date">
                </div>

                <div class="form-group">
                  <label>Planche</label>
                  <input v-model.number="newAssignment.planche" type="number" min="1" placeholder="1">
                </div>
              </div>

              <div class="form-group">
                <label>Professeur</label>
                <input v-model="newAssignment.teacher" type="text" placeholder="Jeremy Luccioni">
              </div>

              <div class="form-group">
                <label>Créneau horaire</label>
                <input v-model="newAssignment.timeSlot" type="text" placeholder="Lundi 14h-15h">
              </div>

              <div class="form-group">
                <label>Trinômes (séparés par des virgules)</label>
                <input v-model="newAssignment.trinomesInput" type="text" placeholder="1,2,3,4">
              </div>

              <button type="button" @click="addAssignment" class="btn btn-add-assignment">
                <i class="fas fa-plus"></i> Ajouter cette assignation
              </button>
            </div>
          </div>
        </transition>
      </div>

      <!-- Visibilité -->
      <div class="form-section">
        <h3>
          <i class="fas fa-eye"></i>
          Visibilité
        </h3>

        <div class="form-group">
          <label class="checkbox-label">
            <input v-model="form.showInResourcesPage" type="checkbox">
            <span>
              <strong>Visible sur la page Ressources</strong>
              <small>Si décoché, cette ressource n'apparaîtra que dans la section Colles (utile pour les programmes de colle)</small>
            </span>
          </label>
        </div>
      </div>

      <!-- Date de création -->
      <div class="form-section">
        <h3>Métadonnées</h3>

        <div class="form-group">
          <label>Date de création</label>
          <input v-model="form.createdAt" type="date" :max="today">
          <small>Laissez vide pour utiliser la date du jour</small>
        </div>
      </div>

      <!-- Actions -->
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save"></i>
          {{ isEditing ? 'Enregistrer les modifications' : 'Ajouter la ressource' }}
        </button>
        <button type="button" @click="$emit('cancel')" class="btn btn-secondary">
          <i class="fas fa-times"></i>
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>



<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  resource: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const isEditing = computed(() => props.resource !== null)

// Formulaire principal
const form = ref({
  id: '',
  subject: '',
  levelKey: '',
  typeKey: '',
  duration: '',
  hasVideo: false,
  videoUrl: '',
  pdfStatement: '',
  pdfSolution: '',
  difficulty: '',
  tags: [],
  createdAt: '',
  title: '',
  description: '',
  fullDescription: '',
  notes: '',
  isColle: false,
  showInResourcesPage: true
})

// Assignations de colles (tableau)
const colleAssignments = ref([])

// Nouvelle assignation (formulaire)
const newAssignment = ref({
  school: 'jean-perrin',
  year: '2025-2026',
  class: '',
  week: null,
  weekDate: '',
  planche: 1,
  teacher: 'Jeremy Luccioni',
  timeSlot: '',
  trinomesInput: ''
})

const tagInput = ref('')
const today = new Date().toISOString().split('T')[0]

// Initialiser avec la ressource à éditer
if (props.resource) {
  form.value = { ...props.resource }

  // Charger les assignations existantes (supporte les deux formats)
  if (props.resource.colleAssignments && Array.isArray(props.resource.colleAssignments)) {
    colleAssignments.value = [...props.resource.colleAssignments]
  } else if (props.resource.colleData) {
    // Backward compatibility: convertir colleData en colleAssignments
    colleAssignments.value = [{ ...props.resource.colleData }]
  }
}

// Auto-générer l'ID à partir du titre
watch(() => form.value.title, (newTitle) => {
  if (!isEditing.value && newTitle && !form.value.id) {
    form.value.id = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
})

// Gestion des tags
const addTag = () => {
  if (tagInput.value.trim() && !form.value.tags.includes(tagInput.value.trim())) {
    form.value.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const removeTag = (index) => {
  form.value.tags.splice(index, 1)
}

// Gestion des assignations de colles
const addAssignment = () => {
  // Validation
  if (!newAssignment.value.school || !newAssignment.value.year ||
      !newAssignment.value.class || !newAssignment.value.week ||
      !newAssignment.value.weekDate || !newAssignment.value.planche) {
    alert('Veuillez remplir tous les champs obligatoires de l\'assignation')
    return
  }

  // Parser les trinômes
  const trinomes = newAssignment.value.trinomesInput
    ? newAssignment.value.trinomesInput.split(',').map(t => parseInt(t.trim())).filter(t => !isNaN(t))
    : []

  // Ajouter l'assignation
  colleAssignments.value.push({
    school: newAssignment.value.school,
    year: newAssignment.value.year,
    class: newAssignment.value.class,
    week: newAssignment.value.week,
    weekDate: newAssignment.value.weekDate,
    planche: newAssignment.value.planche,
    teacher: newAssignment.value.teacher || '',
    timeSlot: newAssignment.value.timeSlot || '',
    trinomes: trinomes
  })

  // Réinitialiser le formulaire
  newAssignment.value = {
    school: 'jean-perrin',
    year: '2025-2026',
    class: '',
    week: null,
    weekDate: '',
    planche: 1,
    teacher: 'Jeremy Luccioni',
    timeSlot: '',
    trinomesInput: ''
  }
}

const removeAssignment = (index) => {
  if (confirm('Supprimer cette assignation ?')) {
    colleAssignments.value.splice(index, 1)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

// Soumission du formulaire
const handleSubmit = () => {
  // Validation
  if (!form.value.id || !form.value.title || !form.value.description) {
    alert('Veuillez remplir tous les champs obligatoires')
    return
  }

  if (form.value.tags.length === 0) {
    alert('Ajoutez au moins un tag')
    return
  }

  // Validation pour les colles
  if (form.value.isColle && colleAssignments.value.length === 0) {
    alert('Ajoutez au moins une assignation de colle')
    return
  }

  // Préparer les données
  const resourceData = { ...form.value }

  // Date de création par défaut
  if (!resourceData.createdAt) {
    resourceData.createdAt = today
  }

  // Assignations de colles
  if (form.value.isColle) {
    resourceData.colleAssignments = [...colleAssignments.value]
    // Supprimer colleData si elle existe (migration)
    delete resourceData.colleData
  } else {
    delete resourceData.colleAssignments
    delete resourceData.colleData
  }

  emit('save', resourceData)
}
</script>

<style scoped>
.resource-form {
  padding: 30px;
}

.resource-form h2 {
  margin-bottom: 30px;
  color: var(--primary-color);
}

.form-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: var(--secondary-color, #f8f9fa);
  border-radius: 8px;
}

.form-section h3 {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: var(--text-color);
}

.form-group .required {
  color: #e74c3c;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 15px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color, #3498db);
}

.form-group small {
  color: var(--text-light);
  font-size: 0.85rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  cursor: pointer;
}

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.tag {
  padding: 6px 12px;
  background-color: var(--accent-color);
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tag-remove {
  background: none;
  color: white;
  font-size: 1.2rem;
  padding: 0 4px;
  line-height: 1;
}

.tag-remove:hover {
  opacity: 0.8;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
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

.btn-primary {
  background-color: var(--accent-color, #3498db);
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

/* Styles pour les assignations de colles */
.colle-specific-fields {
  margin-top: 20px;
}

.info-banner {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.info-banner i {
  color: #2196f3;
  font-size: 1.2rem;
}

.assignments-list {
  margin-bottom: 30px;
}

.assignments-list h4 {
  margin-bottom: 15px;
  color: var(--primary-color);
  font-size: 1.1rem;
}

.assignment-card {
  background: white;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 12px;
  transition: all 0.3s;
}

.assignment-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.assignment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.assignment-title {
  font-size: 1rem;
  color: var(--text-color);
}

.btn-remove-assignment {
  background-color: #e74c3c;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.btn-remove-assignment:hover {
  background-color: #c0392b;
}

.assignment-details {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 0.9rem;
  color: var(--text-light);
}

.assignment-details span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.assignment-details i {
  color: var(--accent-color);
}

.add-assignment-form {
  background: white;
  border: 2px dashed var(--border-color, #ddd);
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.add-assignment-form h4 {
  margin-bottom: 20px;
  color: var(--primary-color);
  font-size: 1.1rem;
}

.btn-add-assignment {
  background-color: #27ae60;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.btn-add-assignment:hover {
  background-color: #229954;
}

/* Transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .resource-form {
    padding: 20px;
  }

  .assignment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .assignment-details {
    flex-direction: column;
    gap: 8px;
  }
}

</style>