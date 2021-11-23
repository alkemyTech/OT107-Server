const express = require('express');
const router = express.Router();

const organizationControllers = require('../controllers/organization')

router.get('/public', organizationControllers.getAll)

module.exports = router;