# 📚 Plateforme de Ressources Pédagogiques - Jeremy Luccioni

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Plateforme web de partage de ressources pédagogiques destinée aux élèves de classes préparatoires (MPSI, PCSI, PC, MP), lycéens et étudiants en école d'ingénieur.

**🌐 Site en ligne :** [jeremy-luccioni.fr](https://jeremy-luccioni.fr/)

## 🎯 Objectif du Projet

Créer une plateforme centralisée permettant aux étudiants d'accéder à des ressources pédagogiques de qualité en Mathématiques, Physique et Chimie, avec un focus particulier sur les colles et la préparation aux oraux de concours.

## ✨ Fonctionnalités Principales

### 📖 Ressources Pédagogiques
- **Base de données** : Exercices, cours, méthodes, interrogations et colles
- **Filtrage des ressources** : Par matière, niveau, type de ressource
- **Recherche intelligente** : Dans les tags, titres et descriptions
- **Documents PDF** : Énoncés et corrections téléchargeables
- **Vidéos explicatives** : Intégration YouTube pour certains exercices

### 🎓 Section Colles MPSI/PCSI
- **Organisation par établissement** : Lycée Jean Perrin de Lyon
- **Navigation temporelle** : Sélection par semaine académique
- **Planches complètes** : Énoncés et corrections des exercices
- **Programmes hebdomadaires** : Questions de cours à maîtriser
- **Suivi personnalisé** : Organisation par classes et créneaux

## 🛠️ Technologies Utilisées

### Frontend
- **[Vue.js 3](https://vuejs.org/)**
- **[Vue Router 4](https://router.vuejs.org/)**
- **[Vite](https://vitejs.dev/)** 
- **CSS3**


### Architecture
- **Composants modulaires** - Structure claire et maintenable
- **Composables** - Logique réutilisable (useResources, useTranslations, etc.)
- **Data externalisée** - Séparation claire données/présentation

## 📁 Structure du Projet

```
tutoring-website/
├── 📂 public/
│   ├── 📂 documents/          # PDFs des ressources
│   │   └── 📂 exercices/       # Organisés par matière
│   └── favicon.ico
│
├── 📂 src/
│   ├── 📂 components/          # Composants Vue réutilisables
│   │   ├── 📂 layout/          # Header, Footer
│   │   ├── 📂 sections/        # Sections de la page d'accueil
│   │   ├── 📂 resources/       # Composants ressources
│   │   ├── 📂 physics-chemistry/# Composants spécialisés MPSI/PCSI
│   │   └── 📂 ui/              # Composants UI génériques
│   │
│   ├── 📂 composables/         # Logique réutilisable
│   │   ├── useResources.js    # Gestion des ressources
│   │   ├── useTranslations.js # Système multilingue
│   │   └── usePhysicsChemistry.js
│   │
│   ├── 📂 data/                # Données externalisées
│   │   ├── 📂 resources/       # Base de données ressources
│   │   ├── 📂 physics-chemistry/# Données colles MPSI/PCSI
│   │   └── 📂 subjects/        # Configuration matières
│   │
│   ├── 📂 views/               # Pages principales
│   │   ├── Home.vue           # Page d'accueil
│   │   └── Resources.vue      # Page ressources complète
│   │
│   └── 📂 router/              # Configuration routage
│
├── 📄 package.json             # Dépendances npm
├── 📄 vite.config.js           # Configuration Vite
└── 📄 README.md                # Documentation
```

## 🚀 Installation et Développement

### Prérequis
- Node.js 16+ 
- npm ou yarn
- Git

### Installation

```bash
# Cloner le repository
git clone https://github.com/Kadzzzzz/tutoring-website.git
cd tutoring-website

# Installer les dépendances
npm install
```

### Commandes Disponibles

```bash
# Lancer le serveur de développement (http://localhost:5173)
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version production
npm run preview
```

## 📚 Guide d'Utilisation

### Pour les Étudiants

1. **Page d'accueil** : Vue d'ensemble et accès rapide aux dernières ressources
2. **Page Ressources** : 
   - Utilisez les filtres pour trouver rapidement ce que vous cherchez
   - Cliquez sur une ressource pour voir les détails
   - Téléchargez les PDFs (énoncés et corrections)
   - Regardez les vidéos explicatives si disponibles
3. **Section Colles** : Accédez aux planches hebdomadaires de votre classe

### Pour les Contributeurs

#### Ajouter une Nouvelle Ressource

1. Ouvrir `/src/data/resources/index.js`
2. Ajouter un nouvel objet dans le tableau `resources` :

```javascript
{
  id: "unique-resource-id",
  subject: "maths", // ou "physics", "chemistry"
  levelKey: "prepa1", // ou "terminale", "prepa2"
  typeKey: "exercise", // ou "course", "method", "interro", "colle"
  duration: "30",
  hasVideo: false,
  videoUrl: "",
  pdfStatement: "/documents/exercices/maths/mon-exercice.pdf",
  pdfSolution: "/documents/exercices/maths/mon-exercice-correction.pdf",
  difficulty: "moyen", // "facile", "moyen", "difficile"
  tags: ["intégrales", "analyse"],
  createdAt: "2025-01-15",
  title: "Titre de la ressource",
  description: "Description courte",
  fullDescription: "Description détaillée de l'exercice...",
  notes: "Notes supplémentaires"
}
```

3. Placer les PDFs dans `/public/documents/exercices/[matière]/`

#### Ajouter une Colle MPSI/PCSI

Ajouter `isColle: true` et l'objet `colleData` :

```javascript
{
  // ... propriétés de base ...
  isColle: true,
  colleData: {
    school: "jean-perrin",
    year: "2025-2026",
    class: "mpsi", // ou "pcsi"
    week: 1,
    weekDate: "2025-09-15",
    planche: 1,
    teacher: "Jeremy Luccioni",
    timeSlot: "Jeudi 17-19",
    trinomes: []
  }
}
```

## 🎨 Personnalisation

### Modifier les Couleurs

Dans `/src/assets/main.css` :

```css
:root {
  --primary-color: #2c3e50;    /* Couleur principale */
  --secondary-color: #f8f9fa;  /* Fond secondaire */
  --accent-color: #3498db;     /* Couleur d'accent */
  --text-color: #333;          /* Texte principal */
  --text-light: #666;          /* Texte secondaire */
}
```

## 📈 Roadmap

### Phase 1 ✅ - Architecture Modulaire
- [x] Séparation en composants réutilisables
- [x] Externalisation des données
- [x] Système de traduction
- [x] Responsive design

### Phase 2 ✅ - Section Physique-Chimie
- [x] Composants spécialisés colles
- [x] Vue hebdomadaire
- [x] Intégration programmes de colles
- [x] Support multi-établissements

### Phase 3 🚧 - Fonctionnalités Avancées
- [ ] Système d'authentification
- [ ] Espace membres avec contenu exclusif
- [ ] Tracking de progression
- [ ] Forum d'entraide
- [ ] Application mobile (React Native)

### Phase 4 📅 - Extension
- [ ] Ajout matière Informatique
- [ ] Support classes PC/MP
- [ ] Intégration exerciseur interactif
- [ ] Génération automatique de TD

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Jeremy Luccioni**
- Étudiant à l'École Centrale de Lyon
- Colleur au Lycée Jean Perrin (Lyon) en PCSI et MPSI
- Email : jeremy.luccioni@etu.ec-lyon.fr
- LinkedIn : [Jeremy Luccioni](https://www.linkedin.com/in/jeremy-luccioni)
- Site web : [jeremy-luccioni.fr](https://jeremy-luccioni.fr/)

---

<div align="center">
  <strong>📚 Ensemble vers la réussite ! 🎯</strong>
  <br>
  <sub>Built with ❤️ using Vue.js</sub>
</div>