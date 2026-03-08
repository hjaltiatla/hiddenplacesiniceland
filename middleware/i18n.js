const path = require('path');

const LANGS = ['en', 'es', 'de', 'zh'];

// Load all locale files once at startup
const locales = {};
for (const lang of LANGS) {
  locales[lang] = require(path.join(__dirname, '..', 'locales', `${lang}.json`));
}

module.exports = (req, res, next) => {
  const lang = LANGS.includes(req.params.lang) ? req.params.lang : 'en';

  res.locals.lang = lang;
  res.locals.t = (key) => locales[lang][key] ?? locales.en[key] ?? key;
  // Path after the language prefix, used by the language switcher
  res.locals.currentPath = req.originalUrl.replace(/^\/(en|es|de|zh)/, '') || '/';

  next();
};
