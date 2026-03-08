/**
 * Robots.txt for search engine crawlers
 * Route: GET /robots.txt
 */

const express = require('express');
const router = express.Router();

const DOMAIN = process.env.DOMAIN || 'https://hiddenplacesiniceland.com';

router.get('/robots.txt', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`# https://www.robotstxt.org/robotstxt.html

User-agent: *
Allow: /

# Disallow admin pages
Disallow: /*/admin

# Sitemap
Sitemap: ${DOMAIN}/sitemap.xml
`);
});

module.exports = router;
