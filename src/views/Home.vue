<template>
  <div>
    <!-- Hero plein écran -->
    <div class="hero-wrapper">
      <HeroSection />
    </div>

    <!-- Matières (DB) -->
    <section class="content-section subjects-section">
      <div class="container">
        <h2>Accéder aux Ressources</h2>
        <p class="section-desc">Exercices corrigés, méthodes et cours classés par matière et chapitre</p>
        <div v-if="loading" class="loading-spin">
          <i class="fas fa-spinner fa-spin"></i> Chargement...
        </div>
        <div v-else class="subjects-grid">
          <router-link
            v-for="s in mainSubjects" :key="s.id"
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
        <div class="more-subjects">
          <router-link to="/matieres" class="btn-more">
            <i class="fas fa-th-large"></i> Voir toutes les matières
          </router-link>
        </div>
      </div>
    </section>

    <!-- Autres ressources -->
    <section class="content-section quick-section">
      <div class="container">
        <h2>Autres Ressources</h2>
        <div class="quick-grid">
          <router-link to="/colles" class="quick-card">
            <div class="quick-icon-wrap" style="background: var(--accent)">
              <i class="fas fa-clipboard-list"></i>
            </div>
            <div>
              <h3>Colles</h3>
              <p>Planning et planches par semaine pour MPSI, PCSI, MP, PC</p>
            </div>
            <i class="fas fa-chevron-right quick-chevron"></i>
          </router-link>
          <router-link to="/concours" class="quick-card">
            <div class="quick-icon-wrap" style="background: #e74c3c">
              <i class="fas fa-trophy"></i>
            </div>
            <div>
              <h3>Concours</h3>
              <p>Sujets écrits et oraux avec corrections détaillées</p>
            </div>
            <i class="fas fa-chevron-right quick-chevron"></i>
          </router-link>
          <router-link to="/pedagogie" class="quick-card">
            <div class="quick-icon-wrap" style="background: #7c3aed">
              <i class="fas fa-lightbulb"></i>
            </div>
            <div>
              <h3>Conseils</h3>
              <p>Méthode de travail et stratégies pour réussir en prépa</p>
            </div>
            <i class="fas fa-chevron-right quick-chevron"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <ContactSection />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '@/api.js'
import HeroSection    from '@/components/sections/HeroSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const subjects = ref([])
const loading  = ref(true)

const MAIN_SLUGS = ['mathematiques', 'physique']
const mainSubjects = computed(() =>
  subjects.value.filter(s => MAIN_SLUGS.includes(s.slug))
)

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
.hero-wrapper { margin-top: calc(-1 * var(--header-h)); }

.content-section {
  padding: 80px 0;
  border-bottom: 1px solid var(--border);
}

.subjects-section { background: white; }
.quick-section    { background: var(--bg); }

.content-section h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0;
}

.content-section h2::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: var(--accent);
  margin: 14px auto 28px;
  border-radius: 2px;
}

.section-desc {
  text-align: center;
  color: var(--text-light);
  font-size: 1.05rem;
  margin-bottom: 48px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}

/* Cartes matières */
.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.subject-card {
  background: white;
  border-radius: var(--radius);
  padding: 32px 24px;
  text-decoration: none;
  color: var(--text);
  border: 2px solid var(--border);
  box-shadow: var(--shadow);
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
  display: block;
}

.subject-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--color, var(--accent));
}

.subject-card:hover {
  border-color: var(--color, var(--accent));
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  color: var(--text);
}

.subject-icon-wrap {
  font-size: 2.2rem;
  color: var(--color, var(--accent));
  margin-bottom: 16px;
}

.subject-card h3 { font-size: 1.3rem; font-weight: 700; margin-bottom: 4px; }
.subject-card p  { color: var(--text-light); font-size: 0.9rem; margin: 0; }

.subject-arrow {
  position: absolute;
  bottom: 20px; right: 22px;
  font-size: 1rem;
  color: var(--color, var(--accent));
  transition: transform 0.2s;
}
.subject-card:hover .subject-arrow { transform: translateX(4px); }

.more-subjects {
  text-align: center;
  margin-top: 36px;
}

.btn-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 10px;
  background: white;
  color: var(--accent);
  font-weight: 700;
  font-size: 0.95rem;
  border: 2px solid var(--accent);
  text-decoration: none;
  transition: all 0.2s;
}
.btn-more:hover {
  background: var(--accent);
  color: white;
}

/* Cartes accès rapide */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.quick-card {
  background: white;
  border-radius: var(--radius);
  padding: 24px 20px;
  display: flex;
  align-items: center;
  gap: 18px;
  text-decoration: none;
  color: var(--text);
  box-shadow: var(--shadow);
  border: 2px solid transparent;
  transition: all 0.25s ease;
}

.quick-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  color: var(--text);
}

.quick-icon-wrap {
  width: 52px; height: 52px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: white; font-size: 1.3rem;
}

.quick-card div { flex: 1; }
.quick-card h3  { font-size: 1.05rem; font-weight: 700; margin-bottom: 4px; }
.quick-card p   { font-size: 0.88rem; color: var(--text-light); margin: 0; line-height: 1.5; }

.quick-chevron { color: var(--border); font-size: 0.9rem; transition: all 0.2s; }
.quick-card:hover .quick-chevron { color: var(--accent); transform: translateX(3px); }

.loading-spin { text-align: center; padding: 40px; color: var(--text-light); }

@media (max-width: 768px) {
  .subjects-grid { grid-template-columns: 1fr; gap: 16px; }
  .quick-grid    { grid-template-columns: 1fr; }
  .content-section { padding: 56px 0; }
}
</style>
