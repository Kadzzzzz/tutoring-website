<template>
  <div class="app">
    <!-- Header -->
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

    <!-- Menu Mobile -->
    <div class="mobile-menu" :class="{ 'active': mobileMenuOpen }">
      <ul>
        <li><a href="#about" @click="scrollToSectionMobile('about')">{{ t('nav.about') }}</a></li>
        <li><a href="#resources" @click="scrollToSectionMobile('resources')">{{ t('nav.resources') }}</a></li>
        <li><a href="#methodology" @click="scrollToSectionMobile('methodology')">{{ t('nav.methodology') }}</a></li>
        <li><a href="#contact" @click="scrollToSectionMobile('contact')">{{ t('nav.contact') }}</a></li>
        <li class="mobile-language">
          <button @click="toggleLanguage" class="mobile-lang-btn">
            {{ currentLang === 'fr' ? 'Switch to English' : 'Passer en Français' }}
          </button>
        </li>
      </ul>
    </div>

    <main>
      <!-- Section Hero -->
      <section id="hero" class="hero-section">
        <div class="hero-content">
          <h2 class="subtitle">{{ t('hero.subtitle') }}</h2>
          <h1 class="title">{{ t('hero.title') }}</h1>
          <p class="hero-description">{{ t('hero.description') }}</p>
        </div>
        <div class="scroll-indicator">
          <span>{{ t('hero.scrollDown') }}</span>
          <a href="#about" @click.prevent="scrollToSection('about')">
            <div class="arrow-down"></div>
          </a>
        </div>
      </section>

      <!-- Section About -->
      <section id="about" class="content-section about-section">
        <div class="container">
          <div class="section-content layout-split">
            <div class="text-content">
              <h2>{{ t('about.title') }}</h2>
              <p>{{ t('about.paragraph1') }}</p>
              <p>{{ t('about.paragraph2') }}</p>
              <p>{{ t('about.paragraph3') }}</p>
            </div>
            <div class="timeline">
              <h3>{{ t('about.academicPath') }}</h3>
              <div class="timeline-item">
                <div class="timeline-year">2021-2023</div>
                <div class="timeline-title">{{ t('about.timeline.prepa') }}</div>
              </div>
              <div class="timeline-item">
                <div class="timeline-year">2023-2024</div>
                <div class="timeline-title">{{ t('about.timeline.prepastar') }}</div>
              </div>
              <div class="timeline-item">
                <div class="timeline-year">2024-2027</div>
                <div class="timeline-title">{{ t('about.timeline.centrale') }}</div>
              </div>
              <div class="timeline-item">
                <div class="timeline-year">2024-2025</div>
                <div class="timeline-title">{{ t('about.timeline.physics') }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Resources -->
      <section id="resources" class="content-section resources-section">
        <div class="container">
          <h2>{{ t('resources.title') }}</h2>
          <p class="section-description">{{ t('resources.description') }}</p>

          <div class="subject-filters">
            <button 
              v-for="subject in subjects" 
              :key="subject.key"
              class="filter-btn" 
              :class="{ active: activeSubject === subject.key }"
              @click="setActiveSubject(subject.key)"
            >
              <i :class="subject.icon"></i> {{ t(`resources.subjects.${subject.key}`) }}
            </button>
          </div>

          <div class="resources-grid">
            <div 
              v-for="resource in filteredResources" 
              :key="resource.id"
              class="resource-item" 
              @click="openResourceModal(resource)"
            >
              <div class="resource-tags">
                <span class="tag level">{{ t(`resources.levels.${resource.levelKey}`) }}</span>
                <span class="tag type">{{ t(`resources.types.${resource.typeKey}`) }}</span>
              </div>
              <div class="resource-content">
                <h3 class="resource-title">{{ t(`resources.exercises.${resource.subject}.${resource.id}.title`) }}</h3>
                <p class="resource-description">{{ t(`resources.exercises.${resource.subject}.${resource.id}.description`) }}</p>
                <div class="resource-meta">
                  <span><i class="fas fa-clock"></i> {{ resource.duration }}</span>
                  <span v-if="resource.hasVideo"><i class="fas fa-video"></i> {{ t('resources.hasVideo') }}</span>
                  <span><i class="fas fa-file-pdf"></i> PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Methodology -->
      <section id="methodology" class="content-section methodology-section">
        <div class="container">
          <h2>{{ t('methodology.title') }}</h2>
          <div class="methodology-grid">
            <div v-for="item in methodologyItems" :key="item.id" class="methodology-item">
              <div class="methodology-icon">
                <i :class="item.iconClass"></i>
              </div>
              <h3>{{ t(`methodology.item${item.id}.title`) }}</h3>
              <p>{{ t(`methodology.item${item.id}.description`) }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Contact -->
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

            <!-- Nouveaux liens sociaux -->
            <div class="social-links">
              <h3>{{ t('contact.followMe') }}</h3>
              <div class="social-icons">
                <a href="https://www.linkedin.com/in/jeremy-luccioni-695365bb/" target="_blank" rel="noopener noreferrer" class="social-link linkedin">
                  <i class="fab fa-linkedin-in"></i>
                  <span>LinkedIn</span>
                </a>
                <a href="https://www.youtube.com/@TheKadzzzzz" target="_blank" rel="noopener noreferrer" class="social-link youtube">
                  <i class="fab fa-youtube"></i>
                  <span>YouTube</span>
                </a>
                <a href="https://github.com/Kadzzzzz" target="_blank" rel="noopener noreferrer" class="social-link github">
                  <i class="fab fa-github"></i>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">Jeremy Luccioni</div>
          <nav class="footer-nav">
            <a href="#about" @click.prevent="scrollToSection('about')">{{ t('nav.about') }}</a>
            <a href="#resources" @click.prevent="scrollToSection('resources')">{{ t('nav.resources') }}</a>
            <a href="#methodology" @click.prevent="scrollToSection('methodology')">{{ t('nav.methodology') }}</a>
            <a href="#contact" @click.prevent="scrollToSection('contact')">{{ t('nav.contact') }}</a>
          </nav>
        </div>
        <div class="footer-bottom">
          <p>© {{ new Date().getFullYear() }} Jeremy Luccioni. {{ t('footer.rights') }}</p>
        </div>
      </div>
    </footer>

    <!-- Resource Modal -->
    <ResourceModal 
      v-if="selectedResource" 
      :resource="selectedResource" 
      :current-lang="currentLang"
      @close="closeResourceModal" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ResourceModal from './components/ResourceModal.vue'

// --- State ---
const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const activeSubject = ref('maths')
const selectedResource = ref(null)
const currentLang = ref('fr')

// --- Translations ---
const translations = {
  fr: {
    nav: {
      about: "À propos",
      resources: "Ressources", 
      methodology: "Méthode",
      contact: "Contact"
    },
    hero: {
      subtitle: "Étudiant Ingénieur & Professeur Particulier",
      title: "Réussissez vos études scientifiques",
      description: "Cours particuliers en Mathématiques, Physique et Chimie pour lycéens et préparationnaires.",
      scrollDown: "Découvrir"
    },
    about: {
      title: "Mon Parcours",
      paragraph1: "Actuellement étudiant en première année à l'École Centrale de Lyon et en parallèle en L3 de Physique à l'Université Claude Bernard Lyon 1, je mets ma passion pour les sciences au service de la réussite de mes élèves.",
      paragraph2: "Fort de mon expérience en classes préparatoires (PCSI puis PC à l'ENCPB, et PC* au lycée Louis-le-Grand), je comprends parfaitement les défis que rencontrent les étudiants dans ces filières exigeantes.",
      paragraph3: "J'aime beaucoup transmettre mon savoir et ma passion pour les sciences. C'est pourquoi je donne régulièrement des cours particuliers à des élèves allant de la seconde à la première année de prépa, et je gère également des salles de travail à Centrale.",
      academicPath: "Parcours Académique",
      timeline: {
        prepa: "Prépa PCSI puis PC - ENCPB Paris",
        prepastar: "Prépa PC* - Lycée Louis-le-Grand",
        centrale: "École Centrale de Lyon",
        physics: "L3 Physique - Université Claude Bernard Lyon 1"
      }
    },
    resources: {
      title: "Ressources Pédagogiques",
      description: "Découvrez mes exercices corrigés, cours et méthodes classés par matière et niveau. Chaque ressource est accompagnée de corrections détaillées et parfois de vidéos explicatives.",
      subjects: {
        maths: "Mathématiques",
        physics: "Physique", 
        chemistry: "Chimie"
      },
      types: {
        exercise: "Exercice",
        course: "Cours",
        method: "Méthode"
      },
      levels: {
        terminale: "Terminale",
        prepa1: "Prépa 1A",
        prepa2: "Prépa 2A"
      },
      hasVideo: "Vidéo",
      exercises: {
        maths: {
          derivatives: {
            title: "Dérivées et primitives",
            description: "Exercices corrigés sur les dérivées et primitives usuelles",
            fullDescription: "Une série d'exercices progressifs pour maîtriser les dérivées et primitives. Commençant par les formules de base jusqu'aux fonctions composées.",
            notes: "Ces exercices sont essentiels pour la préparation au bac et aux concours. Pensez à bien maîtriser les formules de base avant de passer aux exercices complexes."
          },
          integrals: {
            title: "Intégrales généralisées",
            description: "Convergence et calculs d'intégrales impropres",
            fullDescription: "Méthodes complètes pour étudier la convergence des intégrales généralisées et techniques de calcul avancées."
          }
        },
        physics: {
          mechanics: {
            title: "Mécanique du point",
            description: "Cours et exercices sur la cinématique et la dynamique",
            fullDescription: "Étude complète de la mécanique du point : référentiels, vitesse, accélération, forces et théorèmes de Newton."
          },
          electromagnetism: {
            title: "Électromagnétisme",
            description: "Équations de Maxwell et applications",
            fullDescription: "Étude des champs électriques et magnétiques, équations de Maxwell et applications en électrostatique et magnétostatique."
          }
        },
        chemistry: {
          equilibrium: {
            title: "Équilibres chimiques",
            description: "Constantes d'équilibre et déplacements",
            fullDescription: "Étude des équilibres chimiques, calcul des constantes d'équilibre et loi de Le Chatelier."
          },
          kinetics: {
            title: "Cinétique chimique",
            description: "Vitesse de réaction et mécanismes",
            fullDescription: "Étude de la vitesse des réactions chimiques, ordres de réaction et mécanismes réactionnels."
          }
        }
      }
    },
    methodology: {
      title: "Ma Méthode Pédagogique",
      item1: {
        title: "Transmission de la Passion",
        description: "Je crois fermement qu'exceller dans une discipline est beaucoup plus simple quand on l'aime. C'est pourquoi je m'attache à transmettre ma passion pour les sciences autant que mes connaissances."
      },
      item2: {
        title: "Écoute et Personnalisation", 
        description: "Chaque élève est unique. Je suis très à l'écoute de mes élèves pour adapter ma pédagogie à leur profil, leurs difficultés et leurs objectifs personnels."
      },
      item3: {
        title: "Approche Bienveillante",
        description: "En tant que jeune étudiant tout juste sorti de prépa, je comprends les défis que vivent mes élèves. J'offre un encadrement bienveillant qui permet de prendre confiance et de se projeter dans la réussite."
      }
    },
    contact: {
      title: "Me Contacter",
      email: "Email",
      levels: "Niveaux enseignés",
      levelsDescription: "De la Seconde à la Prépa (1A et 2A)",
      followMe: "Me suivre" // NOUVEAU
    },
    footer: {
      rights: "Tous droits réservés"
    }
  },
  en: {
    nav: {
      about: "About",
      resources: "Resources",
      methodology: "Method", 
      contact: "Contact"
    },
    hero: {
      subtitle: "Engineering Student & Private Tutor",
      title: "Excel in Scientific Studies",
      description: "Private lessons in Mathematics, Physics and Chemistry for high school and preparatory students.",
      scrollDown: "Discover"
    },
    about: {
      title: "My Background",
      paragraph1: "Currently a first-year student at École Centrale de Lyon and simultaneously pursuing a L3 in Physics at Claude Bernard Lyon 1 University, I put my passion for science at the service of my students' success.",
      paragraph2: "With my experience in preparatory classes (PCSI then PC at ENCPB, and PC* at Louis-le-Grand high school), I perfectly understand the challenges that students face in these demanding programs.",
      paragraph3: "I love sharing my knowledge and passion for science. That's why I regularly give private lessons to students from sophomore year to first year of prep school, and I also manage study rooms at Centrale.",
      academicPath: "Academic Path",
      timeline: {
        prepa: "Prep PCSI then PC - ENCPB Paris",
        prepastar: "Prep PC* - Louis-le-Grand High School",
        centrale: "École Centrale de Lyon",
        physics: "L3 Physics - Claude Bernard Lyon 1 University"
      }
    },
    resources: {
      title: "Educational Resources",
      description: "Discover my corrected exercises, courses and methods classified by subject and level. Each resource comes with detailed corrections and sometimes explanatory videos.",
      subjects: {
        maths: "Mathematics",
        physics: "Physics",
        chemistry: "Chemistry"
      },
      types: {
        exercise: "Exercise",
        course: "Course",
        method: "Method"
      },
      levels: {
        terminale: "Senior Year",
        prepa1: "Prep 1st Year",
        prepa2: "Prep 2nd Year"
      },
      hasVideo: "Video",
      exercises: {
        maths: {
          derivatives: {
            title: "Derivatives and primitives",
            description: "Corrected exercises on usual derivatives and primitives",
            fullDescription: "A series of progressive exercises to master derivatives and primitives. Starting from basic formulas to composite functions.",
            notes: "These exercises are essential for preparing for the baccalaureate and competitive exams. Make sure to master the basic formulas before moving on to complex exercises."
          },
          integrals: {
            title: "Generalized integrals",
            description: "Convergence and calculations of improper integrals",
            fullDescription: "Complete methods for studying the convergence of generalized integrals and advanced calculation techniques."
          }
        },
        physics: {
          mechanics: {
            title: "Point mechanics",
            description: "Course and exercises on kinematics and dynamics",
            fullDescription: "Complete study of point mechanics: reference frames, velocity, acceleration, forces and Newton's theorems."
          },
          electromagnetism: {
            title: "Electromagnetism",
            description: "Maxwell's equations and applications",
            fullDescription: "Study of electric and magnetic fields, Maxwell's equations and applications in electrostatics and magnetostatics."
          }
        },
        chemistry: {
          equilibrium: {
            title: "Chemical equilibria",
            description: "Equilibrium constants and shifts",
            fullDescription: "Study of chemical equilibria, calculation of equilibrium constants and Le Chatelier's law."
          },
          kinetics: {
            title: "Chemical kinetics",
            description: "Reaction rate and mechanisms",
            fullDescription: "Study of the rate of chemical reactions, reaction orders and reaction mechanisms."
          }
        }
      }
    },
    methodology: {
      title: "My Teaching Method",
      item1: {
        title: "Sharing Passion",
        description: "I firmly believe that excelling in a discipline is much easier when you love it. That's why I focus on transmitting my passion for science as much as my knowledge."
      },
      item2: {
        title: "Listening & Personalization",
        description: "Every student is unique. I listen carefully to my students to adapt my teaching to their profile, their difficulties and their personal goals."
      },
      item3: {
        title: "Caring Approach",
        description: "As a young student fresh out of prep school, I understand the challenges my students face. I offer caring guidance that builds confidence and helps project success."
      }
    },
    contact: {
      title: "Contact Me",
      email: "Email",
      levels: "Teaching Levels",
      levelsDescription: "From Sophomore to Prep School (1st & 2nd year)",
      followMe: "Follow Me" // NOUVEAU
    },
    footer: {
      rights: "All rights reserved"
    }
  }
}

// --- Data ---
const subjects = [
  { key: 'maths', name: 'Mathématiques', icon: 'fas fa-calculator' },
  { key: 'physics', name: 'Physique', icon: 'fas fa-atom' },
  { key: 'chemistry', name: 'Chimie', icon: 'fas fa-flask' }
]

const resources = [
  // Mathématiques
  {
    id: 'derivatives',
    subject: 'maths',
    levelKey: 'terminale',
    typeKey: 'exercise',
    duration: '45 min',
    hasVideo: true,
    videoUrl: 'dQw4w9WgXcQ'
  },
  {
    id: 'integrals',
    subject: 'maths',
    levelKey: 'prepa2',
    typeKey: 'method',
    duration: '90 min',
    hasVideo: true,
    videoUrl: 'dQw4w9WgXcQ'
  },
  // Physique
  {
    id: 'mechanics',
    subject: 'physics',
    levelKey: 'prepa1',
    typeKey: 'course',
    duration: '120 min',
    hasVideo: false
  },
  {
    id: 'electromagnetism',
    subject: 'physics',
    levelKey: 'prepa2',
    typeKey: 'course',
    duration: '150 min',
    hasVideo: true,
    videoUrl: 'dQw4w9WgXcQ'
  },
  // Chimie
  {
    id: 'equilibrium',
    subject: 'chemistry',
    levelKey: 'terminale',
    typeKey: 'exercise',
    duration: '60 min',
    hasVideo: true,
    videoUrl: 'dQw4w9WgXcQ'
  },
  {
    id: 'kinetics',
    subject: 'chemistry',
    levelKey: 'prepa1',
    typeKey: 'method',
    duration: '75 min',
    hasVideo: false
  }
]

const methodologyItems = [
  { id: 1, iconClass: 'fas fa-heart' },
  { id: 2, iconClass: 'fas fa-ear-listen' },
  { id: 3, iconClass: 'fas fa-users' }
]

// --- Computed ---
const filteredResources = computed(() => {
  return resources.filter(resource => resource.subject === activeSubject.value)
})

// --- Methods ---
const t = (key) => {
  const keys = key.split('.')
  let value = translations[currentLang.value]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}

const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'fr' ? 'en' : 'fr'
  localStorage.setItem('language', currentLang.value)
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false
  }
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 100
}


