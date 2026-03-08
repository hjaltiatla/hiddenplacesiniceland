const express  = require('express');
const router   = express.Router({ mergeParams: true });
const db       = require('../database/db');
const { placeImageUrl, attachImages } = require('../utils/imageUrl');
const cache    = require('../utils/cache');
const { generateMetaTags, generatePlaceSchema, DOMAIN } = require('../utils/seo');

const CATEGORY_KEYS = ['waterfall', 'canyon', 'hike', 'hot_spring', 'viewpoint', 'beach'];
const DIFFICULTY_KEYS = ['easy', 'medium', 'hard'];

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

router.get('/:id', (req, res) => {
  const { t, lang } = res.locals;
  const place = db.get('SELECT * FROM places WHERE id = ?', [req.params.id]);

  if (!place) {
    return res.status(404).render('404', { title: t('not_found_title') });
  }

  const categories = Object.fromEntries(CATEGORY_KEYS.map(k => [k, t(`cat_${k}`)]));
  const difficulties = Object.fromEntries(DIFFICULTY_KEYS.map(k => [k, t(`diff_${k}`)]));

  // Cache nearby places calculation (expensive Haversine computation)
  const nearby = cache.wrap(`nearby:${place.id}`, 10 * 60 * 1000, () =>
    attachImages(
      db.all('SELECT * FROM places WHERE id != ?', [place.id])
        .map(p => ({ ...p, distance: Math.round(distanceKm(place.latitude, place.longitude, p.latitude, p.longitude)) }))
        .filter(p => p.distance <= 50)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 4)
    )
  );

  let extraImages = [];
  try { extraImages = JSON.parse(place.images || '[]'); } catch {}
  const allImages = [placeImageUrl(place.slug, place.photo_url), ...extraImages];

  // SEO data
  const description = (place[`description_${lang}`] || place.description_en || '').substring(0, 160);
  const imageUrl = allImages[0];
  const url = `${DOMAIN}/${lang}/places/${place.id}`;

  const metaTags = generateMetaTags({
    title: `${place.name} - Hidden Places in Iceland`,
    description,
    image: imageUrl,
    url,
    type: 'article'
  });

  const structuredData = generatePlaceSchema(place, lang, imageUrl);

  res.render('place', {
    place,
    categories,
    difficulties,
    nearby,
    allImages,
    metaTags,
    structuredData: JSON.stringify(structuredData)
  });
});

module.exports = router;
