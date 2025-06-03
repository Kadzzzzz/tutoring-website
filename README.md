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
  │   ├── index.html          # Page HTML principale
  │   └── favicon.ico         # Icône du site
  ├── src/
  │   ├── assets/
  │   │   └── images/         # Images du site
  │   ├── components/
  │   │   └── ResourceModal.vue  # Modal des ressources
  │   ├── App.vue             # Composant principal
  │   └── main.js            # Point d'entrée
  ├── package.json           # Dépendances et scripts
  ├── vite.config.js        # Configuration Vite
  └── README.md             # Ce fichier
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

  ### 2. Ajouter de nouvelles ressources pédagogiques

  #### Étape 1 : Ajouter la ressource dans les données
  Dans `src/App.vue`, section `resources` du script :

  ```javascript
  const resources = [
    // Ajouter votre nouvelle ressource
    {
      id: 'votre-nouveau-exercice',           // Identifiant unique
      subject: 'maths',                       // 'maths', 'physics', ou 'chemistry'
      levelKey: 'terminale',                  // 'terminale', 'prepa1', 'prepa2'
      typeKey: 'exercise',                    // 'exercise', 'course', 'method'
      duration: '60 min',                     // Durée estimée
      hasVideo: true,                         // true si vidéo disponible
      videoUrl: 'dQw4w9WgXcQ'                // ID YouTube (optionnel)
    }
  ]
  ```

  #### Étape 2 : Ajouter les traductions
  Dans la même section, ajoutez les traductions FR et EN :

  ```javascript
  const translations = {
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

  #### Étape 3 : Mettre à jour le modal
  Dans `src/components/ResourceModal.vue`, assurez-vous que les mêmes traductions sont présentes dans `fullTranslations`.

  ### 3. Ajouter une nouvelle langue

  #### Étape 1 : Ajouter la langue dans App.vue
  Ajoutez votre langue dans l'objet `translations` avec toutes les clés existantes :

  ```javascript
  const translations = {
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

  #### Étape 2 : Modifier le sélecteur de langue
  Remplacez la fonction `toggleLanguage` pour supporter plus de 2 langues :

  ```javascript
  const currentLang = ref('fr')
  const availableLanguages = ['fr', 'en', 'es'] // Ajouter votre langue

  const toggleLanguage = () => {
    const currentIndex = availableLanguages.indexOf(currentLang.value)
    const nextIndex = (currentIndex + 1) % availableLanguages.length
    currentLang.value = availableLanguages[nextIndex]
    localStorage.setItem('language', currentLang.value)
  }
  ```

  #### Étape 3 : Mettre à jour ResourceModal.vue
  Ajoutez les mêmes traductions dans `src/components/ResourceModal.vue`.

  ### 4. Modifier le contenu

  #### Informations personnelles
  Dans `src/App.vue`, recherchez et modifiez :
  - **Nom :** `.logo` et `Jeremy Luccioni`
  - **Email :** `jeremy.luccioni@etu.ec-lyon.fr`
  - **Parcours académique :** Section timeline
  - **Description :** Section hero et about

  #### Méthodologie d'enseignement
  Modifiez la section `methodologyItems` et les traductions correspondantes.

  #### Informations de contact
  Modifiez la section contact dans le template et les traductions.

  ### 5. Ajouter des vidéos YouTube

  Pour ajouter une vraie vidéo :
  1. Uploadez votre vidéo sur YouTube
  2. Récupérez l'ID de la vidéo (dans l'URL après `v=`)
  3. Remplacez `dQw4w9WgXcQ` par votre ID dans la ressource

  ### 6. Tester le responsive

  Testez votre site sur différentes tailles d'écran :
  - **Desktop :** 1200px+
  - **Tablet :** 768px - 1199px  
  - **Mobile :** < 768px

  Utilisez les outils de développement du navigateur (F12) pour simuler différents appareils.


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
│   ├── index.html          # Main HTML page
│   └── favicon.ico         # Site icon
├── src/
│   ├── assets/
│   │   └── images/         # Site images
│   ├── components/
│   │   └── ResourceModal.vue  # Resources modal
│   ├── App.vue             # Main component
│   └── main.js            # Entry point
├── package.json           # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # This file
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

### 2. Add new educational resources

#### Step 1: Add the resource in the data
In `src/App.vue`, `resources` section of the script:

```javascript
const resources = [
  // Add your new resource
  {
    id: 'your-new-exercise',           // Unique identifier
    subject: 'maths',                  // 'maths', 'physics', or 'chemistry'
    levelKey: 'terminale',             // 'terminale', 'prepa1', 'prepa2'
    typeKey: 'exercise',               // 'exercise', 'course', 'method'
    duration: '60 min',                // Estimated duration
    hasVideo: true,                    // true if video available
    videoUrl: 'dQw4w9WgXcQ'           // YouTube ID (optional)
  }
]
```

#### Step 2: Add translations
In the same section, add FR and EN translations:

```javascript
const translations = {
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

#### Step 3: Update the modal
In `src/components/ResourceModal.vue`, make sure the same translations are present in `fullTranslations`.

### 3. Add a new language

#### Step 1: Add the language in App.vue
Add your language in the `translations` object with all existing keys:

```javascript
const translations = {
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

#### Step 2: Modify the language selector
Replace the `toggleLanguage` function to support more than 2 languages:

```javascript
const currentLang = ref('fr')
const availableLanguages = ['fr', 'en', 'es'] // Add your language

const toggleLanguage = () => {
  const currentIndex = availableLanguages.indexOf(currentLang.value)
  const nextIndex = (currentIndex + 1) % availableLanguages.length
  currentLang.value = availableLanguages[nextIndex]
  localStorage.setItem('language', currentLang.value)
}
```

#### Step 3: Update ResourceModal.vue
Add the same translations in `src/components/ResourceModal.vue`.

### 4. Modify content

#### Personal information
In `src/App.vue`, search and modify:
- **Name:** `.logo` and `Jeremy Luccioni`
- **Email:** `jeremy.luccioni@etu.ec-lyon.fr`
- **Academic background:** Timeline section
- **Description:** Hero and about sections

#### Teaching methodology
Modify the `methodologyItems` section and corresponding translations.

#### Contact information
Modify the contact section in the template and translations.

### 5. Add YouTube videos

To add a real video:
1. Upload your video to YouTube
2. Get the video ID (in the URL after `v=`)
3. Replace `dQw4w9WgXcQ` with your ID in the resource

### 6. Test responsiveness

Test your site on different screen sizes:
- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px  
- **Mobile:** < 768px

Use browser development tools (F12) to simulate different devices.  