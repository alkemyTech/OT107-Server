const express = require('express');
const router = express.Router();
const newsController = require("../controllers/news")
const authMiddleware = require('../middlewares/auth')

router.route('/')
  .get( authMiddleware.isAdmin, newsController.getAll )
  .post( newsController.create )

router.route('/:id')
  .get( newsController.getById )
  .patch( newsController.update )
  .delete( newsController.remove )


module.exports = router;
