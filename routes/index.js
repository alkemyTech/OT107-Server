var express = require('express');
var router = express.Router();

const userRoutes = require('./users');
const testimonialsRoutes = require('./testimonials');
const contactsRouter = require('./contacts');
const authRouter = require('./auth');

router.use('/users', userRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/contacts', contactsRouter);
route.use('/auth', authRouter);

module.exports = router;