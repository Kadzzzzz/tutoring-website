const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const auth = require('../middleware/auth');

// Auth
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await db.query('SELECT * FROM admin_users WHERE email = $1', [email]);
    if (!result.rows.length) return res.status(401).json({ error: 'Identifiants incorrects' });
    const valid = await bcrypt.compare(password, result.rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'Identifiants incorrects' });
    const token = jwt.sign({ id: result.rows[0].id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (e) { next(e); }
});

router.post('/setup', async (req, res, next) => {
  try {
    const count = await db.query('SELECT COUNT(*) FROM admin_users');
    if (parseInt(count.rows[0].count) > 0) return res.status(403).json({ error: 'Admin déjà configuré' });
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    await db.query('INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)', [email, hash]);
    res.json({ message: 'Compte admin créé' });
  } catch (e) { next(e); }
});

// Stats
router.get('/stats', auth, async (req, res, next) => {
  try {
    const [docs, chapters, subjects, colles, concours] = await Promise.all([
      db.query('SELECT COUNT(*)::int AS n FROM documents'),
      db.query('SELECT COUNT(*)::int AS n FROM chapters'),
      db.query('SELECT COUNT(*)::int AS n FROM subjects'),
      db.query('SELECT COUNT(*)::int AS n FROM colles'),
      db.query('SELECT COUNT(*)::int AS n FROM concours')
    ]);
    res.json({
      documents: docs.rows[0].n,
      chapters: chapters.rows[0].n,
      subjects: subjects.rows[0].n,
      colles: colles.rows[0].n,
      concours: concours.rows[0].n
    });
  } catch (e) { next(e); }
});

// Subjects CRUD
router.get('/subjects', auth, async (req, res, next) => {
  try {
    const r = await db.query('SELECT * FROM subjects ORDER BY name');
    res.json(r.rows);
  } catch (e) { next(e); }
});

