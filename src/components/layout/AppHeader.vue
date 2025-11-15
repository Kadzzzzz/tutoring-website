<template>
  <header class="header" :class="{ 'header-scrolled': scrolled }">
    <div class="container header-container">
      <router-link to="/" class="logo">Jeremy Luccioni</router-link>

      <!-- Menu hamburger pour mobile -->
      <button class="hamburger" @click="toggleMobileMenu" :class="{ 'active': mobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation desktop -->
      <nav class="nav-links desktop-nav">
        <ul>
          <li>
            <router-link to="/" class="nav-router-link">Accueil</router-link>
          </li>
          <li>
            <router-link to="/resources" class="nav-router-link">Ressources</router-link>
          </li>
          <li>
            <router-link to="/colles" class="nav-router-link">Colles</router-link>
          </li>
          <li>
            <router-link to="/pedagogie" class="nav-router-link">Pédagogie</router-link>
          </li>
          <li>
            <router-link to="/parcours" class="nav-router-link">Parcours</router-link>
          </li>
        </ul>
      </nav>

      <!-- Menu mobile -->
      <nav class="mobile-nav" :class="{ 'open': mobileMenuOpen }">
        <ul>
          <li>
            <router-link to="/" class="nav-router-link" @click="closeMobileMenu">Accueil</router-link>
          </li>
          <li>
            <router-link to="/resources" class="nav-router-link" @click="closeMobileMenu">Ressources</router-link>
          </li>
          <li>
            <router-link to="/colles" class="nav-router-link" @click="closeMobileMenu">Colles</router-link>
          </li>
          <li>
            <router-link to="/pedagogie" class="nav-router-link" @click="closeMobileMenu">Pédagogie</router-link>
          </li>
          <li>
            <router-link to="/parcours" class="nav-router-link" @click="closeMobileMenu">Parcours</router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Overlay pour fermer le menu en cliquant à l'extérieur -->
    <div class="mobile-overlay" v-if="mobileMenuOpen" @click="closeMobileMenu"></div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigation } from '@/composables/useNavigation.js'

const route = useRoute()
const { scrolled } = useNavigation()

// État du menu mobile
const mobileMenuOpen = ref(false)

// Fonctions pour gérer le menu mobile
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  // Empêcher le scroll du body quand le menu est ouvert
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// Fermer le menu quand on change de route
watch(() => route.path, () => {
  closeMobileMenu()
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: var(--header-height, 70px);
  background-color: rgba(44, 62, 80, 0.95);
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
  position: relative;
}

.header .logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-white, #ffffff);
  text-decoration: none;
  transition: color var(--transition-speed);
  z-index: 1002;
}

.header .logo:hover {
  color: var(--accent-color, #3498db);
}

/* Menu hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1002;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: var(--text-white);
  border-radius: 3px;
  transition: all 0.3s;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Navigation desktop */
.desktop-nav ul {
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

/* Menu mobile - caché par défaut */
.mobile-nav {
  display: none;
}

/* Overlay mobile */
.mobile-overlay {
  display: none;
}

/* Responsive - Afficher le menu hamburger sur mobile */
@media (max-width: 768px) {
  .header {
    background-color: rgba(44, 62, 80, 0.95);
  }

  .hamburger {
    display: flex;
  }

  .desktop-nav {
    display: none;
  }

  /* Menu mobile */
  .mobile-nav {
    display: block;
    position: fixed;
    top: var(--header-height, 70px);
    right: -100%;
    width: 280px;
    height: calc(100vh - var(--header-height, 70px));
    background-color: rgba(44, 62, 80, 0.98);
    transition: right 0.3s ease-in-out;
    overflow-y: auto;
    z-index: 1001;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
  }

  .mobile-nav.open {
    right: 0;
  }

  .mobile-nav ul {
    list-style: none;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
  }

  .mobile-nav li {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .mobile-nav a {
    display: block;
    padding: 1.2rem 2rem;
    color: var(--text-white, #ffffff);
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    transition: all 0.3s;
  }

  .mobile-nav a:hover,
  .mobile-nav a.router-link-active {
    background-color: rgba(52, 152, 219, 0.2);
    color: var(--accent-color, #3498db);
    padding-left: 2.5rem;
  }

  /* Overlay */
  .mobile-overlay {
    display: block;
    position: fixed;
    top: var(--header-height, 70px);
    left: 0;
    width: 100%;
    height: calc(100vh - var(--header-height, 70px));
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .header .logo {
    font-size: 1.5rem;
  }
}

/* Très petits écrans */
@media (max-width: 480px) {
  .mobile-nav {
    width: 100%;
  }

  .header .logo {
    font-size: 1.3rem;
  }
}
</style>