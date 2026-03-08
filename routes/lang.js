const express = require('express');
const router = express.Router({ mergeParams: true });
const nearReykjavik = require('./near-reykjavik');

router.use('/', require('./index'));
router.use('/places', require('./places'));
router.use('/map', require('./map'));
router.use('/admin', require('./admin'));

// Near-Reykjavik page one slug per language
router.use('/near-reykjavik',  nearReykjavik); // en
router.use('/cerca-reykjavik', nearReykjavik); // es
router.use('/nahe-reykjavik',  nearReykjavik); // de
router.use('/reykjavik-near',  nearReykjavik); // zh

module.exports = router;