const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerOffset = scrolled.value ? 70 : 0
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

const scrollToSectionMobile = (sectionId) => {
  scrollToSection(sectionId)
  setTimeout(() => { mobileMenuOpen.value = false }, 150)
  document.body.style.overflow = ''
}

const setActiveSubject = (subject) => {
  activeSubject.value = subject
}

const openResourceModal = (resource) => {
  selectedResource.value = resource
  document.body.style.overflow = 'hidden'
}

const closeResourceModal = () => {
  selectedResource.value = null
  document.body.style.overflow = ''
}

// --- Lifecycle Hooks ---
onMounted(() => {
  // Charger la langue sauvegardée
  const savedLang = localStorage.getItem('language')
  if (savedLang && ['fr', 'en'].includes(savedLang)) {
    currentLang.value = savedLang
  }
  
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style>
/* Tous les styles précédents + ajouts pour la langue */

/* --- Variables CSS --- */
:root {
  --primary-color: #2c3e50;
  --secondary-color: #f8f9fa;
  --accent-color: #3498db;
  --text-color: #333;
  --text-light: #666;
  --text-white: #ffffff;
  --border-color: #ddd;
  --heading-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --body-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --transition-speed: 0.3s;
  --box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  --header-height: 70px;
}

/* --- Reset et styles de base --- */
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: var(--body-font);
  line-height: 1.7;
  color: var(--text-color);
  background-color: var(--secondary-color);
  overflow-x: hidden;
}
.container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 25px; }
h2, h3, h4, h5, h6 {
  font-family: var(--heading-font);
  font-weight: 700;
  line-height: 1.3;
  color: var(--primary-color);
  margin-bottom: 1rem;
}
h2 { font-size: 2.2rem; }
h3 { font-size: 1.5rem; }
p { margin-bottom: 1.2rem; color: var(--text-light); }
a { text-decoration: none; color: var(--accent-color); transition: color var(--transition-speed); }
a:hover { color: #2980b9; }
button {
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  font-family: inherit;
  transition: all var(--transition-speed);
}

/* --- Header --- */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: var(--header-height);
  background-color: transparent;
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);
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
  color: var(--text-white);
}
.nav-links ul {
  display: flex;
  list-style: none;
  gap: 35px;
}
.nav-links a {
  color: var(--text-white);
  font-weight: 500;
  position: relative;
  padding-bottom: 5px;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--accent-color);
  transition: width var(--transition-speed);
}
.nav-links a:hover::after { width: 100%; }

