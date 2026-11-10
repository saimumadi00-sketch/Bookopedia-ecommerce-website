/* Simple ordered SQL migration runner.
 *   npm run db:migrate          -> apply pending migrations
 *   node src/db/migrate.js --fresh -> drop the database and re-apply everything
 */
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const env = require('../config/env');

const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

async function migrate({ fresh = false, silent = false } = {}) {
  const log = silent ? () => {} : console.log;
  const { database, ...server } = env.db;
  const conn = await mysql.createConnection({ ...server, multipleStatements: true });
  try {
    if (fresh) {
      await conn.query(`DROP DATABASE IF EXISTS \`${database}\``);
      log(`Dropped database ${database}`);
    }
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await conn.query(`USE \`${database}\``);
    await conn.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      name VARCHAR(255) PRIMARY KEY,
      applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB`);

    const [rows] = await conn.query('SELECT name FROM schema_migrations');
    const applied = new Set(rows.map((r) => r.name));
    const files = fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith('.sql')).sort();

    for (const file of files) {
      if (applied.has(file)) continue;
      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
      await conn.query(sql);
      await conn.query('INSERT INTO schema_migrations (name) VALUES (?)', [file]);
      log(`Applied ${file}`);
    }
    log('Migrations up to date.');
  } finally {
    await conn.end();
  }
}

if (require.main === module) {
  migrate({ fresh: process.argv.includes('--fresh') }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = migrate;
