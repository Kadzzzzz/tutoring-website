# Jeremy Luccioni - Site Web Personnel

Site web personnel de Jeremy Luccioni, étudiant à l'École Centrale de Lyon et professeur particulier en Mathématiques, Physique et Chimie.

## Aperçu

Ce site présente :
- Ressources pédagogiques (exercices, cours, méthodes)
- Méthodologie d'enseignement
- Informations de contact
- Interface bilingue (Français/Anglais)

**Site en ligne :** [jeremy-luccioni.fr](https://jeremy-luccioni.fr/)

## Technologies utilisées

- **Vue.js 3** - Framework JavaScript réactif
- **Vite** - Outil de build moderne
- **Font Awesome** - Icônes
- **CSS3** - Styles avec variables CSS et responsive design
- **JavaScript ES6+** - Logique interactive

## Structure du projet

```
jeremy-tutoring/
├── public/
│   ├── index.html              # Page HTML principale
│   └── favicon.ico             # Icône du site
├── src/
│   ├── assets/
│   │   └── images/             # Images du site
│   ├── components/
│   │   └── ResourceModal.vue   # Modal des ressources
│   ├── composables/
│   │   └── useTranslations.js  # Composable pour les traductions
│   ├── i18n/
│   │   └── translations.js     # Fichier centralisé des traductions
│   ├── App.vue                 # Composant principal
│   └── main.js                 # Point d'entrée
├── package.json                # Dépendances et scripts
├── vite.config.js              # Configuration Vite
└── README.md                   # Ce fichier
```

## Installation et lancement

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/Kadzzzzz/tutoring-website.git
cd tutoring-website

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

Le site sera accessible sur `http://localhost:5173`

## Guide de maintenance et mise à jour

### 1. Modifier l'apparence du site

#### Changer les couleurs
Les couleurs sont définies dans `src/App.vue` dans les variables CSS :
```css
:root {
  --primary-color: #2c3e50;    /* Couleur principale (header, titres) */
  --secondary-color: #f8f9fa;  /* Couleur de fond */
  --accent-color: #3498db;     /* Couleur d'accent (boutons, liens) */
  --text-color: #333;          /* Couleur du texte */
  --text-light: #666;          /* Couleur du texte secondaire */
}
```

#### Changer l'image de bannière
Dans `src/App.vue`, section `.hero-section` :
```css
.hero-section {
  background: linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.5)),
              url('VOTRE_NOUVELLE_IMAGE_URL');
}
```

Pour utiliser une image locale :
1. Placez l'image dans `src/assets/images/`
2. Remplacez l'URL par : `url('@/assets/images/votre-image.jpg')`

### 2. Système de traductions

Le site utilise un système centralisé de traductions :
- **`src/i18n/translations.js`** : Contient toutes les traductions
- **`src/composables/useTranslations.js`** : Gère la logique de traduction
- Les composants utilisent le composable via `const { t, currentLang, toggleLanguage } = useTranslations()`

#### Structure des traductions
```javascript
// src/i18n/translations.js
export const translations = {
  fr: {
    nav: {
      about: "À propos",
      resources: "Ressources",
      // ...
    },
    // ... autres sections
  },
  en: {
    nav: {
      about: "About",
      resources: "Resources",
      // ...
    },
    // ... autres sections
  }
}
```

### 3. Ajouter de nouvelles ressources pédagogiques

#### Étape 1 : Ajouter la ressource dans App.vue
Dans `src/App.vue`, section `resources` du script :

```javascript
const resources = [
  // Ajouter votre nouvelle ressource
  {
    id: 'votre-nouveau-exercice',           // Identifiant unique
    subject: 'maths',                       // 'maths', 'physics', ou 'chemistry'
    levelKey: 'terminale',                  // 'terminale', 'prepa1', 'prepa2'
    typeKey: 'exercise',                    // 'exercise', 'course', 'method', 'interro'
    duration: '60 min',                     // Durée estimée
    hasVideo: true,                         // true si vidéo disponible
    videoUrl: 'dQw4w9WgXcQ',               // ID YouTube (optionnel)
    pdfStatement: '/documents/exercices/maths/votre-exercice-sujet.pdf',    // PDF énoncé (optionnel)
    pdfSolution: '/documents/exercices/maths/votre-exercice-correction.pdf' // PDF correction (optionnel)
  }
]
```

#### Étape 2 : Ajouter les traductions
Dans `src/i18n/translations.js`, ajoutez les traductions :

```javascript
export const translations = {
  fr: {
    resources: {
      exercises: {
        maths: {  // ou physics/chemistry
          'votre-nouveau-exercice': {
            title: "Titre de votre exercice",
            description: "Description courte",
            fullDescription: "Description complète pour le modal",
            notes: "Notes et conseils (optionnel)"
          }
        }
      }
    }
  },
  en: {
    resources: {
      exercises: {
        maths: {
          'votre-nouveau-exercice': {
            title: "Your exercise title",
            description: "Short description",
            fullDescription: "Full description for modal",
            notes: "Notes and tips (optional)"
          }
        }
      }
    }
  }
}
```

### 4. Ajouter une nouvelle langue

#### Étape 1 : Ajouter les traductions
Dans `src/i18n/translations.js`, ajoutez votre nouvelle langue :

```javascript
export const translations = {
  fr: { /* ... */ },
  en: { /* ... */ },
  es: {  // Exemple pour l'espagnol
    nav: {
      about: "Acerca de",
      resources: "Recursos",
      methodology: "Método",
      contact: "Contacto"
    },
    hero: {
      subtitle: "Estudiante de Ingeniería y Profesor Particular",
      title: "Destaca en estudios científicos",
      // ... toutes les autres traductions
    }
    // ... compléter toutes les sections
  }
}
```

#### Étape 2 : Mettre à jour le composable (optionnel)
Si vous voulez supporter plus de 2 langues avec un cycle au lieu d'un toggle :

Dans `src/composables/useTranslations.js` :
```javascript
// Modifier toggleLanguage pour cycler entre plusieurs langues
const availableLanguages = ['fr', 'en', 'es'] // Vos langues

const toggleLanguage = () => {
  const currentIndex = availableLanguages.indexOf(currentLang.value)
  const nextIndex = (currentIndex + 1) % availableLanguages.length
  currentLang.value = availableLanguages[nextIndex]
  localStorage.setItem('language', currentLang.value)
}
```

### 5. Modifier le contenu

#### Informations personnelles
Dans `src/App.vue`, recherchez et modifiez :
- **Nom :** `.logo` et `Jeremy Luccioni`
- **Email :** `jeremy.luccioni@etu.ec-lyon.fr`
- **Parcours académique :** Section timeline
- **Liens sociaux :** LinkedIn, YouTube, GitHub

#### Textes du site
Tous les textes sont centralisés dans `src/i18n/translations.js`. Modifiez directement ce fichier pour changer :
- Titres et descriptions
- Méthodologie d'enseignement
- Informations de contact

### 6. Ajouter des vidéos YouTube

Pour ajouter une vraie vidéo :
1. Uploadez votre vidéo sur YouTube
2. Récupérez l'ID de la vidéo (dans l'URL après `v=`)
3. Dans la ressource, définissez `hasVideo: true` et `videoUrl: 'ID_DE_LA_VIDEO'`

