const express = require('express');

const router = express.Router();
const membersController = require('../controllers/members');
const authMiddleware = require('../middlewares/auth');
const validationMiddleware = require("../middlewares/membersPostValidation")

router.get('/', authMiddleware.isAdmin, membersController.getAll);

router.post('/', authMiddleware.isAdmin, validationMiddleware ,membersController.createNew )

module.exports = router;
