<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <button @click="$emit('close')" class="modal-close" aria-label="Fermer">×</button>
      
      <div class="modal-header">
        <h2 class="modal-title">{{ resource.title }}</h2>
        <div class="modal-tags">
          <span class="tag level">{{ getSubjectLabel(resource.subject) }}</span>
          <span class="tag level">{{ getLevelLabel(resource.levelKey) }}</span>
          <span class="tag type">{{ getTypeLabel(resource.typeKey) }}</span>
        </div>
        <p class="modal-description">{{ resource.fullDescription || resource.description }}</p>
      </div>

      <!-- Vidéo si disponible -->
      <div v-if="resource.hasVideo && resource.videoUrl" class="modal-video">
        <iframe
          :src="`https://www.youtube.com/embed/${resource.videoUrl}`"
          title="Vidéo explicative"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <!-- Boutons de téléchargement PDF -->
      <div v-if="resource.pdfStatement || resource.pdfSolution" class="modal-downloads">
        <a
          v-if="resource.pdfStatement"
          :href="resource.pdfStatement"
          target="_blank"
          class="download-btn statement"
          :download="getFileName('statement')"
        >
          <i class="fas fa-file-text"></i>
          {{ DOWNLOAD_LABELS.statement }}
        </a>
        <a
          v-if="resource.pdfSolution"
          :href="resource.pdfSolution"
          target="_blank"
          class="download-btn solution"
          :download="getFileName('solution')"
        >
          <i class="fas fa-check-circle"></i>
          {{ DOWNLOAD_LABELS.solution }}
        </a>
      </div>

      <!-- Message si pas de PDF disponible -->
      <div v-else class="modal-downloads">
        <div class="no-pdf-message">
          <i class="fas fa-info-circle"></i>
          {{ UI_LABELS.noPdfAvailable }}
        </div>
      </div>

      <!-- Notes et conseils -->
      <div v-if="resource.notes" class="modal-notes">
        <h4>{{ UI_LABELS.notes }}</h4>
        <p>{{ resource.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  getSubjectLabel,
  getLevelLabel,
  getTypeLabel,
  DOWNLOAD_LABELS,
  UI_LABELS
} from '@/utils/labels.js'

const props = defineProps({
  resource: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

// Génération du nom de fichier pour le téléchargement
const getFileName = (type) => {
  const subject = getSubjectLabel(props.resource.subject).toLowerCase()
  const title = props.resource.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

  const typeText = type === 'statement' ? 'enonce' : 'correction'

  return `${subject}-${title}-${typeText}.pdf`
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background-color: white;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 10px;
  position: relative;
  animation: slideUp 0.3s ease-out;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 2rem;
  color: #aaa;
  z-index: 1;
  padding: 5px;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
}

.modal-close:hover {
  color: var(--primary-color);
}

.modal-header {
  padding: 30px 30px 0;
}

.modal-title {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.modal-tags {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.tag.level {
  background-color: #e8f4fd;
  color: #3498db;
}

.tag.type {
  background-color: #f0f9ff;
  color: #2563eb;
}

.modal-description {
  color: var(--text-light);
  margin-bottom: 25px;
  line-height: 1.6;
  white-space: pre-line;
}

.modal-video {
  width: 100%;
  aspect-ratio: 16/9;
  margin-bottom: 25px;
  padding: 0 30px;
}

.modal-video iframe {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.modal-downloads {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
  padding: 0 30px;
}

.download-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.download-btn.statement {
  background-color: #e3f2fd;
  color: #1976d2;
  border: 1px solid #bbdefb;
}

.download-btn.solution {
  background-color: #e8f5e8;
  color: #388e3c;
  border: 1px solid #c8e6c9;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.download-btn.statement:hover {
  background-color: #bbdefb;
}

.download-btn.solution:hover {
  background-color: #c8e6c9;
}

.no-pdf-message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  color: #856404;
  font-style: italic;
  width: 100%;
}

.modal-notes {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid var(--accent-color);
  margin: 20px 30px 30px;
}

.modal-notes h4 {
  color: var(--accent-color);
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.modal-notes p {
  margin: 0;
  color: var(--text-color);
  line-height: 1.6;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 20px;
  }

  .modal-header {
    padding: 20px;
  }

  .modal-video {
    padding: 0 20px;
  }

  .modal-downloads {
    flex-direction: column;
    padding: 0 20px;
  }

  .download-btn {
    justify-content: center;
  }

  .modal-notes {
    margin: 20px;
  }
}
</style>