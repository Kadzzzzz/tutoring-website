<template>
  <div class="mobile-menu" :class="{ 'active': mobileMenuOpen }">
    <ul>
      <li><a href="#about" @click="scrollToSectionMobile('about')">{{ t('nav.about') }}</a></li>
      <li><a href="#resources" @click="scrollToSectionMobile('resources')">{{ t('nav.resources') }}</a></li>
      <li><a href="#methodology" @click="scrollToSectionMobile('methodology')">{{ t('nav.methodology') }}</a></li>
      <li><a href="#contact" @click="scrollToSectionMobile('contact')">{{ t('nav.contact') }}</a></li>
      <li class="mobile-language">
        <button @click="toggleLanguage" class="mobile-lang-btn">
          {{ currentLang === 'fr' ? 'Switch to English' : 'Passer en Français' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTranslations } from '@/composables/useTranslations.js'
import { useNavigation } from '@/composables/useNavigation.js'

const { t, currentLang, toggleLanguage } = useTranslations()
const { mobileMenuOpen, scrollToSectionMobile } = useNavigation()
</script>

<style scoped>
.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  right: -100%;
  width: 85%;
  max-width: 320px;
  height: 100vh;
  background-color: var(--primary-color, #2c3e50);
  z-index: 1099;
  padding: 80px 30px 40px 30px;
  transition: right 0.4s ease;
}

.mobile-menu.active {
  right: 0;
}

.mobile-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-menu li {
  margin-bottom: 15px;
}

.mobile-menu a {
  color: var(--text-white, #ffffff);
  font-size: 1.2rem;
  display: block;
  padding: 12px 0;
  text-decoration: none;
}

.mobile-language {
  padding: 15px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-lang-btn {
  color: var(--text-white, #ffffff);
  font-size: 1rem;
  padding: 10px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
}
</style>