<template>
  <div class="resources-page">
    <div class="container">
      <h1>Page Ressources</h1>
      <p>Félicitations ! Le router fonctionne parfaitement 🎉</p>

      <div class="test-content">
        <h2>Prochaines étapes :</h2>
        <ul>
          <li>✅ Router configuré</li>
          <li>✅ Navigation entre les pages</li>
          <li>🔄 Intégration complète des ressources</li>
          <li>🔄 Filtres et recherche</li>
        </ul>
      </div>

      <router-link to="/" class="back-button">
        ← Retour à l'accueil
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Page simple pour tester le router
</script>

<style scoped>
.resources-page {
  min-height: 100vh;
  padding-top: calc(var(--header-height) + 2rem);
  padding-bottom: 2rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

h1 {
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.test-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  margin: 2rem 0;
  text-align: left;
}

.test-content h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.test-content ul {
  list-style: none;
  padding: 0;
}

.test-content li {
  padding: 0.5rem 0;
  font-size: 1.1rem;
}

.back-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--accent-color);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 500;
  transition: all var(--transition-speed);
}

.back-button:hover {
  background: #2980b9;
  transform: translateY(-2px);
  color: white;
}
</style>