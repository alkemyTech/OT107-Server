const express = require('express');

const router = express.Router();

const organizationControllers = require('../controllers/organizations');

router.get('/public', organizationControllers.getAll);

module.exports = router;
