const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const { chapter_id, type, level, difficulty } = req.query;
    const where = ['is_published = true'];
    const params = [];

    if (chapter_id) { params.push(chapter_id); where.push(`chapter_id = $${params.length}`); }
    if (type)       { params.push(type);       where.push(`type = $${params.length}`); }
    if (level)      { params.push(level);      where.push(`level = $${params.length}`); }
    if (difficulty) { params.push(difficulty); where.push(`difficulty = $${params.length}`); }

    const result = await db.query(
      `SELECT * FROM documents WHERE ${where.join(' AND ')} ORDER BY created_at DESC`,
      params
    );
    res.json(result.rows);
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM documents WHERE id = $1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Document introuvable' });
    res.json(result.rows[0]);
  } catch (e) { next(e); }
});

module.exports = router;