### 7. Ajouter des PDFs

Pour ajouter des documents PDF :
1. Placez vos PDFs dans `public/documents/exercices/[matiere]/`
2. Dans la ressource, ajoutez :
   - `pdfStatement: '/documents/exercices/maths/nom-sujet.pdf'`
   - `pdfSolution: '/documents/exercices/maths/nom-correction.pdf'`

### 8. Tester le responsive

Testez votre site sur différentes tailles d'écran :
- **Desktop :** 1200px+
- **Tablet :** 768px - 1199px  
- **Mobile :** < 768px

Utilisez les outils de développement du navigateur (F12) pour simuler différents appareils.

---

# Jeremy Luccioni - Personal Website

Personal website of Jeremy Luccioni, student at École Centrale de Lyon and private tutor in Mathematics, Physics and Chemistry.

## Overview

This website features:
- Educational resources (exercises, courses, methods)
- Teaching methodology
- Contact information
- Bilingual interface (French/English)

**Live website:** [jeremy-luccioni.fr](https://jeremy-luccioni.fr/)

## Technologies used

- **Vue.js 3** - Reactive JavaScript framework
- **Vite** - Modern build tool
- **Font Awesome** - Icons
- **CSS3** - Styles with CSS variables and responsive design
- **JavaScript ES6+** - Interactive logic

## Project structure

```
jeremy-tutoring/
├── public/
│   ├── index.html              # Main HTML page
│   └── favicon.ico             # Site icon
├── src/
│   ├── assets/
│   │   └── images/             # Site images
│   ├── components/
│   │   └── ResourceModal.vue   # Resources modal
│   ├── composables/
│   │   └── useTranslations.js  # Translations composable
│   ├── i18n/
│   │   └── translations.js     # Centralized translations file
│   ├── App.vue                 # Main component
│   └── main.js                 # Entry point
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## Installation and launch

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Kadzzzzz/tutoring-website.git
cd tutoring-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The site will be accessible at `http://localhost:5173`

## Maintenance and update guide

### 1. Modify the site appearance

#### Change colors
Colors are defined in `src/App.vue` in the CSS variables:
```css
:root {
  --primary-color: #2c3e50;    /* Primary color (header, titles) */
  --secondary-color: #f8f9fa;  /* Background color */
  --accent-color: #3498db;     /* Accent color (buttons, links) */
  --text-color: #333;          /* Text color */
  --text-light: #666;          /* Secondary text color */
}
```

#### Change the banner image
In `src/App.vue`, `.hero-section` section:
```css
.hero-section {
  background: linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.5)),
              url('YOUR_NEW_IMAGE_URL');
}
```

To use a local image:
1. Place the image in `src/assets/images/`
2. Replace the URL with: `url('@/assets/images/your-image.jpg')`

### 2. Translation system

The site uses a centralized translation system:
- **`src/i18n/translations.js`**: Contains all translations
- **`src/composables/useTranslations.js`**: Manages translation logic
- Components use the composable via `const { t, currentLang, toggleLanguage } = useTranslations()`

#### Translation structure
```javascript
// src/i18n/translations.js
export const translations = {
  fr: {
    nav: {
      about: "À propos",
      resources: "Ressources",
      // ...
    },
    // ... other sections
  },
  en: {
    nav: {
      about: "About",
      resources: "Resources",
      // ...
    },
    // ... other sections
  }
}
```

### 3. Add new educational resources

#### Step 1: Add the resource in App.vue
In `src/App.vue`, `resources` section of the script:

```javascript
const resources = [
  // Add your new resource
  {
    id: 'your-new-exercise',           // Unique identifier
    subject: 'maths',                  // 'maths', 'physics', or 'chemistry'
    levelKey: 'terminale',             // 'terminale', 'prepa1', 'prepa2'
    typeKey: 'exercise',               // 'exercise', 'course', 'method', 'interro'
    duration: '60 min',                // Estimated duration
    hasVideo: true,                    // true if video available
    videoUrl: 'dQw4w9WgXcQ',          // YouTube ID (optional)
    pdfStatement: '/documents/exercices/maths/your-exercise-statement.pdf',  // Statement PDF (optional)
    pdfSolution: '/documents/exercices/maths/your-exercise-solution.pdf'     // Solution PDF (optional)
  }
]
```

#### Step 2: Add translations
In `src/i18n/translations.js`, add the translations:

```javascript
export const translations = {
  fr: {
    resources: {
      exercises: {
        maths: {  // or physics/chemistry
          'your-new-exercise': {
            title: "Title of your exercise",
            description: "Short description",
            fullDescription: "Full description for the modal",
            notes: "Notes and tips (optional)"
          }
        }
      }
    }
  },
  en: {
    resources: {
      exercises: {
        maths: {
          'your-new-exercise': {
            title: "Your exercise title",
            description: "Short description",
            fullDescription: "Full description for modal",
            notes: "Notes and tips (optional)"
          }
        }
      }
    }
  }
}
```

### 4. Add a new language

#### Step 1: Add translations
In `src/i18n/translations.js`, add your new language:

```javascript
export const translations = {
  fr: { /* ... */ },
  en: { /* ... */ },
  es: {  // Example for Spanish
    nav: {
      about: "Acerca de",
      resources: "Recursos",
      methodology: "Método",
      contact: "Contacto"
    },
    hero: {
      subtitle: "Estudiante de Ingeniería y Profesor Particular",
      title: "Destaca en estudios científicos",
      // ... all other translations
    }
    // ... complete all sections
  }
}
```

#### Step 2: Update the composable (optional)
If you want to support more than 2 languages with cycling instead of toggling:

In `src/composables/useTranslations.js`:
```javascript
// Modify toggleLanguage to cycle through multiple languages
const availableLanguages = ['fr', 'en', 'es'] // Your languages

const toggleLanguage = () => {
  const currentIndex = availableLanguages.indexOf(currentLang.value)
  const nextIndex = (currentIndex + 1) % availableLanguages.length
  currentLang.value = availableLanguages[nextIndex]
  localStorage.setItem('language', currentLang.value)
}
```

### 5. Modify content

#### Personal information
In `src/App.vue`, search and modify:
- **Name:** `.logo` and `Jeremy Luccioni`
- **Email:** `jeremy.luccioni@etu.ec-lyon.fr`
- **Academic background:** Timeline section
- **Social links:** LinkedIn, YouTube, GitHub

#### Site texts
All texts are centralized in `src/i18n/translations.js`. Directly modify this file to change:
- Titles and descriptions
- Teaching methodology
- Contact information

### 6. Add YouTube videos

To add a real video:
1. Upload your video to YouTube
2. Get the video ID (in the URL after `v=`)
3. In the resource, set `hasVideo: true` and `videoUrl: 'VIDEO_ID'`

### 7. Add PDFs

To add PDF documents:
1. Place your PDFs in `public/documents/exercices/[subject]/`
2. In the resource, add:
   - `pdfStatement: '/documents/exercices/maths/name-statement.pdf'`
   - `pdfSolution: '/documents/exercices/maths/name-solution.pdf'`

### 8. Test responsiveness

Test your site on different screen sizes:
- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px  
- **Mobile:** < 768px

Use browser development tools (F12) to simulate different devices.