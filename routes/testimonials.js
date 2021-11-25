const express = require('express');
const router = express.Router();

const isAdmin = require('../middlewares/auth.js');
const testimonialsController = require('../controllers/testimonials');

router.get('/', isAdmin, testimonialsController.getAll);

module.exports = router;