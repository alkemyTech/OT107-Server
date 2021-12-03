const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const testimonialsMiddleware = require('../middlewares/testimonials');
const testimonialsController = require('../controllers/testimonials');

router.get('/', authMiddleware.isAdmin, testimonialsController.getAll);
router.post('/', authMiddleware.isAdmin, testimonialsMiddleware.inputValidation, testimonialsController.create);

module.exports = router;
