const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const { spawn } = require('child_process');
const archiver = require('archiver');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialiser Gemini AI (si clé API disponible)
let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// Configuration CORS - Autoriser plusieurs origines
const allowedOrigins = [
  'http://localhost:5173',
  'https://physique-jeanluccioni.fr',
  'https://jeremy-luccioni.fr',
  'https://www.jeremy-luccioni.fr',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Permettre les requêtes sans origine (comme Postman) ou les origines autorisées
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration multer pour l'upload de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers PDF sont acceptés'));
    }
  }
});

// Fonction pour extraire le texte d'un PDF avec Python
function extractTextFromPdf(pdfPath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', ['-c', `
import sys
import fitz  # PyMuPDF

try:
    doc = fitz.open(sys.argv[1])
    text = ""
    for page in doc:
        text += page.get_text()
    # Limiter à 1000 caractères pour l'IA
    print(text[:1000])
except Exception as e:
    print(f"ERROR: {e}", file=sys.stderr)
    sys.exit(1)
`, pdfPath]);

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`Extraction texte échouée: ${stderr}`));
      }
    });
  });
}

// Fonction pour générer titre et description avec Gemini AI
async function generateMetadataWithAI(text, matiere, plancheNum, exerciceNum) {
  if (!genAI) {
    // Pas d'IA disponible, retourner des valeurs par défaut
    const title = exerciceNum
      ? `Exercice planche ${plancheNum} - Partie ${exerciceNum}`
      : `Exercice planche ${plancheNum}`;
    return {
      title,
      description: `Exercice de ${matiere}`
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Tu es un assistant qui génère des titres et descriptions d'exercices de physique/chimie pour des étudiants de prépa.

Voici le début d'un exercice de ${matiere} (planche ${plancheNum}${exerciceNum ? `, partie ${exerciceNum}` : ''}) :

"""
${text}
"""

Génère :
1. Un titre court et descriptif (max 60 caractères) qui résume le thème principal de l'exercice
2. Une description courte (max 100 caractères) qui donne plus de détails

Format de réponse (JSON strict) :
{"title": "...", "description": "..."}

Réponds UNIQUEMENT avec le JSON, sans autre texte.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text().trim();

    // Essayer de parser le JSON
    try {
      const parsed = JSON.parse(responseText);
      return {
        title: parsed.title || `Exercice planche ${plancheNum}`,
        description: parsed.description || `Exercice de ${matiere}`
      };
    } catch (parseError) {
      console.error('Erreur parsing JSON de Gemini:', parseError);
      // Retour par défaut
      return {
        title: `Exercice planche ${plancheNum}`,
        description: `Exercice de ${matiere}`
      };
    }
  } catch (error) {
    console.error('Erreur Gemini:', error);
    // Retour par défaut en cas d'erreur
    return {
      title: exerciceNum ? `Exercice planche ${plancheNum} - Partie ${exerciceNum}` : `Exercice planche ${plancheNum}`,
      description: `Exercice de ${matiere}`
    };
  }
}

// Fonction pour lancer le script Python
function runPythonScript(pdfPath, matiere, classe, semaine) {
  return new Promise((resolve, reject) => {
    const outputDir = path.join(__dirname, 'output');

    const pythonProcess = spawn('python3', [
      'colle_splitter.py',
      pdfPath,
      '-m', matiere,
      '-c', classe,
      '-s', semaine.toString(),
      '-o', outputDir
    ]);

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
      console.log(`[Python] ${data.toString()}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
      console.error(`[Python Error] ${data.toString()}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`Script Python terminé avec le code ${code}\n${stderr}`));
      }
    });
  });
}

// Fonction pour scanner les fichiers générés
async function scanOutputFiles(matiere, classe, semaine) {
  const outputDir = path.join(__dirname, 'output', matiere, `Colles-${classe}-S${semaine}`);

  try {
    const files = await fs.readdir(outputDir);
    const pdfs = files.filter(f => f.endsWith('.pdf'));

    const result = {
      programme: null,
      planches: []
    };

    for (const pdf of pdfs) {
      if (pdf === 'Programme.pdf') {
        result.programme = {
          filename: pdf,
          path: path.join(outputDir, pdf)
        };
      } else {
        // Parse le nom du fichier (ex: P1.pdf, P1-1.pdf, P2-2.pdf)
        const match = pdf.match(/^P(\d+)(?:-(\d+))?\.pdf$/);
        if (match) {
          const plancheNum = parseInt(match[1]);
          const exerciceNum = match[2] ? parseInt(match[2]) : null;

          result.planches.push({
            filename: pdf,
            path: path.join(outputDir, pdf),
            planche: plancheNum,
            exercice: exerciceNum
          });
        }
      }
    }

    // Trier les planches
    result.planches.sort((a, b) => {
      if (a.planche !== b.planche) return a.planche - b.planche;
      if (a.exercice === null) return -1;
      if (b.exercice === null) return 1;
      return a.exercice - b.exercice;
    });

    return result;
  } catch (error) {
    throw new Error(`Erreur lors de la lecture des fichiers : ${error.message}`);
  }
}

// Route principale : découper un PDF de colle
app.post('/api/split-colle', upload.single('pdf'), async (req, res) => {
  try {
    // Vérifier que le fichier a été uploadé
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier PDF uploadé' });
    }

    // Récupérer les métadonnées
    const { matiere, classe, semaine, year, weekDate, teacher } = req.body;

    // Validation
    if (!matiere || !classe || !semaine) {
      return res.status(400).json({
        error: 'Paramètres manquants : matiere, classe et semaine sont obligatoires'
      });
    }

    if (!['physique', 'chimie'].includes(matiere)) {
      return res.status(400).json({ error: 'Matière invalide (physique ou chimie)' });
    }

    if (!['MPSI', 'PCSI'].includes(classe)) {
      return res.status(400).json({ error: 'Classe invalide (MPSI ou PCSI)' });
    }

    console.log(`📥 Traitement de ${req.file.originalname}`);
    console.log(`   Matière: ${matiere}, Classe: ${classe}, Semaine: ${semaine}`);

    // Lancer le script Python
    try {
      await runPythonScript(req.file.path, matiere, classe, parseInt(semaine));
    } catch (error) {
      // Nettoyer le fichier uploadé en cas d'erreur
      await fs.unlink(req.file.path);
      return res.status(500).json({
        error: 'Erreur lors du traitement du PDF',
        details: error.message
      });
    }

    // Scanner les fichiers générés
    const outputFiles = await scanOutputFiles(matiere, classe, parseInt(semaine));

    // Générer les métadonnées pour index.js
    const resources = [];

    // Ajouter le programme (showInResourcesPage: false)
    if (outputFiles.programme) {
      resources.push({
        id: `programme-${classe.toLowerCase()}-s${semaine}`,
        subject: matiere,
        levelKey: "prepa1",
        typeKey: "programme",
        duration: "",
        hasVideo: false,
        videoUrl: "",
        pdfStatement: `/documents/exercices/${matiere}/Colles-${classe}-S${semaine}/Programme.pdf`,
        pdfSolution: "",
        difficulty: "",
        tags: ["programme", "colle", matiere, classe.toLowerCase()],
        createdAt: new Date().toISOString().split('T')[0],
        title: `Programme de colle ${classe} Semaine ${semaine}`,
        description: `Programme de la semaine ${semaine}`,
        fullDescription: "",
        notes: "",
        isColle: true,
        showInResourcesPage: false,
        colleAssignments: [{
          school: "jean-perrin",
          year: year || "2025-2026",
          class: classe.toLowerCase(),
          week: parseInt(semaine),
          weekDate: weekDate || "",
          planche: 0, // Programme
          teacher: teacher || "Jeremy Luccioni",
          timeSlot: "",
          trinomes: []
        }]
      });
    }

    // Ajouter les exercices
    const planchesGrouped = {};
    outputFiles.planches.forEach(p => {
      if (!planchesGrouped[p.planche]) {
        planchesGrouped[p.planche] = [];
      }
      planchesGrouped[p.planche].push(p);
    });

    for (const [plancheNum, exercices] of Object.entries(planchesGrouped)) {
      for (const exercice of exercices) {
        const exerciceId = exercices.length === 1
          ? `${matiere}-${classe.toLowerCase()}-s${semaine}-p${plancheNum}`
          : `${matiere}-${classe.toLowerCase()}-s${semaine}-p${plancheNum}-${exercice.exercice}`;

        // Extraire le texte et générer titre/description avec IA
        let aiMetadata = {
          title: exercices.length === 1 ? `Exercice planche ${plancheNum}` : `Exercice planche ${plancheNum} - Partie ${exercice.exercice}`,
          description: `Exercice de ${matiere} - ${classe} Semaine ${semaine}`
        };

        try {
          console.log(`🤖 Génération IA pour ${exercice.filename}...`);
          const pdfText = await extractTextFromPdf(exercice.path);
          aiMetadata = await generateMetadataWithAI(pdfText, matiere, parseInt(plancheNum), exercice.exercice);
          console.log(`   ✓ Titre: ${aiMetadata.title}`);
        } catch (error) {
          console.error(`   ✗ Erreur IA pour ${exercice.filename}:`, error.message);
          // Utilise les valeurs par défaut déjà définies
        }

        resources.push({
          id: exerciceId,
          subject: matiere,
          levelKey: "prepa1",
          typeKey: "exercise",
          duration: "45",
          hasVideo: false,
          videoUrl: "",
          pdfStatement: `/documents/exercices/${matiere}/Colles-${classe}-S${semaine}/${exercice.filename}`,
          pdfSolution: "",
          difficulty: "moyen",
          tags: [matiere, "colle", classe.toLowerCase(), `semaine ${semaine}`],
          createdAt: new Date().toISOString().split('T')[0],
          title: aiMetadata.title,
          description: aiMetadata.description,
          fullDescription: "",
          notes: `Planche ${plancheNum} - Semaine ${semaine}`,
          isColle: true,
          colleAssignments: [{
            school: "jean-perrin",
            year: year || "2025-2026",
            class: classe.toLowerCase(),
            week: parseInt(semaine),
            weekDate: weekDate || "",
            planche: parseInt(plancheNum),
            teacher: teacher || "Jeremy Luccioni",
            timeSlot: "",
            trinomes: []
          }]
        });
      }
    }

    // Nettoyer le fichier uploadé
    await fs.unlink(req.file.path);

    // Retourner le résultat
    res.json({
      success: true,
      message: `${outputFiles.planches.length + 1} fichiers générés`,
      resources: resources,  // Au premier niveau pour le frontend
      outputDir: path.join('output', matiere, `Colles-${classe}-S${semaine}`),
      programme: outputFiles.programme,
      planches: outputFiles.planches
    });

  } catch (error) {
    console.error('❌ Erreur:', error);
    res.status(500).json({
      error: 'Erreur serveur',
      details: error.message
    });
  }
});

// Route pour télécharger un fichier généré
app.get('/api/download/:matiere/:classe/:semaine/:filename', async (req, res) => {
  try {
    const { matiere, classe, semaine, filename } = req.params;
    const filePath = path.join(__dirname, 'output', matiere, `Colles-${classe}-S${semaine}`, filename);

    // Vérifier que le fichier existe
    await fs.access(filePath);

    res.download(filePath);
  } catch (error) {
    res.status(404).json({ error: 'Fichier non trouvé' });
  }
});

// Route POST pour télécharger un package ZIP avec métadonnées personnalisées
app.post('/api/download-zip', async (req, res) => {
  try {
    const { matiere, classe, semaine, resources, currentResources } = req.body;

    if (!matiere || !classe || !semaine || !resources) {
      return res.status(400).json({ error: 'Paramètres manquants' });
    }

    const outputDir = path.join(__dirname, 'output', matiere, `Colles-${classe}-S${semaine}`);

    // Vérifier que le dossier existe
    await fs.access(outputDir);

    // Scanner les fichiers
    const files = await fs.readdir(outputDir);
    const pdfs = files.filter(f => f.endsWith('.pdf'));

    if (pdfs.length === 0) {
      return res.status(404).json({ error: 'Aucun PDF trouvé' });
    }

    // Créer le fichier INSTRUCTIONS.txt
    const instructions = `📦 PACKAGE DE RESSOURCES - Colles ${classe} Semaine ${semaine}
============================================================

Contenu du package :
${pdfs.map(f => `- ${f}`).join('\n')}

ÉTAPES D'INSTALLATION :
----------------------

1️⃣ COPIER LES PDFs
   → Placer tous les fichiers PDF dans :
   public/documents/exercices/${matiere}/Colles-${classe}-S${semaine}/

2️⃣ AJOUTER LES RESSOURCES
   → Ouvrir le fichier : src/data/resources/index.js
   → Copier le contenu de RESOURCES_TO_ADD.js
   → Coller à la fin du tableau "export const resources = [...]"
   → Attention : ajouter une virgule avant si nécessaire !

3️⃣ VÉRIFIER
   → Lancer le serveur de développement (npm run dev)
   → Aller sur la page des colles pour vérifier

4️⃣ DÉPLOYER
   → Commit : git add . && git commit -m "Add colles S${semaine}"
   → Push : git push
   → Déployer sur Hostinger

📝 NOTES :
- Les PDFs doivent être dans le dossier public/documents/exercices/
- Le code JavaScript doit être dans src/data/resources/index.js
- N'oubliez pas de build avant de déployer !

Bon courage ! 🚀
`;

    // Générer le code JavaScript avec les métadonnées personnalisées
    const resourcesCode = generateResourcesCodeFromData(resources);

    // Générer l'index.js complet si on a les ressources actuelles
    let fullIndexJs = null;
    if (currentResources && Array.isArray(currentResources)) {
      console.log(`📝 Génération de l'index.js complet avec ${currentResources.length} + ${resources.length} ressources`);
      const allResources = [...currentResources, ...resources];
      fullIndexJs = generateFullIndexJs(allResources);
    }

    // Créer le ZIP
    const archive = archiver('zip', { zlib: { level: 9 } });

    res.attachment(`Colles-${classe}-S${semaine}.zip`);
    archive.pipe(res);

    // Ajouter les PDFs
    for (const pdf of pdfs) {
      const pdfPath = path.join(outputDir, pdf);
      archive.file(pdfPath, { name: `PDFs/${pdf}` });
    }

    // Ajouter les fichiers d'instructions
    archive.append(instructions, { name: 'INSTRUCTIONS.txt' });
    archive.append(resourcesCode, { name: 'RESOURCES_TO_ADD.js' });

    // Ajouter l'index.js complet si disponible
    if (fullIndexJs) {
      archive.append(fullIndexJs, { name: 'index.js' });
    }

    await archive.finalize();

    console.log(`📦 ZIP généré avec métadonnées personnalisées: Colles-${classe}-S${semaine}.zip`);
  } catch (error) {
    console.error('❌ Erreur création ZIP:', error);
    res.status(500).json({ error: 'Erreur lors de la création du ZIP', details: error.message });
  }
});

