#!/usr/bin/env python3
"""
Script pour créer l'architecture complète du projet Vue.js
Utilisation: python setup_vue_project.py
"""

import os
import json

# Configuration du projet
PROJECT_CONFIG = {
    "directories": [
        "src/views",
        "src/components/layout",
        "src/components/home",
        "src/components/resources",
        "src/router",
        "src/stores",
        "src/assets/styles",
        "src/assets/images"
    ],
    "files": {
        # Router
        "src/router/index.js": """// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Method from '../views/Method.vue'
import Resources from '../views/Resources.vue'
import Contact from '../views/Contact.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/parcours',
      name: 'about',
      component: About
    },
    {
      path: '/methode',
      name: 'method',
      component: Method
    },
    {
      path: '/ressources',
      name: 'resources',
      component: Resources
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router""",

        # Main.js
        "src/main.js": """// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Styles globaux
import './assets/styles/main.css'

const app = createApp(App)

// Plugins
app.use(createPinia())
app.use(router)

// Mount l'application
app.mount('#app')""",

        # App.vue
        "src/App.vue": """<template>
  <div id="app">
    <!-- Header de navigation -->
    <NavHeader />

    <!-- Contenu des pages -->
    <main>
      <RouterView />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import NavHeader from './components/layout/NavHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: {
    NavHeader,
    AppFooter
  }
}
</script>

<style>
/* Reset et styles de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>""",

        # Store Resources
        "src/stores/resources.js": """// src/stores/resources.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useResourcesStore = defineStore('resources', () => {
  // État
  const selectedClass = ref('')
  const selectedSubject = ref('')
  const showColles = ref(false)

  // Données des ressources (à terme depuis une DB)
  const resources = ref([
    {
      id: 1,
      title: 'Interrogation 0 PC*',
      subject: 'maths',
      class: 'pcsi',
      type: 'exercice',
      date: '2024-09-15',
      isColle: false,
      files: [
        { type: 'enonce', url: '/documents/exercices/maths/Interrogation_0_sujet.pdf' },
        { type: 'correction', url: '/documents/exercices/maths/Interrogation_0_correction.pdf' }
      ]
    },
    {
      id: 2,
      title: 'Intégrales - Énoncé',
      subject: 'maths',
      class: 'terminale',
      type: 'exercice',
      date: '2024-10-01',
      isColle: true,
      files: [
        { type: 'enonce', url: '/documents/exercices/maths/integrals-enonce.pdf' }
      ]
    }
    // Plus de ressources...
  ])

  // Classes et matières disponibles
  const availableClasses = ref([
    { value: 'seconde', label: 'Seconde' },
    { value: 'premiere', label: 'Première' },
    { value: 'terminale', label: 'Terminale' },
    { value: 'pcsi', label: 'PCSI' },
    { value: 'pc', label: 'PC*' }
  ])

  const availableSubjects = ref([
    { value: 'maths', label: 'Mathématiques', icon: '📐' },
    { value: 'physics', label: 'Physique', icon: '⚛️' },
    { value: 'chemistry', label: 'Chimie', icon: '🧪' }
  ])

  // Computed
  const filteredResources = computed(() => {
    return resources.value.filter(resource => {
      const matchClass = !selectedClass.value || resource.class === selectedClass.value
      const matchSubject = !selectedSubject.value || resource.subject === selectedSubject.value
      const matchColle = !showColles.value || resource.isColle

      return matchClass && matchSubject && matchColle
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  const resourcesPreview = computed(() => {
    return resources.value.slice(0, 3)
  })

  // Actions
  const setClassFilter = (classValue) => {
    selectedClass.value = classValue
  }

  const setSubjectFilter = (subjectValue) => {
    selectedSubject.value = subjectValue
  }

  const toggleColles = (value) => {
    showColles.value = value
  }

  const clearFilters = () => {
    selectedClass.value = ''
    selectedSubject.value = ''
    showColles.value = false
  }

  return {
    selectedClass,
    selectedSubject,
    showColles,
    resources,
    availableClasses,
    availableSubjects,
    filteredResources,
    resourcesPreview,
    setClassFilter,
    setSubjectFilter,
    toggleColles,
    clearFilters
  }
})""",

        # CSS Variables
        "src/assets/styles/variables.css": """:root {
  /* Couleurs */
  --primary-color: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary-color: #64748b;
  --accent-color: #f59e0b;
  --background-color: #f8fafc;
  --text-color: #1e293b;
  --text-muted: #64748b;
  --border-color: #e2e8f0;

  /* Typographie */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  /* Espacements */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  /* Breakpoints */
  --mobile: 768px;
  --tablet: 1024px;
  --desktop: 1280px;

  /* Ombres */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Rayons de bordure */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
}""",

        # CSS Principal
        "src/assets/styles/main.css": """@import './variables.css';

/* Reset CSS */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Typographie */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
}

h1 { font-size: var(--font-size-3xl); }
h2 { font-size: var(--font-size-2xl); }
h3 { font-size: var(--font-size-xl); }

p {
  margin-bottom: var(--spacing-md);
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--primary-dark);
}

/* Utilities */
.container {
  max-width: var(--desktop);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  color: white;
}

.btn-outline {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-outline:hover {
  background-color: var(--primary-color);
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 var(--spacing-sm);
  }
}""",

        # Views templates
        "src/views/Home.vue": """<template>
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
</style>""",

        "src/views/About.vue": """<template>
  <div class="about">
    <div class="container">
      <h1>Mon Parcours</h1>
      <p>Page à développer avec photo et timeline</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  padding: var(--spacing-2xl) 0;
}
</style>""",

        "src/views/Method.vue": """<template>
  <div class="method">
    <div class="container">
      <h1>Ma Méthode Pédagogique</h1>
      <p>Page à développer</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Method'
}
</script>

<style scoped>
.method {
  padding: var(--spacing-2xl) 0;
}
</style>""",

        "src/views/Resources.vue": """<template>
  <div class="resources">
    <div class="container">
      <h1>Ressources Pédagogiques</h1>
      <p>Page complète avec filtres à développer</p>

      <!-- TODO: Ajouter les composants de filtres et ressources -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resources'
}
</script>

<style scoped>
.resources {
  padding: var(--spacing-2xl) 0;
}
</style>""",

        "src/views/Contact.vue": """<template>
  <div class="contact">
    <div class="container">
      <h1>Me Contacter</h1>
      <p>Page à développer</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact'
}
</script>

<style scoped>
.contact {
  padding: var(--spacing-2xl) 0;
}
</style>""",

        # Layout Components
        "src/components/layout/NavHeader.vue": """<template>
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
</style>""",

        "src/components/layout/AppFooter.vue": """<template>
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
</style>""",

        # Fichiers composants vides à développer
        "src/components/home/HeroSection.vue": """<template>
  <section class="hero-section">
    <h1>À développer - Hero Section</h1>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>""",

        "src/components/home/ResourcesPreview.vue": """<template>
  <section class="resources-preview">
    <h2>À développer - Preview Ressources</h2>
  </section>
</template>

<script>
export default {
  name: 'ResourcesPreview'
}
</script>""",

        "src/components/resources/ClassFilter.vue": """<template>
  <div class="class-filter">
    <h3>À développer - Filtre Classes</h3>
  </div>
</template>

<script>
export default {
  name: 'ClassFilter'
}
</script>""",

        "src/components/resources/SubjectFilter.vue": """<template>
  <div class="subject-filter">
    <h3>À développer - Filtre Matières</h3>
  </div>
</template>

<script>
export default {
  name: 'SubjectFilter'
}
</script>""",

        "src/components/resources/ResourceCard.vue": """<template>
  <div class="resource-card">
    <h3>À développer - Carte Ressource</h3>
  </div>
</template>

<script>
export default {
  name: 'ResourceCard'
}
</script>""",

        "src/components/resources/CollesSection.vue": """<template>
  <section class="colles-section">
    <h2>À développer - Section Colles</h2>
  </section>
</template>

<script>
export default {
  name: 'CollesSection'
}
</script>"""
    }
}


