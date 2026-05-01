<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">Jeremy Luccioni</div>
          <p class="footer-desc">Cours particuliers de Mathématiques, Physique et Chimie pour classes préparatoires.</p>
        </div>
        <div>
          <h4>Matières</h4>
          <nav>
            <router-link to="/matieres/mathematiques">Mathématiques</router-link>
            <router-link to="/matieres/physique">Physique</router-link>
            <router-link to="/matieres/chimie">Chimie</router-link>
          </nav>
        </div>
        <div>
          <h4>Ressources</h4>
          <nav>
            <router-link to="/colles">Colles</router-link>
            <router-link to="/concours">Concours</router-link>
            <router-link to="/pedagogie">Conseils</router-link>
            <router-link to="/parcours">Mon parcours</router-link>
          </nav>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} Jeremy Luccioni</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: #0f172a; color: rgba(255,255,255,0.6); padding: 60px 0 24px; }

.footer-grid {
  display: grid; grid-template-columns: 2fr 1fr 1fr;
  gap: 40px; margin-bottom: 40px;
}

.footer-logo { font-size: 1.4rem; font-weight: 800; color: white; margin-bottom: 12px; }
.footer-desc { font-size: 0.9rem; line-height: 1.7; max-width: 280px; }

h4 { color: white; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; }

nav { display: flex; flex-direction: column; gap: 10px; }
nav a { color: rgba(255,255,255,0.6); font-size: 0.9rem; transition: color 0.2s; }
nav a:hover { color: white; }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 24px; font-size: 0.85rem; text-align: center;
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .footer-grid > div:first-child { grid-column: 1 / -1; }
}
@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; }
}
</style>