// Route GET pour télécharger un package ZIP complet (ancienne version, gardée pour compatibilité)
app.get('/api/download-zip/:matiere/:classe/:semaine', async (req, res) => {
  try {
    const { matiere, classe, semaine } = req.params;
    const outputDir = path.join(__dirname, 'output', matiere, `Colles-${classe}-S${semaine}`);

    // Vérifier que le dossier existe
    await fs.access(outputDir);

    // Scanner les fichiers
    const files = await fs.readdir(outputDir);
    const pdfs = files.filter(f => f.endsWith('.pdf'));

    if (pdfs.length === 0) {
      return res.status(404).json({ error: 'Aucun PDF trouvé' });
    }

    // Créer le fichier INSTRUCTIONS.txt
    const instructions = `📦 PACKAGE DE RESSOURCES - Colles ${classe} Semaine ${semaine}
============================================================

Contenu du package :
${pdfs.map(f => `- ${f}`).join('\n')}

ÉTAPES D'INSTALLATION :
----------------------

1️⃣ COPIER LES PDFs
   → Placer tous les fichiers PDF dans :
   public/documents/exercices/${matiere}/Colles-${classe}-S${semaine}/

2️⃣ AJOUTER LES RESSOURCES
   → Ouvrir le fichier : src/data/resources/index.js
   → Copier le contenu de RESOURCES_TO_ADD.js
   → Coller à la fin du tableau "export const resources = [...]"
   → Attention : ajouter une virgule avant si nécessaire !

3️⃣ VÉRIFIER
   → Lancer le serveur de développement (npm run dev)
   → Aller sur la page des colles pour vérifier

4️⃣ DÉPLOYER
   → Commit : git add . && git commit -m "Add colles S${semaine}"
   → Push : git push
   → Déployer sur Hostinger

📝 NOTES :
- Les PDFs doivent être dans le dossier public/documents/exercices/
- Le code JavaScript doit être dans src/data/resources/index.js
- N'oubliez pas de build avant de déployer !

Bon courage ! 🚀
`;

    // Créer le fichier RESOURCES_TO_ADD.js
    const resourcesCode = await generateResourcesCode(outputDir, matiere, classe, parseInt(semaine));

    // Créer le ZIP
    const archive = archiver('zip', { zlib: { level: 9 } });

    res.attachment(`Colles-${classe}-S${semaine}.zip`);
    archive.pipe(res);

    // Ajouter les PDFs
    for (const pdf of pdfs) {
      const pdfPath = path.join(outputDir, pdf);
      archive.file(pdfPath, { name: `PDFs/${pdf}` });
    }

    // Ajouter les fichiers d'instructions
    archive.append(instructions, { name: 'INSTRUCTIONS.txt' });
    archive.append(resourcesCode, { name: 'RESOURCES_TO_ADD.js' });

    await archive.finalize();

    console.log(`📦 ZIP généré: Colles-${classe}-S${semaine}.zip`);
  } catch (error) {
    console.error('❌ Erreur création ZIP:', error);
    res.status(500).json({ error: 'Erreur lors de la création du ZIP', details: error.message });
  }
});

