const express  = require('express');
const router   = express.Router({ mergeParams: true });
const db       = require('../database/db');
const slugify  = require('slugify');
const cache    = require('../utils/cache');

const CATEGORY_KEYS = ['waterfall', 'canyon', 'hike', 'hot_spring', 'viewpoint', 'beach'];
const DIFFICULTY_KEYS = ['easy', 'medium', 'hard'];

function renderAdmin(res, extra = {}) {
  const { t } = res.locals;
  const places = db.all('SELECT id, name, region, category, created_at FROM places ORDER BY created_at DESC');
  const categories = Object.fromEntries(CATEGORY_KEYS.map(k => [k, t(`cat_${k}`)]));
  const difficulties = Object.fromEntries(DIFFICULTY_KEYS.map(k => [k, t(`diff_${k}`)]));
  res.render('admin', { places, categories, difficulties, error: null, ...extra });
}

router.get('/', (req, res) => {
  renderAdmin(res);
});

router.post('/add', (req, res) => {
  const { t, lang } = res.locals;
  const {
    name, description_en, description_es, description_de, description_zh,
    latitude, longitude, category, difficulty, best_season,
    photo_url, google_maps_url, region,
    parking_info, drive_time_from_reykjavik, images
  } = req.body;

  if (!name || !latitude || !longitude || !category || !difficulty) {
    return renderAdmin(res, { error: t('error_required_fields') });
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || isNaN(lon) || lat < 63 || lat > 67 || lon < -25 || lon > -13) {
    return renderAdmin(res, { error: t('error_invalid_coords') });
  }

  const imageUrls = (images || '').split('\n').map(s => s.trim()).filter(Boolean);
  const slug = slugify(name, { lower: true, strict: true });

  db.run(
    `INSERT INTO places
      (name, description_en, description_es, description_de, description_zh,
       latitude, longitude, category, difficulty, best_season,
       photo_url, google_maps_url, region, parking_info, drive_time_from_reykjavik, images, slug)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, description_en || '', description_es || '', description_de || '', description_zh || '',
     lat, lon, category, difficulty, best_season || '',
     photo_url || '', google_maps_url || '', region || '',
     parking_info || '', drive_time_from_reykjavik || '',
     imageUrls.length ? JSON.stringify(imageUrls) : null,
     slug]
  );

  // Invalidate all caches after adding new place
  cache.invalidate();

  res.redirect(`/${lang}/admin?success=1`);
});

router.post('/delete/:id', (req, res) => {
  const { lang } = res.locals;
  db.run('DELETE FROM places WHERE id = ?', [req.params.id]);

  // Invalidate all caches after deleting place
  cache.invalidate();

  res.redirect(`/${lang}/admin?success=2`);
});

module.exports = router;
