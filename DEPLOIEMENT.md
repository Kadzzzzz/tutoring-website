# 🚀 Guide de Déploiement sur Hostinger

## Problème : Le site ne s'actualise pas après `npm run build`

### Cause
Le navigateur garde l'ancienne version en cache. Même si vous remplacez les fichiers, le navigateur affiche la version ancienne.

## ✅ Solution Complète

### Étape 1 : Build local
```bash
npm run build
```

Ceci crée le dossier `dist/` avec tous les fichiers optimisés.

### Étape 2 : Déploiement sur Hostinger

**Important** : Videz complètement le dossier de destination avant de copier !

1. **Connectez-vous à votre File Manager Hostinger**
2. **Supprimez tout le contenu actuel** dans `public_html/` (sauf `.htaccess` si vous en avez déjà un)
3. **Copiez TOUT le contenu de `dist/`** (pas le dossier `dist` lui-même, mais son contenu) vers `public_html/`

Votre structure doit ressembler à :
```
public_html/
├── index.html          (nouveau)
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── .htaccess          (voir étape 3)
```

### Étape 3 : Configuration .htaccess

Copiez le contenu du fichier `dist-htaccess.txt` dans `public_html/.htaccess`

Cela empêchera le cache du fichier `index.html` et forcera le navigateur à toujours charger la dernière version.

### Étape 4 : Vider le cache du navigateur

**Sur votre ordinateur** :
- Chrome/Edge : `Ctrl + Shift + Delete` → Effacer "Images et fichiers en cache"
- Firefox : `Ctrl + Shift + Delete` → Effacer "Cache"
- Safari : `Cmd + Option + E`

**Ou rechargement forcé** :
- Windows : `Ctrl + Shift + R`
- Mac : `Cmd + Shift + R`

### Étape 5 : Vérification

1. Ouvrez votre site : https://jeremy-luccioni.fr
2. Ouvrez la console (F12)
3. Vérifiez qu'il n'y a pas d'erreurs CORS
4. Testez l'upload PDF

## 🔍 Diagnostic des Problèmes

### Le site affiche l'ancienne version
→ Cache navigateur. Faites `Ctrl + Shift + R`

### Erreur CORS dans la console
→ Vérifiez que votre domaine est bien dans la liste des origines autorisées sur Render.com
→ Allez dans les variables d'environnement Render et vérifiez `FRONTEND_URL`

### Les fonctionnalités ne marchent pas (édition, IA)
→ Ouvrez la console (F12) et regardez les erreurs
→ Vérifiez que l'API Render est bien démarrée : https://colle-splitter-api.onrender.com

### L'API Render ne répond pas
→ Les services gratuits Render s'endorment après 15min d'inactivité
→ Attendez 30-60 secondes lors de la première requête

## 📋 Checklist Déploiement

- [ ] `npm run build` exécuté
- [ ] Contenu de `dist/` copié dans `public_html/`
- [ ] `.htaccess` configuré avec les bonnes règles de cache
- [ ] Cache navigateur vidé (`Ctrl + Shift + R`)
- [ ] API Render démarrée (https://colle-splitter-api.onrender.com)
- [ ] Variables d'environnement Render configurées (GEMINI_API_KEY optionnel)

## 🆘 En cas de problème persistant

1. Ouvrez la console navigateur (F12)
2. Copiez les erreurs rouges
3. Vérifiez :
   - Le fichier `index.html` dans `public_html/` contient bien les nouveaux hash
   - Les fichiers JS dans `public_html/assets/` ont les bons hash
   - L'heure de modification des fichiers est récente

## 🎯 Automatisation Future

Pour automatiser le déploiement, vous pouvez :
1. Utiliser GitHub Actions pour déployer automatiquement
2. Utiliser un script FTP pour copier automatiquement
3. Configurer le déploiement continu sur Hostinger

