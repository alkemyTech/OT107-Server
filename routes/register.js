const express = require('express');

const router = express.Router();

const registerControllers = require('../controllers/register');


const registerMiddleware = require('../middleware/register');

router.post('/',registerMiddleware.registerMiddelware, registerControllers.register);

module.exports = router;