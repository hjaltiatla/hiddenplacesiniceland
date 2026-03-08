# Falnir Staðir á Íslandi

Hidden Places in Iceland – a multilingual, SEO-optimised full-stack web app to discover lesser-known Icelandic nature spots.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Server | Node.js + Express |
| Database | sql.js (pure-JS SQLite / WebAssembly) |
| Templates | EJS (server-rendered) |
| Styling | TailwindCSS (compiled via CLI, custom Iceland theme) |
| Maps | Leaflet.js (CDN) |
| Images | Unsplash API + Sharp (local optimisation) |
| i18n | Custom middleware – English, Spanish, German, Mandarin |
| SEO | Open Graph, Twitter Cards, Schema.org, XML sitemap |

## Setup & Run

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
PORT=3000
```

### 3. Build CSS

```bash
npm run build:css
```

### 4. Start the server

```bash
npm start
```

The database is created and seeded automatically on first run.

### Development mode (auto-restart + CSS watch)

Run these in two terminals:

```bash
npm run dev        # auto-restart server on file changes (Node 18+)
npm run watch:css  # rebuild Tailwind CSS on change
```

### 5. Open in browser

```
http://localhost:3000
```

## Pages & Routes

Routes are available both with and without a language prefix (`/:lang/...`). Supported language codes: `en`, `es`, `de`, `zh`.

| URL | Description |
|-----|-------------|
| `/` | Homepage – place cards with region, category, difficulty, and search filters |
| `/places/:slug` | Individual place page – description, gallery, Leaflet mini-map, nearby places, Google Maps link |
| `/map` | Full interactive Leaflet map with all place markers |
| `/near-reykjavik` | Curated "places near Reykjavik" showcase page |
| `/sitemap.xml` | XML sitemap for search engines |
| `/robots.txt` | Crawler directives |

## Project Structure

```
/
├── server.js                  # Express app – boot, DB init, route registration
├── package.json
├── tailwind.config.js         # Custom Iceland color theme
├── .env                       # Environment variables (not committed)
│
├── database/
│   ├── db.js                  # sql.js wrapper (all/get/run/exec + file persist)
│   ├── seed.js                # Initial seed data (~10 places with multilingual descriptions)
│   ├── migrations.js          # Automatic schema migrations
│   └── places.db              # SQLite database (auto-created on first run)
│
├── routes/
│   ├── index.js               # Homepage + filtering
│   ├── places.js              # Place detail pages + nearby places (Haversine)
│   ├── map.js                 # Full map view
│   ├── near-reykjavik.js      # Near Reykjavik showcase (multilingual)
│   ├── lang.js                # Language prefix routing middleware
│   ├── sitemap.js             # XML sitemap
│   └── robots.js              # Robots.txt
│
├── views/
│   ├── layout.ejs             # Master layout – HTML head, nav, footer
│   ├── index.ejs              # Homepage with place cards and filters
│   ├── place.ejs              # Place detail – gallery, map, nearby places
│   ├── map.ejs                # Full Leaflet map
│   ├── near-reykjavik.ejs     # Near Reykjavik page
│   └── 404.ejs                # Not found
│
├── middleware/
│   ├── i18n.js                # i18n – loads locale, exposes t() helper
│   └── compression.js         # Gzip compression (threshold: 1 KB)
│
├── locales/
│   ├── en.json                # English translations
│   ├── es.json                # Spanish translations
│   ├── de.json                # German translations
│   └── zh.json                # Mandarin Chinese translations
│
├── utils/
│   ├── cache.js               # In-memory cache (Haversine results etc.)
│   ├── imageUrl.js            # Image URL resolution (local → Unsplash → fallback)
│   └── seo.js                 # Open Graph / Twitter Card / Schema.org helpers
│
├── scripts/
│   ├── importPlaces.js        # Bulk-import places into the database
│   ├── downloadImages.js      # Fetch place images from Unsplash
│   ├── optimizeImages.js      # Resize and compress images with Sharp
│   └── add-translations.js   # Translation management utility
│
└── public/
    ├── css/
    │   ├── input.css          # Tailwind source
    │   └── tailwind.css       # Compiled output
    └── images/
        └── places/            # Locally stored place images (~63 files)
```

## Database Schema

```sql
CREATE TABLE places (
  id                       INTEGER PRIMARY KEY AUTOINCREMENT,
  name                     TEXT NOT NULL,
  slug                     TEXT,
  description_en           TEXT,
  description_es           TEXT,
  description_de           TEXT,
  description_zh           TEXT,
  latitude                 REAL NOT NULL,
  longitude                REAL NOT NULL,
  category                 TEXT,   -- waterfall | canyon | hike | hot_spring | viewpoint | beach
  difficulty               TEXT,   -- easy | medium | hard
  best_season              TEXT,
  photo_url                TEXT,
  google_maps_url          TEXT,   -- auto-backfilled from coordinates on startup
  region                   TEXT,
  parking_info             TEXT,
  drive_time_from_reykjavik TEXT,
  images                   TEXT,   -- JSON array of image paths
  created_at               DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## npm Scripts

| Script | Purpose |
|--------|---------|
| `npm start` | Start production server |
| `npm run dev` | Development server with auto-restart |
| `npm run build:css` | Compile and minify Tailwind CSS |
| `npm run watch:css` | Watch and rebuild CSS on change |
| `npm run seed` | Seed the database with initial places |
| `npm run import` | Bulk-import places from `scripts/importPlaces.js` |
| `npm run download-images` | Download place images from Unsplash |
| `npm run optimize-images` | Optimise images with Sharp |

## Internationalisation

The app supports four languages with URL-based locale selection:

| Code | Language |
|------|----------|
| `en` | English (default) |
| `es` | Spanish |
| `de` | German |
| `zh` | Mandarin Chinese |

All UI strings live in `/locales/*.json`. Place descriptions are stored per-language in the database (`description_en`, `description_es`, `description_de`, `description_zh`).