/* --- Sélecteur de langue --- */
.language-selector {
  margin-left: 20px;
}
.lang-btn {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-white);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all var(--transition-speed);
}
.lang-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.mobile-language {
  padding: 15px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.mobile-lang-btn {
  color: var(--text-white);
  font-size: 1rem;
  padding: 10px;
  width: 100%;
  text-align: left;
}

/* --- Menu mobile --- */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 22px;
  z-index: 1101;
}
.mobile-menu-btn span {
  width: 100%;
  height: 3px;
  background-color: var(--text-white);
  border-radius: 1px;
  transition: transform 0.3s ease;
}
.mobile-menu-btn.active span:nth-child(1) { transform: translateY(9.5px) rotate(45deg); }
.mobile-menu-btn.active span:nth-child(2) { opacity: 0; }
.mobile-menu-btn.active span:nth-child(3) { transform: translateY(-9.5px) rotate(-45deg); }
.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  right: -100%;
  width: 85%;
  max-width: 320px;
  height: 100vh;
  background-color: var(--primary-color);
  z-index: 1099;
  padding: 80px 30px 40px 30px;
  transition: right 0.4s ease;
}
.mobile-menu.active { right: 0; }
.mobile-menu ul { list-style: none; }
.mobile-menu li { margin-bottom: 15px; }
.mobile-menu a {
  color: var(--text-white);
  font-size: 1.2rem;
  display: block;
  padding: 12px 0;
}

