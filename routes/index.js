const express = require('express');
const router = express.Router();

const userRoutes = require('./users')
const organizationRoutes = require('./organizations')

router.use('/users', userRoutes)
router.use('/organization', organizationRoutes)

module.exports = router;