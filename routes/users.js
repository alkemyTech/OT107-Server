const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');
<<<<<<< HEAD
/* GET users listing. */
router.get('/', usersController.getAll);
=======
const authMiddleware = require('../middlewares/auth');
/* GET users listing. */
router.get('/', authMiddleware.isAdmin, usersController.getAll);
>>>>>>> fac61fb9c64a1af40c561578aa0b08022cebe48a

module.exports = router;
