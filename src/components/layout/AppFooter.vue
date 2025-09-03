<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <h3>Jeremy Luccioni</h3>
          <p>Étudiant Ingénieur & Professeur Particulier</p>
        </div>

        <div class="footer-links">
          <a href="/parcours">À propos</a>
          <a href="/ressources">Ressources</a>
          <a href="/methode">Méthode</a>
          <a href="/contact">Contact</a>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2025 Jeremy Luccioni. Libre de droit</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.app-footer {
  background: var(--secondary-color);
  color: white;
  padding: var(--spacing-xl) 0 var(--spacing-md);
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
}

.footer-info h3 {
  margin-bottom: var(--spacing-sm);
}

.footer-links {
  display: flex;
  gap: var(--spacing-lg);
}

.footer-links a {
  color: white;
  text-decoration: none;
}

.footer-links a:hover {
  color: var(--accent-color);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--spacing-md);
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>