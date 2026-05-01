<template>
  <div>
    <div class="hero-wrapper">
      <HeroSection />
    </div>

    <!-- Matières -->
    <section id="about" class="content-section subjects-section">
      <div class="container">
        <h2>Choisir une matière</h2>
        <p class="section-description">Accédez directement aux exercices par chapitre</p>
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
        <div v-else-if="loading" class="loading">Chargement...</div>
      </div>
    </section>

    <!-- Accès rapide -->
    <section class="content-section quick-section">
      <div class="container">
        <h2>Autres ressources</h2>
        <div class="quick-grid">
          <router-link to="/colles" class="quick-card">
            <i class="fas fa-clipboard-list quick-icon"></i>
            <div>
              <h3>Colles</h3>
              <p>Planning et planches par semaine</p>
            </div>
          </router-link>
          <router-link to="/concours" class="quick-card">
            <i class="fas fa-trophy quick-icon"></i>
            <div>
              <h3>Concours</h3>
              <p>Sujets écrits et oraux corrigés</p>
            </div>
          </router-link>
          <router-link to="/parcours" class="quick-card">
            <i class="fas fa-graduation-cap quick-icon"></i>
            <div>
              <h3>Mon parcours</h3>
              <p>De la prépa à Centrale Lyon</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <ContactSection />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/api.js'
import HeroSection from '@/components/sections/HeroSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const subjects = ref([])
const loading = ref(true)

const icons = {
  mathematiques: 'fas fa-square-root-alt',
  physique:       'fas fa-atom',
  chimie:         'fas fa-flask'
}
function subjectIcon(slug) { return icons[slug] || 'fas fa-book' }

onMounted(async () => {
  try { subjects.value = await api.getSubjects() }
  catch (e) { console.error(e) }
  finally { loading.value = false }
})
</script>

<style scoped>
.content-section {
  padding: 80px 0;
  border-bottom: 1px solid var(--border-color, #ddd);
}

.subjects-section { background: white; }
.quick-section { background: var(--secondary-color, #f8f9fa); }

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
  margin: 15px auto 25px auto;
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

/* Subject cards */
.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 10px;
}

.subject-card {
  background: white;
  border-radius: 12px;
  padding: 36px 28px;
  text-decoration: none;
  color: var(--primary-color, #2c3e50);
  border: 2px solid transparent;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
  display: block;
}

.subject-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--color, #3b82f6);
}

.subject-card:hover {
  border-color: var(--color, #3b82f6);
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  color: var(--primary-color, #2c3e50);
}

.subject-icon-wrap {
  font-size: 2.5rem;
  color: var(--color, #3b82f6);
  margin-bottom: 16px;
}

.subject-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.subject-card p {
  color: var(--text-light, #666);
  font-size: 0.9rem;
  margin: 0;
}

.subject-arrow {
  position: absolute;
  bottom: 20px;
  right: 24px;
  font-size: 1.2rem;
  color: var(--color, #3b82f6);
  transition: transform 0.2s;
}

.subject-card:hover .subject-arrow { transform: translateX(4px); }

/* Quick cards */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 10px;
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
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  border: 2px solid transparent;
  transition: all 0.25s;
}

.quick-card:hover {
  border-color: var(--accent-color, #3498db);
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  color: var(--primary-color, #2c3e50);
}

.quick-icon {
  font-size: 2.2rem;
  color: var(--accent-color, #3498db);
  flex-shrink: 0;
}

.quick-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.quick-card p {
  font-size: 0.9rem;
  color: var(--text-light, #666);
  margin: 0;
}

.hero-wrapper { margin-top: calc(-1 * var(--header-h)); }

@media (max-width: 768px) {
  .subjects-grid { grid-template-columns: 1fr; gap: 20px; }
  .quick-grid { grid-template-columns: 1fr; }
  .content-section { padding: 60px 0; }
}
</style>
