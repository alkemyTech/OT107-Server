const express = require('express');

const router = express.Router();

const userRoutes = require('./users');
const testimonialsRoutes = require('./testimonials');
const organizationRoutes = require('./organizations');

router.use('/users', userRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/organizations', organizationRoutes);

module.exports = router;