// Fonction pour générer l'index.js COMPLET
function generateFullIndexJs(allResources) {
  const resourcesCode = allResources.map((r, idx) => {
    let code = '  {\n';
    code += `    id: "${r.id}",\n`;
    code += `    subject: "${r.subject}",\n`;
    code += `    levelKey: "${r.levelKey || 'prepa1'}",\n`;
    code += `    typeKey: "${r.typeKey || 'exercise'}",\n`;
    code += `    duration: "${r.duration || '45'}",\n`;
    code += `    hasVideo: ${r.hasVideo || false},\n`;
    code += `    videoUrl: "${r.videoUrl || ''}",\n`;
    code += `    pdfStatement: "${r.pdfStatement}",\n`;
    code += `    pdfSolution: "${r.pdfSolution || ''}",\n`;
    if (r.difficulty) code += `    difficulty: "${r.difficulty}",\n`;
    code += `    tags: [${r.tags ? r.tags.map(t => `"${t}"`).join(', ') : ''}],\n`;
    code += `    createdAt: "${r.createdAt || new Date().toISOString().split('T')[0]}",\n`;
    code += `    title: "${r.title || 'Exercice'}",\n`;
    code += `    description: "${r.description || ''}",\n`;
    if (r.fullDescription) code += `    fullDescription: "${r.fullDescription}",\n`;
    if (r.notes) code += `    notes: "${r.notes}",\n`;
    if (r.isColle) code += `    isColle: true,\n`;
    if (r.showInResourcesPage === false) code += `    showInResourcesPage: false,\n`;

    if (r.colleAssignments && r.colleAssignments.length > 0) {
      code += `    colleAssignments: [\n`;
      r.colleAssignments.forEach((assignment, aIdx) => {
        code += `      {\n`;
        code += `        school: "${assignment.school || 'jean-perrin'}",\n`;
        code += `        year: "${assignment.year || '2025-2026'}",\n`;
        code += `        class: "${assignment.class || ''}",\n`;
        code += `        week: ${assignment.week || 0},\n`;
        code += `        weekDate: "${assignment.weekDate || ''}",\n`;
        code += `        planche: ${assignment.planche || 0},\n`;
        code += `        teacher: "${assignment.teacher || 'Jeremy Luccioni'}",\n`;
        code += `        timeSlot: "${assignment.timeSlot || ''}",\n`;
        code += `        trinomes: ${assignment.trinomes ? JSON.stringify(assignment.trinomes) : '[]'}\n`;
        code += `      }${aIdx < r.colleAssignments.length - 1 ? ',' : ''}\n`;
      });
      code += `    ]\n`;
    } else if (r.colleData) {
      // Backward compatibility
      code += `    colleData: ${JSON.stringify(r.colleData, null, 2).replace(/\n/g, '\n    ')}\n`;
    }

    code += `  }${idx < allResources.length - 1 ? ',' : ''}`;
    return code;
  }).join('\n\n');

  return `// src/data/resources/index.js
// Données des ressources pédagogiques enrichies avec les textes intégrés

export const resources = [
${resourcesCode}
]

// === MÉTADONNÉES DES COLLES ===
export const collesMetadata = {
  schools: [
    {
      id: "jean-perrin",
      name: "Lycée Jean Perrin",
      city: "Lyon"
    }
  ],

  academicYears: [
    {
      id: "2025-2026",
      label: "2025-2026",
      startDate: "2025-09-01",
      endDate: "2026-06-30",
      isCurrent: true
    }
  ],

  classes: [
    {
      id: "mpsi",
      name: "MPSI",
      level: "prepa1",
      subjects: ["physics", "chemistry", "maths"],
      description: "Mathématiques, Physique et Sciences de l'Ingénieur"
    },
    {
      id: "pcsi",
      name: "PCSI",
      level: "prepa1",
      subjects: ["physics", "chemistry", "maths"],
      description: "Physique, Chimie et Sciences de l'Ingénieur"
    }
  ],

  collesCalendar: {
    "2025-2026": {
      weeks: [
        { number: 1, date: "2025-09-15", label: "Semaine 1" },
        { number: 2, date: "2025-09-22", label: "Semaine 2" },
        { number: 3, date: "2025-09-29", label: "Semaine 3" },
        { number: 4, date: "2025-10-06", label: "Semaine 4" },
        { number: 5, date: "2025-10-13", label: "Semaine 5" },
        { number: 6, date: "2025-11-03", label: "Semaine 6" },
        { number: 7, date: "2025-11-10", label: "Semaine 7" },
        { number: 8, date: "2025-11-14", label: "Semaine 8" },
        { number: 9, date: "2025-11-24", label: "Semaine 9" },
        { number: 10, date: "2025-12-01", label: "Semaine 10" },
        { number: 11, date: "2025-12-08", label: "Semaine 11" },
        { number: 12, date: "2025-12-15", label: "Semaine 12" },
        { number: 13, date: "2026-01-05", label: "Semaine 13" },
        { number: 14, date: "2026-01-12", label: "Semaine 14" },
        { number: 15, date: "2026-01-19", label: "Semaine 15" },
        { number: 16, date: "2026-01-26", label: "Semaine 16" }
      ]
    }
  }
}

// === FONCTIONS UTILITAIRES ===

export const getResourcesBySubject = (subject) => {
  return resources.filter(resource => resource.subject === subject)
}

export const getResourcesByLevel = (levelKey) => {
  return resources.filter(resource => resource.levelKey === levelKey)
}

export const getResourcesByType = (typeKey) => {
  return resources.filter(resource => resource.typeKey === typeKey)
}

export const getResourcesByDifficulty = (difficulty) => {
  return resources.filter(resource => resource.difficulty === difficulty)
}

export const searchResources = (query) => {
  const searchTerm = query.toLowerCase()
  return resources.filter(resource =>
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    resource.id.toLowerCase().includes(searchTerm) ||
    resource.title.toLowerCase().includes(searchTerm) ||
    resource.description.toLowerCase().includes(searchTerm)
  )
}

export const getResourceById = (id) => {
  return resources.find(resource => resource.id === id)
}

export const getColleResources = () => {
  return resources.filter(resource => resource.isColle === true)
}

// Helper: Get all assignments for a resource (supports both colleData and colleAssignments)
const getResourceAssignments = (resource) => {
  if (resource.colleAssignments && Array.isArray(resource.colleAssignments)) {
    return resource.colleAssignments
  }
  if (resource.colleData) {
    return [resource.colleData]
  }
  return []
}

export const getCollesBySchoolAndYear = (school, year) => {
  return getColleResources().filter(resource => {
    const assignments = getResourceAssignments(resource)
    return assignments.some(assignment =>
      assignment.school === school && assignment.year === year
    )
  })
}

export const getCollesByWeek = (school, year, week) => {
  return getColleResources().flatMap(resource => {
    const assignments = getResourceAssignments(resource)
    const matchingAssignments = assignments.filter(assignment =>
      assignment.school === school &&
      assignment.year === year &&
      assignment.week === week
    )

    return matchingAssignments.map(assignment => ({
      ...resource,
      colleData: assignment
    }))
  })
}

export const getCollesByClass = (school, year, className) => {
  return getColleResources().filter(resource => {
    const assignments = getResourceAssignments(resource)
    return assignments.some(assignment =>
      assignment.school === school &&
      assignment.year === year &&
      assignment.class === className
    )
  })
}

export const getWeeksWithColles = (school, year, className = null) => {
  const colles = getColleResources()

  const allWeeks = new Set()
  colles.forEach(resource => {
    const assignments = getResourceAssignments(resource)
    assignments.forEach(assignment => {
      if (assignment.school === school && assignment.year === year) {
        if (!className || assignment.class === className) {
          allWeeks.add(assignment.week)
        }
      }
    })
  })

  const weeks = [...allWeeks].sort((a, b) => a - b)
  return weeks.map(week => {
    const weekData = collesMetadata.collesCalendar[year]?.weeks.find(w => w.number === week)
    return {
      number: week,
      date: weekData?.date,
      label: weekData?.label,
      hasColles: true
    }
  })
}

export const getResourceStats = () => {
  const colles = getColleResources()
  const regular = resources.filter(r => !r.isColle)

  return {
    total: resources.length,
    regular: regular.length,
    colles: colles.length,
    bySubject: {
      maths: getResourcesBySubject("maths").length,
      physics: getResourcesBySubject("physics").length,
      chemistry: getResourcesBySubject("chemistry").length
    },
    byDifficulty: {
      facile: getResourcesByDifficulty("facile").length,
      moyen: getResourcesByDifficulty("moyen").length,
      difficile: getResourcesByDifficulty("difficile").length
    },
    withVideo: resources.filter(r => r.hasVideo).length
  }
}
`;
}

