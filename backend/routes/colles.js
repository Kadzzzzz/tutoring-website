const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const { class_name, academic_year, subject_id } = req.query;
    const where = [];
    const params = [];

    if (class_name)    { params.push(class_name);    where.push(`c.class_name = $${params.length}`); }
    if (academic_year) { params.push(academic_year); where.push(`c.academic_year = $${params.length}`); }
    if (subject_id)    { params.push(subject_id);    where.push(`c.subject_id = $${params.length}`); }

    const whereStr = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const result = await db.query(`
      SELECT c.*, s.name AS subject_name, s.color AS subject_color,
        (SELECT COUNT(*)::int FROM colle_planches WHERE colle_id = c.id) AS planche_count,
        COALESCE((
          SELECT json_agg(
            json_build_object(
              'id', p.id,
              'planche_number', p.planche_number,
              'title', p.title,
              'pdf_statement_url', p.pdf_statement_url,
              'pdf_solution_url', p.pdf_solution_url,
              'videos', COALESCE((
                SELECT json_agg(
                  json_build_object('id', v.id, 'title', v.title, 'url', v.url)
                  ORDER BY v.order_index, v.id
                ) FROM colle_planche_videos v WHERE v.planche_id = p.id
              ), '[]'::json)
            ) ORDER BY p.planche_number
          ) FROM colle_planches p WHERE p.colle_id = c.id
        ), '[]'::json) AS planches
      FROM colles c
      LEFT JOIN subjects s ON s.id = c.subject_id
      ${whereStr}
      ORDER BY c.week_number
    `, params);
    res.json(result.rows);
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const colle = await db.query(`
      SELECT c.*, s.name AS subject_name, s.color AS subject_color
      FROM colles c LEFT JOIN subjects s ON s.id = c.subject_id
      WHERE c.id = $1
    `, [req.params.id]);
    if (!colle.rows.length) return res.status(404).json({ error: 'Colle introuvable' });

    const planches = await db.query(
      'SELECT * FROM colle_planches WHERE colle_id = $1 ORDER BY planche_number',
      [req.params.id]
    );

    const planchesWithVideos = await Promise.all(planches.rows.map(async p => {
      const videos = await db.query(
        'SELECT * FROM colle_planche_videos WHERE planche_id = $1 ORDER BY order_index, id',
        [p.id]
      );
      return { ...p, videos: videos.rows };
    }));

    res.json({ ...colle.rows[0], planches: planchesWithVideos });
  } catch (e) { next(e); }
});

module.exports = router;
