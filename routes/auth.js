const express = require('express');

const router = express.Router();

const registerControllers = require('../controllers/register');


const registerUsersValidator = require('../middleware/auth');

router.post('/register',registerUsersValidator.registerUsersValidator, registerControllers.register);

module.exports = router;