const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const { spawn } = require('child_process');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration CORS - Autoriser votre site
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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
      exercices.forEach((exercice, idx) => {
        const exerciceId = exercices.length === 1
          ? `${matiere}-${classe.toLowerCase()}-s${semaine}-p${plancheNum}`
          : `${matiere}-${classe.toLowerCase()}-s${semaine}-p${plancheNum}-${exercice.exercice}`;

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
          title: exercices.length === 1
            ? `Exercice planche ${plancheNum}`
            : `Exercice planche ${plancheNum} - Partie ${exercice.exercice}`,
          description: `Exercice de ${matiere} - ${classe} Semaine ${semaine}`,
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
      });
    }

    // Nettoyer le fichier uploadé
    await fs.unlink(req.file.path);

    // Retourner le résultat
    res.json({
      success: true,
      message: `${outputFiles.planches.length + 1} fichiers générés`,
      data: {
        outputDir: path.join('output', matiere, `Colles-${classe}-S${semaine}`),
        programme: outputFiles.programme,
        planches: outputFiles.planches,
        resources: resources
      }
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
