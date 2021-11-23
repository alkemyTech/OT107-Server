const express = require("express");
const router = express.Router();

const contactsController = require('../controllers/contacts');

// Require middleware para verificar usuario administrador - OT107-27
const users = require('../middleware/users');

router.get('/', users.admin ,contactsController.getAll);

module.exports = router;