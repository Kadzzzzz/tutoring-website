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

    // Charger les vidéos pour tous les documents en une seule requête
    const docIds = documents.rows.map(d => d.id);
    const videosMap = {};
    if (docIds.length) {
      const vids = await db.query(
        `SELECT * FROM content_videos WHERE entity_type='document' AND entity_id = ANY($1) ORDER BY order_index, id`,
        [docIds]
      );
      for (const v of vids.rows) {
        if (!videosMap[v.entity_id]) videosMap[v.entity_id] = [];
        videosMap[v.entity_id].push(v);
      }
    }

    const docsWithVideos = documents.rows.map(d => ({ ...d, videos: videosMap[d.id] || [] }));
    res.json({ ...chapter.rows[0], documents: docsWithVideos });
  } catch (e) { next(e); }
});

module.exports = router;
