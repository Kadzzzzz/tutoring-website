const router = require('express').Router();
const db = require('../db');

router.get('/:id', async (req, res, next) => {
  try {
    const chapter = await db.query(`
      SELECT c.*, s.name AS subject_name, s.slug AS subject_slug, s.color AS subject_color
      FROM chapters c JOIN subjects s ON s.id = c.subject_id
      WHERE c.id = $1
    `, [req.params.id]);
    if (!chapter.rows.length) return res.status(404).json({ error: 'Chapitre introuvable' });

    const documents = await db.query(`
      SELECT * FROM documents WHERE chapter_id = $1 AND is_published = true
      ORDER BY type, title
    `, [req.params.id]);

    res.json({ ...chapter.rows[0], documents: documents.rows });
  } catch (e) { next(e); }
});

module.exports = router;
