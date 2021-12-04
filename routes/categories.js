const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');
const authMiddleware = require('../middlewares/auth');
const categoriesMiddleware = require('../middlewares/categories');

router.get('/', authMiddleware.isAdmin, categoriesController.getAll);
router.delete('/:id', authMiddleware.isAdmin, categoriesController.remove);
router.post('/', authMiddleware.isAdmin, categoriesMiddleware.categoriesInputValidation, categoriesController.create);

module.exports = router;
