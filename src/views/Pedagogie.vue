<template>
  <div class="pedagogie-page">
    <div class="page-header">
      <div class="container">
        <h1>Conseils</h1>
        <p>Méthode de travail et stratégies pour réussir en prépa</p>
      </div>
    </div>

    <section class="tips-section">
      <div class="container">
        <p class="section-intro">
          Au-delà des cours, je partage les stratégies qui m'ont permis de réussir en classes préparatoires et à Centrale Lyon.
        </p>
        <div class="tips-grid">
          <div v-for="tip in tips" :key="tip.id" class="tip-card">
            <div class="tip-icon">
              <i :class="tip.icon"></i>
            </div>
            <h3>{{ tip.title }}</h3>
            <p>{{ tip.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const tips = [
  {
    id: 1,
    title: "Organisation et Planification",
    description: "Gérez votre temps efficacement en vous fixant des objectifs clairs et atteignables. Une bonne organisation est la clé de la réussite en prépa.",
    icon: "fas fa-calendar-alt"
  },
  {
    id: 2,
    title: "Fiches de Révision Efficaces",
    description: "Créez des fiches synthétiques et visuelles pour faciliter la mémorisation. Attention à ne pas perdre du temps à recopier votre cours en intégralité.",
    icon: "fas fa-file-alt"
  },
  {
    id: 3,
    title: "Entraînement Régulier",
    description: "La régularité est essentielle. Pratiquez quotidiennement, révisez vos cours et faites des exercices pour consolider vos acquis. La prépa est un marathon, pas un sprint.",
    icon: "fas fa-dumbbell"
  },
  {
    id: 4,
    title: "Apprentissage Actif",
    description: "Ne vous contentez pas de relire : questionnez-vous, reformulez, enseignez à d'autres. Entraînez-vous à retrouver les concepts clés à partir du seul plan de cours.",
    icon: "fas fa-brain"
  },
  {
    id: 5,
    title: "Gestion du Stress",
    description: "Le stress est normal en prépa. Tout le monde stresse, même si c'est plus visible chez certains. Trouvez des routines pour décompresser et garder du recul sur votre travail.",
    icon: "fas fa-heart"
  },
  {
    id: 6,
    title: "Analyse de vos Erreurs",
    description: "Chaque erreur est une opportunité. Relisez attentivement vos copies et analysez vos fautes pour ne plus les reproduire — c'est là que se fait le vrai progrès.",
    icon: "fas fa-search"
  }
]
</script>

<style scoped>
.pedagogie-page { min-height: 100vh; }

.tips-section {
  padding: 64px 0 80px;
  background: white;
}

.section-intro {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 52px;
  color: var(--text-light);
  line-height: 1.8;
  font-size: 1.05rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.tip-card {
  background: var(--bg);
  padding: 28px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  transition: all 0.25s ease;
}

.tip-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  background: white;
}

.tip-icon {
  width: 52px; height: 52px;
  background: var(--accent);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 18px;
}

.tip-icon i { font-size: 1.3rem; color: white; }

.tip-card h3 { font-size: 1.1rem; font-weight: 700; color: var(--text); margin-bottom: 10px; }
.tip-card p  { color: var(--text-light); line-height: 1.7; margin: 0; font-size: 0.95rem; }

@media (max-width: 768px) {
  .tips-grid { grid-template-columns: 1fr; gap: 16px; }
}
</style>
