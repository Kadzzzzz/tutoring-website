<template>
  <header class="header" :class="{ scrolled }">
    <div class="container header-inner">
      <router-link to="/" class="logo">Jeremy Luccioni</router-link>

      <nav class="nav desktop">
        <router-link to="/">Accueil</router-link>
        <div class="dropdown">
          <button class="dropdown-btn">Matières ▾</button>
          <div class="dropdown-menu">
            <router-link to="/matieres/mathematiques">Mathématiques</router-link>
            <router-link to="/matieres/physique">Physique</router-link>
            <router-link to="/matieres/chimie">Chimie</router-link>
          </div>
        </div>
        <router-link to="/colles">Colles</router-link>
        <router-link to="/concours">Concours</router-link>
        <router-link to="/parcours">Parcours</router-link>
      </nav>

      <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen">
        <span /><span /><span />
      </button>
    </div>

    <nav class="mobile-nav" :class="{ open: menuOpen }" @click="menuOpen = false">
      <router-link to="/">Accueil</router-link>
      <router-link to="/matieres/mathematiques">Mathématiques</router-link>
      <router-link to="/matieres/physique">Physique</router-link>
      <router-link to="/matieres/chimie">Chimie</router-link>
      <router-link to="/colles">Colles</router-link>
      <router-link to="/concours">Concours</router-link>
      <router-link to="/parcours">Parcours</router-link>
    </nav>
    <div v-if="menuOpen" class="overlay" @click="menuOpen = false" />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const scrolled = ref(false)
const menuOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => { menuOpen.value = false })

function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.header {
  position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
  height: var(--header-h);
  background: rgba(26, 26, 46, 0.97);
  transition: box-shadow 0.3s;
  display: flex; align-items: center;
}
.header.scrolled { box-shadow: 0 2px 20px rgba(0,0,0,0.3); }

.header-inner { display: flex; align-items: center; justify-content: space-between; }

.logo { font-size: 1.4rem; font-weight: 800; color: white; letter-spacing: -0.5px; }
.logo:hover { color: var(--accent); }

.nav { display: flex; align-items: center; gap: 8px; }
.nav > a, .dropdown-btn {
  color: rgba(255,255,255,0.85);
  font-weight: 500; font-size: 0.95rem;
  padding: 6px 12px; border-radius: 6px;
  transition: all 0.2s; background: none; cursor: pointer;
}
.nav > a:hover, .dropdown-btn:hover,
.nav > a.router-link-active { color: white; background: rgba(255,255,255,0.1); }

.dropdown { position: relative; }
.dropdown-menu {
  display: none; position: absolute; top: calc(100% + 8px); left: 0;
  background: white; border-radius: 10px; box-shadow: var(--shadow-lg);
  min-width: 200px; padding: 8px; overflow: hidden;
}
.dropdown:hover .dropdown-menu { display: block; }
.dropdown-menu a {
  display: block; padding: 10px 14px; color: var(--text);
  font-weight: 500; border-radius: 6px; transition: background 0.15s;
}
.dropdown-menu a:hover { background: var(--bg); }

.hamburger { display: none; flex-direction: column; gap: 5px; padding: 8px; z-index: 1001; }
.hamburger span { width: 22px; height: 2px; background: white; border-radius: 2px; transition: all 0.3s; }
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

.mobile-nav {
  display: none; position: fixed; top: var(--header-h); right: -100%;
  width: 280px; height: calc(100vh - var(--header-h));
  background: #1a1a2e; padding: 1rem 0;
  transition: right 0.3s; z-index: 999; overflow-y: auto;
}
.mobile-nav.open { right: 0; }
.mobile-nav a {
  display: block; padding: 14px 24px;
  color: rgba(255,255,255,0.85); font-weight: 500;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  transition: all 0.2s;
}
.mobile-nav a:hover, .mobile-nav a.router-link-active {
  color: white; background: rgba(59,130,246,0.2);
}

.overlay {
  display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 998;
}

@media (max-width: 768px) {
  .desktop { display: none; }
  .hamburger { display: flex; }
  .mobile-nav { display: block; }
  .overlay { display: block; }
}
</style>
