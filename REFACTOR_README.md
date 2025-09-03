# Vue.js Project - Architecture Refactoring

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
