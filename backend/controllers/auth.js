const router = require('express').Router();
const {login} = require('../services/auth/login');
const {register} = require('../services/auth/register');

router.post('/login', login);
router.post('/signup', register);

module.exports = router;
