const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.isAdmin, categoriesController.getAll);

module.exports = router;