// Fonction pour générer le code des ressources à partir de données personnalisées
function generateResourcesCodeFromData(resources) {
  // Générer le code JavaScript formaté
  let code = '// 📝 RESSOURCES À AJOUTER DANS src/data/resources/index.js\n';
  code += '// Copiez ce code et collez-le à la fin du tableau "export const resources = [...]"\n';
  code += '// N\'oubliez pas d\'ajouter une virgule avant si nécessaire !\n\n';

  resources.forEach((r, idx) => {
    code += '  {\n';
    code += `    id: "${r.id}",\n`;
    code += `    subject: "${r.subject}",\n`;
    code += `    levelKey: "${r.levelKey || 'prepa1'}",\n`;
    code += `    typeKey: "${r.typeKey || 'exercise'}",\n`;
    code += `    duration: "${r.duration || '45'}",\n`;
    code += `    hasVideo: ${r.hasVideo || false},\n`;
    code += `    videoUrl: "${r.videoUrl || ''}",\n`;
    code += `    pdfStatement: "${r.pdfStatement}",\n`;
    code += `    pdfSolution: "${r.pdfSolution || ''}",\n`;
    code += `    difficulty: "${r.difficulty || 'moyen'}",\n`;
    code += `    tags: [${r.tags ? r.tags.map(t => `"${t}"`).join(', ') : ''}],\n`;
    code += `    createdAt: "${r.createdAt || new Date().toISOString().split('T')[0]}",\n`;
    code += `    title: "${r.title || 'Exercice'}",\n`;
    code += `    description: "${r.description || ''}",\n`;
    if (r.fullDescription) code += `    fullDescription: "${r.fullDescription}",\n`;
    if (r.notes) code += `    notes: "${r.notes}",\n`;
    code += `    isColle: true,\n`;
    if (r.showInResourcesPage === false) code += `    showInResourcesPage: false,\n`;

    if (r.colleAssignments && r.colleAssignments.length > 0) {
      code += `    colleAssignments: [\n`;
      r.colleAssignments.forEach((assignment, aIdx) => {
        code += `      {\n`;
        code += `        school: "${assignment.school || 'jean-perrin'}",\n`;
        code += `        year: "${assignment.year || '2025-2026'}",\n`;
        code += `        class: "${assignment.class || ''}",\n`;
        code += `        week: ${assignment.week || 0},\n`;
        code += `        weekDate: "${assignment.weekDate || ''}",\n`;
        code += `        planche: ${assignment.planche || 0},\n`;
        code += `        teacher: "${assignment.teacher || 'Jeremy Luccioni'}",\n`;
        code += `        timeSlot: "${assignment.timeSlot || ''}",\n`;
        code += `        trinomes: ${assignment.trinomes ? JSON.stringify(assignment.trinomes) : '[]'}\n`;
        code += `      }${aIdx < r.colleAssignments.length - 1 ? ',' : ''}\n`;
      });
      code += `    ]\n`;
    }

    code += `  }${idx < resources.length - 1 ? ',' : ''}\n\n`;
  });

  return code;
}

