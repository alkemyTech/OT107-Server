var express = require('express');
var router = express.Router();

const contatcsRouter = require('./contacts')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/contacts', contatcsRouter);

module.exports = router;