'use strict';

const { Router } = require('express');

const router = Router();

router.get('/map', (req, res, next) => {
res.render('spotsaround');
});

module.exports = router;