/* --- Section Hero --- */
.hero-section {
  height: 100vh;
  min-height: 600px;
  background: linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.5)),
              url('https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--text-white);
  text-align: center;
}
.hero-content {
  position: relative;
  z-index: 2;
  padding: 20px;
}
.subtitle {
  font-size: clamp(1rem, 3vw, 1.3rem);
  letter-spacing: 3px;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.9);
}
.title {
  font-size: clamp(3rem, 8vw, 5rem);
  letter-spacing: 3px;
  margin-bottom: 30px;
  font-weight: 800;
}
.hero-description {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 30px;
  color: rgba(255, 255, 255, 0.85);
}
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.scroll-indicator span {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 15px;
  color: var(--text-white);
}
.arrow-down {
  width: 28px;
  height: 28px;
  border: 2px solid var(--text-white);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin: 0 auto;
  animation: bounce 2s infinite;
}

/* --- Sections de contenu --- */
.content-section {
  padding: 80px 0;
  border-bottom: 1px solid var(--border-color);
}
.content-section:last-of-type { border-bottom: none; }
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
.text-content h2::after {
  content: '';
  display: block;
  width: 70px;
  height: 4px;
  background-color: var(--accent-color);
  margin-top: 15px;
  margin-bottom: 25px;
}
.section-description {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 40px auto;
  color: var(--text-light);
}

