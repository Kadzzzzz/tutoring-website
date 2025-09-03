<template>
  <div class="home">
    <h1>Page d'Accueil</h1>
    <p>À développer : Hero section + Preview ressources</p>

    <!-- TODO: Ajouter HeroSection et ResourcesPreview -->
    <div class="temp-nav">
      <router-link to="/parcours">Mon Parcours</router-link>
      <router-link to="/methode">Ma Méthode</router-link>
      <router-link to="/ressources">Ressources</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  padding: var(--spacing-xl);
}

.temp-nav {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

.temp-nav a {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--primary-color);
  color: white;
  border-radius: var(--radius-md);
}
</style>