const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const testimonialsMiddleware = require('../middlewares/testimonials');
const testimonialsController = require('../controllers/testimonials');
const paginationMiddleware = require('../middlewares/pagination');

router.get('/', authMiddleware.isAuth, paginationMiddleware.pageValidation, testimonialsController.getAll);
router.get('/:id', authMiddleware.isAdmin, testimonialsController.getById);
router.post('/', authMiddleware.isAdmin, testimonialsMiddleware.inputValidation, testimonialsController.create);
router.put('/:id', authMiddleware.isAdmin, testimonialsController.update);
router.delete('/:id', authMiddleware.isAdmin, testimonialsController.remove);

module.exports = router;
