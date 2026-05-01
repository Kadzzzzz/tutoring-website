require('dotenv').config();
const db = require('./db');
const bcrypt = require('bcryptjs');

// Modifie ces deux valeurs avant de lancer le script
const NEW_EMAIL    = 'luccionijeremy@gmail.com';
const NEW_PASSWORD = 'CHANGE_ME_NOW';

async function run() {
  if (NEW_PASSWORD === 'CHANGE_ME_NOW') {
    console.error('❌ Modifie NEW_PASSWORD dans le script avant de le lancer !');
    process.exit(1);
  }
  const hash = await bcrypt.hash(NEW_PASSWORD, 10);
  await db.query('DELETE FROM admin_users');
  await db.query(
    'INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)',
    [NEW_EMAIL, hash]
  );
  console.log(`✅ Admin réinitialisé : ${NEW_EMAIL}`);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
