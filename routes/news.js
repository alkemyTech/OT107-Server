const express = require('express');

const router = express.Router();
const newsController = require('../controllers/news');
const authMiddleware = require('../middlewares/auth');
const newsMiddleware = require('../middlewares/news');

router.route('/')
  .get(authMiddleware.isAdmin, newsController.getAll)
  .post(authMiddleware.isAdmin, newsMiddleware.newsInputValidation, newsController.create);

module.exports = router;
