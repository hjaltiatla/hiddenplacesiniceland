const fs      = require('fs');
const path    = require('path');
const slugify = require('slugify');

const DB_PATH = path.join(__dirname, 'places.db');

let _db = null;

function save() {
  const data = _db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function all(sql, params = []) {
  const stmt = _db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

function get(sql, params = []) {
  return all(sql, params)[0] || null;
}

function run(sql, params = []) {
  _db.run(sql, params);
  save();
}

function exec(sql, persist = true) {
  _db.run(sql);
  if (persist) save();
}

async function init() {
  const initSqlJs = require('sql.js');
  const SQL = await initSqlJs();

  _db = fs.existsSync(DB_PATH)
    ? new SQL.Database(fs.readFileSync(DB_PATH))
    : new SQL.Database();

  _db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description_en TEXT,
      description_es TEXT,
      description_de TEXT,
      description_zh TEXT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      category TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      best_season TEXT,
      photo_url TEXT,
      google_maps_url TEXT,
      region TEXT,
      parking_info TEXT,
      drive_time_from_reykjavik TEXT,
      images TEXT,
      slug TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Run any missing column migrations so existing databases are upgraded automatically
  const cols = all('PRAGMA table_info(places)').map(c => c.name);

  const migrations = [
    { col: 'description_en',            sql: 'ALTER TABLE places ADD COLUMN description_en TEXT' },
    { col: 'description_es',            sql: 'ALTER TABLE places ADD COLUMN description_es TEXT' },
    { col: 'description_de',            sql: 'ALTER TABLE places ADD COLUMN description_de TEXT' },
    { col: 'description_zh',            sql: 'ALTER TABLE places ADD COLUMN description_zh TEXT' },
    { col: 'parking_info',              sql: 'ALTER TABLE places ADD COLUMN parking_info TEXT' },
    { col: 'drive_time_from_reykjavik', sql: 'ALTER TABLE places ADD COLUMN drive_time_from_reykjavik TEXT' },
    { col: 'images',                    sql: 'ALTER TABLE places ADD COLUMN images TEXT' },
    { col: 'slug',                      sql: 'ALTER TABLE places ADD COLUMN slug TEXT' },
  ];

  let migrated = false;
  for (const m of migrations) {
    if (!cols.includes(m.col)) {
      _db.run(m.sql);
      migrated = true;
    }
  }

  // Copy old single-language description into the English slot if needed
  if (!cols.includes('description_en') && cols.includes('description')) {
    _db.run('UPDATE places SET description_en = description WHERE description_en IS NULL');
  }

  if (migrated) save();

  // Populate slugs for any rows missing one
  const missing = all("SELECT id, name FROM places WHERE slug IS NULL OR slug = ''");
  if (missing.length > 0) {
    for (const row of missing) {
      _db.run('UPDATE places SET slug = ? WHERE id = ?',
        [slugify(row.name, { lower: true, strict: true }), row.id]);
    }
    save();
  }

  // Apply performance indices
  require('./migrations')({ run: (sql) => _db.run(sql) });
}

module.exports = { init, all, get, run, exec };
