const express = require('express');
const router = express.Router();
const newsController = require("../controllers/news")

router.route('/')
  .get( newsController.getAll )
  .post( newsController.create )

router.route('/:id')
  .get( newsController.getById )
  .patch( newsController.update )
  .delete( newsController.remove )


module.exports = router;
