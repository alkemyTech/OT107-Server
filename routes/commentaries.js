const express = require('express');

const router = express.Router();

const commentariesController = require('../controllers/commentaries');
const authMiddleware = require('../middlewares/auth');
const commentariesMiddleware = require('../middlewares/commentaries');

router
  .route('/')
  .post(
    authMiddleware.isAuth,
    commentariesMiddleware.commentInputValidation,
    commentariesController.createComment
  );

module.exports = router;
