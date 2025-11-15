<template>
  <div class="pedagogie-page">
    <!-- Section Conseils de Méthode de Travail -->
    <section class="content-section work-method-section">
      <div class="container">
        <h2>Conseils de Méthode de Travail</h2>
        <p class="section-intro">
          Au-delà des cours, je partage avec mes élèves les stratégies qui m'ont permis de réussir en classes préparatoires et à Centrale Lyon.
        </p>

        <div class="tips-grid">
          <div v-for="tip in workMethodTips" :key="tip.id" class="tip-card">
            <div class="tip-icon">
              <i :class="tip.icon"></i>
            </div>
            <h3>{{ tip.title }}</h3>
            <p>{{ tip.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Méthode Pédagogique -->
    <MethodologySection/>
  </div>
</template>

<script setup>
import MethodologySection from '@/components/sections/MethodologySection.vue'

const workMethodTips = [
  {
    id: 1,
    title: "Organisation et Planification",
    description: "Apprenez à gérer votre temps efficacement avec des planning réalistes et des objectifs clairs. Une bonne organisation est la clé de la réussite en prépa.",
    icon: "fas fa-calendar-alt"
  },
  {
    id: 2,
    title: "Fiches de Révision Efficaces",
    description: "Maîtrisez l'art de créer des fiches synthétiques et visuelles qui facilitent la mémorisation et la compréhension des concepts clés.",
    icon: "fas fa-file-alt"
  },
  {
    id: 3,
    title: "Entraînement Régulier",
    description: "La régularité est essentielle. Pratiquez quotidiennement avec des exercices variés pour consolider vos acquis et développer vos automatismes.",
    icon: "fas fa-dumbbell"
  },
  {
    id: 4,
    title: "Apprentissage Actif",
    description: "Ne vous contentez pas de relire : questionnez-vous, reformulez, enseignez à d'autres. L'apprentissage actif renforce durablement la compréhension.",
    icon: "fas fa-brain"
  },
  {
    id: 5,
    title: "Gestion du Stress",
    description: "Développez des techniques pour rester serein face aux examens et aux échéances. Un esprit apaisé est un esprit performant.",
    icon: "fas fa-heart"
  },
  {
    id: 6,
    title: "Analyse de vos Erreurs",
    description: "Chaque erreur est une opportunité d'apprentissage. Prenez le temps d'analyser vos fautes pour ne plus les reproduire.",
    icon: "fas fa-search"
  }
]
</script>

<style scoped>
.pedagogie-page {
  min-height: 100vh;
  padding-top: var(--header-height, 70px);
}

/* Supprimer le border-bottom de la dernière section pour éviter l'espace blanc */
.pedagogie-page > section:last-child,
.pedagogie-page > section:last-child :deep(.content-section) {
  border-bottom: none;
}

.content-section {
  padding: 80px 0;
  border-bottom: 1px solid var(--border-color, #ddd);
}

.work-method-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 25px;
}

.work-method-section h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
}

.work-method-section h2::after {
  content: '';
  display: block;
  width: 70px;
  height: 4px;
  background-color: var(--accent-color, #3498db);
  margin: 15px auto 25px auto;
}

.section-intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px auto;
  color: #475569;
  line-height: 1.8;
  font-size: 1.125rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.tip-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.tip-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.tip-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.tip-icon i {
  font-size: 1.5rem;
  color: white;
}

.tip-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 15px;
}

.tip-card p {
  color: #475569;
  line-height: 1.7;
  margin: 0;
}

@media (max-width: 768px) {
  .tips-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .work-method-section h2 {
    font-size: 2rem;
  }
}
</style>
