const express = require('express');
const path = require('path');
const db = require('./database/db');
const i18n = require('./middleware/i18n');
const compressionMiddleware = require('./middleware/compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression for all responses
app.use(compressionMiddleware);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// EJS layout wrapper
app.use((req, res, next) => {
  const originalRender = res.render.bind(res);
  res.render = (view, locals, cb) => {
    originalRender(view, locals, (err, html) => {
      if (err) return next(err);
      const title = (locals && locals.title) || (view.charAt(0).toUpperCase() + view.slice(1));
      originalRender('layout', { body: html, title }, cb || ((err2, html2) => {
        if (err2) return next(err2);
        res.send(html2);
      }));
    });
  };
  next();
});

// Root redirect → default language
app.get('/', (req, res) => res.redirect('/en'));

// Backward-compat redirects for old URLs
app.get('/map', (req, res) => res.redirect('/en/map'));
app.get('/places/:id', (req, res) => res.redirect(`/en/places/${req.params.id}`));

// SEO routes (no language prefix)
app.use(require('./routes/sitemap'));
app.use(require('./routes/robots'));

// Language-prefixed routes
app.use('/:lang', i18n, require('./routes/lang'));

// 404
app.use((req, res) => {
  // Provide minimal t() for 404 pages outside a language prefix
  if (!res.locals.t) {
    const en = require('./locales/en.json');
    res.locals.t = (key) => en[key] ?? key;
    res.locals.lang = 'en';
    res.locals.currentPath = '/';
  }
  res.status(404).render('404', { title: res.locals.t('not_found_title') });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('<h1>Error</h1><p>' + err.message + '</p>');
});

// Boot
async function start() {
  await db.init();
  require('./database/seed');
  app.listen(PORT, () => {
    console.log(`\n🏔️  Hidden Places in Iceland → http://localhost:${PORT}\n`);
  });
}

start().catch(err => {
  console.error('Startup error:', err);
  process.exit(1);
});
