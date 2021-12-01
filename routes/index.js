const express = require('express');

const router = express.Router();

const registerRouter = require('./auth');
const categoriesRoutes = require('./categories');
const userRoutes = require('./users');
const testimonialsRoutes = require('./testimonials');
const organizationRoutes = require('./organizations');
const contactsRouter = require('./contacts');
const activitiesRouter = require('./activities');
const newsRouter = require('./news');
const membersRoute = require('./members');

router.use('/organizations', organizationRoutes);
router.use('/activities', activitiesRouter);
router.use('/auth', registerRouter);
router.use('/categories', categoriesRoutes);
router.use('/users', userRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/contacts', contactsRouter);
router.use('/news', newsRouter);
router.use('/members', membersRoute);

module.exports = router;
