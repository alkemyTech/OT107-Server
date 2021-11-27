const express = require('express');

const router = express.Router();

const registerControllers = require('../controllers/register');


const authMiddleware = require('../middleware/auth');

router.post('/register',registerUsersValidator.authMiddleware, registerControllers.register);

module.exports = router;
