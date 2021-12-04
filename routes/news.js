const express = require('express');

const router = express.Router();
const newsController = require('../controllers/news');
const authMiddleware = require('../middlewares/auth');
const newsMiddleware = require('../middlewares/news');

router.route('/')
  .get(authMiddleware.isAdmin, newsController.getAll)
  .post(authMiddleware.isAdmin, newsMiddleware.newsInputValidation, newsController.create);
router.route('/:id')
  .get(authMiddleware.isAdmin, newsController.getById);

module.exports = router;
