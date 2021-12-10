const express = require('express');

const swaggerUI = require('swagger-ui-express');
const swaggerSpecs = require('../modules/swagger');

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
const commentsRoutes = require('./comments');
const slidesRoute = require('./slides');
const backofficeRouter = require('./backoffice');

router.use('/organizations', organizationRoutes);
router.use('/activities', activitiesRouter);
router.use('/auth', registerRouter);
router.use('/categories', categoriesRoutes);
router.use('/users', userRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/contacts', contactsRouter);
router.use('/news', newsRouter);
router.use('/members', membersRoute);
router.use('/comments', commentsRoutes);
router.use('/slides', slidesRoute);
router.use('/backoffice', backofficeRouter);
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

module.exports = router;
