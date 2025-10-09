<template>
  <section id="about" class="content-section about-section">
    <div class="container">
      <h2 class="section-title">Mon Parcours</h2>

      <!-- Layout: Texte à gauche + Timeline à droite -->
      <div class="parcours-layout">

        <!-- Texte général à gauche -->
        <div class="text-column">
          <p>
            Actuellement étudiant en deuxième année à l'École Centrale de Lyon et ayant validé ma L3 de Physique à l'Université Claude Bernard Lyon 1 en parallèle de ma première année à Centrale, je mets ma passion pour les sciences au service de la réussite de mes élèves.
          </p>
          <p>
            Fort de mon expérience en classes préparatoires (PCSI puis PC à l'ENCPB, et PC* au lycée Louis-le-Grand), je comprends parfaitement les défis que rencontrent les étudiants dans ces filières exigeantes.
          </p>
          <p>
            J'aime beaucoup transmettre mon savoir et ma passion pour les sciences. C'est pourquoi je donne des colles, je gère des salles de travail à Centrale et je donne des cours particuliers à des élèves allant de la seconde à la première année de prépa.
          </p>
        </div>

        <!-- Timeline verticale à droite -->
        <div class="timeline-column">
          <h3 class="timeline-title">Parcours Académique</h3>
          <div class="timeline-vertical">
            <div
              v-for="(step, index) in parcours"
              :key="index"
              class="timeline-item"
            >
              <!-- Ligne de connexion -->
              <div v-if="index !== parcours.length - 1" class="timeline-line"></div>

              <!-- Point avec icône -->
              <div class="timeline-point">
                <component :is="step.iconComponent" />
              </div>

              <!-- Informations de l'étape -->
              <div class="timeline-content">
                <div class="timeline-header">
                  <span class="timeline-year">{{ step.year }}</span>
                  <span v-if="step.badge" :class="['timeline-badge', step.badgeClass]">
                    {{ step.badge }}
                  </span>
                </div>
                <h4 class="timeline-step-title">{{ step.title }}</h4>
                <p class="timeline-school">{{ step.school }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Bouton LinkedIn centré en bas -->
      <div class="linkedin-container">
        <a
          href="https://www.linkedin.com/in/jeremy-luccioni/"
          target="_blank"
          rel="noopener noreferrer"
          class="linkedin-button"
        >
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <span>Découvrir mon profil LinkedIn</span>
          <svg class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
// Icônes SVG
const BookIcon = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>`
}

const AwardIcon = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>`
}

const GraduationIcon = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>`
}

// INVERSÉ : Du plus récent (en haut) au plus ancien (en bas)
const parcours = [
  {
    year: '2024-2027',
    title: 'École Centrale de Lyon',
    school: 'Actuellement en 2ème année',
    iconComponent: GraduationIcon,
    badge: 'En cours',
    badgeClass: 'badge-current'
  },
  {
    year: '2024-2025',
    title: 'L3 Physique',
    school: 'Université Claude Bernard Lyon 1',
    iconComponent: GraduationIcon,
    badge: 'Validée',
    badgeClass: 'badge-completed'
  },
  {
    year: '2023-2024',
    title: 'Prépa PC*',
    school: 'Lycée Louis-le-Grand',
    iconComponent: AwardIcon
  },
  {
    year: '2021-2023',
    title: 'Prépa PCSI puis PC',
    school: 'ENCPB Paris',
    iconComponent: BookIcon
  }
]
</script>

<style scoped>
.content-section {
  padding: 80px 0;
  border-bottom: 1px solid var(--border-color, #ddd);
}

.about-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 25px;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 3rem;
}

.section-title::after {
  content: '';
  display: block;
  width: 70px;
  height: 4px;
  background-color: var(--accent-color, #3498db);
  margin: 15px auto 25px auto;
}

/* === LAYOUT PRINCIPAL === */
.parcours-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 3rem;
  align-items: stretch;
  margin-bottom: 3rem;
}

/* === TEXTE À GAUCHE === */
.text-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-column p {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #475569;
  margin-bottom: 1.5rem;
}

.text-column p:last-child {
  margin-bottom: 0;
}

/* === TIMELINE VERTICALE À DROITE === */
.timeline-column {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.timeline-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.timeline-vertical {
  position: relative;
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 1.5rem;
  margin-bottom: 0;
}

.timeline-item:not(:last-child) {
  margin-bottom: 2rem;
}

/* Ligne de connexion verticale */
.timeline-line {
  position: absolute;
  left: 1.625rem;
  top: 3.5rem;
  width: 2px;
  height: calc(100% + 2rem);
  background: linear-gradient(180deg, #3b82f6 0%, #93c5fd 100%);
}

.timeline-point {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);
  z-index: 2;
}

.timeline-point svg {
  width: 1.5rem;
  height: 1.5rem;
}

.timeline-content {
  flex: 1;
  padding-top: 0.25rem;
}

.timeline-header {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.timeline-year {
  font-size: 0.875rem;
  font-weight: 600;
  color: #3b82f6;
  background: #dbeafe;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.timeline-badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
}

.badge-current {
  background: #d1fae5;
  color: #065f46;
}

.badge-completed {
  background: #e9d5ff;
  color: #6b21a8;
}

.timeline-step-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.timeline-school {
  font-size: 0.875rem;
  color: #64748b;
}

/* === BOUTON LINKEDIN CENTRÉ === */
.linkedin-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.linkedin-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4);
  font-size: 1rem;
}

.linkedin-button:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.4);
}

.linkedin-button .icon {
  width: 1.25rem;
  height: 1.25rem;
}

.linkedin-button .icon-small {
  width: 1rem;
  height: 1rem;
}

/* === RESPONSIVE === */
@media (max-width: 1024px) {
  .parcours-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  /* Timeline passe en dessous sur mobile */
  .text-column {
    order: 1;
  }

  .timeline-column {
    order: 2;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .text-column p {
    font-size: 1rem;
  }

  .timeline-vertical {
    padding: 1.5rem;
  }

  .timeline-point {
    width: 3rem;
    height: 3rem;
  }

  .timeline-point svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .timeline-line {
    left: 1.375rem;
  }

  .timeline-step-title {
    font-size: 1rem;
  }
}
</style>