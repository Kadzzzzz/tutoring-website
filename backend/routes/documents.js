const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const { chapter_id, type, level, difficulty } = req.query;
    const where = ['d.is_published = true'];
    const params = [];

    if (chapter_id) { params.push(chapter_id); where.push(`d.chapter_id = $${params.length}`); }
    if (type) {
      const types = type.split(',').map(t => t.trim());
      params.push(types);
      where.push(`d.type = ANY($${params.length})`);
    }
    if (level)      { params.push(`%${level}%`); where.push(`d.level LIKE $${params.length}`); }
    if (difficulty) { params.push(difficulty);    where.push(`d.difficulty = $${params.length}`); }

    const result = await db.query(
      `SELECT d.*, c.name AS chapter_name, s.name AS subject_name, s.color AS subject_color, s.id AS subject_id
       FROM documents d
       LEFT JOIN chapters c ON c.id = d.chapter_id
       LEFT JOIN subjects s ON s.id = c.subject_id
       WHERE ${where.join(' AND ')} ORDER BY d.created_at DESC`,
      params
    );

    const ids = result.rows.map(d => d.id);
    const videosMap = {};
    if (ids.length) {
      const vids = await db.query(
        `SELECT * FROM content_videos WHERE entity_type='document' AND entity_id = ANY($1) ORDER BY order_index, id`,
        [ids]
      );
      for (const v of vids.rows) {
        if (!videosMap[v.entity_id]) videosMap[v.entity_id] = [];
        videosMap[v.entity_id].push(v);
      }
    }

    res.json(result.rows.map(d => ({ ...d, videos: videosMap[d.id] || [] })));
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT d.*, c.name AS chapter_name, s.name AS subject_name, s.color AS subject_color
       FROM documents d
       LEFT JOIN chapters c ON c.id = d.chapter_id
       LEFT JOIN subjects s ON s.id = c.subject_id
       WHERE d.id = $1`,
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Document introuvable' });
    const vids = await db.query(
      `SELECT * FROM content_videos WHERE entity_type='document' AND entity_id=$1 ORDER BY order_index, id`,
      [req.params.id]
    );
    res.json({ ...result.rows[0], videos: vids.rows });
  } catch (e) { next(e); }
});

module.exports = router;
