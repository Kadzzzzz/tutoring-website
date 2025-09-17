<template>
  <section id="methodology" class="content-section methodology-section">
    <div class="container">
      <h2>Ma Méthode Pédagogique</h2>
      <div class="methodology-grid">
        <div v-for="item in methodologyItems" :key="item.id" class="methodology-item">
          <div class="methodology-icon" :style="{ backgroundColor: item.color }">
            <i :class="item.iconClass"></i>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Données directement dans le composant (extrait des traductions)
const methodologyItems = [
  {
    id: 1,
    title: "Transmission de la Passion",
    description: "Je crois fermement qu'exceller dans une discipline est beaucoup plus simple quand on l'aime. C'est pourquoi je m'attache à transmettre ma passion pour les sciences autant que mes connaissances.",
    iconClass: "fas fa-heart",
    color: "#e74c3c"
  },
  {
    id: 2,
    title: "Écoute et Personnalisation",
    description: "Chaque élève est unique. Je suis très à l'écoute de mes élèves pour adapter ma pédagogie à leur profil, leurs difficultés et leurs objectifs personnels.",
    iconClass: "fas fa-ear-listen",
    color: "#3498db"
  },
  {
    id: 3,
    title: "Approche Bienveillante",
    description: "En tant que jeune étudiant tout juste sorti de prépa, je comprends les défis que vivent mes élèves. J'offre un encadrement bienveillant qui permet de prendre confiance et de se projeter dans la réussite.",
    iconClass: "fas fa-handshake",
    color: "#27ae60"
  }
]
</script>

<style scoped>
.content-section {
  padding: 80px 0;
  border-bottom: 1px solid var(--border-color, #ddd);
}

.methodology-section {
  background-color: var(--primary-color, #2c3e50);
  color: var(--text-white, #ffffff);
  text-align: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 25px;
}

.methodology-section h2 {
  color: var(--text-white, #ffffff);
  font-family: var(--heading-font, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 1rem;
  font-size: 2.2rem;
}

.methodology-section h2::after {
  content: '';
  display: block;
  width: 70px;
  height: 4px;
  background-color: var(--accent-color, #3498db);
  margin: 15px auto 25px auto;
}

.methodology-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.methodology-item {
  padding: 20px;
  transition: transform var(--transition-speed, 0.3s);
}

.methodology-item:hover {
  transform: translateY(-8px);
}

.methodology-icon {
  width: 75px;
  height: 75px;
  margin: 0 auto 25px;
  background-color: var(--accent-color, #3498db);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2rem;
  color: var(--text-white, #ffffff);
  transition: all var(--transition-speed, 0.3s);
}

.methodology-item h3 {
  margin-bottom: 15px;
  font-size: 1.3rem;
  color: var(--text-white, #ffffff);
  font-family: var(--heading-font, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
  font-weight: 700;
}

.methodology-item p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: 1.2rem;
}
</style>