/* --- Section About --- */
.about-section { background-color: var(--secondary-color); }
.timeline {
  margin-top: 30px;
  position: relative;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 60px; /* Décalé pour éviter de traverser le titre */
  bottom: 0;
  width: 2px;
  background-color: var(--accent-color);
}

/* Timeline items normaux */
.timeline-item {
  position: relative;
  padding: 20px 0 20px 60px;
  margin-bottom: 20px;
}

.timeline-item:not(.double)::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 25px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--accent-color);
  border: 4px solid var(--secondary-color);
}

/* Timeline items doubles */
.timeline-item.double {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.timeline-content {
  display: flex;
  flex-direction: column;
}

.timeline-content.double {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: start;
  margin-top: 10px;
}

.timeline-entry {
  position: relative;
}

/* Points pour les entrées doubles */
.timeline-entry::before {
  content: '';
  position: absolute;
  left: -50px;
  top: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--accent-color);
  border: 4px solid var(--secondary-color);
}

/* Cacher le point principal pour les items doubles */
.timeline-item.double::before {
  display: none;
}

.timeline-year {
  color: var(--accent-color);
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.timeline-title {
  font-weight: 600;
  color: var(--primary-color);
  line-height: 1.4;
}

/* --- Section Resources --- */
.resources-section {
  background-color: white;
  text-align: center;
}
.resources-section h2::after {
  margin-left: auto;
  margin-right: auto;
}
.subject-filters {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
  flex-wrap: wrap;
}
.filter-btn {
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
  background: none;
  transition: all var(--transition-speed);
}
.filter-btn.active,
.filter-btn:hover {
  background-color: var(--accent-color);
  color: white;
}
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}
.resource-item {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform var(--transition-speed);
  border: 1px solid #eee;
}
.resource-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow);
}
.resource-tags {
  padding: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.tag {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}
.tag.level { background-color: #e8f4fd; color: #3498db; }
.tag.type { background-color: #f0f9ff; color: #2563eb; }
.resource-content {
  padding: 20px;
  text-align: left;
}
.resource-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--primary-color);
}
.resource-description {
  color: var(--text-light);
  font-size: 0.95rem;
  margin-bottom: 15px;
}
.resource-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 0.9rem;
  color: var(--text-light);
}
.resource-meta i {
  color: var(--accent-color);
}

