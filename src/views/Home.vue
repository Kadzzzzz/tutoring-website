<template>
  <div class="home">
    <!-- Section Hero -->
    <HeroSection/>

    <!-- Section About -->
    <AboutSection/>

    <!-- Section Resources -->
    <ResourcesSection
      @openResourceModal="openResourceModal"
    />

    <!-- Section Methodology -->
    <MethodologySection/>

    <!-- Section Contact -->
    <ContactSection/>

    <!-- Resource Modal -->
    <ResourceModal
      v-if="selectedResource"
      :resource="selectedResource"
      @close="closeResourceModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ResourceModal from '@/components/ResourceModal.vue'

//IMPORTS MODULAIRES
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ResourcesSection from '@/components/sections/ResourcesSection.vue'
import MethodologySection from '@/components/sections/MethodologySection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

// ÉTAT LOCAL (juste la modal)
const selectedResource = ref(null)

// MÉTHODES
const openResourceModal = (resource) => {
  selectedResource.value = resource
  document.body.style.overflow = 'hidden'
}

const closeResourceModal = () => {
  selectedResource.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style>