const express = require('express');

const router = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerSpecs = require('../modules/swagger');

router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

module.exports = router;
