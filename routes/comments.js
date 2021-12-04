const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comments');
const authMiddleware = require('../middlewares/auth');
const commentsMiddleware = require('../middlewares/comments');

router
  .route('/')
  .get(authMiddleware.isAuth, commentsController.getAll)
  .post(
    authMiddleware.isAuth,
    commentsMiddleware.commentInputValidation,
    commentsController.create
  );

router.put('/:id', commentsMiddleware.isOwnComment, commentsController.update);

module.exports = router;
