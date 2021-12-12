const express = require('express');

const router = express.Router();
const newsController = require('../controllers/news');
const commentsController = require('../controllers/comments');
const authMiddleware = require('../middlewares/auth');
const newsMiddleware = require('../middlewares/news');
const paginateMiddleware = require('../middlewares/pagination');

router.route('/:id/comments').get(authMiddleware.isAuth,commentsController.getByNovelty);
router.route('/')
  .get(authMiddleware.isAuth, paginateMiddleware.pageValidation, newsController.getAll)
  .post(authMiddleware.isAdmin, newsMiddleware.newsInputValidation, newsController.create);
router.route('/:id')
  .get(authMiddleware.isAdmin, newsController.getById)
  .put(authMiddleware.isAdmin, newsMiddleware.newsInputValidation, newsController.update)
  .delete(authMiddleware.isAdmin, newsController.remove);

module.exports = router;
