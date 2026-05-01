require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://jeremy-luccioni.fr',
  'https://www.jeremy-luccioni.fr',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads/pdfs');
app.use('/uploads/pdfs', express.static(uploadDir));

app.use('/api/subjects',  require('./routes/subjects'));
app.use('/api/chapters',  require('./routes/chapters'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/colles',    require('./routes/colles'));
app.use('/api/concours',  require('./routes/concours'));
app.use('/api/upload',    require('./routes/upload'));
app.use('/api/admin',     require('./routes/admin'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', version: '2.0.0' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Erreur serveur' });
});

app.listen(PORT, () => console.log(`Backend v2 démarré sur le port ${PORT}`));
