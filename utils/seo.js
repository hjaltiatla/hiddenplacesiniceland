/**
 * SEO utilities for meta tags and structured data
 */

const DOMAIN = process.env.DOMAIN || 'https://hiddenplacesiniceland.com';

/**
 * Generate Open Graph and Twitter Card meta tags
 */
function generateMetaTags({ title, description, image, url, type = 'website' }) {
  return `
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${image.startsWith('http') ? image : DOMAIN + image}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="Hidden Places in Iceland" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${image.startsWith('http') ? image : DOMAIN + image}" />

    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${url}" />
  `.trim();
}

/**
 * Generate Schema.org structured data for a place (TouristAttraction)
 */
function generatePlaceSchema(place, lang, imageUrl) {
  const description = place[`description_${lang}`] || place.description_en || '';

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    'name': place.name,
    'description': description.substring(0, 300),
    'image': imageUrl.startsWith('http') ? imageUrl : DOMAIN + imageUrl,
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': place.latitude,
      'longitude': place.longitude
    },
    'address': {
      '@type': 'PostalAddress',
      'addressRegion': place.region,
      'addressCountry': 'IS'
    },
    'url': `${DOMAIN}/${lang}/places/${place.id}`,
    'touristType': getCategorySchema(place.category)
  };
}

/**
 * Generate Schema.org structured data for homepage (ItemList)
 */
function generateListSchema(places, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Hidden Places in Iceland',
    'description': 'Discover hidden nature gems in Iceland that most tourists never find',
    'numberOfItems': places.length,
    'itemListElement': places.slice(0, 20).map((place, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'TouristAttraction',
        'name': place.name,
        'url': `${DOMAIN}/${lang}/places/${place.id}`,
        'image': place.imageUrl?.startsWith('http') ? place.imageUrl : DOMAIN + (place.imageUrl || '')
      }
    }))
  };
}

/**
 * Map category to Schema.org tourist types
 */
function getCategorySchema(category) {
  const mapping = {
    'waterfall': 'Nature lover',
    'canyon': 'Adventure seeker',
    'hike': 'Adventure seeker',
    'hot_spring': 'Relaxation seeker',
    'viewpoint': 'Photography enthusiast',
    'beach': 'Nature lover'
  };
  return mapping[category] || 'General tourist';
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  generateMetaTags,
  generatePlaceSchema,
  generateListSchema,
  DOMAIN
};
