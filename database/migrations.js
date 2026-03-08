/**
 * Database migrations for performance optimization
 * Run once to add indices for scalability
 */

module.exports = function applyIndices(db) {
  console.log('📊 Creating database indices...');

  // Index for region filtering (WHERE region = ?)
  db.run('CREATE INDEX IF NOT EXISTS idx_region ON places(region)');

  // Index for category filtering (WHERE category = ?)
  db.run('CREATE INDEX IF NOT EXISTS idx_category ON places(category)');

  // Index for difficulty filtering (WHERE difficulty = ?)
  db.run('CREATE INDEX IF NOT EXISTS idx_difficulty ON places(difficulty)');

  // Composite index for common filter combinations
  db.run('CREATE INDEX IF NOT EXISTS idx_region_category ON places(region, category)');

  // Index for slug lookups (WHERE slug = ?)
  db.run('CREATE INDEX IF NOT EXISTS idx_slug ON places(slug)');

  // Index for created_at sorting (ORDER BY created_at DESC)
  db.run('CREATE INDEX IF NOT EXISTS idx_created_at ON places(created_at DESC)');

  console.log('✅ Indices created successfully');
};
