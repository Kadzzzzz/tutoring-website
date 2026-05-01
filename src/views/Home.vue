<template>
  <div>
    <!-- Hero plein écran avec image Unsplash -->
    <div class="hero-wrapper">
      <HeroSection />
    </div>

    <!-- Mon Parcours (bio + timeline) -->
    <AboutSection />

    <!-- Méthode Pédagogique (fond sombre, 3 cartes) -->
    <MethodologySection />

    <!-- Matières (connecté à la base de données) -->
    <section id="about" class="content-section subjects-section">
      <div class="container">
        <h2>Accéder aux Ressources</h2>
        <p class="section-description">Exercices corrigés, méthodes et cours classés par matière et chapitre</p>
        <div class="subjects-grid" v-if="subjects.length">
          <router-link
            v-for="s in subjects" :key="s.id"
            :to="`/matieres/${s.slug}`"
            class="subject-card"
            :style="{ '--color': s.color }"
          >
            <div class="subject-icon-wrap">
              <i :class="subjectIcon(s.slug)"></i>
            </div>
            <h3>{{ s.name }}</h3>
            <p>{{ s.chapter_count }} chapitre{{ s.chapter_count > 1 ? 's' : '' }}</p>
            <span class="subject-arrow"><i class="fas fa-arrow-right"></i></span>
          </router-link>
        </div>
        <div v-else-if="loading" class="loading-spin">
          <i class="fas fa-spinner fa-spin"></i> Chargement...
        </div>
      </div>
    </section>

    <!-- Autres ressources (Colles + Concours) -->
    <section class="content-section quick-section">
      <div class="container">
        <h2>Autres Ressources</h2>
        <div class="quick-grid">
          <router-link to="/colles" class="quick-card">
            <div class="quick-icon-wrap" style="background:#3498db">
              <i class="fas fa-clipboard-list"></i>
            </div>
            <div>
              <h3>Colles</h3>
              <p>Planning et planches par semaine pour MPSI, PCSI, MP, PC</p>
            </div>
            <i class="fas fa-chevron-right quick-chevron"></i>
          </router-link>
          <router-link to="/concours" class="quick-card">
            <div class="quick-icon-wrap" style="background:#e74c3c">
              <i class="fas fa-trophy"></i>
            </div>
            <div>
              <h3>Concours</h3>
              <p>Sujets écrits et oraux avec corrections détaillées</p>
            </div>
            <i class="fas fa-chevron-right quick-chevron"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Contact + réseaux sociaux -->
    <ContactSection />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/api.js'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import MethodologySection from '@/components/sections/MethodologySection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const subjects = ref([])
const loading = ref(true)

const icons = {
  mathematiques: 'fas fa-square-root-alt',
  physique:      'fas fa-atom',
  chimie:        'fas fa-flask'
}
function subjectIcon(slug) { return icons[slug] || 'fas fa-book' }

onMounted(async () => {
  try { subjects.value = await api.getSubjects() }
  catch (e) { console.error(e) }
  finally { loading.value = false }
})
</script>

<style scoped>
/* Annule le padding-top du <main> pour que le héros parte du haut */
.hero-wrapper { margin-top: calc(-1 * var(--header-h)); }

/* ---- Sections communes ---- */
.content-section {
  padding: 80px 0;
  border-bottom: 1px solid var(--border-color, #ddd);
}

.subjects-section { background: white; }
.quick-section    { background: var(--secondary-color, #f8f9fa); }

.content-section h2 {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--primary-color, #2c3e50);
  margin-bottom: 0;
}

.content-section h2::after {
  content: '';
  display: block;
  width: 70px;
  height: 4px;
  background-color: var(--accent-color, #3498db);
  margin: 15px auto 30px auto;
}

.section-description {
  text-align: center;
  color: var(--text-light, #666);
  font-size: 1.1rem;
  margin-bottom: 50px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* ---- Cartes matières ---- */
.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.subject-card {
  background: white;
  border-radius: 12px;
  padding: 36px 28px;
  text-decoration: none;
  color: var(--primary-color, #2c3e50);
  border: 2px solid var(--border-color, #eee);
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: block;
}

.subject-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--color, #3498db);
}

.subject-card:hover {
  border-color: var(--color, #3498db);
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  color: var(--primary-color, #2c3e50);
}

.subject-icon-wrap {
  font-size: 2.5rem;
  color: var(--color, #3498db);
  margin-bottom: 18px;
}

.subject-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.subject-card p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.subject-arrow {
  position: absolute;
  bottom: 22px;
  right: 26px;
  font-size: 1.1rem;
  color: var(--color, #3498db);
  transition: transform 0.2s;
}
.subject-card:hover .subject-arrow { transform: translateX(5px); }

/* ---- Cartes accès rapide ---- */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.quick-card {
  background: white;
  border-radius: 12px;
  padding: 28px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: var(--primary-color, #2c3e50);
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.quick-card:hover {
  border-color: var(--accent-color, #3498db);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  color: var(--primary-color, #2c3e50);
}

.quick-icon-wrap {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
  font-size: 1.5rem;
}

.quick-card div { flex: 1; }

.quick-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.quick-card p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.quick-chevron {
  color: #ccc;
  font-size: 1rem;
  transition: all 0.2s;
}
.quick-card:hover .quick-chevron {
  color: var(--accent-color, #3498db);
  transform: translateX(3px);
}

/* ---- Divers ---- */
.loading-spin {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .subjects-grid { grid-template-columns: 1fr; gap: 20px; }
  .quick-grid    { grid-template-columns: 1fr; }
  .content-section { padding: 60px 0; }
}
</style>
