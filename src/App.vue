<template>
  <div class="app">
    <!-- Header -->
    <AppHeader/>

    <!-- Menu Mobile -->
    <MobileMenu/>

    <main>
      <!-- Section Hero -->
      <HeroSection/>

      <!-- Section About -->
      <AboutSection/>

      <!-- Section Resources -->
      <ResourcesSection
        :subjects="subjects"
        :resources="resources"
        :activeSubject="activeSubject"
        @update:activeSubject="setActiveSubject"
        @openResourceModal="openResourceModal"
      />

      <!-- Section Methodology -->
      <MethodologySection/>

      <!-- Section Contact -->
      <ContactSection/>
    </main>
    <!-- Footer -->
    <AppFooter/>

    <!-- Resource Modal -->
    <ResourceModal
      v-if="selectedResource"
      :resource="selectedResource"
      @close="closeResourceModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ResourceModal from './components/ResourceModal.vue'
import { useTranslations } from '@/composables/useTranslations.js'

//IMPORTS MODULAIRES
import AppHeader from '@/components/layout/AppHeader.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ResourcesSection from '@/components/sections/ResourcesSection.vue'
import MethodologySection from '@/components/sections/MethodologySection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import AppFooter from '@/components/layout/AppFooter.vue'


// COMPOSABLE
const { loadSavedLanguage } = useTranslations()

// ÉTAT GLOBAL MINIMAL (juste la modal)
const selectedResource = ref(null)

// MÉTHODES GLOBALES
const openResourceModal = (resource) => {
  selectedResource.value = resource
  document.body.style.overflow = 'hidden'
}

const closeResourceModal = () => {
  selectedResource.value = null
  document.body.style.overflow = ''
}

// LIFECYCLE
onMounted(() => {
  loadSavedLanguage()
})

</script>




<style>
/* Variables CSS globales (partagées par tous les composants) */
:root {
  --primary-color: #2c3e50;
  --secondary-color: #f8f9fa;
  --accent-color: #3498db;
  --text-color: #333;
  --text-light: #666;
  --text-white: #ffffff;
  --border-color: #ddd;
  --heading-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --body-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --transition-speed: 0.3s;
  --box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  --header-height: 70px;
}

/* Reset global */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--body-font);
  line-height: 1.7;
  color: var(--text-color);
  background-color: var(--secondary-color);
  overflow-x: hidden;
}

/* Utilitaires globaux */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 25px;
}

h2, h3, h4, h5, h6 {
  font-family: var(--heading-font);
  font-weight: 700;
  line-height: 1.3;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

h2 { font-size: 2.2rem; }
h3 { font-size: 1.5rem; }

p {
  margin-bottom: 1.2rem;
  color: var(--text-light);
}

a {
  text-decoration: none;
  color: var(--accent-color);
  transition: color var(--transition-speed);
}

a:hover {
  color: #2980b9;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  font-family: inherit;
  transition: all var(--transition-speed);
}

</style>