def create_directories():
    """Créer tous les dossiers nécessaires"""
    print("📁 Création des dossiers...")
    for directory in PROJECT_CONFIG["directories"]:
        os.makedirs(directory, exist_ok=True)
        print(f"   ✅ {directory}")


def create_files():
    """Créer tous les fichiers avec leur contenu"""
    print("\n📝 Création des fichiers...")
    for file_path, content in PROJECT_CONFIG["files"].items():
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"   ✅ {file_path}")


def update_package_json():
    """Ajouter les dépendances nécessaires au package.json"""
    print("\n📦 Mise à jour du package.json...")

    try:
        with open('package.json', 'r', encoding='utf-8') as f:
            package_data = json.load(f)

        # Ajouter les nouvelles dépendances
        if 'dependencies' not in package_data:
            package_data['dependencies'] = {}

        new_dependencies = {
            "vue-router": "^4.0.0",
            "pinia": "^2.0.0"
        }

        for dep, version in new_dependencies.items():
            if dep not in package_data['dependencies']:
                package_data['dependencies'][dep] = version
                print(f"   ➕ Ajout de {dep}@{version}")

        with open('package.json', 'w', encoding='utf-8') as f:
            json.dump(package_data, f, indent=2)

        print("   ✅ package.json mis à jour")

    except FileNotFoundError:
        print("   ⚠️  package.json non trouvé, ignoré")
    except json.JSONDecodeError:
        print("   ❌ Erreur lors de la lecture du package.json")


