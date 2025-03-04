const express = require('express');
const { register, login } = require('../controllers/AuthController');
const { validateRegistration, validateLogin } = require('../middleware/validation');
const loginRateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', loginRateLimiter, validateLogin, login);

module.exports = router;