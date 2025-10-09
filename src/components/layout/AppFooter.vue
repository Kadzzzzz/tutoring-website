<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">Jeremy Luccioni</div>
        <nav class="footer-nav">
          <!-- Si on est sur la page d'accueil, utiliser les ancres -->
          <template v-if="isHomePage">
            <a href="#about" @click.prevent="scrollToSection('about')">À propos</a>
            <a href="#resources" @click.prevent="scrollToSection('resources')">Ressources</a>
            <a href="#methodology" @click.prevent="scrollToSection('methodology')">Méthode</a>
            <a href="#contact" @click.prevent="scrollToSection('contact')">Contact</a>
          </template>

          <!-- Si on est sur une autre page, utiliser des router-links -->
          <template v-else>
            <router-link to="/#about">À propos</router-link>
            <router-link to="/resources">Ressources</router-link>
            <router-link to="/#methodology">Méthode</router-link>
            <router-link to="/#contact">Contact</router-link>
          </template>
        </nav>
      </div>
      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} Jeremy Luccioni. Libre de droit</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigation } from '@/composables/useNavigation.js'

const route = useRoute()
const { scrollToSection } = useNavigation()

// Déterminer si on est sur la page d'accueil
const isHomePage = computed(() => route.name === 'Home')
</script>

<style scoped>
.footer {
  background-color: #1a1a1a;
  color: rgba(255, 255, 255, 0.7);
  padding: 40px 0 20px;
  text-align: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 25px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-white, #ffffff);
}

.footer-nav {
  display: flex;
  gap: 30px;
}

.footer-nav a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color var(--transition-speed, 0.3s);
}

.footer-nav a:hover {
  color: var(--accent-color, #3498db);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  font-size: 0.9rem;
}

.footer-bottom p {
  margin: 0;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 20px;
  }

  .footer-nav {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>