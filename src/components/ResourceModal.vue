<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <button @click="$emit('close')" class="modal-close" aria-label="Fermer">×</button>
      
      <div class="modal-header">
        <h2 class="modal-title">{{ getTranslation(`resources.exercises.${resource.subject}.${resource.id}.title`) }}</h2>
        <div class="modal-tags">
          <span class="tag level">{{ getTranslation(`resources.subjects.${resource.subject}`) }}</span>
          <span class="tag level">{{ getTranslation(`resources.levels.${resource.levelKey}`) }}</span>
          <span class="tag type">{{ getTranslation(`resources.types.${resource.typeKey}`) }}</span>
        </div>
        <p class="modal-description">{{ getTranslation(`resources.exercises.${resource.subject}.${resource.id}.fullDescription`) || getTranslation(`resources.exercises.${resource.subject}.${resource.id}.description`) }}</p>
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

      <!-- Boutons de téléchargement -->
      <div class="modal-downloads">
        <a href="#" class="download-btn statement" @click.prevent="downloadFile('statement')">
          <i class="fas fa-file-text"></i>
          {{ getTranslation('resources.downloadTypes.statement') }}
        </a>
        <a href="#" class="download-btn solution" @click.prevent="downloadFile('solution')">
          <i class="fas fa-check-circle"></i>
          {{ getTranslation('resources.downloadTypes.solution') }}
        </a>
      </div>

      <!-- Notes et conseils -->
      <div v-if="getTranslation(`resources.exercises.${resource.subject}.${resource.id}.notes`)" class="modal-notes">
        <h4>{{ getTranslation('resources.notes') }}</h4>
        <p>{{ getTranslation(`resources.exercises.${resource.subject}.${resource.id}.notes`) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  resource: {
    type: Object,
    required: true
  },
  currentLang: {
    type: String,
    default: 'fr'
  }
})

const emit = defineEmits(['close'])

// Traductions pour le modal
const translations = {
  fr: {
    resources: {
      downloadTypes: {
        statement: "Énoncé", 
        solution: "Correction"
      },
      notes: "Notes et conseils"
    }
  },
  en: {
    resources: {
      downloadTypes: {
        statement: "Statement",
        solution: "Solution"
      },
      notes: "Notes and tips"
    }
  }
}

// Traductions complètes (même structure que dans App.vue)
const fullTranslations = {
  fr: {
    resources: {
      subjects: {
        maths: "Mathématiques",
        physics: "Physique", 
        chemistry: "Chimie"
      },
      types: {
        exercise: "Exercice",
        course: "Cours",
        method: "Méthode"
      },
      levels: {
        terminale: "Terminale",
        prepa1: "Prépa 1A",
        prepa2: "Prépa 2A"
      },
      downloadTypes: {
        statement: "Énoncé", 
        solution: "Correction"
      },
      notes: "Notes et conseils",
      exercises: {
        maths: {
          derivatives: {
            title: "Dérivées et primitives",
            description: "Exercices corrigés sur les dérivées et primitives usuelles",
            fullDescription: "Une série d'exercices progressifs pour maîtriser les dérivées et primitives. Commençant par les formules de base jusqu'aux fonctions composées.",
            notes: "Ces exercices sont essentiels pour la préparation au bac et aux concours. Pensez à bien maîtriser les formules de base avant de passer aux exercices complexes."
          },
          integrals: {
            title: "Intégrales généralisées",
            description: "Convergence et calculs d'intégrales impropres",
            fullDescription: "Méthodes complètes pour étudier la convergence des intégrales généralisées et techniques de calcul avancées."
          }
        },
        physics: {
          mechanics: {
            title: "Mécanique du point",
            description: "Cours et exercices sur la cinématique et la dynamique",
            fullDescription: "Étude complète de la mécanique du point : référentiels, vitesse, accélération, forces et théorèmes de Newton."
          },
          electromagnetism: {
            title: "Électromagnétisme",
            description: "Équations de Maxwell et applications",
            fullDescription: "Étude des champs électriques et magnétiques, équations de Maxwell et applications en électrostatique et magnétostatique."
          }
        },
        chemistry: {
          equilibrium: {
            title: "Équilibres chimiques",
            description: "Constantes d'équilibre et déplacements",
            fullDescription: "Étude des équilibres chimiques, calcul des constantes d'équilibre et loi de Le Chatelier."
          },
          kinetics: {
            title: "Cinétique chimique",
            description: "Vitesse de réaction et mécanismes",
            fullDescription: "Étude de la vitesse des réactions chimiques, ordres de réaction et mécanismes réactionnels."
          }
        }
      }
    }
  },
  en: {
    resources: {
      subjects: {
        maths: "Mathematics",
        physics: "Physics",
        chemistry: "Chemistry"
      },
      types: {
        exercise: "Exercise",
        course: "Course",
        method: "Method"
      },
      levels: {
        terminale: "Senior Year",
        prepa1: "Prep 1st Year",
        prepa2: "Prep 2nd Year"
      },
      downloadTypes: {
        statement: "Statement",
        solution: "Solution"
      },
      notes: "Notes and tips",
      exercises: {
        maths: {
          derivatives: {
            title: "Derivatives and primitives",
            description: "Corrected exercises on usual derivatives and primitives",
            fullDescription: "A series of progressive exercises to master derivatives and primitives. Starting from basic formulas to composite functions.",
            notes: "These exercises are essential for preparing for the baccalaureate and competitive exams. Make sure to master the basic formulas before moving on to complex exercises."
          },
          integrals: {
            title: "Generalized integrals",
            description: "Convergence and calculations of improper integrals",
            fullDescription: "Complete methods for studying the convergence of generalized integrals and advanced calculation techniques."
          }
        },
        physics: {
          mechanics: {
            title: "Point mechanics",
            description: "Course and exercises on kinematics and dynamics",
            fullDescription: "Complete study of point mechanics: reference frames, velocity, acceleration, forces and Newton's theorems."
          },
          electromagnetism: {
            title: "Electromagnetism",
            description: "Maxwell's equations and applications",
            fullDescription: "Study of electric and magnetic fields, Maxwell's equations and applications in electrostatics and magnetostatics."
          }
        },
        chemistry: {
          equilibrium: {
            title: "Chemical equilibria",
            description: "Equilibrium constants and shifts",
            fullDescription: "Study of chemical equilibria, calculation of equilibrium constants and Le Chatelier's law."
          },
          kinetics: {
            title: "Chemical kinetics",
            description: "Reaction rate and mechanisms",
            fullDescription: "Study of the rate of chemical reactions, reaction orders and reaction mechanisms."
          }
        }
      }
    }
  }
}

const getTranslation = (key) => {
  const keys = key.split('.')
  let value = fullTranslations[props.currentLang]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}

const downloadFile = (type) => {
  // Simulation du téléchargement
  console.log(`Téléchargement du ${type} pour ${props.resource.id}`)
  const typeText = type === 'statement' ? 
    (props.currentLang === 'fr' ? 'sujet' : 'statement') : 
    (props.currentLang === 'fr' ? 'correction' : 'solution')
  alert(`${props.currentLang === 'fr' ? 'Téléchargement du' : 'Downloading'} ${typeText} ${props.currentLang === 'fr' ? 'en cours...' : 'in progress...'}`)
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
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.download-btn.statement:hover {
  background-color: #bbdefb;
}

.download-btn.solution:hover {
  background-color: #c8e6c9;
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
  from { opacity: 0; }
  to { opacity: 1; }
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