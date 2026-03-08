const fs   = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images/places');

function placeImageUrl(slug) {
  if (slug && fs.existsSync(path.join(IMAGES_DIR, `${slug}.jpg`))) {
    return `/images/places/${slug}.jpg`;
  }
  return '/images/default-place.jpg';
}

// Attaches imageUrl to each place object in an array
function attachImages(places) {
  return places.map(p => ({ ...p, imageUrl: placeImageUrl(p.slug) }));
}

module.exports = { placeImageUrl, attachImages };
