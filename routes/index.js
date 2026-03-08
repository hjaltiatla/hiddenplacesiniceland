const express = require('express');
const router  = express.Router({ mergeParams: true });
const db      = require('../database/db');
const { attachImages } = require('../utils/imageUrl');

const CATEGORY_KEYS = ['waterfall', 'canyon', 'hike', 'hot_spring', 'viewpoint', 'beach'];
const DIFFICULTY_KEYS = ['easy', 'medium', 'hard'];

router.get('/', (req, res) => {
  const { region, category, difficulty, search } = req.query;
  const { t, lang } = res.locals;

  let query = 'SELECT * FROM places WHERE 1=1';
  const params = [];

  if (region)     { query += ' AND region = ?';                           params.push(region); }
  if (category)   { query += ' AND category = ?';                         params.push(category); }
  if (difficulty) { query += ' AND difficulty = ?';                       params.push(difficulty); }
  if (search) {
    query += ' AND (name LIKE ? OR description_en LIKE ? OR region LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  query += ' ORDER BY created_at DESC';

  const places = attachImages(db.all(query, params));
  const regions = db.all('SELECT DISTINCT region FROM places ORDER BY region').map(r => r.region);

  // Build translated label maps for the template
  const categories = Object.fromEntries(CATEGORY_KEYS.map(k => [k, t(`cat_${k}`)]));
  const difficulties = Object.fromEntries(DIFFICULTY_KEYS.map(k => [k, t(`diff_${k}`)]));

  res.render('index', {
    places, regions, categories, difficulties,
    filters: { region, category, difficulty, search }
  });
});

module.exports = router;
