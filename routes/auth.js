const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const loginMiddelware = require('../middlewares/auth');

router.post('/login', loginMiddelware.login, authController.login);

module.exports = router;