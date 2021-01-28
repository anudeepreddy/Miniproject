const router = require('express').Router();
const {search} = require('../services/user');

router.get('/search', search);

module.exports = router;