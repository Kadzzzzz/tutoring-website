<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <p class="hero-tag">Professeur de classes préparatoires</p>
          <h1>Mathématiques, Physique & Chimie</h1>
          <p class="hero-sub">Exercices corrigés, colles, et sujets de concours pour réussir votre prépa.</p>
          <div class="hero-actions">
            <router-link to="/matieres/mathematiques" class="btn btn-primary">Accéder aux exercices</router-link>
            <router-link to="/concours" class="btn btn-outline-white">Annales concours</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Matières -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Choisir une matière</h2>
        <p class="section-sub">Accédez directement aux exercices par chapitre</p>
        <div class="subjects-grid" v-if="subjects.length">
          <router-link
            v-for="s in subjects" :key="s.id"
            :to="`/matieres/${s.slug}`"
            class="subject-card"
            :style="{ '--color': s.color }"
          >
            <div class="subject-icon">{{ subjectIcon(s.slug) }}</div>
            <h3>{{ s.name }}</h3>
            <p>{{ s.chapter_count }} chapitre{{ s.chapter_count > 1 ? 's' : '' }}</p>
            <span class="subject-arrow">→</span>
          </router-link>
        </div>
        <div v-else-if="loading" class="loading">Chargement...</div>
      </div>
    </section>

    <!-- Accès rapide -->
    <section class="section section-dark">
      <div class="container">
        <h2 class="section-title light">Autres ressources</h2>
        <div class="quick-links">
          <router-link to="/colles" class="quick-card">
            <span class="quick-icon">📋</span>
            <div>
              <h3>Colles</h3>
              <p>Planning et planches par semaine</p>
            </div>
          </router-link>
          <router-link to="/concours" class="quick-card">
            <span class="quick-icon">🏆</span>
            <div>
              <h3>Concours</h3>
              <p>Sujets écrits et oraux corrigés</p>
            </div>
          </router-link>
          <router-link to="/parcours" class="quick-card">
            <span class="quick-icon">🎓</span>
            <div>
              <h3>Mon parcours</h3>
              <p>De la prépa à Centrale Lyon</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/api.js'

const subjects = ref([])
const loading = ref(true)

const icons = { mathematiques: '∑', physique: '⚛', chimie: '🧪' }
function subjectIcon(slug) { return icons[slug] || '📚' }

onMounted(async () => {
  try { subjects.value = await api.getSubjects() }
  catch (e) { console.error(e) }
  finally { loading.value = false }
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
  padding: 100px 0 80px;
  color: white;
}
.hero-tag { font-size: 0.9rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 1rem; }
.hero h1 { color: white; margin-bottom: 1.2rem; }
.hero-sub { font-size: 1.2rem; color: rgba(255,255,255,0.75); max-width: 560px; margin-bottom: 2rem; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-outline-white { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.5); padding: 8px 18px; border-radius: 8px; font-weight: 600; font-size: 0.9rem; display: inline-flex; align-items: center; transition: all 0.2s; }
.btn-outline-white:hover { background: rgba(255,255,255,0.1); border-color: white; color: white; }

.section { padding: 80px 0; }
.section-dark { background: var(--primary); }
.section-title { margin-bottom: 0.5rem; }
.section-title.light { color: white; }
.section-sub { color: var(--text-light); margin-bottom: 3rem; }

.subjects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

.subject-card {
  background: white; border-radius: var(--radius);
  padding: 36px 28px; text-decoration: none; color: var(--text);
  border: 2px solid transparent; transition: all 0.25s;
  position: relative; overflow: hidden;
  box-shadow: var(--shadow);
}
.subject-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: var(--color);
}
.subject-card:hover { border-color: var(--color); transform: translateY(-4px); box-shadow: var(--shadow-lg); color: var(--text); }
.subject-icon { font-size: 2.5rem; margin-bottom: 16px; display: block; }
.subject-card h3 { font-size: 1.4rem; color: var(--text); margin-bottom: 4px; }
.subject-card p { color: var(--text-light); font-size: 0.9rem; margin: 0; }
.subject-arrow { position: absolute; bottom: 20px; right: 24px; font-size: 1.3rem; color: var(--color); transition: transform 0.2s; }
.subject-card:hover .subject-arrow { transform: translateX(4px); }

.quick-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 2rem; }
.quick-card {
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius); padding: 24px; display: flex; align-items: center; gap: 16px;
  color: white; text-decoration: none; transition: all 0.2s;
}
.quick-card:hover { background: rgba(255,255,255,0.12); color: white; transform: translateY(-2px); }
.quick-icon { font-size: 2rem; }
.quick-card h3 { font-size: 1rem; color: white; margin-bottom: 4px; }
.quick-card p { font-size: 0.85rem; color: rgba(255,255,255,0.6); margin: 0; }

@media (max-width: 768px) {
  .subjects-grid { grid-template-columns: 1fr; }
  .quick-links { grid-template-columns: 1fr; }
  .hero { padding: 60px 0 50px; }
}
</style>
