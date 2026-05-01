const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT s.*, COUNT(c.id)::int AS chapter_count
      FROM subjects s
      LEFT JOIN chapters c ON c.subject_id = s.id
      GROUP BY s.id ORDER BY s.name
    `);
    res.json(result.rows);
  } catch (e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const subject = await db.query('SELECT * FROM subjects WHERE slug = $1', [req.params.slug]);
    if (!subject.rows.length) return res.status(404).json({ error: 'Matière introuvable' });

    const chapters = await db.query(`
      SELECT c.*, COUNT(d.id)::int AS document_count
      FROM chapters c
      LEFT JOIN documents d ON d.chapter_id = c.id AND d.is_published = true
      WHERE c.subject_id = $1
      GROUP BY c.id ORDER BY c.order_index, c.name
    `, [subject.rows[0].id]);

    res.json({ ...subject.rows[0], chapters: chapters.rows });
  } catch (e) { next(e); }
});

module.exports = router;
