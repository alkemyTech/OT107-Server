const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
/* GET users listing. */
router.get('/', authMiddleware.isAdmin, usersController.getAll);

module.exports = router;
