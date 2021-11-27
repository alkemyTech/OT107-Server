const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const testimonialsController = require('../controllers/testimonials');

router.get('/', authMiddleware.isAdmin, testimonialsController.getAll);

module.exports = router;
