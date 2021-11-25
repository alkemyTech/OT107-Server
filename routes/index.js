var express = require('express');
var router = express.Router();

const userRoutes = require('./users');
const contatcsRouter = require('./contacts');

router.use('/users', userRoutes);
router.use('/contacts', contatcsRouter);

module.exports = router;