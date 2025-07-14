<template>
  <section id="contact" class="content-section contact-section">
    <div class="container">
      <div class="contact-info-centered">
        <h2>{{ t('contact.title') }}</h2>
        <div class="contact-items">
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <div>
              <h3>{{ t('contact.email') }}</h3>
              <p><a href="mailto:jeremy.luccioni@etu.ec-lyon.fr">jeremy.luccioni@etu.ec-lyon.fr</a></p>
            </div>
          </div>
          <div class="contact-item">
            <i class="fas fa-graduation-cap"></i>
            <div>
              <h3>{{ t('contact.levels') }}</h3>
              <p>{{ t('contact.levelsDescription') }}</p>
            </div>
          </div>
        </div>

        <div class="social-links">
          <h3>{{ t('contact.followMe') }}</h3>
          <div class="social-icons">
            <a
              href="https://www.linkedin.com/in/jeremy-luccioni-695365bb/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link linkedin"
            >
              <i class="fab fa-linkedin-in"></i>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.youtube.com/@TheKadzzzzz"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link youtube"
            >
              <i class="fab fa-youtube"></i>
              <span>YouTube</span>
            </a>
            <a
              href="https://github.com/Kadzzzzz"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link github"
            >
              <i class="fab fa-github"></i>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTranslations } from '@/composables/useTranslations.js'

const { t } = useTranslations()
</script>

<style scoped>
.content-section {
  padding: 80px 0;
  border-bottom: 1px solid var(--border-color, #ddd);
}

.contact-section {
  background-color: var(--secondary-color, #f8f9fa);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 25px;
}

.contact-info-centered {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.contact-info-centered h2 {
  font-family: var(--heading-font, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
  font-weight: 700;
  line-height: 1.3;
  color: var(--primary-color, #2c3e50);
  margin-bottom: 1rem;
  font-size: 2.2rem;
}

.contact-info-centered h2::after {
  content: '';
  display: block;
  width: 70px;
  height: 4px;
  background-color: var(--accent-color, #3498db);
  margin: 15px auto 25px auto;
}

.contact-items {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 40px;
}

.contact-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 200px;
}

.contact-item i {
  color: var(--accent-color, #3498db);
  font-size: 2rem;
  margin-bottom: 15px;
}

.contact-item h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: var(--primary-color, #2c3e50);
  font-family: var(--heading-font, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
  font-weight: 700;
}

.contact-item p {
  margin-bottom: 0;
  color: var(--text-light, #666);
  line-height: 1.7;
}

.contact-item a {
  color: var(--accent-color, #3498db);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition-speed, 0.3s);
}

.contact-item a:hover {
  color: #2980b9;
}

/* Liens sociaux */
.social-links {
  margin-top: 50px;
  text-align: center;
}

.social-links h3 {
  margin-bottom: 25px;
  color: var(--primary-color, #2c3e50);
  font-size: 1.3rem;
  font-family: var(--heading-font, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
  font-weight: 700;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  transition: all var(--transition-speed, 0.3s);
  text-decoration: none;
  min-width: 100px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.social-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.social-link i {
  font-size: 2.5rem;
  margin-bottom: 10px;
  transition: color var(--transition-speed, 0.3s);
}

.social-link span {
  font-weight: 600;
  font-size: 0.9rem;
  transition: color var(--transition-speed, 0.3s);
}

.social-link.linkedin i { color: #0077B5; }
.social-link.linkedin span { color: #0077B5; }
.social-link.linkedin:hover { background-color: #0077B5; }
.social-link.linkedin:hover i,
.social-link.linkedin:hover span { color: white; }

.social-link.youtube i { color: #FF0000; }
.social-link.youtube span { color: #FF0000; }
.social-link.youtube:hover { background-color: #FF0000; }
.social-link.youtube:hover i,
.social-link.youtube:hover span { color: white; }

.social-link.github i { color: #333; }
.social-link.github span { color: #333; }
.social-link.github:hover { background-color: #333; }
.social-link.github:hover i,
.social-link.github:hover span { color: white; }

@media (max-width: 768px) {
  .contact-items {
    flex-direction: column;
    gap: 30px;
  }

  .social-icons {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .social-link {
    flex-direction: row;
    width: 200px;
    justify-content: flex-start;
    padding: 15px 20px;
  }

  .social-link i {
    font-size: 1.8rem;
    margin-bottom: 0;
    margin-right: 15px;
  }
}
</style>