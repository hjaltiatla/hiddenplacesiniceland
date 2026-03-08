const express  = require('express');
const router   = express.Router({ mergeParams: true });
const db       = require('../database/db');
const { attachImages } = require('../utils/imageUrl');

const CATEGORY_KEYS = ['waterfall', 'canyon', 'hike', 'hot_spring', 'viewpoint', 'beach'];
const DIFFICULTY_KEYS = ['easy', 'medium', 'hard'];

router.get('/', (req, res) => {
  const { t } = res.locals;
  const places = attachImages(db.all('SELECT id, name, latitude, longitude, category, region, difficulty, photo_url, slug FROM places'));
  const regions = [...new Set(places.map(p => p.region).filter(Boolean))].sort();
  const categories = Object.fromEntries(CATEGORY_KEYS.map(k => [k, t(`cat_${k}`)]));
  const difficulties = Object.fromEntries(DIFFICULTY_KEYS.map(k => [k, t(`diff_${k}`)]));
  res.render('map', { title: t('map_title'), places, regions, categories, difficulties });
});

module.exports = router;