/* --- Section Methodology --- */
.methodology-section {
  background-color: var(--primary-color);
  color: var(--text-white);
  text-align: center;
}
.methodology-section h2 {
  color: var(--text-white);
}
.methodology-section h2::after {
  margin-left: auto;
  margin-right: auto;
}
.methodology-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  margin-top: 60px;
}
.methodology-item {
  padding: 20px;
  transition: transform var(--transition-speed);
}
.methodology-item:hover {
  transform: translateY(-8px);
}
.methodology-icon {
  width: 75px;
  height: 75px;
  margin: 0 auto 25px;
  background-color: var(--accent-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2rem;
  color: var(--text-white);
}
.methodology-item h3 {
  margin-bottom: 15px;
  font-size: 1.3rem;
  color: var(--text-white);
}
.methodology-item p {
  color: rgba(255, 255, 255, 0.8);
}

/* --- Section Contact --- */
.contact-section {
  background-color: var(--secondary-color);
}
.contact-info-centered {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}
.contact-info-centered h2::after {
  margin-left: auto;
  margin-right: auto;
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
  color: var(--accent-color);
  font-size: 2rem;
  margin-bottom: 15px;
}
.contact-item h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: var(--primary-color);
}
.contact-item p {
  margin-bottom: 0;
  color: var(--text-light);
}
.contact-item a {
  color: var(--accent-color);
  font-weight: 500;
}

