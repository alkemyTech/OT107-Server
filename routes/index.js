const express = require('express');

const router = express.Router();
const activitiesRouter = require('./activities');

router.use('/activities', activitiesRouter);

module.exports = router;
const router = express.Router();

const userRoutes = require('./users');
const testimonialsRoutes = require('./testimonials');

router.use('/users', userRoutes);
router.use('/testimonials', testimonialsRoutes);

module.exports = router;
