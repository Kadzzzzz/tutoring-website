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
              <option value="colle">Colle</option>
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

      <!-- Données de colle -->
      <div v-if="form.typeKey === 'colle'" class="form-section">
        <h3>Informations de colle</h3>

        <div class="form-group">
          <label class="checkbox-label">
            <input v-model="form.isColle" type="checkbox">
            <span>Marquer comme exercice de colle</span>
          </label>
        </div>

        <template v-if="form.isColle">
          <div class="form-row">
            <div class="form-group">
              <label>École</label>
              <input v-model="colleForm.school" type="text" placeholder="jean-perrin">
            </div>

            <div class="form-group">
              <label>Année scolaire</label>
              <input v-model="colleForm.year" type="text" placeholder="2025-2026">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Classe</label>
              <select v-model="colleForm.class">
                <option value="">Sélectionner...</option>
                <option value="mpsi">MPSI</option>
                <option value="pcsi">PCSI</option>
              </select>
            </div>

            <div class="form-group">
              <label>Semaine</label>
              <input v-model.number="colleForm.week" type="number" min="1" placeholder="1">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Date de la semaine</label>
              <input v-model="colleForm.weekDate" type="date">
            </div>

            <div class="form-group">
              <label>Planche</label>
              <input v-model.number="colleForm.planche" type="number" min="1" placeholder="1">
            </div>
          </div>

          <div class="form-group">
            <label>Professeur</label>
            <input v-model="colleForm.teacher" type="text" placeholder="Jeremy Luccioni">
          </div>

          <div class="form-group">
            <label>Créneau horaire</label>
            <input v-model="colleForm.timeSlot" type="text" placeholder="Lundi 14h-15h">
          </div>

          <div class="form-group">
            <label>Trinômes (séparés par des virgules)</label>
            <input v-model="trinomesInput" type="text" placeholder="1,2,3,4">
          </div>
        </template>
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
  isColle: false
})

// Formulaire colle
const colleForm = ref({
  school: 'jean-perrin',
  year: '2025-2026',
  class: '',
  week: null,
  weekDate: '',
  planche: 1,
  teacher: 'Jeremy Luccioni',
  timeSlot: '',
  trinomes: []
})

const tagInput = ref('')
const trinomesInput = ref('')
const today = new Date().toISOString().split('T')[0]

// Initialiser avec la ressource à éditer
if (props.resource) {
  form.value = { ...props.resource }

  if (props.resource.colleData) {
    colleForm.value = { ...props.resource.colleData }
    trinomesInput.value = props.resource.colleData.trinomes?.join(',') || ''
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

  // Préparer les données
  const resourceData = { ...form.value }

  // Date de création par défaut
  if (!resourceData.createdAt) {
    resourceData.createdAt = today
  }

  // Données de colle
  if (form.value.isColle && form.value.typeKey === 'colle') {
    // Parser les trinômes
    const trinomes = trinomesInput.value
      .split(',')
      .map(t => parseInt(t.trim()))
      .filter(t => !isNaN(t))

    resourceData.colleData = {
      ...colleForm.value,
      trinomes
    }
  } else {
    delete resourceData.isColle
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

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .resource-form {
    padding: 20px;
  }
}
</style>