/* --- Liens sociaux --- */
.social-links {
  margin-top: 50px;
  text-align: center;
}

.social-links h3 {
  margin-bottom: 25px;
  color: var(--primary-color);
  font-size: 1.3rem;
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
  transition: all var(--transition-speed);
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
  transition: color var(--transition-speed);
}

.social-link span {
  font-weight: 600;
  font-size: 0.9rem;
  transition: color var(--transition-speed);
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

/* --- Footer --- */
.footer {
  background-color: #1a1a1a;
  color: rgba(255, 255, 255, 0.7);
  padding: 40px 0 20px;
  text-align: center;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-white);
}
.footer-nav {
  display: flex;
  gap: 30px;
}
.footer-nav a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}
.footer-nav a:hover {
  color: var(--accent-color);
}
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  font-size: 0.9rem;
}

/* --- Animations --- */
@keyframes bounce {
  0%, 100% { transform: translateY(0) rotate(45deg); }
  50% { transform: translateY(-10px) rotate(45deg); }
}

/* --- Responsive --- */
@media (min-width: 768px) {
  .layout-split { grid-template-columns: 1fr 1fr; }
}

.timeline-content.double {
  grid-template-columns: 1fr;
  gap: 15px;
}

.timeline-entry::before {
  left: -45px;
}

.timeline-title {
  font-size: 0.9rem;
  line-height: 1.3;
}

@media (max-width: 814px) {
  /* Cacher les liens de navigation sauf la langue */
  .nav-links ul li:not(.language-selector) {
    display: none;
  }

  /* Garder le bouton de langue visible */
  .language-selector {
    margin-left: 0;
  }

  /* Cacher complètement le menu hamburger */
  .mobile-menu-btn {
    display: none !important;
  }

  /* Cacher le menu mobile */
  .mobile-menu {
    display: none !important;
  }

  .layout-split {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .subject-filters {
    flex-direction: column;
    align-items: center;
  }
  .filter-btn {
    width: 200px;
  }
  .resources-grid {
    grid-template-columns: 1fr;
  }
  .contact-items {
    flex-direction: column;
    gap: 30px;
  }
  .footer-content {
    flex-direction: column;
    gap: 20px;
  }
  .footer-nav {
    flex-wrap: wrap;
    justify-content: center;
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

@media (max-width: 576px) {
  .title { font-size: 2.5rem; }
  .subtitle { font-size: 0.9rem; }
}
</style>