router.post('/subjects', auth, async (req, res, next) => {
  try {
    const { name, slug, color } = req.body;
    const r = await db.query('INSERT INTO subjects (name, slug, color) VALUES ($1,$2,$3) RETURNING *', [name, slug, color]);
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.put('/subjects/:id', auth, async (req, res, next) => {
  try {
    const { name, slug, color } = req.body;
    const r = await db.query('UPDATE subjects SET name=$1,slug=$2,color=$3 WHERE id=$4 RETURNING *', [name, slug, color, req.params.id]);
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.delete('/subjects/:id', auth, async (req, res, next) => {
  try {
    await db.query('DELETE FROM subjects WHERE id=$1', [req.params.id]);
    res.json({ message: 'Supprimé' });
  } catch (e) { next(e); }
});

// Chapters CRUD
router.get('/chapters', auth, async (req, res, next) => {
  try {
    const r = await db.query(`
      SELECT c.*, s.name AS subject_name FROM chapters c
      JOIN subjects s ON s.id = c.subject_id ORDER BY s.name, c.order_index
    `);
    res.json(r.rows);
  } catch (e) { next(e); }
});

router.post('/chapters', auth, async (req, res, next) => {
  try {
    const { subject_id, name, slug, order_index } = req.body;
    const r = await db.query(
      'INSERT INTO chapters (subject_id,name,slug,order_index) VALUES ($1,$2,$3,$4) RETURNING *',
      [subject_id, name, slug, order_index || 0]
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.put('/chapters/:id', auth, async (req, res, next) => {
  try {
    const { subject_id, name, slug, order_index } = req.body;
    const r = await db.query(
      'UPDATE chapters SET subject_id=$1,name=$2,slug=$3,order_index=$4 WHERE id=$5 RETURNING *',
      [subject_id, name, slug, order_index, req.params.id]
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.delete('/chapters/:id', auth, async (req, res, next) => {
  try {
    await db.query('DELETE FROM chapters WHERE id=$1', [req.params.id]);
    res.json({ message: 'Supprimé' });
  } catch (e) { next(e); }
});

// Documents CRUD
router.get('/documents', auth, async (req, res, next) => {
  try {
    const r = await db.query(`
      SELECT d.*, c.name AS chapter_name, s.name AS subject_name
      FROM documents d
      LEFT JOIN chapters c ON c.id = d.chapter_id
      LEFT JOIN subjects s ON s.id = c.subject_id
      ORDER BY d.created_at DESC
    `);
    res.json(r.rows);
  } catch (e) { next(e); }
});

router.post('/documents', auth, async (req, res, next) => {
  try {
    const { chapter_id, title, description, type, level, difficulty, pdf_statement_url, pdf_solution_url, has_video, video_url, is_published, concours_name, concours_year } = req.body;
    const r = await db.query(
      `INSERT INTO documents (chapter_id,title,description,type,level,difficulty,pdf_statement_url,pdf_solution_url,has_video,video_url,is_published,concours_name,concours_year)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [chapter_id, title, description, type, level, difficulty, pdf_statement_url, pdf_solution_url, has_video || false, video_url || null, is_published ?? true, concours_name || null, concours_year || null]
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.put('/documents/:id', auth, async (req, res, next) => {
  try {
    const { chapter_id, title, description, type, level, difficulty, pdf_statement_url, pdf_solution_url, has_video, video_url, is_published, concours_name, concours_year } = req.body;
    const r = await db.query(
      `UPDATE documents SET chapter_id=$1,title=$2,description=$3,type=$4,level=$5,difficulty=$6,
       pdf_statement_url=$7,pdf_solution_url=$8,has_video=$9,video_url=$10,is_published=$11,concours_name=$12,concours_year=$13 WHERE id=$14 RETURNING *`,
      [chapter_id, title, description, type, level, difficulty, pdf_statement_url, pdf_solution_url, has_video, video_url, is_published, concours_name || null, concours_year || null, req.params.id]
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.delete('/documents/:id', auth, async (req, res, next) => {
  try {
    await db.query('DELETE FROM documents WHERE id=$1', [req.params.id]);
    res.json({ message: 'Supprimé' });
  } catch (e) { next(e); }
});

// Colles CRUD
router.post('/colles', auth, async (req, res, next) => {
  try {
    const { subject_id, class_name, week_number, week_date, school, academic_year, programme_pdf_url } = req.body;
    const r = await db.query(
      `INSERT INTO colles (subject_id,class_name,week_number,week_date,school,academic_year,programme_pdf_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [subject_id, class_name, week_number, week_date || null, school, academic_year, programme_pdf_url || null]
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.put('/colles/:id', auth, async (req, res, next) => {
  try {
    const { subject_id, class_name, week_number, week_date, school, academic_year, programme_pdf_url } = req.body;
    const r = await db.query(
      `UPDATE colles SET subject_id=$1,class_name=$2,week_number=$3,week_date=$4,school=$5,academic_year=$6,programme_pdf_url=$7
       WHERE id=$8 RETURNING *`,
      [subject_id, class_name, week_number, week_date || null, school, academic_year, programme_pdf_url || null, req.params.id]
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.delete('/colles/:id', auth, async (req, res, next) => {
  try {
    await db.query('DELETE FROM colles WHERE id=$1', [req.params.id]);
    res.json({ message: 'Supprimé' });
  } catch (e) { next(e); }
});

router.post('/colles/:id/planches', auth, async (req, res, next) => {
  try {
    const { planche_number, title, pdf_statement_url, pdf_solution_url } = req.body;
    const r = await db.query(
      `INSERT INTO colle_planches (colle_id,planche_number,title,pdf_statement_url,pdf_solution_url)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [req.params.id, planche_number, title, pdf_statement_url || null, pdf_solution_url || null]
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.put('/planches/:id', auth, async (req, res, next) => {
  try {
    const { planche_number, title, pdf_statement_url, pdf_solution_url } = req.body;
    const r = await db.query(
      `UPDATE colle_planches SET planche_number=$1,title=$2,pdf_statement_url=$3,pdf_solution_url=$4 WHERE id=$5 RETURNING *`,
      [planche_number, title || null, pdf_statement_url || null, pdf_solution_url || null, req.params.id]
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.delete('/planches/:id', auth, async (req, res, next) => {
  try {
    await db.query('DELETE FROM colle_planches WHERE id=$1', [req.params.id]);
    res.json({ message: 'Supprimé' });
  } catch (e) { next(e); }
});

// Vidéos de planches
router.get('/planches/:id/videos', auth, async (req, res, next) => {
  try {
    const r = await db.query(
      'SELECT * FROM colle_planche_videos WHERE planche_id=$1 ORDER BY order_index, id',
      [req.params.id]
    );
    res.json(r.rows);
  } catch (e) { next(e); }
});

router.post('/planches/:id/videos', auth, async (req, res, next) => {
  try {
    const { title, url, order_index } = req.body;
    const r = await db.query(
      'INSERT INTO colle_planche_videos (planche_id,title,url,order_index) VALUES ($1,$2,$3,$4) RETURNING *',
      [req.params.id, title || null, url, order_index || 0]
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.delete('/videos/:id', auth, async (req, res, next) => {
  try {
    await db.query('DELETE FROM colle_planche_videos WHERE id=$1', [req.params.id]);
    res.json({ message: 'Supprimé' });
  } catch (e) { next(e); }
});

// Vidéos génériques (concours, documents, etc.)
router.get('/content-videos', auth, async (req, res, next) => {
  try {
    const { entity_type, entity_id } = req.query;
    const r = await db.query(
      'SELECT * FROM content_videos WHERE entity_type=$1 AND entity_id=$2 ORDER BY order_index, id',
      [entity_type, entity_id]
    );
    res.json(r.rows);
  } catch (e) { next(e); }
});

router.post('/content-videos', auth, async (req, res, next) => {
  try {
    const { entity_type, entity_id, title, url, order_index } = req.body;
    const r = await db.query(
      'INSERT INTO content_videos (entity_type,entity_id,title,url,order_index) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [entity_type, entity_id, title || null, url, order_index || 0]
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.delete('/content-videos/:id', auth, async (req, res, next) => {
  try {
    await db.query('DELETE FROM content_videos WHERE id=$1', [req.params.id]);
    res.json({ message: 'Supprimé' });
  } catch (e) { next(e); }
});

// Saisie rapide : crée ou retrouve une colle et y ajoute les planches d'un coup
router.post('/colles/quick', auth, async (req, res, next) => {
  try {
    const { class_name, week_number, academic_year, planches } = req.body;
    let existing = await db.query(
      'SELECT id FROM colles WHERE class_name=$1 AND week_number=$2',
      [class_name, week_number]
    );
    let colleId;
    if (existing.rows.length) {
      colleId = existing.rows[0].id;
    } else {
      const created = await db.query(
        'INSERT INTO colles (class_name, week_number, academic_year) VALUES ($1,$2,$3) RETURNING id',
        [class_name, week_number, academic_year || null]
      );
      colleId = created.rows[0].id;
    }
    const added = [];
    for (const p of (planches || [])) {
      const r = await db.query(
        `INSERT INTO colle_planches (colle_id,planche_number,title,pdf_statement_url,pdf_solution_url)
         VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [colleId, p.planche_number, p.title || null, p.pdf_statement_url || null, p.pdf_solution_url || null]
      );
      added.push(r.rows[0]);
    }
    res.json({ colle_id: colleId, planches: added });
  } catch (e) { next(e); }
});

// Concours CRUD
router.get('/concours', auth, async (req, res, next) => {
  try {
    const r = await db.query(`
      SELECT co.*, s.name AS subject_name FROM concours co
      LEFT JOIN subjects s ON s.id = co.subject_id ORDER BY co.year DESC, co.name
    `);
    res.json(r.rows);
  } catch (e) { next(e); }
});

router.post('/concours', auth, async (req, res, next) => {
  try {
    const { name, year, type, subject_id, class_target, pdf_url, pdf_solution_url, is_published } = req.body;
    const r = await db.query(
      `INSERT INTO concours (name,year,type,subject_id,class_target,pdf_url,pdf_solution_url,is_published)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [name, year, type, subject_id || null, class_target, pdf_url || null, pdf_solution_url || null, is_published ?? true]
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.put('/concours/:id', auth, async (req, res, next) => {
  try {
    const { name, year, type, subject_id, class_target, pdf_url, pdf_solution_url, is_published } = req.body;
    const r = await db.query(
      `UPDATE concours SET name=$1,year=$2,type=$3,subject_id=$4,class_target=$5,pdf_url=$6,pdf_solution_url=$7,is_published=$8
       WHERE id=$9 RETURNING *`,
      [name, year, type, subject_id || null, class_target, pdf_url || null, pdf_solution_url || null, is_published, req.params.id]
    );
    res.json(r.rows[0]);
  } catch (e) { next(e); }
});

router.delete('/concours/:id', auth, async (req, res, next) => {
  try {
    await db.query('DELETE FROM concours WHERE id=$1', [req.params.id]);
    res.json({ message: 'Supprimé' });
  } catch (e) { next(e); }
});

module.exports = router;
