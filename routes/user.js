'use strict';

const { Router } = require('express');
const router = Router();

router.get('/signin', (req, res, next) => {
res.render('signin')
});

router.get('/signup', (req, res, next) => {
    res.render('signup')
    });

module.exports = router;