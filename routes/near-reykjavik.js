const express  = require('express');
const router   = express.Router({ mergeParams: true });
const db       = require('../database/db');
const { placeImageUrl } = require('../utils/imageUrl');

const REYKJAVIK = { lat: 64.1466, lon: -21.9426 };
const MAX_KM = 200;

// Haversine great-circle distance in km
function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Language-specific URL slugs for the switcher
const SLUG_BY_LANG = {
  en: '/near-reykjavik',
  es: '/cerca-reykjavik',
  de: '/nahe-reykjavik',
  zh: '/reykjavik-near'
};

const CATEGORY_KEYS = ['waterfall', 'canyon', 'hike', 'hot_spring', 'viewpoint', 'beach'];
const DIFFICULTY_KEYS = ['easy', 'medium', 'hard'];

router.get('/', (req, res) => {
  const { t, lang } = res.locals;

  const all = db.all('SELECT * FROM places');

  const nearby = all
    .map(p => ({
      ...p,
      distance: Math.round(distanceKm(REYKJAVIK.lat, REYKJAVIK.lon, p.latitude, p.longitude)),
      imageUrl: placeImageUrl(p.slug, p.photo_url)
    }))
    .filter(p => p.distance <= MAX_KM)
    .sort((a, b) => a.distance - b.distance);

  const categories  = Object.fromEntries(CATEGORY_KEYS.map(k => [k, t(`cat_${k}`)]));
  const difficulties = Object.fromEntries(DIFFICULTY_KEYS.map(k => [k, t(`diff_${k}`)]));

  // Tell the language switcher which slug to use per language
  res.locals.switcherLinks = SLUG_BY_LANG;

  res.render('near-reykjavik', {
    title: t('near_reykjavik_title'),
    metaTitle: `${t('near_reykjavik_title')} | ${t('site_title')}`,
    metaDescription: t('near_reykjavik_meta_desc'),
    places: nearby,
    categories,
    difficulties
  });
});

module.exports = router;
