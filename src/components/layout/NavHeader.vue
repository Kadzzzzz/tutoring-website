<template>
  <header class="nav-header">
    <div class="container">
      <div class="nav-content">
        <!-- Logo/Nom -->
        <router-link to="/" class="logo">
          Jeremy Luccioni
        </router-link>

        <!-- Navigation -->
        <nav class="nav-menu">
          <router-link to="/parcours" class="nav-link">À propos</router-link>
          <router-link to="/ressources" class="nav-link">Ressources</router-link>
          <router-link to="/methode" class="nav-link">Méthode</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link>

          <!-- Language switcher placeholder -->
          <span class="language-switch">FR</span>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavHeader'
}
</script>

<style scoped>
.nav-header {
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-md) 0;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: white;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: background-color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.language-switch {
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-sm);
  }
}
</style>