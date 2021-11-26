const express = require('express');
const router = express.Router();
const newsController = require("../controllers/news")
const authMiddleware = require('../middlewares/auth')

router.route('/')
  .get( authMiddleware.isAdmin, newsController.getAll )

  module.exports = router;
