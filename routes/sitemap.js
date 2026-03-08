/**
 * Dynamic XML sitemap generation for SEO
 * Route: GET /sitemap.xml
 */

const express = require('express');
const router = express.Router();
const db = require('../database/db');

const DOMAIN = process.env.DOMAIN || 'https://hiddenplacesiniceland.com';
const LANGS = ['en', 'es', 'de', 'zh'];

router.get('/sitemap.xml', (req, res) => {
  const places = db.all('SELECT id, slug, created_at FROM places ORDER BY created_at DESC');

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  // Homepage for each language
  LANGS.forEach(lang => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}/${lang}/</loc>\n`;
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '    <priority>1.0</priority>\n';

    // Add alternate language versions
    LANGS.forEach(altLang => {
      xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${DOMAIN}/${altLang}/" />\n`;
    });

    xml += '  </url>\n';
  });

  // Map page for each language
  LANGS.forEach(lang => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}/${lang}/map</loc>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });

  // Individual place pages for each language
  places.forEach(place => {
    LANGS.forEach(lang => {
      xml += '  <url>\n';
      xml += `    <loc>${DOMAIN}/${lang}/places/${place.id}</loc>\n`;
      xml += `    <lastmod>${new Date(place.created_at).toISOString().split('T')[0]}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';

      // Add alternate language versions
      LANGS.forEach(altLang => {
        xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${DOMAIN}/${altLang}/places/${place.id}" />\n`;
      });

      xml += '  </url>\n';
    });
  });

  xml += '</urlset>';

  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

module.exports = router;
