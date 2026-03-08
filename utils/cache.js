/**
 * Simple in-memory cache for expensive queries
 * Invalidates on data changes (admin operations)
 */

const cache = new Map();

function get(key) {
  const entry = cache.get(key);
  if (!entry) return null;

  // Check TTL (15 minutes default)
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }

  return entry.value;
}

function set(key, value, ttlMs = 15 * 60 * 1000) {
  cache.set(key, {
    value,
    expiry: Date.now() + ttlMs
  });
}

function invalidate(pattern) {
  if (!pattern) {
    // Clear all cache
    cache.clear();
    return;
  }

  // Clear matching keys (e.g., 'places:*')
  for (const key of cache.keys()) {
    if (key.startsWith(pattern)) {
      cache.delete(key);
    }
  }
}

function wrap(key, ttlMs, fn) {
  const cached = get(key);
  if (cached !== null) return cached;

  const result = fn();
  set(key, result, ttlMs);
  return result;
}

module.exports = { get, set, invalidate, wrap };
