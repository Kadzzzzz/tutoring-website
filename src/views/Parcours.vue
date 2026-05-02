<template>
  <div class="parcours-page">

    <!-- Bannière photo -->
    <div class="parcours-banner">
      <div class="banner-overlay"></div>
      <div class="container banner-content">
        <p class="banner-eyebrow">Centrale Lyon · Physique · Mathématiques</p>
        <h1>Mon Parcours</h1>
        <p class="banner-sub">De la prépa à l'École Centrale de Lyon</p>
      </div>
    </div>

    <!-- Contenu -->
    <AboutSection />

  </div>
</template>

<script setup>
import AboutSection from '@/components/sections/AboutSection.vue'
</script>

<style scoped>
.parcours-page { min-height: 100vh; }

/* ── Bannière ─────────────────────────────────────────── */
.parcours-banner {
  position: relative;
  height: 460px;
  background-image: url('/images/parcours-banner.jpg');
  background-size: cover;
  background-position: center 25%;
  overflow: hidden;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  /* Gradient : sombre en bas (texte) + voile général pour lisibilité */
  background:
    linear-gradient(to top,  rgba(10, 15, 35, 0.92) 0%, rgba(10, 15, 35, 0.55) 45%, rgba(10, 15, 35, 0.25) 100%),
    linear-gradient(to right, rgba(10, 15, 35, 0.4) 0%, transparent 60%);
}

.banner-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 52px;
}

.banner-eyebrow {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 10px;
}

.banner-content h1 {
  color: white;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  margin-bottom: 10px;
  line-height: 1.1;
}

.banner-sub {
  color: rgba(255, 255, 255, 0.72);
  font-size: 1.1rem;
  margin: 0;
}

/* Masque le titre redondant dans AboutSection */
:deep(.section-title) { display: none; }
:deep(.content-section) { padding-top: 64px; }

@media (max-width: 768px) {
  .parcours-banner { height: 340px; background-position: 35% 25%; }
  .banner-content  { padding-bottom: 36px; }
}
</style>
