const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comments');
const authMiddleware = require('../middlewares/auth');
const commentsMiddleware = require('../middlewares/comments');

router
  .route('/')
  .post(
    authMiddleware.isAuth,
    commentsMiddleware.commentInputValidation,
    commentsController.create
  );

module.exports = router;
