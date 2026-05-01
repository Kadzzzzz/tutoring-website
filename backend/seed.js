require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./db');

async function seed() {
  console.log('Initialisation de la base de données...');

  await db.query(`
    INSERT INTO subjects (name, slug, color) VALUES
    ('Mathématiques', 'mathematiques', '#3b82f6'),
    ('Physique',      'physique',      '#ef4444'),
    ('Chimie',        'chimie',        '#10b981')
    ON CONFLICT (slug) DO NOTHING
  `);

  const mathsId  = (await db.query("SELECT id FROM subjects WHERE slug='mathematiques'")).rows[0].id;
  const physId   = (await db.query("SELECT id FROM subjects WHERE slug='physique'")).rows[0].id;
  const chimieId = (await db.query("SELECT id FROM subjects WHERE slug='chimie'")).rows[0].id;

  const chapters = [
    [mathsId, 'Suites et séries',               'suites-et-series',             1],
    [mathsId, 'Intégration',                     'integration',                  2],
    [mathsId, 'Équations différentielles',        'equations-differentielles',    3],
    [mathsId, 'Algèbre linéaire',                'algebre-lineaire',             4],
    [mathsId, 'Réduction des endomorphismes',    'reduction-endomorphismes',     5],
    [mathsId, 'Géométrie',                       'geometrie',                    6],
    [mathsId, 'Probabilités',                    'probabilites',                 7],
    [mathsId, 'Analyse réelle',                  'analyse-reelle',               8],
    [physId,  'Mécanique du point',              'mecanique-du-point',           1],
    [physId,  'Mécanique des fluides',           'mecanique-des-fluides',        2],
    [physId,  'Électrocinétique',                'electrocinetique',             3],
    [physId,  'Électromagnétisme',               'electromagnetisme',            4],
    [physId,  'Optique géométrique',             'optique-geometrique',          5],
    [physId,  'Optique ondulatoire',             'optique-ondulatoire',          6],
    [physId,  'Thermodynamique',                 'thermodynamique-physique',     7],
    [chimieId,'Thermochimie',                    'thermochimie',                 1],
    [chimieId,'Cinétique chimique',              'cinetique-chimique',           2],
    [chimieId,'Équilibres acido-basiques',       'equilibres-acido-basiques',    3],
    [chimieId,'Électrochimie',                   'electrochimie',                4],
    [chimieId,'Chimie organique',                'chimie-organique',             5],
  ];

  for (const [subject_id, name, slug, order_index] of chapters) {
    await db.query(
      `INSERT INTO chapters (subject_id, name, slug, order_index) VALUES ($1,$2,$3,$4)
       ON CONFLICT DO NOTHING`,
      [subject_id, name, slug, order_index]
    );
  }

  const adminCount = (await db.query('SELECT COUNT(*) FROM admin_users')).rows[0].count;
  if (parseInt(adminCount) === 0) {
    const hash = await bcrypt.hash('changeme123', 12);
    await db.query('INSERT INTO admin_users (email, password_hash) VALUES ($1,$2)', ['admin@jeremy-luccioni.fr', hash]);
    console.log('Compte admin créé : admin@jeremy-luccioni.fr / changeme123');
    console.log('⚠️  Changez ce mot de passe immédiatement après connexion !');
  }

  console.log('Base de données initialisée avec succès.');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
