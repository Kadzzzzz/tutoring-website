<template>
  <section id="about" class="content-section about-section">
    <div class="container">
      <div class="section-content layout-split">
        <div class="text-content">
          <h2>Mon Parcours</h2>
          <p>Actuellement étudiant en deuxième année à l'École Centrale de Lyon et en parallèle en L3 de Physique à l'Université Claude Bernard Lyon 1, je mets ma passion pour les sciences au service de la réussite de mes élèves.</p>
          <p>Fort de mon expérience en classes préparatoires (PCSI puis PC à l'ENCPB, et PC* au lycée Louis-le-Grand), je comprends parfaitement les défis que rencontrent les étudiants dans ces filières exigeantes.</p>
          <p>J'aime beaucoup transmettre mon savoir et ma passion pour les sciences. C'est pourquoi je donne régulièrement des cours particuliers à des élèves allant de la seconde à la première année de prépa, et je gère également des salles de travail à Centrale.</p>
        </div>
        <div class="timeline">
          <h3>Parcours Académique</h3>
          <div class="timeline-item">
            <div class="timeline-year">2021-2023</div>
            <div class="timeline-title">Prépa PCSI puis PC - ENCPB Paris</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2023-2024</div>
            <div class="timeline-title">Prépa PC* - Lycée Louis-le-Grand</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2024-2027</div>
            <div class="timeline-title">École Centrale de Lyon</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">2024-2025</div>
            <div class="timeline-title">L3 Physique - Université Claude Bernard Lyon 1</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Plus besoin d'imports de traductions
</script>

<style scoped>
.content-section {
  padding: 80px 0;
  border-bottom: 1px solid var(--border-color, #ddd);
}

.about-section {
  background-color: var(--secondary-color, #f8f9fa);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 25px;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.layout-split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  align-items: center;
}

.text-content h2 {
  font-family: var(--heading-font, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
  font-weight: 700;
  line-height: 1.3;
  color: var(--primary-color, #2c3e50);
  margin-bottom: 1rem;
  font-size: 2.2rem;
}

.text-content h2::after {
  content: '';
  display: block;
  width: 70px;
  height: 4px;
  background-color: var(--accent-color, #3498db);
  margin-top: 15px;
  margin-bottom: 25px;
}

.text-content p {
  margin-bottom: 1.2rem;
  color: var(--text-light, #666);
  line-height: 1.7;
}

.timeline {
  margin-top: 30px;
  position: relative;
}

.timeline h3 {
  font-family: var(--heading-font, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
  font-weight: 700;
  line-height: 1.3;
  color: var(--primary-color, #2c3e50);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 60px;
  bottom: 0;
  width: 2px;
  background-color: var(--accent-color, #3498db);
}

.timeline-item {
  position: relative;
  padding: 20px 0 20px 60px;
  margin-bottom: 20px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 25px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--accent-color, #3498db);
  border: 4px solid var(--secondary-color, #f8f9fa);
}

.timeline-year {
  color: var(--accent-color, #3498db);
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.timeline-title {
  font-weight: 600;
  color: var(--primary-color, #2c3e50);
  line-height: 1.4;
}

@media (min-width: 768px) {
  .layout-split {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .layout-split {
    grid-template-columns: 1fr;
  }

  .timeline-title {
    font-size: 0.9rem;
    line-height: 1.3;
  }
}
</style>