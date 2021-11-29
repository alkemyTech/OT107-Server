const express = require('express');
const router = express.Router();


const registerRouter = require('./auth');
const authMiddleware = require('../middlewares/auth');
const categoriesRoutes = require('./categories');
const userRoutes = require('./users');
const testimonialsRoutes = require('./testimonials');
const organizationRoutes = require('./organizations');
const contactsRouter = require('./contacts');
const activitiesRouter = require('./activities');

router.use('/organizations', organizationRoutes);
router.use('/activities', activitiesRouter);
router.use('/auth', registerRouter);
router.use('/categories', authMiddleware.isAdmin, categoriesRoutes);
router.use('/users', userRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/contacts', contactsRouter);

module.exports = router;