def create_readme():
    """Créer un README avec les instructions"""
    readme_content = """# Vue.js Project - Architecture Refactoring

## 🚀 Installation des dépendances

```bash
npm install
```

## 🏗️ Architecture créée

```
src/
├── main.js              # Point d'entrée
├── App.vue              # Composant racine  
├── router/              # Configuration routing
├── views/               # Pages principales
├── components/          # Composants réutilisables
│   ├── layout/          # Header, Footer
│   ├── home/            # Composants accueil
│   └── resources/       # Composants ressources
├── assets/styles/       # CSS variables et global
└── stores/              # Gestion d'état (Pinia)
```

## 📋 Prochaines étapes

1. `npm install` - Installer les dépendances
2. `npm run dev` - Lancer le serveur de dev
3. Développer les composants un par un
4. Tester et itérer

## 🎯 Statut des composants

- [x] Architecture de base
- [x] Router configuré
- [x] Store ressources
- [x] Layout (Header/Footer)
- [ ] HeroSection 
- [ ] ResourcesPreview
- [ ] Filtres ressources
- [ ] ResourceCard
- [ ] Section colles

## 🔧 Commandes utiles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Preview du build
```
"""

    with open('REFACTOR_README.md', 'w', encoding='utf-8') as f:
        f.write(readme_content)
    print("   ✅ REFACTOR_README.md créé")


def main():
    """Fonction principale"""
    print("🎯 Setup de l'architecture Vue.js")
    print("=" * 50)

    try:
        create_directories()
        create_files()
        update_package_json()
        create_readme()

        print("\n" + "=" * 50)
        print("✅ ARCHITECTURE CRÉÉE AVEC SUCCÈS!")
        print("\n🚀 Prochaines étapes:")
        print("1. npm install")
        print("2. npm run dev")
        print("3. Ouvrir http://localhost:5173")
        print("\n📚 Consulter REFACTOR_README.md pour plus d'infos")

    except Exception as e:
        print(f"\n❌ Erreur: {e}")
        return 1

    return 0


if __name__ == "__main__":
    exit(main())