# 🏗️ Architecture Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Database Schema](#database-schema)
3. [Routing System](#routing-system)
4. [Image Pipeline](#image-pipeline)
5. [Map System](#map-system)
6. [Localization](#localization)
7. [Data Flow Examples](#data-flow-examples)

---

## System Overview

### Tech Stack
```
Frontend:  Server-rendered EJS templates + TailwindCSS (CDN)
Backend:   Node.js + Express.js
Database:  sql.js (SQLite via WebAssembly, in-memory)
Maps:      Leaflet.js 1.9.4 (CDN)
Images:    Unsplash API + local storage
```

### Request Lifecycle
```
Client Request
    ↓
Express Router
    ↓
Language Detection (/:lang middleware)
    ↓
i18n Middleware
    • Sets res.locals.lang
    • Sets res.locals.t (translation function)
    • Sets res.locals.currentPath
    ↓
Route Handler
    • Query database
    • Process data
    ↓
EJS Template
    • Render view
    ↓
Layout Wrapper (automatic)
    • Nest view in layout.ejs
    • Add navigation, footer
    ↓
HTML Response (gzip compressed)
```

### Folder Structure
```
hiddenplacesiniceland/
├── server.js                    # Express app entry point
├── package.json
├── .env                         # UNSPLASH_ACCESS_KEY, DOMAIN
│
├── database/
│   ├── db.js                   # sql.js wrapper + auto-migrations
│   ├── migrations.js           # Database indices (NEW)
│   ├── seed.js                 # 5 example places
│   └── places.db               # SQLite binary (~70KB)
│
├── routes/
│   ├── lang.js                 # Router hub (merges all sub-routers)
│   ├── index.js                # Home page + filtering
│   ├── places.js               # Place detail + nearby calculation
│   ├── map.js                  # Interactive Leaflet map
│   ├── near-reykjavik.js       # Proximity filter (200km radius)
│   ├── admin.js                # CRUD operations
│   ├── sitemap.js              # XML sitemap (NEW)
│   └── robots.js               # robots.txt (NEW)
│
├── views/
│   ├── layout.ejs              # Master template (nav, footer, SEO)
│   ├── index.ejs               # Place cards grid
│   ├── place.ejs               # Detail page with gallery
│   ├── map.ejs                 # Full-screen Leaflet map
│   ├── near-reykjavik.ejs      # Distance-sorted list
│   ├── admin.ejs               # Admin panel
│   └── 404.ejs                 # Not found page
│
├── middleware/
│   ├── i18n.js                 # Language detection
│   └── compression.js          # Gzip compression (NEW)
│
├── utils/
│   ├── imageUrl.js             # Image URL resolution + fallback
│   ├── cache.js                # In-memory cache with TTL (NEW)
│   └── seo.js                  # Meta tags + structured data (NEW)
│
├── scripts/
│   ├── importPlaces.js         # Import 60+ hardcoded places
│   ├── downloadImages.js       # Unsplash API integration
│   └── optimizeImages.js       # Responsive image generation (NEW)
│
├── locales/
│   ├── en.json                 # 400+ translation keys
│   ├── es.json, de.json, zh.json
│
└── public/
    └── images/
        ├── default-place.jpg   # Fallback image (54KB)
        └── places/             # Downloaded images (slug-based)
            ├── haifoss.jpg
            ├── haifoss-thumb.jpg    (NEW)
            ├── haifoss-medium.jpg   (NEW)
            └── haifoss-large.jpg    (NEW)
```

---

## Database Schema

### Places Table
```sql
CREATE TABLE places (
  -- Identity
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT,                           -- URL-friendly name (e.g., "haifoss")

  -- Multilingual descriptions
  description_en TEXT,
  description_es TEXT,
  description_de TEXT,
  description_zh TEXT,

  -- Geolocation
  latitude REAL NOT NULL,              -- -90 to 90
  longitude REAL NOT NULL,             -- -180 to 180

  -- Classification
  category TEXT NOT NULL,              -- waterfall|canyon|hike|hot_spring|viewpoint|beach
  difficulty TEXT NOT NULL,            -- easy|medium|hard
  region TEXT,                         -- South Iceland|West Iceland|North Iceland|...

  -- Travel information
  best_season TEXT,                    -- e.g., "Summer (June–September)"
  drive_time_from_reykjavik TEXT,      -- e.g., "~2 hours"
  parking_info TEXT,                   -- Detailed parking instructions

  -- External links
  photo_url TEXT,                      -- Primary image URL (Unsplash)
  google_maps_url TEXT,                -- Direct Google Maps link

  -- Image gallery (JSON array)
  images TEXT,                         -- ["url1", "url2", "url3"]

  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indices (NEW - auto-created on startup)
CREATE INDEX idx_region ON places(region);
CREATE INDEX idx_category ON places(category);
CREATE INDEX idx_difficulty ON places(difficulty);
CREATE INDEX idx_region_category ON places(region, category);
CREATE INDEX idx_slug ON places(slug);
CREATE INDEX idx_created_at ON places(created_at DESC);
```

### Database Operations
```javascript
// Read
db.all(sql, params)        // Returns array of rows
db.get(sql, params)        // Returns single row or null

// Write (auto-saves to disk)
db.run(sql, params)        // Execute + persist
db.exec(sql, persist)      // Raw SQL + optional persist

// Initialization
db.init()                  // Load from disk, run migrations, create indices
```

### Example Queries
```javascript
// Get all places in a region
db.all('SELECT * FROM places WHERE region = ? ORDER BY created_at DESC', ['South Iceland'])

// Search by name/description
db.all(
  'SELECT * FROM places WHERE name LIKE ? OR description_en LIKE ?',
  ['%waterfall%', '%waterfall%']
)

// Get single place
db.get('SELECT * FROM places WHERE id = ?', [15])

// Insert new place
db.run(
  'INSERT INTO places (name, latitude, longitude, category, difficulty, slug) VALUES (?, ?, ?, ?, ?, ?)',
  ['Háifoss', 64.2167, -19.7167, 'waterfall', 'easy', 'haifoss']
)
```

---

## Routing System

### URL Structure
```
/                           → Redirect to /en (default language)

/:lang/                     → Home page (grid view with filters)
/:lang/places/:id           → Place detail page
/:lang/map                  → Interactive map view
/:lang/near-reykjavik       → Places within 200km of Reykjavik
/:lang/admin                → Admin panel (CRUD)

/sitemap.xml                → SEO sitemap (all languages)
/robots.txt                 → Search engine crawler instructions

Backward compatibility:
/map → /en/map
/admin → /en/admin
/places/:id → /en/places/:id
```

### Route Files
```javascript
// routes/lang.js (hub router)
const router = express.Router({ mergeParams: true });
router.use('/', require('./index'));
router.use('/places', require('./places'));
router.use('/map', require('./map'));
router.use('/near-reykjavik', require('./near-reykjavik'));
router.use('/admin', require('./admin'));
module.exports = router;

// server.js (main routing)
app.use('/:lang', i18n, require('./routes/lang'));
```

### Middleware Chain
```javascript
// 1. Compression (all responses)
app.use(compressionMiddleware);

// 2. Body parser
app.use(express.urlencoded({ extended: false }));

// 3. Static files
app.use(express.static(path.join(__dirname, 'public')));

// 4. EJS layout wrapper (automatic nesting)
app.use((req, res, next) => {
  const originalRender = res.render.bind(res);
  res.render = (view, locals, cb) => {
    originalRender(view, locals, (err, html) => {
      originalRender('layout', { body: html, title }, cb);
    });
  };
  next();
});

// 5. Language detection (/:lang routes)
app.use('/:lang', i18n, ...);

// 6. 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});
```

---

## Image Pipeline

### Workflow
```
1. Import Places
   ↓
   scripts/importPlaces.js
   • Hardcoded array of 60+ places
   • Generates slugs (slugify(name))
   • Inserts into database
   ↓
2. Download Images
   ↓
   scripts/downloadImages.js
   • For each place without image:
     - Query Unsplash API: "{name} {category} Iceland"
     - Download first result (regular resolution)
     - Save as public/images/places/{slug}.jpg
   ↓
3. Optimize Images (NEW)
   ↓
   scripts/optimizeImages.js
   • Generate responsive sizes:
     - {slug}-thumb.jpg (300px)
     - {slug}-medium.jpg (800px)
     - {slug}-large.jpg (1600px)
   • Optimize original (progressive JPEG)
   ↓
4. Serve Images
   ↓
   utils/imageUrl.js
   • Check if /public/images/places/{slug}.jpg exists
   • Return /images/places/{slug}.jpg
   • Fallback to /images/default-place.jpg
```

### Image URL Resolution
```javascript
// utils/imageUrl.js
function placeImageUrl(slug) {
  const imagePath = path.join(__dirname, '../public/images/places', `${slug}.jpg`);
  if (fs.existsSync(imagePath)) {
    return `/images/places/${slug}.jpg`;
  }
  return '/images/default-place.jpg';
}

// Attach to all places
function attachImages(places) {
  return places.map(p => ({
    ...p,
    imageUrl: placeImageUrl(p.slug)
  }));
}
```

### Responsive Images (Recommended)
```html
<img
  srcset="
    /images/places/haifoss-thumb.jpg 300w,
    /images/places/haifoss-medium.jpg 800w,
    /images/places/haifoss-large.jpg 1600w
  "
  sizes="(max-width: 640px) 100vw, 800px"
  src="/images/places/haifoss-medium.jpg"
  alt="Háifoss waterfall"
  loading="lazy"
/>
```

### Gallery Support
```javascript
// Database stores extra images as JSON array
place.images = JSON.stringify([
  'https://unsplash.com/photo1.jpg',
  'https://unsplash.com/photo2.jpg'
]);

// Template (place.ejs)
const extraImages = JSON.parse(place.images || '[]');
const allImages = [placeImageUrl(place.slug), ...extraImages];
// allImages[0] = primary, allImages[1+] = gallery
```

---

## Map System

### Leaflet Integration

**Full Map View (map.ejs):**
```javascript
// Initialize map centered on Iceland
const map = L.map('map').setView([64.9631, -19.0208], 6);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 18
}).addTo(map);

// Add markers for all places
places.forEach(place => {
  const icon = L.divIcon({
    html: `<div style="background:${categoryColor}">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });

  const marker = L.marker([place.latitude, place.longitude], { icon })
    .bindPopup(`
      <img src="${place.imageUrl}" />
      <strong>${place.name}</strong>
      <a href="/${lang}/places/${place.id}">View Details</a>
    `, { maxWidth: 230 });

  marker.addTo(map);
});
```

**Mini-Map (place.ejs):**
```javascript
// Single marker for current place
const map = L.map('mini-map').setView([place.latitude, place.longitude], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([place.latitude, place.longitude])
  .addTo(map)
  .bindPopup(`<strong>${place.name}</strong>`)
  .openPopup();
```

### Client-Side Filtering
```javascript
// Filter markers by category, difficulty, region
function applyFilters() {
  const cat = document.getElementById('filter-category').value;
  const diff = document.getElementById('filter-difficulty').value;

  allMarkers.forEach(({ marker, place }) => {
    const visible = (!cat || place.category === cat) &&
                    (!diff || place.difficulty === diff);

    if (visible) {
      if (!map.hasLayer(marker)) marker.addTo(map);
    } else {
      if (map.hasLayer(marker)) map.removeLayer(marker);
    }
  });
}

// Attach listeners
['filter-category', 'filter-difficulty'].forEach(id =>
  document.getElementById(id).addEventListener('change', applyFilters)
);
```

### Category Icons
```javascript
const CATEGORY_ICONS = {
  waterfall: '💧',
  canyon: '🪨',
  hike: '🥾',
  hot_spring: '♨️',
  viewpoint: '🔭',
  beach: '🏖️'
};

const CATEGORY_COLORS = {
  waterfall: '#3b82f6',    // blue
  canyon: '#8b5cf6',       // purple
  hike: '#22c55e',         // green
  hot_spring: '#f97316',   // orange
  viewpoint: '#84cc16',    // lime
  beach: '#06b6d4'         // cyan
};
```

### Nearby Places Calculation
```javascript
// Haversine distance formula
function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Find nearby places (cached for 10 minutes)
const nearby = cache.wrap(`nearby:${place.id}`, 10 * 60 * 1000, () =>
  attachImages(
    db.all('SELECT * FROM places WHERE id != ?', [place.id])
      .map(p => ({
        ...p,
        distance: Math.round(distanceKm(place.latitude, place.longitude, p.latitude, p.longitude))
      }))
      .filter(p => p.distance <= 50)  // Within 50km
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4)  // Top 4 closest
  )
);
```

---

## Localization

### Supported Languages
```javascript
const LANGS = ['en', 'es', 'de', 'zh'];
```

### Locale Files
```
locales/
├── en.json    # English (400+ keys)
├── es.json    # Spanish (Español)
├── de.json    # German (Deutsch)
└── zh.json    # Simplified Chinese (简体中文)
```

### Translation Keys
```json
{
  "site_title": "Hidden Places in Iceland",
  "site_tagline": "Discover hidden nature gems most tourists never find",

  "nav_home": "Home",
  "nav_map": "Map",
  "nav_admin": "Admin",

  "cat_waterfall": "Waterfall",
  "cat_canyon": "Canyon",
  "diff_easy": "Easy",
  "diff_medium": "Medium",

  "label_region": "📍 Region",
  "placeholder_search": "Search for a place...",

  // ... 380+ more keys
}
```

### i18n Middleware
```javascript
// middleware/i18n.js
const locales = {
  en: require('../locales/en.json'),
  es: require('../locales/es.json'),
  de: require('../locales/de.json'),
  zh: require('../locales/zh.json')
};

module.exports = (req, res, next) => {
  const lang = LANGS.includes(req.params.lang) ? req.params.lang : 'en';

  res.locals.lang = lang;
  res.locals.t = (key) => locales[lang][key] ?? locales.en[key] ?? key;
  res.locals.currentPath = req.originalUrl.replace(/^\/(en|es|de|zh)/, '') || '/';

  next();
};
```

### Usage in Templates
```html
<!-- EJS template -->
<h1><%= t('hero_title') %></h1>
<p><%= t('hero_subtitle') %></p>

<!-- Dynamic keys -->
<span><%= t(`cat_${place.category}`) %></span>
<span><%= t(`diff_${place.difficulty}`) %></span>

<!-- Language switcher -->
<% ['en','es','de','zh'].forEach(l => { %>
  <a href="/<%= l %><%= currentPath %>">
    <%= l.toUpperCase() %>
  </a>
<% }) %>
```

### Language Switcher Logic
```javascript
// Preserve current path when switching languages
// Example: /en/places/15 → /es/places/15

res.locals.currentPath = req.originalUrl.replace(/^\/(en|es|de|zh)/, '') || '/';

// In template:
<a href="/<%= l %><%= currentPath %>"><%= l.toUpperCase() %></a>
```

---

## Data Flow Examples

### Example 1: Home Page Request
```
GET /en/
    ↓
1. i18n middleware
   • lang = 'en'
   • t = translation function
   • currentPath = '/'
    ↓
2. routes/index.js
   • Parse query params: region, category, difficulty, search
   • Build dynamic SQL query
   • db.all('SELECT * FROM places WHERE ...')
    ↓
3. attachImages(places)
   • For each place, add imageUrl property
    ↓
4. Render index.ejs
   • Pass: places, regions, categories, difficulties, filters
    ↓
5. EJS layout wrapper
   • Render index.ejs → HTML
   • Nest in layout.ejs → Final HTML
    ↓
6. Compression middleware
   • Gzip response (60-80% smaller)
    ↓
Response to client
```

### Example 2: Place Detail Request
```
GET /en/places/15
    ↓
1. i18n middleware (same as above)
    ↓
2. routes/places.js
   • db.get('SELECT * FROM places WHERE id = 15')
   • If not found → 404
    ↓
3. Cache check: cache.get('nearby:15')
   • If cached → return cached data
   • If not cached → calculate:
    ↓
4. Calculate nearby places
   • db.all('SELECT * FROM places WHERE id != 15')
   • For each: calculate Haversine distance
   • Filter: distance <= 50km
   • Sort by distance ASC
   • Take top 4
   • cache.set('nearby:15', result, 10min TTL)
    ↓
5. Parse images
   • extraImages = JSON.parse(place.images)
   • allImages = [primary, ...extraImages]
    ↓
6. Generate SEO data
   • metaTags = generateMetaTags({ title, description, image, url })
   • structuredData = generatePlaceSchema(place, 'en', imageUrl)
    ↓
7. Render place.ejs
   • Pass: place, nearby, allImages, metaTags, structuredData
    ↓
8. Layout wrapper + compression
    ↓
Response with SEO-optimized HTML
```

### Example 3: Admin Add Place
```
POST /en/admin/add
    ↓
1. Parse form data
   • name, latitude, longitude, category, difficulty, ...
    ↓
2. Validate
   • Required fields present?
   • Coordinates within Iceland bounds? (lat: 63-67, lon: -25 to -13)
    ↓
3. Generate slug
   • slug = slugify(name, { lower: true, strict: true })
   • Example: "Háifoss" → "haifoss"
    ↓
4. Parse images
   • Split by newline
   • Trim each URL
   • JSON.stringify array
    ↓
5. Insert into database
   • db.run('INSERT INTO places (...) VALUES (...)', [...])
   • Triggers auto-save to disk
    ↓
6. Invalidate cache
   • cache.invalidate() → Clear all cached data
    ↓
7. Redirect
   • res.redirect('/en/admin?success=1')
```

---

## Performance Characteristics

### Database
- **Engine:** sql.js (SQLite in WebAssembly)
- **Storage:** In-memory (loaded from 70KB binary file)
- **Writes:** Block until disk sync complete
- **Queries:** O(log n) with indices, O(n) without
- **Scalability:** Excellent for <10,000 records

### Caching
- **Type:** In-memory Map (TTL-based)
- **Hit rate:** ~70-80% on repeat visits
- **Invalidation:** Automatic on data changes
- **Scalability:** Single-server only (use Redis for multi-server)

### Images
- **Storage:** Local filesystem (public/images/places/)
- **Naming:** Deterministic (slug-based)
- **Optimization:** Progressive JPEG, responsive sizes
- **Fallback:** default-place.jpg (54KB)

### Compression
- **Type:** Gzip (via compression middleware)
- **Threshold:** 1KB minimum
- **Level:** 6 (balance between speed and ratio)
- **Savings:** 60-80% smaller responses

---

**Version:** 1.0.0
**Last Updated:** March 7, 2026
