<template>
  <div class="parcours-page">
    <!-- Section Mon Parcours -->
    <AboutSection/>
  </div>
</template>

<script setup>
import AboutSection from '@/components/sections/AboutSection.vue'
</script>

<style scoped>
.parcours-page {
  min-height: 100vh;
  padding-top: var(--header-height, 70px);
}
</style>
