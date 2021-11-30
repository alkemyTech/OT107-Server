const express = require('express');

const router = express.Router();
const membersController = require('../controllers/members');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.isAdmin, membersController.getAll);

module.exports = router;