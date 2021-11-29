var express = require('express');
var router = express.Router();

const categoriesController = require('../controllers/categories');

router.get('/', categoriesController.getAll);
 
module.exports = router;