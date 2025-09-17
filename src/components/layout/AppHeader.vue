<template>
  <header class="header" :class="{ 'header-scrolled': scrolled }">
    <div class="container header-container">
      <a href="#hero" @click.prevent="scrollToSection('hero')" class="logo">Jeremy Luccioni</a>
      <nav class="nav-links">
        <ul>
          <li><a href="#about" @click.prevent="scrollToSection('about')">À propos</a></li>
          <li><a href="#resources" @click.prevent="scrollToSection('resources')">Ressources</a></li>
          <li><a href="#methodology" @click.prevent="scrollToSection('methodology')">Méthode</a></li>
          <li><a href="#contact" @click.prevent="scrollToSection('contact')">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useNavigation } from '@/composables/useNavigation.js'

const { scrolled, scrollToSection } = useNavigation()
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

/* Responsive - cache la navigation sur petit écran */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>