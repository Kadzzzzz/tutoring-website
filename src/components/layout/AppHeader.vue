<template>
  <header class="header" :class="{ 'header-scrolled': scrolled }">
    <div class="container header-container">
      <a href="#hero" @click.prevent="scrollToSection('hero')" class="logo">Jeremy Luccioni</a>
      <nav class="nav-links">
        <ul>
          <li><a href="#about" @click.prevent="scrollToSection('about')">{{ t('nav.about') }}</a></li>
          <li><a href="#resources" @click.prevent="scrollToSection('resources')">{{ t('nav.resources') }}</a></li>
          <li><a href="#methodology" @click.prevent="scrollToSection('methodology')">{{ t('nav.methodology') }}</a></li>
          <li><a href="#contact" @click.prevent="scrollToSection('contact')">{{ t('nav.contact') }}</a></li>
          <li class="language-selector">
            <button @click="toggleLanguage" class="lang-btn">
              {{ currentLang.toUpperCase() }}
            </button>
          </li>
        </ul>
      </nav>
      <button @click="toggleMobileMenu" class="mobile-menu-btn" :class="{ 'active': mobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useTranslations } from '@/composables/useTranslations.js'
import { useNavigation } from '@/composables/useNavigation.js'

// Composables
const { t, currentLang, toggleLanguage } = useTranslations()
const { scrolled, mobileMenuOpen, scrollToSection, toggleMobileMenu } = useNavigation()
</script>

<style scoped>
/* Variables CSS héritées du parent */
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

/* Sélecteur de langue */
.language-selector {
  margin-left: 20px;
}

.lang-btn {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-white, #ffffff);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all var(--transition-speed, 0.3s);
  cursor: pointer;
}

.lang-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Menu mobile */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 22px;
  z-index: 1101;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-menu-btn span {
  width: 100%;
  height: 3px;
  background-color: var(--text-white, #ffffff);
  border-radius: 1px;
  transition: transform 0.3s ease;
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: translateY(9.5px) rotate(45deg);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: translateY(-9.5px) rotate(-45deg);
}

/* Responsive */
@media (max-width: 814px) {
  .nav-links ul li:not(.language-selector) {
    display: none;
  }

  .language-selector {
    margin-left: 0;
  }

  .mobile-menu-btn {
    display: none !important;
  }
}
</style>