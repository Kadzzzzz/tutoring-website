const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const { type, subject_id, year } = req.query;
    const where = ['co.is_published = true'];
    const params = [];

    if (type)       { params.push(type);       where.push(`co.type = $${params.length}`); }
    if (subject_id) { params.push(subject_id); where.push(`co.subject_id = $${params.length}`); }
    if (year)       { params.push(year);       where.push(`co.year = $${params.length}`); }

    const result = await db.query(`
      SELECT co.*, s.name AS subject_name, s.color AS subject_color
      FROM concours co LEFT JOIN subjects s ON s.id = co.subject_id
      WHERE ${where.join(' AND ')}
      ORDER BY co.year DESC, co.name
    `, params);

    // Charger les vidéos en une seule requête
    const ids = result.rows.map(c => c.id);
    const videosMap = {};
    if (ids.length) {
      const vids = await db.query(
        `SELECT * FROM content_videos WHERE entity_type='concours' AND entity_id = ANY($1) ORDER BY order_index, id`,
        [ids]
      );
      for (const v of vids.rows) {
        if (!videosMap[v.entity_id]) videosMap[v.entity_id] = [];
        videosMap[v.entity_id].push(v);
      }
    }

    res.json(result.rows.map(c => ({ ...c, videos: videosMap[c.id] || [] })));
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT co.*, s.name AS subject_name
      FROM concours co LEFT JOIN subjects s ON s.id = co.subject_id
      WHERE co.id = $1
    `, [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Concours introuvable' });
    const vids = await db.query(
      `SELECT * FROM content_videos WHERE entity_type='concours' AND entity_id=$1 ORDER BY order_index, id`,
      [req.params.id]
    );
    res.json({ ...result.rows[0], videos: vids.rows });
  } catch (e) { next(e); }
});

module.exports = router;