// Fonction pour générer le code des ressources (version originale)
async function generateResourcesCode(outputDir, matiere, classe, semaine) {
  const files = await fs.readdir(outputDir);
  const pdfs = files.filter(f => f.endsWith('.pdf'));

  const resources = [];

  // Ajouter le programme
  if (pdfs.includes('Programme.pdf')) {
    resources.push({
      id: `programme-${classe.toLowerCase()}-s${semaine}`,
      subject: matiere,
      pdfStatement: `/documents/exercices/${matiere}/Colles-${classe}-S${semaine}/Programme.pdf`,
      title: `Programme de colle ${classe} Semaine ${semaine}`,
      description: `Programme de la semaine ${semaine}`,
      isColle: true,
      showInResourcesPage: false,
      planche: 0
    });
  }

  // Ajouter les exercices
  const exercicePdfs = pdfs.filter(f => f !== 'Programme.pdf');

  for (const pdf of exercicePdfs) {
    const match = pdf.match(/^P(\d+)(?:-(\d+))?\.pdf$/);
    if (match) {
      const plancheNum = parseInt(match[1]);
      const exerciceNum = match[2] ? parseInt(match[2]) : null;

      const id = exerciceNum
        ? `${matiere}-${classe.toLowerCase()}-s${semaine}-p${plancheNum}-${exerciceNum}`
        : `${matiere}-${classe.toLowerCase()}-s${semaine}-p${plancheNum}`;

      const title = exerciceNum
        ? `Exercice planche ${plancheNum} - Partie ${exerciceNum}`
        : `Exercice planche ${plancheNum}`;

      resources.push({
        id,
        subject: matiere,
        pdfStatement: `/documents/exercices/${matiere}/Colles-${classe}-S${semaine}/${pdf}`,
        title,
        description: `Exercice de ${matiere} - ${classe} Semaine ${semaine}`,
        notes: `Planche ${plancheNum} - Semaine ${semaine}`,
        isColle: true,
        planche: plancheNum
      });
    }
  }

  // Générer le code JavaScript formaté
  let code = '// 📝 RESSOURCES À AJOUTER DANS src/data/resources/index.js\n';
  code += `// Colles ${classe} - Semaine ${semaine} - ${matiere}\n`;
  code += '// Copiez ce code et collez-le à la fin du tableau "export const resources = [...]"\n';
  code += '// N\'oubliez pas d\'ajouter une virgule avant si nécessaire !\n\n';

  resources.forEach((r, idx) => {
    code += '  {\n';
    code += `    id: "${r.id}",\n`;
    code += `    subject: "${r.subject}",\n`;
    code += `    levelKey: "prepa1",\n`;
    code += `    typeKey: "${r.showInResourcesPage === false ? 'programme' : 'exercise'}",\n`;
    code += `    duration: "${r.showInResourcesPage === false ? '' : '45'}",\n`;
    code += `    hasVideo: false,\n`;
    code += `    videoUrl: "",\n`;
    code += `    pdfStatement: "${r.pdfStatement}",\n`;
    code += `    pdfSolution: "",\n`;
    code += `    difficulty: "moyen",\n`;
    code += `    tags: ["${r.subject}", "colle", "${classe.toLowerCase()}", "semaine ${semaine}"],\n`;
    code += `    createdAt: "${new Date().toISOString().split('T')[0]}",\n`;
    code += `    title: "${r.title}",\n`;
    code += `    description: "${r.description}",\n`;
    if (r.notes) code += `    notes: "${r.notes}",\n`;
    code += `    isColle: true,\n`;
    if (r.showInResourcesPage === false) code += `    showInResourcesPage: false,\n`;
    code += `    colleAssignments: [\n`;
    code += `      {\n`;
    code += `        school: "jean-perrin",\n`;
    code += `        year: "2025-2026",\n`;
    code += `        class: "${classe.toLowerCase()}",\n`;
    code += `        week: ${semaine},\n`;
    code += `        weekDate: "",\n`;
    code += `        planche: ${r.planche},\n`;
    code += `        teacher: "Jeremy Luccioni",\n`;
    code += `        timeSlot: "",\n`;
    code += `        trinomes: []\n`;
    code += `      }\n`;
    code += `    ]\n`;
    code += `  }${idx < resources.length - 1 ? ',' : ''}\n\n`;
  });

  return code;
}

// Route de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend API is running' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Backend API démarré sur le port ${PORT}`);
  console.log(`📁 Dossier uploads: ${path.join(__dirname, 'uploads')}`);
  console.log(`📁 Dossier output: ${path.join(__dirname, 'output')}`);
});
