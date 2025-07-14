<template>
  <section id="hero" class="hero-section">
    <div class="hero-content">
      <h2 class="subtitle">{{ t('hero.subtitle') }}</h2>
      <h1 class="title">{{ t('hero.title') }}</h1>
      <p class="hero-description">{{ t('hero.description') }}</p>
    </div>
    <div class="scroll-indicator">
      <span>{{ t('hero.scrollDown') }}</span>
      <a href="#about" @click.prevent="scrollToSection('about')">
        <div class="arrow-down"></div>
      </a>
    </div>
  </section>
</template>

<script setup>
import { useTranslations } from '@/composables/useTranslations.js'
import { useNavigation } from '@/composables/useNavigation.js'

const { t } = useTranslations()
const { scrollToSection } = useNavigation()
</script>

<style scoped>
.hero-section {
  height: 100vh;
  min-height: 600px;
  background: linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.5)),
              url('https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--text-white, #ffffff);
  text-align: center;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 20px;
}

.subtitle {
  font-size: clamp(1rem, 3vw, 1.3rem);
  letter-spacing: 3px;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.9);
}

.title {
  font-size: clamp(3rem, 8vw, 5rem);
  letter-spacing: 3px;
  margin-bottom: 30px;
  font-weight: 800;
}

.hero-description {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 30px;
  color: rgba(255, 255, 255, 0.85);
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.scroll-indicator span {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 15px;
  color: var(--text-white, #ffffff);
}

.scroll-indicator a {
  text-decoration: none;
}

.arrow-down {
  width: 28px;
  height: 28px;
  border: 2px solid var(--text-white, #ffffff);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin: 0 auto;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0) rotate(45deg); }
  50% { transform: translateY(-10px) rotate(45deg); }
}

@media (max-width: 576px) {
  .title { font-size: 2.5rem; }
  .subtitle { font-size: 0.9rem; }
}
</style>