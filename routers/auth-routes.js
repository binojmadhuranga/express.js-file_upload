const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/auth-controller');
const { validateRegister, validateLogin } = require('../middleware/validation');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;
