const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const testimonialsRoutes = require('./testimonials');
const contactsRouter = require('./contacts');
const authRouter = require('./auth');


router.use('/users', userRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

module.exports = router;