const express = require('express');
const router = express.Router();

const testimonialsController = require('../controllers/testimonials');
const isAdmin = require('../middlewares/auth.js');

router.get('/', isAdmin, testimonialsController.getAll);

module.exports = router;
