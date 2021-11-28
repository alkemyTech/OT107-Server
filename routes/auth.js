const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const authMiddelware = require('../middlewares/auth');

router.post('/login', authMiddelware.loginInputValidation, authController.login);

module.exports = router;