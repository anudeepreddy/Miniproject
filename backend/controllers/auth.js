const router = require('express').Router();
const { isLoggedIn } = require('../services/auth/isLoggedIn');
const {login} = require('../services/auth/login');
const {register} = require('../services/auth/register');


router.post('/login', login);
router.post('/signup', register);
router.get('/isLoggedIn',isLoggedIn);

module.exports = router;
