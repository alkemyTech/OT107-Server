const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
/* GET users listing. */
router
  .get('/', authMiddleware.isAdmin, usersController.getAll)
  .patch('/:id', authMiddleware.isOwnUser, usersController.update)
  .delete('/:id', authMiddleware.isOwnUser, usersController.remove);

module.exports = router;
