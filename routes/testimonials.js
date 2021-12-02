const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const testimonialsController = require('../controllers/testimonials');

router.get('/', authMiddleware.isAdmin, testimonialsController.getAll);
router.get('/:id', authMiddleware.isAdmin, testimonialsController.getById);
router.put('/:id', authMiddleware.isAdmin, testimonialsController.update);

module.exports = router;
