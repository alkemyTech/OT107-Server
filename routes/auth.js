const express = require('express');

const router = express.Router();

const registerControllers = require('../controllers/register');


const authMiddleware = require('../middleware/auth');

router.post('/register',authMiddleware.registerInputValidation, registerControllers.register);

module.exports = router;
