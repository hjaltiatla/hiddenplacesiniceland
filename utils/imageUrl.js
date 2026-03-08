const fs   = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images/places');

// Returns the best available image URL for a place:
// 1. Local slug-based file: public/images/places/<slug>.jpg
// 2. photo_url from DB (e.g. Unsplash), if provided
// 3. Default fallback image
function placeImageUrl(slug, photoUrl) {
  if (slug && fs.existsSync(path.join(IMAGES_DIR, `${slug}.jpg`))) {
    return `/images/places/${slug}.jpg`;
  }
  if (photoUrl) {
    return photoUrl;
  }
  return '/images/default-place.jpg';
}

// Attaches imageUrl to each place object in an array
function attachImages(places) {
  return places.map(p => ({ ...p, imageUrl: placeImageUrl(p.slug, p.photo_url) }));
}

module.exports = { placeImageUrl, attachImages };
