const express = require('express');

const router = express.Router();

const registerControllers = require('../controllers/register');
const authController = require('../controllers/auth');

const authMiddleware = require('../middlewares/auth');

router.post('/register',authMiddleware.registerInputValidation, registerControllers.register);
router.post('/login', authMiddleware.loginInputValidation, authController.login);

module.exports = router;