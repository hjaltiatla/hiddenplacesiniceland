/**
 * Compression middleware setup
 * Install: npm install compression
 */

let compression;
try {
  compression = require('compression');
} catch (e) {
  console.warn('⚠️  compression module not found. Install with: npm install compression');
  // Return no-op middleware if not installed
  module.exports = (req, res, next) => next();
  return;
}

// Configure compression
module.exports = compression({
  // Only compress responses above 1KB
  threshold: 1024,

  // Compression level (1-9, higher = more compression but slower)
  level: 6,

  // Filter function: what to compress
  filter: (req, res) => {
    // Don't compress if client doesn't support it
    if (req.headers['x-no-compression']) {
      return false;
    }

    // Use compression's default filter
    return compression.filter(req, res);
  }
});
