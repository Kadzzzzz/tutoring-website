<template>
  <header class="header" :class="{ 'header-scrolled': scrolled }">
    <div class="container header-container">
      <router-link to="/" class="logo">Jeremy Luccioni</router-link>
      <nav class="nav-links">
        <ul>
          <li><a href="#about" @click.prevent="scrollToSection('about')" v-if="isHomePage">À propos</a></li>
          <li><a href="#resources" @click.prevent="scrollToSection('resources')" v-if="isHomePage">Ressources</a></li>
          <li><a href="#methodology" @click.prevent="scrollToSection('methodology')" v-if="isHomePage">Méthode</a></li>
          <li><a href="#contact" @click.prevent="scrollToSection('contact')" v-if="isHomePage">Contact</a></li>

          <!-- Navigation pour les autres pages -->
          <li v-if="!isHomePage">
            <router-link to="/" class="nav-router-link">Accueil</router-link>
          </li>
          <li>
            <router-link to="/colles" class="nav-router-link">Colles</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import {useNavigation} from '@/composables/useNavigation.js'

const route = useRoute()
const {scrolled, scrollToSection} = useNavigation()

// Déterminer si on est sur la page d'accueil
const isHomePage = computed(() => route.name === 'Home')
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: var(--header-height, 70px);
  background-color: transparent;
  transition: background-color var(--transition-speed, 0.3s), box-shadow var(--transition-speed, 0.3s);
  display: flex;
  align-items: center;
}

.header-scrolled {
  background-color: rgba(44, 62, 80, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-white, #ffffff);
  text-decoration: none;
  transition: color var(--transition-speed);
}

.header .logo:hover {
  color: var(--accent-color, #3498db);
}

.nav-links ul {
  display: flex;
  list-style: none;
  gap: 35px;
}

.nav-links a {
  color: var(--text-white, #ffffff);
  font-weight: 500;
  position: relative;
  padding-bottom: 5px;
  text-decoration: none;
  transition: color var(--transition-speed);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--accent-color, #3498db);
  transition: width var(--transition-speed, 0.3s);
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-links a:hover {
  color: var(--accent-color, #3498db);
}

/* Styles spécifiques pour les router-links */
.nav-router-link {
  display: inline-block;
}

.nav-router-link.router-link-active {
  color: var(--accent-color, #3498db);
}

.nav-router-link.router-link-active::after {
  width: 100%;
}

/* Responsive - cache la navigation sur petit écran */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  /* TODO: Ajouter un menu hamburger pour mobile */
}

/* Style pour les pages autres que l'accueil */
.header:not(.header-scrolled) {
  background-color: rgba(44, 62, 80, 0.95);
}

/* Assurer que le header est visible sur toutes les pages */
@media (max-width: 768px) {
  .header {
    background-color: rgba(44, 62, 80, 0.95);
  }
}
</style>