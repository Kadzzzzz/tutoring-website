# Backend API - Colle Splitter

Backend Node.js + Python pour découper automatiquement les PDFs de colles et générer les ressources pour votre site web.

## 📋 Prérequis

- Node.js 18+ et npm
- Python 3.8+
- Compte Render.com (gratuit) OU Railway.app

---

## 🚀 Déploiement sur Render.com (GRATUIT)

### Étape 1 : Créer un compte Render

1. Allez sur [https://render.com](https://render.com)
2. Inscrivez-vous avec votre compte GitHub
3. Autorisez Render à accéder à votre repo

### Étape 2 : Créer un nouveau Web Service

1. Dans le dashboard Render, cliquez sur **"New +"** → **"Web Service"**
2. Connectez votre repository GitHub `tutoring-website`
3. Configurez le service :

**Configuration :**
```
Name: colle-splitter-api
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && pip install -r requirements.txt
Start Command: npm start
Instance Type: Free
```

### Étape 3 : Variables d'environnement

Dans l'onglet "Environment", ajoutez :

```
PORT = 3001
FRONTEND_URL = https://votre-site-hostinger.com
ADMIN_PASSWORD = votre_mot_de_passe_secret
```

### Étape 4 : Déployer

1. Cliquez sur **"Create Web Service"**
2. Attendez le build (environ 5 minutes)
3. Une fois déployé, vous obtiendrez une URL du type : `https://colle-splitter-api.onrender.com`

**✅ Votre backend est en ligne !**

---

## 🧪 Tester localement (optionnel)

### Installation

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances Node.js
npm install

# Installer les dépendances Python
pip install -r requirements.txt

# Créer le fichier .env
cp .env.example .env
# Éditez .env avec vos valeurs
```

### Lancer le serveur

```bash
npm start
```

Le serveur démarre sur `http://localhost:3001`

### Tester l'API

**Avec curl :**
```bash
curl -X POST http://localhost:3001/api/split-colle \
  -F "pdf=@/path/to/S7_MPSI.pdf" \
  -F "matiere=physique" \
  -F "classe=MPSI" \
  -F "semaine=7" \
  -F "year=2025-2026" \
  -F "weekDate=2025-11-10"
```

**Avec Postman :**
1. POST `http://localhost:3001/api/split-colle`
2. Body → form-data
3. Ajouter :
   - `pdf` (file) → Sélectionner votre PDF
   - `matiere` (text) → `physique` ou `chimie`
   - `classe` (text) → `MPSI` ou `PCSI`
   - `semaine` (text) → `7`
   - `year` (text) → `2025-2026`
   - `weekDate` (text) → `2025-11-10`

---

## 📡 API Endpoints

### `POST /api/split-colle`

Découpe un PDF de colle en exercices individuels.

**Request:**
- `pdf` (file) - Le fichier PDF à découper
- `matiere` (string) - `physique` ou `chimie`
- `classe` (string) - `MPSI` ou `PCSI`
- `semaine` (number) - Numéro de la semaine
- `year` (string, optionnel) - Année scolaire (défaut: `2025-2026`)
- `weekDate` (string, optionnel) - Date de la semaine (format: `YYYY-MM-DD`)
- `teacher` (string, optionnel) - Nom du professeur (défaut: `Jeremy Luccioni`)

**Response:**
```json
{
  "success": true,
  "message": "5 fichiers générés",
  "data": {
    "outputDir": "output/physique/Colles-MPSI-S7",
    "programme": {
      "filename": "Programme.pdf",
      "path": "..."
    },
    "planches": [
      {
        "filename": "P1-1.pdf",
        "path": "...",
        "planche": 1,
        "exercice": 1
      },
      {
        "filename": "P1-2.pdf",
        "path": "...",
        "planche": 1,
        "exercice": 2
      }
    ],
    "resources": [
      {
        "id": "programme-mpsi-s7",
        "subject": "physique",
        "title": "Programme de colle MPSI Semaine 7",
        "pdfStatement": "/documents/exercices/physique/Colles-MPSI-S7/Programme.pdf",
        "colleAssignments": [...]
      },
      {
        "id": "physique-mpsi-s7-p1-1",
        "subject": "physique",
        "title": "Exercice planche 1 - Partie 1",
        "pdfStatement": "/documents/exercices/physique/Colles-MPSI-S7/P1-1.pdf",
        "colleAssignments": [...]
      }
    ]
  }
}
```

### `GET /api/download/:matiere/:classe/:semaine/:filename`

Télécharge un fichier PDF généré.

**Exemple:**
```
GET /api/download/physique/MPSI/7/P1-1.pdf
```

### `GET /health`

Vérifie que l'API fonctionne.

**Response:**
```json
{
  "status": "ok",
  "message": "Backend API is running"
}
```

---

## 🔧 Architecture

```
backend/
├── server.js              # Serveur Express.js
├── colle_splitter.py      # Script Python de découpage
├── package.json           # Dépendances Node.js
├── requirements.txt       # Dépendances Python
├── .env                   # Variables d'environnement (à créer)
├── .env.example           # Exemple de variables
├── .gitignore             # Fichiers à ignorer
├── uploads/               # PDFs uploadés (temporaire)
├── output/                # PDFs découpés (temporaire)
└── README.md              # Ce fichier
```

## 📝 Workflow complet

1. **Frontend** (votre site) → Upload PDF + métadonnées
2. **Backend API** → Reçoit le PDF
3. **Script Python** → Découpe le PDF en exercices
4. **Backend API** → Scanne les fichiers générés
5. **Backend API** → Retourne les métadonnées JSON
6. **Frontend** → Affiche les ressources générées
7. **Vous** → Téléchargez les PDFs et le code `index.js`

---

## 🐛 Dépannage

### Erreur : "python3: command not found"

Sur Render.com, Python est déjà installé. Si vous testez localement :
```bash
# Vérifier Python
python3 --version

# Si absent, installer Python 3
# Sur Ubuntu/Debian :
sudo apt install python3 python3-pip
# Sur macOS :
brew install python3
```

### Erreur : "PyMuPDF not found"

```bash
pip install -r requirements.txt
```

### Le serveur ne démarre pas

Vérifiez que le port 3001 n'est pas déjà utilisé :
```bash
lsof -ti:3001 | xargs kill -9  # Tuer le processus
npm start                       # Redémarrer
```

---

## 🔐 Sécurité (TODO future)

Pour l'instant, l'API est ouverte. Prochaines étapes :
- Ajouter un middleware d'authentification JWT
- Limiter le nombre de requêtes (rate limiting)
- Valider plus strictement les uploads

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifier les logs sur Render.com
2. Tester localement avec `npm start`
3. Vérifier que Python et PyMuPDF sont bien installés

---

**Créé par Jeremy Luccioni - 2025**
