const express = require('express');

const router = express.Router();


const authController = require('../controllers/auth');

const authMiddleware = require('../middlewares/auth');

router.post('/register', authMiddleware.registerInputValidation, authController.create);
router.post('/login', authMiddleware.loginInputValidation, authController.login);

module.exports = router;
