<template>
  <div class="home">
    <!-- Section Hero -->
    <HeroSection/>

    <!-- Section Navigation Cards -->
    <section class="navigation-section">
      <div class="container">
        <h2 class="section-title">Explorez mon univers pédagogique</h2>
        <p class="section-subtitle">
          Découvrez qui je suis, ma méthode d'enseignement, et accédez à toutes mes ressources pédagogiques
        </p>

        <div class="navigation-cards">
          <router-link
            v-for="card in navigationCards"
            :key="card.id"
            :to="card.link"
            class="nav-card"
            :style="{ '--card-color': card.color }"
          >
            <div class="card-icon">
              <i :class="card.icon"></i>
            </div>
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-description">{{ card.description }}</p>
            <div class="card-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Section Contact -->
    <ContactSection/>
  </div>
</template>

<script setup>
import HeroSection from '@/components/sections/HeroSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const navigationCards = [
  {
    id: 1,
    title: "Ressources Pédagogiques",
    description: "Accédez à tous mes cours, exercices corrigés et vidéos explicatives",
    link: "/resources",
    icon: "fas fa-book-open",
    color: "#10b981"
  },
  {
    id: 2,
    title: "Colles & Exercices",
    description: "Entraînez-vous avec mes exercices de colles en Physique-Chimie",
    link: "/colles",
    icon: "fas fa-flask",
    color: "#f59e0b"
  },
  {
    id: 3,
    title: "Mon Parcours",
    description: "Découvrez mon parcours académique et professionnel, de la prépa à Centrale Lyon",
    link: "/parcours",
    icon: "fas fa-graduation-cap",
    color: "#3b82f6"
  },
  {
    id: 4,
    title: "Pédagogie & Méthode",
    description: "Ma méthode d'enseignement et mes conseils pour réussir vos études scientifiques",
    link: "/pedagogie",
    icon: "fas fa-chalkboard-teacher",
    color: "#8b5cf6"
  }
]
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.navigation-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 25px;
}

.section-title {
  text-align: center;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.section-subtitle {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px auto;
  color: #475569;
  line-height: 1.8;
  font-size: 1.125rem;
}

.navigation-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 50px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.nav-card {
  position: relative;
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  overflow: hidden;
}

.nav-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: var(--card-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
  border-color: var(--card-color);
}

.nav-card:hover::before {
  transform: scaleX(1);
}

.card-icon {
  width: 70px;
  height: 70px;
  background: var(--card-color);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.card-icon i {
  font-size: 2rem;
  color: white;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 15px;
  transition: color 0.3s;
}

.nav-card:hover .card-title {
  color: var(--card-color);
}

.card-description {
  color: #64748b;
  line-height: 1.7;
  font-size: 1rem;
  margin-bottom: 20px;
}

.card-arrow {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
}

.card-arrow i {
  font-size: 1.25rem;
  color: var(--card-color);
  transition: transform 0.3s;
}

.nav-card:hover .card-arrow i {
  transform: translateX(5px);
}

/* Responsive */
@media (max-width: 768px) {
  .navigation-section {
    padding: 60px 0;
  }

  .navigation-cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .nav-card {
    padding: 30px 25px;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
