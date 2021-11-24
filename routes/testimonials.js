const express = require('express');
const router = express.Router();

const testimonialsController = require('../controllers/testimonials');

router.get('/', testimonialsController.getAll);

module.exports = router;
